import { PageLayout } from "../components/PageLayout";
import { Users, Target, Heart } from "lucide-react";

export function About() {
  return (
    <PageLayout 
      title="About FilmLot360" 
      subtitle="Built by filmmakers, for filmmakers"
    >
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 mb-12">
            <h3 className="text-3xl text-white mb-6">Our Story</h3>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                FilmLot360 was born from frustration. After years of working on film productions of all sizes, 
                our founders experienced firsthand the chaos of managing projects with scattered tools, 
                endless spreadsheets, and communication breakdowns.
              </p>
              <p>
                We knew there had to be a better way. So in 2020, we set out to build the production 
                management system we wish we'd had on set. A platform that would bring together every 
                aspect of production—from pre to post—in one intuitive, powerful system.
              </p>
              <p>
                Today, FilmLot360 powers thousands of productions worldwide, from independent passion 
                projects to major studio releases. But our mission remains the same: give filmmakers 
                back their time so they can focus on what matters most—telling great stories.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "Empower filmmakers with technology that simplifies production management and maximizes creativity."
              },
              {
                icon: Heart,
                title: "Our Values",
                description: "Authenticity, innovation, and dedication to the craft of filmmaking guide everything we do."
              },
              {
                icon: Users,
                title: "Our Team",
                description: "A diverse group of filmmakers, engineers, and designers passionate about improving the industry."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl text-white mb-4">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
