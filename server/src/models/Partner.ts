import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  hourlyRate: { type: Number },
  skills: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  location: { type: String },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Partner', PartnerSchema);
