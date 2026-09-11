import mongoose from 'mongoose';

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  location: { type: String },
  status: { type: String, default: 'Active' },
  joinDate: { type: String },
  rating: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  verification: { type: String, default: 'Pending' },
  bankDetails: { type: String, default: 'No' },
  image: { type: String },
  bio: { type: String },
  hourlyRate: { type: Number }
}, { timestamps: true });

export default mongoose.model('Worker', WorkerSchema);
