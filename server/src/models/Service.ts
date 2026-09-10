import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String }, // R2 URL
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Service', ServiceSchema);
