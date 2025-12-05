import { Card } from './ui/card';
import { Button } from './ui/button';
import { Mail, CheckCircle, AlertCircle, Loader2, ExternalLink, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { createClient } from '../utils/supabase/client';
import { projectId } from '../utils/supabase/info';

interface EmailDomainSettingsProps {
  onDomainChange?: (domain: string) => void;
}

export function EmailDomainSettings({ onDomainChange }: EmailDomainSettingsProps) {
  const [customDomain, setCustomDomain] = useState('');
  const [savedDomain, setSavedDomain] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'checking' | 'verified' | 'unverified' | 'error'>('checking');

  useEffect(() => {
    loadDomainSettings();
  }, []);

  const loadDomainSettings = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/email/domain`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setSavedDomain(result.domain || '');
        setCustomDomain(result.domain || '');
        setVerificationStatus(result.verified ? 'verified' : 'unverified');
      }
    } catch (error) {
      console.error('Error loading domain settings:', error);
      setVerificationStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDomain = async () => {
    try {
      setSaving(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        toast.error('Please sign in to save settings');
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/email/domain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ domain: customDomain }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save domain');
      }

      const result = await response.json();
      setSavedDomain(customDomain);
      setVerificationStatus(result.verified ? 'verified' : 'unverified');
      toast.success('Domain saved successfully!');
      
      if (onDomainChange) {
        onDomainChange(customDomain);
      }
    } catch (error: any) {
      console.error('Error saving domain:', error);
      toast.error(error.message || 'Failed to save domain');
    } finally {
      setSaving(false);
    }
  };

  const handleCheckVerification = async () => {
    try {
      setVerificationStatus('checking');
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        toast.error('Please sign in');
        setVerificationStatus('error');
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/email/domain/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ domain: savedDomain }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to verify domain');
      }

      const result = await response.json();
      setVerificationStatus(result.verified ? 'verified' : 'unverified');
      
      if (result.verified) {
        toast.success('✅ Domain is verified and ready to use!');
      } else {
        toast.error('Domain not yet verified. Please check your DNS settings.', {
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error('Error checking verification:', error);
      setVerificationStatus('error');
      toast.error(error.message || 'Failed to check verification');
    }
  };

  if (loading) {
    return (
      <Card className="bg-zinc-900/50 border-white/10 p-6">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900/50 border-white/10 p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Settings className="w-5 h-5 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-white mb-1">Email Domain Settings</h3>
          <p className="text-gray-400 text-sm">
            Configure your custom email domain for sending emails
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Domain Input */}
        <div>
          <label className="text-gray-300 text-sm mb-2 block">
            Custom Domain
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="yourdomain.com"
              className="flex-1 px-4 py-2 bg-zinc-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <Button
              onClick={handleSaveDomain}
              disabled={saving || !customDomain || customDomain === savedDomain}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Enter your verified domain from Resend (e.g., filmlot360.com)
          </p>
        </div>

        {/* Verification Status */}
        {savedDomain && (
          <div className="bg-zinc-800/50 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {verificationStatus === 'checking' && (
                  <>
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    <span className="text-blue-400 text-sm">Checking verification...</span>
                  </>
                )}
                {verificationStatus === 'verified' && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Domain Verified</span>
                  </>
                )}
                {verificationStatus === 'unverified' && (
                  <>
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">Domain Not Verified</span>
                  </>
                )}
                {verificationStatus === 'error' && (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm">Verification Error</span>
                  </>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCheckVerification}
                disabled={verificationStatus === 'checking'}
                className="border-white/10 text-gray-300 hover:text-white"
              >
                Check Status
              </Button>
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <p className="font-medium">Current domain: <span className="text-purple-400">{savedDomain}</span></p>
              
              {verificationStatus === 'verified' ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded p-2 text-green-400 text-xs">
                  ✓ You can now send emails from @{savedDomain}
                </div>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2 text-yellow-400 text-xs">
                  ⚠ Please verify your domain in Resend to send emails
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10">
              <a
                href="https://resend.com/domains"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Manage domains in Resend
              </a>
            </div>
          </div>
        )}

        {/* Default Email Address */}
        {savedDomain && verificationStatus === 'verified' && (
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Default From Address
            </label>
            <div className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-white">no-reply@{savedDomain}</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              This will be used as the sender address for all outgoing emails
            </p>
          </div>
        )}

        {/* Sandbox Mode Warning */}
        {!savedDomain && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-yellow-400 font-medium mb-1">Sandbox Mode Active</h4>
              <p className="text-gray-300 text-sm">
                Without a verified domain, you can only send emails to your verified test address (edrake@edrakeenterprise.com). 
                Add and verify a domain to send to any recipient.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
