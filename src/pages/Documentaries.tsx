import { PageLayout } from "../components/PageLayout";
import { Camera } from "lucide-react";

export function Documentaries() {
  return (
    <PageLayout 
      title="Documentaries" 
      subtitle="Manage evolving stories with flexible production workflows"
    >
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl text-white">Documentary Production</h3>
            </div>
            
            <div className="text-gray-300 space-y-6 leading-relaxed">
              <p>
                Documentary production is unique—stories evolve, schedules change, and you need 
                flexibility without losing organization. FilmLot360 adapts to your process.
              </p>
              
              <h4 className="text-2xl text-white mt-8 mb-4">Key Capabilities</h4>
              <ul className="space-y-3">
                {[
                  "Flexible scheduling for unpredictable shooting",
                  "Interview subject tracking and release forms",
                  "Research and source material organization",
                  "Grant application and funding tracking",
                  "Archival footage licensing management",
                  "Long-form edit coordination and versioning"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
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
