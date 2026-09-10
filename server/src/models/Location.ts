import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCodes: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Location', LocationSchema);
