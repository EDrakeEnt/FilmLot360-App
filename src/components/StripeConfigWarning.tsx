import { AlertCircle, ExternalLink, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StripeConfigWarning() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold mb-1">⚠️ Stripe Configuration Error Detected</p>
          <p className="text-sm text-red-100">
            You've entered your <strong>Stripe Secret Key</strong> (sk_live_...) in a <strong>Price ID</strong> field. 
            This won't work. You need to enter the actual <strong>Price IDs</strong> (starting with "price_").
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <Link 
              to="/stripe-config" 
              className="inline-flex items-center gap-1 bg-white text-red-600 px-3 py-1 rounded hover:bg-red-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              View Configuration Status
            </Link>
            <a 
              href="https://dashboard.stripe.com/test/products" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-red-700 px-3 py-1 rounded hover:bg-red-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Go to Stripe Dashboard
            </a>
          </div>
        </div>
        <button 
          onClick={() => {
            const banner = document.querySelector('[data-stripe-warning]');
            if (banner) banner.remove();
          }}
          className="text-white hover:text-red-200 text-xl leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}

interface StripeConfigErrorProps {
  title?: string;
  children?: React.ReactNode;
}

export function StripeConfigError({ title = "Stripe Not Configured", children }: StripeConfigErrorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-red-900/20 border-2 border-red-500 rounded-lg p-8">
        <div className="flex items-start gap-4 mb-6">
          <AlertCircle className="w-12 h-12 text-red-400 flex-shrink-0" />
          <div>
            <h1 className="text-white mb-2">{title}</h1>
            <p className="text-red-200">
              {children || "The Stripe payment system is not properly configured. Please fix the configuration errors before continuing."}
            </p>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
          <h2 className="text-white mb-3">Common Issue:</h2>
          <div className="space-y-2 text-gray-300">
            <p className="flex items-start gap-2">
              <span className="text-red-400 flex-shrink-0">❌</span>
              <span>Don't use: <code className="bg-gray-800 px-2 py-0.5 rounded text-red-400">sk_live_...</code> (Secret Key)</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400 flex-shrink-0">✅</span>
              <span>Use: <code className="bg-gray-800 px-2 py-0.5 rounded text-green-400">price_...</code> (Price ID)</span>
            </p>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
          <h3 className="text-blue-400 mb-3">How to Get Price IDs:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 ml-2">
            <li>Go to Stripe Dashboard → Products</li>
            <li>Click on a product (e.g., "Starter")</li>
            <li>Find the pricing section</li>
            <li>Click (...) menu next to a price</li>
            <li>Select "Copy price ID"</li>
            <li>Paste into the environment variable</li>
          </ol>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link 
            to="/stripe-config"
            className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-center"
          >
            <Settings className="w-5 h-5 inline mr-2" />
            Check Configuration
          </Link>
          <a 
            href="https://dashboard.stripe.com/test/products"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[200px] px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all text-center"
          >
            <ExternalLink className="w-5 h-5 inline mr-2" />
            Stripe Dashboard
          </a>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
