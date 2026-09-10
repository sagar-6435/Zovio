# Database and Cloudinary Integration Guide

## 🎯 Complete Setup Instructions

This guide walks you through setting up database storage and Cloudinary image uploads for your Zovio admin system.

---

## 📋 Pre-requisites

- Node.js 16+ installed
- MongoDB or PostgreSQL available
- Cloudinary account (free tier available at cloudinary.com)
- Backend framework (Express, NestJS, or similar)

---

## 1️⃣ DATABASE SETUP

### Option A: MongoDB Setup

#### Local MongoDB

```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community

# Start MongoDB service
mongod

# Connect to MongoDB
mongo

# Create database
use zovio_db

# Create collections
db.createCollection('workers')
db.createCollection('services')
db.createCollection('locations')
db.createCollection('complaints')
db.createCollection('analytics')
db.createCollection('settings')
```

#### MongoDB Atlas (Cloud)

```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Add database user
4. Get connection string: mongodb+srv://user:pass@cluster.mongodb.net/dbname
5. Use in MONGODB_URI environment variable
```

### Option B: PostgreSQL Setup

```sql
-- Create database
CREATE DATABASE zovio_db;

-- Connect to database
\c zovio_db

-- Create tables
CREATE TABLE workers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(50),
  location VARCHAR(100),
  status VARCHAR(20) DEFAULT 'Active',
  join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rating DECIMAL(3,1) DEFAULT 0,
  completed_jobs INT DEFAULT 0,
  profile_image_url VARCHAR(500),
  profile_image_public_id VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_workers_email ON workers(email);
CREATE INDEX idx_workers_service ON workers(service);
CREATE INDEX idx_workers_location ON workers(location);

-- Similar tables for services, locations, complaints, analytics, settings
```

---

## 2️⃣ CLOUDINARY SETUP

### Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com
2. Sign up for free account
3. Go to Dashboard
4. Note your Cloud Name, API Key, API Secret

### Step 2: Configure Upload Settings

1. Go to Settings → Upload
2. Create new Upload Preset
3. Name it: `zovio-workers`
4. Signing Mode: Unsigned
5. Resource Type: Image
6. Save

### Step 3: Create Folder Structure

In Dashboard → Media Library:
- Create folder: `home/zovio/staff`
  - This is where all worker images will be stored

### Step 4: Set Environment Variables

**Frontend (.env or .env.local):**

```env
REACT_APP_CLOUDINARY_CLOUD_NAME=abc123xyz
REACT_APP_CLOUDINARY_UPLOAD_PRESET=zovio-workers
REACT_APP_API_URL=http://localhost:3000/api
```

**Backend (.env):**

```env
CLOUDINARY_CLOUD_NAME=abc123xyz
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=home/zovio/staff
```

---

## 3️⃣ BACKEND IMPLEMENTATION

### Step 1: Install Dependencies

```bash
npm install express mongoose cloudinary multer dotenv cors helmet
```

### Step 2: Create Backend Project Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── Worker.js
│   │   ├── Service.js
│   │   ├── Location.js
│   │   ├── Complaint.js
│   │   └── Settings.js
│   ├── routes/
│   │   ├── workers.js
│   │   ├── services.js
│   │   ├── locations.js
│   │   ├── complaints.js
│   │   ├── analytics.js
│   │   └── settings.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   └── app.js
├── .env
└── package.json
```

### Step 3: Database Connection (app.js)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zovio_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/workers', require('./routes/workers'));
app.use('/api/services', require('./routes/services'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/settings', require('./routes/settings'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 4: Cloudinary Configuration (config/cloudinary.js)

```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

### Step 5: Worker Model (models/Worker.js)

```javascript
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  service: String,
  location: String,
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Suspended'], 
    default: 'Active' 
  },
  joinDate: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  verification: String,
  bankDetails: Boolean,
  profileImage: {
    url: String,
    publicId: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);
```

### Step 6: Worker Routes with Image Upload (routes/workers.js)

