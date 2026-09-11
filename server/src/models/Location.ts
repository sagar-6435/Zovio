import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  zone: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String },
  activeWorkers: { type: Number, default: 0 },
  activeServices: { type: Number, default: 0 },
  revenue: { type: String, default: '₹0' },
  monthlyBookings: { type: Number, default: 0 },
  avgRating: { type: Number, default: 0 },
  status: { type: String, default: 'Active' },
  operatingSince: { type: String }
}, { timestamps: true });

export default mongoose.model('Location', LocationSchema);
