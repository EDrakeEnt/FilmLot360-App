import { Card } from './ui/card';
import { Button } from './ui/button';
import { Mail, CheckCircle, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { projectId } from '../utils/supabase/info';

export function ResendSetupInstructions() {
  const [copied, setCopied] = useState<string | null>(null);
  
  const webhookUrl = `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/email/webhook/inbound`;
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-white text-xl mb-2">📬 Enable Inbound Email Replies</h3>
          <p className="text-gray-300 text-sm">
            Configure Resend to forward email replies back to your application
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              1
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">Add a Domain in Resend</h4>
              <p className="text-gray-400 text-sm mb-3">
                First, you need to add and verify your domain in Resend
              </p>
              <a
                href="https://resend.com/domains"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Go to Resend Domains
              </a>
            </div>
          </div>
          
          <div className="ml-9 space-y-3">
            <div>
              <p className="text-gray-300 text-sm font-medium mb-2">Step-by-step:</p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Click "Add Domain" in Resend</p>
                <p>• Enter your domain (e.g., filmlot360.com or yourdomain.com)</p>
                <p>• Resend will show you DNS records to add</p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <h5 className="text-yellow-400 font-medium text-sm mb-2">📋 DNS Records You'll Need to Add:</h5>
              <div className="space-y-3 text-xs">
                <div className="bg-zinc-800 rounded p-2">
                  <div className="text-purple-400 font-medium mb-1">SPF Record (TXT)</div>
                  <div className="text-gray-300 font-mono">
                    Name: @ or yourdomain.com<br/>
                    Value: v=spf1 include:resend.com ~all
                  </div>
                </div>
                <div className="bg-zinc-800 rounded p-2">
                  <div className="text-purple-400 font-medium mb-1">DKIM Record (TXT)</div>
                  <div className="text-gray-300 font-mono">
                    Name: resend._domainkey<br/>
                    Value: (Resend will provide this - it's a long string)
                  </div>
                </div>
                <div className="bg-zinc-800 rounded p-2">
                  <div className="text-purple-400 font-medium mb-1">MX Record (for inbound)</div>
                  <div className="text-gray-300 font-mono">
                    Name: @ or yourdomain.com<br/>
                    Priority: 10<br/>
                    Value: mx.resend.com
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-300 text-sm font-medium mb-2">Where to add DNS records:</p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• <span className="text-purple-400">GoDaddy:</span> My Products → Domain → DNS Management</p>
                <p>• <span className="text-purple-400">Namecheap:</span> Domain List → Manage → Advanced DNS</p>
                <p>• <span className="text-purple-400">Cloudflare:</span> Domain → DNS → Records</p>
                <p>• <span className="text-purple-400">Google Domains:</span> My Domains → DNS</p>
                <p>• <span className="text-purple-400">Other providers:</span> Look for "DNS Settings" or "DNS Management"</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-400 text-sm">
                ⏱️ <span className="font-medium">Verification Time:</span> DNS changes typically take 5-30 minutes, 
                but can take up to 48 hours. Resend will automatically verify once the records are detected.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              2
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">Configure Inbound Email Routing</h4>
              <p className="text-gray-400 text-sm mb-3">
                Set up a webhook to receive incoming emails
              </p>
            </div>
          </div>
          
          <div className="ml-9 space-y-3">
            <div>
              <p className="text-gray-300 text-sm mb-2">
                Go to your domain settings in Resend and add this webhook URL:
              </p>
              <div className="bg-zinc-800 border border-white/10 rounded-lg p-3 flex items-center gap-2">
                <code className="text-purple-400 text-sm flex-1 break-all">
                  {webhookUrl}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 text-gray-300 flex-shrink-0"
                  onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}
                >
                  {copied === 'Webhook URL' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-300 space-y-1">
              <p>• Go to <a href="https://resend.com/inbound" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">Resend Inbound Settings</a></p>
              <p>• Click on your domain</p>
              <p>• Add a new inbound route</p>
              <p>• Set the webhook URL above</p>
              <p>• Select "Forward to webhook" option</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              3
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">Test It Out!</h4>
              <p className="text-gray-400 text-sm mb-3">
                Send an email from FilmLot360, then reply to it
              </p>
            </div>
          </div>
          
          <div className="ml-9 space-y-2 text-sm text-gray-300">
            <p>• Compose and send an email from FilmLot360</p>
            <p>• Reply to that email from your inbox</p>
            <p>• The reply will appear in the "Received" tab automatically!</p>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-blue-400 font-medium mb-1">Important Notes</h4>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>You must verify a domain to receive inbound emails</li>
              <li>Sandbox mode (onboarding@resend.dev) cannot receive emails</li>
              <li>Inbound emails are matched to users based on conversation history</li>
              <li>Make sure your webhook endpoint is publicly accessible</li>
            </ul>
          </div>
        </div>

        {/* Alternative: Email Forwarding */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              💡
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">Alternative: Use Email Forwarding</h4>
              <p className="text-gray-400 text-sm mb-3">
                If you don't want to set up a custom domain, you can configure email forwarding in your email client
              </p>
            </div>
          </div>
          
          <div className="ml-9 text-sm text-gray-300 space-y-1">
            <p>Most email providers (Gmail, Outlook, etc.) support forwarding rules</p>
            <p>You can forward specific emails to the webhook endpoint above</p>
          </div>
        </div>
      </div>
    </Card>
  );
}