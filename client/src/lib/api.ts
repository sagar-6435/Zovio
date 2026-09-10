// API Client for backend communication
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============ WORKER APIs ============
export const workerAPI = {
  getAll: async () => apiCall('/workers'),
  getById: async (id: string) => apiCall(`/workers/${id}`),
  create: async (data: any) =>
    apiCall('/workers', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/workers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/workers/${id}`, { method: 'DELETE' }),
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'home/zovio/staff');

    return fetch(`${API_BASE_URL}/workers/upload-image`, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  },
  search: async (query: string) =>
    apiCall(`/workers/search?q=${encodeURIComponent(query)}`),
  filter: async (filters: any) =>
    apiCall('/workers/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};

// ============ SERVICE APIs ============
export const serviceAPI = {
  getAll: async () => apiCall('/services'),
  getById: async (id: string) => apiCall(`/services/${id}`),
  create: async (data: any) =>
    apiCall('/services', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/services/${id}`, { method: 'DELETE' }),
  toggleStatus: async (id: string, active: boolean) =>
    apiCall(`/services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ active }),
    }),
  search: async (query: string) =>
    apiCall(`/services/search?q=${encodeURIComponent(query)}`),
  filter: async (filters: any) =>
    apiCall('/services/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};

// ============ LOCATION APIs ============
export const locationAPI = {
  getAll: async () => apiCall('/locations'),
  getById: async (id: string) => apiCall(`/locations/${id}`),
  create: async (data: any) =>
    apiCall('/locations', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/locations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) =>
    apiCall(`/locations/${id}`, { method: 'DELETE' }),
  search: async (query: string) =>
    apiCall(`/locations/search?q=${encodeURIComponent(query)}`),
  filter: async (filters: any) =>
    apiCall('/locations/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};

// ============ COMPLAINT APIs ============
export const complaintAPI = {
  getAll: async () => apiCall('/complaints'),
  getById: async (id: string) => apiCall(`/complaints/${id}`),
  create: async (data: any) =>
    apiCall('/complaints', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) =>
    apiCall(`/complaints/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  addResponse: async (id: string, response: string) =>
    apiCall(`/complaints/${id}/response`, {
      method: 'POST',
      body: JSON.stringify({ response }),
    }),
  updateStatus: async (id: string, status: string) =>
    apiCall(`/complaints/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  search: async (query: string) =>
    apiCall(`/complaints/search?q=${encodeURIComponent(query)}`),
  filter: async (filters: any) =>
    apiCall('/complaints/filter', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};

// ============ ANALYTICS APIs ============
export const analyticsAPI = {
  getDashboard: async () => apiCall('/analytics/dashboard'),
  getRevenue: async (dateRange: string = 'month') =>
    apiCall(`/analytics/revenue?range=${dateRange}`),
  getServices: async () => apiCall('/analytics/services'),
  getLocations: async () => apiCall('/analytics/locations'),
  getWorkers: async () => apiCall('/analytics/workers'),
  getComplaints: async () => apiCall('/analytics/complaints'),
  exportReport: async (type: string, filters?: any) =>
    apiCall('/analytics/export', {
      method: 'POST',
      body: JSON.stringify({ type, filters }),
    }),
};

// ============ SETTINGS APIs ============
export const settingsAPI = {
  get: async () => apiCall('/settings'),
  getByKey: async (key: string) => apiCall(`/settings/${key}`),
  update: async (key: string, value: any) =>
    apiCall(`/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }),
  updateMultiple: async (settings: Record<string, any>) =>
    apiCall('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
  resetToDefaults: async () =>
    apiCall('/settings/reset', { method: 'POST' }),
};

// ============ EXPORT APIs ============
export const exportAPI = {
  workers: async (filters?: any) =>
    apiCall('/export/workers', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
  services: async (filters?: any) =>
    apiCall('/export/services', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
  locations: async (filters?: any) =>
    apiCall('/export/locations', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
  complaints: async (filters?: any) =>
    apiCall('/export/complaints', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),
};
