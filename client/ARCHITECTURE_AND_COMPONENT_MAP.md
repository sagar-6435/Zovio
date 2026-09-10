# Architecture & Component Map
**Purpose**: Visual guide to application structure and component relationships  
**Date**: September 10, 2026

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + TypeScript)            │
│                     (Production Ready)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐    │
│  │   Routes     │  │  Components  │  │  Context/State │    │
│  │ (File-based) │  │  (Reusable)  │  │  (Auth, etc)   │    │
│  └──────────────┘  └──────────────┘  └────────────────┘    │
│         │                │                    │              │
│         └────────────────┼────────────────────┘              │
│                          │                                   │
│              ┌───────────▼────────────┐                      │
│              │   Custom Hooks Layer   │                      │
│              │  (useApiData, etc)     │                      │
│              └───────────┬────────────┘                       │
│                          │                                   │
│       ┌──────────────────┴─────────────────────┐            │
│       │                                        │            │
│  ┌────▼─────────────┐  ┌───────────────────┐  │            │
│  │  API Client      │  │  Cloudinary       │  │            │
│  │ (src/lib/api.ts) │  │  Integration      │  │            │
│  │                  │  │ (cloudinary.ts)   │  │            │
│  └────┬─────────────┘  └───────────────────┘  │            │
│       │                                        │            │
│       └───────────────────┬─────────────────────            │
│                           │                                 │
└───────────────────────────┼─────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │  Backend API  │
                    │ (To be built) │
                    │ :3000/api     │
                    └───────┬───────┘
                            │
        ┌───────────────────┴────────────────────┐
        │                                        │
   ┌────▼─────────────┐            ┌────────────▼─────┐
   │    Database      │            │   Cloudinary     │
   │  (MongoDB or     │            │    Cloud         │
   │  PostgreSQL)     │            │  Storage         │
   └──────────────────┘            └──────────────────┘
```

---

## 📁 Directory Structure

```
zovio/client/
│
├── src/
│   ├── pages/                      # Page components (route-based)
│   │   ├── admin/
│   │   │   ├── Dashboard.tsx       # Admin overview dashboard
│   │   │   ├── WorkerManagement.tsx
│   │   │   ├── ServiceManagement.tsx
│   │   │   ├── LocationManagement.tsx
│   │   │   ├── ComplaintsQueries.tsx
│   │   │   ├── Analytics.tsx
│   │   │   └── Settings.tsx
│   │   ├── worker/
│   │   │   └── Dashboard.tsx       # Worker overview
│   │   ├── customer/
│   │   ├── auth/
│   │   └── [other routes]
│   │
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── card.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── [other UI elements]
│   │   ├── BottomNavbar.tsx        # Navigation component
│   │   └── [other components]
│   │
│   ├── lib/                        # Utilities & services
│   │   ├── api.ts                  # 🔴 API client (backend-dependent)
│   │   ├── cloudinary.ts           # Cloudinary integration
│   │   ├── logger.ts               # Debug logging
│   │   └── [utilities]
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useImageUpload.tsx      # Image upload state management
│   │   ├── useApiData.tsx          # Data fetching hooks
│   │   ├── use-mobile.tsx          # Mobile detection
│   │   └── [other hooks]
│   │
│   ├── config/
│   │   └── index.ts                # Configuration constants
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx         # Authentication context
│   │   └── [other contexts]
│   │
│   ├── assets/                     # Static assets
│   │   └── [images, etc]
│   │
│   └── routes/                     # TanStack Router route definitions
│       ├── [route files]
│       └── __root.tsx              # Root layout
│
├── public/                         # Static files
│   ├── images/                     # Service category images
│   └── [other assets]
│
├── [configuration files]
├── .env.example                    # Environment template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── [other configs]
```

---

## 🔄 Data Flow Diagram

### 1. Reading Data (Simple Flow)
```
User visits /admin/workers
        │
        ▼
Router loads WorkerManagement.tsx
        │
        ▼
Component mounts, runs useEffect
        │
        ▼
Call: useApiData() hook
        │
        ▼
