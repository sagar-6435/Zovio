# Admin Management System

## Overview
A comprehensive admin dashboard system for managing the Zovio service marketplace with complete control over workers, services, locations, and customer complaints/queries.

## Features Implemented

### 1. **Admin Dashboard** (`/admin`)
The main admin hub with overview and quick access to all management features.

**Features:**
- Overview statistics (Total Users, Active Services, Revenue, Locations)
- Quick stats sidebar showing active workers, services, locations, and open complaints
- Recent complaints preview
- Tab-based navigation to all management sections
- Add/Edit/Delete functionality with modal forms

**URL:** `/admin`

---

### 2. **Worker Management** (`/admin/workers`)
Complete worker lifecycle management system.

**Features:**
- ✅ **Add Workers** - Form modal with fields:
  - Full Name
  - Email & Phone Number
  - Service Type (Plumbing, Electrical, Carpentry, Cleaning, AC Repair)
  - Operating Location
  - Auto-generated join date and rating

- ✅ **View Workers** - Comprehensive table with:
  - Name, contact info, service type, location
  - Status (Active/Inactive/Suspended)
  - Rating and completed jobs count
  - Search by name, email, or phone
  - Filter by service type and status

- ✅ **Edit Workers** - Modify worker details
- ✅ **Delete Workers** - Remove workers with confirmation
- ✅ **Worker Details Modal** - View detailed information:
  - Personal information
  - Professional details (service, location, rating, jobs completed)
  - Verification status (ID Verification, Bank Details)
  - Current status

- **Export Feature** - Download worker data as CSV

**URL:** `/admin/workers`

---

### 3. **Service Management** (`/admin/services`)
Full service catalog management.

**Features:**
- ✅ **Add Services** - Create new services with:
  - Service Name
  - Category (Home & Repair, Cleaning, Appliances, Technology, Beauty)
  - Description
  - Base pricing information

- ✅ **View Services** - Grid view with service cards showing:
  - Service icon and name
  - Category and description
  - Base price
  - Active status toggle
  - Available workers count
  - Demand level indicator
  - Completed services count
  - Average rating

- ✅ **Edit Services** - Modify service details
- ✅ **Delete Services** - Remove services with confirmation
- ✅ **Toggle Status** - Enable/disable services with toggle button
- ✅ **Service Details Modal** - Comprehensive view:
  - Service description
  - Category and pricing
  - Performance metrics (workers, completed services, demand)
  - Active status

- **Advanced Features:**
  - Search by service name or category
  - Filter by category and status
  - Demand level visualization (Very High, High, Medium, Low)
  - Rating-based sorting capability
  - Export to CSV

**URL:** `/admin/services`

---

### 4. **Location Management** (`/admin/locations`)
Geographic service coverage management.

**Features:**
- ✅ **Add Locations** - Create service areas with:
  - Location Name (e.g., North Delhi)
  - Zone/Region
  - City/State
  - Pin code coverage range

- ✅ **View Locations** - Card-based layout showing:
  - Location name with map icon
  - Zone and city information
  - Service area pin codes
  - Active workers in area
  - Services available
  - Monthly revenue
  - Monthly bookings count
  - Average customer rating
  - Operating status

- ✅ **Edit Locations** - Modify location details
- ✅ **Delete Locations** - Remove locations with confirmation
- ✅ **Location Details Modal** - Detailed view with:
  - Complete location information
  - Performance metrics:
    - Active workers count
    - Service offerings
    - Monthly revenue
    - Booking volume
    - Customer rating
  - Operating history (since date)
  - Current status

- **Management Features:**
  - Search by location name, city, or zone
  - Filter by operational status
  - Revenue tracking per location
  - Performance analytics

**URL:** `/admin/locations`

---

### 5. **Complaints & Queries Management** (`/admin/complaints`)
Customer issue resolution and support system.

**Features:**
- ✅ **View Complaints & Queries** - List all issues with type indicators:
  - **Complaints** - Service quality, late arrival, billing issues, safety concerns
  - **Queries** - How-to questions, policy inquiries, general support

- ✅ **Issue Status Management**:
  - Open (awaiting action)
  - In Progress (being investigated)
  - Resolved (completed)
  - Change status via dropdown

- ✅ **Priority Levels**:
  - Critical (red) - Safety/emergency issues
  - High (orange) - Serious complaints
  - Medium (yellow) - Regular issues
  - Low (green) - General queries

- ✅ **Issue Details Modal** showing:
  - Full issue description
  - Customer name and details
  - Worker involved (if applicable)
  - Priority and status
  - Resolution history
  - Timeline
  - Attachments count

- ✅ **Response System**:
  - Add detailed responses to issues
  - Auto-mark as resolved when response sent
  - Track all communications

