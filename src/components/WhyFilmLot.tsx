import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AlertCircle, TrendingDown, Users, Clock } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Scattered Information",
    description: "Your production data is spread across emails, spreadsheets, and sticky notes. Finding critical information takes hours instead of seconds.",
    color: "text-red-400"
  },
  {
    icon: TrendingDown,
    title: "Budget Overruns",
    description: "Without real-time tracking, costs spiral out of control. You only discover budget issues when it's too late to fix them.",
    color: "text-orange-400"
  },
  {
    icon: Users,
    title: "Communication Breakdowns",
    description: "Crew members miss call times, actors have conflicting schedules, and departments work in silos. Chaos becomes the norm.",
    color: "text-yellow-400"
  },
  {
    icon: Clock,
    title: "Wasted Time",
    description: "Your team spends more time on administrative tasks than creative work. Manual processes eat away at productivity and budgets.",
    color: "text-blue-400"
  }
];

const solutions = [
  "Centralized data accessible from anywhere, anytime",
  "Real-time budget tracking with instant alerts",
  "Automated scheduling prevents conflicts",
  "Smart automation cuts admin time by 70%",
  "Unified communication keeps everyone aligned",
  "Instant reports for stakeholders and investors"
];

export function WhyFilmLot() {
  return (
    <section id="why" className="py-32 px-6 bg-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full">
            <span className="text-red-300">The Problem</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Film Production is
            <br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Unnecessarily Hard
            </span>
          </h2>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 mb-20">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-zinc-950/50 border border-red-500/20 rounded-2xl p-4 sm:p-6 md:p-8"
            >
              <problem.icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${problem.color} mb-3 sm:mb-4`} />
              <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3">{problem.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* The Solution */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center bg-zinc-950/80 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-12">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full">
                <span className="text-green-300">The Solution</span>
              </div>
              <h3 className="text-4xl md:text-5xl text-white mb-6">
                FilmLot360
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Changes Everything
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                We built FilmLot360 after years of frustration on real productions. It's the system we wish we'd had.
              </p>

              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{solution}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1624948384140-e48e47087fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBjb21wdXRlciUyMG11bHRpcGxlJTIwbW9uaXRvcnMlMjBlZGl0aW5nfGVufDF8fHx8MTc2NDM2MTkxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Person working at computer with multiple screens"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-8 text-xl">Trusted by productions worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl md:text-5xl text-white mb-2">70%</div>
              <div className="text-gray-400">Less Admin Time</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl text-white mb-2">85%</div>
              <div className="text-gray-400">Better On Budget</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl text-white mb-2">90%</div>
              <div className="text-gray-400">Improved Communication</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl text-white mb-2">95%</div>
              <div className="text-gray-400">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}