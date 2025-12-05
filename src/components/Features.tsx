import { 
  Users, 
  Briefcase, 
  DollarSign, 
  FileText, 
  Calendar, 
  MessageSquare,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Clock,
  Folder
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Project Management",
    description: "Track multiple productions simultaneously with custom workflows, milestones, and real-time progress updates.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Cast & Crew Database",
    description: "Comprehensive profiles for actors, directors, and crew members with availability tracking, contracts, and contact history.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: DollarSign,
    title: "Budget Tracking",
    description: "Monitor expenses, forecast costs, and stay on budget with detailed financial analytics and automated reporting.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: FileText,
    title: "Invoice Management",
    description: "Generate, send, and track invoices with automated reminders and payment reconciliation.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Coordinate shoots, manage availability, and prevent conflicts with intelligent calendar integration.",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: MessageSquare,
    title: "Team Communication",
    description: "Built-in messaging, announcements, and call sheets keep everyone on the same page.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Data-driven decisions with comprehensive reports on budgets, timelines, and team performance.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Folder,
    title: "Document Management",
    description: "Store scripts, contracts, releases, and production documents in one secure, searchable location.",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Bank-level encryption, role-based access, and industry compliance for your sensitive data.",
    gradient: "from-slate-500 to-zinc-500"
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Automate repetitive tasks like call sheets, status updates, and invoice reminders.",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    icon: Globe,
    title: "Multi-Location Support",
    description: "Manage international shoots with multi-currency, time zone, and language support.",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Log hours, overtime, and per diems with automatic calculations for payroll processing.",
    gradient: "from-red-500 to-pink-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-zinc-950 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,0,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,0,128,0.1),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full">
            <span className="text-purple-300">Powerful Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Everything You Need,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nothing You Don't
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built by filmmakers, for filmmakers. Every feature designed to solve real production challenges.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3 md:mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}