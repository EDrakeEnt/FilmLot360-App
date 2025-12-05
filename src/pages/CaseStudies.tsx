import { PageLayout } from "../components/PageLayout";
import { TrendingUp, Users, DollarSign } from "lucide-react";

const caseStudies = [
  {
    company: "Midnight Sun Productions",
    project: "Feature Film: 'Northern Lights'",
    challenge: "Managing a $5M budget across 3 countries with 150+ crew members",
    results: [
      { icon: DollarSign, value: "15%", label: "Under Budget" },
      { icon: Users, value: "200+", label: "Team Members" },
      { icon: TrendingUp, value: "30%", label: "Time Saved" }
    ],
    quote: "FilmLot360 was instrumental in keeping our complex international production on track and under budget."
  },
  {
    company: "Chen Films",
    project: "Documentary Series: 'Urban Stories'",
    challenge: "Coordinating 12 episodes across 8 months with limited budget",
    results: [
      { icon: DollarSign, value: "25%", label: "Cost Reduction" },
      { icon: Users, value: "50+", label: "Contributors" },
      { icon: TrendingUp, value: "40%", label: "Faster Delivery" }
    ],
    quote: "The flexibility of FilmLot360 allowed us to adapt as our story evolved, which is crucial for documentary work."
  }
];

export function CaseStudies() {
  return (
    <PageLayout 
      title="Case Studies" 
      subtitle="Real productions, real results"
    >
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
            >
              <div className="mb-8">
                <h3 className="text-3xl text-white mb-2">{study.company}</h3>
                <p className="text-xl text-purple-400">{study.project}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl text-white mb-3">Challenge</h4>
                <p className="text-gray-300">{study.challenge}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {study.results.map((result, resultIndex) => (
                  <div
                    key={resultIndex}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <result.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl text-white mb-2">{result.value}</div>
                    <div className="text-gray-400">{result.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-6">
                <p className="text-lg text-gray-300 italic">"{study.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
