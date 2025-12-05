import { DashboardLayout } from '../components/DashboardLayout';
import { Building, Plus, Search, FileText, TrendingUp, Star, Download, MapPin, Mail, Phone, MoreHorizontal, Eye, X, Send, FileSignature, Lock } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CompanyCard, ContractCard, PerformanceCard } from '../components/ProductionMobileCards';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { profileAPI } from '../utils/api';
import { hasProductionTabAccess, getProductionTabRequiredPlan, getPlanDisplayName, getSubscriptionStatus } from '../utils/subscription';
import { useNavigate } from 'react-router-dom';

export function DashboardProduction() {
  const [activeTab, setActiveTab] = useState('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const navigate = useNavigate();

  // Load user subscription data
  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const response = await profileAPI.get();
        setSubscriptionData(response.profile.subscription || null);
      } catch (error) {
        console.error('Failed to load subscription data:', error);
      }
    };
    loadSubscription();
  }, []);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'TB PUNK FILMS',
      type: 'Production Studio',
      logo: '🎬',
      contact: {
        name: 'Kaspian Bryant',
        email: 'tbpunk5@gmail.com',
        phone: '813-285-3321',
      },
      location: 'Tampa, Florida',
      performance: 5.0,
      contracts: 0,
      monthlySpend: '$0',
      lastOrder: 'Nov 17, 2025',
      status: 'Active',
    },
    {
      id: 2,
      name: 'E Drake Enterprise LLC',
      type: 'Production Studio',
      logo: '🎥',
      contact: {
        name: 'Eugenia A Drake',
        email: 'edrake@edrakeenterprise.com',
        phone: '18133401340',
      },
      location: 'Tampa, Fla',
      performance: 5.0,
      contracts: 0,
      monthlySpend: '$0',
      lastOrder: 'Nov 22, 2025',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Sunset Studios',
      type: 'Production Studio',
      logo: '🌅',
      contact: {
        name: 'Michael Chen',
        email: 'mchen@sunsetstudios.com',
        phone: '310-555-0123',
      },
      location: 'Los Angeles, CA',
      performance: 4.8,
      contracts: 12,
      monthlySpend: '$45,000',
      lastOrder: 'Nov 28, 2025',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Empire Post Production',
      type: 'Post Production',
      logo: '✂️',
      contact: {
        name: 'Sarah Williams',
        email: 'swilliams@empirepost.com',
        phone: '212-555-0198',
      },
      location: 'New York, NY',
      performance: 4.9,
      contracts: 8,
      monthlySpend: '$32,000',
      lastOrder: 'Nov 25, 2025',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Coastal Equipment Rentals',
      type: 'Equipment Rental',
      logo: '📹',
      contact: {
        name: 'James Rodriguez',
        email: 'jrodriguez@coastalequip.com',
        phone: '305-555-0187',
      },
      location: 'Miami, FL',
      performance: 4.6,
      contracts: 15,
      monthlySpend: '$28,500',
      lastOrder: 'Nov 29, 2025',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Nordic VFX House',
      type: 'Visual Effects',
      logo: '🎨',
      contact: {
        name: 'Emma Larsson',
        email: 'elarsson@nordicvfx.com',
        phone: '+46-8-555-0142',
      },
      location: 'Stockholm, Sweden',
      performance: 4.9,
      contracts: 6,
      monthlySpend: '$52,000',
      lastOrder: 'Nov 26, 2025',
      status: 'Active',
    },
  ]);

  // Form state for adding new company
  const [newCompany, setNewCompany] = useState({
    name: '',
    type: 'Production Studio',
    logo: '🎬',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    status: 'Active',
    companyPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    servicesOffered: '',
    hourlyRate: '',
    dailyRate: '',
    website: '',
    notes: '',
  });

  const stats = [
    {
      label: 'Active Partners',
      value: '47',
      change: '+5 this month',
      icon: Building,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Total Contracts',
      value: '128',
      change: '23 expiring soon',
      icon: FileText,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
    },
    {
      label: 'Monthly Spend',
      value: '$1.8M',
      change: '+15% from last month',
      icon: TrendingUp,
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'Avg Performance',
      value: '4.7/5.0',
      change: 'Based on 189 reviews',
      icon: Star,
      bgColor: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/20',
    },
  ];

  const tabs = [
    { id: 'directory', label: 'Companies Directory' },
    { id: 'contracts', label: 'Contracts' },
    { id: 'performance', label: 'Performance' },
    { id: 'analytics', label: 'Analytics' },
  ];

  // Handle tab click with access control
  const handleTabClick = (tabId: string) => {
    const hasAccess = hasProductionTabAccess(subscriptionData, tabId);
    
    if (!hasAccess) {
      const requiredPlan = getProductionTabRequiredPlan(tabId);
      const planName = requiredPlan ? getPlanDisplayName(requiredPlan) : 'Starter';
      toast.error(`This feature requires ${planName} plan or higher`, {
        description: 'Upgrade your subscription to unlock this feature',
        action: {
          label: 'Upgrade',
          onClick: () => navigate('/dashboard/account?tab=subscription')
        }
      });
      return;
    }
    
    setActiveTab(tabId);
  };

  // Check if a tab is locked
  const isTabLocked = (tabId: string): boolean => {
    return !hasProductionTabAccess(subscriptionData, tabId);
  };

  // Get subscription status for trial banner
  const subStatus = subscriptionData ? getSubscriptionStatus(subscriptionData) : null;

  const contracts = [
    {
      id: 1,
      company: 'Sunset Studios',
      type: 'Service Agreement',
      value: '$540,000',
      startDate: 'Jan 15, 2024',
      endDate: 'Jan 14, 2025',
      status: 'Active',
      renewalStatus: 'Auto-Renew',
    },
    {
      id: 2,
      company: 'Empire Post Production',
      type: 'Master Service Agreement',
      value: '$384,000',
      startDate: 'Mar 01, 2024',
      endDate: 'Feb 28, 2025',
      status: 'Active',
      renewalStatus: 'Expiring Soon',
    },
    {
      id: 3,
      company: 'Coastal Equipment Rentals',
      type: 'Equipment Rental Agreement',
      value: '$342,000',
      startDate: 'Jun 10, 2024',
      endDate: 'Jun 09, 2025',
      status: 'Active',
      renewalStatus: 'Auto-Renew',
    },
    {
      id: 4,
      company: 'Nordic VFX House',
      type: 'VFX Service Agreement',
      value: '$624,000',
      startDate: 'Apr 20, 2024',
      endDate: 'Apr 19, 2025',
      status: 'Active',
      renewalStatus: 'Under Review',
    },
  ];

  const performanceData = [
    {
      company: 'Nordic VFX House',
      rating: 4.9,
      onTimeDelivery: '98%',
      qualityScore: '4.8/5.0',
      responseTime: '2.3 hrs',
      projectsCompleted: 24,
      trend: 'up',
    },
    {
      company: 'Empire Post Production',
      rating: 4.9,
      onTimeDelivery: '96%',
      qualityScore: '4.7/5.0',
      responseTime: '3.1 hrs',
      projectsCompleted: 18,
      trend: 'up',
    },
    {
      company: 'Sunset Studios',
      rating: 4.8,
      onTimeDelivery: '95%',
      qualityScore: '4.6/5.0',
      responseTime: '4.2 hrs',
      projectsCompleted: 32,
      trend: 'stable',
    },
    {
      company: 'Coastal Equipment Rentals',
      rating: 4.6,
      onTimeDelivery: '92%',
      qualityScore: '4.5/5.0',
      responseTime: '5.8 hrs',
      projectsCompleted: 45,
      trend: 'down',
    },
  ];

  const analyticsData = {
    totalSpend: '$1,842,000',
    averageContractValue: '$461,000',
    topVendor: 'Nordic VFX House',
    categoryBreakdown: [
      { category: 'Visual Effects', spend: '$624,000', percentage: 34 },
      { category: 'Production Studio', spend: '$540,000', percentage: 29 },
      { category: 'Post Production', spend: '$384,000', percentage: 21 },
      { category: 'Equipment Rental', spend: '$294,000', percentage: 16 },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Trial Banner */}
        {subStatus && subStatus.isInTrial && subStatus.trialDaysRemaining > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-white mb-1">🎉 Free Trial Active - All Features Unlocked!</h3>
                <p className="text-gray-300 text-sm">
                  You have <span className="text-purple-400">{subStatus.trialDaysRemaining} days</span> remaining in your trial. After that, features will be limited based on your subscription plan.
                </p>
              </div>
              <Button 
                onClick={() => navigate('/dashboard/account?tab=subscription')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white whitespace-nowrap"
              >
                Choose Plan
              </Button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-white text-3xl mb-2">Companies & Vendor Management</h1>
            <p className="text-gray-400">Manage service providers, track contracts, and monitor vendor performance</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
              onClick={() => setShowAddCompanyModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-zinc-900 border ${stat.borderColor} p-4`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
              <div className="text-white text-2xl mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.change}</div>
            </Card>
          ))}
        </div>

        {/* Main Content Card */}
        <Card className="bg-zinc-900 border-white/10">
          {/* Tabs and Search */}
          <div className="p-4 lg:p-6 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1 overflow-x-auto w-full lg:w-auto">
                {tabs.map((tab) => {
                  const locked = isTabLocked(tab.id);
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-3 lg:px-4 py-2 rounded-md text-xs lg:text-sm transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 ${
                        activeTab === tab.id
                          ? 'bg-purple-600 text-white'
                          : locked
                          ? 'text-gray-500 cursor-not-allowed opacity-60'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      disabled={locked && activeTab !== tab.id}
                    >
                      {tab.label}
                      {locked && <Lock className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:flex-1 lg:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search companies, vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-white">
                {activeTab === 'directory' && 'Production Partners Directory'}
                {activeTab === 'contracts' && 'Contracts Management'}
                {activeTab === 'performance' && 'Vendor Performance Metrics'}
                {activeTab === 'analytics' && 'Vendor Analytics'}
              </h3>
              {activeTab === 'directory' && (
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50 w-full lg:w-auto"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50 w-full lg:w-auto"
                  >
                    <option value="all">Filter by Category</option>
                    <option value="studio">Production Studio</option>
                    <option value="post">Post Production</option>
                    <option value="equipment">Equipment Rental</option>
                    <option value="vfx">Visual Effects</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Companies Directory Tab */}
          {activeTab === 'directory' && (
            <div className="relative">
              {isTabLocked('directory') && (
                <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl mb-2">Feature Locked</h3>
                    <p className="text-gray-400 mb-4">
                      Companies Directory requires {getPlanDisplayName(getProductionTabRequiredPlan('directory') || 'starter')} plan or higher
                    </p>
                    <Button 
                      onClick={() => navigate('/dashboard/account?tab=subscription')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Company</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Primary Contact</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Location</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Performance</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Contracts</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Monthly Spend</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Last Order</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company) => (
                      <tr key={company.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setSelectedCompany(company);
                              setShowCompanyModal(true);
                            }}
                            className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
                          >
                            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-xl">
                              {company.logo}
                            </div>
                            <div>
                              <div className="text-white hover:text-purple-400 transition-colors">{company.name}</div>
                              <div className="text-gray-500 text-sm">{company.type}</div>
                            </div>
                          </button>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="text-white text-sm mb-1">{company.contact.name}</div>
                            <div className="flex items-center gap-1 text-gray-400 text-xs mb-0.5">
                              <Mail className="w-3 h-3" />
                              <span>{company.contact.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <Phone className="w-3 h-3" />
                              <span>{company.contact.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-gray-300 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{company.location}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white">{company.performance}/5.0</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{company.contracts}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{company.monthlySpend}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-300 text-sm">{company.lastOrder}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(company.status)}`}>
                            {company.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => {
                              setSelectedCompany(company);
                              setShowCompanyModal(true);
                            }}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-white/10">
                {companies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    onView={() => {
                      setSelectedCompany(company);
                      setShowCompanyModal(true);
                    }}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-gray-400 text-sm">
                  Showing 1-6 of 47 companies
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-white/10 text-gray-300" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" className="border-white/10 text-gray-300">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Contracts Tab */}
          {activeTab === 'contracts' && (
            <div className="relative">
              {isTabLocked('contracts') && (
                <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl mb-2">Feature Locked</h3>
                    <p className="text-gray-400 mb-4">
                      Contracts Management requires {getPlanDisplayName(getProductionTabRequiredPlan('contracts') || 'growth')} plan or higher
                    </p>
                    <Button 
                      onClick={() => navigate('/dashboard/account?tab=subscription')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Company</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Contract Type</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Contract Value</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Start Date</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">End Date</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Renewal</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="text-white">{contract.company}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-300 text-sm">{contract.type}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-white">{contract.value}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-300 text-sm">{contract.startDate}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-300 text-sm">{contract.endDate}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(contract.status)}`}>
                            {contract.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            contract.renewalStatus === 'Expiring Soon' 
                              ? 'bg-red-500/10 text-red-400'
                              : contract.renewalStatus === 'Auto-Renew'
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {contract.renewalStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedContract(contract);
                                setShowContractModal(true);
                              }}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="Send Contract"
                            >
                              <FileSignature className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedContract(contract);
                                setShowContractModal(true);
                              }}
                              className="text-gray-400 hover:text-white transition-colors"
                              title="View Contract"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-white/10">
                {contracts.map((contract) => (
                  <ContractCard
                    key={contract.id}
                    contract={contract}
                    onView={() => {
                      setSelectedContract(contract);
                      setShowContractModal(true);
                    }}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-gray-400 text-sm">
                  Showing 1-4 of 128 contracts
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-white/10 text-gray-300" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" className="border-white/10 text-gray-300">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="relative">
              {isTabLocked('performance') && (
                <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl mb-2">Feature Locked</h3>
                    <p className="text-gray-400 mb-4">
                      Performance Metrics requires {getPlanDisplayName(getProductionTabRequiredPlan('performance') || 'growth')} plan or higher
                    </p>
                    <Button 
                      onClick={() => navigate('/dashboard/account?tab=subscription')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Company</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Overall Rating</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">On-Time Delivery</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Quality Score</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Avg Response Time</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Projects Completed</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((vendor, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="text-white">{vendor.company}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white">{vendor.rating}/5.0</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-white">{vendor.onTimeDelivery}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-white">{vendor.qualityScore}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-300">{vendor.responseTime}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-white">{vendor.projectsCompleted}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {vendor.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                            {vendor.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />}
                            {vendor.trend === 'stable' && <span className="text-gray-400">—</span>}
                            <span className={`text-sm ${
                              vendor.trend === 'up' ? 'text-green-400' :
                              vendor.trend === 'down' ? 'text-red-400' :
                              'text-gray-400'
                            }`}>
                              {vendor.trend === 'up' ? 'Improving' : vendor.trend === 'down' ? 'Declining' : 'Stable'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-white/10">
                {performanceData.map((vendor, index) => (
                  <PerformanceCard
                    key={index}
                    vendor={vendor}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-gray-400 text-sm">
                  Showing 1-4 of 47 vendors
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-white/10 text-gray-300" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" className="border-white/10 text-gray-300">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="relative">
              {isTabLocked('analytics') && (
                <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl mb-2">Feature Locked</h3>
                    <p className="text-gray-400 mb-4">
                      Analytics requires {getPlanDisplayName(getProductionTabRequiredPlan('analytics') || 'professional')} plan or higher
                    </p>
                    <Button 
                      onClick={() => navigate('/dashboard/account?tab=subscription')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-zinc-800 border-white/10 p-6">
                    <div className="text-gray-400 text-sm mb-2">Total Annual Spend</div>
                    <div className="text-white text-3xl mb-1">{analyticsData.totalSpend}</div>
                    <div className="text-green-400 text-sm">+15% from last year</div>
                  </Card>
                  <Card className="bg-zinc-800 border-white/10 p-6">
                    <div className="text-gray-400 text-sm mb-2">Average Contract Value</div>
                    <div className="text-white text-3xl mb-1">{analyticsData.averageContractValue}</div>
                    <div className="text-blue-400 text-sm">Across 128 contracts</div>
                  </Card>
                  <Card className="bg-zinc-800 border-white/10 p-6">
                    <div className="text-gray-400 text-sm mb-2">Top Vendor</div>
                    <div className="text-white text-3xl mb-1">{analyticsData.topVendor}</div>
                    <div className="text-purple-400 text-sm">4.9/5.0 rating</div>
                  </Card>
                </div>

                <h4 className="text-white mb-4">Spend by Category</h4>
                <div className="space-y-4">
                  {analyticsData.categoryBreakdown.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white">{item.category}</span>
                        <span className="text-gray-300">{item.spend}</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-gray-400 text-sm mt-1">{item.percentage}% of total spend</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Company Detail Modal */}
      {showCompanyModal && selectedCompany && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-3xl">
                    {selectedCompany.logo}
                  </div>
                  <div>
                    <h2 className="text-white text-2xl mb-1">{selectedCompany.name}</h2>
                    <p className="text-gray-400">{selectedCompany.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCompanyModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-white mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Primary Contact</div>
                      <div className="text-white">{selectedCompany.contact.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Email</div>
                      <div className="text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {selectedCompany.contact.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Phone</div>
                      <div className="text-white flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {selectedCompany.contact.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Location</div>
                      <div className="text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {selectedCompany.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white mb-3">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Overall Rating</div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xl">{selectedCompany.performance}/5.0</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Active Contracts</div>
                      <div className="text-white text-xl">{selectedCompany.contracts}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Monthly Spend</div>
                      <div className="text-white text-xl">{selectedCompany.monthlySpend}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Last Order</div>
                      <div className="text-white">{selectedCompany.lastOrder}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Status</div>
                      <span className={`px-3 py-1 rounded text-sm border ${getStatusColor(selectedCompany.status)}`}>
                        {selectedCompany.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <Button variant="outline" className="border-white/10 text-gray-300" onClick={() => setShowCompanyModal(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    const email = selectedCompany.contact.email;
                    const subject = `Partnership with ${selectedCompany.name}`;
                    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
                    window.location.href = mailtoLink;
                    toast.success(`Opening email to ${selectedCompany.contact.name}`);
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Contract Template Modal */}
      {showContractModal && selectedContract && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-white text-2xl mb-1">Contract Template</h2>
                  <p className="text-gray-400">{selectedContract.type} - {selectedContract.company}</p>
                </div>
                <button
                  onClick={() => setShowContractModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contract Preview */}
              <div className="bg-zinc-800 border border-white/10 rounded-lg p-6 mb-6">
                <div className="text-white space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl mb-2">{selectedContract.type}</h3>
                    <p className="text-gray-400">FilmLot360 Production Services</p>
                  </div>

                  <div>
                    <p className="mb-4">This {selectedContract.type} ("Agreement") is entered into as of {selectedContract.startDate}, between:</p>
                    <div className="ml-4 space-y-2">
                      <p><strong>Client:</strong> FilmLot360</p>
                      <p><strong>Vendor:</strong> {selectedContract.company}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg mb-2">1. Contract Terms</h4>
                    <div className="ml-4 text-gray-300 space-y-1">
                      <p>• Contract Value: {selectedContract.value}</p>
                      <p>• Start Date: {selectedContract.startDate}</p>
                      <p>• End Date: {selectedContract.endDate}</p>
                      <p>• Renewal Status: {selectedContract.renewalStatus}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg mb-2">2. Services</h4>
                    <p className="ml-4 text-gray-300">The Vendor agrees to provide production services as outlined in the Statement of Work, including but not limited to equipment rental, crew services, location services, and post-production support.</p>
                  </div>

                  <div>
                    <h4 className="text-lg mb-2">3. Payment Terms</h4>
                    <p className="ml-4 text-gray-300">Payment shall be made within 30 days of invoice receipt. The total contract value is {selectedContract.value}, payable in installments as agreed upon.</p>
                  </div>

                  <div>
                    <h4 className="text-lg mb-2">4. Confidentiality</h4>
                    <p className="ml-4 text-gray-300">Both parties agree to maintain confidentiality of all proprietary information shared during the course of this agreement.</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-400 mb-2">FilmLot360 Representative</p>
                        <div className="border-t border-white/20 pt-2">
                          <p>Signature: _________________</p>
                          <p className="text-sm text-gray-400">Date: _________________</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-2">{selectedContract.company} Representative</p>
                        <div className="border-t border-white/20 pt-2">
                          <p>Signature: _________________</p>
                          <p className="text-sm text-gray-400">Date: _________________</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div className="bg-zinc-800 border border-white/10 rounded-lg p-4 mb-6">
                <h3 className="text-white mb-3">Send for Signature</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Recipient Email</label>
                    <input
                      type="email"
                      defaultValue={companies.find(c => c.name === selectedContract.company)?.contact.email || ''}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Email Subject</label>
                    <input
                      type="text"
                      defaultValue={`${selectedContract.type} - Signature Required`}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Message</label>
                    <textarea
                      rows={3}
                      defaultValue={`Dear Partner,\n\nPlease review and sign the attached ${selectedContract.type}. The contract is valued at ${selectedContract.value} and covers the period from ${selectedContract.startDate} to ${selectedContract.endDate}.\n\nBest regards,\nFilmLot360 Team`}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <Button variant="outline" className="border-white/10 text-gray-300" onClick={() => setShowContractModal(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    toast.success('Contract sent for signature!');
                    setShowContractModal(false);
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send for Signature
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    toast.success('Contract sent via email!');
                    setShowContractModal(false);
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send via Email
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Add Company Modal */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-white text-2xl mb-1">Add New Company</h2>
                  <p className="text-gray-400">Complete information for new production partner</p>
                </div>
                <button
                  onClick={() => setShowAddCompanyModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Basic Information Section */}
                <div>
                  <h3 className="text-white mb-3 pb-2 border-b border-white/10">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Company Name *</label>
                      <input
                        type="text"
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Type *</label>
                      <select
                        value={newCompany.type}
                        onChange={(e) => setNewCompany({ ...newCompany, type: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="Production Studio">Production Studio</option>
                        <option value="Post Production">Post Production</option>
                        <option value="Equipment Rental">Equipment Rental</option>
                        <option value="Visual Effects">Visual Effects</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Logo</label>
                      <select
                        value={newCompany.logo}
                        onChange={(e) => setNewCompany({ ...newCompany, logo: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="🎬">🎬 Camera</option>
                        <option value="🎥">🎥 Video Camera</option>
                        <option value="🌅">🌅 Sunset</option>
                        <option value="✂️">✂️ Scissors</option>
                        <option value="📹">📹 Camcorder</option>
                        <option value="🎨">🎨 Palette</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Status</label>
                      <select
                        value={newCompany.status}
                        onChange={(e) => setNewCompany({ ...newCompany, status: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h3 className="text-white mb-3 pb-2 border-b border-white/10">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Primary Contact Name *</label>
                      <input
                        type="text"
                        value={newCompany.contactName}
                        onChange={(e) => setNewCompany({ ...newCompany, contactName: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="Contact person name"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Contact Email *</label>
                      <input
                        type="email"
                        value={newCompany.email}
                        onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Contact Phone *</label>
                      <input
                        type="text"
                        value={newCompany.phone}
                        onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Company Phone</label>
                      <input
                        type="text"
                        value={newCompany.companyPhone}
                        onChange={(e) => setNewCompany({ ...newCompany, companyPhone: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="Main company number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-400 text-sm block mb-1">Website</label>
                      <input
                        type="text"
                        value={newCompany.website}
                        onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="https://www.example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <h3 className="text-white mb-3 pb-2 border-b border-white/10">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-gray-400 text-sm block mb-1">Street Address</label>
                      <input
                        type="text"
                        value={newCompany.address}
                        onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">City</label>
                      <input
                        type="text"
                        value={newCompany.city}
                        onChange={(e) => setNewCompany({ ...newCompany, city: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">State/Province</label>
                      <input
                        type="text"
                        value={newCompany.state}
                        onChange={(e) => setNewCompany({ ...newCompany, state: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="CA"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Zip/Postal Code</label>
                      <input
                        type="text"
                        value={newCompany.zipCode}
                        onChange={(e) => setNewCompany({ ...newCompany, zipCode: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="90001"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Location Summary</label>
                      <input
                        type="text"
                        value={newCompany.location}
                        onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="Los Angeles, CA"
                      />
                    </div>
                  </div>
                </div>

                {/* Services & Rates Section */}
                <div>
                  <h3 className="text-white mb-3 pb-2 border-b border-white/10">Services & Rates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-gray-400 text-sm block mb-1">Services Offered</label>
                      <textarea
                        rows={2}
                        value={newCompany.servicesOffered}
                        onChange={(e) => setNewCompany({ ...newCompany, servicesOffered: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="e.g., Camera rental, Lighting equipment, Grip equipment..."
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Hourly Rate</label>
                      <input
                        type="text"
                        value={newCompany.hourlyRate}
                        onChange={(e) => setNewCompany({ ...newCompany, hourlyRate: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="$150/hr"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-1">Daily Rate</label>
                      <input
                        type="text"
                        value={newCompany.dailyRate}
                        onChange={(e) => setNewCompany({ ...newCompany, dailyRate: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                        placeholder="$1,200/day"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes Section */}
                <div>
                  <h3 className="text-white mb-3 pb-2 border-b border-white/10">Additional Information</h3>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Notes</label>
                    <textarea
                      rows={4}
                      value={newCompany.notes}
                      onChange={(e) => setNewCompany({ ...newCompany, notes: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/50"
                      placeholder="Additional notes, special requirements, payment terms, etc..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end mt-6">
                <Button variant="outline" className="border-white/10 text-gray-300" onClick={() => setShowAddCompanyModal(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    const newCompanyData = {
                      id: companies.length + 1,
                      name: newCompany.name,
                      type: newCompany.type,
                      logo: newCompany.logo,
                      contact: {
                        name: newCompany.contactName,
                        email: newCompany.email,
                        phone: newCompany.phone,
                      },
                      location: newCompany.location,
                      performance: 5.0,
                      contracts: 0,
                      monthlySpend: '$0',
                      lastOrder: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                      status: newCompany.status,
                      companyPhone: newCompany.companyPhone,
                      address: newCompany.address,
                      city: newCompany.city,
                      state: newCompany.state,
                      zipCode: newCompany.zipCode,
                      servicesOffered: newCompany.servicesOffered,
                      hourlyRate: newCompany.hourlyRate,
                      dailyRate: newCompany.dailyRate,
                      website: newCompany.website,
                      notes: newCompany.notes,
                    };
                    setCompanies([...companies, newCompanyData]);
                    setNewCompany({
                      name: '',
                      type: 'Production Studio',
                      logo: '🎬',
                      contactName: '',
                      email: '',
                      phone: '',
                      location: '',
                      status: 'Active',
                      companyPhone: '',
                      address: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      servicesOffered: '',
                      hourlyRate: '',
                      dailyRate: '',
                      website: '',
                      notes: '',
                    });
                    setShowAddCompanyModal(false);
                    toast.success('Company added successfully!');
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Company
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}