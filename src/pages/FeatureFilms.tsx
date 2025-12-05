import { PageLayout } from "../components/PageLayout";
import { Film } from "lucide-react";

export function FeatureFilms() {
  return (
    <PageLayout 
      title="Feature Films" 
      subtitle="Manage complex, large-scale film productions with confidence"
    >
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with Background Image */}
          <div className="relative mb-16 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcHJvZHVjdGlvbiUyMHNldHxlbnwxfHx8fDE3NjQ4NjY5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-900/90 to-pink-900/95" />
            
            <div className="relative z-10 px-8 py-20 md:px-16 md:py-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Film className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="inline-block px-4 py-1 bg-purple-600/30 border border-purple-400/50 rounded-full mb-2">
                    <span className="text-purple-200 text-sm">Enterprise-Grade Production</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl text-white">Feature Film Production</h2>
                </div>
              </div>
              
              <p className="text-2xl text-purple-100 max-w-3xl leading-relaxed">
                The ultimate CRM system for managing big-budget feature films with complex workflows, 
                large crews, and multi-million dollar budgets.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "500+", label: "Crew Members Managed", icon: "👥" },
              { number: "$50M+", label: "Budgets Tracked", icon: "💰" },
              { number: "100+", label: "Shooting Locations", icon: "📍" },
              { number: "24/7", label: "Production Support", icon: "⚡" }
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
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
                <span className="text-4xl">🎬</span>
                Key Capabilities
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Multi-Unit Production",
                    description: "Track multiple shooting units simultaneously across different locations with real-time coordination"
                  },
                  {
                    title: "Large Cast Management",
                    description: "Manage principals, supporting cast, stunt coordinators, extras, and stand-ins with advanced scheduling"
                  },
                  {
                    title: "VFX & Post-Production",
                    description: "Coordinate complex visual effects workflows with vendors and track post-production milestones"
                  },
                  {
                    title: "International Logistics",
                    description: "Handle location permits, international crew travel, customs, and multi-country logistics"
                  },
                  {
                    title: "Budget Analytics",
                    description: "Monitor multi-million dollar budgets with real-time cost reporting and variance analysis"
                  },
                  {
                    title: "Union Compliance",
                    description: "Generate union-compliant call sheets, reports, and documentation automatically"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
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
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
                <h3 className="text-3xl text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">🎯</span>
                  Production Workflow
                </h3>
                
                <div className="space-y-4">
                  {[
                    { phase: "Pre-Production", tasks: "Script breakdown, casting, location scouting, crew hiring" },
                    { phase: "Production", tasks: "Daily call sheets, on-set management, real-time updates" },
                    { phase: "Post-Production", tasks: "VFX coordination, editing schedules, sound design tracking" },
                    { phase: "Distribution", tasks: "Festival submissions, marketing materials, release planning" }
                  ].map((item, index) => (
                    <div key={index} className="bg-black/30 rounded-xl p-4 border-l-4 border-purple-500">
                      <div className="text-purple-300 mb-1">{item.phase}</div>
                      <div className="text-gray-400 text-sm">{item.tasks}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Production Image */}
              <div className="rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/flagged/photo-1597695204733-a2b2a79e51e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGNhbWVyYSUyMGNyZXd8ZW58MXx8fHwxNzY0ODY5OTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Film Production Crew"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Advanced Features Section */}
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-16">
            <h3 className="text-3xl text-white mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-4xl">⚙️</span>
              Advanced Features for Feature Films
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "📊",
                  title: "Real-Time Dashboards",
                  description: "Monitor production status, budget burn rate, and schedule adherence across all departments"
                },
                {
                  icon: "🔐",
                  title: "Enterprise Security",
                  description: "Bank-level encryption, role-based access control, and NDA-protected content management"
                },
                {
                  icon: "🌍",
                  title: "Global Collaboration",
                  description: "Coordinate teams across time zones with real-time syncing and offline capabilities"
                },
                {
                  icon: "📱",
                  title: "Mobile Production",
                  description: "Full-featured mobile apps for on-set updates, approvals, and emergency communication"
                },
                {
                  icon: "🤝",
                  title: "Vendor Integration",
                  description: "Connect with VFX houses, sound studios, equipment rentals, and post facilities"
                },
                {
                  icon: "📈",
                  title: "Predictive Analytics",
                  description: "AI-powered insights for schedule optimization and budget forecasting"
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

          {/* Case Study Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1603218734550-be7fcffeb817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwZGlyZWN0b3IlMjBjbGFwcGVyYm9hcmR8ZW58MXx8fHwxNzY0ODY5OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Film Director"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="md:w-2/3">
                <div className="inline-block px-4 py-1 bg-green-600/20 border border-green-500/30 rounded-full mb-4">
                  <span className="text-green-300 text-sm">Success Story</span>
                </div>
                <h3 className="text-3xl text-white mb-4">Managing a $45M Action Thriller</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "FilmLot360 transformed how we managed our 89-day shoot across 5 countries. With 287 crew members, 
                  complex stunt sequences, and extensive VFX work, we needed a system that could handle it all. 
                  The platform's real-time budget tracking saved us from cost overruns, and the integrated scheduling 
                  kept all departments synchronized."
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-600/20 rounded-lg p-4 text-center">
                    <div className="text-2xl text-white mb-1">89</div>
                    <div className="text-gray-400 text-xs">Shoot Days</div>
                  </div>
                  <div className="bg-purple-600/20 rounded-lg p-4 text-center">
                    <div className="text-2xl text-white mb-1">287</div>
                    <div className="text-gray-400 text-xs">Crew Members</div>
                  </div>
                  <div className="bg-purple-600/20 rounded-lg p-4 text-center">
                    <div className="text-2xl text-white mb-1">5</div>
                    <div className="text-gray-400 text-xs">Countries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xl">
                    JD
                  </div>
                  <div>
                    <div className="text-white">Jessica Davis</div>
                    <div className="text-gray-400 text-sm">Line Producer, Apex Studios</div>
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