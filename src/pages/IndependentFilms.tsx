import { PageLayout } from "../components/PageLayout";
import { Award } from "lucide-react";

export function IndependentFilms() {
  return (
    <PageLayout 
      title="Independent Films" 
      subtitle="Maximize limited resources with smart planning and cost control"
    >
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl text-white">Independent Film Production</h3>
            </div>
            
            <div className="text-gray-300 space-y-6 leading-relaxed">
              <p>
                Independent films often operate with limited budgets but unlimited passion. FilmLot360 
                helps you punch above your weight class with professional tools at an affordable price.
              </p>
              
              <h4 className="text-2xl text-white mt-8 mb-4">Key Capabilities</h4>
              <ul className="space-y-3">
                {[
                  "Investor reporting and financial transparency",
                  "Maximize limited budgets with cost tracking",
                  "Volunteer crew coordination and scheduling",
                  "Festival submission tracking and deadlines",
                  "Crowdfunding integration and backer management",
                  "Professional call sheets and production documents"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
