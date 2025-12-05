import { PageLayout } from "../components/PageLayout";
import { Code, Book, Zap, Shield } from "lucide-react";

export function ApiDocs() {
  return (
    <PageLayout 
      title="API Documentation" 
      subtitle="Build powerful integrations with the FilmLot360 API"
    >
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Code, title: "RESTful API", description: "Simple and intuitive REST endpoints" },
              { icon: Book, title: "Comprehensive Docs", description: "Detailed guides and examples" },
              { icon: Zap, title: "Webhooks", description: "Real-time event notifications" },
              { icon: Shield, title: "Secure", description: "OAuth 2.0 authentication" }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl text-white mb-6">Quick Start</h3>
            <div className="bg-zinc-950 rounded-lg p-6 font-mono text-sm text-gray-300 overflow-x-auto">
              <pre>{`// Initialize the FilmLot360 API client
import FilmLot360 from 'filmlot360-api';

const client = new FilmLot360({
  apiKey: 'your_api_key_here'
});

// Get all projects
const projects = await client.projects.list();

// Create a new crew member
const crewMember = await client.crew.create({
  name: 'John Doe',
  role: 'Director of Photography',
  email: 'john@example.com'
});`}</pre>
            </div>
            
            <div className="mt-8">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                View Full Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
