import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Film, Check, ArrowRight, Calendar, CreditCard, Shield, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "figma:asset/c551745208ab5a66bd631a9b0efa045b89a039ad.png";
import { projectId, publicAnonKey } from "../utils/supabase/info.tsx";
import { StripeConfigError } from "../components/StripeConfigWarning";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    yearlyPrice: 490,
    description: "Perfect for independent filmmakers and small productions",
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
    price: 89,
    yearlyPrice: 890,
    description: "For growing production teams with multiple projects",
    features: [
      "Up to 20 active projects",
      "50 team members",
      "50GB storage",
      "Advanced reporting",
      "Priority email support",
      "Mobile app access",
      "Invoice and accounts",
      "Email and templates calendar",
      "Reports and call sheets"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: 149,
    yearlyPrice: 1490,
    description: "For production companies managing multiple projects",
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
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    yearlyPrice: 0,
    custom: true,
    description: "For studios and large-scale productions",
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

export function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'professional';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'none'>('none');

  const selectedPlan = plans.find(p => p.id === planId) || plans[2];
  const displayPrice = billingCycle === 'monthly' ? selectedPlan.price : selectedPlan.yearlyPrice;
  const savings = selectedPlan.price * 12 - selectedPlan.yearlyPrice;

  // Card information state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stripeConfigError, setStripeConfigError] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    if (!cleanedCardNumber || cleanedCardNumber.length !== 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    
    if (!expiry || expiry.length !== 5) {
      newErrors.expiry = 'Valid expiry date is required';
    }
    
    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Valid CVV is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartTrial = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitError("");
    setStripeConfigError(false);

    try {
      const userId = sessionStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('User session not found. Please sign up again.');
      }

      // Process checkout with backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            plan: selectedPlan.id,
            billingCycle,
            cardInfo: {
              cardNumber,
              cardholderName,
              expiry,
            }
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Check if this is a Stripe configuration error
        if (data.error && (
          data.error.includes('Invalid Stripe Price ID format') ||
          data.error.includes('Secret Key instead of a Price ID') ||
          data.error.includes('Price configuration missing') ||
          data.error.includes('should start with') ||
          data.error.includes('sk_')
        )) {
          setStripeConfigError(true);
          return;
        }
        
        throw new Error(data.error || 'Failed to process checkout');
      }

      console.log("Checkout successful:", data);

      // Navigate to email verification page
      navigate("/verify-email");
      
    } catch (err: any) {
      console.error("Checkout error:", err);
      setSubmitError(err.message || "Failed to process checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If Stripe is misconfigured, show error page
  if (stripeConfigError) {
    return (
      <StripeConfigError title="Stripe Payment Configuration Error">
        You've entered a <strong>Stripe Secret Key</strong> (starts with <code className="bg-gray-800 px-2 py-1 rounded">sk_</code>) 
        in the <strong>Price ID</strong> environment variable. This must be fixed before payments can be processed.
      </StripeConfigError>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="FilmLot360 Logo" className="w-10 h-10 object-contain" />
            <span className="text-white text-2xl">FilmLot360</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Secure Checkout</span>
            <Shield className="w-5 h-5 text-green-500" />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link 
            to="/subscription"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Change Plan
          </Link>

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{submitError}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Order Summary */}
            <div>
              <h1 className="text-4xl text-white mb-2">Complete Your Order</h1>
              <p className="text-gray-400 mb-8">
                Start your 7-day free trial today. No payment required.
              </p>

              {/* Trial Notice */}
              <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl text-white mb-2">7-Day Free Trial</h3>
                    <p className="text-purple-300 text-sm leading-relaxed">
                      You won't be charged today. Your trial starts immediately and you'll have full access to all {selectedPlan.name} plan features. Your card will be charged ${displayPrice} on <span className="font-semibold">December 6, 2025 at 11:59 PM</span>. We'll send you a reminder email 24 hours before your trial ends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Billing Cycle Toggle */}
              <div className="mb-8">
                <label className="block text-gray-300 mb-4">Billing Cycle (After Trial)</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`flex-1 px-6 py-4 rounded-lg border transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-purple-600/20 border-purple-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-sm mb-1">Monthly</div>
                    <div className="text-2xl">${selectedPlan.price}</div>
                    <div className="text-sm text-gray-400">per month</div>
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`flex-1 px-6 py-4 rounded-lg border transition-all relative ${
                      billingCycle === 'yearly'
                        ? 'bg-purple-600/20 border-purple-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {savings > 0 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-xs text-white whitespace-nowrap">
                        Save ${savings}
                      </div>
                    )}
                    <div className="text-sm mb-1">Yearly</div>
                    <div className="text-2xl">${selectedPlan.yearlyPrice}</div>
                    <div className="text-sm text-gray-400">per year</div>
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <label className="block text-gray-300 mb-4">Payment Method</label>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Payment Information</span>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Cardholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.cardholderName ? 'border-red-500' : 'border-white/10'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                      />
                      {errors.cardholderName && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
                      )}
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.cardNumber ? 'border-red-500' : 'border-white/10'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.expiry ? 'border-red-500' : 'border-white/10'
                          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                        />
                        {errors.expiry && (
                          <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.cvv ? 'border-red-500' : 'border-white/10'
                          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-400">
                        Your card will be charged ${displayPrice} on December 6, 2025 at 11:59 PM. All transactions are secure and encrypted.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Trial Button */}
              <button
                onClick={handleStartTrial}
                disabled={loading}
                className="w-full px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-3 group text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Start My Free Trial"}
                {!loading && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By starting your trial, you agree to our{" "}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Right Column - Plan Details */}
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sticky top-8">
                <h2 className="text-2xl text-white mb-6">Order Summary</h2>

                {/* Plan Card */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl text-white mb-1">{selectedPlan.name} Plan</h3>
                      <p className="text-sm text-gray-400">{selectedPlan.description}</p>
                    </div>
                    {selectedPlan.popular && (
                      <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs text-white whitespace-nowrap">
                        Popular
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-gray-300">
                        {billingCycle === 'monthly' ? 'Monthly' : 'Annual'} Subscription
                      </span>
                      <span className="text-2xl text-white">
                        ${displayPrice}
                        <span className="text-sm text-gray-400">
                          /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </span>
                    </div>
                    {billingCycle === 'yearly' && savings > 0 && (
                      <p className="text-sm text-green-400">
                        You're saving ${savings} per year
                      </p>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Due Today</span>
                      <span className="text-3xl text-white">$0</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      First charge: ${displayPrice} on Dec 6, 2025 at 11:59 PM
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div>
                  <h3 className="text-lg text-white mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Guarantee */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white mb-1">Cancel Anytime Guarantee</h4>
                      <p className="text-sm text-gray-400">
                        Cancel with one click, anytime during or after your trial. No questions asked, no fees.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}