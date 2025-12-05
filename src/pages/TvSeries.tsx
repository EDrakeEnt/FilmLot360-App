import { PageLayout } from "../components/PageLayout";
import { Tv } from "lucide-react";

export function TvSeries() {
  return (
    <PageLayout 
      title="TV Series" 
      subtitle="Coordinate episodic productions with recurring cast and seasonal planning"
    >
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with Background Image */}
          <div className="relative mb-16 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1646049492315-834855634819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwc3R1ZGlvJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjQ3Nzc2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/90 to-cyan-900/95" />
            
            <div className="relative z-10 px-8 py-20 md:px-16 md:py-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Tv className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="inline-block px-4 py-1 bg-blue-600/30 border border-blue-400/50 rounded-full mb-2">
                    <span className="text-blue-200 text-sm">Episodic Content Management</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl text-white">TV Series Production</h2>
                </div>
              </div>
              
              <p className="text-2xl text-blue-100 max-w-3xl leading-relaxed">
                Master the complexity of episodic storytelling with tools designed for multi-season TV series, 
                recurring cast management, and network deliverables.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "50+", label: "Episodes Per Season", icon: "📺" },
              { number: "10+", label: "Seasons Managed", icon: "🎭" },
              { number: "150+", label: "Recurring Characters", icon: "👤" },
              { number: "100%", label: "Network Compliance", icon: "✅" }
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Left Column - Key Capabilities */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-3xl text-white mb-6 flex items-center gap-3">
                <span className="text-4xl">📋</span>
                Key Capabilities
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Episode Budget Tracking",
                    description: "Track budgets episode-by-episode with season-wide forecasting and variance analysis"
                  },
                  {
                    title: "Recurring Cast & Crew",
                    description: "Manage recurring characters, guest stars, and crew availability across multiple episodes"
                  },
                  {
                    title: "Season Planning",
                    description: "Long-term resource planning and optimization for entire seasons and multi-year series"
                  },
                  {
                    title: "Script Version Control",
                    description: "Distribute scripts with built-in version control and revision tracking for all episodes"
                  },
                  {
                    title: "Network Deliverables",
                    description: "Track network requirements, delivery deadlines, and compliance documentation"
                  },
                  {
                    title: "Multi-Episode Scheduling",
                    description: "Coordinate shooting schedules across multiple episodes with cross-episode scene optimization"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Production Workflow & Image */}
            <div className="space-y-8">
              {/* Workflow Section */}
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8">
                <h3 className="text-3xl text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">🎬</span>
                  Episodic Workflow
                </h3>
                
                <div className="space-y-4">
                  {[
                    { phase: "Writers' Room", tasks: "Script development, story arcs, episode breakdowns, revisions" },
                    { phase: "Pre-Production", tasks: "Casting guest stars, location scouting, set design, scheduling" },
                    { phase: "Production", tasks: "Multi-episode block shooting, daily continuity, cast coordination" },
                    { phase: "Post & Delivery", tasks: "Editing, VFX, color grading, network delivery, broadcast prep" }
                  ].map((item, index) => (
                    <div key={index} className="bg-black/30 rounded-xl p-4 border-l-4 border-blue-500">
                      <div className="text-blue-300 mb-1">{item.phase}</div>
                      <div className="text-gray-400 text-sm">{item.tasks}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Production Image */}
              <div className="rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1650726117224-5ad4cb8e1b91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0diUyMHNlcmllcyUyMGZpbG1pbmclMjBzZXR8ZW58MXx8fHwxNzY0ODcwMjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="TV Series Production Set"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* TV-Specific Features Section */}
          <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 mb-16">
            <h3 className="text-3xl text-white mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-4xl">⭐</span>
              TV Series Specialized Features
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔄",
                  title: "Continuity Management",
                  description: "Track props, costumes, and story continuity across episodes and seasons with photo references"
                },
                {
                  icon: "📅",
                  title: "Block Shooting",
                  description: "Optimize shooting schedules by grouping scenes from multiple episodes by location or cast"
                },
                {
                  icon: "🎯",
                  title: "Episode Templates",
                  description: "Create reusable templates for recurring segments, sets, and production patterns"
                },
                {
                  icon: "📊",
                  title: "Season Analytics",
                  description: "Track metrics across seasons: budget trends, episode performance, resource utilization"
                },
                {
                  icon: "🎪",
                  title: "Guest Star Coordination",
                  description: "Manage one-time and recurring guest appearances with contracts and availability tracking"
                },
                {
                  icon: "📡",
                  title: "Broadcast Integration",
                  description: "Sync with network systems for delivery specs, air dates, and promotional materials"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl text-white mb-3">{feature.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Series Formats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                type: "Drama Series",
                icon: "🎭",
                details: "1-hour format, 8-22 episodes, complex story arcs",
                color: "from-blue-600/20 to-blue-800/20"
              },
              {
                type: "Sitcoms",
                icon: "😄",
                details: "22-30 minute format, multi-camera or single-camera",
                color: "from-cyan-600/20 to-cyan-800/20"
              },
              {
                type: "Limited Series",
                icon: "⭐",
                details: "6-10 episodes, finite story, prestige format",
                color: "from-blue-600/20 to-cyan-600/20"
              }
            ].map((format, index) => (
              <div key={index} className={`bg-gradient-to-br ${format.color} border border-blue-500/30 rounded-2xl p-6 hover:scale-105 transition-transform`}>
                <div className="text-5xl mb-4 text-center">{format.icon}</div>
                <h4 className="text-xl text-white text-center mb-3">{format.type}</h4>
                <p className="text-gray-400 text-sm text-center">{format.details}</p>
              </div>
            ))}
          </div>

          {/* Case Study Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1671575584088-03eb2811c30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9hZGNhc3QlMjB0ZWxldmlzaW9uJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDc5NjYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="TV Broadcast Studio"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="md:w-2/3">
                <div className="inline-block px-4 py-1 bg-green-600/20 border border-green-500/30 rounded-full mb-4">
                  <span className="text-green-300 text-sm">Success Story</span>
                </div>
                <h3 className="text-3xl text-white mb-4">Producing a 5-Season Drama Series</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "FilmLot360 was essential in managing our 5-season, 65-episode drama series. The continuity tracking 
                  saved us countless hours, and the block shooting scheduler helped us optimize our 8-month production 
                  calendar each season. The episode budget tracking meant we never went over our per-episode cap, and 
                  the network deliverable system ensured we hit every broadcast deadline."
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-600/20 rounded-lg p-4 text-center">
                    <div className="text-2xl text-white mb-1">65</div>
                    <div className="text-gray-400 text-xs">Total Episodes</div>
                  </div>
                  <div className="bg-blue-600/20 rounded-lg p-4 text-center">
                    <div className="text-2xl text-white mb-1">5</div>
                    <div className="text-gray-400 text-xs">Seasons</div>
                  </div>
                  <div className="bg-blue-600/20 rounded-lg p-4 text-center">
                    <div className="text-2xl text-white mb-1">42</div>
                    <div className="text-gray-400 text-xs">Series Regulars</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-xl">
                    MR
                  </div>
                  <div>
                    <div className="text-white">Michael Rodriguez</div>
                    <div className="text-gray-400 text-sm">Showrunner, Prestige Television Network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}