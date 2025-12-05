import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  Users, 
  Film, 
  DollarSign, 
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  Clock,
  AlertCircle,
  X,
  ChevronDown,
  Bell,
  Download,
  Upload,
  Loader2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { dashboardAPI } from '../utils/filmlot-api';
import { profileAPI } from '../utils/api';
import { getSubscriptionStatus } from '../utils/subscription';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Sample data for charts
const revenueData = [
  { month: 'Jan', revenue: 950000 },
  { month: 'Feb', revenue: 1050000 },
  { month: 'Mar', revenue: 1350000 },
  { month: 'Apr', revenue: 1650000 },
  { month: 'May', revenue: 1950000 },
  { month: 'Jun', revenue: 2400000 },
];

const claimsData = [
  { status: 'Approved', count: 145 },
  { status: 'Pending', count: 12 },
  { status: 'Rejected', count: 8 },
];

export function Dashboard() {
  const [showSampleBanner, setShowSampleBanner] = useState(true);
  const [userName, setUserName] = useState('Eugenia Drake');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalActors: 0,
    activeProjects: 0,
    pendingBookings: 0,
    totalDeals: 0,
  });
  const [hasApiData, setHasApiData] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
    checkSubscriptionStatus();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getStats();
      
      if (response.success) {
        setStats(response.stats);
        setHasApiData(
          response.stats.totalActors > 0 || 
          response.stats.activeProjects > 0 || 
          response.stats.pendingBookings > 0
        );
      }
    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data. Using sample data.');
    } finally {
      setLoading(false);
    }
  };

  const checkSubscriptionStatus = async () => {
    try {
      const status = await getSubscriptionStatus();
      setSubscriptionStatus(status);
    } catch (error: any) {
      console.error('Error checking subscription status:', error);
      toast.error('Failed to check subscription status.');
    }
  };

  const handleClearSampleData = async () => {
    toast.info('Clear sample data functionality coming soon!');
  };

  const handleUpgradeSubscription = () => {
    navigate('/settings/subscription');
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading dashboard data...</p>
          </div>
        </div>
      ) : (
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Subscription Status Banner */}
        {subscriptionStatus !== 'active' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex flex-col lg:flex-row items-start lg:justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm">
                  <span className="font-semibold">Subscription Expired:</span> Your subscription has expired. Upgrade to continue using all features.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 flex-1 lg:flex-initial"
                onClick={handleUpgradeSubscription}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade Subscription
              </Button>
              <button
                onClick={() => setShowSampleBanner(false)}
                className="text-gray-400 hover:text-white flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Sample Data Banner */}
        {showSampleBanner && !hasApiData && (
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 flex flex-col lg:flex-row items-start lg:justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm">
                  <span className="font-semibold">Sample data loaded:</span> You're viewing example data to help you get started. Feel free to edit, delete, or add your own content.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 flex-1 lg:flex-initial"
                onClick={handleClearSampleData}
              >
                <Upload className="w-4 h-4 mr-2" />
                Clear Sample Data
              </Button>
              <button
                onClick={() => setShowSampleBanner(false)}
                className="text-gray-400 hover:text-white flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Top Bar with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl mb-2">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening across your FilmForge CRM</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-zinc-900 border-white/10 text-white hover:bg-zinc-800">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <div className="relative">
              <Button variant="outline" className="bg-zinc-900 border-white/10 text-white hover:bg-zinc-800">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                3
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Actors */}
          <Card className="bg-zinc-900 border-white/10 p-4 lg:p-6">
            <div className="flex items-start justify-between mb-3 lg:mb-4">
              <div>
                <p className="text-gray-400 text-xs lg:text-sm mb-2">Total Actors</p>
                <h3 className="text-white text-2xl lg:text-3xl">{stats.totalActors}</h3>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-400 flex-shrink-0" />
              <span className="text-green-400 truncate">+18% from last month</span>
            </div>
          </Card>

          {/* Active Projects */}
          <Card className="bg-zinc-900 border-white/10 p-4 lg:p-6">
            <div className="flex items-start justify-between mb-3 lg:mb-4">
              <div>
                <p className="text-gray-400 text-xs lg:text-sm mb-2">Active Projects</p>
                <h3 className="text-white text-2xl lg:text-3xl">{stats.activeProjects}</h3>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Film className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-400 flex-shrink-0" />
              <span className="text-green-400 truncate">+12% from last month</span>
            </div>
          </Card>

          {/* Monthly Revenue */}
          <Card className="bg-zinc-900 border-white/10 p-4 lg:p-6">
            <div className="flex items-start justify-between mb-3 lg:mb-4">
              <div>
                <p className="text-gray-400 text-xs lg:text-sm mb-2">Monthly Revenue</p>
                <h3 className="text-white text-2xl lg:text-3xl">$2.4M</h3>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-400 flex-shrink-0" />
              <span className="text-green-400 truncate">+23% from last month</span>
            </div>
          </Card>

          {/* Pending Bookings */}
          <Card className="bg-zinc-900 border-white/10 p-4 lg:p-6">
            <div className="flex items-start justify-between mb-3 lg:mb-4">
              <div>
                <p className="text-gray-400 text-xs lg:text-sm mb-2">Pending Bookings</p>
                <h3 className="text-white text-2xl lg:text-3xl">{stats.pendingBookings}</h3>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-orange-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm">
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-400 flex-shrink-0" />
              <span className="text-green-400 truncate">+15% from last month</span>
            </div>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-zinc-900 border-white/10 p-4 lg:p-5">
            <p className="text-gray-400 text-xs lg:text-sm mb-2">Pending Auditions</p>
            <p className="text-yellow-400 text-2xl">89</p>
          </Card>

          <Card className="bg-zinc-900 border-white/10 p-4 lg:p-5">
            <p className="text-gray-400 text-xs lg:text-sm mb-2">Active Productions</p>
            <p className="text-purple-400 text-2xl">34</p>
          </Card>

          <Card className="bg-zinc-900 border-white/10 p-4 lg:p-5">
            <p className="text-gray-400 text-xs lg:text-sm mb-2">Today's Bookings</p>
            <p className="text-green-400 text-2xl">12</p>
          </Card>

          <Card className="bg-zinc-900 border-white/10 p-4 lg:p-5">
            <p className="text-gray-400 text-xs lg:text-sm mb-2">Overdue Contracts</p>
            <p className="text-red-400 text-2xl">3</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="bg-zinc-900 border-white/10 p-6">
            <h3 className="text-white text-xl mb-6">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181B', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`$${(value / 1000000).toFixed(2)}M`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#A855F7" 
                  strokeWidth={3}
                  dot={{ fill: '#A855F7', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Claims Status Overview */}
          <Card className="bg-zinc-900 border-white/10 p-6">
            <h3 className="text-white text-xl mb-6">Claims Status Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={claimsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="status" 
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181B', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#6366F1" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="bg-zinc-900 border-white/10 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { 
                  action: 'New actor profile created', 
                  name: 'Sarah Martinez',
                  time: '2 minutes ago',
                  type: 'actor'
                },
                { 
                  action: 'Contract signed', 
                  name: 'Project: Midnight Runner',
                  time: '1 hour ago',
                  type: 'contract'
                },
                { 
                  action: 'Payment received', 
                  name: '$125,000 from Universal Studios',
                  time: '3 hours ago',
                  type: 'payment'
                },
                { 
                  action: 'Audition scheduled', 
                  name: 'James Chen - Lead Role',
                  time: '5 hours ago',
                  type: 'audition'
                },
                { 
                  action: 'New crew member added', 
                  name: 'Michael Thompson - Director of Photography',
                  time: '1 day ago',
                  type: 'crew'
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'actor' ? 'bg-purple-500/10' :
                    activity.type === 'contract' ? 'bg-blue-500/10' :
                    activity.type === 'payment' ? 'bg-green-500/10' :
                    activity.type === 'audition' ? 'bg-orange-500/10' :
                    'bg-pink-500/10'
                  }`}>
                    {activity.type === 'actor' && <Users className="w-5 h-5 text-purple-400" />}
                    {activity.type === 'contract' && <FileText className="w-5 h-5 text-blue-400" />}
                    {activity.type === 'payment' && <DollarSign className="w-5 h-5 text-green-400" />}
                    {activity.type === 'audition' && <Calendar className="w-5 h-5 text-orange-400" />}
                    {activity.type === 'crew' && <Users className="w-5 h-5 text-pink-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.name}</p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-zinc-900 border-white/10 p-6">
            <h3 className="text-white text-xl mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/dashboard/projects')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Film className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
              <Button 
                onClick={() => navigate('/dashboard/actors')}
                variant="outline" 
                className="w-full bg-zinc-800 border-white/10 text-white hover:bg-zinc-700"
              >
                <Users className="w-4 h-4 mr-2" />
                Add Actor
              </Button>
              <Button 
                onClick={() => navigate('/dashboard/calendar')}
                variant="outline" 
                className="w-full bg-zinc-800 border-white/10 text-white hover:bg-zinc-700"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Audition
              </Button>
              <Button 
                onClick={() => toast.info('Call sheet generation coming soon!')}
                variant="outline" 
                className="w-full bg-zinc-800 border-white/10 text-white hover:bg-zinc-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Call Sheet
              </Button>
              <Button 
                onClick={() => navigate('/dashboard/invoices')}
                variant="outline" 
                className="w-full bg-zinc-800 border-white/10 text-white hover:bg-zinc-700"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            {/* Upcoming Events */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-white mb-4">Upcoming Events</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">Production Meeting</p>
                    <p className="text-gray-400 text-xs">Today, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">Actor Callback</p>
                    <p className="text-gray-400 text-xs">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">Budget Review</p>
                    <p className="text-gray-400 text-xs">Friday, 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      )}
    </DashboardLayout>
  );
}