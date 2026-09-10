# Backend Setup Guide - Zovio Admin System

## 🎯 Overview

This guide shows how to set up the backend to store admin system data in a database and integrate Cloudinary for worker image uploads.

---

## 📦 Backend Technology Stack

### Recommended Setup
- **Runtime:** Node.js (v16+)
- **Framework:** Express.js or NestJS
- **Database:** MongoDB or PostgreSQL
- **Image Storage:** Cloudinary
- **Authentication:** JWT
- **Validation:** Joi or Zod

---

## 🗄️ Database Schema

### Workers Table/Collection

```javascript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone: string,
  service: string,
  location: string,
  status: 'Active' | 'Inactive' | 'Suspended',
  joinDate: date,
  rating: number,
  completedJobs: number,
  verification: string,
  bankDetails: boolean,
  profileImage: {
    url: string,        // Cloudinary URL
    publicId: string    // Cloudinary public ID
  },
  createdAt: date,
  updatedAt: date
}
```

### Services Table/Collection

```javascript
{
  _id: ObjectId,
  name: string,
  category: string,
  description: string,
  icon: string,
  basePrice: string,
  active: boolean,
  workersAvailable: number,
  completedServices: number,
  avgRating: number,
  demandLevel: string,
  createdAt: date,
  updatedAt: date
}
```

### Locations Table/Collection

```javascript
{
  _id: ObjectId,
  name: string,
  zone: string,
  city: string,
  state: string,
  pincode: string,
  activeWorkers: number,
  activeServices: number,
  revenue: string,
  monthlyBookings: number,
  avgRating: number,
  status: 'Active' | 'Inactive',
  operatingSince: date,
  createdAt: date,
  updatedAt: date
}
```

### Complaints Table/Collection

```javascript
{
  _id: ObjectId,
  type: 'Complaint' | 'Query',
  title: string,
  customer: string,
  worker: string,
  service: string,
  description: string,
  dateSubmitted: date,
  priority: 'Critical' | 'High' | 'Medium' | 'Low',
  status: 'Open' | 'In Progress' | 'Resolved',
  resolution: string,
  attachments: number,
  assignedTo: string,
  createdAt: date,
  updatedAt: date
}
```

### Analytics Table/Collection

```javascript
{
  _id: ObjectId,
  date: date,
  revenue: number,
  bookings: number,
  workers: number,
  services: number,
  locations: number,
  complaintCount: number,
  resolvedComplaints: number,
  avgRating: number,
  createdAt: date
}
```

### Settings Table/Collection

```javascript
{
  _id: ObjectId,
  key: string,
  value: any,
  type: string,
  description: string,
  updatedAt: date,
  updatedBy: string
}
```

---

## 🔌 API Endpoints

### Workers Endpoints

```
GET    /api/workers                 # Get all workers
POST   /api/workers                 # Create worker
GET    /api/workers/:id             # Get worker by ID
PUT    /api/workers/:id             # Update worker
DELETE /api/workers/:id             # Delete worker
GET    /api/workers/search?q=       # Search workers
POST   /api/workers/filter          # Filter workers
POST   /api/workers/upload-image    # Upload worker image
```

### Services Endpoints

```
GET    /api/services                # Get all services
POST   /api/services                # Create service
GET    /api/services/:id            # Get service by ID
PUT    /api/services/:id            # Update service
DELETE /api/services/:id            # Delete service
PATCH  /api/services/:id            # Toggle service status
GET    /api/services/search?q=      # Search services
POST   /api/services/filter         # Filter services
```

### Locations Endpoints

```
GET    /api/locations               # Get all locations
POST   /api/locations               # Create location
GET    /api/locations/:id           # Get location by ID
PUT    /api/locations/:id           # Update location
DELETE /api/locations/:id           # Delete location
GET    /api/locations/search?q=     # Search locations
POST   /api/locations/filter        # Filter locations
```

### Complaints Endpoints

```
GET    /api/complaints              # Get all complaints
POST   /api/complaints              # Create complaint
GET    /api/complaints/:id          # Get complaint by ID
PUT    /api/complaints/:id          # Update complaint
PATCH  /api/complaints/:id          # Update status
POST   /api/complaints/:id/response # Add response
GET    /api/complaints/search?q=    # Search complaints
POST   /api/complaints/filter       # Filter complaints
```

### Analytics Endpoints

```
GET    /api/analytics/dashboard     # Dashboard data
GET    /api/analytics/revenue       # Revenue data
GET    /api/analytics/services      # Service analytics
GET    /api/analytics/locations     # Location analytics
GET    /api/analytics/workers       # Worker analytics
GET    /api/analytics/complaints    # Complaint analytics
POST   /api/analytics/export        # Export report
```

### Settings Endpoints

```
GET    /api/settings                # Get all settings
GET    /api/settings/:key           # Get setting by key
PUT    /api/settings/:key           # Update setting
PUT    /api/settings                # Update multiple
POST   /api/settings/reset          # Reset to defaults
```

### Export Endpoints

```
POST   /api/export/workers          # Export workers to CSV
POST   /api/export/services         # Export services to CSV
POST   /api/export/locations        # Export locations to CSV
POST   /api/export/complaints       # Export complaints to CSV
```

---

## 🖼️ Image Upload Setup

### Cloudinary Configuration

1. **Create Cloudinary Account**
   - Sign up at https://cloudinary.com
   - Get your Cloud Name, API Key, API Secret

2. **Get Upload Preset**
   - Go to Upload Settings
   - Create unsigned upload preset
   - Name it (e.g., "zovio-workers")

3. **Set Environment Variables**

