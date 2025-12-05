import { PageLayout } from "../components/PageLayout";

const integrations = [
  { name: "Google Calendar", category: "Scheduling", logo: "📅" },
  { name: "Slack", category: "Communication", logo: "💬" },
  { name: "Dropbox", category: "Storage", logo: "📦" },
  { name: "QuickBooks", category: "Accounting", logo: "💰" },
  { name: "Stripe", category: "Payments", logo: "💳" },
  { name: "Zoom", category: "Video Conferencing", logo: "🎥" },
  { name: "Gmail", category: "Email", logo: "📧" },
  { name: "Trello", category: "Project Management", logo: "📋" },
  { name: "Final Draft", category: "Screenwriting", logo: "✍️" },
  { name: "Frame.io", category: "Video Review", logo: "🎬" },
  { name: "Zapier", category: "Automation", logo: "⚡" },
  { name: "Adobe Creative Cloud", category: "Creative Tools", logo: "🎨" }
];

export function Integrations() {
  return (
    <PageLayout 
      title="Integrations" 
      subtitle="Connect FilmLot360 with your favorite tools"
    >
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all text-center"
              >
                <div className="text-5xl mb-4">{integration.logo}</div>
                <h3 className="text-xl text-white mb-2">{integration.name}</h3>
                <p className="text-sm text-gray-400">{integration.category}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
            <h3 className="text-3xl text-white mb-4">Need a Custom Integration?</h3>
            <p className="text-xl text-gray-300 mb-8">
              Our API makes it easy to build custom integrations with your existing tools.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
              View API Documentation
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
