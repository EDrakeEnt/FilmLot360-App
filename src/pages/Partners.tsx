import { PageLayout } from "../components/PageLayout";
import { Handshake, Globe, Zap, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const partnerTiers = [
  {
    icon: Award,
    title: "Technology Partners",
    description: "Integrate your product with FilmLot360",
    benefits: ["API access", "Co-marketing opportunities", "Technical support", "Revenue sharing"]
  },
  {
    icon: Globe,
    title: "Reseller Partners",
    description: "Bring FilmLot360 to your market",
    benefits: ["Attractive margins", "Sales training", "Marketing materials", "Dedicated support"]
  },
  {
    icon: Zap,
    title: "Agency Partners",
    description: "Recommend FilmLot360 to your clients",
    benefits: ["Referral commissions", "Priority support", "Co-branding options", "Account management"]
  }
];

export function Partners() {
  const navigate = useNavigate();

  return (
    <PageLayout 
      title="Partners" 
      subtitle="Grow your business with FilmLot360"
    >
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Partner Intro */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl text-white mb-4">Partner with FilmLot360</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join our growing partner ecosystem and help filmmakers worldwide create better productions.
            </p>
          </div>

          {/* Partner Tiers */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {partnerTiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <tier.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl text-white mb-3">{tier.title}</h4>
                <p className="text-gray-400 mb-6">{tier.description}</p>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
            <h3 className="text-3xl text-white mb-4">Become a Partner</h3>
            <p className="text-xl text-gray-300 mb-8">
              Let's build something great together. Apply to join our partner program today.
            </p>
            <button 
              onClick={() => navigate('/partners/apply')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}