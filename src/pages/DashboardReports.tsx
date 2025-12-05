import { DashboardLayout } from '../components/DashboardLayout';
import { FileText, Plus, Search, Download, TrendingUp, TrendingDown, DollarSign, Calendar, Users, Film, Send, Clock, CheckCircle, AlertCircle, ChevronRight, Circle, Mail, X, Lock, BarChart3 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UpgradePrompt } from '../components/UpgradePrompt';
import { useState, useEffect } from 'react';
import { profileAPI } from '../utils/api';
import { getSubscriptionStatus } from '../utils/subscription';

export function DashboardReports() {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('workflow');
  const [notificationType, setNotificationType] = useState('sync-approval');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const response = await profileAPI.get();
      const subStatus = getSubscriptionStatus(response.profile.subscription);
      // TEMPORARILY UNLOCKED FOR DEVELOPMENT
      setHasAccess(true);
      // Original: Reports require Growth plan or higher
      // const hasGrowth = subStatus.plan === 'growth' || subStatus.plan === 'professional' || subStatus.plan === 'enterprise';
      // setHasAccess(hasGrowth);
    } catch (error) {
      console.error('Error checking access:', error);
      // TEMPORARILY UNLOCKED FOR DEVELOPMENT
      setHasAccess(true);
      // Original: setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  const workflowStats = [
    {
      label: 'Pending Approvals',
      value: '23',
      icon: '⏳',
    },
    {
      label: 'Approval Tasks',
      value: '18',
      icon: '✅',
    },
    {
      label: 'Average Response Time',
      value: '2.4h',
      icon: '⏱️',
    },
    {
      label: 'Auto-Approvals',
      value: '12',
      icon: '🤖',
    },
  ];

  const approvalOrders = [
    {
      id: 1,
      title: 'Weekly BMD-2024-037 - Medicine Supplies',
      requestedBy: 'Jennifer Roberts',
      role: 'Facility Coordinator',
      date: 'December 18, 2024',
      status: 'Action Required',
      statusColor: 'orange',
      approvalChain: [
        { initials: 'SA', name: 'Dr. Sarah Allen', role: 'Primary Manager', status: 'Approved', color: 'green' },
        { initials: 'MC', name: 'Michael Chen', role: 'Finance Manager', status: 'Pending', color: 'orange' },
      ],
    },
    {
      id: 2,
      title: 'External SCMA-2024-008 - HealthFirst Services',
      requestedBy: 'Denise Kim',
      role: 'Procurement Lead',
      date: 'December 17, 2024',
      status: 'Not Clear',
      statusColor: 'red',
      approvalChain: [
        { initials: 'SA', name: 'Dr. Sarah Allen', role: 'Primary Manager', status: 'Approved', color: 'green' },
        { initials: 'MC', name: 'Michael Chen', role: 'Finance Manager', status: 'Approved', color: 'green' },
        { initials: 'EW', name: 'Dr. Emily Wong', role: 'Director (External)', status: 'Rejected', color: 'red' },
      ],
    },
    {
      id: 3,
      title: 'Budget NSD-2024-01 - Facility Upgrades',
      requestedBy: 'Jason Morrison',
      role: 'Infrastructure',
      date: 'December 16, 2024',
      status: 'Approved',
      statusColor: 'green',
      approvalChain: [
        { initials: 'SA', name: 'Dr. Sarah Allen', role: 'Primary Manager', status: 'Approved', color: 'green' },
        { initials: 'MC', name: 'Michael Chen', role: 'Finance Manager', status: 'Approved', color: 'green' },
      ],
    },
  ];

  const availableApprovers = [
    {
      id: 1,
      initials: 'SJ',
      name: 'Sarah Johnson',
      role: 'Primary Manager',
      status: 'Online',
      statusColor: 'green',
    },
    {
      id: 2,
      initials: 'MC',
      name: 'Michael Chen',
      role: 'Finance Director',
      status: 'Away',
      statusColor: 'yellow',
    },
    {
      id: 3,
      initials: 'EW',
      name: 'Dr. Emily Wong',
      role: 'Medical Director',
      status: 'Online',
      statusColor: 'green',
    },
    {
      id: 4,
      initials: 'JB',
      name: 'Jordan Blake',
      role: 'Operations Lead',
      status: 'Offline',
      statusColor: 'gray',
    },
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'critical',
      icon: AlertCircle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      title: 'Critical approval window now met',
      message: 'Urgent request from Emergency Dept. now needs final approval for equipment purchase.',
      time: '5 mins ago',
    },
    {
      id: 2,
      type: 'success',
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      title: 'Approval received',
      message: 'Document ID# DOC-2024-452 has been formally approved. Ready to process for documentation.',
      time: '15 mins ago',
    },
    {
      id: 3,
      type: 'pending',
      icon: Clock,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      title: 'Pending confirmation note',
      message: 'Follow-up required on Budget Approval BUD-002456, awaiting secondary sign-off from Finance.',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'info',
      icon: CheckCircle,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      title: 'Successful multi-level vote',
      message: 'Multi-department approval workflow has completed all stages. Final consensus reached.',
      time: '2 hours ago',
    },
  ];

  const getStatusBadgeColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'orange':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'red':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Online':
        return 'bg-green-500';
      case 'Away':
        return 'bg-yellow-500';
      case 'Offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-gray-400">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <UpgradePrompt
          featureName="Reports & Analytics"
          description="Generate comprehensive production reports, call sheets, and analytics. Track budgets, timelines, and team performance with detailed insights."
          icon={FileText}
          requiredPlan="growth"
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 text-3xl mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Manage approval chains, generate reports, and track production analytics</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-1 -mb-px">
              <button
                onClick={() => setActiveTab('workflow')}
                className={`px-6 py-3 text-sm transition-colors border-b-2 ${
                  activeTab === 'workflow'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Approval Workflow
              </button>
              <button
                onClick={() => setActiveTab('budget')}
                className={`px-6 py-3 text-sm transition-colors border-b-2 flex items-center gap-2 ${
                  activeTab === 'budget'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                Budget Reports
              </button>
              <button
                onClick={() => setActiveTab('production')}
                className={`px-6 py-3 text-sm transition-colors border-b-2 flex items-center gap-2 ${
                  activeTab === 'production'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Film className="w-4 h-4" />
                Production Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Send Approval & Current Orders */}
          <div className="lg:col-span-2 space-y-6">
            {/* Send Approval Notification */}
            <Card className="bg-white border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-900 text-lg">Send Approval Notification</h2>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                {/* Notification Type */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Notification Type</label>
                  <select
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                  >
                    <option value="sync-approval">Sync & Approval Request</option>
                    <option value="urgent-review">Urgent Review</option>
                    <option value="callback-required">Callback Required</option>
                    <option value="final-approval">Final Approval</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your notification message here..."
                    rows={4}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-gray-700 text-sm mb-3">Priority</label>
                  <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-4">
                    <button
                      onClick={() => setPriority('low')}
                      className={`flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg border transition-colors ${
                        priority === 'low'
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                      }`}
                    >
                      <Circle className="w-3 h-3 fill-blue-500 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">Low Priority</span>
                    </button>
                    <button
                      onClick={() => setPriority('medium')}
                      className={`flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg border transition-colors ${
                        priority === 'medium'
                          ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-300'
                      }`}
                    >
                      <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm">Medium</span>
                    </button>
                    <button
                      onClick={() => setPriority('urgent')}
                      className={`flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg border transition-colors ${
                        priority === 'urgent'
                          ? 'bg-red-50 border-red-300 text-red-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-red-300'
                      }`}
                    >
                      <Circle className="w-3 h-3 fill-red-500 text-red-500 flex-shrink-0" />
                      <span className="text-sm">Urgent</span>
                    </button>
                    <button
                      onClick={() => setPriority('high')}
                      className={`flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg border transition-colors ${
                        priority === 'high'
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-green-300'
                      }`}
                    >
                      <Circle className="w-3 h-3 fill-green-500 text-green-500 flex-shrink-0" />
                      <span className="text-sm whitespace-nowrap">High Level Notify</span>
                    </button>
                  </div>
                </div>

                {/* Due Date and Linked Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      placeholder="mm/dd/yyyy"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Linked Approval Order (Optional)</label>
                    <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-400 focus:outline-none focus:border-purple-500">
                      <option>Select order</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="border-gray-300 text-gray-700 flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>

              {/* Selected Recipients */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <h3 className="text-gray-900 mb-3">Selected Recipients</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm">
                    <strong>Message:</strong> Katie Gold and her healthcare insurance vendors are in need of Dr. Bryson M. Donald for his emergency physician's signature. Please send approval to Livehealth Co. 2024.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-gray-900 text-sm mb-1">Cameron Williamson</div>
                  <div className="text-gray-600 text-xs">HR Apt, 12 Dec 10:30 AM</div>
                </div>
              </div>
            </Card>

            {/* Current Approval Orders */}
            <Card className="bg-white border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-900 text-lg mb-1">Current Approval Orders</h2>
                <p className="text-gray-600 text-sm">Track approvals from initiation through completion with detailed approval chains</p>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                {approvalOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-3 md:p-4 hover:border-purple-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-2">{order.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
                          <span><strong>Requested by:</strong> {order.requestedBy}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{order.role}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{order.date}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs border whitespace-nowrap self-start ${getStatusBadgeColor(order.statusColor)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Approval Chain */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      {order.approvalChain.map((approver, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center gap-2">
                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                            <div className={`w-8 h-8 ${approver.color === 'green' ? 'bg-green-100' : approver.color === 'orange' ? 'bg-orange-100' : 'bg-red-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <span className={`text-sm ${approver.color === 'green' ? 'text-green-700' : approver.color === 'orange' ? 'text-orange-700' : 'text-red-700'}`}>
                                {approver.initials}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="text-gray-900 text-sm">{approver.name}</div>
                              <div className="text-gray-500 text-xs">{approver.role}</div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getApprovalStatusColor(approver.status)}`}>
                              {approver.status}
                            </span>
                          </div>
                          {index < order.approvalChain.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 rotate-90 md:rotate-0 self-center" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Available Approvers & Notifications */}
          <div className="space-y-6">
            {/* Available Approvers */}
            <Card className="bg-white border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-gray-900">Available Approvers</h3>
                <p className="text-gray-600 text-sm mt-1">View approvers and current availability status</p>
              </div>
              <div className="p-4 space-y-3">
                {availableApprovers.map((approver) => (
                  <div key={approver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 text-sm">{approver.initials}</span>
                      </div>
                      <div>
                        <div className="text-gray-900 text-sm">{approver.name}</div>
                        <div className="text-gray-600 text-xs">{approver.role}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 ${getAvailabilityColor(approver.status)} text-white rounded text-xs`}>
                      {approver.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Notifications */}
            <Card className="bg-white border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-gray-900">Recent Notifications</h3>
              </div>
              <div className="p-4 space-y-3">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className={`border ${notification.borderColor} rounded-lg p-3`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 ${notification.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <notification.icon className={`w-4 h-4 ${notification.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 text-sm mb-1">{notification.title}</h4>
                        <p className="text-gray-600 text-xs mb-2">{notification.message}</p>
                        <p className="text-gray-500 text-xs">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}