/**
 * Application Configuration
 * Centralized configuration for the entire application
 */

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
};

// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || '',
  folder: 'home/zovio/staff',
  formats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSize: parseInt(process.env.REACT_APP_MAX_FILE_SIZE || '5242880'), // 5MB
};

// Feature Flags
export const FEATURE_FLAGS = {
  enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  enableExport: process.env.REACT_APP_ENABLE_EXPORT === 'true',
  enableBulkOperations:
    process.env.REACT_APP_ENABLE_BULK_OPERATIONS === 'true',
  enableNotifications: true,
  enableEmailReports: true,
};

// App Configuration
export const APP_CONFIG = {
  name: process.env.REACT_APP_APP_NAME || 'Zovio',
  version: process.env.REACT_APP_APP_VERSION || '1.0.0',
  supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@zovio.com',
  supportPhone: '+91 1800-123-4567',
  timezone: 'Asia/Kolkata',
};

// Pagination & Limits
export const PAGINATION_CONFIG = {
  defaultPageSize: parseInt(process.env.REACT_APP_PAGINATION_SIZE || '25'),
  maxWorkersPerPage: parseInt(
    process.env.REACT_APP_MAX_WORKERS_PER_PAGE || '10'
  ),
  maxResults: 1000,
};

// Debug Configuration
export const DEBUG_CONFIG = {
  enabled: process.env.REACT_APP_DEBUG_MODE === 'true',
  logLevel: process.env.REACT_APP_LOG_LEVEL || 'info',
  environment: process.env.REACT_APP_ENV || 'development',
};

// Database Operations (Field Limits)
export const DB_LIMITS = {
  // String lengths
  maxNameLength: 100,
  maxEmailLength: 100,
  maxPhoneLength: 20,
  maxDescriptionLength: 500,
  maxNotesLength: 1000,

  // Numbers
  maxPrice: 1000000,
  minPrice: 0,
  maxRating: 5,
  minRating: 0,

  // Arrays
  maxTagsPerItem: 10,
  maxImages: 5,
};

// Status Values
export const STATUS_VALUES = {
  workers: ['Active', 'Inactive', 'Suspended'] as const,
  services: ['Active', 'Inactive'] as const,
  locations: ['Active', 'Inactive'] as const,
  complaints: ['Open', 'In Progress', 'Resolved'] as const,
  complaintTypes: ['Complaint', 'Query'] as const,
  priorities: ['Critical', 'High', 'Medium', 'Low'] as const,
};

// Category Values
export const CATEGORIES = {
  services: [
    'Home & Repair',
    'Cleaning',
    'Appliances',
    'Technology',
    'Beauty',
    'Events',
    'Education',
    'Health',
    'Professional',
    'Local Business',
    'Real Estate',
    'Outdoor',
  ],
  complaintCategories: [
    'Quality Issues',
    'Late Arrival',
    'Billing Issues',
    'Safety Concerns',
    'Communication',
    'Other',
  ],
};

