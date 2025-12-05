import { Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface UpgradePromptProps {
  featureName: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  requiredPlan?: 'starter' | 'growth';
}

export function UpgradePrompt({ featureName, description, icon: Icon, requiredPlan = 'starter' }: UpgradePromptProps) {
  const planDetails = {
    starter: {
      name: 'Starter',
    },
    growth: {
      name: 'Growth',
    },
  };

  const plan = planDetails[requiredPlan];

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            {Icon ? (
              <Icon className="w-16 h-16 text-white" />
            ) : (
              <Lock className="w-16 h-16 text-white" />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-5xl text-white mb-4">
          Upgrade to Level Up
        </h1>

        {/* Feature Name */}
        <h2 className="text-2xl text-purple-300 mb-6">
          {featureName}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          {description}
        </p>

        {/* Plan Badge */}
        <div className="inline-block bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full px-6 py-2 mb-10">
          <span className="text-purple-300">Available with {plan.name} Plan</span>
        </div>

        {/* Upgrade Button */}
        <div>
          <Link to="/dashboard/account?tab=subscription">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-7 text-xl rounded-full shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all">
              Upgrade Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}