import { projectId, publicAnonKey } from './supabase/info';
import { createClient } from './supabase/client';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae`;

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};

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

// Helper function to make authenticated requests
async function makeRequest(endpoint: string, options: RequestInit = {}) {
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
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
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
          
          const retryResponse = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: retryHeaders,
          });
          
          if (!retryResponse.ok) {
            const errorText = await retryResponse.text();
            let errorMessage = `API Error: ${retryResponse.status}`;
            
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorData.error || errorMessage;
            } catch {
              errorMessage = errorText || errorMessage;
            }
            
            console.error(`Request failed for ${endpoint}:`, {
              status: retryResponse.status,
              message: errorMessage,
              endpoint: `${API_BASE}${endpoint}`
            });
            
            throw new Error(errorMessage);
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
      
      const errorText = await response.text();
      let errorMessage = `API Error: ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      console.error(`Request failed for ${endpoint}:`, {
        status: response.status,
        message: errorMessage,
        endpoint: `${API_BASE}${endpoint}`
      });
      
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Network error: ${error}`);
  }
}

// Generic Data Storage API
export const dataAPI = {
  // Get all items from a collection
  async getCollection(collection: string) {
    return makeRequest(`/${collection}`, {
      method: 'GET',
    });
  },

  // Create new item in collection
  async createItem(collection: string, data: any) {
    return makeRequest(`/${collection}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update item in collection
  async updateItem(collection: string, id: string, data: any) {
    return makeRequest(`/${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete item from collection
  async deleteItem(collection: string, id: string) {
    return makeRequest(`/${collection}/${id}`, {
      method: 'DELETE',
    });
  },
};

// Projects API
export const projectsAPI = {
  async getAll() {
    return dataAPI.getCollection('projects');
  },

  async create(projectData: any) {
    return dataAPI.createItem('projects', projectData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('projects', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('projects', id);
  },
};

// Actors API
export const actorsAPI = {
  async getAll() {
    return dataAPI.getCollection('actors');
  },

  async create(actorData: any) {
    return dataAPI.createItem('actors', actorData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('actors', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('actors', id);
  },
};

// Crew API
export const crewAPI = {
  async getAll() {
    return dataAPI.getCollection('crew');
  },

  async create(crewData: any) {
    return dataAPI.createItem('crew', crewData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('crew', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('crew', id);
  },
};

// Contacts API
export const contactsAPI = {
  async getAll() {
    return dataAPI.getCollection('contacts');
  },

  async create(contactData: any) {
    return dataAPI.createItem('contacts', contactData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('contacts', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('contacts', id);
  },
};

// Companies API
export const companiesAPI = {
  async getAll() {
    return dataAPI.getCollection('companies');
  },

  async create(companyData: any) {
    return dataAPI.createItem('companies', companyData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('companies', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('companies', id);
  },
};

// Deals API
export const dealsAPI = {
  async getAll() {
    return dataAPI.getCollection('deals');
  },

  async create(dealData: any) {
    return dataAPI.createItem('deals', dealData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('deals', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('deals', id);
  },
};

// Tasks API
export const tasksAPI = {
  async getAll() {
    return dataAPI.getCollection('tasks');
  },

  async create(taskData: any) {
    return dataAPI.createItem('tasks', taskData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('tasks', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('tasks', id);
  },
};

// Bookings API
export const bookingsAPI = {
  async getAll() {
    return dataAPI.getCollection('bookings');
  },

  async create(bookingData: any) {
    return dataAPI.createItem('bookings', bookingData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('bookings', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('bookings', id);
  },
};

// Invoices API
export const invoicesAPI = {
  async getAll() {
    return dataAPI.getCollection('invoices');
  },

  async create(invoiceData: any) {
    return dataAPI.createItem('invoices', invoiceData);
  },

  async update(id: string, updates: any) {
    return dataAPI.updateItem('invoices', id, updates);
  },

  async delete(id: string) {
    return dataAPI.deleteItem('invoices', id);
  },
};

// Email API
export const emailAPI = {
  async send(emailData: {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    cc?: string | string[];
    bcc?: string | string[];
    from?: string;
    replyTo?: string;
  }) {
    return makeRequest('/email/send', {
      method: 'POST',
      body: JSON.stringify(emailData),
    });
  },
};

// Users API
export const usersAPI = {
  async getAll() {
    return makeRequest('/users', {
      method: 'GET',
    });
  },

  async update(userId: string, updates: any) {
    return makeRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async delete(userId: string) {
    return makeRequest(`/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

// Dashboard Stats Helper
export const dashboardAPI = {
  async getStats() {
    try {
      const [projects, actors, bookings, deals] = await Promise.all([
        projectsAPI.getAll(),
        actorsAPI.getAll(),
        bookingsAPI.getAll(),
        dealsAPI.getAll(),
      ]);

      // Backend returns { success: true, projects: [...] } etc.
      const projectsData = projects.projects || [];
      const actorsData = actors.actors || [];
      const bookingsData = bookings.bookings || [];
      const dealsData = deals.deals || [];

      return {
        success: true,
        stats: {
          totalActors: actorsData.length || 0,
          activeProjects: projectsData.filter((p: any) => p.status === 'active').length || 0,
          pendingBookings: bookingsData.filter((b: any) => b.status === 'pending').length || 0,
          totalDeals: dealsData.length || 0,
        },
        projects: projectsData,
        actors: actorsData,
        bookings: bookingsData,
        deals: dealsData,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
        stats: {
          totalActors: 0,
          activeProjects: 0,
          pendingBookings: 0,
          totalDeals: 0,
        },
        projects: [],
        actors: [],
        bookings: [],
        deals: [],
      };
    }
  },
};