// Demand Levels
export const DEMAND_LEVELS = ['Very High', 'High', 'Medium', 'Low'] as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Workers
  WORKERS: {
    LIST: '/workers',
    CREATE: '/workers',
    GET: (id: string) => `/workers/${id}`,
    UPDATE: (id: string) => `/workers/${id}`,
    DELETE: (id: string) => `/workers/${id}`,
    UPLOAD_IMAGE: (id: string) => `/workers/${id}/upload-image`,
    SEARCH: '/workers/search',
    FILTER: '/workers/filter',
  },

  // Services
  SERVICES: {
    LIST: '/services',
    CREATE: '/services',
    GET: (id: string) => `/services/${id}`,
    UPDATE: (id: string) => `/services/${id}`,
    DELETE: (id: string) => `/services/${id}`,
    TOGGLE: (id: string) => `/services/${id}`,
    SEARCH: '/services/search',
    FILTER: '/services/filter',
  },

  // Locations
  LOCATIONS: {
    LIST: '/locations',
    CREATE: '/locations',
    GET: (id: string) => `/locations/${id}`,
    UPDATE: (id: string) => `/locations/${id}`,
    DELETE: (id: string) => `/locations/${id}`,
    SEARCH: '/locations/search',
    FILTER: '/locations/filter',
  },

  // Complaints
  COMPLAINTS: {
    LIST: '/complaints',
    CREATE: '/complaints',
    GET: (id: string) => `/complaints/${id}`,
    UPDATE: (id: string) => `/complaints/${id}`,
    ADD_RESPONSE: (id: string) => `/complaints/${id}/response`,
    UPDATE_STATUS: (id: string) => `/complaints/${id}`,
    SEARCH: '/complaints/search',
    FILTER: '/complaints/filter',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    REVENUE: '/analytics/revenue',
    SERVICES: '/analytics/services',
    LOCATIONS: '/analytics/locations',
    WORKERS: '/analytics/workers',
    COMPLAINTS: '/analytics/complaints',
    EXPORT: '/analytics/export',
  },

  // Settings
  SETTINGS: {
    LIST: '/settings',
    GET: (key: string) => `/settings/${key}`,
    UPDATE: (key: string) => `/settings/${key}`,
    UPDATE_MULTIPLE: '/settings',
    RESET: '/settings/reset',
  },

  // Export
  EXPORT: {
    WORKERS: '/export/workers',
    SERVICES: '/export/services',
    LOCATIONS: '/export/locations',
    COMPLAINTS: '/export/complaints',
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please use supported formats.',
  UPLOAD_FAILED: 'Upload failed. Please try again.',
  OPERATION_FAILED: 'Operation failed. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Created successfully.',
  UPDATED: 'Updated successfully.',
  DELETED: 'Deleted successfully.',
  UPLOADED: 'Uploaded successfully.',
  EXPORTED: 'Exported successfully.',
  SAVED: 'Saved successfully.',
};

// Validation Rules
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  url: /^https?:\/\/[^\s]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Color Coding
export const COLOR_MAP = {
  status: {
    Active: '#10b981',
    Inactive: '#6b7280',
    Suspended: '#ef4444',
    Open: '#ef4444',
    'In Progress': '#3b82f6',
    Resolved: '#10b981',
  },
  priority: {
    Critical: '#ef4444',
    High: '#f97316',
    Medium: '#eab308',
    Low: '#10b981',
  },
  demand: {
    'Very High': '#ef4444',
    High: '#f97316',
    Medium: '#eab308',
    Low: '#10b981',
  },
};

// Date Formats
export const DATE_FORMATS = {
  full: 'MMMM DD, YYYY',
  short: 'MM/DD/YY',
  time: 'HH:mm:ss',
  dateTime: 'MMMM DD, YYYY HH:mm',
  iso: 'YYYY-MM-DD',
};

// Cache Configuration
export const CACHE_CONFIG = {
  enabled: true,
  ttl: 5 * 60 * 1000, // 5 minutes
  keys: {
    WORKERS: 'workers_list',
    SERVICES: 'services_list',
    LOCATIONS: 'locations_list',
    ANALYTICS: 'analytics_dashboard',
  },
};

// Utility function to validate configuration
export function validateConfig(): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!CLOUDINARY_CONFIG.cloudName) {
    errors.push(
      'Cloudinary cloud name is not configured. Set REACT_APP_CLOUDINARY_CLOUD_NAME'
    );
  }

  if (!CLOUDINARY_CONFIG.uploadPreset) {
    errors.push(
      'Cloudinary upload preset is not configured. Set REACT_APP_CLOUDINARY_UPLOAD_PRESET'
    );
  }

  if (!API_CONFIG.baseURL) {
    errors.push('API base URL is not configured. Set REACT_APP_API_URL');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Get configuration by environment
export function getEnvConfig() {
  const isDev = DEBUG_CONFIG.environment === 'development';
  const isProd = DEBUG_CONFIG.environment === 'production';

  return {
    isDev,
    isProd,
    isStaging: DEBUG_CONFIG.environment === 'staging',
    apiURL: API_CONFIG.baseURL,
    debug: DEBUG_CONFIG.enabled,
  };
}

export default {
  API_CONFIG,
  CLOUDINARY_CONFIG,
  FEATURE_FLAGS,
  APP_CONFIG,
  PAGINATION_CONFIG,
  DEBUG_CONFIG,
  DB_LIMITS,
  STATUS_VALUES,
  CATEGORIES,
  DEMAND_LEVELS,
  API_ENDPOINTS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
  COLOR_MAP,
  DATE_FORMATS,
  CACHE_CONFIG,
  validateConfig,
  getEnvConfig,
};
