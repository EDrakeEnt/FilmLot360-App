import { projectId, publicAnonKey } from './supabase/info';
import { createClient } from './supabase/client';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae`;

// Helper function to get auth token from localStorage
function getAuthToken(): string | null {
  return localStorage.getItem('access_token');
}

// Helper function to refresh session if needed
async function refreshSessionIfNeeded(): Promise<string | null> {
  try {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    
    if (session?.access_token) {
      // Update localStorage with fresh token
      localStorage.setItem('access_token', session.access_token);
      return session.access_token;
    }
    
    return null;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
}

// Helper function to make API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let token = getAuthToken();
  
  // If we have a token, try to ensure it's fresh
  if (token) {
    const freshToken = await refreshSessionIfNeeded();
    if (freshToken) {
      token = freshToken;
    }
  }
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token || publicAnonKey}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // If we get a 401, try to refresh the session one more time
    if (response.status === 401) {
      console.log('Got 401, attempting to refresh session...');
      const freshToken = await refreshSessionIfNeeded();
      
      if (freshToken) {
        // Retry the request with fresh token
        const retryHeaders: HeadersInit = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${freshToken}`,
          ...options.headers,
        };
        
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: retryHeaders,
        });
        
        if (!retryResponse.ok) {
          const error = await retryResponse.json().catch(() => ({ error: 'Request failed' }));
          throw new Error(error.error || `HTTP ${retryResponse.status}: ${retryResponse.statusText}`);
        }
        
        return retryResponse.json();
      } else {
        // No valid session, clear token and redirect to login
        localStorage.removeItem('access_token');
        if (window.location.pathname.startsWith('/dashboard')) {
          window.location.href = '/login';
        }
        throw new Error('Session expired. Please log in again.');
      }
    }
    
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// PROJECT API
// ============================================================================

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'planning' | 'pre-production' | 'in-progress' | 'post-production' | 'completed';
  budget: number;
  spent: number;
  startDate: string | null;
  endDate: string | null;
  genre: string;
  director: string;
  createdAt: string;
  updatedAt: string;
}

