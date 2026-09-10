import React, { useState } from 'react';
import {
  BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp, Calendar,
  Download, Filter, Users, Briefcase, MapPin, DollarSign, Star, Clock
} from 'lucide-react';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('month'); // week, month, year
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Revenue data
  const revenueData = [
    { date: 'Oct 1', value: 4200, bookings: 45 },
    { date: 'Oct 2', value: 3800, bookings: 42 },
    { date: 'Oct 3', value: 5100, bookings: 58 },
    { date: 'Oct 4', value: 4900, bookings: 55 },
    { date: 'Oct 5', value: 6200, bookings: 68 },
    { date: 'Oct 6', value: 7100, bookings: 75 },
    { date: 'Oct 7', value: 5800, bookings: 62 },
    { date: 'Oct 8', value: 8200, bookings: 89 },
    { date: 'Oct 9', value: 7500, bookings: 81 },
    { date: 'Oct 10', value: 6800, bookings: 74 },
  ];

  // Performance metrics
  const metrics = [
    { title: 'Total Revenue', value: '₹62,500', change: '+12.5%', icon: <DollarSign className="w-6 h-6 text-green-600" /> },
    { title: 'Total Bookings', value: '649', change: '+8.2%', icon: <Briefcase className="w-6 h-6 text-blue-600" /> },
    { title: 'Active Workers', value: '35', change: '+5.0%', icon: <Users className="w-6 h-6 text-purple-600" /> },
    { title: 'Avg Rating', value: '4.7/5', change: '+0.2', icon: <Star className="w-6 h-6 text-yellow-600" /> },
  ];

  // Service performance
  const servicePerformance = [
    { service: 'House Cleaning', bookings: 245, revenue: '₹14,700', rating: 4.8 },
    { service: 'Plumbing', bookings: 189, revenue: '₹13,230', rating: 4.7 },
    { service: 'Electrical', bookings: 156, revenue: '₹12,480', rating: 4.6 },
    { service: 'Carpentry', bookings: 89, revenue: '₹8,900', rating: 4.9 },
    { service: 'AC Repair', bookings: 67, revenue: '₹5,360', rating: 4.5 },
  ];

  // Location performance
  const locationPerformance = [
    { location: 'South Delhi', bookings: 312, revenue: '₹24,960', workers: 15 },
    { location: 'North Delhi', bookings: 234, revenue: '₹18,720', workers: 12 },
    { location: 'East Delhi', bookings: 145, revenue: '₹11,600', workers: 8 },
    { location: 'West Delhi', bookings: 178, revenue: '₹14,240', workers: 10 },
  ];

  // Worker performance
  const topWorkers = [
    { name: 'Rajesh Kumar', service: 'Plumbing', completedJobs: 145, rating: 4.8, earnings: '₹21,750' },
    { name: 'Priya Singh', service: 'Electrical', completedJobs: 189, rating: 4.9, earnings: '₹28,350' },
    { name: 'Amit Patel', service: 'Carpentry', completedJobs: 87, rating: 4.5, earnings: '₹13,050' },
  ];

  // Complaint statistics
  const complaintStats = [
    { category: 'Quality Issues', count: 12, resolved: 8, pending: 4 },
    { category: 'Late Arrival', count: 8, resolved: 6, pending: 2 },
    { category: 'Billing Issues', count: 6, resolved: 4, pending: 2 },
    { category: 'Safety Concerns', count: 3, resolved: 2, pending: 1 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.value));
  const chartHeight = 250;

  return (
    <div className="min-h-screen bg-surface-cream p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-deep-navy">Analytics & Reports</h1>
          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              <Download className="w-5 h-5" /> Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">{metric.icon}</div>
              </div>
              <p className="text-sm text-green-600 font-semibold">{metric.change} from last period</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <LineChartIcon className="w-5 h-5 text-brand-teal" /> Daily Revenue & Bookings
            </h2>
            <span className="text-sm text-gray-600">{dateRange.charAt(0).toUpperCase() + dateRange.slice(1)} View</span>
          </div>

          <div className="flex items-end justify-between gap-2 h-64 p-4 bg-gray-50 rounded-lg">
            {revenueData.map((data, i) => {
              const barHeight = (data.value / maxRevenue) * 200;
              return (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full bg-linear-to-t from-brand-teal to-brand-teal/60 rounded-t-lg hover:shadow-lg transition-shadow"
                    style={{ height: `${barHeight}px` }}
                    title={`₹${data.value} - ${data.bookings} bookings`}
                  />
                  <p className="text-xs text-gray-600 text-center">{data.date}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">Hover over bars to see details</p>
        </div>

        {/* Service & Location Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Service Performance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Top Services
            </h2>
            <div className="space-y-4">
              {servicePerformance.map((service, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg hover:border-brand-teal/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{service.service}</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      ⭐ {service.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{service.bookings} bookings</span>
                    <span className="font-semibold text-green-600">{service.revenue}</span>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full"
                      style={{ width: `${(service.bookings / 245) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Performance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" /> Location Performance
            </h2>
            <div className="space-y-4">
              {locationPerformance.map((location, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg hover:border-brand-orange/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{location.location}</h4>
                    <span className="text-sm font-semibold text-orange-600">{location.workers} workers</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{location.bookings} bookings</span>
                    <span className="font-semibold text-green-600">{location.revenue}</span>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-orange-400 to-orange-600 rounded-full"
                      style={{ width: `${(location.bookings / 312) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Workers */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" /> Top Performing Workers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Completed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {topWorkers.map((worker, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">{worker.name}</td>
                    <td className="px-6 py-4 text-gray-600">{worker.service}</td>
                    <td className="px-6 py-4 text-gray-600">{worker.completedJobs}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full">
                        ⭐ {worker.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600">{worker.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Complaint Statistics */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-600" /> Complaint Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complaintStats.map((stat, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">{stat.category}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-gray-900">{stat.count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Resolved:</span>
                    <span className="font-bold text-green-600">{stat.resolved}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-bold text-red-600">{stat.pending}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-green-400 to-green-600"
                      style={{ width: `${(stat.resolved / stat.count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
