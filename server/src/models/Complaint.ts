import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  type: { type: String, default: 'Complaint' }, // Complaint or Query
  title: { type: String, required: true },
  customer: { type: String, required: true }, // can store name or string for now
  worker: { type: String },
  service: { type: String },
  description: { type: String, required: true },
  priority: { type: String, default: 'Medium' },
  status: { type: String, default: 'Open' },
  resolution: { type: String },
  assignedTo: { type: String }
}, { timestamps: true });

export default mongoose.model('Complaint', ComplaintSchema);
