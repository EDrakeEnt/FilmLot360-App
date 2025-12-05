import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Film, 
  Settings, 
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  FolderKanban,
  Receipt,
  Mail,
  Building,
  Users,
  UserCircle,
  CalendarCheck,
  FileText,
  Upload,
  PlayCircle,
  ChevronDown,
  Lock,
  FileSpreadsheet,
  FileType,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react";
import { profileAPI, authHelpers } from "../utils/api";
import { projectsAPI } from "../utils/filmlot-api";
import { createClient } from "../utils/supabase/client";
import { Button } from "./ui/button";
import { getSubscriptionStatus } from "../utils/subscription";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Invoices & Accounts", href: "/dashboard/invoices", icon: Receipt },
  { name: "Emails & Templates", href: "/dashboard/emails", icon: Mail },
  { name: "Payment Methods", href: "/dashboard/payment-methods", icon: CreditCard },
  { name: "Production Co.", href: "/dashboard/production", icon: Building },
  { name: "Actors", href: "/dashboard/actors", icon: Users },
  { name: "Crew", href: "/dashboard/crew", icon: UserCircle },
  { name: "Availability", href: "/dashboard/availability", icon: CalendarCheck },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
];

const quickActions = [
  { name: "Import Data", icon: Upload },
  { name: "View Tutorial", icon: PlayCircle },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userPlan, setUserPlan] = useState("Professional Plan");
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const supabase = createClient();
  const [showImportModal, setShowImportModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [flashingTab, setFlashingTab] = useState<string | null>(null);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  useEffect(() => {
    loadUserProfile();
    loadProjects();
  }, []);

  const loadUserProfile = async () => {
    try {
      // Check if we have an access token
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token found, user may not be authenticated');
        // Try to get session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          localStorage.setItem('access_token', session.access_token);
        } else {
          console.error('No active session, redirecting to login');
          navigate('/login');
          return;
        }
      }

      const response = await profileAPI.get();
      setUserName(response.profile.fullName || "User");
      setUserPlan(response.profile.plan || "Professional Plan");
      setSubscriptionData(response.profile.subscription || null);
    } catch (error: any) {
      console.error("Failed to load user profile:", error);
      
      // If it's an auth error, try to refresh the session
      if (error.message?.includes('Unauthorized') || error.message?.includes('401')) {
        console.log('Authentication error, trying to refresh session...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          localStorage.setItem('access_token', session.access_token);
          // Retry loading profile
          try {
            const response = await profileAPI.get();
            setUserName(response.profile.fullName || "User");
            setUserPlan(response.profile.plan || "Professional Plan");
            setSubscriptionData(response.profile.subscription || null);
          } catch (retryError) {
            console.error('Failed to load profile after refresh:', retryError);
            // Set default values instead of failing completely
            setUserName("User");
            setUserPlan("Professional Plan");
          }
        } else {
          console.error('No session available, redirecting to login');
          navigate('/login');
        }
      } else {
        // For other errors, set default values
        console.log('Setting default user values due to error');
        setUserName("User");
        setUserPlan("Professional Plan");
      }
    }
  };

  const loadProjects = async () => {
    setProjectsLoading(true);
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.projects || []);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setProjectsLoading(false);
    }
  };

  // Get subscription status
  const subStatus = getSubscriptionStatus(subscriptionData);

  // Define which features require paid subscription and which plan
  const getFeatureRequirement = (itemName: string): { locked: boolean; requiredPlan: 'starter' | 'growth' | null } => {
    // TEMPORARILY UNLOCKED - All features accessible for development
    return { locked: false, requiredPlan: null };
    
    // Original locking logic (commented out)
    // // Starter plan features
    // if (itemName === 'Invoices & Accounts' || itemName === 'Payment Methods') {
    //   return { locked: !subStatus.isPaid, requiredPlan: 'starter' };
    // }
    // // Growth plan features
    // if (itemName === 'Emails & Templates' || itemName === 'Reports') {
    //   const hasGrowth = subStatus.plan === 'growth' || subStatus.plan === 'professional' || subStatus.plan === 'enterprise';
    //   return { locked: !hasGrowth, requiredPlan: 'growth' };
    // }
    // return { locked: false, requiredPlan: null };
  };

  const isFeatureLocked = (itemName: string) => {
    return getFeatureRequirement(itemName).locked;
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      authHelpers.clearToken();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!uploadedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const token = localStorage.getItem('access_token');
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/import`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token || publicAnonKey}`,
          },
          body: formData,
        }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      
      // Determine which tab to flash based on collection type returned by backend
      let tabToFlash = '/dashboard/reports'; // Default to Reports
      
      if (result.collectionType) {
        switch (result.collectionType) {
          case 'actors':
            tabToFlash = '/dashboard/actors';
            break;
          case 'crew':
            tabToFlash = '/dashboard/crew';
            break;
          case 'projects':
            tabToFlash = '/dashboard/projects';
            break;
          case 'locations':
            // We don't have a locations tab, so use Projects
            tabToFlash = '/dashboard/projects';
            break;
          default:
            tabToFlash = '/dashboard/reports';
        }
      }
      
      // Flash the relevant tab
      setFlashingTab(tabToFlash);
      setTimeout(() => setFlashingTab(null), 3000);
      
      const successMessage = result.createdCount > 0
        ? `${result.createdCount} ${result.collectionType || 'records'} created successfully!`
        : 'File processed successfully';
      
      toast.success(successMessage, {
        description: `Check the ${result.collectionType || 'highlighted'} tab to review imported data.`,
        duration: 5000,
      });
      
      if (result.failedCount > 0) {
        toast.warning(`${result.failedCount} records failed to import`, {
          description: 'Some records could not be imported. Check console for details.',
        });
      }

      // Reset modal
      setShowImportModal(false);
      setUploadedFile(null);
      setUploadProgress(0);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Import failed', {
        description: error.message || 'Failed to process file',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        setUploadedFile(file);
        toast.success(`File selected: ${file.name}`);
      } else {
        toast.error('Invalid file type', {
          description: 'Please upload PDF, Word, Excel, or CSV files only',
        });
      }
    }
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];
    return validTypes.includes(file.type);
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return FileText;
    if (file.type.includes('word')) return FileType;
    if (file.type.includes('excel') || file.type.includes('spreadsheet')) return FileSpreadsheet;
    if (file.type === 'text/csv') return FileSpreadsheet;
    return Upload;
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-zinc-900 border-r border-white/10 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white">FilmLot360</div>
              <div className="text-gray-400 text-xs">CRM</div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const locked = isFeatureLocked(item.name);
            const isFlashing = flashingTab === item.href;
            
            return (
              <Link
                key={item.name}
                to={locked ? '/dashboard/account?tab=subscription' : item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm relative ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : locked 
                      ? 'text-gray-500 hover:text-gray-400 hover:bg-white/5 cursor-pointer'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                } ${
                  isFlashing ? 'animate-pulse bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-2 border-purple-400 shadow-lg shadow-purple-500/50' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
                style={isFlashing ? {
                  animation: 'flash 0.5s ease-in-out 6'
                } : undefined}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.name}</span>
                {locked && (
                  <Lock className="w-4 h-4 text-gray-500" />
                )}
                {isFlashing && !isActive && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                )}
              </Link>
            );
          })}
          
          {/* Quick Actions Section */}
          <div className="pt-4 mt-4 border-t border-white/10">
            <p className="text-gray-500 text-xs uppercase tracking-wider px-4 mb-2">Quick Actions</p>
            {quickActions.map((item) => {
              const isImport = item.name === 'Import Data';
              
              if (isImport) {
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setShowImportModal(true);
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm text-purple-400 hover:text-purple-300 hover:bg-white/5"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm text-purple-400 hover:text-purple-300 hover:bg-white/5"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-1">
          <Link
            to="/dashboard/account"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
              location.pathname === '/dashboard/account'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <User className="w-5 h-5" />
            <span>Account</span>
          </Link>
          <Link
            to="/dashboard/settings"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${
              location.pathname === '/dashboard/settings'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-zinc-900/50 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Projects Dropdown - visible on larger screens */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-purple-400 hover:text-purple-300 hover:bg-white/5"
                onClick={() => setProjectsDropdownOpen(!projectsDropdownOpen)}
              >
                <FolderKanban className="w-4 h-4 mr-2" />
                Projects
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-white text-sm">{userName}</div>
              <div className="text-gray-400 text-xs">admin</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <span className="text-white text-sm">
                {userName.split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || 'ED'}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 bg-zinc-950">
          {children}
        </main>
      </div>

      {/* Import Data Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-white text-2xl">Import Data</h2>
                  <p className="text-gray-400 text-sm mt-1">Upload documents to extract and store information</p>
                </div>
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setUploadedFile(null);
                    setUploadProgress(0);
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/20 hover:border-purple-500/50 bg-zinc-800/50'
                }`}
              >
                <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white mb-2">
                  {uploadedFile ? 'File Selected' : 'Drag and drop your file here'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  or click the button below to browse
                </p>

                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3 p-4 bg-zinc-800 border border-white/10 rounded-lg mb-4">
                    {(() => {
                      const FileIcon = getFileIcon(uploadedFile);
                      return <FileIcon className="w-8 h-8 text-purple-400" />;
                    })()}
                    <div className="flex-1 text-left">
                      <div className="text-white text-sm">{uploadedFile.name}</div>
                      <div className="text-gray-400 text-xs">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-red-400 hover:text-red-300"
                      title="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : null}

                <label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && isValidFileType(file)) {
                        setUploadedFile(file);
                        toast.success(`File selected: ${file.name}`);
                      } else if (file) {
                        toast.error('Invalid file type', {
                          description: 'Please upload PDF, Word, Excel, or CSV files only',
                        });
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                    onClick={(e) => {
                      e.preventDefault();
                      (e.currentTarget.previousElementSibling as HTMLInputElement)?.click();
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Files
                  </Button>
                </label>
              </div>

              {/* Supported File Types */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 p-3 bg-zinc-800/50 border border-white/10 rounded-lg">
                  <FileText className="w-5 h-5 text-red-400" />
                  <span className="text-gray-300 text-sm">PDF</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-zinc-800/50 border border-white/10 rounded-lg">
                  <FileType className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300 text-sm">Word</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-zinc-800/50 border border-white/10 rounded-lg">
                  <FileSpreadsheet className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300 text-sm">Excel</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-zinc-800/50 border border-white/10 rounded-lg">
                  <FileSpreadsheet className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-300 text-sm">CSV</span>
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Uploading...</span>
                    <span className="text-purple-400 text-sm">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Information */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 mb-1">How it works</h4>
                    <p className="text-gray-300 text-sm">
                      FilmLot360 will automatically extract information from your documents and store it securely. 
                      Supported formats include contact lists, project data, budget spreadsheets, and more.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  className="flex-1 border-white/10 text-gray-300"
                  onClick={() => {
                    setShowImportModal(false);
                    setUploadedFile(null);
                    setUploadProgress(0);
                  }}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={handleFileUpload}
                  disabled={!uploadedFile || isUploading}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Import File'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Dropdown Menu */}
      {projectsDropdownOpen && (
        <>
          {/* Backdrop to close on click-outside */}
          <div
            className="fixed inset-0 z-[55]"
            onClick={() => setProjectsDropdownOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="fixed top-16 left-6 md:left-72 z-[60] w-80 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl shadow-black/50">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Your Projects</h3>
                <Link
                  to="/dashboard/projects"
                  onClick={() => setProjectsDropdownOpen(false)}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  View All
                </Link>
              </div>

              {/* Projects List */}
              <div className="max-h-96 overflow-y-auto space-y-2">
                {projectsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-8">
                    <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 mb-4">No projects yet</p>
                    <Link
                      to="/dashboard/projects"
                      onClick={() => setProjectsDropdownOpen(false)}
                    >
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Project
                      </Button>
                    </Link>
                  </div>
                ) : (
                  projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/dashboard/projects?project=${project.id}`}
                      onClick={() => setProjectsDropdownOpen(false)}
                      className="block p-3 bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FolderKanban className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm group-hover:text-purple-300 transition-colors truncate">
                            {project.title || project.name || 'Untitled Project'}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {project.status && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                project.status === 'In Production' || project.status === 'Active'
                                  ? 'bg-green-500/20 text-green-400'
                                  : project.status === 'Pre-Production'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : project.status === 'Post-Production'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {project.status}
                              </span>
                            )}
                            {project.budget && (
                              <span className="text-xs text-gray-500">
                                ${parseFloat(project.budget).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* Create New Project Button */}
              {projects.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    to="/dashboard/projects"
                    onClick={() => setProjectsDropdownOpen(false)}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}