import { PageLayout } from "../components/PageLayout";
import { Search, BookOpen, Video, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    articles: [
      {
        question: "Quick Start Guide",
        answer: "Welcome to FilmLot360! To get started, first create your account and verify your email. Once logged in, you'll be guided through a quick onboarding tour that covers the main dashboard features. Start by creating your first project using the '+ New Project' button in the top right. Add basic details like project name, type, and budget. From there, you can begin adding team members, creating call sheets, and tracking your production schedule."
      },
      {
        question: "Setting Up Your First Project",
        answer: "To set up your first project, navigate to the Dashboard and click 'New Project'. Enter essential information including project name, production type (feature film, commercial, documentary, etc.), start date, and estimated budget. You can then customize project settings such as default working hours, currency, and time zone. Next, invite your key team members by entering their email addresses in the 'Team' section. They'll receive an invitation to join your project workspace."
      },
      {
        question: "Inviting Team Members",
        answer: "To invite team members, go to your project and click on the 'Team' tab. Click 'Invite Members' and enter email addresses of the people you want to add. You can assign specific roles (Producer, Director, Production Manager, etc.) and set permission levels for each member. They'll receive an email invitation with a link to join. Once they accept, they'll have access to the project based on their assigned permissions. You can manage team members and change their roles at any time."
      },
      {
        question: "Basic Navigation",
        answer: "The FilmLot360 interface is organized into main sections accessible from the left sidebar: Dashboard (overview of all projects), Projects (detailed project management), Cast & Crew (talent database), Call Sheets (daily schedules), Budget (financial tracking), and Invoices (billing). Use the top navigation bar to switch between projects and access your account settings. The search bar in the header lets you quickly find projects, people, or documents. Click your profile icon to access settings, subscription, and logout options."
      }
    ]
  },
  {
    icon: Video,
    title: "Video Tutorials",
    articles: [
      {
        question: "Budget Tracking Walkthrough",
        answer: "Our budget tracking feature helps you monitor expenses in real-time. Navigate to the 'Budget' section and create budget categories (Pre-Production, Production, Post-Production, etc.). Within each category, add line items with estimated costs. As expenses occur, log actual costs against each line item. The system automatically calculates variance and displays visual progress bars. You can export budget reports, set spending alerts, and share budget views with stakeholders. The dashboard provides real-time spending summaries and remaining budget calculations."
      },
      {
        question: "Creating Call Sheets",
        answer: "Call sheets are essential for daily production coordination. Go to 'Call Sheets' and click 'Create New'. Select the shooting date and add scenes to be filmed that day. For each scene, specify the location, required cast members, crew, equipment, and special requirements. Set call times for each department and person. Add weather information, parking details, and important notes. Once complete, you can preview the call sheet and send it via email or SMS to all relevant parties. The system tracks who has viewed the call sheet and sends automatic reminders."
      },
      {
        question: "Managing Crew",
        answer: "The Crew Management module maintains a comprehensive database of all crew members. Add new crew members by clicking 'Add Crew' and entering their details: name, role, contact information, rate, and availability. You can upload important documents like contracts, W-9 forms, and insurance certificates. Track crew availability using the calendar view, manage departments and hierarchies, and maintain historical records of who worked on which projects. Use the crew scheduling feature to avoid conflicts and ensure adequate staffing for each shoot day."
      },
      {
        question: "Invoice Generation",
        answer: "Generate professional invoices in minutes. Navigate to 'Invoices' and click 'Create Invoice'. Select the client or production company, add line items for services or rentals, and specify quantities and rates. The system automatically calculates subtotals, taxes, and totals. Customize invoice templates with your logo and branding. Set payment terms and due dates. Once created, send invoices directly via email, download as PDF, or mark as paid when payment is received. Track invoice status (draft, sent, paid, overdue) and set up automatic payment reminders."
      }
    ]
  },
  {
    icon: MessageCircle,
    title: "Common Questions",
    articles: [
      {
        question: "How do I reset my password?",
        answer: "To reset your password, go to the login page and click 'Forgot Password?' below the password field. Enter your registered email address and click 'Send Reset Link'. Check your email inbox (and spam folder) for a password reset message from FilmLot360. Click the reset link in the email, which will take you to a secure page where you can enter a new password. Your password must be at least 8 characters long and include a mix of letters and numbers. Once reset, you can log in immediately with your new password."
      },
      {
        question: "Can I export data?",
        answer: "Yes! FilmLot360 offers comprehensive data export capabilities. You can export project data, budgets, call sheets, and crew information in multiple formats including CSV, Excel, and PDF. To export data, navigate to the section you want to export (e.g., Budget, Crew List) and look for the 'Export' button, usually located in the top right. Select your preferred format and date range if applicable. Large exports may take a few moments to prepare. You'll receive a download link via email if the export is extensive. All your data remains yours, and we support data portability."
      },
      {
        question: "What integrations are available?",
        answer: "FilmLot360 integrates with leading industry tools to streamline your workflow. Current integrations include: Accounting software (QuickBooks, Xero), File storage (Dropbox, Google Drive, Box), Communication tools (Slack, Microsoft Teams), Calendar systems (Google Calendar, Outlook), and Payment processing (Stripe, PayPal). We also offer a robust REST API for custom integrations. New integrations are added regularly based on user feedback. Visit the 'Integrations' page in your account settings to connect services. Most integrations can be set up in under 2 minutes with OAuth authentication."
      },
      {
        question: "Pricing and billing",
        answer: "FilmLot360 offers three pricing tiers to fit productions of all sizes: Starter (ideal for independent filmmakers), Growth (perfect for growing production companies), and Professional (enterprise-grade for large studios). All plans include core features with varying limits on projects, team members, and storage. Billing is monthly or annual (save 20% with annual billing). You can upgrade or downgrade at any time, and changes take effect on your next billing cycle. All plans include a 14-day free trial with no credit card required. We accept all major credit cards and offer invoice-based billing for enterprise customers. Note: All sales are final with no refunds as stated in our Terms of Service."
      },
      {
        question: "What is your refund policy?",
        answer: "All sales are final and no refunds will be issued. This policy is clearly stated in our Terms of Service that you agreed to when signing up. We encourage all users to take advantage of our 14-day free trial to fully evaluate FilmLot360 before committing to a paid subscription. During the trial period, you have complete access to all features with no credit card required. If you decide the service isn't right for you, simply cancel before the trial ends and you won't be charged. Once a subscription payment is processed, it is non-refundable."
      }
    ]
  }
];

export function HelpCenter() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleItem = (categoryIndex: number, articleIndex: number) => {
    const key = `${categoryIndex}-${articleIndex}`;
    setExpandedItem(expandedItem === key ? null : key);
  };

  return (
    <PageLayout 
      title="Help Center" 
      subtitle="Find answers and learn how to use FilmLot360"
    >
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Search Bar */}
          <div className="mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white mb-6">{category.title}</h3>
                <div className="space-y-3">
                  {category.articles.map((article, articleIndex) => {
                    const itemKey = `${categoryIndex}-${articleIndex}`;
                    const isExpanded = expandedItem === itemKey;
                    
                    return (
                      <div key={articleIndex} className="border border-white/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleItem(categoryIndex, articleIndex)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
                        >
                          <span className="text-gray-300 group-hover:text-purple-400 transition-colors">
                            {article.question}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-purple-400 flex-shrink-0 ml-2" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-400 flex-shrink-0 ml-2 transition-colors" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 py-4 bg-white/5 border-t border-white/10">
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {article.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
            <h3 className="text-3xl text-white mb-4">Still need help?</h3>
            <p className="text-xl text-gray-300 mb-8">
              Our support team is here 24/7 to assist you.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}