Hook calls: workerAPI.getAll()
        │
        ▼
API Client sends: GET /api/workers
        │
        ▼
Backend processes request
        │
        ▼
Database returns worker data
        │
        ▼
Response sent to frontend
        │
        ▼
Hook updates state
        │
        ▼
Component re-renders with data
        │
        ▼
User sees worker list
```

### 2. Creating Data (With Image Upload)
```
User fills form and selects image
        │
        ▼
User clicks "Add Worker"
        │
        ▼
Form validates input
        │
        ▼
useImageUpload hook triggered
        │
        ▼
Image sent to Cloudinary
        ├─────────────────────────────────┐
        │                                 │
    (Frontend)                      (Cloud)
    CloudinaryAPI                        │
    (unsigned upload)              Cloudinary
        │                           stores image
        │                                 │
        ▼◄─────────────────────────────────┘
Got: { url, publicId }
        │
        ▼
Worker data + Cloudinary publicId
sent to backend
        │
        ▼
Backend creates worker record
        │
        ▼
Database stores worker data
        │
        ▼
Response sent to frontend
        │
        ▼
Component updates state
        │
        ▼
User sees new worker in list
```

### 3. Editing Data
```
User clicks Edit on worker
        │
        ▼
Modal opens with current data
        │
        ▼
User modifies fields
        │
        ▼
User clicks Save
        │
        ▼
workerAPI.update(id, updatedData)
        │
        ▼
PUT /api/workers/{id}
        │
        ▼
Backend updates database
        │
        ▼
Response sent to frontend
        │
        ▼
Component refreshes worker list
        │
        ▼
Modal closes
```

---

## 🎯 Component Hierarchy

### Admin Dashboard Page
```
AdminDashboard (main page component)
├── Header
│   ├── Logo
│   ├── Navigation Tabs
│   └── Search Bar
├── Content Area
│   ├── Tab 1: Overview
│   │   ├── Stats Cards (4 items)
│   │   ├── Charts
│   │   └── Recent Activity
│   ├── Tab 2: Workers
│   │   ├── Toolbar
│   │   │   ├── Search Input
│   │   │   ├── Add Button
│   │   │   └── Filters
│   │   ├── Worker List
│   │   │   └── Worker Items (repeating)
│   │   │       ├── Name
│   │   │       ├── Status Badge
│   │   │       └── Action Buttons (Edit, Delete)
│   │   └── Pagination
│   ├── Tab 3: Services
│   │   ├── Service List
│   │   ├── Add Service Button
│   │   └── Service Items
│   ├── Tab 4: Locations
│   │   └── [Similar structure]
│   ├── Tab 5: Complaints
│   │   ├── Complaint List
│   │   └── Complaint Items (expandable)
│   ├── Tab 6: Analytics
│   │   ├── Revenue Chart
│   │   ├── Service Breakdown
│   │   └── Export Button
│   └── Tab 7: Settings
│       └── Setting Controls
└── Modal (Add/Edit/Delete)
    ├── Form
    │   ├── Input Fields
    │   ├── Dropdowns
    │   ├── File Upload
    │   └── Submit Button
    └── Close Button
```

### Worker Dashboard Page
```
WorkerDashboard (worker view)
├── Header
│   ├── Welcome Message
│   └── Worker Name
├── Main Content
│   ├── Active Jobs Section
│   │   ├── Job Cards (repeating)
│   │   │   ├── Job Title
│   │   │   ├── Customer Info
│   │   │   ├── Status Badge
│   │   │   └── Action Button
│   │   └── No Jobs Message (if empty)
│   ├── Earnings Section
│   │   ├── Total Earnings
│   │   ├── This Month
│   │   ├── Earnings Chart
│   │   └── Earnings History
│   └── Scheduling Section
│       ├── Calendar
│       └── Scheduled Jobs
└── Footer Navigation
```

---

## 🔗 Hook Usage Map

### useApiData Hook
**Purpose**: Fetch and manage data from API  
**Used in**: All admin pages, worker dashboard

```typescript
// Example usage:
const { data, loading, error } = useApiData(
  '/workers',
  workerAPI.getAll
);

