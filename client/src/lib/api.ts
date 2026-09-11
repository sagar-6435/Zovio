// API Client for backend communication
// Support both Vite (VITE_*) and Create React App (REACT_APP_*) environment variables
export const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  import.meta.env.REACT_APP_API_URL || 
  'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Generic fetch wrapper
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    console.log('[API]', options.method || 'GET', url);

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('[API] Error:', error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============ WORKER APIs ============
export const workerAPI = {
  getAll: async () => apiCall('/admin/workers'),
  getById: async (id: string) => apiCall(`/admin/workers/${id}`),
  create: async (data: any) =>
    apiCall('/admin/workers', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/admin/workers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/admin/workers/${id}`, { method: 'DELETE' }),
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'home/zovio/staff');

    return fetch(`${API_BASE_URL}/admin/workers/upload-image`, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  },
  search: async (query: string) =>
    apiCall(`/admin/workers/search?q=${encodeURIComponent(query)}`),
  filter: async (filters: any) =>
    apiCall('/admin/workers/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};

// ============ SERVICE APIs ============
export const serviceAPI = {
  getAll: async () => apiCall('/admin/services'),
  getById: async (id: string) => apiCall(`/admin/services/${id}`),
  create: async (data: any) =>
    apiCall('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/admin/services/${id}`, { method: 'DELETE' }),
  toggleStatus: async (id: string, active: boolean) =>
    apiCall(`/admin/services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ active }),
    }),
  search: async (query: string) =>
    apiCall(`/admin/services/search?q=${encodeURIComponent(query)}`),
  filter: async (filters: any) =>
    apiCall('/admin/services/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};

// ============ LOCATION APIs ============
export const locationAPI = {
  getAll: async () => apiCall('/admin/locations'),
  getById: async (id: string) => apiCall(`/admin/locations/${id}`),
  create: async (data: any) =>
    apiCall('/admin/locations', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/admin/locations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/admin/locations/${id}`, { method: 'DELETE' }),
  search: async (query: string) =>
    apiCall(`/admin/locations/search?q=${encodeURIComponent(query)}`),
  filter: async (filters: any) =>
    apiCall('/admin/locations/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};

// ============ COMPLAINT APIs ============
export const complaintAPI = {
  getAll: async () => apiCall('/admin/complaints'),
  getById: async (id: string) => apiCall(`/admin/complaints/${id}`),
  create: async (data: any) =>
    apiCall('/admin/complaints', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/admin/complaints/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  addResponse: async (id: string, response: string) =>
    apiCall(`/admin/complaints/${id}/response`, {
      method: 'POST',
      body: JSON.stringify({ response }),
    }),
  updateStatus: async (id: string, status: string) =>
    apiCall(`/admin/complaints/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  search: async (query: string) =>
    apiCall(`/admin/complaints/search?q=${encodeURIComponent(query)}`),
  filter: async (filters: any) =>
    apiCall('/admin/complaints/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};

// ============ ANALYTICS APIs ============
export const analyticsAPI = {
  getDashboard: async () => apiCall('/admin/analytics'),
  getRevenue: async (dateRange: string = 'month') =>
    apiCall(`/admin/analytics/revenue?range=${dateRange}`),
  getServices: async () => apiCall('/admin/analytics/services'),
  getLocations: async () => apiCall('/admin/analytics/locations'),
  getWorkers: async () => apiCall('/admin/analytics/workers'),
  getComplaints: async () => apiCall('/admin/analytics/complaints'),
  exportReport: async (type: string, filters?: any) =>
    apiCall('/admin/analytics/export', {
      method: 'POST',
      body: JSON.stringify({ type, filters }),
    }),
};

// ============ SETTINGS APIs ============
export const settingsAPI = {
  get: async () => apiCall('/admin/settings'),
  getByKey: async (key: string) => apiCall(`/admin/settings/${key}`),
  update: async (key: string, value: any) =>
    apiCall(`/admin/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }),
  updateMultiple: async (settings: Record<string, any>) =>
    apiCall('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
  resetToDefaults: async () =>
    apiCall('/admin/settings/reset', { method: 'POST' }),
};

// ============ EXPORT APIs ============
export const exportAPI = {
  workers: async (filters?: any) =>
    apiCall('/admin/export/workers', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
  services: async (filters?: any) =>
    apiCall('/admin/export/services', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
  locations: async (filters?: any) =>
    apiCall('/admin/export/locations', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
  complaints: async (filters?: any) =>
    apiCall('/admin/export/complaints', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};
