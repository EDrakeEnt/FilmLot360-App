import { PageLayout } from "../components/PageLayout";
import { Video } from "lucide-react";

export function Commercials() {
  return (
    <PageLayout 
      title="Commercials" 
      subtitle="Execute rapid-turnaround projects with multiple clients"
    >
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl text-white">Commercial Production</h3>
            </div>
            
            <div className="text-gray-300 space-y-6 leading-relaxed">
              <p>
                Commercial production moves fast. With tight deadlines, multiple clients, and quick turnarounds, 
                you need a system that keeps pace without sacrificing quality or organization.
              </p>
              
              <h4 className="text-2xl text-white mt-8 mb-4">Key Capabilities</h4>
              <ul className="space-y-3">
                {[
                  "Multi-client project management in one dashboard",
                  "Quick turnaround scheduling and resource allocation",
                  "Talent buyout tracking and usage rights management",
                  "Client approval workflows with revision tracking",
                  "Shot list and storyboard integration",
                  "Rapid invoice generation and payment tracking"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
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