// Returns:
{
  data: [...workers],      // Array or single object
  loading: false,          // true while fetching
  error: null,            // Error message if failed
  refetch: () => {},      // Manual refresh
}
```

### usePaginatedApiData Hook
**Purpose**: Handle paginated data  
**Used in**: Admin pages with large datasets

```typescript
const {
  items,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
} = usePaginatedApiData(endpoint, fetchFn, pageSize);
```

### useSearchableApiData Hook
**Purpose**: Search and filter data  
**Used in**: Admin pages with search functionality

```typescript
const {
  results,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
} = useSearchableApiData(endpoint, searchFn);
```

### useImageUpload Hook
**Purpose**: Handle image uploads with progress tracking  
**Used in**: Worker form, settings, profile

```typescript
const {
  uploadProgress,
  isUploading,
  error,
  uploadImage,
} = useImageUpload();

// Call on file select:
const handleImageSelect = async (file) => {
  const result = await uploadImage(file, 'workers/worker-1');
};
```

---

## 📤 API Client Structure

### API Client (src/lib/api.ts)
```
Generic apiCall<T>()
├─ Makes fetch requests
├─ Handles errors
└─ Returns standardized response

workerAPI
├─ getAll()
├─ getById(id)
├─ create(data)
├─ update(id, data)
├─ delete(id)
├─ uploadImage(file)
├─ search(query)
└─ filter(filters)

serviceAPI
├─ getAll()
├─ getById(id)
├─ create(data)
├─ update(id, data)
├─ delete(id)
├─ toggleStatus(id, active)
├─ search(query)
└─ filter(filters)

locationAPI
├─ getAll()
├─ getById(id)
├─ create(data)
├─ update(id, data)
├─ delete(id)
├─ search(query)
└─ filter(filters)

complaintAPI
├─ getAll()
├─ getById(id)
├─ create(data)
├─ update(id, data)
├─ addResponse(id, response)
├─ updateStatus(id, status)
├─ search(query)
└─ filter(filters)

analyticsAPI
├─ getDashboard()
├─ getRevenue(dateRange)
├─ getServices()
├─ getLocations()
├─ getWorkers()
├─ getComplaints()
└─ exportReport(type, filters)

settingsAPI
├─ get()
├─ getByKey(key)
├─ update(key, value)
├─ updateMultiple(settings)
└─ resetToDefaults()

exportAPI
├─ workers(filters)
├─ services(filters)
├─ locations(filters)
└─ complaints(filters)
```

---

## 🖼️ Cloudinary Integration Flow

```
Frontend User Action
        │
        ▼
File selected via input
        │
        ▼
useImageUpload() hook receives file
        │
        ▼
Validates: type, size, format
        │
        ▼
uploadToCloudinary(file, subfolder)
        │
        ├─────────────────────────┐
        │                         │
        ▼                         ▼
Create FormData          Prepare headers
        │                         │
        ├─────────────────────────┤
        │
        ▼
