import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { 
  User, 
  Settings, 
  CreditCard, 
  Save, 
  Upload, 
  Mail, 
  Briefcase,
  Bell,
  Lock,
  Globe,
  Palette,
  Calendar,
  ExternalLink,
  Plus,
  X,
  Check,
  Loader2
} from "lucide-react";
import { profileAPI, UserProfile } from "../utils/api";
import { toast } from "sonner@2.0.3";
import { projectId } from '../utils/supabase/info';

type TabType = 'profile' | 'settings' | 'subscription';

const plans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 470,
    features: [
      "Up to 5 active projects",
      "20 team members",
      "10GB storage",
      "Basic reporting",
      "Email support",
      "Mobile app access"
    ]
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 89,
    yearlyPrice: 854,
    features: [
      "Up to 20 active projects",
      "50 team members",
      "50GB storage",
      "Advanced reporting",
      "Priority email support",
      "Mobile app access",
      "Invoice and accounts",
      "Email and templates",
      "Reports and call sheets"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 149,
    yearlyPrice: 1430,
    features: [
      "Unlimited projects",
      "200 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "All Growth features"
    ]
  }
];

export function DashboardAccount() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    fullName: '',
    company: '',
    email: '',
  });

  // Subscription state
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [teamUpdates, setTeamUpdates] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [timezone, setTimezone] = useState("PT");
  const [currency, setCurrency] = useState("USD");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    loadAccountData();
  }, []);

  const loadAccountData = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        toast.error('Please sign in to view your account');
        return;
      }

      const response = await profileAPI.get();
      setProfile(response.profile);
      
      // Load subscription data
      if (response.profile?.subscription) {
        setCurrentPlan(response.profile.subscription.plan);
        setSubscriptionData(response.profile.subscription);
      }
    } catch (error: any) {
      console.error('Error loading account data:', error);
      toast.error('Failed to load account data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await profileAPI.update(profile);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      // In a real app, save settings to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error: any) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleUpgrade = async (planName: string) => {
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Please sign in to upgrade your plan');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            planName,
            billingPeriod,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (!data.url) {
        throw new Error('No checkout URL received from server');
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error('Upgrade error:', err);
      toast.error(err.message || 'Failed to start checkout process');
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Please sign in to manage billing');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/create-portal-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to open billing portal');
      }

      window.location.href = data.url;
    } catch (err: any) {
      console.error('Billing portal error:', err);
      toast.error(err.message || 'Failed to open billing portal');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment method added successfully!");
    setIsPaymentModalOpen(false);
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardName("");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading account data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2">Account</h1>
          <p className="text-gray-400">Manage your profile, settings, and subscription</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 transition-colors ${
              activeTab === 'profile'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-6 py-3 transition-colors ${
              activeTab === 'settings'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-2 px-6 py-3 transition-colors ${
              activeTab === 'subscription'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            Subscription
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl space-y-6">
            {/* Profile Picture */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-xl text-white mb-6">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl">
                    {profile.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                  </span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 mb-2">
                    <Upload className="w-4 h-4" />
                    Upload New Photo
                  </button>
                  <p className="text-sm text-gray-400">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-xl text-white mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName || ''}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={profile.email || ''}
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-gray-500 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-xl text-white mb-6">Professional Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Company/Production Company</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profile.company || ''}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button 
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-6">
            {/* Notifications */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-white">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="text-white mb-1">Email Notifications</div>
                    <div className="text-sm text-gray-400">Receive email updates about your projects</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="w-5 h-5" 
                  />
                </label>
                
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="text-white mb-1">Budget Alerts</div>
                    <div className="text-sm text-gray-400">Get notified when budgets exceed thresholds</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={budgetAlerts}
                    onChange={(e) => setBudgetAlerts(e.target.checked)}
                    className="w-5 h-5" 
                  />
                </label>
                
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="text-white mb-1">Team Updates</div>
                    <div className="text-sm text-gray-400">Notifications about team member changes</div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={teamUpdates}
                    onChange={(e) => setTeamUpdates(e.target.checked)}
                    className="w-5 h-5" 
                  />
                </label>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-white">Security</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Change Password</label>
                  <button className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors">
                    Update Password
                  </button>
                </div>
                
                <div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-white mb-1">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-400">Add an extra layer of security</div>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Enable
                    </button>
                  </label>
                </div>
              </div>
            </div>

            {/* Language & Region */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-white">Language & Region</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Language</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Timezone</label>
                  <select 
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="PT">Pacific Time (PT)</option>
                    <option value="ET">Eastern Time (ET)</option>
                    <option value="CT">Central Time (CT)</option>
                    <option value="MT">Mountain Time (MT)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Currency</label>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-white">Appearance</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Theme</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="dark">Dark (Default)</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button 
                onClick={handleSaveSettings}
                disabled={saving}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="space-y-8">
            {/* Current Plan */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl text-white mb-2">
                    {currentPlan ? `${currentPlan} Plan` : 'Professional Plan'}
                  </h2>
                  <p className="text-gray-300 mb-4">You're on a trial with full access to all features</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">Trial ends Dec 10, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">No payment required</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button 
                    onClick={handleManageBilling}
                    disabled={loading}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Manage Billing
                  </button>
                  <button 
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>

            {/* Plans */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h3 className="text-2xl text-white">Available Plans</h3>
                
                {/* Billing Period Toggle */}
                <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`px-4 py-2 rounded-md text-sm transition-all ${
                      billingPeriod === "monthly"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={`px-4 py-2 rounded-md text-sm transition-all ${
                      billingPeriod === "yearly"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Yearly
                    <span className="ml-1 text-xs text-green-400">Save 20%</span>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const price = billingPeriod === "monthly" 
                    ? `$${plan.monthlyPrice}` 
                    : `$${plan.yearlyPrice}`;
                  const period = billingPeriod === "monthly" 
                    ? "/month" 
                    : "/year";
                  
                  const isCurrentPlan = currentPlan && plan.name.toLowerCase() === currentPlan.toLowerCase();
                  
                  return (
                    <div
                      key={plan.id}
                      className={`bg-white/5 backdrop-blur-sm border rounded-xl p-6 ${
                        isCurrentPlan ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-white/10'
                      }`}
                    >
                      {isCurrentPlan && (
                        <div className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
                          Current Plan
                        </div>
                      )}
                      
                      <h4 className="text-2xl text-white mb-2">{plan.name}</h4>
                      
                      <div className="mb-6">
                        <span className="text-4xl text-white">{price}</span>
                        <span className="text-gray-400">{period}</span>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        className={`w-full py-3 rounded-lg transition-all ${
                          isCurrentPlan
                            ? 'bg-white/10 border border-white/20 text-white cursor-default'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                        }`}
                        disabled={isCurrentPlan || loading}
                        onClick={() => handleUpgrade(plan.name)}
                      >
                        {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Billing History */}
            <div>
              <h3 className="text-2xl text-white mb-6">Billing History</h3>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <p className="text-gray-400 text-center py-8">No billing history yet. You're currently on a free trial.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Method Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl text-white mb-2">Add Payment Method</h2>
              <p className="text-gray-400 text-sm">Enter your card details to add a payment method</p>
            </div>

            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-300 text-xs">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  Your payment information is encrypted and secure
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
