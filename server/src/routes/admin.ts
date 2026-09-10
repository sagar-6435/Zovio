import express from 'express';
import Worker from '../models/Worker';
import Location from '../models/Location';
import Complaint from '../models/Complaint';
import Analytics from '../models/Analytics';
import Setting from '../models/Setting';
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

// --- COMPLAINTS ---
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email');
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

export default router;
