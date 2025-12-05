import { DashboardLayout } from '../components/DashboardLayout';
import { FolderKanban, Plus, Search, Download, Bell, Info, X, Users, UserCircle, MapPin, DollarSign, Edit2, Trash2, Check, Building2, Camera, Upload, User, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ProductionPipelineModal } from '../components/ProductionPipelineModal';
import { useState, useEffect } from 'react';
import { projectsAPI, actorsAPI, crewAPI, companiesAPI } from '../utils/filmlot-api';
import { toast } from 'sonner';

export function DashboardProjects() {
  const [showSampleBanner, setShowSampleBanner] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    productionCompany: '',
    status: 'Pre-Production',
    director: '',
    budget: '',
    startDate: '',
    genre: '',
  });
  
  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    title: '',
    productionCompany: '',
    status: 'Pre-Production',
    director: '',
    budget: '',
    startDate: '',
    genre: '',
  });
  
  // Actors, Crew, Companies state
  const [actors, setActors] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  
  // Selected actors, crew, and company for new project
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [selectedCrew, setSelectedCrew] = useState<string[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  
  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);

  // Inline Add Actor Modal state
  const [showInlineAddActor, setShowInlineAddActor] = useState(false);
  const [addActorName, setAddActorName] = useState('');
  const [addActorRoleType, setAddActorRoleType] = useState('Lead Actor');
  const [addActorEmail, setAddActorEmail] = useState('');
  const [addActorPhone, setAddActorPhone] = useState('');
  const [addActorLocation, setAddActorLocation] = useState('');
  const [addActorAgency, setAddActorAgency] = useState('');
  const [addActorHeadshotPreview, setAddActorHeadshotPreview] = useState<string | null>(null);

  // Inline Add Crew Modal state
  const [showInlineAddCrew, setShowInlineAddCrew] = useState(false);
  const [addCrewName, setAddCrewName] = useState('');
  const [addCrewRole, setAddCrewRole] = useState('Director');
  const [addCrewEmail, setAddCrewEmail] = useState('');
  const [addCrewPhone, setAddCrewPhone] = useState('');
  const [addCrewLocation, setAddCrewLocation] = useState('');
  const [addCrewDepartment, setAddCrewDepartment] = useState('');
  const [addCrewHeadshotPreview, setAddCrewHeadshotPreview] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
    loadContacts();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const response = await projectsAPI.getAll();
      console.log('Projects API Response:', response);
      setProjects(response.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const actorsResponse = await actorsAPI.getAll();
      const crewResponse = await crewAPI.getAll();
      const companiesResponse = await companiesAPI.getAll();
      setActors(actorsResponse.actors || []);
      setCrew(crewResponse.crew || []);
      setCompanies(companiesResponse.companies || []);
    } catch (error) {
      console.error('Error loading contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleEditProject = (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    setEditingProject(project);
    setEditFormData({
      title: project.title || project.name || '',
      productionCompany: project.productionCompany || '',
      status: project.status || 'Pre-Production',
      director: project.director || '',
      budget: project.budget || '',
      startDate: project.startDate || '',
      genre: project.genre || '',
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingProject) return;
    
    setIsLoading(true);
    try {
      await projectsAPI.update(editingProject.id, editFormData);
      toast.success('Project updated successfully!');
      setShowEditModal(false);
      setEditingProject(null);
      await loadProjects();
    } catch (error: any) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    setIsLoading(true);
    try {
      await projectsAPI.create(createFormData);
      toast.success('Project created successfully!');
      setShowCreateModal(false);
      setCreateFormData({
        title: '',
        productionCompany: '',
        status: 'Pre-Production',
        director: '',
        budget: '',
        startDate: '',
        genre: '',
      });
      await loadProjects();
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = (e: React.MouseEvent, project: any) => {
    e.stopPropagation();
    setProjectToDelete(project);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    
    setIsLoading(true);
    try {
      await projectsAPI.delete(projectToDelete.id);
      toast.success('Project deleted successfully!');
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
      await loadProjects();
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActor = (actorId: string) => {
    setSelectedActors(prev =>
      prev.includes(actorId)
        ? prev.filter(id => id !== actorId)
        : [...prev, actorId]
    );
  };

  const toggleCrew = (crewId: string) => {
    setSelectedCrew(prev =>
      prev.includes(crewId)
        ? prev.filter(id => id !== crewId)
        : [...prev, crewId]
    );
  };

  const resetAddActorForm = () => {
    setAddActorName('');
    setAddActorRoleType('Lead Actor');
    setAddActorEmail('');
    setAddActorPhone('');
    setAddActorLocation('');
    setAddActorAgency('');
    setAddActorHeadshotPreview(null);
  };

  const handleAddNewActorInline = async () => {
    if (!addActorName.trim()) {
      toast.error('Please enter actor name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await actorsAPI.create({
        name: addActorName,
        roleType: addActorRoleType,
        email: addActorEmail,
        phone: addActorPhone,
        location: addActorLocation,
        agency: addActorAgency,
        // Note: headshot would need to be uploaded separately in a real implementation
      });
      
      toast.success('Actor added successfully!');
      
      // Refresh actors list
      await loadContacts();
      
      // Auto-select the newly created actor
      if (response.actor?.id) {
        setSelectedActors(prev => [...prev, response.actor.id]);
      }
      
      // Close modal and reset form
      setShowInlineAddActor(false);
      resetAddActorForm();
    } catch (error: any) {
      console.error('Error adding actor:', error);
      toast.error('Failed to add actor: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const resetAddCrewForm = () => {
    setAddCrewName('');
    setAddCrewRole('Director');
    setAddCrewEmail('');
    setAddCrewPhone('');
    setAddCrewLocation('');
    setAddCrewDepartment('');
    setAddCrewHeadshotPreview(null);
  };

  const handleAddNewCrewInline = async () => {
    if (!addCrewName.trim()) {
      toast.error('Please enter crew member name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await crewAPI.create({
        name: addCrewName,
        role: addCrewRole,
        email: addCrewEmail,
        phone: addCrewPhone,
        location: addCrewLocation,
        department: addCrewDepartment,
        // Note: headshot would need to be uploaded separately in a real implementation
      });
      
      toast.success('Crew member added successfully!');
      
      // Refresh crew list
      await loadContacts();
      
      // Auto-select the newly created crew member
      if (response.crew?.id) {
        setSelectedCrew(prev => [...prev, response.crew.id]);
      }
      
      // Close modal and reset form
      setShowInlineAddCrew(false);
      resetAddCrewForm();
    } catch (error: any) {
      console.error('Error adding crew member:', error);
      toast.error('Failed to add crew member: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      label: 'Active Projects',
      value: '2',
      icon: FolderKanban,
      color: 'purple',
    },
    {
      label: 'Total Cast',
      value: '4',
      icon: UserCircle,
      color: 'blue',
    },
    {
      label: 'Crew Members',
      value: '2',
      icon: Users,
      color: 'green',
    },
    {
      label: 'Total Budget',
      value: '$73M',
      icon: DollarSign,
      color: 'orange',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pre-Production':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'In Production':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'Post-Production':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'Completed':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-3xl mb-2">Project Management</h1>
            <p className="text-gray-400">Manage all production projects, cast, crew, locations, and budgets</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Export Button */}
          <Button variant="outline" className="border-white/10 text-gray-300 hidden md:flex">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          {/* Notification Bell */}
          <button className="p-2.5 bg-zinc-900 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors hidden md:block">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>

          {/* Production Manager Badge */}
          <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 hidden md:flex">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">PM</span>
            </div>
            <div>
              <div className="text-white text-sm">Production Manager</div>
              <div className="text-gray-500 text-xs">Administrator</div>
            </div>
          </div>
        </div>

        {/* Sample Data Banner */}
        {showSampleBanner && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-blue-300">
                <span className="font-semibold">Sample data loaded:</span> You're viewing example data to help you get started. Feel free to edit, delete, or add your own content.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 hidden md:flex"
                onClick={() => setShowSampleBanner(false)}
              >
                <span className="mr-2">Clear Sample Data</span>
              </Button>
              <button
                onClick={() => setShowSampleBanner(false)}
                className="text-blue-400 hover:text-blue-300 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-zinc-900 border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-gray-400 text-sm">{stat.label}</div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  stat.color === 'purple' ? 'bg-purple-500/10' :
                  stat.color === 'blue' ? 'bg-blue-500/10' :
                  stat.color === 'green' ? 'bg-green-500/10' :
                  'bg-orange-500/10'
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.color === 'purple' ? 'text-purple-400' :
                    stat.color === 'blue' ? 'text-blue-400' :
                    stat.color === 'green' ? 'text-green-400' :
                    'text-orange-400'
                  }`} />
                </div>
              </div>
              <div className="text-white text-3xl">{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="bg-zinc-900 border-white/10 p-6 hover:border-purple-500/30 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedProject(project);
                setIsPipelineModalOpen(true);
              }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FolderKanban className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.productionCompany}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <button
                    onClick={(e) => handleEditProject(e, project)}
                    className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors group"
                    title="Edit project"
                  >
                    <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteProject(e, project)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-gray-500 text-xs mb-1">Director</div>
                  <div className="text-white text-sm">{project.director}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Budget</div>
                  <div className="text-white text-sm">{project.budget}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Start Date</div>
                  <div className="text-white text-sm">{project.startDate}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Genre</div>
                  <div className="text-white text-sm">{project.genre}</div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <UserCircle className="w-4 h-4" />
                  <span>{project.castCount} Cast</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{project.crewCount} Crew</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{project.locationCount} Locations</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Production Pipeline Modal */}
        <ProductionPipelineModal
          isOpen={isPipelineModalOpen}
          onClose={() => setIsPipelineModalOpen(false)}
          project={selectedProject}
        />

        {/* Edit Project Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-zinc-900 border-white/10 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Edit2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-white text-xl">Edit Project</h3>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Project Title *</label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    placeholder="Enter project title..."
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                  />
                </div>

                {/* Production Company */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Production Company</label>
                  <input
                    type="text"
                    value={editFormData.productionCompany}
                    onChange={(e) => setEditFormData({ ...editFormData, productionCompany: e.target.value })}
                    placeholder="Enter production company..."
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                  />
                </div>

                {/* Status and Genre */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Status</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                      className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                    >
                      <option value="Pre-Production">Pre-Production</option>
                      <option value="In Production">In Production</option>
                      <option value="Post-Production">Post-Production</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Genre</label>
                    <input
                      type="text"
                      value={editFormData.genre}
                      onChange={(e) => setEditFormData({ ...editFormData, genre: e.target.value })}
                      placeholder="e.g., Drama, Action..."
                      className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                    />
                  </div>
                </div>

                {/* Director and Budget */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Director</label>
                    <input
                      type="text"
                      value={editFormData.director}
                      onChange={(e) => setEditFormData({ ...editFormData, director: e.target.value })}
                      placeholder="Enter director name..."
                      className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Budget</label>
                    <input
                      type="text"
                      value={editFormData.budget}
                      onChange={(e) => setEditFormData({ ...editFormData, budget: e.target.value })}
                      placeholder="e.g., $25M..."
                      className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Start Date</label>
                  <input
                    type="date"
                    value={editFormData.startDate}
                    onChange={(e) => setEditFormData({ ...editFormData, startDate: e.target.value })}
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-zinc-800">
                <Button
                  variant="outline"
                  className="flex-1 border-zinc-700 text-gray-400 hover:bg-zinc-800"
                  onClick={() => setShowEditModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                  onClick={handleSaveEdit}
                  disabled={isLoading || !editFormData.title}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && projectToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-zinc-900 border-white/10 p-6 w-full max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-white text-xl">Delete Project</h3>
              </div>

              <p className="text-gray-400 mb-6">
                Are you sure you want to delete <span className="text-white font-semibold">"{projectToDelete.title}"</span>? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-zinc-700 text-gray-400 hover:bg-zinc-800"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setProjectToDelete(null);
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0"
                  onClick={confirmDelete}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Project
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Create Project Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-zinc-900 border-white/10 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-white text-xl">Create New Project</h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Project Title *</label>
                  <input
                    type="text"
                    value={createFormData.title}
                    onChange={(e) => setCreateFormData({ ...createFormData, title: e.target.value })}
                    placeholder="Enter project title..."
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                  />
                </div>

                {/* Production Company */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Production Company</label>
                  <input
                    type="text"
                    value={createFormData.productionCompany}
                    onChange={(e) => setCreateFormData({ ...createFormData, productionCompany: e.target.value })}
                    placeholder="Enter production company..."
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                  />
                </div>

                {/* Status and Genre */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Status</label>
                    <select
                      value={createFormData.status}
                      onChange={(e) => setCreateFormData({ ...createFormData, status: e.target.value })}
                      className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                    >
                      <option value="Pre-Production">Pre-Production</option>
                      <option value="In Production">In Production</option>
                      <option value="Post-Production">Post-Production</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Genre</label>
                    <input
                      type="text"
                      value={createFormData.genre}
                      onChange={(e) => setCreateFormData({ ...createFormData, genre: e.target.value })}
                      placeholder="e.g., Drama, Action..."
                      className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                    />
                  </div>
                </div>

                {/* Director and Budget */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Director</label>
                    <input
                      type="text"
                      value={createFormData.director}
                      onChange={(e) => setCreateFormData({ ...createFormData, director: e.target.value })}
                      placeholder="Enter director name..."
                      className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Budget</label>
                    <input
                      type="text"
                      value={createFormData.budget}
                      onChange={(e) => setCreateFormData({ ...createFormData, budget: e.target.value })}
                      placeholder="e.g., $25M..."
                      className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Start Date</label>
                  <input
                    type="date"
                    value={createFormData.startDate}
                    onChange={(e) => setCreateFormData({ ...createFormData, startDate: e.target.value })}
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Cast Selection */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    Cast ({selectedActors.length} selected)
                  </label>
                  
                  {/* Selected Actors Pills */}
                  {selectedActors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                      {selectedActors.map(actorId => {
                        const actor = actors.find(a => a.id === actorId);
                        if (!actor) return null;
                        return (
                          <div
                            key={actorId}
                            className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-1"
                          >
                            <span className="text-purple-300 text-sm">{actor.name}</span>
                            <button
                              onClick={() => toggleActor(actorId)}
                              className="text-purple-400 hover:text-purple-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Actors List with Checkboxes */}
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
                    {loadingContacts ? (
                      <div className="p-4 text-center text-gray-500">Loading actors...</div>
                    ) : (
                      <>
                        {/* Existing Actors List */}
                        {actors.length > 0 ? (
                          <div className="max-h-48 overflow-y-auto">
                            {actors.map((actor) => (
                              <button
                                key={actor.id}
                                onClick={() => toggleActor(actor.id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors border-b border-zinc-800 last:border-0"
                              >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  selectedActors.includes(actor.id)
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-zinc-600'
                                }`}>
                                  {selectedActors.includes(actor.id) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-gray-300 text-sm">{actor.name}</div>
                                  {actor.email && (
                                    <div className="text-gray-500 text-xs">{actor.email}</div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <div className="text-gray-500 text-sm">No actors in system yet</div>
                          </div>
                        )}
                        
                        {/* Always show Add Actor button */}
                        <button
                          onClick={() => setShowInlineAddActor(true)}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 hover:bg-white/5 transition-colors border-t border-zinc-700 text-purple-400 text-sm bg-zinc-900/50"
                        >
                          <Plus className="w-4 h-4" />
                          Add New Actor
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Crew Selection */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Crew ({selectedCrew.length} selected)
                  </label>
                  
                  {/* Selected Crew Pills */}
                  {selectedCrew.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                      {selectedCrew.map(crewId => {
                        const member = crew.find(c => c.id === crewId);
                        if (!member) return null;
                        return (
                          <div
                            key={crewId}
                            className="flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 rounded-full px-3 py-1"
                          >
                            <span className="text-pink-300 text-sm">{member.name}</span>
                            <button
                              onClick={() => toggleCrew(crewId)}
                              className="text-pink-400 hover:text-pink-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Crew List with Checkboxes */}
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
                    {loadingContacts ? (
                      <div className="p-4 text-center text-gray-500">Loading crew...</div>
                    ) : (
                      <>
                        {/* Existing Crew List */}
                        {crew.length > 0 ? (
                          <div className="max-h-48 overflow-y-auto">
                            {crew.map((member) => (
                              <button
                                key={member.id}
                                onClick={() => toggleCrew(member.id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors border-b border-zinc-800 last:border-0"
                              >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  selectedCrew.includes(member.id)
                                    ? 'bg-pink-500 border-pink-500'
                                    : 'border-zinc-600'
                                }`}>
                                  {selectedCrew.includes(member.id) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-gray-300 text-sm">{member.name}</div>
                                  {member.email && (
                                    <div className="text-gray-500 text-xs">{member.email}</div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <div className="text-gray-500 text-sm">No crew members in system yet</div>
                          </div>
                        )}
                        
                        {/* Always show Add Crew button */}
                        <button
                          onClick={() => setShowInlineAddCrew(true)}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 hover:bg-white/5 transition-colors border-t border-zinc-700 text-pink-400 text-sm bg-zinc-900/50"
                        >
                          <Plus className="w-4 h-4" />
                          Add New Crew Member
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Production Company Selection */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Production Company
                  </label>
                  <select
                    value={selectedCompanyId}
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select a company (optional)</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-zinc-800">
                <Button
                  variant="outline"
                  className="flex-1 border-zinc-700 text-gray-400 hover:bg-zinc-800"
                  onClick={() => setShowCreateModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                  onClick={handleCreateProject}
                  disabled={isLoading || !createFormData.title}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Project
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Inline Add Actor Modal */}
        {showInlineAddActor && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
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
                    setShowInlineAddActor(false);
                    resetAddActorForm();
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); handleAddNewActorInline(); }}>
                {/* Headshot Upload */}
                <div>
                  <label className="block text-white mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Profile Headshot
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-32 bg-zinc-800 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                      {addActorHeadshotPreview ? (
                        <img src={addActorHeadshotPreview} alt="Headshot preview" className="w-full h-full object-cover" />
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
                              setAddActorHeadshotPreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                      />
                      <p className="text-gray-400 text-xs mt-2">Recommended: Square image, at least 400x400px. Max 5MB.</p>
                      {addActorHeadshotPreview && (
                        <button
                          type="button"
                          onClick={() => setAddActorHeadshotPreview(null)}
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
                        value={addActorName}
                        onChange={(e) => setAddActorName(e.target.value)}
                        placeholder="Enter actor's full name"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Role Type *</label>
                      <select 
                        value={addActorRoleType}
                        onChange={(e) => setAddActorRoleType(e.target.value)}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="Lead Actor">Lead Actor</option>
                        <option value="Lead Actress">Lead Actress</option>
                        <option value="Supporting">Supporting Actor</option>
                        <option value="Extra">Extra</option>
                        <option value="Voice Actor">Voice Actor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        value={addActorEmail}
                        onChange={(e) => setAddActorEmail(e.target.value)}
                        placeholder="actor@example.com"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone</label>
                      <input
                        type="tel"
                        value={addActorPhone}
                        onChange={(e) => setAddActorPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Location</label>
                      <input
                        type="text"
                        value={addActorLocation}
                        onChange={(e) => setAddActorLocation(e.target.value)}
                        placeholder="Los Angeles, CA"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Agency</label>
                      <input
                        type="text"
                        value={addActorAgency}
                        onChange={(e) => setAddActorAgency(e.target.value)}
                        placeholder="Talent Agency Name"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowInlineAddActor(false);
                      resetAddActorForm();
                    }}
                    className="flex-1 border-white/10 text-gray-300"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    disabled={isLoading || !addActorName.trim()}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Add Actor
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Inline Add Crew Modal */}
        {showInlineAddCrew && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-zinc-900 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-xl mb-1">Add New Crew Member</h2>
                    <p className="text-gray-400 text-sm">Create a new crew member profile</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowInlineAddCrew(false);
                    resetAddCrewForm();
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); handleAddNewCrewInline(); }}>
                {/* Headshot Upload */}
                <div>
                  <label className="block text-white mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Profile Headshot
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="w-32 h-32 bg-zinc-800 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                      {addCrewHeadshotPreview ? (
                        <img src={addCrewHeadshotPreview} alt="Headshot preview" className="w-full h-full object-cover" />
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
                              setAddCrewHeadshotPreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                      />
                      <p className="text-gray-400 text-xs mt-2">Recommended: Square image, at least 400x400px. Max 5MB.</p>
                      {addCrewHeadshotPreview && (
                        <button
                          type="button"
                          onClick={() => setAddCrewHeadshotPreview(null)}
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
                        value={addCrewName}
                        onChange={(e) => setAddCrewName(e.target.value)}
                        placeholder="Enter crew member's full name"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Role *</label>
                      <select 
                        value={addCrewRole}
                        onChange={(e) => setAddCrewRole(e.target.value)}
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="Director">Director</option>
                        <option value="Producer">Producer</option>
                        <option value="Cinematographer">Cinematographer</option>
                        <option value="Editor">Editor</option>
                        <option value="Sound Designer">Sound Designer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        value={addCrewEmail}
                        onChange={(e) => setAddCrewEmail(e.target.value)}
                        placeholder="crew@example.com"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone</label>
                      <input
                        type="tel"
                        value={addCrewPhone}
                        onChange={(e) => setAddCrewPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Location</label>
                      <input
                        type="text"
                        value={addCrewLocation}
                        onChange={(e) => setAddCrewLocation(e.target.value)}
                        placeholder="Los Angeles, CA"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Department</label>
                      <input
                        type="text"
                        value={addCrewDepartment}
                        onChange={(e) => setAddCrewDepartment(e.target.value)}
                        placeholder="Production"
                        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowInlineAddCrew(false);
                      resetAddCrewForm();
                    }}
                    className="flex-1 border-white/10 text-gray-300"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    disabled={isLoading || !addCrewName.trim()}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Add Crew Member
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}