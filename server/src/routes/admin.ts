import express from 'express';
import Worker from '../models/Worker';
import Location from '../models/Location';
import Complaint from '../models/Complaint';
import Analytics from '../models/Analytics';
import Setting from '../models/Setting';
import Service from '../models/Service';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Middleware to ensure admin access can be added here
// router.use(authMiddleware);

// --- WORKERS ---
router.get('/workers', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/workers', async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    await newWorker.save();
    res.status(201).json(newWorker);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/workers/:id', async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWorker);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/workers/:id', async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Worker deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// --- SERVICES ---
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/services', async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/services/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, { active: req.body.active }, { new: true });
    res.json(updatedService);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// --- LOCATIONS ---
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/locations', async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/locations/:id', async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLocation);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/locations/:id', async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ message: 'Location deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// --- COMPLAINTS ---
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/complaints', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/complaints/:id', async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedComplaint);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/complaints/:id', async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedComplaint);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/complaints/:id/response', async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, { resolution: req.body.response, status: 'Resolved' }, { new: true });
    res.json(updatedComplaint);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// --- ANALYTICS ---
router.get('/analytics', async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ date: -1 });
    res.json(analytics);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/analytics', async (req, res) => {
  try {
    const newAnalytics = new Analytics(req.body);
    await newAnalytics.save();
    res.status(201).json(newAnalytics);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// --- SETTINGS ---
router.get('/settings', async (req, res) => {
  try {
    const settings = await Setting.find();
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/settings', async (req, res) => {
  try {
    const newSetting = new Setting(req.body);
    await newSetting.save();
    res.status(201).json(newSetting);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/settings', async (req, res) => {
  try {
    // The UI sends an object of multiple settings.
    const keys = Object.keys(req.body);
    const updates = keys.map(key => {
      return Setting.findOneAndUpdate({ key }, { value: req.body[key] }, { upsert: true, new: true });
    });
    await Promise.all(updates);
    res.json({ message: 'Settings updated' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
