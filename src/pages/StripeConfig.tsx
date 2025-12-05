import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function StripeConfig() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConfig();
  }, []);

  const checkConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/check-stripe-config`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Error checking config:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
        <div className="text-white">Loading configuration...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">Stripe Configuration Status</h1>
          <p className="text-gray-300">
            Check your Stripe API configuration and fix any issues
          </p>
        </div>

        {/* Overall Status */}
        <div className={`p-6 rounded-lg mb-6 ${
          config?.status === 'READY' 
            ? 'bg-green-900/20 border border-green-500/30' 
            : 'bg-red-900/20 border border-red-500/30'
        }`}>
          <div className="flex items-start gap-3">
            {config?.status === 'READY' ? (
              <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-400 mt-1" />
            )}
            <div>
              <h2 className={`mb-2 ${
                config?.status === 'READY' ? 'text-green-400' : 'text-red-400'
              }`}>
                {config?.status === 'READY' ? 'All Set!' : 'Configuration Needed'}
              </h2>
              <p className="text-gray-300">{config?.instructions}</p>
            </div>
          </div>
        </div>

        {/* Secret Key Status */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-white mb-4 flex items-center gap-2">
            {config?.config?.secretKey?.valid ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            Stripe Secret Key
          </h3>
          <div className="text-gray-300 space-y-2">
            <p>
              Status: {config?.config?.secretKey?.configured ? (
                <span className={config?.config?.secretKey?.valid ? 'text-green-400' : 'text-red-400'}>
                  {config?.config?.secretKey?.valid ? 'Valid' : 'Invalid format'}
                </span>
              ) : (
                <span className="text-red-400">Not configured</span>
              )}
            </p>
            {config?.config?.secretKey?.configured && (
              <p className="text-sm text-gray-400 font-mono">
                {config?.config?.secretKey?.value}
              </p>
            )}
          </div>
        </div>

        {/* Webhook Secret Status */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-white mb-4 flex items-center gap-2">
            {config?.config?.webhookSecret?.valid ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            )}
            Webhook Secret
          </h3>
          <div className="text-gray-300">
            <p>
              Status: {config?.config?.webhookSecret?.configured ? (
                <span className={config?.config?.webhookSecret?.valid ? 'text-green-400' : 'text-yellow-400'}>
                  {config?.config?.webhookSecret?.valid ? 'Valid' : 'Check format'}
                </span>
              ) : (
                <span className="text-yellow-400">Optional - needed for production</span>
              )}
            </p>
          </div>
        </div>

        {/* Price IDs Status */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-white mb-4">Price IDs Configuration</h3>
          <div className="space-y-3">
            {Object.entries(config?.config?.priceIds || {}).map(([key, value]: [string, any]) => (
              <div 
                key={key}
                className={`p-4 rounded-lg border ${
                  value.valid 
                    ? 'bg-green-900/10 border-green-500/30' 
                    : 'bg-red-900/10 border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {value.valid ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-white font-mono text-sm">
                        {key}
                      </span>
                    </div>
                    {value.configured && (
                      <p className="text-xs text-gray-400 font-mono ml-6">
                        {value.value}
                      </p>
                    )}
                    {value.issue && (
                      <p className="text-sm text-red-400 ml-6 mt-1">
                        {value.issue}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-blue-400 mb-4">How to Fix Issues</h3>
          <div className="text-gray-300 space-y-4">
            <div>
              <h4 className="text-white mb-2">1. Get Price IDs from Stripe Dashboard:</h4>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Go to <a href="https://dashboard.stripe.com/test/products" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                  Stripe Products <ExternalLink className="w-3 h-3" />
                </a></li>
                <li>Click on a product (e.g., "Starter")</li>
                <li>Under "Pricing", you'll see your price(s)</li>
                <li>Click the three dots (...) next to a price</li>
                <li>Select "Copy price ID" - it will start with <code className="bg-gray-800 px-1 rounded">price_</code></li>
                <li>Paste it into the corresponding environment variable</li>
              </ol>
            </div>

            <div>
              <h4 className="text-white mb-2">2. Common Mistakes:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><span className="text-red-400">Don't use the Secret Key</span> (starts with <code className="bg-gray-800 px-1 rounded">sk_</code>) in Price ID fields</li>
                <li><span className="text-red-400">Don't use the Product ID</span> (starts with <code className="bg-gray-800 px-1 rounded">prod_</code>)</li>
                <li><span className="text-green-400">Use the Price ID</span> (starts with <code className="bg-gray-800 px-1 rounded">price_</code>)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-2">3. Required Products & Prices:</h4>
              <div className="space-y-2 ml-4">
                <p>Create these products in Stripe with monthly and yearly prices:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Starter</strong>: $49/month, $470/year</li>
                  <li><strong>Growth</strong>: $89/month, $854/year</li>
                  <li><strong>Professional</strong>: $149/month, $1430/year</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={checkConfig}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Recheck Configuration
          </button>
        </div>
      </div>
    </div>
  );
}