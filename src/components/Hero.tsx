import { Link } from "react-router-dom";
import { Film, ArrowRight, Menu, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "figma:asset/c551745208ab5a66bd631a9b0efa045b89a039ad.png";
import { useState } from "react";

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcHJvZHVjdGlvbiUyMHNldHxlbnwxfHx8fDE3NjQyOTIyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Film production set"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/80 to-zinc-950"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FilmLot360 Logo" className="w-10 h-10 object-contain" />
            <span className="text-white text-2xl">FilmLot360</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#why" className="text-gray-300 hover:text-white transition-colors">Why FilmLot360</a>
            <a href="#cases" className="text-gray-300 hover:text-white transition-colors">Use Cases</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
            <Link to="/signup" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Start Free Trial
            </Link>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-lg border-t border-white/10 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#why" 
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why FilmLot360
              </a>
              <a 
                href="#cases" 
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Use Cases
              </a>
              <a 
                href="#pricing" 
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white mb-4 sm:mb-6 tracking-tight leading-tight">
          Your Production,
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Under One Roof
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          Manage projects, crew, actors, budgets, and invoices with the only CRM built specifically for film production. From pre-production to post, we've got you covered.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2 group">
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all">
            Watch Demo
          </button>
        </div>

        {/* Floating Stats */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Productions" },
            { value: "50K+", label: "Active Users" },
            { value: "$2B+", label: "Managed Budget" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 md:p-6">
              <div className="text-2xl sm:text-3xl md:text-4xl text-white mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}