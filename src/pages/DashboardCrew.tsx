import { DashboardLayout } from '../components/DashboardLayout';
import { Users, Plus, Search, Download, Mail, Phone, MapPin, Edit, Trash2, UserCheck, Briefcase, DollarSign, X, Upload, Camera, CheckCircle, User, Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function DashboardCrew() {
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [showSampleDataBanner, setShowSampleDataBanner] = useState(true);
  const [showAddCrewModal, setShowAddCrewModal] = useState(false);
  const [selectedCrewMember, setSelectedCrewMember] = useState<any>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [headshotPreview, setHeadshotPreview] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editHeadshotPreview, setEditHeadshotPreview] = useState<string | null>(null);

  // Form state for editing
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editAvailability, setEditAvailability] = useState('');
  const [editDayRate, setEditDayRate] = useState(0);
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editExperience, setEditExperience] = useState('');
  const [editCurrentProject, setEditCurrentProject] = useState('');
  const [editSkills, setEditSkills] = useState('');
  const [editCertifications, setEditCertifications] = useState('');
  const [editBio, setEditBio] = useState('');

  const stats = [
    {
      label: 'Total Crew',
      value: '156',
      icon: Users,
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Available',
      value: '89',
      icon: UserCheck,
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'On Projects',
      value: '67',
      icon: Briefcase,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
    },
    {
      label: 'Avg Day Rate',
      value: '$2,500',
      icon: DollarSign,
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-500/20',
    },
  ];

  const [crew, setCrew] = useState([
    {
      id: 1,
      name: 'Marcus Chen',
      role: 'Director of Photography',
      initials: 'MC',
      headshot: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NjQ3MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=400',
      contact: {
        email: 'marcus.chen@crew.com',
        phone: '(555) 234-5678',
      },
      location: 'Los Angeles, CA',
      dayRate: 2500,
      equipment: 'RED Camera Package',
      availability: 'Available',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Production Designer',
      initials: 'SW',
      headshot: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc2NDcxMjI2N3ww&ixlib=rb-4.1.0&q=80&w=400',
      contact: {
        email: 'sarah.williams@crew.com',
        phone: '(555) 345-6789',
      },
      location: 'New York, NY',
      dayRate: 1800,
      equipment: 'Design Tools & Software',
      availability: 'On Project',
    },
    {
      id: 3,
      name: 'James Rodriguez',
      role: 'Gaffer',
      initials: 'JR',
      headshot: 'https://images.unsplash.com/photo-1622626426572-c268eb006092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFufGVufDF8fHx8MTc2NDc1NzI2NHww&ixlib=rb-4.1.0&q=80&w=400',
      contact: {
        email: 'james.rodriguez@crew.com',
        phone: '(555) 456-7890',
      },
      location: 'Austin, TX',
      dayRate: 1200,
      equipment: 'Lighting Package',
      availability: 'Available',
    },
    {
      id: 4,
      name: 'Emily Thompson',
      role: 'Sound Mixer',
      initials: 'ET',
      headshot: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDcwODA5OXww&ixlib=rb-4.1.0&q=80&w=400',
      contact: {
        email: 'emily.thompson@crew.com',
        phone: '(555) 567-8901',
      },
      location: 'Nashville, TN',
      dayRate: 1500,
      equipment: 'Sound Devices 888',
      availability: 'Available',
    },
    {
      id: 5,
      name: 'David Park',
      role: '1st Assistant Director',
      initials: 'DP',
      contact: {
        email: 'david.park@crew.com',
        phone: '(555) 678-9012',
      },
      location: 'Atlanta, GA',
      dayRate: 2200,
      equipment: 'N/A',
      availability: 'On Project',
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      role: 'Costume Designer',
      initials: 'LA',
      contact: {
        email: 'lisa.anderson@crew.com',
        phone: '(555) 789-0123',
      },
      location: 'Vancouver, BC',
      dayRate: 1600,
      equipment: 'Sewing Equipment',
      availability: 'Available',
    },
    {
      id: 7,
      name: 'Michael Chang',
      role: 'Key Grip',
      initials: 'MC',
      contact: {
        email: 'michael.chang@crew.com',
        phone: '(555) 890-1234',
      },
      location: 'Chicago, IL',
      dayRate: 1300,
      equipment: 'Grip Truck',
      availability: 'Limited',
    },
    {
      id: 8,
      name: 'Jennifer Lee',
      role: 'Script Supervisor',
      initials: 'JL',
      contact: {
        email: 'jennifer.lee@crew.com',
        phone: '(555) 901-2345',
      },
      location: 'Toronto, ON',
      dayRate: 1100,
      equipment: 'N/A',
      availability: 'Available',
    },
  ]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'available':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'on project':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'limited':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'unavailable':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  // Initialize form state when opening edit modal
  const openEditModal = (member: any) => {
    setSelectedCrewMember(member);
    setEditName(member.name);
    setEditRole(member.role);
    setEditDepartment(member.department || '');
    setEditAvailability(member.availability);
    setEditDayRate(member.dayRate);
    setEditEmail(member.contact.email);
    setEditPhone(member.contact.phone);
    setEditLocation(member.location);
    setEditExperience(member.experience || '');
    setEditCurrentProject(member.currentProject || '');
    setEditSkills(member.skills || member.equipment || '');
    setEditCertifications(member.certifications || '');
    setEditBio(member.bio || '');
    setEditHeadshotPreview(member.headshot || null);
    setShowEditModal(true);
  };

  // Save changes handler
  const handleSaveChanges = () => {
    if (!selectedCrewMember) return;

    // Update the crew member in the crew array
    const updatedCrew = crew.map(member => {
      if (member.id === selectedCrewMember.id) {
        return {
          ...member,
          name: editName,
          role: editRole,
          department: editDepartment,
          availability: editAvailability,
          dayRate: editDayRate,
          contact: {
            email: editEmail,
            phone: editPhone,
          },
          location: editLocation,
          experience: editExperience,
          currentProject: editCurrentProject || undefined,
          skills: editSkills,
          equipment: editSkills,
          certifications: editCertifications,
          bio: editBio,
          headshot: editHeadshotPreview || member.headshot,
          // Update initials if name changed
          initials: editName.split(' ').map(n => n[0]).join('').toUpperCase(),
        };
      }
      return member;
    });

    setCrew(updatedCrew);
    
    // Show success notification
    toast.success('Crew member updated successfully', {
      description: `${editName}'s profile has been saved.`,
    });

    // Close modal and reset
    setShowEditModal(false);
    setSelectedCrewMember(null);
    setEditHeadshotPreview(null);
  };

  const filteredCrew = crew.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAvailability =
      availabilityFilter === 'all' ||
      member.availability.toLowerCase() === availabilityFilter.toLowerCase();

    return matchesSearch && matchesAvailability;
  });

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-white text-3xl mb-2">Crew Management</h1>
            <p className="text-gray-400">Manage crew members, track availability, and coordinate production teams</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-blue-600 px-3 py-2 rounded-lg">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">CM</span>
              </div>
              <div>
                <div className="text-white text-sm">Crew Manager</div>
                <div className="text-blue-200 text-xs">Administrator</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar and Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search crew members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1 lg:flex-none" onClick={() => setShowAddCrewModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Crew
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 lg:flex-none">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Sample Data Banner */}
        {showSampleDataBanner && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-purple-400 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
              <div>
                <span className="text-white">
                  <strong>Sample data loaded:</strong> You're viewing example data to help you get started. Feel free to edit, delete, or add your own content.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-purple-400 hover:text-purple-300 text-sm">
                Clear Sample Data
              </button>
              <button
                onClick={() => setShowSampleDataBanner(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-zinc-900 border ${stat.borderColor} p-6`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
              <div className="text-white text-3xl">{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Main Content Card */}
        <Card className="bg-zinc-900 border-white/10">
          {/* Filter Bar */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Filter by Availability:</span>
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="on project">On Project</option>
                  <option value="limited">Limited</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
              <div className="text-gray-400 text-sm">
                Showing {filteredCrew.length} of {crew.length} crew members
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="p-6 border-b border-white/10">
            <h3 className="text-white">Crew Directory</h3>
          </div>

          {/* Table - Desktop */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Name & Role</th>
                  <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Contact</th>
                  <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Location</th>
                  <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Day Rate</th>
                  <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Equipment</th>
                  <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Availability</th>
                  <th className="text-left p-4 text-gray-400 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrew.map((member) => (
                  <tr 
                    key={member.id} 
                    className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedCrewMember(member)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {member.headshot ? (
                          <ImageWithFallback
                            src={member.headshot}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">{member.initials}</span>
                          </div>
                        )}
                        <div>
                          <div className="text-white">{member.name}</div>
                          <div className="text-gray-400 text-sm">{member.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{member.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{member.contact.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-300 text-sm">{member.location}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-white">${member.dayRate.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-300 text-sm">{member.equipment}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs border ${getAvailabilityColor(member.availability)}`}>
                        {member.availability}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button 
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          onClick={() => openEditModal(member)}
                          title="Edit Crew Member"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors" title="Delete Crew Member">
                          <Trash2 className="w-4 h-4" />
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
            {filteredCrew.map((member) => (
              <Card key={member.id} className="bg-zinc-800 border-white/10 p-4">
                <div className="flex items-start gap-3 mb-4">
                  {member.headshot ? (
                    <ImageWithFallback
                      src={member.headshot}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white">{member.initials}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white mb-1">{member.name}</h4>
                    <p className="text-gray-400 text-sm">{member.role}</p>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded text-xs border ${getAvailabilityColor(member.availability)}`}>
                        {member.availability}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Contact</div>
                    <div className="flex items-center gap-2 text-white text-sm mb-1">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{member.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{member.contact.phone}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Location</div>
                    <div className="flex items-center gap-2 text-white text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{member.location}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Day Rate</div>
                      <div className="text-white text-sm">${member.dayRate.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Equipment</div>
                      <div className="text-white text-sm">{member.equipment}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <Button
                    variant="outline"
                    className="border-white/10 text-purple-400 flex-1"
                    onClick={() => setSelectedCrewMember(member)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10 text-blue-400 flex-1"
                    onClick={() => openEditModal(member)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredCrew.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-white text-xl mb-2">No crew members found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filters to find crew members.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredCrew.length > 0 && (
            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                Showing 1-{Math.min(8, filteredCrew.length)} of {crew.length} crew members
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
          )}
        </Card>
      </div>

      {/* Add Crew Modal */}
      {showAddCrewModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-white text-2xl mb-1">Add New Crew Member</h2>
                  <p className="text-gray-400">Enter complete crew member information and contact details</p>
                </div>
                <button
                  onClick={() => setShowAddCrewModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    Personal Information
                  </h3>
                  
                  {/* Headshot Upload */}
                  <div className="mb-6">
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Profile Headshot
                    </label>
                    <div className="flex items-start gap-4">
                      <div className="w-32 h-32 bg-zinc-800 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                        {headshotPreview ? (
                          <img src={headshotPreview} alt="Headshot preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                            <span className="text-gray-500 text-xs">Upload Photo</span>
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
                                setHeadshotPreview(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                        />
                        <p className="text-gray-500 text-xs mt-2">Recommended: Square image, at least 400x400px. Max 5MB.</p>
                        {headshotPreview && (
                          <button
                            type="button"
                            onClick={() => setHeadshotPreview(null)}
                            className="text-red-400 hover:text-red-300 text-sm mt-2"
                          >
                            Remove Photo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g., Marcus Chen"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Role/Position *</label>
                      <input
                        type="text"
                        placeholder="e.g., Director of Photography"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Department *</label>
                      <select className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50">
                        <option value="">Select Department</option>
                        <option value="camera">Camera</option>
                        <option value="lighting">Lighting</option>
                        <option value="sound">Sound</option>
                        <option value="art">Art Department</option>
                        <option value="costume">Costume</option>
                        <option value="makeup">Makeup & Hair</option>
                        <option value="production">Production</option>
                        <option value="post">Post-Production</option>
                        <option value="vfx">VFX</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Experience Level</label>
                      <select className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50">
                        <option value="">Select Level</option>
                        <option value="junior">Junior (0-2 years)</option>
                        <option value="intermediate">Intermediate (3-5 years)</option>
                        <option value="senior">Senior (6-10 years)</option>
                        <option value="expert">Expert (10+ years)</option>
                      </select>
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
                      <label className="text-gray-400 text-sm mb-2 block">Email Address *</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Alternative Phone</label>
                      <input
                        type="tel"
                        placeholder="(555) 987-6543"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Emergency Contact</label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location/Address *
                      </label>
                      <input
                        type="text"
                        placeholder="City, State/Province, Country"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-400" />
                    Professional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Union Status</label>
                      <select className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50">
                        <option value="">Select Union Status</option>
                        <option value="iatse">IATSE</option>
                        <option value="dga">DGA (Directors Guild)</option>
                        <option value="sag">SAG-AFTRA</option>
                        <option value="wga">WGA (Writers Guild)</option>
                        <option value="non-union">Non-Union</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Day Rate (USD) *
                      </label>
                      <input
                        type="number"
                        placeholder="2500"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Equipment Owned</label>
                      <input
                        type="text"
                        placeholder="e.g., RED Camera Package, Lighting Kit"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Certifications/Licenses</label>
                      <input
                        type="text"
                        placeholder="e.g., Drone Pilot License, Steadicam"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Availability & Skills */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-orange-400" />
                    Availability & Skills
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Availability Status *</label>
                      <select className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50">
                        <option value="available">Available</option>
                        <option value="on-project">On Project</option>
                        <option value="limited">Limited Availability</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Available Start Date</label>
                      <input
                        type="date"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-400 text-sm mb-2 block">Skills & Specialties</label>
                      <input
                        type="text"
                        placeholder="e.g., Cinematography, Color Grading, Aerial Filming"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                      <p className="text-gray-500 text-xs mt-1">Separate multiple skills with commas</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Website/Portfolio URL</label>
                      <input
                        type="url"
                        placeholder="https://portfolio.com"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">IMDB Profile</label>
                      <input
                        type="url"
                        placeholder="https://imdb.com/name/..."
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Notes/Bio</label>
                      <textarea
                        placeholder="Additional notes, bio, or special requirements..."
                        rows={4}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                  <p className="text-gray-400 text-sm">* Required fields</p>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10 text-gray-300"
                      onClick={() => setShowAddCrewModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Crew Member
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Crew Member Detail Modal */}
      {selectedCrewMember && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {selectedCrewMember.headshot ? (
                    <ImageWithFallback
                      src={selectedCrewMember.headshot}
                      alt={selectedCrewMember.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">{selectedCrewMember.initials}</span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-white text-2xl mb-1">{selectedCrewMember.name}</h2>
                    <p className="text-gray-400">{selectedCrewMember.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCrewMember(null)}
                  className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Availability Badge */}
              <div className="mb-6">
                <span className={`px-3 py-1.5 rounded-lg text-sm border ${getAvailabilityColor(selectedCrewMember.availability)}`}>
                  {selectedCrewMember.availability}
                </span>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Contact Information
                </h3>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Email</div>
                      <a href={`mailto:${selectedCrewMember.contact.email}`} className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedCrewMember.contact.email}
                      </a>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Phone</div>
                      <a href={`tel:${selectedCrewMember.contact.phone}`} className="text-white hover:text-purple-400 transition-colors flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedCrewMember.contact.phone}
                      </a>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-gray-400 text-sm mb-1">Location</div>
                      <div className="text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedCrewMember.location}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Professional Details */}
              <div className="mb-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-400" />
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-zinc-800 border-white/10 p-4">
                    <div className="text-gray-400 text-sm mb-1">Day Rate</div>
                    <div className="text-white text-2xl flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      {selectedCrewMember.dayRate.toLocaleString()}
                    </div>
                  </Card>
                  <Card className="bg-zinc-800 border-white/10 p-4">
                    <div className="text-gray-400 text-sm mb-1">Equipment</div>
                    <div className="text-white">{selectedCrewMember.equipment}</div>
                  </Card>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="mb-6">
                <h3 className="text-white mb-4">Recent Projects</h3>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <div className="text-white">The Last Sunset</div>
                        <div className="text-gray-400 text-sm">Feature Film • 2024</div>
                      </div>
                      <span className="text-green-400 text-sm">Completed</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <div className="text-white">Urban Dreams</div>
                        <div className="text-gray-400 text-sm">TV Series • 2023</div>
                      </div>
                      <span className="text-green-400 text-sm">Completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white">Desert Storm</div>
                        <div className="text-gray-400 text-sm">Documentary • 2023</div>
                      </div>
                      <span className="text-green-400 text-sm">Completed</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Notes Section */}
              <div className="mb-6">
                <h3 className="text-white mb-4">Notes</h3>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <p className="text-gray-300 text-sm">
                    Experienced crew member with excellent track record. Highly recommended for {selectedCrewMember.role.toLowerCase()} positions. 
                    Professional, reliable, and brings top-tier equipment to every project.
                  </p>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" onClick={() => setShowEmailModal(true)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/10 text-gray-300 hover:bg-white/5"
                  onClick={() => openEditModal(selectedCrewMember)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-white text-2xl mb-1">Send Email to {selectedCrewMember?.name}</h2>
                  <p className="text-gray-400">Compose and send an email to the crew member</p>
                </div>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-6">
                {/* Email Subject */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g., Job Opportunity"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
                    required
                  />
                </div>

                {/* Email Message */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Message *</label>
                  <textarea
                    placeholder="Enter your message here..."
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    rows={6}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                  <p className="text-gray-400 text-sm">* Required fields</p>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10 text-gray-300"
                      onClick={() => setShowEmailModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Crew Member Modal */}
      {showEditModal && selectedCrewMember && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="bg-zinc-900 border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h2 className="text-white text-2xl">Edit Crew Member</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCrewMember(null);
                    setEditHeadshotPreview(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Profile Photo Section */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-400" />
                  Profile Photo
                </h3>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {editHeadshotPreview ? (
                      <ImageWithFallback
                        src={editHeadshotPreview}
                        alt="Profile"
                        className="w-32 h-32 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <span className="text-white text-4xl">
                          {editName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                    {editHeadshotPreview && (
                      <button
                        onClick={() => {
                          setEditHeadshotPreview(null);
                          toast.success('Photo removed');
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditHeadshotPreview(reader.result as string);
                              toast.success('Photo uploaded');
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/10 text-gray-300 hover:bg-white/5"
                        onClick={(e) => {
                          e.preventDefault();
                          (e.currentTarget.previousElementSibling as HTMLInputElement)?.click();
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Photo
                      </Button>
                    </label>
                    <p className="text-gray-500 text-sm mt-2">
                      JPG, PNG or GIF. Max size 5MB. Recommended 400x400px.
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-6 pb-6 border-b border-white/10">
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
                    <label className="block text-gray-400 text-sm mb-2">Role/Position *</label>
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      placeholder="e.g., Director of Photography"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Department</label>
                    <input
                      type="text"
                      value={editDepartment}
                      onChange={(e) => setEditDepartment(e.target.value)}
                      placeholder="e.g., Camera, Production, Art"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Availability Status *</label>
                    <select 
                      value={editAvailability}
                      onChange={(e) => setEditAvailability(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Available">Available</option>
                      <option value="On Project">On Project</option>
                      <option value="Limited">Limited Availability</option>
                      <option value="Unavailable">Unavailable</option>
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
                    <label className="block text-gray-400 text-sm mb-2">Years of Experience</label>
                    <input
                      type="text"
                      value={editExperience}
                      onChange={(e) => setEditExperience(e.target.value)}
                      placeholder="e.g., 10+ years"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6 pb-6 border-b border-white/10">
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
                  <div className="md:col-span-2">
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
                </div>
              </div>

              {/* Current Project */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-400" />
                    Current Project
                  </h3>
                  {editCurrentProject && (
                    <span className="text-xs text-orange-400 px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded">
                      Active Project
                    </span>
                  )}
                </div>
                <div className={`${editCurrentProject ? 'bg-orange-500/10 border-orange-500/30' : 'bg-zinc-800/50 border-white/10'} border rounded-lg p-4`}>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Project Name</label>
                    <input
                      type="text"
                      value={editCurrentProject}
                      onChange={(e) => setEditCurrentProject(e.target.value)}
                      placeholder="No current project"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  {editCurrentProject && (
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 mt-4"
                      onClick={() => {
                        setEditCurrentProject('');
                        toast.success('Project cleared');
                      }}
                    >
                      Clear Current Project
                    </Button>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-6">
                <h3 className="text-white mb-4">Professional Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Skills & Equipment</label>
                    <input
                      type="text"
                      value={editSkills}
                      onChange={(e) => setEditSkills(e.target.value)}
                      placeholder="e.g., RED Camera Package, Lighting, Grip Equipment"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                    <p className="text-gray-500 text-xs mt-1">Separate multiple items with commas</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Certifications & Licenses</label>
                    <input
                      type="text"
                      value={editCertifications}
                      onChange={(e) => setEditCertifications(e.target.value)}
                      placeholder="e.g., Drone License, Safety Training, Union Membership"
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Notes/Bio</label>
                    <textarea
                      rows={4}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Additional notes, experience highlights, awards, or special requirements..."
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/10 text-gray-300"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCrewMember(null);
                    setEditHeadshotPreview(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={handleSaveChanges}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}