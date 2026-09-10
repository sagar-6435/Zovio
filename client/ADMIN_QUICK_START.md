# Admin System - Quick Start Guide

## 🎯 Main Admin URLs

| Feature | URL | Purpose |
|---------|-----|---------|
| **Main Dashboard** | `/admin` | Overview & statistics |
| **Worker Management** | `/admin/workers` | Add, view, edit workers |
| **Service Management** | `/admin/services` | Manage services catalog |
| **Location Management** | `/admin/locations` | Add & manage service areas |
| **Complaints & Queries** | `/admin/complaints` | Handle customer issues |

---

## ✨ Key Features Summary

### 👷 Worker Management (`/admin/workers`)
**What you can do:**
- ➕ Add new workers to the platform
- 📋 View all workers with search & filters
- ✏️ Edit worker information
- 🗑️ Delete workers
- 📊 View detailed worker profiles
- 📥 Export worker data to CSV

**Search & Filter Options:**
- By name, email, or phone number
- By service type (Plumbing, Electrical, Carpentry, etc.)
- By status (Active, Inactive, Suspended)

---

### 🔧 Service Management (`/admin/services`)
**What you can do:**
- ➕ Add new services to the platform
- 📋 View all services as cards
- ✏️ Edit service details
- 🗑️ Delete services
- 🔄 Toggle service status (Active/Inactive)
- 📊 View service performance metrics
- 📥 Export service data to CSV

**Service Information:**
- Service name & category
- Base pricing
- Worker availability
- Demand level (Very High, High, Medium, Low)
- Customer ratings
- Completed services count

---

### 📍 Location Management (`/admin/locations`)
**What you can do:**
- ➕ Add new service locations/zones
- 📋 View all locations as cards
- ✏️ Edit location details
- 🗑️ Delete locations
- 📊 View location performance metrics
- 📥 Export location data to CSV

**Location Information:**
- Location name & zone
- Service pin code coverage
- Number of active workers
- Available services
- Monthly revenue
- Monthly bookings
- Customer ratings

---

### 💬 Complaints & Queries (`/admin/complaints`)
**What you can do:**
- 📋 View all complaints and queries
- 🔍 Search and filter by multiple criteria
- 👁️ View detailed issue information
- 📝 Add responses and resolutions
- ⏫ Update issue status (Open → In Progress → Resolved)
- 🎯 Prioritize by severity level
- 📥 Export complaint data to CSV

**Issue Types:**
- **Complaints** - Service quality, late arrival, billing, safety
- **Queries** - How-to, policy, general support

**Priority Levels:**
- 🔴 Critical (red) - Emergency/Safety
- 🟠 High (orange) - Serious issues
- 🟡 Medium (yellow) - Regular issues
- 🟢 Low (green) - General queries

---

## 🎮 How to Use

### Adding a Worker
```
1. Go to /admin/workers
2. Click "Add Worker" button (top right)
3. Fill in the form:
   - Full Name
   - Email
   - Phone (+91 format)
   - Service Type (dropdown)
   - Location (dropdown)
4. Click "Add Worker"
```

### Adding a Service
```
1. Go to /admin/services
2. Click "Add Service" button
3. Fill in the form:
   - Service Name
   - Category
   - Description
4. Click "Add Service"
```

### Adding a Location
```
1. Go to /admin/locations
2. Click "Add Location" button
3. Fill in the form:
   - Location Name (e.g., "North Delhi")
   - Zone (e.g., "Delhi NCR")
   - City
4. Click "Add Location"
```

### Resolving a Complaint
```
1. Go to /admin/complaints
2. Click "View Details" on the complaint
3. Read the issue details
4. Type your response in "Add Response" box
5. Click "Send Response"
6. Issue status auto-changes to "Resolved"
```

---

## 🔍 Search & Filter Tips

### Quick Searches
- **Workers:** Type name, email, or phone
- **Services:** Type service name or category
- **Locations:** Type location name or city
- **Complaints:** Type title or customer name

### Advanced Filters
All pages have dropdowns to filter by:
- Status (Active, Inactive, etc.)
- Type (Complaint, Query)
- Priority (Critical, High, Medium, Low)
- Category (for services)

---

## 📊 Common Tasks

### Task 1: Disable a Problematic Service
```
1. Go to /admin/services
2. Find the service card
3. Click the toggle button (OFF)
4. Service becomes inactive
```

### Task 2: Find All Complaints for a Worker
```
1. Go to /admin/complaints
2. Search for worker name
3. View all related complaints
4. Update status and add response
```

### Task 3: Check Location Performance
```
1. Go to /admin/locations
2. Click "View Details" on location
3. See:
   - Revenue this month
   - Bookings count
   - Active workers
   - Services available
   - Customer rating
```

### Task 4: Export Data for Reports
```
1. On any management page
2. Apply filters (optional)
3. Click "Export" button (top right)
4. CSV file downloads automatically
5. Open in Excel/Google Sheets
```

---

## 🎯 Dashboard Overview (`/admin`)

The main dashboard shows:
- **Total Users** - Count of all users
- **Active Services** - Number of running services
- **Total Revenue** - Monthly/overall earnings
- **Locations** - Number of service areas
- **Quick Stats** - Active workers, services, locations, complaints
- **Recent Complaints** - Latest 3 issues needing attention

---

## 💡 Pro Tips

1. **Search First** - Use search to find specific workers/services quickly
2. **Filters Help** - Combine filters to narrow down results
3. **Export Data** - Use CSV export for reports and backups
4. **Check Details** - Click "View Details" to see complete information
5. **Update Status** - Keep complaint status updated for tracking
6. **Priority Levels** - Focus on Critical priority items first
7. **Multi-Filter** - You can combine search + filters for precise results

---

## ⚠️ Important Notes

1. **Delete Confirmation** - Always confirm before deleting (can't undo)
2. **Status Updates** - Update complaint status as you work on them
3. **Response Required** - Add response before resolving complaints
4. **Location Coverage** - Ensure pin code ranges don't overlap
5. **Service Categories** - Use consistent category names

---

## 📞 Support

For issues or questions:
- Check the detailed documentation in `ADMIN_SYSTEM.md`
- Review data models and structure
- Check modal forms for all available fields
- Ensure all required fields are filled

---

## 🚀 Getting Started Now

1. **First Time?** Start with `/admin` to see overview
2. **Add Workers?** Go to `/admin/workers` and click "Add Worker"
3. **Setup Services?** Go to `/admin/services` and create services
4. **Define Areas?** Go to `/admin/locations` and add locations
5. **Handle Issues?** Go to `/admin/complaints` and manage feedback

**Happy Managing! 🎉**