export const projectsAPI = {
  getAll: () => apiRequest<{ success: boolean; projects: Project[] }>('/projects'),
  
  getById: (projectId: string) => 
    apiRequest<{ success: boolean; project: Project }>(`/projects/${projectId}`),
  
  create: (data: Partial<Project>) => 
    apiRequest<{ success: boolean; project: Project }>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (projectId: string, data: Partial<Project>) => 
    apiRequest<{ success: boolean; project: Project }>(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (projectId: string) => 
    apiRequest<{ success: boolean; message: string }>(`/projects/${projectId}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// ACTOR API
// ============================================================================

export interface Actor {
  id: string;
  projectId: string;
  userId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  rate: number;
  status: 'contacted' | 'negotiating' | 'confirmed' | 'declined';
  notes: string;
  createdAt: string;
}

export const actorsAPI = {
  getAll: (projectId: string) => 
    apiRequest<{ success: boolean; actors: Actor[] }>(`/projects/${projectId}/actors`),
  
  create: (projectId: string, data: Partial<Actor>) => 
    apiRequest<{ success: boolean; actor: Actor }>(`/projects/${projectId}/actors`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (projectId: string, actorId: string, data: Partial<Actor>) => 
    apiRequest<{ success: boolean; actor: Actor }>(`/projects/${projectId}/actors/${actorId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (projectId: string, actorId: string) => 
    apiRequest<{ success: boolean; message: string }>(`/projects/${projectId}/actors/${actorId}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// CREW API
// ============================================================================

export interface Crew {
  id: string;
  projectId: string;
  userId: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  rate: number;
  status: 'contacted' | 'negotiating' | 'confirmed' | 'declined';
  notes: string;
  createdAt: string;
}

export const crewAPI = {
  getAll: (projectId: string) => 
    apiRequest<{ success: boolean; crew: Crew[] }>(`/projects/${projectId}/crew`),
  
  create: (projectId: string, data: Partial<Crew>) => 
    apiRequest<{ success: boolean; crew: Crew }>(`/projects/${projectId}/crew`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (projectId: string, crewId: string, data: Partial<Crew>) => 
    apiRequest<{ success: boolean; crew: Crew }>(`/projects/${projectId}/crew/${crewId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (projectId: string, crewId: string) => 
    apiRequest<{ success: boolean; message: string }>(`/projects/${projectId}/crew/${crewId}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// EXPENSE API
// ============================================================================

export interface Expense {
  id: string;
  projectId: string;
  userId: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  vendor: string;
  status: 'pending' | 'approved' | 'paid';
  createdAt: string;
}

export const expensesAPI = {
  getAll: (projectId: string) => 
    apiRequest<{ success: boolean; expenses: Expense[] }>(`/projects/${projectId}/expenses`),
  
  create: (projectId: string, data: Partial<Expense>) => 
    apiRequest<{ success: boolean; expense: Expense }>(`/projects/${projectId}/expenses`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (projectId: string, expenseId: string, data: Partial<Expense>) => 
    apiRequest<{ success: boolean; expense: Expense }>(`/projects/${projectId}/expenses/${expenseId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (projectId: string, expenseId: string) => 
    apiRequest<{ success: boolean; message: string }>(`/projects/${projectId}/expenses/${expenseId}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// INVOICE API
// ============================================================================

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
  }[];
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string | null;
  notes: string;
  createdAt: string;
}

export const invoicesAPI = {
  getAll: (projectId: string) => 
    apiRequest<{ success: boolean; invoices: Invoice[] }>(`/projects/${projectId}/invoices`),
  
  create: (projectId: string, data: Partial<Invoice>) => 
    apiRequest<{ success: boolean; invoice: Invoice }>(`/projects/${projectId}/invoices`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (projectId: string, invoiceId: string, data: Partial<Invoice>) => 
    apiRequest<{ success: boolean; invoice: Invoice }>(`/projects/${projectId}/invoices/${invoiceId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (projectId: string, invoiceId: string) => 
    apiRequest<{ success: boolean; message: string }>(`/projects/${projectId}/invoices/${invoiceId}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// ANALYTICS API
// ============================================================================

export interface DashboardAnalytics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
  totalSpent: number;
  budgetRemaining: number;
  budgetUtilization: string;
  recentProjects: Project[];
}

export interface ProjectAnalytics {
  project: Project;
  teamSize: {
    actors: number;
    crew: number;
    total: number;
  };
  financial: {
    budget: number;
    spent: number;
    remaining: number;
    expenseCount: number;
    invoiceCount: number;
    expensesByCategory: Record<string, number>;
  };
  timeline: {
    startDate: string | null;
    endDate: string | null;
    status: string;
  };
}

export const analyticsAPI = {
  getDashboard: () => 
    apiRequest<{ success: boolean; analytics: DashboardAnalytics }>('/analytics/dashboard'),
  
  getProject: (projectId: string) => 
    apiRequest<{ success: boolean; analytics: ProjectAnalytics }>(`/analytics/projects/${projectId}`),
};

// ============================================================================
// USER PROFILE API
// ============================================================================

export interface UserProfile {
  email: string;
  fullName: string;
  company: string;
  plan: string;
  billingCycle: string;
  emailVerified: boolean;
  createdAt: string;
  subscription: any;
}

export const profileAPI = {
  get: () => 
    apiRequest<{ success: boolean; profile: UserProfile }>('/profile'),
  
  update: (data: Partial<UserProfile>) => 
    apiRequest<{ success: boolean; profile: UserProfile }>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  updateSubscription: (plan: string, billingCycle: string) => 
    apiRequest<{ success: boolean; subscription: any }>('/subscription', {
      method: 'PUT',
      body: JSON.stringify({ plan, billingCycle }),
    }),
};

// ============================================================================
// AUTH HELPERS
// ============================================================================

export const authHelpers = {
  setToken: (token: string) => {
    localStorage.setItem('access_token', token);
  },
  
  clearToken: () => {
    localStorage.removeItem('access_token');
  },
  
  isAuthenticated: () => {
    return !!getAuthToken();
  },
};