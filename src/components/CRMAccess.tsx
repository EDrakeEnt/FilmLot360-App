import { Link } from "react-router-dom";
import { ExternalLink, LayoutDashboard, Lock, User } from "lucide-react";

export function CRMAccess() {
  return (
    <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,0,255,0.1),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Link 
            to="/subscription"
            className="inline-block mb-6 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full hover:bg-purple-600/30 transition-colors cursor-pointer"
          >
            <span className="text-purple-300">Access Your Dashboard</span>
          </Link>
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Connect to Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Production CRM
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Already have an account? Access your full production dashboard and manage all your projects in one place.
          </p>
        </div>

        {/* CRM Access Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Existing Users Tab */}
          <Link
            to="/login"
            className="group bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8 md:p-10 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4">Open CRM Dashboard</h3>
              
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                Sign in to access your production management system, track projects, and collaborate with your team.
              </p>
              
              <div className="flex items-center gap-2 text-purple-300 group-hover:text-purple-200 transition-colors text-sm sm:text-base">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Sign In to Dashboard</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* New Users Tab */}
          <Link
            to="/signup"
            className="group bg-gradient-to-br from-pink-600/20 to-purple-600/20 border-2 border-pink-500/50 rounded-2xl p-6 sm:p-8 md:p-10 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4">Create Your Account</h3>
              
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                New to FilmLot360? Start your 7-day free trial and experience the complete production CRM system.
              </p>
              
              <div className="flex items-center gap-2 text-pink-300 group-hover:text-pink-200 transition-colors text-sm sm:text-base">
                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">Get Started Free</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Secure access • SSL encrypted • Industry-standard security
          </p>
        </div>
      </div>
    </section>
  );
}