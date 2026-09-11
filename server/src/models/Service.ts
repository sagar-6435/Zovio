import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  basePrice: { type: String },
  active: { type: Boolean, default: true },
  workersAvailable: { type: Number, default: 0 },
  completedServices: { type: Number, default: 0 },
  avgRating: { type: Number, default: 0 },
  demandLevel: { type: String, default: 'Medium' },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model('Service', ServiceSchema);
