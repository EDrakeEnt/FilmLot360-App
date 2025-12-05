import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { Check, CreditCard, Calendar, X, ExternalLink } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

const plans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 470,
    features: [
      "Up to 5 active projects",
      "20 team members",
      "10GB storage",
      "Basic reporting",
      "Email support",
      "Mobile app access"
    ]
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 89,
    yearlyPrice: 854,
    features: [
      "Up to 20 active projects",
      "50 team members",
      "10GB storage",
      "Basic reporting",
      "Email support",
      "Mobile app access",
      "Invoice and accounts",
      "Email and templates calendar",
      "Reports and call sheets"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 149,
    yearlyPrice: 1430,
    features: [
      "Unlimited projects",
      "200 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Invoice and accounts",
      "Email and templates calendar",
      "Reports and call sheets"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Unlimited everything",
      "Unlimited storage",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom development",
      "SLA guarantee",
      "Advanced security",
      "On-premise option"
    ]
  }
];

export function DashboardSubscription() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);

  // Fetch current subscription status
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) return;

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/profile`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.profile?.subscription) {
            setCurrentPlan(data.profile.subscription.plan);
            setSubscriptionData(data.profile.subscription);
          }
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
      }
    };

    fetchSubscription();
  }, []);

  const handleUpgrade = async (planName: string) => {
    if (plans.find(p => p.name === planName)?.monthlyPrice === null) {
      // For enterprise plan, open contact form or email
      window.location.href = 'mailto:sales@filmlot360.com?subject=Enterprise Plan Inquiry';
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Please sign in to upgrade your plan');
      }

      // Create Stripe checkout session
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            planName,
            billingPeriod,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error('Checkout session error:', {
          status: response.status,
          statusText: response.statusText,
          error: data.error,
          hint: data.hint,
          priceId: data.priceId,
          fullResponse: data
        });
        throw new Error(data.error || data.hint || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (!data.url) {
        console.error('No checkout URL received:', data);
        throw new Error('No checkout URL received from server');
      }

      console.log('Redirecting to Stripe checkout:', data.url);
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Upgrade error:', err);
      setError(err.message || 'Failed to start checkout process');
      alert(`Error: ${err.message || 'Failed to start checkout process'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Please sign in to manage billing');
      }

      // Create Stripe customer portal session
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/create-portal-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to open billing portal');
      }

      // Redirect to Stripe Customer Portal
      window.location.href = data.url;
    } catch (err: any) {
      console.error('Billing portal error:', err);
      setError(err.message || 'Failed to open billing portal');
      alert(`Error: ${err.message || 'Failed to open billing portal'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in real app, this would integrate with payment processor
    alert("Payment method added successfully!");
    setIsPaymentModalOpen(false);
    // Reset form
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardName("");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2">Subscription</h1>
          <p className="text-gray-400">Manage your subscription and billing</p>
        </div>

        {/* Current Plan */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl text-white mb-2">Professional Plan</h2>
              <p className="text-gray-300 mb-4">You're on the Professional plan with full access to all features</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Trial ends Dec 6, 2025 (7 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Reminder sent on Dec 5, 2025</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button 
                onClick={handleManageBilling}
                disabled={loading}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <ExternalLink className="w-4 h-4" />
                Manage Billing
              </button>
              <button 
                onClick={() => setIsPaymentModalOpen(true)}
                className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Add Payment Method
              </button>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h3 className="text-2xl text-white">Available Plans</h3>
            
            {/* Billing Period Toggle */}
            <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  billingPeriod === "monthly"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  billingPeriod === "yearly"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Yearly
                <span className="ml-1 text-xs text-green-400">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const price = plan.monthlyPrice === null 
                ? "Custom" 
                : billingPeriod === "monthly" 
                  ? `$${plan.monthlyPrice}` 
                  : `$${plan.yearlyPrice}`;
              const period = plan.monthlyPrice === null 
                ? "" 
                : billingPeriod === "monthly" 
                  ? "/month" 
                  : "/year";
              
              // Check if this is the current plan based on actual subscription data
              const isCurrentPlan = currentPlan && plan.name.toLowerCase() === currentPlan.toLowerCase();
              
              return (
                <div
                  key={plan.id}
                  className={`bg-white/5 backdrop-blur-sm border rounded-xl p-6 ${
                    isCurrentPlan ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-white/10'
                  }`}
                >
                  {isCurrentPlan && (
                    <div className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
                      Current Plan
                    </div>
                  )}
                  
                  <h4 className="text-2xl text-white mb-2">{plan.name}</h4>
                  
                  <div className="mb-6">
                    <span className="text-4xl text-white">{price}</span>
                    <span className="text-gray-400">{period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg transition-all ${
                      isCurrentPlan
                        ? 'bg-white/10 border border-white/20 text-white cursor-default'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    }`}
                    disabled={isCurrentPlan || loading}
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {isCurrentPlan ? 'Current Plan' : price === 'Custom' ? 'Contact Sales' : 'Upgrade'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing History */}
        <div className="mt-12">
          <h3 className="text-2xl text-white mb-6">Billing History</h3>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <p className="text-gray-400 text-center py-8">No billing history yet. You're currently on a free trial.</p>
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-xl max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-2xl text-white mb-2">Add Payment Method</h2>
              <p className="text-gray-400 text-sm">Enter your card details to add a payment method</p>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-300 text-xs">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}