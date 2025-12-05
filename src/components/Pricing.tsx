import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
    ],
    popular: true
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

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. Enterprise customers can also pay via wire transfer."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! All plans come with a 7-day free trial. No credit card required to start your trial. You'll receive a reminder before your trial ends so you can decide whether to continue or cancel."
  },
  {
    question: "What happens if I exceed my project limit?",
    answer: "If you reach your project limit, you'll be prompted to upgrade to a higher tier plan. Your existing projects will remain accessible."
  },
  {
    question: "Do you offer refunds?",
    answer: "We do not offer refunds. You will have access to the systems until the end of your payment cycle."
  },
  {
    question: "Can I add more team members to my plan?",
    answer: "Yes, you can upgrade to a higher tier plan for more team members. Enterprise plans offer unlimited team members and custom pricing."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption and security practices. All data is backed up daily and stored in secure data centers."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Support levels vary by plan. Starter and Growth plans include email support, Professional includes priority support, and Enterprise includes 24/7 phone support with a dedicated account manager."
  }
];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full">
            <span className="text-purple-300">Pricing Plans</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start with a 7-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-3 rounded-md transition-all ${
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-3 rounded-md transition-all ${
                billingPeriod === "yearly"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs text-green-400">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
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
            
            return (
              <div
                key={plan.id}
                className={`bg-white/5 backdrop-blur-sm border rounded-xl p-4 sm:p-6 md:p-8 relative ${
                  plan.popular ? 'border-purple-500 ring-2 ring-purple-500/50 md:scale-105' : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-2 sm:px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-2">{plan.name}</h3>
                
                <div className="mb-4 sm:mb-6 md:mb-8">
                  <span className="text-2xl sm:text-3xl md:text-5xl text-white">{price}</span>
                  <span className="text-xs sm:text-sm md:text-base text-gray-400">{period}</span>
                </div>

                <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={price === 'Custom' ? '/contact' : `/signup?plan=${plan.id}`}
                  className={`block w-full py-2 sm:py-3 rounded-lg text-center transition-all text-xs sm:text-sm md:text-base ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-4xl text-white mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-400">Everything you need to know about FilmLot360 pricing</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-white pr-8">{faq.question}</span>
                  <div className={`transform transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}