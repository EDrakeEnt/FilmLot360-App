// Subscription utility functions

export type PlanTier = 'free' | 'starter' | 'growth' | 'professional' | 'enterprise';

export interface SubscriptionStatus {
  isPaid: boolean;
  plan: PlanTier;
  isActive: boolean;
  isInTrial: boolean;
  trialEndsAt: Date | null;
  trialDaysRemaining: number;
  features: {
    calendar: boolean;
    projects: boolean;
    productionCompanies: boolean;
    actors: boolean;
    crew: boolean;
    invoices: boolean;
    emails: boolean;
    reports: boolean;
    availability: boolean;
    paymentMethods: boolean;
  };
  limits: {
    activeProjects: number;
  };
}

// Features available by plan
const PLAN_FEATURES = {
  free: {
    calendar: false,
    projects: false,
    productionCompanies: false,
    actors: false,
    crew: false,
    invoices: false,
    emails: false,
    reports: false,
    availability: false,
    paymentMethods: false,
  },
  starter: {
    calendar: true,
    projects: true,
    productionCompanies: true,
    actors: true,
    crew: true,
    invoices: true,
    emails: false,
    reports: false,
    availability: true,
    paymentMethods: true,
  },
  growth: {
    calendar: true,
    projects: true,
    productionCompanies: true,
    actors: true,
    crew: true,
    invoices: true,
    emails: true,
    reports: true,
    availability: true,
    paymentMethods: true,
  },
  professional: {
    calendar: true,
    projects: true,
    productionCompanies: true,
    actors: true,
    crew: true,
    invoices: true,
    emails: true,
    reports: true,
    availability: true,
    paymentMethods: true,
  },
  enterprise: {
    calendar: true,
    projects: true,
    productionCompanies: true,
    actors: true,
    crew: true,
    invoices: true,
    emails: true,
    reports: true,
    availability: true,
    paymentMethods: true,
  },
};

export function getSubscriptionStatus(subscription: any): SubscriptionStatus {
  // If no subscription data, check if user should get automatic trial
  if (!subscription) {
    // Check if this is a new user (within 7 days of signup)
    // For now, we'll assume no subscription = free plan with no trial
    // The backend should handle setting up trial on signup
    return {
      isPaid: false,
      plan: 'free',
      isActive: false,
      isInTrial: false,
      trialEndsAt: null,
      trialDaysRemaining: 0,
      features: PLAN_FEATURES.free,
      limits: {
        activeProjects: 1,
      },
    };
  }

  // Normalize plan name
  const planName = (subscription.plan || subscription.planName || '').toLowerCase();
  
  // Determine plan tier
  let plan: PlanTier = 'free';
  if (planName.includes('starter')) {
    plan = 'starter';
  } else if (planName.includes('growth')) {
    plan = 'growth';
  } else if (planName.includes('professional')) {
    plan = 'professional';
  } else if (planName.includes('enterprise')) {
    plan = 'enterprise';
  }

  // Check if subscription is active and paid
  const isActive = subscription.status === 'active' || subscription.isActive === true;
  const isPaid = plan !== 'free' && isActive;

  // Check if subscription is in trial
  const isInTrial = subscription.isInTrial === true || subscription.status === 'trialing';
  const trialEndsAt = subscription.trialEndsAt ? new Date(subscription.trialEndsAt) : null;
  const trialDaysRemaining = trialEndsAt ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;

  return {
    isPaid,
    plan,
    isActive,
    isInTrial,
    trialEndsAt,
    trialDaysRemaining,
    features: PLAN_FEATURES[plan],
    limits: {
      activeProjects: 
        plan === 'free' ? 1 : 
        plan === 'starter' ? 5 : 
        plan === 'growth' ? 20 :
        plan === 'professional' ? 50 : 
        999, // enterprise
    },
  };
}

export function hasFeatureAccess(subscription: any, feature: keyof typeof PLAN_FEATURES.free): boolean {
  const status = getSubscriptionStatus(subscription);
  return status.features[feature];
}

export function getRequiredPlanForFeature(feature: keyof typeof PLAN_FEATURES.free): PlanTier {
  // Find the minimum plan that includes this feature
  const plans: PlanTier[] = ['starter', 'growth', 'professional', 'enterprise'];
  
  for (const plan of plans) {
    if (PLAN_FEATURES[plan][feature]) {
      return plan;
    }
  }
  
  return 'starter';
}

export function getPlanDisplayName(plan: PlanTier): string {
  const names = {
    free: 'Free',
    starter: 'Starter',
    growth: 'Growth',
    professional: 'Professional',
    enterprise: 'Enterprise',
  };
  return names[plan] || 'Free';
}

// Production tab features by plan
export const PRODUCTION_TAB_PLANS = {
  directory: 'starter' as PlanTier, // Companies Directory - requires Starter+
  contracts: 'growth' as PlanTier,  // Contracts - requires Growth+
  performance: 'growth' as PlanTier, // Performance - requires Growth+
  analytics: 'professional' as PlanTier, // Analytics - requires Professional+
};

export function hasProductionTabAccess(subscription: any, tabId: string): boolean {
  const status = getSubscriptionStatus(subscription);
  
  // During trial, all tabs are unlocked
  if (status.isInTrial && status.trialDaysRemaining > 0) {
    return true;
  }
  
  // If paid subscription, check plan level
  if (status.isPaid) {
    const requiredPlan = PRODUCTION_TAB_PLANS[tabId as keyof typeof PRODUCTION_TAB_PLANS];
    if (!requiredPlan) return true; // Tab doesn't have restrictions
    
    const planHierarchy: PlanTier[] = ['free', 'starter', 'growth', 'professional', 'enterprise'];
    const userPlanIndex = planHierarchy.indexOf(status.plan);
    const requiredPlanIndex = planHierarchy.indexOf(requiredPlan);
    
    return userPlanIndex >= requiredPlanIndex;
  }
  
  // No trial and not paid = locked
  return false;
}

export function getProductionTabRequiredPlan(tabId: string): PlanTier | null {
  return PRODUCTION_TAB_PLANS[tabId as keyof typeof PRODUCTION_TAB_PLANS] || null;
}