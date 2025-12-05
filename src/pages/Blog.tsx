import { PageLayout } from "../components/PageLayout";
import { Calendar, User, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "10 Tips for Managing Film Production Budgets",
    excerpt: "Learn how to keep your production on budget with these proven strategies from industry veterans.",
    author: "Sarah Mitchell",
    date: "November 20, 2025",
    category: "Budget Management"
  },
  {
    title: "The Future of Film Production Technology",
    excerpt: "Explore emerging technologies that are transforming how films are made, from AI to virtual production.",
    author: "Marcus Chen",
    date: "November 15, 2025",
    category: "Industry Trends"
  },
  {
    title: "How to Build an Effective Production Team",
    excerpt: "Creating a cohesive crew is essential for success. Here's how to find and manage the right people.",
    author: "Elena Rodriguez",
    date: "November 10, 2025",
    category: "Team Management"
  },
  {
    title: "Navigating International Film Production",
    excerpt: "From permits to currency exchange, here's everything you need to know about shooting abroad.",
    author: "David Kim",
    date: "November 5, 2025",
    category: "Production Tips"
  }
];

export function Blog() {
  return (
    <PageLayout 
      title="Blog" 
      subtitle="Insights, tips, and stories from the world of film production"
    >
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="inline-block px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full mb-4">
                  <span className="text-purple-300 text-sm">{post.category}</span>
                </div>
                
                <h3 className="text-2xl text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
