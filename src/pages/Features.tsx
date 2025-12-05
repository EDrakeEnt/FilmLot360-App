import { PageLayout } from "../components/PageLayout";
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
    description: "Track multiple productions simultaneously with custom workflows, milestones, and real-time progress updates. Organize your entire production pipeline in one place."
  },
  {
    icon: Users,
    title: "Cast & Crew Database",
    description: "Comprehensive profiles for actors, directors, and crew members with availability tracking, contracts, and contact history. Never lose track of your team."
  },
  {
    icon: DollarSign,
    title: "Budget Tracking",
    description: "Monitor expenses, forecast costs, and stay on budget with detailed financial analytics and automated reporting. Get alerts before you overspend."
  },
  {
    icon: FileText,
    title: "Invoice Management",
    description: "Generate, send, and track invoices with automated reminders and payment reconciliation. Get paid faster and keep accurate records."
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Coordinate shoots, manage availability, and prevent conflicts with intelligent calendar integration. Automated call sheet generation saves hours."
  },
  {
    icon: MessageSquare,
    title: "Team Communication",
    description: "Built-in messaging, announcements, and call sheets keep everyone on the same page. Real-time updates ensure nothing falls through the cracks."
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Data-driven decisions with comprehensive reports on budgets, timelines, and team performance. Export reports for stakeholders and investors."
  },
  {
    icon: Folder,
    title: "Document Management",
    description: "Store scripts, contracts, releases, and production documents in one secure, searchable location. Version control keeps everything organized."
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Bank-level encryption, role-based access, and industry compliance for your sensitive data. SOC 2 Type II certified."
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Automate repetitive tasks like call sheets, status updates, and invoice reminders. Reduce admin work by up to 70%."
  },
  {
    icon: Globe,
    title: "Multi-Location Support",
    description: "Manage international shoots with multi-currency, time zone, and language support. Work seamlessly across borders."
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Log hours, overtime, and per diems with automatic calculations for payroll processing. Integrate with popular payroll systems."
  }
];

export function Features() {
  return (
    <PageLayout 
      title="Features" 
      subtitle="Everything you need to manage film production from pre to post"
    >
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
