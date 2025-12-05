import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Film, Tv, Video, Award } from "lucide-react";

const useCases = [
  {
    icon: Film,
    title: "Feature Films",
    description: "Manage complex productions with hundreds of crew members, multiple locations, and million-dollar budgets.",
    image: "https://images.unsplash.com/photo-1644959069551-029ea1fa3aab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBjYW1lcmElMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY0MzYxNTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    benefits: [
      "Track multiple shooting units simultaneously",
      "Manage large cast with stunt coordinators",
      "Monitor VFX and post-production workflows",
      "Handle international location logistics"
    ]
  },
  {
    icon: Tv,
    title: "TV Series",
    description: "Coordinate episodic productions with recurring cast, seasonal planning, and network deliverables.",
    image: "https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBsaWdodGluZyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjQzNjE1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    benefits: [
      "Episode-by-episode budget tracking",
      "Recurring character availability",
      "Season-long resource planning",
      "Script distribution and tracking"
    ]
  },
  {
    icon: Video,
    title: "Commercial & Content",
    description: "Execute rapid-turnaround projects with tight budgets, multiple clients, and quick deliverables.",
    image: "https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwY3JldyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY0MzYxNTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    benefits: [
      "Multi-client project management",
      "Quick turnaround scheduling",
      "Talent buyout tracking",
      "Client approval workflows"
    ]
  },
  {
    icon: Award,
    title: "Independent Films",
    description: "Maximize limited resources with smart planning, cost control, and efficient team coordination.",
    image: "https://images.unsplash.com/photo-1620146095812-813e2de733b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzZWF0c3xlbnwxfHx8fDE3NjQzNjE1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    benefits: [
      "Investor reporting and transparency",
      "Maximize limited budgets",
      "Volunteer crew coordination",
      "Festival submission tracking"
    ]
  }
];

export function UseCases() {
  return (
    <section id="cases" className="py-32 px-6 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full">
            <span className="text-blue-300">Use Cases</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Built For Every
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Type of Production
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From indie passion projects to major studio releases, FilmLot360 scales with your needs.
          </p>
        </div>

        <div className="space-y-32">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                    <ImageWithFallback
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} w-64 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-3xl opacity-20`}></div>
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl text-white">{useCase.title}</h3>
                </div>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {useCase.description}
                </p>

                <div className="space-y-4">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
