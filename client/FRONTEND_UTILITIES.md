# Frontend Utilities & Hooks Documentation

## 📦 Overview

This guide covers all the utility functions and custom hooks available for frontend development in the Zovio admin system.

---

## 🪝 Custom Hooks

### 1. useImageUpload Hook

Upload images to Cloudinary with loading, error, and progress tracking.

**Location:** `src/hooks/useImageUpload.tsx`

**Usage:**

```typescript
import { useImageUpload, useWorkerImageUpload } from '@/hooks/useImageUpload';

function MyComponent() {
  const { upload, isLoading, error, success, progress, reset } =
    useImageUpload();

  const handleUpload = async (file: File) => {
    const result = await upload(file, 'optional/subfolder');
    if (result.success) {
      console.log('Image URL:', result.url);
      console.log('Public ID:', result.publicId);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
      />
      {isLoading && <p>Uploading... {progress}%</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Upload successful!</p>}
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

**Properties:**

```typescript
interface UseImageUploadReturn {
  isLoading: boolean;        // Upload in progress
  error: string | null;      // Error message
  success: boolean;          // Upload successful
  uploadedUrl: string | null;        // Cloudinary URL
  uploadedPublicId: string | null;   // Cloudinary public ID
  progress: number;          // Upload progress (0-100)
  upload: (file: File, subfolder?: string) => Promise<UploadResult>;
  reset: () => void;         // Reset state
  setProgress: (progress: number) => void; // Manual progress update
}
```

### 2. useWorkerImageUpload Hook

Specialized hook for worker image uploads.

**Usage:**

```typescript
import { useWorkerImageUpload } from '@/hooks/useImageUpload';

function WorkerForm() {
  const { uploadWorkerImage, isLoading, error, success } =
    useWorkerImageUpload();

  const handleWorkerImage = async (file: File, workerId: string) => {
    const result = await uploadWorkerImage(file, workerId);
    // Automatically handles home/zovio/staff/workers/{workerId} path
  };

  return (
    // Form JSX
  );
}
```

### 3. useApiData Hook

Fetch data from API with loading and error states.

**Location:** `src/hooks/useApiData.tsx`

**Usage:**

```typescript
import { useApiData } from '@/hooks/useApiData';
import { workerAPI } from '@/lib/api';