```javascript
const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Worker = require('../models/Worker');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload image to Cloudinary
async function uploadToCloudinary(buffer, workerId) {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER,
        public_id: `worker_${workerId}`,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    upload.end(buffer);
  });
}

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

// Upload worker image
router.post('/:id/upload-image', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    const workerId = req.params.id;
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, workerId);

    // Update worker in database
    const worker = await Worker.findByIdAndUpdate(
      workerId,
      {
        profileImage: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      data: worker,
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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
    const worker = await Worker.findByIdAndDelete(req.params.id);
    
    // Delete image from Cloudinary
    if (worker.profileImage?.publicId) {
      await cloudinary.uploader.destroy(worker.profileImage.publicId);
    }
    
    res.json({ success: true, message: 'Worker deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

---

## 4️⃣ FRONTEND INTEGRATION

### Update Worker Management Component

```typescript
// src/pages/admin/WorkerManagement.tsx
import { useState } from 'react';
import { workerAPI } from '@/lib/api';
import { uploadWorkerImage } from '@/lib/cloudinary';

export default function WorkerManagement() {
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Load workers from database
  const loadWorkers = async () => {
    const response = await workerAPI.getAll();
    if (response.success) {
      setWorkers(response.data);
    }
  };

  // Handle add worker with image
  const handleAddWorker = async (formData: any) => {
    try {
      // Create worker first
      const workerResponse = await workerAPI.create(formData);
      
      if (workerResponse.success && selectedFile) {
        // Upload image
        const imageResult = await uploadWorkerImage(
          selectedFile,
          workerResponse.data._id
        );
        
        if (imageResult.success) {
          // Update worker with image URL
          await workerAPI.update(workerResponse.data._id, {
            profileImage: {
              url: imageResult.url,
              publicId: imageResult.publicId,
            },
          });
        }
      }

      loadWorkers();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding worker:', error);
    }
  };

  // Load on component mount
  useEffect(() => {
    loadWorkers();
  }, []);

  return (
    // ... JSX with worker table and forms
  );
}
```

---

## 5️⃣ TESTING

### Test Database Connection

```bash
# MongoDB
mongo
db.workers.find()

# PostgreSQL
psql -U postgres -d zovio_db
SELECT * FROM workers;
```

### Test API Endpoints

```bash
# Get workers
curl http://localhost:3000/api/workers

# Create worker
curl -X POST http://localhost:3000/api/workers \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"+919876543210",
    "service":"Plumbing",
    "location":"North Delhi"
  }'

# Upload image
curl -X POST http://localhost:3000/api/workers/123/upload-image \
  -F "file=@/path/to/image.jpg"
```

### Test Cloudinary Upload

```javascript
// In frontend console
import { uploadWorkerImage } from '@/lib/cloudinary';

const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
const result = await uploadWorkerImage(file, 'test-worker-id');
console.log(result);
```

---

## 🔐 Security Best Practices

1. **Never expose API keys in frontend**
   - Keep Cloudinary API secret in backend only
   - Use unsigned uploads for frontend
   - Use upload presets for controlled uploads

2. **Validate file uploads**
   - Check file size (max 5MB)
   - Validate MIME types
   - Scan for malware

3. **Database security**
   - Use strong passwords
   - Enable encryption
   - Regular backups
   - Monitor access logs

4. **API security**
   - Implement rate limiting
   - Add CORS restrictions
   - Use HTTPS
   - Validate all inputs

---

## 📊 Deployment

### Deploy Backend to Heroku

```bash
# Create Procfile
echo "web: node src/app.js" > Procfile

# Deploy
git push heroku main

# Set environment variables
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set CLOUDINARY_CLOUD_NAME=<your-cloud-name>
heroku config:set CLOUDINARY_API_KEY=<your-api-key>
heroku config:set CLOUDINARY_API_SECRET=<your-api-secret>
```

### Deploy Frontend to Vercel

```bash
# Update API URL
REACT_APP_API_URL=https://your-backend.herokuapp.com/api

# Deploy
vercel deploy --prod
```

---

## ✅ Verification Checklist

- [ ] MongoDB/PostgreSQL running and connected
- [ ] Cloudinary account created and configured
- [ ] Environment variables set in both frontend and backend
- [ ] Worker upload endpoint tested
- [ ] Images appearing in Cloudinary dashboard
- [ ] Worker data saved in database
- [ ] API endpoints responding correctly
- [ ] CORS properly configured
- [ ] Images displaying in admin dashboard
- [ ] Export functionality working with real data

---

This setup provides complete database storage and image management for your Zovio admin system!
