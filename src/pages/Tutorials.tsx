import { PageLayout } from "../components/PageLayout";
import { Play, Clock } from "lucide-react";

const tutorials = [
  {
    title: "Getting Started with FilmLot360",
    duration: "8 min",
    level: "Beginner",
    description: "A complete walkthrough of setting up your account and first project"
  },
  {
    title: "Managing Crew and Cast",
    duration: "12 min",
    level: "Beginner",
    description: "Learn how to add team members, track availability, and manage contacts"
  },
  {
    title: "Budget Tracking & Reporting",
    duration: "15 min",
    level: "Intermediate",
    description: "Master budget creation, expense tracking, and financial reporting"
  },
  {
    title: "Creating Professional Call Sheets",
    duration: "10 min",
    level: "Intermediate",
    description: "Generate and distribute call sheets with all the essential information"
  },
  {
    title: "Advanced Scheduling Techniques",
    duration: "18 min",
    level: "Advanced",
    description: "Optimize complex shooting schedules with multiple units and locations"
  },
  {
    title: "API Integration Tutorial",
    duration: "20 min",
    level: "Advanced",
    description: "Build custom integrations using the FilmLot360 API"
  }
];

export function Tutorials() {
  return (
    <PageLayout 
      title="Tutorials" 
      subtitle="Step-by-step video guides to master FilmLot360"
    >
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {tutorials.map((tutorial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group cursor-pointer"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      tutorial.level === 'Beginner' ? 'bg-green-600/20 text-green-300' :
                      tutorial.level === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-300' :
                      'bg-red-600/20 text-red-300'
                    }`}>
                      {tutorial.level}
                    </span>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-xl text-white mb-2">{tutorial.title}</h3>
                  <p className="text-gray-400 text-sm">{tutorial.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
