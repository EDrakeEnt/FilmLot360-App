import { DashboardLayout } from '../components/DashboardLayout';
import { Receipt, Plus, Search, Bell, Download, FileText, TrendingUp, TrendingDown, AlertTriangle, Eye, Mail, DollarSign, Send, X, Calendar, User, Check } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UpgradePrompt } from '../components/UpgradePrompt';
import { useState, useEffect } from 'react';
import { profileAPI } from '../utils/api';
import { getSubscriptionStatus } from '../utils/subscription';
import { toast } from 'sonner';
import { emailAPI } from '../utils/filmlot-api';

export function DashboardInvoices() {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showEmailDetailModal, setShowEmailDetailModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showQuickUpdateModal, setShowQuickUpdateModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<any>(null);
  const [exportFormat, setExportFormat] = useState('PDF');
  const [exportStartDate, setExportStartDate] = useState('');
  const [exportEndDate, setExportEndDate] = useState('');
  const [pendingInvoices, setPendingInvoices] = useState<any[]>([]);
  const [sendingInvoiceId, setSendingInvoiceId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Invoice #INV-2024-045 is pending', read: false },
    { id: 2, message: 'Email from CarePlus Medical is in review', read: false },
    { id: 3, message: 'Payment received for invoice #INV-2024-038', read: false },
    { id: 4, message: 'New invoice request from Med-Care Solutions', read: false },
  ]);
  const [invoiceForm, setInvoiceForm] = useState({
    // Client Information
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    // Invoice Details
    serviceName: '',
    issueDate: '',
    dueDate: '',
    description: '',
    // Line Items
    lineItems: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    // Tax and Notes
    taxRate: 0,
    internalNotes: '',
    status: 'Pending',
  });
  const [quickUpdateForm, setQuickUpdateForm] = useState({
    recipient: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const response = await profileAPI.get();
      const subStatus = getSubscriptionStatus(response.profile.subscription);
      // TEMPORARILY UNLOCKED FOR DEVELOPMENT
      setHasAccess(true);
      // Original: setHasAccess(subStatus.isPaid);
    } catch (error) {
      console.error('Error checking access:', error);
      // TEMPORARILY UNLOCKED FOR DEVELOPMENT
      setHasAccess(true);
      // Original: setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return invoiceForm.lineItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceForm.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const addLineItem = () => {
    setInvoiceForm({
      ...invoiceForm,
      lineItems: [...invoiceForm.lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }],
    });
  };

  const removeLineItem = (index: number) => {
    const newLineItems = invoiceForm.lineItems.filter((_, i) => i !== index);
    setInvoiceForm({ ...invoiceForm, lineItems: newLineItems });
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const newLineItems = [...invoiceForm.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    
    // Auto-calculate amount when quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      newLineItems[index].amount = newLineItems[index].quantity * newLineItems[index].rate;
    }
    
    setInvoiceForm({ ...invoiceForm, lineItems: newLineItems });
  };

  // Form submission handlers
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!invoiceForm.companyName) {
      toast.error('Please enter a company name');
      return;
    }
    if (!invoiceForm.email) {
      toast.error('Please enter a client email');
      return;
    }
    if (!invoiceForm.serviceName) {
      toast.error('Please enter a service/project name');
      return;
    }
    if (!invoiceForm.issueDate || !invoiceForm.dueDate) {
      toast.error('Please select issue and due dates');
      return;
    }
    if (calculateTotal() === 0) {
      toast.error('Please add at least one line item with a value');
      return;
    }

    // Create invoice object
    const newInvoice = {
      id: `INV-${Date.now()}`,
      ...invoiceForm,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      createdAt: new Date().toISOString(),
    };

    // Add to pending invoices
    setPendingInvoices([...pendingInvoices, newInvoice]);

    // Success
    toast.success(`Invoice created successfully for ${invoiceForm.companyName}! Total: $${calculateTotal().toFixed(2)}`);
    
    // Reset form and close modal
    setInvoiceForm({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      serviceName: '',
      issueDate: '',
      dueDate: '',
      description: '',
      lineItems: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      taxRate: 0,
      internalNotes: '',
      status: 'Pending',
    });
    setShowNewInvoiceModal(false);
  };

  const handleSendInvoiceEmail = async (invoice: any) => {
    setSendingInvoiceId(invoice.id);
    
    try {
      // Format the invoice date
      const dueDate = new Date(invoice.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const issueDate = new Date(invoice.issueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Create email body
      const emailSubject = `Invoice ${invoice.id} from FilmLot360`;
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 30px; border-radius: 10px;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #9333ea; margin-bottom: 10px;">FilmLot360</h1>
            <h2 style="color: #333; margin: 0;">Invoice</h2>
          </div>

          <!-- Invoice Details -->
          <div style="background: #f9fafb; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
              <div>
                <p style="color: #6b7280; margin: 0; font-size: 14px;">Invoice Number</p>
                <p style="color: #111827; margin: 5px 0 0 0; font-weight: bold; font-size: 18px;">${invoice.id}</p>
              </div>
              <div style="text-align: right;">
                <p style="color: #6b7280; margin: 0; font-size: 14px;">Issue Date</p>
                <p style="color: #111827; margin: 5px 0 0 0;">${issueDate}</p>
              </div>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">Due Date</p>
              <p style="color: #dc2626; margin: 5px 0 0 0; font-weight: bold;">${dueDate}</p>
            </div>
          </div>

          <!-- Bill To -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #111827; margin: 0 0 15px 0;">Bill To:</h3>
            <p style="margin: 0; color: #374151; font-weight: bold;">${invoice.companyName}</p>
            ${invoice.contactPerson ? `<p style="margin: 5px 0; color: #6b7280;">${invoice.contactPerson}</p>` : ''}
            ${invoice.streetAddress ? `<p style="margin: 5px 0; color: #6b7280;">${invoice.streetAddress}</p>` : ''}
            ${invoice.city && invoice.state && invoice.zip ? `<p style="margin: 5px 0; color: #6b7280;">${invoice.city}, ${invoice.state} ${invoice.zip}</p>` : ''}
          </div>

          <!-- Service Info -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #111827; margin: 0 0 10px 0;">${invoice.serviceName}</h3>
            ${invoice.description ? `<p style="margin: 0; color: #6b7280;">${invoice.description}</p>` : ''}
          </div>

          <!-- Line Items -->
          <div style="margin-bottom: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #e5e7eb;">
                  <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 14px;">Description</th>
                  <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 14px;">Qty</th>
                  <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 14px;">Rate</th>
                  <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 14px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.lineItems.map((item: any) => `
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px; color: #374151;">${item.description}</td>
                    <td style="padding: 12px; text-align: center; color: #374151;">${item.quantity}</td>
                    <td style="padding: 12px; text-align: right; color: #374151;">$${item.rate.toFixed(2)}</td>
                    <td style="padding: 12px; text-align: right; color: #374151;">$${item.amount.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #6b7280;">Subtotal</span>
              <span style="color: #374151; font-weight: bold;">$${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
              <span style="color: #6b7280;">Tax (${invoice.taxRate}%)</span>
              <span style="color: #374151; font-weight: bold;">$${invoice.tax.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #111827; font-size: 18px; font-weight: bold;">Total</span>
              <span style="color: #9333ea; font-size: 24px; font-weight: bold;">$${invoice.total.toFixed(2)}</span>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Thank you for your business!</p>
            <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">This invoice was sent from FilmLot360 CRM</p>
          </div>
        </div>
      `;

      // Send email
      console.log('Sending invoice email to:', invoice.email);
      const result = await emailAPI.send({
        to: invoice.email,
        subject: emailSubject,
        html: emailBody,
      });

      console.log('Email sent successfully:', result);
      toast.success(`Invoice sent to ${invoice.email}!`);
      
      // Remove from pending invoices
      setPendingInvoices(pendingInvoices.filter(inv => inv.id !== invoice.id));
      
    } catch (error: any) {
      console.error('Error sending invoice email:', error);
      toast.error('Failed to send invoice: ' + (error.message || 'Unknown error'));
    } finally {
      setSendingInvoiceId(null);
    }
  };

  const handleDeletePendingInvoice = (invoiceId: string) => {
    setPendingInvoices(pendingInvoices.filter(inv => inv.id !== invoiceId));
    toast.success('Invoice deleted');
  };

  const handleExportReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!exportStartDate || !exportEndDate) {
      toast.error('Please select a date range');
      return;
    }

    // Success
    toast.success(`Exporting ${exportFormat} report from ${exportStartDate} to ${exportEndDate}`);
    
    // Reset and close
    setExportFormat('PDF');
    setExportStartDate('');
    setExportEndDate('');
    setShowExportModal(false);
  };

  const handleQuickUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!quickUpdateForm.recipient) {
      toast.error('Please enter a recipient');
      return;
    }
    if (!quickUpdateForm.subject) {
      toast.error('Please enter a subject');
      return;
    }
    if (!quickUpdateForm.message) {
      toast.error('Please enter a message');
      return;
    }

    // Success
    toast.success(`Quick update sent to ${quickUpdateForm.recipient}`);
    
    // Reset and close
    setQuickUpdateForm({
      recipient: '',
      subject: '',
      message: '',
    });
    setShowQuickUpdateModal(false);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  // Sample data
  const stats = [
    {
      label: 'Active Invoices',
      value: '1,247',
      change: '+12%',
      isPositive: true,
      icon: FileText,
      color: 'purple',
    },
    {
      label: 'Invoice Raised',
      value: '892',
      change: '+8%',
      isPositive: true,
      icon: TrendingUp,
      color: 'blue',
    },
    {
      label: 'Total Due',
      value: '$47k',
      change: '+23%',
      isPositive: true,
      icon: DollarSign,
      color: 'green',
    },
    {
      label: 'Overdue',
      value: '243',
      change: '-5%',
      isPositive: false,
      icon: AlertTriangle,
      color: 'red',
    },
  ];

  const filmProjects = [
    {
      id: 1,
      filmTitle: 'Midnight Chronicles',
      productionCompany: 'Stellar Productions',
      filmIcon: '🎬',
      invoiceInfo: 'Invoice #INV-2024-045 for post-production services',
      details: 'Budget: $45,892.00 - VFX and Color Grading',
      status: 'Pending',
      time: '2 mins ago',
      priority: 'High',
    },
    {
      id: 2,
      filmTitle: 'Urban Tales',
      productionCompany: 'Metro Films',
      filmIcon: '🎥',
      invoiceInfo: 'Equipment rental invoice for Q4 shoot',
      details: 'Camera package and lighting - 30 day rental',
      status: 'In Review',
      time: '15 mins ago',
      priority: 'Medium',
    },
  ];

  const quickUpdates = [
    {
      title: 'Analytics Dashboard',
      description: '8 monthly snapshots for comprehensive view',
    },
    {
      title: 'Invoice Statistics',
      description: 'Service usage and cost breakdowns',
    },
    {
      title: "Linda's Review",
      description: 'Feedback on care quality for last quarter',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'In Review':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Paid':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-400';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'Low':
        return 'bg-green-500/10 text-green-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
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
          featureName="Invoices & Accounts"
          description="Create, send, and track invoices for your production services. Manage accounts payable and receivable with ease."
          icon={Receipt}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-3xl mb-2">Invoice Tracking Dashboard</h1>
          <p className="text-gray-400">Monitor, track and analyze all invoice-related email communications across all service providers</p>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Mobile: New Invoice and Notifications Row */}
          <div className="flex md:hidden items-center gap-4">
            {/* New Invoice Button */}
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowNewInvoiceModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>

            {/* Notification Bell */}
            <button className="relative p-2.5 bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                {notifications.filter(n => !n.read).length}
              </span>
            </button>
          </div>

          {/* Desktop: Notification Bell */}
          <button className="hidden md:block relative p-2.5 bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {notifications.filter(n => !n.read).length}
            </span>
          </button>

          {/* Desktop: New Invoice Button */}
          <Button className="hidden md:flex bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowNewInvoiceModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>

          {/* Export Report Button - Desktop Only */}
          <Button className="hidden lg:flex bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowExportModal(true)}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>

          {/* Send Quick Update Button - Desktop Only */}
          <Button className="hidden lg:flex bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowQuickUpdateModal(true)}>
            <Send className="w-4 h-4 mr-2" />
            Send Quick Update
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-zinc-900 border-white/10 p-4 lg:p-6">
              <div className="flex flex-col gap-3 mb-3 lg:mb-4">
                <div className="flex items-start justify-between">
                  <div className="text-gray-400 text-xs lg:text-sm">{stat.label}</div>
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    stat.color === 'purple' ? 'bg-purple-500/10' :
                    stat.color === 'blue' ? 'bg-blue-500/10' :
                    stat.color === 'green' ? 'bg-green-500/10' :
                    'bg-red-500/10'
                  }`}>
                    <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${
                      stat.color === 'purple' ? 'text-purple-400' :
                      stat.color === 'blue' ? 'text-blue-400' :
                      stat.color === 'green' ? 'text-green-400' :
                      'text-red-400'
                    }`} />
                  </div>
                </div>
                <div className="text-white text-2xl lg:text-3xl">{stat.value}</div>
              </div>
              <div className={`flex items-center gap-1 text-xs lg:text-sm ${
                stat.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.isPositive ? (
                  <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                ) : (
                  <TrendingDown className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                )}
                <span className="truncate">{stat.change} {stat.isPositive ? 'increase' : 'decrease'}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Pending Invoices Section */}
        {pendingInvoices.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white text-xl">Pending Invoices</h2>
                <p className="text-gray-400 text-sm mt-1">Review and send invoices to clients</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                {pendingInvoices.length} Pending
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingInvoices.map((invoice) => (
                <Card key={invoice.id} className="bg-zinc-900 border-white/10 p-5 hover:border-purple-500/30 transition-colors">
                  {/* Invoice Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-white mb-1">{invoice.id}</h4>
                      <p className="text-gray-400 text-sm">{invoice.companyName}</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                      <Receipt className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-zinc-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Service:</span>
                      <span className="text-white">{invoice.serviceName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Due Date:</span>
                      <span className="text-white">
                        {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-purple-400 truncate ml-2">{invoice.email}</span>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-1">Total Amount</div>
                    <div className="text-white text-2xl">${invoice.total.toFixed(2)}</div>
                  </div>

                  {/* Line Items Preview */}
                  {invoice.lineItems && invoice.lineItems.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-zinc-800">
                      <div className="text-gray-400 text-xs mb-2">Line Items:</div>
                      <div className="space-y-1">
                        {invoice.lineItems.slice(0, 2).map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span className="text-gray-300 truncate mr-2">{item.description}</span>
                            <span className="text-gray-400">${item.amount.toFixed(2)}</span>
                          </div>
                        ))}
                        {invoice.lineItems.length > 2 && (
                          <div className="text-gray-500 text-xs">+{invoice.lineItems.length - 2} more items</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                      onClick={() => handleSendInvoiceEmail(invoice)}
                      disabled={sendingInvoiceId === invoice.id}
                    >
                      {sendingInvoiceId === invoice.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Email
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-red-400 hover:bg-red-500/10 hover:border-red-500/30"
                      onClick={() => handleDeletePendingInvoice(invoice.id)}
                      disabled={sendingInvoiceId === invoice.id}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Film Production Hub */}
        <div className="mb-6">
          <h2 className="text-white text-xl mb-6">Film Production Hub</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Film Projects */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Recent Film Projects</h3>
                <button className="text-purple-400 hover:text-purple-300 text-sm">
                  See more
                </button>
              </div>

              <div className="space-y-4">
                {filmProjects.map((film) => (
                  <Card key={film.id} className="bg-zinc-900 border-white/10 p-5 hover:border-purple-500/30 transition-colors cursor-pointer" onClick={() => { setSelectedFilm(film); setShowEmailDetailModal(true); }}>
                    <div className="flex items-start gap-4">
                      {/* Film Icon */}
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {film.filmIcon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white mb-1">{film.filmTitle}</h4>
                        <p className="text-gray-300 text-sm mb-2">{film.productionCompany}</p>
                        <p className="text-gray-400 text-sm mb-3">{film.invoiceInfo}</p>

                        {/* Status Row */}
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(film.status)}`}>
                            {film.status}
                          </span>
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            <span>{film.time}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs ${getPriorityColor(film.priority)}`}>
                            {film.priority}
                          </span>
                        </div>
                      </div>

                      {/* Action Icons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-400" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Mail className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Updates */}
            <div className="lg:col-span-1">
              <h3 className="text-white mb-4">Quick Updates</h3>
              <div className="space-y-3">
                {quickUpdates.map((update, index) => (
                  <Card key={index} className="bg-zinc-900 border-white/10 p-4 hover:border-purple-500/30 transition-colors cursor-pointer" onClick={() => { setQuickUpdateForm({ recipient: update.title, subject: update.title, message: update.description }); setShowQuickUpdateModal(true); }}>
                    <h4 className="text-white text-sm mb-1">{update.title}</h4>
                    <p className="text-gray-400 text-xs">{update.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-white/10 p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl">Create New Invoice</h3>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setShowNewInvoiceModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form className="p-6" onSubmit={handleCreateInvoice}>
              {/* Client Information */}
              <div className="mb-8">
                <h4 className="text-white mb-4">Client Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Company Name</label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      value={invoiceForm.companyName}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, companyName: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Contact Person</label>
                    <input
                      type="text"
                      placeholder="Enter contact name"
                      value={invoiceForm.contactPerson}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, contactPerson: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="contact@company.com"
                      value={invoiceForm.email}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, email: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={invoiceForm.phone}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, phone: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Street Address</label>
                    <input
                      type="text"
                      placeholder="123 Main Street"
                      value={invoiceForm.streetAddress}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, streetAddress: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">City</label>
                    <input
                      type="text"
                      placeholder="Los Angeles"
                      value={invoiceForm.city}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, city: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">State</label>
                    <input
                      type="text"
                      placeholder="CA"
                      value={invoiceForm.state}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, state: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">ZIP Code</label>
                    <input
                      type="text"
                      placeholder="90001"
                      value={invoiceForm.zip}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, zip: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="mb-8">
                <h4 className="text-white mb-4">Invoice Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Service/Project Name</label>
                    <input
                      type="text"
                      placeholder="Enter service or project name"
                      value={invoiceForm.serviceName}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, serviceName: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Issue Date</label>
                    <input
                      type="date"
                      value={invoiceForm.issueDate}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, issueDate: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Due Date</label>
                    <input
                      type="date"
                      value={invoiceForm.dueDate}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea
                      placeholder="Brief description of services"
                      value={invoiceForm.description}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, description: e.target.value })}
                      rows={3}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white">Line Items</h4>
                  <Button 
                    type="button"
                    onClick={addLineItem}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>

                <div className="bg-zinc-800 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10">
                    <div className="col-span-5 text-gray-400 text-sm">Description</div>
                    <div className="col-span-2 text-gray-400 text-sm">Quantity</div>
                    <div className="col-span-2 text-gray-400 text-sm">Rate</div>
                    <div className="col-span-2 text-gray-400 text-sm">Amount</div>
                    <div className="col-span-1"></div>
                  </div>
                  {invoiceForm.lineItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 last:border-b-0">
                      <div className="col-span-5">
                        <input
                          type="text"
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="0"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="0.00"
                          value={item.rate}
                          onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center h-full px-3 py-2 text-white">
                          ${item.amount.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        {invoiceForm.lineItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLineItem(index)}
                            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax and Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={invoiceForm.taxRate}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, taxRate: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Internal Notes</label>
                  <textarea
                    placeholder="Private notes (not visible to client)"
                    value={invoiceForm.internalNotes}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, internalNotes: e.target.value })}
                    rows={1}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                  />
                </div>
              </div>

              {/* Calculation Summary */}
              <div className="bg-zinc-800 rounded-lg p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white text-lg">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tax ({invoiceForm.taxRate}%)</span>
                    <span className="text-white text-lg">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10 my-2"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Total</span>
                    <span className="text-white text-2xl">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                <Button 
                  type="button"
                  onClick={() => setShowNewInvoiceModal(false)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Create Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Film Detail Modal */}
      {showEmailDetailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[450px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl">Film Project Details</h3>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setShowEmailDetailModal(false)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">Film Title:</label>
                <p className="text-white">{selectedFilm?.filmTitle}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Production Company:</label>
                <p className="text-white">{selectedFilm?.productionCompany}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Invoice Information:</label>
                <p className="text-white">{selectedFilm?.invoiceInfo}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Details:</label>
                <p className="text-white">{selectedFilm?.details}</p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Status:</label>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(selectedFilm?.status)}`}>
                    {selectedFilm?.status}
                  </span>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Priority:</label>
                  <span className={`px-2 py-0.5 rounded text-xs ${getPriorityColor(selectedFilm?.priority)}`}>
                    {selectedFilm?.priority}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">Last Updated:</label>
                <p className="text-white">{selectedFilm?.time}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl">Notifications</h3>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setShowNotifications(false)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <p className="text-white">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl">Export Report</h3>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setShowExportModal(false)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleExportReport}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm">Report Type:</label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-4 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                    <option value="CSV">CSV</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm">Date Range:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={exportStartDate}
                      onChange={(e) => setExportStartDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-4 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={exportEndDate}
                      onChange={(e) => setExportEndDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-4 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    />
                    <Calendar className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit">
                  Export
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Update Modal */}
      {showQuickUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl">Send Quick Update</h3>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setShowQuickUpdateModal(false)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleQuickUpdate}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm">Recipient:</label>
                  <input
                    type="text"
                    value={quickUpdateForm.recipient}
                    onChange={(e) => setQuickUpdateForm({ ...quickUpdateForm, recipient: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-4 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm">Subject:</label>
                  <input
                    type="text"
                    value={quickUpdateForm.subject}
                    onChange={(e) => setQuickUpdateForm({ ...quickUpdateForm, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-4 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-400 text-sm">Message:</label>
                  <textarea
                    value={quickUpdateForm.message}
                    onChange={(e) => setQuickUpdateForm({ ...quickUpdateForm, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-4 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit">
                  Send Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}