function WorkersList() {
  const { data, loading, error, refetch } = useApiData(
    () => workerAPI.getAll()
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.map((worker) => (
        <div key={worker.id}>{worker.name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

**Properties:**

```typescript
interface UseApiDataReturn<T> {
  data: T | null;           // Fetched data
  loading: boolean;         // Loading state
  error: string | null;     // Error message
  refetching: boolean;      // Refetch in progress
  refetch: () => Promise<void>; // Refetch data
}
```

### 4. usePaginatedApiData Hook

Fetch paginated data from API.

**Usage:**

```typescript
import { usePaginatedApiData } from '@/hooks/useApiData';
import { workerAPI } from '@/lib/api';

function PaginatedWorkers() {
  const { data, loading, page, totalPages, nextPage, prevPage, goToPage } =
    usePaginatedApiData(
      (page, limit) => workerAPI.getAll(), // Mock: should have pagination params
      1,
      10
    );

  return (
    <div>
      {data.map((worker) => (
        <div key={worker.id}>{worker.name}</div>
      ))}
      <button onClick={prevPage} disabled={page === 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={nextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}
```

**Properties:**

```typescript
interface UsePaginatedApiDataReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  refetch: () => Promise<void>;
}
```

### 5. useSearchableApiData Hook

Fetch all data with search and filter capabilities.

**Usage:**

```typescript
import { useSearchableApiData } from '@/hooks/useApiData';
import { workerAPI } from '@/lib/api';

function SearchableWorkers() {
  const {
    data,
    loading,
    searchTerm,
    search,
    filter,
    clearFilters,
  } = useSearchableApiData(() => workerAPI.getAll());

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => search(e.target.value)}
      />
      <select
        onChange={(e) =>
          filter({ service: e.target.value })
        }
      >
        <option value="">All Services</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
      </select>
      <button onClick={clearFilters}>Clear Filters</button>

      {data.map((worker) => (
        <div key={worker.id}>{worker.name}</div>
      ))}
    </div>
  );
}
```

**Properties:**

```typescript
interface UseSearchableApiDataReturn<T> {
  data: T[];              // Filtered data
  allData: T[];           // Original data
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: Record<string, any>;
  search: (term: string) => void;
  filter: (filterObj: Record<string, any>) => void;
  clearFilters: () => void;
  total: number;
  refetch: () => Promise<void>;
}
```

---

## ⚙️ Configuration Module

**Location:** `src/config/index.ts`

Centralized configuration for the entire application.

### Usage

```typescript
import config, {
  API_CONFIG,
  CLOUDINARY_CONFIG,
  FEATURE_FLAGS,
  APP_CONFIG,
  API_ENDPOINTS,
  STATUS_VALUES,
  validateConfig,
} from '@/config';

// API Configuration
const apiUrl = API_CONFIG.baseURL; // http://localhost:3000/api

// Cloudinary Configuration
const cloudName = CLOUDINARY_CONFIG.cloudName;
const uploadPreset = CLOUDINARY_CONFIG.uploadPreset;

// Feature Flags
if (FEATURE_FLAGS.enableAnalytics) {
  // Show analytics features
}

// Status Values
const workerStatuses = STATUS_VALUES.workers; // ['Active', 'Inactive', 'Suspended']

// API Endpoints
const url = API_ENDPOINTS.WORKERS.LIST; // /workers
const singleUrl = API_ENDPOINTS.WORKERS.GET('123'); // /workers/123

// Validate Configuration
const { isValid, errors } = validateConfig();
if (!isValid) {
  console.error('Configuration errors:', errors);
}
```

### Available Exports

- `API_CONFIG` - API base URL and settings
- `CLOUDINARY_CONFIG` - Cloudinary credentials and limits
- `FEATURE_FLAGS` - Feature toggles
- `APP_CONFIG` - App name, version, support info
- `PAGINATION_CONFIG` - Pagination defaults
- `DEBUG_CONFIG` - Debug settings
- `DB_LIMITS` - Database field limits
- `STATUS_VALUES` - Valid status values
- `CATEGORIES` - Valid categories
- `DEMAND_LEVELS` - Valid demand levels
- `API_ENDPOINTS` - All API endpoint paths
- `HTTP_STATUS` - HTTP status codes
- `ERROR_MESSAGES` - Common error messages
- `SUCCESS_MESSAGES` - Common success messages
- `VALIDATION_RULES` - Regex validation rules
- `COLOR_MAP` - Color coding for statuses
- `DATE_FORMATS` - Date format strings
- `CACHE_CONFIG` - Cache configuration

---

## 📝 Logger Module

**Location:** `src/lib/logger.ts`

Comprehensive logging system for debugging and monitoring.

### Usage

```typescript
import { logger } from '@/lib/logger';

// Basic logging
logger.debug('Debug message', { data: 'value' });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', error);

// Specialized logging
logger.logApiCall('GET', '/api/workers', 200, 150); // GET /api/workers (200) [150ms]
logger.logImageUpload('profile.jpg', 2048, true);
logger.logDatabaseOperation('insert', 'workers', true);

// Get logs
const allLogs = logger.getLogs();
const errorLogs = logger.getLogs(LogLevel.ERROR);

// Export logs
const logsString = logger.getLogsAsString(100); // Last 100 logs
logger.exportLogs(); // Download as file

// Statistics
const stats = logger.getStatistics();
// { total: 150, debug: 50, info: 60, warn: 30, error: 10 }

// Configuration
logger.setConsoleLogging(true);
logger.setLogLevel('INFO');
logger.clearLogs();
```

### Logger Methods

```typescript
debug(message: string, data?: any): void
info(message: string, data?: any): void
warn(message: string, data?: any): void
error(message: string, error?: Error, data?: any): void
logApiCall(method: string, endpoint: string, status?: number, duration?: number): void
logApiError(method: string, endpoint: string, error: any): void
logImageUpload(fileName: string, size: number, success: boolean): void
logDatabaseOperation(operation: string, collection: string, result: boolean): void
getLogs(level?: LogLevel): LogEntry[]
getLogsAsString(limit?: number): string
exportLogs(): string
clearLogs(): void
setConsoleLogging(enabled: boolean): void
setLogLevel(level: LogLevel): void
getStatistics(): LogStatistics
```

### Global Access

In development, access logger from console:

```javascript
// Browser console
__logger.getLogs();
__logger.getStatistics();
__logger.exportLogs();
```

---

## 🔗 API Client Module

**Location:** `src/lib/api.ts`

Complete API client for backend communication.

### Usage

```typescript
import {
  workerAPI,
  serviceAPI,
  locationAPI,
  complaintAPI,
  analyticsAPI,
  settingsAPI,
  exportAPI,
} from '@/lib/api';

// Get all workers
const response = await workerAPI.getAll();

// Get single worker
const worker = await workerAPI.getById('123');

// Create worker
const newWorker = await workerAPI.create({
  name: 'John Doe',
  email: 'john@example.com',
  // ... other fields
});

// Update worker
await workerAPI.update('123', {
  status: 'Active',
});

// Delete worker
await workerAPI.delete('123');

// Search
const results = await workerAPI.search('john');

// Filter
const filtered = await workerAPI.filter({
  service: 'Plumbing',
  location: 'North Delhi',
});

// Upload image
const imageResult = await workerAPI.uploadImage(file);

// Similar methods for services, locations, complaints, etc.
```

---

## 🖼️ Cloudinary Utility Module

**Location:** `src/lib/cloudinary.ts`

Image upload and optimization utilities.

### Usage

```typescript
import {
  uploadToCloudinary,
  uploadWorkerImage,
  getOptimizedImageUrl,
  getThumbnailUrl,
  getProfilePictureUrl,
} from '@/lib/cloudinary';

// Upload image
const result = await uploadToCloudinary(file, 'subfolder');
// {
//   success: true,
//   url: 'https://res.cloudinary.com/...',
//   publicId: 'home/zovio/staff/...'
// }

// Upload worker image specifically
const result = await uploadWorkerImage(file, workerId);

// Get optimized URLs
const profileUrl = getOptimizedImageUrl(publicId, {
  width: 300,
  height: 300,
  format: 'webp',
});

const thumbnailUrl = getThumbnailUrl(publicId);
const profileUrl = getProfilePictureUrl(publicId);
```

---

## 📋 Environment Configuration

**Location:** `.env.example`

Copy to `.env.local` and update values:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=development

# Cloudinary Configuration
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=zovio-workers

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_EXPORT=true
REACT_APP_ENABLE_BULK_OPERATIONS=false

# App Configuration
REACT_APP_APP_NAME=Zovio
REACT_APP_APP_VERSION=1.0.0
REACT_APP_SUPPORT_EMAIL=support@zovio.com

# Limits
REACT_APP_MAX_FILE_SIZE=5242880
REACT_APP_MAX_WORKERS_PER_PAGE=10
REACT_APP_PAGINATION_SIZE=25

# Debugging
REACT_APP_DEBUG_MODE=false
REACT_APP_LOG_LEVEL=info
```

---

## 🎯 Best Practices

### 1. Error Handling

```typescript
try {
  const result = await workerAPI.create(data);
  if (result.success) {
    // Handle success
  } else {
    logger.error('Failed to create worker', new Error(result.error));
  }
} catch (error) {
  logger.error('Error creating worker', error as Error);
}
```

### 2. Image Upload

```typescript
const { upload, isLoading, error } = useImageUpload();

const handleImageSelect = async (file: File) => {
  // Validate file
  if (file.size > CLOUDINARY_CONFIG.maxFileSize) {
    logger.warn('File size exceeds limit');
    return;
  }

  if (!CLOUDINARY_CONFIG.formats.includes(file.type)) {
    logger.warn('Invalid file type');
    return;
  }

  // Upload
  const result = await upload(file, 'workers');
  if (result.success) {
    logger.info('Image uploaded', { url: result.url });
  }
};
```

### 3. Data Fetching

```typescript
import { useSearchableApiData } from '@/hooks/useApiData';

function DataComponent() {
  const { data, loading, error, search, filter } = useSearchableApiData(
    () => workerAPI.getAll()
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <SearchInput onChange={(term) => search(term)} />
      <FilterSelect onChange={(filters) => filter(filters)} />
      <DataList items={data} />
    </div>
  );
}
```

### 4. Configuration Usage

```typescript
import { API_ENDPOINTS, validateConfig } from '@/config';

// Validate on app start
const { isValid, errors } = validateConfig();
if (!isValid) {
  logger.error('Configuration validation failed', new Error(errors.join(', ')));
}

// Use endpoints
const url = API_ENDPOINTS.WORKERS.LIST;
const getUrl = API_ENDPOINTS.WORKERS.GET(workerId);
```

---

## 📚 Summary

**Available Utilities:**
- ✅ Custom hooks for image upload, API data fetching, search/filter
- ✅ Comprehensive configuration management
- ✅ Advanced logging system
- ✅ Complete API client
- ✅ Cloudinary integration utilities
- ✅ Environment configuration

**All ready to use in your components and services!** 🚀
