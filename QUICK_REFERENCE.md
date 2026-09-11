# Quick Reference Guide
**Last Updated**: September 10, 2026

---

## 🚀 START HERE

### Running Both Servers

**Terminal 1 - Frontend**:
```bash
cd c:\My projects\zovio\client
npm run dev
# Opens http://localhost:5173
```

**Terminal 2 - Backend**:
```bash
cd c:\My projects\zovio\server
npm run dev
# Server running on http://localhost:5000
```

---

## 🌐 Access Points

| App | URL | Purpose |
|-----|-----|---------|
| Admin Dashboard | http://localhost:5173/admin | Manage all features |
| Workers | http://localhost:5173/admin/workers | Manage workers |
| Services | http://localhost:5173/admin/services | Manage services |
| Locations | http://localhost:5173/admin/locations | Manage locations |
| Complaints | http://localhost:5173/admin/complaints | Manage complaints |
| Analytics | http://localhost:5173/admin/analytics | View analytics |
| Settings | http://localhost:5173/admin/settings | Configure settings |
| Home | http://localhost:5173 | Main page |

---

## 🔧 Key Configuration

### Frontend API
```
Base URL: http://localhost:5000/api
Endpoints: /admin/workers, /admin/services, etc.
File: client/src/lib/api.ts
Config: client/.env.development
```

### Backend Server
```
Port: 5000
Entry: server/src/index.ts
Routes: server/src/routes/admin.ts
Models: server/src/models/
```

---

## 📋 Available Commands

### Frontend
```bash
npm run dev       # Start dev server (5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Check code quality
npm run format    # Format code
```

### Backend
```bash
npm run dev       # Start with auto-reload (5000)
npm run build     # Compile TypeScript
npm start         # Run compiled version
npm test          # Run tests
```

---

## 🔌 API Response Format

### All endpoints follow this pattern:

**Success (200)**:
```json
{
  "success": true,
  "data": { /* actual data */ }
}
```

**Error (4xx/5xx)**:
```json
{
  "success": false,
  "error": "Error description"
}
```

---

## 🐛 Troubleshooting

### Error: "Failed to fetch"
```
✓ Check backend is running on port 5000
✓ Check frontend is on port 5173
✓ Check .env.development has VITE_API_URL=http://localhost:5000/api
✓ Check CORS is enabled in server/src/index.ts
```

### Error: "MongooseError"
```
✓ Check MongoDB is running
✓ Check DATABASE_URL in server/.env
✓ Check connection string format
```

### Port already in use
```
# Kill process on port
netstat -ano | findstr :5000  (backend)
netstat -ano | findstr :5173  (frontend)

# Or specify different port
npm run dev -- --port 3001
```

---

## 📊 Project Structure

```
zovio/
├── client/                    (Frontend - React)
│   ├── src/
│   │   ├── pages/admin/      (6 admin pages)
│   │   ├── lib/
│   │   │   └── api.ts        (API client)
│   │   └── components/
│   ├── .env.development
│   └── package.json
│
├── server/                    (Backend - Express)
│   ├── src/
│   │   ├── models/           (MongoDB schemas)
│   │   ├── routes/
│   │   │   └── admin.ts      (All routes)
│   │   └── index.ts          (Server entry)
│   └── package.json
│
└── mobile/                    (Flutter)
    ├── lib/
    ├── android/
    └── ios/
```

---

## 🎯 Common Tasks

### Add a new worker
```
1. Go to http://localhost:5173/admin/workers
2. Click "Add Worker"
3. Fill form and submit
4. Worker saved to MongoDB
5. List automatically refreshes
```

### Update a service
```
1. Go to http://localhost:5173/admin/services
2. Find service, click "Edit"
3. Modify details in modal
4. Click "Update Service"
5. Database updated
6. UI refreshes
```

### View analytics
```
1. Go to http://localhost:5173/admin/analytics
2. See real data from MongoDB
3. Charts update from actual data
4. Export functionality available
```

---

## 📈 Monitoring

### Frontend Console
```
F12 → Console tab
Shows [API] logs for all requests
Shows errors and warnings
```

### Backend Terminal
```
Shows incoming requests
Shows database operations
Shows error messages
```

### Database
```
MongoDB Admin: mongodb.com/cloud/atlas
Check collections: workers, services, locations, complaints, etc.
```

---

## 🔐 Security Notes

### CORS
```
Frontend: http://localhost:5173
Backend: Accepts this origin
Production: Update in server/src/index.ts
```

### Environment Variables
```
.env files NOT committed to git
.gitignore includes .env
Change credentials for production
```

---

## 📞 API Endpoints Quick List

```
WORKERS
GET /api/admin/workers
POST /api/admin/workers
PUT /api/admin/workers/:id
DELETE /api/admin/workers/:id

SERVICES
GET /api/admin/services
POST /api/admin/services
PUT /api/admin/services/:id
DELETE /api/admin/services/:id
PATCH /api/admin/services/:id

LOCATIONS
GET /api/admin/locations
POST /api/admin/locations
PUT /api/admin/locations/:id
DELETE /api/admin/locations/:id

COMPLAINTS
GET /api/admin/complaints
POST /api/admin/complaints
PUT /api/admin/complaints/:id
PATCH /api/admin/complaints/:id
POST /api/admin/complaints/:id/response

ANALYTICS
GET /api/admin/analytics
POST /api/admin/analytics

SETTINGS
GET /api/admin/settings
PUT /api/admin/settings
```

---

## 🎓 Learning Resources

| Topic | File |
|-------|------|
| Architecture | ARCHITECTURE_AND_COMPONENT_MAP.md |
| Features | ADMIN_FEATURES_IMPLEMENTATION.md |
| Integration | BACKEND_API_SETUP.md |
| Setup | DEVELOPMENT_MODE_SETUP.md |
| Backend | BACKEND_SETUP.md |

---

## ✅ Daily Checklist

- [ ] Both servers running (5173 & 5000)
- [ ] No console errors
- [ ] API requests logging in console
- [ ] Database connected
- [ ] Can add/edit/delete items
- [ ] Data persisting in MongoDB

---

## 🚀 Deploy Checklist

- [ ] Build frontend: `npm run build`
- [ ] Compile backend: `npm run build`
- [ ] Update .env for production
- [ ] Update CORS origins
- [ ] Set production database URL
- [ ] Test all CRUD operations
- [ ] Run security audit
- [ ] Set up monitoring
- [ ] Deploy frontend
- [ ] Deploy backend

---

**Everything Setup**: ✅  
**Backend Running**: ✅  
**Frontend Running**: ✅  
**Connected**: ✅  
**Ready to Develop**: ✅
