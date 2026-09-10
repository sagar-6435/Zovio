import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  activeUsers: { type: Number, default: 0 },
  totalBookings: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Analytics', AnalyticsSchema);
