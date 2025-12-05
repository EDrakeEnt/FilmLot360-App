import { PageLayout } from "../components/PageLayout";
import { Calendar, Clock, Users, Video } from "lucide-react";

const upcomingWebinars = [
  {
    title: "Mastering Film Budgets",
    date: "December 5, 2025",
    time: "2:00 PM PST",
    attendees: "45 registered",
    host: "Sarah Mitchell, Line Producer"
  },
  {
    title: "Efficient Pre-Production Planning",
    date: "December 12, 2025",
    time: "11:00 AM PST",
    attendees: "32 registered",
    host: "Marcus Chen, Director"
  }
];

const pastWebinars = [
  {
    title: "Introduction to FilmLot360",
    date: "November 22, 2025",
    views: "1,234"
  },
  {
    title: "Managing International Productions",
    date: "November 8, 2025",
    views: "892"
  },
  {
    title: "Time-Saving Automation Tips",
    date: "October 25, 2025",
    views: "1,567"
  }
];

export function Webinars() {
  return (
    <PageLayout 
      title="Webinars" 
      subtitle="Learn from industry experts and master FilmLot360"
    >
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Upcoming Webinars */}
          <div className="mb-20">
            <h3 className="text-3xl text-white mb-8">Upcoming Webinars</h3>
            <div className="space-y-6">
              {upcomingWebinars.map((webinar, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-grow">
                      <h4 className="text-2xl text-white mb-4">{webinar.title}</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {webinar.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {webinar.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {webinar.attendees}
                        </div>
                      </div>
                      <p className="text-gray-400 mt-3">Hosted by {webinar.host}</p>
                    </div>
                    <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Webinars */}
          <div>
            <h3 className="text-3xl text-white mb-8">Past Webinars</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastWebinars.map((webinar, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg text-white mb-2">{webinar.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{webinar.date}</span>
                    <span>{webinar.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