**Frontend (.env):**
```
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=zovio-workers
REACT_APP_API_URL=http://localhost:3000/api
```

**Backend (.env):**
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=home/zovio/staff
```

### Backend Image Upload Handler (Node.js/Express)

```javascript
const cloudinary = require('cloudinary').v2;
const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Worker Image Endpoint
router.post('/workers/upload-image', upload.single('file'), async (req, res) => {
  try {
    const file = req.body.file;
    const workerId = req.body.workerId;

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'home/zovio/staff',
          public_id: workerId,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      upload.end(file.buffer);
    });

    // Save to database
    await Worker.findByIdAndUpdate(workerId, {
      profileImage: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
```

---

## 🗄️ Example Backend Implementation (Express + MongoDB)

### 1. Worker Routes

```javascript
// routes/workers.js
const express = require('express');
const Worker = require('../models/Worker');
const router = express.Router();

// Get all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json({ success: true, data: workers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create worker
router.post('/', async (req, res) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update worker
router.put('/:id', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: worker });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete worker
router.delete('/:id', async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Worker deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Search workers
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const workers = await Worker.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
      ],
    });
    res.json({ success: true, data: workers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

### 2. Mongoose Models

```javascript
// models/Worker.js
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  service: String,
  location: String,
  status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
  joinDate: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  verification: String,
  bankDetails: Boolean,
  profileImage: {
    url: String,
    publicId: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Worker', workerSchema);
```

---

## 🚀 Frontend Integration

### Using the API Client

```typescript
import { workerAPI, uploadToCloudinary } from '@/lib/api';
import { uploadWorkerImage } from '@/lib/cloudinary';

// Get all workers
const response = await workerAPI.getAll();

// Create worker with image
const handleAddWorker = async (workerData, imageFile) => {
  // First upload image to Cloudinary
  const imageResult = await uploadWorkerImage(imageFile, workerData.id);

  if (imageResult.success) {
    // Then save worker with image URL
    const result = await workerAPI.create({
      ...workerData,
      profileImage: {
        url: imageResult.url,
        publicId: imageResult.publicId,
      },
    });
  }
};

// Update worker
await workerAPI.update(workerId, updatedData);

// Delete worker
await workerAPI.delete(workerId);

// Search workers
const results = await workerAPI.search('john');

// Filter workers
const filtered = await workerAPI.filter({
  service: 'Plumbing',
  location: 'North Delhi',
  status: 'Active',
});
```

---

## 🔐 Security Considerations

### Best Practices

1. **Authentication**
   - Implement JWT tokens
   - Validate tokens on every request
   - Refresh token rotation

2. **Authorization**
   - Role-based access control (RBAC)
   - Check permissions for each operation
   - Admin-only endpoints

3. **Data Validation**
   - Validate all inputs server-side
   - Use schema validation (Joi, Zod)
   - Sanitize user inputs

4. **Image Security**
   - Validate file types
   - Check file size limits
   - Scan for malware
   - Use secure upload endpoints

5. **Database Security**
   - Use environment variables for credentials
   - Enable encryption at rest
   - Regular backups
   - SQL injection prevention (parameterized queries)

6. **API Security**
   - Rate limiting
   - CORS configuration
   - HTTPS only
   - API key management

---

## 📊 Database Indexes

```javascript
// Recommended indexes for performance
db.workers.createIndex({ email: 1 });
db.workers.createIndex({ phone: 1 });
db.workers.createIndex({ service: 1 });
db.workers.createIndex({ location: 1 });
db.workers.createIndex({ status: 1 });

db.services.createIndex({ name: 1 });
db.services.createIndex({ category: 1 });
db.services.createIndex({ active: 1 });

db.locations.createIndex({ name: 1 });
db.locations.createIndex({ city: 1 });
db.locations.createIndex({ zone: 1 });

db.complaints.createIndex({ type: 1 });
db.complaints.createIndex({ status: 1 });
db.complaints.createIndex({ priority: 1 });
db.complaints.createIndex({ dateSubmitted: -1 });
```

---

## 📝 Environment Variables

### Frontend (.env.local)

```
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=zovio-workers
```

### Backend (.env)

```
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/zovio
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=home/zovio/staff
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d
```

---

## 🧪 Testing APIs

### Using cURL

```bash
# Get all workers
curl http://localhost:3000/api/workers

# Create worker
curl -X POST http://localhost:3000/api/workers \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","phone":"+919876543210"}'

# Update worker
curl -X PUT http://localhost:3000/api/workers/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"Active"}'

# Delete worker
curl -X DELETE http://localhost:3000/api/workers/1
```

### Using Postman

1. Create collection "Zovio Admin API"
2. Create requests for each endpoint
3. Set base URL: {{baseUrl}}/api
4. Use environment variables
5. Test all CRUD operations

---

## 📦 Dependencies Required

### Backend

```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "cloudinary": "^1.32.0",
  "multer": "^1.4.5",
  "dotenv": "^16.0.0",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "joi": "^17.0.0"
}
```

### Frontend

```json
{
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "lucide-react": "^latest"
}
```

---

## 🚀 Deployment Checklist

- [ ] Database configured and running
- [ ] Cloudinary account setup and tested
- [ ] Environment variables set
- [ ] All endpoints tested
- [ ] Authentication implemented
- [ ] Error handling in place
- [ ] Logging configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Monitoring setup
- [ ] Backups configured
- [ ] Security audit done

---

## 📞 Support

For backend issues:
- Check API responses
- Review logs
- Test endpoints with Postman
- Verify environment variables
- Check database connection

---

This backend setup provides a complete foundation for your Zovio admin system with database storage and Cloudinary image integration!
