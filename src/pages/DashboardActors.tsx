import { DashboardLayout } from '../components/DashboardLayout';
import { Users, Plus, Search, Download, Upload, TrendingUp, Briefcase, UserCheck, DollarSign, Video, Eye, Edit, Bell, X, Camera, Trash2, Mail, Phone, MapPin, Calendar, CheckCircle, User } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function DashboardActors() {
  const [activeTab, setActiveTab] = useState('database');
  const [searchQuery, setSearchQuery] = useState('');
  const [actorStatusFilter, setActorStatusFilter] = useState('');
  const [unionStatusFilter, setUnionStatusFilter] = useState('');
  const [projectTypeFilter, setProjectTypeFilter] = useState('');
  const [ageRangeFilter, setAgeRangeFilter] = useState('');
  const [roleTypeFilter, setRoleTypeFilter] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedActor, setSelectedActor] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editHeadshotPreview, setEditHeadshotPreview] = useState<string | null>(null);
  const [addHeadshotPreview, setAddHeadshotPreview] = useState<string | null>(null);

  // Form state for editing
  const [editName, setEditName] = useState('');
  const [editRoleType, setEditRoleType] = useState('');
  const [editAvailability, setEditAvailability] = useState('');
  const [editDayRate, setEditDayRate] = useState(0);
  const [editProjectType, setEditProjectType] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editAgentName, setEditAgentName] = useState('');
  const [editAgentRole, setEditAgentRole] = useState('');
  const [editCurrentProject, setEditCurrentProject] = useState('');
  const [editBookedUntil, setEditBookedUntil] = useState('');
  const [editImdb, setEditImdb] = useState('');
  const [editSkills, setEditSkills] = useState('');
  const [editBio, setEditBio] = useState('');

  // Form state for adding
  const [addName, setAddName] = useState('');
  const [addRoleType, setAddRoleType] = useState('Actor');
  const [addAvailability, setAddAvailability] = useState('Available');
  const [addDayRate, setAddDayRate] = useState(0);
  const [addProjectType, setAddProjectType] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addLocation, setAddLocation] = useState('');
  const [addAgentName, setAddAgentName] = useState('');
  const [addAgentRole, setAddAgentRole] = useState('');
  const [addCurrentProject, setAddCurrentProject] = useState('');
  const [addBookedUntil, setAddBookedUntil] = useState('');
  const [addImdb, setAddImdb] = useState('');
  const [addSkills, setAddSkills] = useState('');
  const [addBio, setAddBio] = useState('');
  const [addStatus, setAddStatus] = useState('Available - Seeking Projects');

  const stats = [
    {
      label: 'Total Actors',
      value: '1,247',
      change: '+18% from last month',
      icon: Users,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
    },
    {
      label: 'Active Projects',
      value: '34',
      change: '+12% from last month',
      icon: Briefcase,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Available Talent',
      value: '892',
      change: '+5% from last month',
      icon: UserCheck,
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'Total Bookings',
      value: '$2.4M',
      change: '+23% from last month',
      icon: DollarSign,
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-500/20',
    },
    {
      label: 'Demo Reels',
      value: '1,089',
      change: 'Updated this month',
      icon: Video,
      bgColor: 'bg-pink-500/10',
      iconColor: 'text-pink-400',
      borderColor: 'border-pink-500/20',
    },
  ];

  const [actors, setActors] = useState([
    {
      id: 1,
      name: 'Eugenia A Drake',
      initials: 'EAD',
      status: 'Available - Seeking Projects',
      agent: {
        name: 'Eugeia',
        role: 'Primary Agent',
      },
      roleType: 'Actor',
      projectType: 'Open to All',
      dayRate: 126,
      lastBooked: 'Nov 24, 2025',
      lastBookedNote: 'Just added',
      availability: 'Available',
      email: 'eugenia.drake@talent.com',
      phone: '(555) 111-2222',
      location: 'Los Angeles, CA',
      headshot: 'https://images.unsplash.com/photo-1701163802894-99fa45f1c83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwd29tYW58ZW58MXx8fHwxNzY0Nzc5NzcyfDA&ixlib=rb-4.1.0&q=80&w=400',
      skills: 'Drama, Comedy, Theater',
      imdb: 'https://imdb.com/name/nm1234567',
      bio: 'Versatile actress with extensive theater and film experience.',
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      initials: 'MJ',
      status: 'Available - Seeking Projects',
      agent: {
        name: 'CAA Talent',
        role: 'Lead Agent',
      },
      roleType: 'Lead Actor',
      projectType: 'Film & TV',
      dayRate: 2500,
      lastBooked: 'Nov 15, 2025',
      lastBookedNote: '2 weeks ago',
      availability: 'Available',
      email: 'marcus.johnson@talent.com',
      phone: '(555) 222-3333',
      location: 'New York, NY',
      headshot: 'https://images.unsplash.com/photo-1515095984775-726a54913d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwbWFufGVufDF8fHx8MTc2NDc3OTc2OHww&ixlib=rb-4.1.0&q=80&w=400',
      skills: 'Action, Drama, Method Acting',
      imdb: 'https://imdb.com/name/nm2345678',
      bio: 'Award-winning lead actor specializing in dramatic roles.',
    },
    {
      id: 3,
      name: 'Sofia Martinez',
      initials: 'SM',
      status: 'On Set - Currently Booked',
      agent: {
        name: 'WME',
        role: 'Primary Agent',
      },
      roleType: 'Supporting',
      projectType: 'Feature Film',
      dayRate: 1800,
      lastBooked: 'Nov 28, 2025',
      lastBookedNote: 'Active',
      availability: 'Booked',
      email: 'sofia.martinez@talent.com',
      phone: '(555) 333-4444',
      location: 'Los Angeles, CA',
      headshot: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDcwODA5OXww&ixlib=rb-4.1.0&q=80&w=400',
      skills: 'Drama, Spanish Language, Supporting Roles',
      imdb: 'https://imdb.com/name/nm3456789',
      bio: 'Experienced supporting actress with bilingual capabilities.',
      currentProject: 'The Last Detective',
      bookedUntil: 'Dec 28, 2025',
    },
    {
      id: 4,
      name: 'James Chen',
      initials: 'JC',
      status: 'Available - Seeking Projects',
      agent: {
        name: 'UTA',
        role: 'Commercial Agent',
      },
      roleType: 'Character Actor',
      projectType: 'Commercial & Film',
      dayRate: 950,
      lastBooked: 'Oct 30, 2025',
      lastBookedNote: '1 month ago',
      availability: 'Available',
      email: 'james.chen@talent.com',
      phone: '(555) 444-5555',
      location: 'Vancouver, BC',
      headshot: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NjQ3MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=400',
      skills: 'Character Acting, Commercials, Improv',
      imdb: 'https://imdb.com/name/nm4567890',
      bio: 'Versatile character actor with strong commercial presence.',
    },
    {
      id: 5,
      name: 'Emily Thompson',
      initials: 'ET',
      status: 'Available - Seeking Projects',
      agent: {
        name: 'Paradigm',
        role: 'Primary Agent',
      },
      roleType: 'Lead Actress',
      projectType: 'Theater & Film',
      dayRate: 2200,
      lastBooked: 'Nov 20, 2025',
      lastBookedNote: '1 week ago',
      availability: 'Available',
      email: 'emily.thompson@talent.com',
      phone: '(555) 555-6666',
      location: 'Chicago, IL',
      headshot: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2NDcxMjI2N3ww&ixlib=rb-4.1.0&q=80&w=400',
      skills: 'Theater, Film, Classical Training',
      imdb: 'https://imdb.com/name/nm5678901',
      bio: 'Classically trained actress with extensive theater background.',
    },
    {
      id: 6,
      name: 'David Williams',
      initials: 'DW',
      status: 'Limited Availability',
      agent: {
        name: 'ICM Partners',
        role: 'Primary Agent',
      },
      roleType: 'Voice Actor',
      projectType: 'Animation & Games',
      dayRate: 1500,
      lastBooked: 'Nov 25, 2025',
      lastBookedNote: '4 days ago',
      availability: 'Limited',
      email: 'david.williams@talent.com',
      phone: '(555) 666-7777',
      location: 'Atlanta, GA',
      headshot: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFufGVufDF8fHx8MTc2NDc1NzI2NHww&ixlib=rb-4.1.0&q=80&w=400',
      skills: 'Voice Acting, Animation, Video Games',
      imdb: 'https://imdb.com/name/nm6789012',
      bio: 'Professional voice actor specializing in animation and gaming.',
    },
  ]);

  const tabs = [
    { id: 'database', label: 'Actor Database' },
    { id: 'calendar', label: 'Availability Calendar' },
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'available':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'booked':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'limited':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  // Initialize form state when opening edit modal
  const openEditModal = (actor: any) => {
    setSelectedActor(actor);
    setEditName(actor.name);
    setEditRoleType(actor.roleType);
    setEditAvailability(actor.availability);
    setEditDayRate(actor.dayRate);
    setEditProjectType(actor.projectType);
    setEditEmail(actor.email);
    setEditPhone(actor.phone);
    setEditLocation(actor.location);
    setEditAgentName(actor.agent.name);
    setEditAgentRole(actor.agent.role);
    setEditCurrentProject(actor.currentProject || '');
    setEditBookedUntil(actor.bookedUntil || '');
    setEditImdb(actor.imdb || '');
    setEditSkills(actor.skills || '');
    setEditBio(actor.bio || '');
    setEditHeadshotPreview(actor.headshot || null);
    setShowEditModal(true);
  };

  // Reset add form
  const resetAddForm = () => {
    setAddName('');
    setAddRoleType('Actor');
    setAddAvailability('Available');
    setAddDayRate(0);
    setAddProjectType('');
    setAddEmail('');
    setAddPhone('');
    setAddLocation('');
    setAddAgentName('');
    setAddAgentRole('');
    setAddCurrentProject('');
    setAddBookedUntil('');
    setAddImdb('');
    setAddSkills('');
    setAddBio('');
    setAddStatus('Available - Seeking Projects');
    setAddHeadshotPreview(null);
  };

  // Handle add new actor
  const handleAddNewActor = () => {
    // Validation
    if (!addName.trim()) {
      toast.error('Please enter actor name');
      return;
    }
    if (!addEmail.trim()) {
      toast.error('Please enter email address');
      return;
    }
    if (!addPhone.trim()) {
      toast.error('Please enter phone number');
      return;
    }

    // Generate new ID
    const newId = Math.max(...actors.map(a => a.id)) + 1;

    // Create new actor object
    const newActor = {
      id: newId,
      name: addName,
      initials: addName.split(' ').map(n => n[0]).join('').toUpperCase(),
      status: addStatus,
      agent: {
        name: addAgentName || 'N/A',
        role: addAgentRole || 'N/A',
      },
      roleType: addRoleType,
      projectType: addProjectType || 'Open to All',
      dayRate: addDayRate,
      lastBooked: 'Not Yet Booked',
      lastBookedNote: 'New Profile',
      availability: addAvailability,
      email: addEmail,
      phone: addPhone,
      location: addLocation || 'Not specified',
      headshot: addHeadshotPreview || undefined,
      currentProject: addCurrentProject || undefined,
      bookedUntil: addBookedUntil || undefined,
      imdb: addImdb,
      skills: addSkills,
      bio: addBio,
    };

    // Add to actors array
    setActors([newActor, ...actors]);

    // Show success notification
    toast.success('Actor added successfully', {
      description: `${addName} has been added to your database.`,
    });

    // Close modal and reset form
    setShowAddModal(false);
    resetAddForm();
  };

  // Save changes handler
  const handleSaveChanges = () => {
    if (!selectedActor) return;

    // Update the actor in the actors array
    const updatedActors = actors.map(actor => {
      if (actor.id === selectedActor.id) {
        return {
          ...actor,
          name: editName,
          roleType: editRoleType,
          availability: editAvailability,
          dayRate: editDayRate,
          projectType: editProjectType,
          email: editEmail,
          phone: editPhone,
          location: editLocation,
          agent: {
            name: editAgentName,
            role: editAgentRole,
          },
          currentProject: editCurrentProject || undefined,
          bookedUntil: editBookedUntil || undefined,
          imdb: editImdb,
          skills: editSkills,
          bio: editBio,
          headshot: editHeadshotPreview || actor.headshot,
          // Update initials if name changed
          initials: editName.split(' ').map(n => n[0]).join('').toUpperCase(),
          // Update status based on availability
          status: editAvailability === 'Booked' ? 'On Set - Currently Booked' : 
                  editAvailability === 'Limited' ? 'Limited Availability' : 
                  'Available - Seeking Projects',
        };
      }
      return actor;
    });

    setActors(updatedActors);
    
    // Show success notification
    toast.success('Actor profile updated successfully', {
      description: `${editName}'s profile has been saved.`,
    });

    // Close modal and reset
    setShowEditModal(false);
    setSelectedActor(null);
    setEditHeadshotPreview(null);
  };

  const clearFilters = () => {
    setActorStatusFilter('');
    setUnionStatusFilter('');
    setProjectTypeFilter('');
    setAgeRangeFilter('');
    setRoleTypeFilter('');
    setTextSearch('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-3xl mb-2">Actor & Talent Database</h1>
          <p className="text-gray-400">Complete database of all talent with integrated profiles, demo reels, and availability tracking</p>
        </div>

        {/* Search Bar and Actions */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search actors, projects, agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
            <Button variant="outline" className="border-white/10 text-gray-300 w-full lg:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Add New Actor</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full lg:w-auto">
              <Upload className="w-4 h-4 mr-2" />
              Import Profiles
            </Button>
            <Button variant="outline" className="border-white/10 text-gray-300 hidden lg:flex">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
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
          {/* Tabs */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1 inline-flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-md text-sm transition-colors ${
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

          {/* Actor Database Tab */}
          {activeTab === 'database' && (
            <>
              {/* Advanced Search & Filters */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white">Advanced Search & Filters</h3>
                  <Button
                    variant="outline"
                    className="border-white/10 text-gray-300"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>

                {/* Filter Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                  <select
                    value={actorStatusFilter}
                    onChange={(e) => setActorStatusFilter(e.target.value)}
                    className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="">Actor Status</option>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="limited">Limited Availability</option>
                  </select>

                  <select
                    value={unionStatusFilter}
                    onChange={(e) => setUnionStatusFilter(e.target.value)}
                    className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="">Union Status</option>
                    <option value="sag">SAG-AFTRA</option>
                    <option value="equity">Equity</option>
                    <option value="non-union">Non-Union</option>
                  </select>

                  <select
                    value={projectTypeFilter}
                    onChange={(e) => setProjectTypeFilter(e.target.value)}
                    className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="">Project Type</option>
                    <option value="film">Film</option>
                    <option value="tv">Television</option>
                    <option value="theater">Theater</option>
                    <option value="commercial">Commercial</option>
                    <option value="voiceover">Voice Over</option>
                  </select>

                  <select
                    value={ageRangeFilter}
                    onChange={(e) => setAgeRangeFilter(e.target.value)}
                    className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="">Age Range</option>
                    <option value="child">Child (0-17)</option>
                    <option value="young-adult">Young Adult (18-29)</option>
                    <option value="adult">Adult (30-49)</option>
                    <option value="mature">Mature (50+)</option>
                  </select>

                  <select
                    value={roleTypeFilter}
                    onChange={(e) => setRoleTypeFilter(e.target.value)}
                    className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="">Role Type</option>
                    <option value="lead">Lead</option>
                    <option value="supporting">Supporting</option>
                    <option value="character">Character</option>
                    <option value="extra">Extra/Background</option>
                  </select>
                </div>

                {/* Text Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Filter by text search (e.g., actor name, skills, project)"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              {/* Table Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                  <h3 className="text-white">Actor Database</h3>
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <Button variant="outline" className="border-white/10 text-gray-300 text-sm flex-1 lg:flex-none">
                      Show All Records
                    </Button>
                    <Button variant="outline" className="border-white/10 text-gray-300 text-sm flex-1 lg:flex-none">
                      Export
                    </Button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Comprehensive talent information with profiles, demo reels, and real-time availability
                </p>
              </div>

              {/* Table - Desktop */}
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Actor Name</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Agent/Manager</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Role/Project Type</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Day Rate</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Last Booked</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actors.map((actor) => (
                      <tr key={actor.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {actor.headshot ? (
                              <ImageWithFallback
                                src={actor.headshot}
                                alt={actor.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">{actor.initials}</span>
                              </div>
                            )}
                            <div>
                              <div className="text-white">{actor.name}</div>
                              <div className="text-gray-400 text-sm">{actor.status}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="text-white text-sm">{actor.agent.name}</div>
                            <div className="text-gray-400 text-sm">{actor.agent.role}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="text-white text-sm">{actor.roleType}</div>
                            <div className="text-gray-400 text-sm">{actor.projectType}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-white">{actor.dayRate}</span>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="text-white text-sm">{actor.lastBooked}</div>
                            <div className="text-gray-400 text-sm">{actor.lastBookedNote}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs border ${getAvailabilityColor(actor.availability)}`}>
                            {actor.availability}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button 
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                              onClick={() => {
                                setSelectedActor(actor);
                                setShowViewModal(true);
                              }}
                              title="View Actor Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              onClick={() => openEditModal(actor)}
                              title="Edit Actor Profile"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="block md:hidden p-4 space-y-4">
                {actors.map((actor) => (
                  <Card key={actor.id} className="bg-zinc-800 border-white/10 p-4">
                    <div className="flex items-start gap-3 mb-4">
                      {actor.headshot ? (
                        <ImageWithFallback
                          src={actor.headshot}
                          alt={actor.name}
                          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white">{actor.initials}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white mb-1">{actor.name}</h4>
                        <p className="text-gray-400 text-sm">{actor.status}</p>
                        <div className="mt-2">
                          <span className={`px-2 py-1 rounded text-xs border ${getAvailabilityColor(actor.availability)}`}>
                            {actor.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 border-t border-white/10 pt-4">
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Agent/Manager</div>
                        <div className="text-white text-sm">{actor.agent.name}</div>
                        <div className="text-gray-400 text-xs">{actor.agent.role}</div>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Role/Project Type</div>
                        <div className="text-white text-sm">{actor.roleType}</div>
                        <div className="text-gray-400 text-xs">{actor.projectType}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-gray-400 text-xs mb-1">Day Rate</div>
                          <div className="text-white text-sm">{actor.dayRate}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs mb-1">Last Booked</div>
                          <div className="text-white text-sm">{actor.lastBooked}</div>
                          <div className="text-gray-400 text-xs">{actor.lastBookedNote}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                      <Button
                        variant="outline"
                        className="border-white/10 text-purple-400 flex-1"
                        onClick={() => {
                          setSelectedActor(actor);
                          setShowViewModal(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/10 text-blue-400 flex-1"
                        onClick={() => openEditModal(actor)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-gray-400 text-sm">
                  Showing 1-6 of 1,247 actors
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
            </>
          )}

          {/* Availability Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white text-xl mb-2">Availability Calendar</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  View actor availability across all active projects with drag-and-drop scheduling and conflict detection.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                  <Card 
                    className={`p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                      actorStatusFilter === 'available' 
                        ? 'bg-green-500/20 border-green-500/50' 
                        : 'bg-zinc-800 border-white/10 hover:border-green-500/30'
                    }`}
                    onClick={() => {
                      setActorStatusFilter('available');
                      setActiveTab('database');
                    }}
                  >
                    <div className="text-green-400 text-2xl mb-1">892</div>
                    <div className="text-gray-400 text-sm">Available Today</div>
                  </Card>
                  <Card 
                    className={`p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                      actorStatusFilter === 'booked' 
                        ? 'bg-red-500/20 border-red-500/50' 
                        : 'bg-zinc-800 border-white/10 hover:border-red-500/30'
                    }`}
                    onClick={() => {
                      setActorStatusFilter('booked');
                      setActiveTab('database');
                    }}
                  >
                    <div className="text-red-400 text-2xl mb-1">234</div>
                    <div className="text-gray-400 text-sm">Currently Booked</div>
                  </Card>
                  <Card 
                    className={`p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                      actorStatusFilter === 'limited' 
                        ? 'bg-yellow-500/20 border-yellow-500/50' 
                        : 'bg-zinc-800 border-white/10 hover:border-yellow-500/30'
                    }`}
                    onClick={() => {
                      setActorStatusFilter('limited');
                      setActiveTab('database');
                    }}
                  >
                    <div className="text-yellow-400 text-2xl mb-1">121</div>
                    <div className="text-gray-400 text-sm">Limited Availability</div>
                  </Card>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setShowCalendarModal(true)}>
                  Open Calendar View
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-white text-2xl mb-1">Actor Availability Calendar</h2>
                  <p className="text-gray-400">December 2025</p>
                </div>
                <button
                  onClick={() => setShowCalendarModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Calendar Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <div className="text-gray-400 text-sm">Available</div>
                      <div className="text-white text-xl">892</div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div>
                      <div className="text-gray-400 text-sm">Booked</div>
                      <div className="text-white text-xl">234</div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div>
                      <div className="text-gray-400 text-sm">Limited</div>
                      <div className="text-white text-xl">121</div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <div>
                      <div className="text-gray-400 text-sm">Total</div>
                      <div className="text-white text-xl">1,247</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Filter Bar */}
              <div className="flex items-center gap-3 mb-6">
                <select className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50">
                  <option>All Actors</option>
                  <option>Lead Actors</option>
                  <option>Supporting</option>
                  <option>Character</option>
                </select>
                <select className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50">
                  <option>All Status</option>
                  <option>Available</option>
                  <option>Booked</option>
                  <option>Limited</option>
                </select>
                <div className="flex-1"></div>
                <Button variant="outline" className="border-white/10 text-gray-300 text-sm">
                  Today
                </Button>
                <Button variant="outline" className="border-white/10 text-gray-300 text-sm">
                  This Week
                </Button>
                <Button variant="outline" className="border-white/10 text-gray-300 text-sm">
                  This Month
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="bg-zinc-800 border border-white/10 rounded-lg overflow-hidden">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 border-b border-white/10">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-3 text-center text-gray-400 text-sm">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {/* Week 1 */}
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={`week1-${day}`} className="border-r border-b border-white/10 p-3 h-24 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="text-white text-sm mb-2">{day}</div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 800}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Week 2 */}
                  {[8, 9, 10, 11, 12, 13, 14].map((day) => (
                    <div key={`week2-${day}`} className="border-r border-b border-white/10 p-3 h-24 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="text-white text-sm mb-2">{day}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 800}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 200}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Week 3 */}
                  {[15, 16, 17, 18, 19, 20, 21].map((day) => (
                    <div key={`week3-${day}`} className="border-r border-b border-white/10 p-3 h-24 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="text-white text-sm mb-2">{day}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 800}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 100}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Week 4 */}
                  {[22, 23, 24, 25, 26, 27, 28].map((day) => (
                    <div key={`week4-${day}`} className="border-r border-b border-white/10 p-3 h-24 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="text-white text-sm mb-2">{day}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 800}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 200}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Week 5 */}
                  {[29, 30, 31].map((day) => (
                    <div key={`week5-${day}`} className="border-r border-b border-white/10 p-3 h-24 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="text-white text-sm mb-2">{day}</div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 800}</span>
                      </div>
                    </div>
                  ))}
                  {[1, 2, 3, 4].map((day) => (
                    <div key={`next-${day}`} className="border-r border-b border-white/10 p-3 h-24 bg-zinc-900/50 hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="text-gray-500 text-sm mb-2">{day}</div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-500 text-xs">{Math.floor(Math.random() * 50) + 800}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Actors This Week */}
              <div className="mt-6">
                <h3 className="text-white mb-4">Actors Available This Week</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {actors.filter(a => a.availability === 'Available').slice(0, 3).map((actor) => (
                    <Card key={actor.id} className="bg-zinc-800 border-white/10 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white">{actor.initials}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white">{actor.name}</div>
                          <div className="text-gray-400 text-sm">{actor.roleType}</div>
                        </div>
                        <span className="px-2 py-1 rounded text-xs bg-green-500/10 text-green-400 border border-green-500/30">
                          Available
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Day Rate:</span>
                        <span className="text-white">${actor.dayRate}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end mt-6">
                <Button variant="outline" className="border-white/10 text-gray-300" onClick={() => setShowCalendarModal(false)}>
                  Close
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export Calendar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* View Actor Modal */}
      {showViewModal && selectedActor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-zinc-900">
              <div className="flex items-center gap-4">
                {selectedActor.headshot ? (
                  <ImageWithFallback
                    src={selectedActor.headshot}
                    alt={selectedActor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">{selectedActor.initials}</span>
                  </div>
                )}
                <div>
                  <h2 className="text-white text-xl mb-1">{selectedActor.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedActor.roleType}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedActor(null);
                }}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded text-sm border ${getAvailabilityColor(selectedActor.availability)}`}>
                  {selectedActor.availability}
                </span>
                <span className="text-gray-400 text-sm">{selectedActor.status}</span>
              </div>

              {/* Contact Information */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Email</label>
                    <div className="text-white">{selectedActor.email}</div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Phone</label>
                    <div className="text-white">{selectedActor.phone}</div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Location</label>
                    <div className="text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {selectedActor.location}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Agent/Manager</label>
                    <div className="text-white">{selectedActor.agent.name}</div>
                    <div className="text-gray-400 text-sm">{selectedActor.agent.role}</div>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Role Type</label>
                    <div className="text-white">{selectedActor.roleType}</div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Project Type</label>
                    <div className="text-white">{selectedActor.projectType}</div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Day Rate</label>
                    <div className="text-white">${selectedActor.dayRate}</div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Last Booked</label>
                    <div className="text-white">{selectedActor.lastBooked}</div>
                    <div className="text-gray-400 text-sm">{selectedActor.lastBookedNote}</div>
                  </div>
                </div>
              </div>

              {/* Current Booking */}
              {selectedActor.currentProject && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-400" />
                    Current Booking
                  </h3>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Project</label>
                        <div className="text-white">{selectedActor.currentProject}</div>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Booked Until</label>
                        <div className="text-white">{selectedActor.bookedUntil}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {(selectedActor.skills || selectedActor.imdb || selectedActor.bio) && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    {selectedActor.skills && (
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Skills & Specialties</label>
                        <div className="text-white">{selectedActor.skills}</div>
                      </div>
                    )}
                    {selectedActor.imdb && (
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">IMDB Profile</label>
                        <a href={selectedActor.imdb} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          {selectedActor.imdb}
                        </a>
                      </div>
                    )}
                    {selectedActor.bio && (
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Bio</label>
                        <div className="text-white">{selectedActor.bio}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-zinc-900">
              <Button
                variant="outline"
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedActor(null);
                }}
                className="border-white/10 text-gray-300"
              >
                Close
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedActor);
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Actor Modal */}
      {showEditModal && selectedActor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-zinc-900">
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
                  <h2 className="text-white text-xl mb-1">Edit Actor Profile</h2>
                  <p className="text-gray-400 text-sm">{selectedActor.name}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedActor(null);
                  setEditHeadshotPreview(null);
                }}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <form className="p-6 space-y-6">
              {/* Headshot Upload */}
              <div>
                <label className="block text-white mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Profile Headshot
                </label>
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32 bg-zinc-800 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center overflow-hidden">
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
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                    />
                    <p className="text-gray-400 text-xs mt-2">Recommended: Square image, at least 400x400px. Max 5MB.</p>
                    {editHeadshotPreview && (
                      <button
                        type="button"
                        onClick={() => setEditHeadshotPreview(null)}
                        className="text-red-400 hover:text-red-300 text-sm mt-2"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Role Type *</label>
                    <select 
                      value={editRoleType}
                      onChange={(e) => setEditRoleType(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Lead Actor">Lead Actor</option>
                      <option value="Lead Actress">Lead Actress</option>
                      <option value="Supporting">Supporting Actor</option>
                      <option value="Character Actor">Character Actor</option>
                      <option value="Voice Actor">Voice Actor</option>
                      <option value="Stunt Performer">Stunt Performer</option>
                      <option value="Actor">Actor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Availability Status *</label>
                    <select 
                      value={editAvailability}
                      onChange={(e) => setEditAvailability(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Booked">Booked</option>
                      <option value="Limited">Limited Availability</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Day Rate ($) *</label>
                    <input
                      type="number"
                      value={editDayRate}
                      onChange={(e) => setEditDayRate(Number(e.target.value))}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Project Type</label>
                    <input
                      type="text"
                      value={editProjectType}
                      onChange={(e) => setEditProjectType(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Agent/Manager Name</label>
                    <input
                      type="text"
                      value={editAgentName}
                      onChange={(e) => setEditAgentName(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Agent Role</label>
                    <input
                      type="text"
                      value={editAgentRole}
                      onChange={(e) => setEditAgentRole(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Current Booking Information */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-400" />
                    Current Booking
                  </h3>
                  {editCurrentProject && (
                    <span className="text-xs text-orange-400 px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded">
                      Active Booking
                    </span>
                  )}
                </div>
                <div className={`${editCurrentProject ? 'bg-orange-500/10 border-orange-500/30' : 'bg-zinc-800/50 border-white/10'} border rounded-lg p-4`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Project Name</label>
                      <input
                        type="text"
                        value={editCurrentProject}
                        onChange={(e) => setEditCurrentProject(e.target.value)}
                        placeholder="No current booking"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Booked Until</label>
                      <input
                        type="text"
                        value={editBookedUntil}
                        onChange={(e) => setEditBookedUntil(e.target.value)}
                        placeholder="End date"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                  {editCurrentProject && (
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 mt-4"
                      onClick={() => {
                        setEditCurrentProject('');
                        setEditBookedUntil('');
                        toast.success('Booking cleared');
                      }}
                    >
                      Clear Current Booking
                    </Button>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">IMDB Profile URL</label>
                    <input
                      type="url"
                      value={editImdb}
                      onChange={(e) => setEditImdb(e.target.value)}
                      placeholder="https://imdb.com/name/..."
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Skills & Specialties</label>
                    <input
                      type="text"
                      value={editSkills}
                      onChange={(e) => setEditSkills(e.target.value)}
                      placeholder="e.g., Action, Drama, Comedy, Stunts, Accents"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                    <p className="text-gray-500 text-xs mt-1">Separate multiple skills with commas</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Notes/Bio</label>
                    <textarea
                      rows={4}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Additional notes, bio, awards, or special requirements..."
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between sticky bottom-0 bg-zinc-900">
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Actor
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedActor(null);
                    setEditHeadshotPreview(null);
                  }}
                  className="border-white/10 text-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={handleSaveChanges}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Actor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-white text-xl mb-1">Add New Actor</h2>
                  <p className="text-gray-400 text-sm">Create a new actor profile</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetAddForm();
                }}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <form className="p-6 space-y-6">
              {/* Headshot Upload */}
              <div>
                <label className="block text-white mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Profile Headshot
                </label>
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32 bg-zinc-800 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                    {addHeadshotPreview ? (
                      <img src={addHeadshotPreview} alt="Headshot preview" className="w-full h-full object-cover" />
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
                            setAddHeadshotPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                    />
                    <p className="text-gray-400 text-xs mt-2">Recommended: Square image, at least 400x400px. Max 5MB.</p>
                    {addHeadshotPreview && (
                      <button
                        type="button"
                        onClick={() => setAddHeadshotPreview(null)}
                        className="text-red-400 hover:text-red-300 text-sm mt-2"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      placeholder="Enter actor's full name"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Role Type *</label>
                    <select 
                      value={addRoleType}
                      onChange={(e) => setAddRoleType(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Lead Actor">Lead Actor</option>
                      <option value="Lead Actress">Lead Actress</option>
                      <option value="Supporting">Supporting Actor</option>
                      <option value="Character Actor">Character Actor</option>
                      <option value="Voice Actor">Voice Actor</option>
                      <option value="Stunt Performer">Stunt Performer</option>
                      <option value="Actor">Actor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Availability Status *</label>
                    <select 
                      value={addAvailability}
                      onChange={(e) => setAddAvailability(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Booked">Booked</option>
                      <option value="Limited">Limited Availability</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Day Rate ($) *</label>
                    <input
                      type="number"
                      value={addDayRate}
                      onChange={(e) => setAddDayRate(Number(e.target.value))}
                      placeholder="0"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Project Type</label>
                    <input
                      type="text"
                      value={addProjectType}
                      onChange={(e) => setAddProjectType(e.target.value)}
                      placeholder="e.g., Film, TV, Commercial"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={addEmail}
                      onChange={(e) => setAddEmail(e.target.value)}
                      placeholder="actor@email.com"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={addPhone}
                      onChange={(e) => setAddPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={addLocation}
                      onChange={(e) => setAddLocation(e.target.value)}
                      placeholder="City, State"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Agent/Manager Name</label>
                    <input
                      type="text"
                      value={addAgentName}
                      onChange={(e) => setAddAgentName(e.target.value)}
                      placeholder="Agent name"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Agent/Manager Role</label>
                    <input
                      type="text"
                      value={addAgentRole}
                      onChange={(e) => setAddAgentRole(e.target.value)}
                      placeholder="e.g., Primary Agent, Manager"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Current Booking (Optional) */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  Current Booking (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Project</label>
                    <input
                      type="text"
                      value={addCurrentProject}
                      onChange={(e) => setAddCurrentProject(e.target.value)}
                      placeholder="No current booking"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Booked Until</label>
                    <input
                      type="text"
                      value={addBookedUntil}
                      onChange={(e) => setAddBookedUntil(e.target.value)}
                      placeholder="End date"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-white mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">IMDB Profile URL</label>
                    <input
                      type="url"
                      value={addImdb}
                      onChange={(e) => setAddImdb(e.target.value)}
                      placeholder="https://imdb.com/name/..."
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Skills & Specialties</label>
                    <input
                      type="text"
                      value={addSkills}
                      onChange={(e) => setAddSkills(e.target.value)}
                      placeholder="e.g., Action, Drama, Comedy, Stunts, Accents"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                    <p className="text-gray-500 text-xs mt-1">Separate multiple skills with commas</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Notes/Bio</label>
                    <textarea
                      rows={4}
                      value={addBio}
                      onChange={(e) => setAddBio(e.target.value)}
                      placeholder="Additional notes, bio, awards, or special requirements..."
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-zinc-900">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  resetAddForm();
                }}
                className="border-white/10 text-gray-300"
              >
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={handleAddNewActor}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Add Actor
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}