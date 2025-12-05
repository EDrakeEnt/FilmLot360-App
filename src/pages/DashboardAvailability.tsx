import { DashboardLayout } from '../components/DashboardLayout';
import { CheckCircle, BarChart3, Video, Trophy, Search, Plus, ChevronLeft, ChevronRight, Filter, Download, Calendar, MapPin, Building, Clock, Bell, AlertTriangle, X, User, Upload, Camera, Trash2, Mail, Phone } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function DashboardAvailability() {
  const [activeTab, setActiveTab] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [talentHeadshotPreview, setTalentHeadshotPreview] = useState<string | null>(null);
  const [selectedActor, setSelectedActor] = useState<any>(null);
  const [editHeadshotPreview, setEditHeadshotPreview] = useState<string | null>(null);

  const stats = [
    {
      label: 'Available Today',
      value: '48',
      icon: CheckCircle,
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'This Week',
      value: '142',
      icon: BarChart3,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Booked Shoots',
      value: '23',
      icon: Video,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
    },
    {
      label: 'Pending Callbacks',
      value: '12',
      icon: Trophy,
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-500/20',
    },
  ];

  const tabs = [
    { id: 'today', label: "Today's Schedule" },
    { id: 'weekly', label: 'Weekly Calendar' },
    { id: 'actor', label: 'Actor Availability' },
    { id: 'studio', label: 'Studio Resources' },
  ];

  const todaysSchedule = [
    {
      id: 1,
      time: '08:00 AM',
      initials: 'MS',
      headshot: 'https://images.unsplash.com/photo-1515095984775-726a54913d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwbWFufGVufDF8fHx8MTc2NDc3OTc2OHww&ixlib=rb-4.1.0&q=80&w=400',
      title: 'Principal Photography - The Last Detective',
      actor: 'Marcus Sterling',
      duration: 'Full Day',
      production: 'Paramount Pictures',
      location: 'Studio Lot 5',
      status: 'Confirmed',
      type: 'Filming',
      color: 'bg-purple-600',
    },
    {
      id: 2,
      time: '10:00 AM',
      initials: 'SD',
      headshot: 'https://images.unsplash.com/photo-1701163802894-99fa45f1c83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwd29tYW58ZW58MXx8fHwxNzY0Nzc5NzcyfDA&ixlib=rb-4.1.0&q=80&w=400',
      title: 'Commercial Shoot - Tech Brand',
      actor: 'Sarah Davis',
      duration: '4 Hours',
      production: 'Creative Agency',
      location: 'Downtown Studio',
      status: 'Confirmed',
      type: 'Commercial',
      color: 'bg-blue-600',
    },
    {
      id: 3,
      time: '02:00 PM',
      initials: 'JH',
      headshot: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NjQ3MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=400',
      title: 'Callback Audition - Drama Series',
      actor: 'James Hartford',
      duration: '2 Hours',
      production: 'HBO',
      location: 'Casting Office',
      status: 'Pending',
      type: 'Audition',
      color: 'bg-green-600',
    },
  ];

  const upcomingBookings = [
    {
      id: 1,
      title: 'Final Callback - Supporting Role',
      actor: 'James Hartford',
      date: 'Dec 24, 2024',
      time: '10:00 AM',
      type: 'Callback Audition',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Table Read - New Feature',
      actor: 'Emily Thompson',
      date: 'Dec 26, 2024',
      time: '09:00 AM',
      type: 'Production Meeting',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Wardrobe Fitting',
      actor: 'Marcus Sterling',
      date: 'Dec 27, 2024',
      time: '02:00 PM',
      type: 'Pre-Production',
      priority: 'Low',
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'schedule-change',
      icon: AlertTriangle,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      title: 'Schedule Change',
      message: 'Marcus Sterling call time moved to 09:00 AM',
      time: '5 minutes ago',
    },
    {
      id: 2,
      type: 'new-booking',
      icon: CheckCircle,
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      title: 'New Booking Confirmed',
      message: 'Sarah Davis confirmed for commercial shoot',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'callback',
      icon: Trophy,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      title: 'Callback Request',
      message: 'James Hartford requested for final callback',
      time: '2 hours ago',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-white text-3xl mb-2">Availability & Scheduling</h1>
            <p className="text-gray-400">Manage talent availability, production schedules, and resource bookings</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search actors, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 w-full sm:w-64"
              />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setShowBookingModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Book Talent
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-white border ${stat.borderColor} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
                  <div className="text-gray-900 text-3xl">{stat.value}</div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-1 bg-zinc-900 border border-white/10 rounded-lg p-1 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 md:px-6 py-2 rounded-md text-xs md:text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule Tab Content */}
          {activeTab === 'today' && (
            <>
              {/* Left Column - Today's Schedule */}
              <div className="lg:col-span-2">
                <Card className="bg-white border-gray-200">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                          <h2 className="text-gray-900 text-lg">Today's Availability</h2>
                          <p className="text-gray-500 text-sm">Monday, December 23, 2024</p>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-gray-300 text-gray-700 text-sm flex-1 md:flex-none">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" className="border-gray-300 text-gray-700 text-sm flex-1 md:flex-none">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Items */}
                  <div className="p-6 space-y-4">
                    {todaysSchedule.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                        <div className="flex flex-col md:flex-row items-start gap-4">
                          {/* Mobile Header: Time, Avatar, and Status */}
                          <div className="flex items-center justify-between w-full md:hidden">
                            <div className="flex items-center gap-3">
                              {/* Time Badge */}
                              <div className="bg-purple-600 text-white px-3 py-2 rounded-lg text-center">
                                <div className="text-xs">TIME</div>
                                <div className="text-sm">{item.time}</div>
                              </div>

                              {/* Avatar */}
                              {item.headshot ? (
                                <ImageWithFallback
                                  src={item.headshot}
                                  alt={item.actor}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm">{item.initials}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Status Badges */}
                            <div className="flex flex-col items-end gap-1">
                              <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {item.type}
                              </span>
                            </div>
                          </div>

                          {/* Desktop Layout: Time and Avatar */}
                          <div className="hidden md:flex items-start gap-4">
                            {/* Time Badge */}
                            <div className="bg-purple-600 text-white px-3 py-2 rounded-lg text-center min-w-[80px]">
                              <div className="text-xs">TIME</div>
                              <div className="text-sm">{item.time}</div>
                            </div>

                            {/* Avatar */}
                            {item.headshot ? (
                              <ImageWithFallback
                                src={item.headshot}
                                alt={item.actor}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">{item.initials}</span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                              <div>
                                <h3 className="text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.actor}</p>
                              </div>
                              <div className="hidden md:flex flex-col items-end gap-2">
                                <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                  {item.type}
                                </span>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{item.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                <span>{item.production}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{item.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column - Upcoming Bookings & Notifications */}
              <div className="space-y-6">
                {/* Upcoming Bookings */}
                <Card className="bg-white border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-gray-900">Upcoming Bookings</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">{booking.actor.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-gray-900 text-sm mb-1">{booking.title}</h4>
                            <p className="text-gray-600 text-xs mb-2">{booking.actor}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600">{booking.type}</span>
                              <span className={`px-2 py-0.5 rounded text-xs border ${getPriorityColor(booking.priority)}`}>
                                {booking.priority}
                              </span>
                            </div>
                          </div>
                        </div>
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
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`${notification.bgColor} border border-gray-200 rounded-lg p-3`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 ${notification.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <notification.icon className={`w-4 h-4 ${notification.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-gray-900 text-sm mb-1">{notification.title}</h4>
                            <p className="text-gray-600 text-xs mb-1">{notification.message}</p>
                            <p className="text-gray-500 text-xs">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}

          {/* Weekly Calendar Tab Content */}
          {activeTab === 'weekly' && (
            <div className="lg:col-span-3">
              <Card className="bg-white border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-gray-900 text-lg mb-1">Weekly Calendar</h2>
                      <p className="text-gray-500 text-sm">December 23-29, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="border-gray-300 text-gray-700 text-sm flex-1 md:flex-none">
                        <ChevronLeft className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Previous Week</span>
                      </Button>
                      <Button variant="outline" className="border-gray-300 text-gray-700 text-sm flex-1 md:flex-none">
                        <span className="hidden md:inline">Next Week</span>
                        <ChevronRight className="w-4 h-4 md:ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Calendar Grid */}
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                      {/* Header */}
                      <div className="grid grid-cols-8 gap-2 mb-4">
                        <div className="text-gray-600 text-sm"></div>
                        {['Mon 23', 'Tue 24', 'Wed 25', 'Thu 26', 'Fri 27', 'Sat 28', 'Sun 29'].map((day) => (
                          <div key={day} className="text-center">
                            <div className="text-gray-900">{day.split(' ')[0]}</div>
                            <div className="text-2xl text-gray-900">{day.split(' ')[1]}</div>
                          </div>
                        ))}
                      </div>

                      {/* Time Slots */}
                      {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((time) => (
                        <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                          <div className="text-gray-600 text-sm py-2">{time}</div>
                          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                            <div key={day} className="border border-gray-200 rounded p-2 min-h-[60px] hover:border-purple-300 transition-colors">
                              {(day === 0 && time === '08:00') && (
                                <div className="bg-purple-100 border border-purple-300 rounded p-1">
                                  <div className="text-xs text-purple-900">MS - Filming</div>
                                  <div className="text-xs text-purple-700">Full Day</div>
                                </div>
                              )}
                              {(day === 1 && time === '10:00') && (
                                <div className="bg-blue-100 border border-blue-300 rounded p-1">
                                  <div className="text-xs text-blue-900">SD - Commercial</div>
                                  <div className="text-xs text-blue-700">4 hrs</div>
                                </div>
                              )}
                              {(day === 2 && time === '14:00') && (
                                <div className="bg-green-100 border border-green-300 rounded p-1">
                                  <div className="text-xs text-green-900">JH - Callback</div>
                                  <div className="text-xs text-green-700">2 hrs</div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Actor Availability Tab Content */}
          {activeTab === 'actor' && (
            <div className="lg:col-span-3">
              <Card className="bg-white border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-gray-900 text-lg">Actor Availability Overview</h2>
                    <div className="flex items-center gap-2">
                      <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm focus:outline-none focus:border-purple-500 flex-1 md:flex-none">
                        <option>All Actors</option>
                        <option>Available Only</option>
                        <option>Booked Only</option>
                      </select>
                      <Button variant="outline" className="border-gray-300 text-gray-700 text-sm whitespace-nowrap">
                        <Download className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Export</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { id: 1, name: 'Marcus Sterling', initials: 'MS', headshot: 'https://images.unsplash.com/photo-1515095984775-726a54913d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwbWFufGVufDF8fHx8MTc2NDc3OTc2OHww&ixlib=rb-4.1.0&q=80&w=400', status: 'Booked', project: 'The Last Detective', until: 'Dec 28', email: 'marcus.sterling@talent.com', phone: '(555) 111-2222', location: 'Los Angeles, CA', agency: 'Creative Artists Agency', type: 'Lead Actor', rate: 5000 },
                      { id: 2, name: 'Sarah Davis', initials: 'SD', headshot: 'https://images.unsplash.com/photo-1701163802894-99fa45f1c83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwd29tYW58ZW58MXx8fHwxNzY0Nzc5NzcyfDA&ixlib=rb-4.1.0&q=80&w=400', status: 'Available', project: null, until: null, email: 'sarah.davis@talent.com', phone: '(555) 222-3333', location: 'New York, NY', agency: 'United Talent Agency', type: 'Supporting Actor', rate: 3000 },
                      { id: 3, name: 'James Hartford', initials: 'JH', headshot: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NjQ3MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=400', status: 'Available', project: null, until: null, email: 'james.hartford@talent.com', phone: '(555) 333-4444', location: 'Atlanta, GA', agency: 'William Morris Endeavor', type: 'Character Actor', rate: 2500 },
                      { id: 4, name: 'Emily Thompson', initials: 'ET', headshot: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDcwODA5OXww&ixlib=rb-4.1.0&q=80&w=400', status: 'Booked', project: 'Drama Series', until: 'Jan 5', email: 'emily.thompson@talent.com', phone: '(555) 444-5555', location: 'Los Angeles, CA', agency: 'ICM Partners', type: 'Lead Actor', rate: 4500 },
                      { id: 5, name: 'Robert Chen', initials: 'RC', headshot: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFufGVufDF8fHx8MTc2NDc1NzI2NHww&ixlib=rb-4.1.0&q=80&w=400', status: 'Available', project: null, until: null, email: 'robert.chen@talent.com', phone: '(555) 555-6666', location: 'Vancouver, BC', agency: 'Paradigm Talent Agency', type: 'Supporting Actor', rate: 2800 },
                      { id: 6, name: 'Lisa Anderson', initials: 'LA', headshot: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2NDcxMjI2N3ww&ixlib=rb-4.1.0&q=80&w=400', status: 'Booked', project: 'Commercial', until: 'Dec 24', email: 'lisa.anderson@talent.com', phone: '(555) 666-7777', location: 'Chicago, IL', agency: 'Gersh Agency', type: 'Commercial Actor', rate: 2000 },
                    ].map((actor) => (
                      <Card 
                        key={actor.id} 
                        className="bg-white border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => {
                          setSelectedActor(actor);
                          setEditHeadshotPreview(actor.headshot);
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {actor.headshot ? (
                            <ImageWithFallback
                              src={actor.headshot}
                              alt={actor.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white">{actor.initials}</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="text-gray-900">{actor.name}</div>
                            <span className={`px-2 py-0.5 rounded text-xs border ${
                              actor.status === 'Available' 
                                ? 'bg-green-500/10 text-green-600 border-green-500/30' 
                                : 'bg-orange-500/10 text-orange-600 border-orange-500/30'
                            }`}>
                              {actor.status}
                            </span>
                          </div>
                        </div>
                        {actor.project && (
                          <div className="bg-gray-50 border border-gray-200 rounded p-2">
                            <div className="text-xs text-gray-600 mb-1">Current Project</div>
                            <div className="text-sm text-gray-900">{actor.project}</div>
                            <div className="text-xs text-gray-600 mt-1">Until {actor.until}</div>
                          </div>
                        )}
                        {!actor.project && (
                          <Button 
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowBookingModal(true);
                            }}
                          >
                            Book Now
                          </Button>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Studio Resources Tab Content */}
          {activeTab === 'studio' && (
            <div className="lg:col-span-3">
              <Card className="bg-white border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-gray-900 text-lg">Studio Resources & Equipment</h2>
                    <div className="flex items-center gap-2">
                      <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-sm focus:outline-none focus:border-purple-500 flex-1 md:flex-none">
                        <option>All Resources</option>
                        <option>Studios</option>
                        <option>Equipment</option>
                        <option>Locations</option>
                      </select>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm whitespace-nowrap">
                        <Plus className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Add Resource</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Studios */}
                    <div>
                      <h3 className="text-gray-900 mb-4">Studio Spaces</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Studio Lot 5', capacity: '200 people', status: 'Booked', booking: 'The Last Detective', until: 'Dec 28' },
                          { name: 'Downtown Studio', capacity: '50 people', status: 'Available', booking: null, until: null },
                          { name: 'Casting Office A', capacity: '20 people', status: 'Available', booking: null, until: null },
                        ].map((studio, index) => (
                          <Card key={index} className="bg-white border-gray-200 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Building className="w-5 h-5 text-purple-600" />
                                <div>
                                  <div className="text-gray-900">{studio.name}</div>
                                  <div className="text-xs text-gray-600">{studio.capacity}</div>
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs border ${
                                studio.status === 'Available' 
                                  ? 'bg-green-500/10 text-green-600 border-green-500/30' 
                                  : 'bg-red-500/10 text-red-600 border-red-500/30'
                              }`}>
                                {studio.status}
                              </span>
                            </div>
                            {studio.booking && (
                              <div className="bg-gray-50 border border-gray-200 rounded p-2 mt-2">
                                <div className="text-xs text-gray-600">Booked for: {studio.booking}</div>
                                <div className="text-xs text-gray-600">Until: {studio.until}</div>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Equipment */}
                    <div>
                      <h3 className="text-gray-900 mb-4">Equipment</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'RED Camera Package', quantity: '3 units', status: 'Available', inUse: '1/3' },
                          { name: 'Lighting Kit Pro', quantity: '5 sets', status: 'Available', inUse: '2/5' },
                          { name: 'Sound Recording System', quantity: '2 units', status: 'Booked', inUse: '2/2' },
                        ].map((equipment, index) => (
                          <Card key={index} className="bg-white border-gray-200 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Video className="w-5 h-5 text-blue-600" />
                                <div>
                                  <div className="text-gray-900">{equipment.name}</div>
                                  <div className="text-xs text-gray-600">{equipment.quantity}</div>
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs border ${
                                equipment.status === 'Available' 
                                  ? 'bg-green-500/10 text-green-600 border-green-500/30' 
                                  : 'bg-red-500/10 text-red-600 border-red-500/30'
                              }`}>
                                {equipment.status}
                              </span>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded p-2 mt-2">
                              <div className="text-xs text-gray-600">In Use: {equipment.inUse}</div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Book Talent Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-gray-900 text-xl mb-1">Book Talent</h2>
                <p className="text-gray-600 text-sm">Schedule a new talent booking</p>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Talent Headshot Upload */}
              <div>
                <label className="block text-gray-900 mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Talent Headshot (Optional)
                </label>
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {talentHeadshotPreview ? (
                      <img src={talentHeadshotPreview} alt="Headshot preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <span className="text-gray-400 text-xs">Upload</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setTalentHeadshotPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                    />
                    <p className="text-gray-500 text-xs mt-1">Square image recommended, max 5MB</p>
                    {talentHeadshotPreview && (
                      <button
                        type="button"
                        onClick={() => setTalentHeadshotPreview(null)}
                        className="text-red-600 hover:text-red-500 text-sm mt-1"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Talent Selection */}
              <div>
                <label className="block text-gray-900 mb-2">Select Talent *</label>
                <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500">
                  <option value="">Choose an actor...</option>
                  <option value="ms">Marcus Sterling</option>
                  <option value="sd">Sarah Davis</option>
                  <option value="jh">James Hartford</option>
                  <option value="et">Emily Thompson</option>
                  <option value="rc">Robert Chen</option>
                  <option value="la">Lisa Anderson</option>
                </select>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 mb-2">Project Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., The Last Detective"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Production Company *</label>
                  <input
                    type="text"
                    placeholder="e.g., Paramount Pictures"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Booking Type */}
              <div>
                <label className="block text-gray-900 mb-2">Booking Type *</label>
                <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500">
                  <option value="">Select type...</option>
                  <option value="filming">Filming</option>
                  <option value="commercial">Commercial</option>
                  <option value="audition">Audition</option>
                  <option value="callback">Callback</option>
                  <option value="table-read">Table Read</option>
                  <option value="wardrobe">Wardrobe Fitting</option>
                  <option value="meeting">Production Meeting</option>
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-900 mb-2">Date *</label>
                  <input
                    type="date"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Start Time *</label>
                  <input
                    type="time"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Duration *</label>
                  <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500">
                    <option value="">Select duration...</option>
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                    <option value="half-day">Half Day (4-6 hrs)</option>
                    <option value="full-day">Full Day (8+ hrs)</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 mb-2">Location/Studio *</label>
                  <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500">
                    <option value="">Select location...</option>
                    <option value="lot5">Studio Lot 5</option>
                    <option value="downtown">Downtown Studio</option>
                    <option value="casting">Casting Office A</option>
                    <option value="other">Other Location</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 mb-2">Priority</label>
                  <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-gray-900 mb-2">Notes</label>
                <textarea
                  rows={4}
                  placeholder="Add any additional details about this booking..."
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                ></textarea>
              </div>

              {/* Status */}
              <div>
                <label className="block text-gray-900 mb-2">Booking Status</label>
                <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500">
                  <option value="pending">Pending Confirmation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="tentative">Tentative</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
              <Button
                variant="outline"
                onClick={() => setShowBookingModal(false)}
                className="border-gray-300 text-gray-700"
              >
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Actor Edit Modal */}
      {selectedActor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div className="flex items-center gap-4">
                {editHeadshotPreview ? (
                  <ImageWithFallback
                    src={editHeadshotPreview}
                    alt={selectedActor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">{selectedActor.initials}</span>
                  </div>
                )}
                <div>
                  <h2 className="text-gray-900 text-xl mb-1">Edit Actor Profile</h2>
                  <p className="text-gray-600 text-sm">{selectedActor.name}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedActor(null);
                  setEditHeadshotPreview(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <form className="p-6 space-y-6">
              {/* Headshot Upload */}
              <div>
                <label className="block text-gray-900 mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Profile Headshot
                </label>
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {editHeadshotPreview ? (
                      <img src={editHeadshotPreview} alt="Headshot preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-gray-400 text-xs">Upload Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditHeadshotPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                    />
                    <p className="text-gray-500 text-xs mt-2">Recommended: Square image, at least 400x400px. Max 5MB.</p>
                    {editHeadshotPreview && (
                      <button
                        type="button"
                        onClick={() => setEditHeadshotPreview(null)}
                        className="text-red-600 hover:text-red-500 text-sm mt-2"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      defaultValue={selectedActor.name}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Actor Type *</label>
                    <select 
                      defaultValue={selectedActor.type}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    >
                      <option value="Lead Actor">Lead Actor</option>
                      <option value="Supporting Actor">Supporting Actor</option>
                      <option value="Character Actor">Character Actor</option>
                      <option value="Commercial Actor">Commercial Actor</option>
                      <option value="Voice Actor">Voice Actor</option>
                      <option value="Stunt Performer">Stunt Performer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Availability Status *</label>
                    <select 
                      defaultValue={selectedActor.status}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Booked">Booked</option>
                      <option value="Limited">Limited Availability</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Day Rate ($) *</label>
                    <input
                      type="number"
                      defaultValue={selectedActor.rate}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      defaultValue={selectedActor.email}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      defaultValue={selectedActor.phone}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedActor.location}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Talent Agency</label>
                    <input
                      type="text"
                      defaultValue={selectedActor.agency}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Current Booking Information */}
              {selectedActor.project && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    Current Booking
                  </h3>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm mb-2">Project Name</label>
                        <input
                          type="text"
                          defaultValue={selectedActor.project}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm mb-2">Booked Until</label>
                        <input
                          type="text"
                          defaultValue={selectedActor.until}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-red-300 text-red-600 hover:bg-red-50 mt-4"
                    >
                      Clear Current Booking
                    </Button>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">IMDB Profile URL</label>
                    <input
                      type="url"
                      placeholder="https://imdb.com/name/..."
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Skills & Specialties</label>
                    <input
                      type="text"
                      placeholder="e.g., Action, Drama, Comedy, Stunts, Accents"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500"
                    />
                    <p className="text-gray-500 text-xs mt-1">Separate multiple skills with commas</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Notes/Bio</label>
                    <textarea
                      rows={4}
                      placeholder="Additional notes, bio, awards, or special requirements..."
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-between sticky bottom-0 bg-white">
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Actor
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedActor(null);
                    setEditHeadshotPreview(null);
                  }}
                  className="border-gray-300 text-gray-700"
                >
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}