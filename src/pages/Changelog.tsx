import { PageLayout } from "../components/PageLayout";

const updates = [
  {
    version: "2.5.0",
    date: "November 15, 2025",
    changes: [
      "New AI-powered budget forecasting",
      "Enhanced mobile app with offline mode",
      "Improved call sheet templates",
      "Bug fixes and performance improvements"
    ]
  },
  {
    version: "2.4.0",
    date: "October 28, 2025",
    changes: [
      "Multi-currency support for international productions",
      "Advanced permission controls",
      "Integration with Frame.io",
      "New analytics dashboard"
    ]
  },
  {
    version: "2.3.0",
    date: "October 1, 2025",
    changes: [
      "Automated invoice reminders",
      "Team availability calendar view",
      "Export reports to PDF",
      "Dark mode improvements"
    ]
  }
];

export function Changelog() {
  return (
    <PageLayout 
      title="Changelog" 
      subtitle="Latest updates and improvements to FilmLot360"
    >
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {updates.map((update, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl text-white">Version {update.version}</h3>
                  <span className="text-gray-400">{update.date}</span>
                </div>
                <ul className="space-y-3">
                  {update.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