POST to Cloudinary API
  (https://api.cloudinary.com/v1_1/.../upload)
        │
        ├──────────────────────────────────┐
        │                                  │
        ▼                                  ▼
Success response                  Error response
        │                                  │
    ┌───▼───────┐                    ┌────▼──────┐
    │ Returns:  │                    │ Returns:  │
    │ - url     │                    │ - error   │
    │ - publicId│                    │ - message │
    └───┬───────┘                    └────┬──────┘
        │                                  │
        ▼                                  ▼
Store in component state         Display error toast
        │                                  │
        ▼                                  ▼
Attach to form data           User can retry
        │
        ▼
Send to backend with other form data
        │
        ▼
Backend creates database record with publicId
        │
        ▼
Cloudinary URL can be generated anytime using getProfilePictureUrl(publicId)
```

---

## 📊 State Management Pattern

### Local Component State
```typescript
// For temporary UI state
const [activeTab, setActiveTab] = useState('Overview');
const [showModal, setShowModal] = useState(false);
const [selectedId, setSelectedId] = useState(null);
```

### Context State (AuthContext)
```typescript
// For app-wide state
export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Usage in components:
const { user, isLoggedIn } = useContext(AuthContext);
```

### Hook-Based State (API Data)
```typescript
// Data fetching with custom hooks
const { data: workers, loading, error } = useApiData(
  '/workers',
  workerAPI.getAll
);

// Image upload state
const { uploadProgress, isUploading } = useImageUpload();
```

---

## 🔐 Authentication Flow (To Be Implemented)

```
User visits /admin
        │
        ▼
Check AuthContext
        │
    ┌───┴─────┐
    │         │
  Yes        No
    │         │
    ▼         ▼
Show admin  Redirect to
 dashboard   /login
    │
    ▼
Load user-specific data
    │
    ▼
Display personalized dashboard
```

---

## 🚀 Performance Optimization

### Current Optimizations
- ✅ Code splitting by route (via TanStack Router)
- ✅ Lazy loading of admin pages
- ✅ Image optimization (Cloudinary)
- ✅ CSS optimization (Tailwind)
- ✅ Component memoization ready

### Recommended Future Optimizations
- 🔜 API response caching
- 🔜 Image preloading
- 🔜 Virtual scrolling for large lists
- 🔜 Request debouncing for search

---

## 🔍 Configuration Map

### Environment Variables (in .env.local)
```env
# Backend API
REACT_APP_API_URL = Where backend API runs
                   (Default: http://localhost:3000/api)

# Cloudinary
REACT_APP_CLOUDINARY_CLOUD_NAME = Your Cloudinary account name
REACT_APP_CLOUDINARY_UPLOAD_PRESET = Upload preset name

# Features
REACT_APP_ENABLE_ANALYTICS = true/false
REACT_APP_ENABLE_EXPORT = true/false
REACT_APP_ENABLE_BULK_OPERATIONS = true/false

# Constraints
REACT_APP_MAX_FILE_SIZE = 5242880 (5MB)
REACT_APP_MAX_WORKERS_PER_PAGE = 10
REACT_APP_PAGINATION_SIZE = 25
```

### Application Constants (in src/config/index.ts)
```typescript
API_ENDPOINTS = {
  workers: '/workers',
  services: '/services',
  locations: '/locations',
  complaints: '/complaints',
  analytics: '/analytics',
  settings: '/settings',
  export: '/export',
}

SERVICE_CATEGORIES = [
  'Home & Repair',
  'Cleaning',
  'Appliances',
  'Outdoor',
  'Personal'
]

COMPLAINT_STATUSES = [
  'Open',
  'In Progress',
  'Resolved',
  'Closed'
]

COMPLAINT_PRIORITIES = [
  'Low',
  'Medium',
  'High',
  'Critical'
]
```

---

## 🎨 Styling Architecture

### Design System
```
Tailwind CSS + shadcn/ui
├── Colors (brand + semantic)
├── Spacing (consistent 4px grid)
├── Typography (Headings, Body, Small)
├── Components (pre-built UI elements)
└── Responsive Breakpoints (mobile, tablet, desktop)
```

### Component Styling
- Using Tailwind utility classes
- Responsive classes (md:, lg:, etc)
- Dark mode ready (through Tailwind config)

---

## ✅ Integration Checklist by Component

### Backend Dependencies by Page

| Page | APIs Needed | Status |
|------|-----------|--------|
| Admin Dashboard | /analytics/dashboard, /workers, /services | ⏳ Backend |
| Worker Mgmt | /workers (full CRUD) | ⏳ Backend |
| Service Mgmt | /services (full CRUD) | ⏳ Backend |
| Location Mgmt | /locations (full CRUD) | ⏳ Backend |
| Complaints | /complaints (full CRUD + responses) | ⏳ Backend |
| Analytics | /analytics/* + /export/* | ⏳ Backend |
| Settings | /settings (get/update) | ⏳ Backend |

---

**Architecture Version**: 1.0  
**Frontend Status**: ✅ Complete & Production Ready  
**Backend Status**: ⏳ Awaiting Implementation  
**Last Updated**: September 10, 2026
