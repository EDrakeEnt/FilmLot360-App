import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Free 14-day trial",
  "No credit card required",
  "Cancel anytime",
  "Full access to all features",
  "Unlimited projects",
  "24/7 support"
];

export function CTA() {
  return (
    <section className="py-32 px-6 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
      
      {/* Large Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full">
          <span className="text-green-300">Start Your Free Trial</span>
        </div>

        <h2 className="text-5xl md:text-7xl text-white mb-6">
          Ready to Transform
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Productions?
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of filmmakers who've already discovered the future of production management.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-left">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a href="#pricing" className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3 group">
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white text-lg border border-white/20 rounded-lg hover:bg-white/20 transition-all">
            Schedule Demo
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Questions? Email us at{" "}
          <a href="mailto:hello@filmlot360.com" className="text-purple-400 hover:text-purple-300">
            hello@filmlot360.com
          </a>
        </p>

        {/* Decorative Elements */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-2xl blur-2xl"></div>
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400 mb-4">Still not convinced? Check out what you'll get:</p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-2xl text-white mb-2">Complete CRM</div>
                <div className="text-sm text-gray-400">Everything to manage your entire production lifecycle</div>
              </div>
              <div>
                <div className="text-2xl text-white mb-2">Expert Support</div>
                <div className="text-sm text-gray-400">Real humans who understand film production</div>
              </div>
              <div>
                <div className="text-2xl text-white mb-2">Regular Updates</div>
                <div className="text-sm text-gray-400">New features based on filmmaker feedback</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
