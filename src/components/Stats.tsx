import { TrendingUp, Users, Clock, DollarSign } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "10,000+",
    label: "Productions Completed",
    description: "From short films to blockbusters, FilmLot360 has powered thousands of successful productions worldwide.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Active Users",
    description: "Directors, producers, ADs, and crew members trust FilmLot360 to manage their productions daily.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Clock,
    value: "2M+",
    label: "Hours Saved",
    description: "Automation and smart workflows have given filmmakers back millions of hours to focus on creativity.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: DollarSign,
    value: "$2B+",
    label: "Budget Managed",
    description: "Over two billion dollars in production budgets tracked, analyzed, and optimized through our platform.",
    color: "from-orange-500 to-red-500"
  }
];

export function Stats() {
  return (
    <section className="py-32 px-6 bg-zinc-900 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-yellow-600/20 border border-yellow-500/30 rounded-full">
            <span className="text-yellow-300">By The Numbers</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Proven at
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Every Scale
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 md:p-10 hover:bg-white/10 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>

              {/* Value */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-2 sm:mb-3">{stat.value}</div>

              {/* Label */}
              <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3 md:mb-4">{stat.label}</h3>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">{stat.description}</p>

              {/* Decorative gradient */}
              <div className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Additional Stats Bar */}
        <div className="mt-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl text-white mb-2">150+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl text-white mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl text-white mb-2">4.9★</div>
              <div className="text-gray-400">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}