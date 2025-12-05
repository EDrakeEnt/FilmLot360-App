import { DashboardLayout } from '../components/DashboardLayout';
import { Mail, Plus, Search, Send, Download, Paperclip, Filter, Clock, CheckCircle, Inbox, Link2, AlertCircle, X, FileText, ChevronRight, Users, Loader2, Settings, Check, UserCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UpgradePrompt } from '../components/UpgradePrompt';
import { ResendSetupInstructions } from '../components/ResendSetupInstructions';
import { EmailDomainSettings } from '../components/EmailDomainSettings';
import { useState, useEffect } from 'react';
import { profileAPI, actorsAPI, crewAPI } from '../utils/api';
import { getSubscriptionStatus } from '../utils/subscription';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';
import { createClient } from '../utils/supabase/client';

export function DashboardEmails() {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showContactPicker, setShowContactPicker] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailHistory, setEmailHistory] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [showEmailDetail, setShowEmailDetail] = useState(false);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: '',
  });

  // Recipients data
  const [actors, setActors] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  useEffect(() => {
    checkAccess();
    fetchEmailHistory();
    fetchContacts();
    fetchTemplates();
    fetchRecipients();
  }, []);

  const checkAccess = async () => {
    try {
      const response = await profileAPI.get();
      const subStatus = getSubscriptionStatus(response.profile.subscription);
      // TEMPORARILY UNLOCKED FOR DEVELOPMENT
      setHasAccess(true);
      // Original: Emails require Growth plan or higher
      // const hasGrowth = subStatus.plan === 'growth' || subStatus.plan === 'professional' || subStatus.plan === 'enterprise';
      // setHasAccess(hasGrowth);
    } catch (error) {
      console.error('Error checking access:', error);
      // TEMPORARILY UNLOCKED FOR DEVELOPMENT
      setHasAccess(true);
      // Original: setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailHistory = async () => {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        console.log('No active session');
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/email/history`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch email history');
      }

      const result = await response.json();
      setEmailHistory(result.emails || []);
    } catch (error) {
      console.error('Error fetching email history:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      // For now, we'll use an empty array for contacts
      // In the future, we could fetch from a global contacts API or all projects
      setContacts([]);
      
      // Note: actorsAPI and crewAPI require projectId, so we can't fetch all contacts globally
      // without creating a new API endpoint. For now, contacts will be empty.
      // Users can still manually enter email addresses.
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      // Fetch templates from the backend
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        console.log('No active session for templates');
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/templates`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setTemplates(result.templates || []);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchRecipients = async () => {
    try {
      setLoadingRecipients(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        console.log('No active session for recipients');
        return;
      }

      const actorsResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/actors`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      const crewResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/crew`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (actorsResponse.ok && crewResponse.ok) {
        const actorsResult = await actorsResponse.json();
        const crewResult = await crewResponse.json();
        setActors(actorsResult.actors || []);
        setCrew(crewResult.crew || []);
      }
    } catch (error) {
      console.error('Error fetching recipients:', error);
    } finally {
      setLoadingRecipients(false);
    }
  };

  const toggleRecipient = (recipientId: string) => {
    setSelectedRecipients(prev =>
      prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  // Update emailForm.to whenever selectedRecipients changes
  useEffect(() => {
    const allRecipients = [...actors, ...crew];
    const selectedEmails = selectedRecipients
      .map(id => {
        const recipient = allRecipients.find(r => r.id === id);
        return recipient?.email;
      })
      .filter(Boolean);
    
    if (selectedEmails.length > 0) {
      setEmailForm(prev => ({ ...prev, to: selectedEmails.join(', ') }));
    }
  }, [selectedRecipients, actors, crew]);

  // Calculate stats from real email history
  const totalEmails = emailHistory.length;
  const sentEmails = emailHistory.filter((e: any) => e.status === 'sent').length;
  const receivedEmails = emailHistory.filter((e: any) => e.status === 'received').length;
  const pendingEmails = emailHistory.filter((e: any) => e.status === 'pending').length;

  const stats = [
    {
      label: 'Total Emails',
      value: totalEmails.toString(),
      icon: Mail,
      color: 'blue',
    },
    {
      label: 'Sent',
      value: sentEmails.toString(),
      icon: Send,
      color: 'purple',
    },
    {
      label: 'Received',
      value: receivedEmails.toString(),
      icon: Inbox,
      color: 'green',
    },
    {
      label: 'Pending Response',
      value: pendingEmails.toString(),
      icon: Clock,
      color: 'yellow',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All', count: totalEmails },
    { id: 'sent', label: 'Sent', count: sentEmails },
    { id: 'received', label: 'Received', count: receivedEmails },
    { id: 'pending', label: 'Pending', count: pendingEmails },
  ];

  const filteredEmails = emailHistory.filter((email: any) => {
    // Filter by tab
    if (activeTab === 'sent' && email.status !== 'sent') return false;
    if (activeTab === 'received' && email.status !== 'received') return false;
    if (activeTab === 'pending' && email.status !== 'pending') return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        email.subject?.toLowerCase().includes(query) ||
        email.to?.some((e: string) => e.toLowerCase().includes(query)) ||
        email.from?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'sent':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'normal':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setEmailForm({
      to: emailForm.to,
      cc: emailForm.cc,
      bcc: emailForm.bcc,
      subject: template.subject,
      message: template.message,
    });
    setShowTemplates(false);
  };

  const handleSendEmail = async () => {
    try {
      setSending(true);
      console.log('=== EMAIL SEND START ===');
      
      // Validate form
      if (!emailForm.to) {
        toast.error('Please enter a recipient email address');
        setSending(false);
        return;
      }

      // Validate sandbox mode - only allow verified email
      const allowedEmail = 'edrake@edrakeenterprise.com';
      const toEmails = emailForm.to.split(',').map(e => e.trim()).filter(Boolean);
      const ccEmails = emailForm.cc ? emailForm.cc.split(',').map(e => e.trim()).filter(Boolean) : [];
      const bccEmails = emailForm.bcc ? emailForm.bcc.split(',').map(e => e.trim()).filter(Boolean) : [];
      
      console.log('Email recipients:', { to: toEmails, cc: ccEmails, bcc: bccEmails });
      
      // Check if all emails are the allowed email
      const allEmails = [...toEmails, ...ccEmails, ...bccEmails];
      const hasInvalidEmail = allEmails.some(email => email !== allowedEmail);
      
      if (hasInvalidEmail) {
        console.log('Invalid email detected - not matching verified email');
        toast.error(`Sandbox Mode: You can only send to ${allowedEmail}`, {
          duration: 5000,
          description: 'Click "Use Verified Email" or verify a domain at resend.com/domains'
        });
        setSending(false);
        return;
      }

      if (!emailForm.subject) {
        toast.error('Please enter an email subject');
        setSending(false);
        return;
      }

      if (!emailForm.message) {
        toast.error('Please enter an email message');
        setSending(false);
        return;
      }

      console.log('All validations passed. Getting auth token...');
      
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        console.error('No active session found');
        toast.error('Please sign in to send emails');
        setSending(false);
        return;
      }

      console.log('Session found. Preparing email payload...');

      const emailPayload = {
        to: toEmails,
        cc: ccEmails,
        bcc: bccEmails,
        subject: emailForm.subject,
        html: `<div style="font-family: Arial, sans-serif; white-space: pre-wrap;">${emailForm.message}</div>`,
        text: emailForm.message,
      };

      console.log('Sending email to backend API...', emailPayload);

      // Send email via backend API
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/email/send`;
      console.log('API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(emailPayload),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (!response.ok) {
        console.error('Error sending email:', result);
        
        // Handle Resend sandbox limitation
        if (result.details?.name === 'validation_error' && result.message?.includes('testing emails')) {
          toast.error('Resend Sandbox Mode: You can only send to your verified email (edrake@edrakeenterprise.com)', {
            duration: 6000,
            description: 'To send to other recipients, verify a domain at resend.com/domains'
          });
        } else {
          toast.error(result.message || result.error || 'Failed to send email');
        }
        setSending(false);
        return;
      }

      console.log('✅ Email sent successfully!');
      toast.success('Email sent successfully! Check your inbox.');
      
      // Refresh email history
      console.log('Refreshing email history...');
      fetchEmailHistory();
      
      // Close modal and reset form
      setIsComposeOpen(false);
      setShowTemplates(false);
      setEmailForm({ to: '', cc: '', bcc: '', subject: '', message: '' });
      
      console.log('=== EMAIL SEND COMPLETE ===');
      
    } catch (error: any) {
      console.error('❌ CRITICAL ERROR sending email:', error);
      toast.error(error.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-gray-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <UpgradePrompt
          featureName="Emails & Templates"
          description="Send professional emails with customizable templates for casting calls, production updates, and more. Save time with automated workflows."
          icon={Mail}
          requiredPlan="growth"
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-white text-3xl mb-2">Email Management & Templates</h1>
            <p className="text-gray-400">Manage email communications and templates for vendors, clients, and service providers</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Button 
              variant="outline" 
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 whitespace-nowrap"
              onClick={() => setShowSetupInstructions(!showSetupInstructions)}
            >
              <Settings className="w-4 h-4 mr-2" />
              {showSetupInstructions ? 'Hide' : 'Setup Inbound Email'}
            </Button>
            <Button variant="outline" className="border-white/10 text-gray-300 whitespace-nowrap">
              <Download className="w-4 h-4 mr-2" />
              Export Emails
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white whitespace-nowrap"
              onClick={() => setIsComposeOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Compose Email
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-zinc-900 border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-500/10' :
                  stat.color === 'purple' ? 'bg-purple-500/10' :
                  stat.color === 'green' ? 'bg-green-500/10' :
                  'bg-yellow-500/10'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'blue' ? 'text-blue-400' :
                    stat.color === 'purple' ? 'text-purple-400' :
                    stat.color === 'green' ? 'text-green-400' :
                    'text-yellow-400'
                  }`} />
                </div>
              </div>
              <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
              <div className="text-white text-3xl">{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Inbound Email Setup Instructions */}
        {showSetupInstructions && (
          <div className="mb-6">
            <ResendSetupInstructions />
          </div>
        )}

        {/* Domain Settings */}
        <div className="mb-6">
          <EmailDomainSettings />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails by subject, sender, recipient, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-12 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>

        {/* Email List Card */}
        <Card className="bg-zinc-900 border-white/10">
          {/* Tabs */}
          <div className="border-b border-white/10">
            <div className="flex items-center px-4 lg:px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-purple-400'
                      : 'text-gray-400 border-transparent hover:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    {tab.id === 'sent' && <Send className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
                    {tab.id === 'received' && <Inbox className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
                    {tab.id === 'pending' && <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
                    <span>{tab.label}</span>
                    <span className="px-1.5 lg:px-2 py-0.5 bg-white/5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Email List */}
          <div className="divide-y divide-white/10">
            {filteredEmails.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white text-lg mb-2">No emails yet</h3>
                <p className="text-gray-400 mb-4">
                  {activeTab === 'all' 
                    ? 'Start by composing your first email' 
                    : `No ${activeTab} emails found`}
                </p>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => setIsComposeOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Compose Email
                </Button>
              </div>
            ) : (
              filteredEmails.map((email) => {
                // Extract recipient info
                const recipient = email.to?.[0] || 'Unknown';
                const recipientEmail = email.to?.[0] || '';
                const recipientInitial = recipientEmail.charAt(0).toUpperCase() || '?';
                
                // Format timestamp
                const emailDate = new Date(email.sentAt || email.timestamp);
                const now = new Date();
                const diffMs = now.getTime() - emailDate.getTime();
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                const diffDays = Math.floor(diffHours / 24);
                
                let timeAgo;
                if (diffHours < 1) {
                  const diffMins = Math.floor(diffMs / (1000 * 60));
                  timeAgo = diffMins < 1 ? 'Just now' : `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
                } else if (diffHours < 24) {
                  timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                } else if (diffDays < 7) {
                  timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                } else {
                  timeAgo = emailDate.toLocaleDateString();
                }

                return (
                  <div
                    key={email.id}
                    className="p-6 hover:bg-zinc-800/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedEmail(email);
                      setShowEmailDetail(true);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Recipient Icon */}
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-semibold">
                          {recipientInitial}
                        </span>
                      </div>

                      {/* Email Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-white font-medium mb-1">{email.subject}</h4>
                            <div className="text-gray-400 text-sm mb-1">
                              To: {email.to?.join(', ')}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {timeAgo}
                              {email.cc && email.cc.length > 0 && (
                                <> • CC: {email.cc.length}</>
                              )}
                              {email.bcc && email.bcc.length > 0 && (
                                <> • BCC: {email.bcc.length}</>
                              )}
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`px-2.5 py-1 rounded-full text-xs border capitalize ${getStatusColor(email.status)}`}>
                              {email.status}
                            </span>
                          </div>
                        </div>

                        {/* Preview Text */}
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {email.text || email.html?.replace(/<[^>]*>/g, '') || 'No preview available'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>

      {/* Compose Email Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white text-2xl">Compose Email</h2>
              <button
                onClick={() => {
                  setIsComposeOpen(false);
                  setShowTemplates(false);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {/* Sandbox Mode Info Banner */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">Resend Sandbox Mode</h4>
                    <p className="text-gray-300 text-sm">
                      Currently in testing mode. You can only send emails to <span className="font-semibold">edrake@edrakeenterprise.com</span>.
                      <br />
                      To send to other recipients, <a href="https://resend.com/domains" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">verify a domain at resend.com/domains</a>.
                    </p>
                  </div>
                </div>

                {/* Use Template Button */}
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {showTemplates ? 'Hide Templates' : 'Use Template'}
                  </Button>
                  {showTemplates && (
                    <span className="text-gray-400 text-sm">
                      Select a template to auto-fill your email
                    </span>
                  )}
                </div>

                {/* Template Selector */}
                {showTemplates && (
                  <div className="bg-zinc-800 border border-white/10 rounded-lg p-4">
                    <h3 className="text-white mb-3">Email Templates</h3>
                    {templates.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">Loading templates...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template)}
                            className="text-left p-4 bg-zinc-900 hover:bg-zinc-700 border border-white/10 hover:border-purple-500/50 rounded-lg transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-purple-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white mb-1">{template.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs">
                                    {template.category}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-gray-500" />
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* To Field */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Recipients ({selectedRecipients.length} selected)
                  </label>
                  
                  {/* Selected Recipients Pills */}
                  {selectedRecipients.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                      {selectedRecipients.map(recipientId => {
                        const allRecipients = [...actors, ...crew];
                        const recipient = allRecipients.find(r => r.id === recipientId);
                        if (!recipient) return null;
                        return (
                          <div
                            key={recipientId}
                            className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-1"
                          >
                            <span className="text-purple-300 text-sm">{recipient.name}</span>
                            <button
                              onClick={() => toggleRecipient(recipientId)}
                              className="text-purple-400 hover:text-purple-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Recipients List with Checkboxes */}
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden mb-3">
                    {loadingRecipients ? (
                      <div className="p-4 text-center text-gray-500">Loading recipients...</div>
                    ) : (
                      <>
                        {/* Existing Recipients List */}
                        {(actors.length > 0 || crew.length > 0) ? (
                          <div className="max-h-48 overflow-y-auto">
                            {/* Actors */}
                            {actors.map((actor) => (
                              <button
                                key={actor.id}
                                onClick={() => toggleRecipient(actor.id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors border-b border-zinc-800 last:border-0"
                              >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  selectedRecipients.includes(actor.id)
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-zinc-600'
                                }`}>
                                  {selectedRecipients.includes(actor.id) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <UserCircle className="w-4 h-4 text-purple-400" />
                                <div className="flex-1 text-left">
                                  <div className="text-gray-300 text-sm">{actor.name}</div>
                                  {actor.email && (
                                    <div className="text-gray-500 text-xs">{actor.email}</div>
                                  )}
                                </div>
                              </button>
                            ))}
                            {/* Crew */}
                            {crew.map((member) => (
                              <button
                                key={member.id}
                                onClick={() => toggleRecipient(member.id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors border-b border-zinc-800 last:border-0"
                              >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  selectedRecipients.includes(member.id)
                                    ? 'bg-pink-500 border-pink-500'
                                    : 'border-zinc-600'
                                }`}>
                                  {selectedRecipients.includes(member.id) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <Users className="w-4 h-4 text-pink-400" />
                                <div className="flex-1 text-left">
                                  <div className="text-gray-300 text-sm">{member.name}</div>
                                  {member.email && (
                                    <div className="text-gray-500 text-xs">{member.email}</div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <div className="text-gray-500 text-sm">No actors or crew in system yet</div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Manual Email Input */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Or enter email manually <span className="text-blue-400">(Sandbox: only edrake@edrakeenterprise.com)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="edrake@edrakeenterprise.com"
                        value={emailForm.to}
                        onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                      <button
                        type="button"
                        onClick={() => setEmailForm({ ...emailForm, to: 'edrake@edrakeenterprise.com' })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                      >
                        Use Verified Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* CC Field */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">CC</label>
                  <input
                    type="email"
                    placeholder="cc@example.com"
                    value={emailForm.cc}
                    onChange={(e) => setEmailForm({ ...emailForm, cc: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                {/* BCC Field */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">BCC</label>
                  <input
                    type="email"
                    placeholder="bcc@example.com"
                    value={emailForm.bcc}
                    onChange={(e) => setEmailForm({ ...emailForm, bcc: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Email subject"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Message</label>
                  <textarea
                    placeholder="Write your message here..."
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                    rows={12}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                  />
                </div>

                {/* Attachment Button */}
                <div>
                  <Button variant="outline" className="border-white/10 text-gray-300">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach File
                  </Button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                className="border-white/10 text-gray-300"
                onClick={() => {
                  setIsComposeOpen(false);
                  setShowTemplates(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={handleSendEmail}
                disabled={sending}
              >
                {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Email Detail Modal */}
      {showEmailDetail && selectedEmail && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white text-2xl">Email Details</h2>
              <button
                onClick={() => {
                  setShowEmailDetail(false);
                  setSelectedEmail(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {/* Email Header */}
                <div className="flex items-start gap-4">
                  {/* Recipient Icon */}
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">
                      {selectedEmail.to?.[0]?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>

                  {/* Email Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className="text-white font-medium mb-1">{selectedEmail.subject}</h4>
                        <div className="text-gray-400 text-sm mb-1">
                          To: {selectedEmail.to?.join(', ')}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {new Date(selectedEmail.sentAt || selectedEmail.timestamp).toLocaleString()}
                          {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                            <> • CC: {selectedEmail.cc.length}</>
                          )}
                          {selectedEmail.bcc && selectedEmail.bcc.length > 0 && (
                            <> • BCC: {selectedEmail.bcc.length}</>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2.5 py-1 rounded-full text-xs border capitalize ${getStatusColor(selectedEmail.status)}`}>
                          {selectedEmail.status}
                        </span>
                      </div>
                    </div>

                    {/* Preview Text */}
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {selectedEmail.text || selectedEmail.html?.replace(/<[^>]*>/g, '') || 'No preview available'}
                    </p>
                  </div>
                </div>

                {/* Email Body */}
                <div className="bg-zinc-800 border border-white/10 rounded-lg p-4">
                  <div className="html-content" dangerouslySetInnerHTML={{ __html: selectedEmail.html || '' }} />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                className="border-white/10 text-gray-300"
                onClick={() => {
                  setShowEmailDetail(false);
                  setSelectedEmail(null);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}