- **Advanced Features:**
  - Summary cards (Total, Open, In Progress, Resolved counts)
  - Multi-filter search:
    - By title or customer name
    - By type (Complaint/Query)
    - By status
    - By priority level
  - Export complaint data to CSV
  - Assigned team tracking
  - Date-based filtering
  - High-priority alerts

**URL:** `/admin/complaints`

---

## Available Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/admin` | Admin Dashboard | Main admin hub with overview |
| `/admin/workers` | Worker Management | Add, view, edit, delete workers |
| `/admin/services` | Service Management | Manage service catalog |
| `/admin/locations` | Location Management | Manage service coverage areas |
| `/admin/complaints` | Complaints & Queries | Handle customer issues |

---

## UI Components & Features

### Common Features Across All Pages:
- ✅ Search functionality
- ✅ Advanced filtering options
- ✅ CSV export capability
- ✅ Add/Edit/Delete operations
- ✅ Modal dialogs for detailed views
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Status indicators with color coding
- ✅ Performance metrics and analytics

### Design Patterns:
- **Color-coded statuses** - Quick visual identification
- **Card-based layouts** - Easy scanning of information
- **Modal forms** - Non-disruptive data entry
- **Confirmation dialogs** - Prevent accidental deletion
- **Real-time filtering** - Instant search results
- **Data export** - CSV downloads for reporting

---

## Data Models

### Worker
```typescript
{
  id: number
  name: string
  email: string
  phone: string
  service: string
  location: string
  status: 'Active' | 'Inactive' | 'Suspended'
  joinDate: date
  rating: number
  completedJobs: number
  verification: string
  bankDetails: string
}
```

### Service
```typescript
{
  id: number
  name: string
  category: string
  description: string
  icon: string
  basePrice: string
  active: boolean
  workersAvailable: number
  completedServices: number
  avgRating: number
  demandLevel: 'Very High' | 'High' | 'Medium' | 'Low'
}
```

### Location
```typescript
{
  id: number
  name: string
  zone: string
  city: string
  state: string
  pincode: string
  activeWorkers: number
  activeServices: number
  revenue: string
  monthlyBookings: number
  avgRating: number
  status: 'Active' | 'Inactive'
  operatingSince: date
}
```

### Complaint/Query
```typescript
{
  id: number
  type: 'Complaint' | 'Query'
  title: string
  customer: string
  worker?: string
  service?: string
  description: string
  dateSubmitted: date
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In Progress' | 'Resolved'
  resolution?: string
  attachments: number
  assignedTo: string
}
```

---

## Key Functionalities

### 1. Location-Based Service Management
- Services operate within defined geographic locations
- Track workers assigned to each location
- Monitor service availability per location
- Revenue tracking by location
- Performance metrics per service area

### 2. Worker Lifecycle Management
- Onboard new workers with verification
- Assign workers to specific locations and services
- Track worker performance (rating, completed jobs)
- Suspend or deactivate workers as needed
- Update worker information and assignments

### 3. Service Catalog Control
- Add new services to the platform
- Categorize services for easy browsing
- Set base pricing and demand levels
- Track service popularity and ratings
- Enable/disable services dynamically
- Monitor worker availability per service

### 4. Complaint Resolution System
- Log and track all customer complaints
- Prioritize issues by severity
- Assign issues to appropriate teams
- Track resolution progress
- Maintain communication history
- Generate reports for analysis

---

## Usage Guide

### Adding a Worker
1. Go to `/admin/workers`
2. Click "Add Worker" button
3. Fill in personal details (name, email, phone)
4. Select service type (Plumbing, Electrical, etc.)
5. Select operating location
6. Submit form

### Adding a Service
1. Go to `/admin/services`
2. Click "Add Service" button
3. Enter service name and description
4. Select category
5. Set base pricing
6. Submit form

### Adding a Location
1. Go to `/admin/locations`
2. Click "Add Location" button
3. Enter location name and zone
4. Specify city and pin code coverage
5. Submit form

### Managing Complaints
1. Go to `/admin/complaints`
2. View all complaints in list
3. Click "View Details" for full information
4. Update status (Open → In Progress → Resolved)
5. Add response and resolution details
6. Export data for reporting

---

## Styling & Design
- Uses Tailwind CSS for responsive design
- Brand colors: brand-teal, brand-orange, brand-deep-navy
- Consistent spacing and typography
- Professional, clean interface
- Mobile-first responsive approach
- Accessible color contrasts
- Hover states and transitions for better UX

---

## Next Steps / Enhancements

Potential features to add:
- Real-time notifications for new complaints
- Advanced analytics and reporting
- Worker performance dashboards
- Service demand forecasting
- Automated email notifications
- Bulk operations (add/update multiple items)
- Role-based admin access (Super Admin, Location Manager, etc.)
- Audit logging for all admin actions
- Integration with payment system
- Scheduled service area activations

