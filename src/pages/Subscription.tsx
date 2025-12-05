import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Film, Check, Star, ArrowRight, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "figma:asset/c551745208ab5a66bd631a9b0efa045b89a039ad.png";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    period: "/month",
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
    price: "$89",
    period: "/month",
    description: "For growing production teams with multiple projects",
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
    price: "$149",
    period: "/month",
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
    price: "Custom",
    period: "",
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

export function Subscription() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planFromUrl = searchParams.get('plan') || '';
  const [selectedPlan, setSelectedPlan] = useState(planFromUrl || "professional");

  useEffect(() => {
    if (planFromUrl) {
      setSelectedPlan(planFromUrl);
    }
  }, [planFromUrl]);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Navigate to dashboard after plan selection
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="FilmLot360 Logo" className="w-10 h-10 object-contain" />
            <span className="text-white text-2xl">FilmLot360</span>
          </Link>
          <div className="text-gray-400 text-sm">Step 2 of 2</div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start with a 7-day free trial. No credit card required. Cancel anytime.
            </p>
            
            {/* Trial Reminder Notice */}
            <div className="mt-6 max-w-2xl mx-auto bg-purple-600/10 border border-purple-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-purple-300 text-left">
                You'll receive an email reminder 24 hours before your trial ends. No charges until after the trial period, and you can cancel anytime with one click.
              </p>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 transition-all ${
                  plan.popular ? 'border-purple-500 scale-105' : 'border-white/10'
                } ${
                  selectedPlan === plan.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center gap-2">
                    <Star className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">Most Popular</span>
                  </div>
                )}
                
                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>

                <button
                  onClick={() => navigate(plan.price === "Custom" ? "/contact" : `/checkout?plan=${plan.id}`)}
                  className={`w-full py-3 rounded-lg transition-all mb-8 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Continue to Checkout"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">All plans include 7-day free trial with full feature access</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-purple-400 hover:text-purple-300"
            >
              Skip for now - Start with free trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
