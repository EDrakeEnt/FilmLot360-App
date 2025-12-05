import { PageLayout } from "../components/PageLayout";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for independent filmmakers and small productions",
    features: [
      "Up to 3 active projects",
      "50 team members",
      "10GB storage",
      "Basic reporting",
      "Email support",
      "Mobile app access"
    ]
  },
  {
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
      "White-label option"
    ],
    popular: true
  },
  {
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

export function Pricing() {
  return (
    <PageLayout 
      title="Pricing" 
      subtitle="Choose the plan that fits your production needs"
    >
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 ${
                  plan.popular ? 'border-purple-500 scale-105' : 'border-white/10'
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

                <button className={`w-full py-3 rounded-lg transition-all mb-8 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}>
                  {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
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

          <div className="mt-20 text-center">
            <p className="text-gray-400 mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <p className="text-gray-500">Need a custom solution? Contact our sales team.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
