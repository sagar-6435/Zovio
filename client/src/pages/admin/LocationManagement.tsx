import React, { useState } from 'react';
import {
  Plus, Trash2, Edit2, Eye, Search, Download, MapPin, Users, Briefcase, DollarSign,
  TrendingUp, Clock, CheckCircle, X
} from 'lucide-react';

export default function LocationManagement() {
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: 'North Delhi',
      zone: 'Delhi NCR',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001-110096',
      activeWorkers: 12,
      activeServices: 8,
      revenue: '₹45,000',
      monthlyBookings: 234,
      avgRating: 4.7,
      status: 'Active',
      operatingSince: '2025-06-15'
    },
    {
      id: 2,
      name: 'South Delhi',
      zone: 'Delhi NCR',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110014-110030',
      activeWorkers: 15,
      activeServices: 10,
      revenue: '₹58,500',
      monthlyBookings: 312,
      avgRating: 4.8,
      status: 'Active',
      operatingSince: '2025-05-20'
    },
    {
      id: 3,
      name: 'East Delhi',
      zone: 'Delhi NCR',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110092-110097',
      activeWorkers: 8,
      activeServices: 6,
      revenue: '₹32,000',
      monthlyBookings: 145,
      avgRating: 4.5,
      status: 'Active',
      operatingSince: '2025-07-10'
    },
    {
      id: 4,
      name: 'West Delhi',
      zone: 'Delhi NCR',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110015-110087',
      activeWorkers: 10,
      activeServices: 7,
      revenue: '₹38,500',
      monthlyBookings: 178,
      avgRating: 4.6,
      status: 'Active',
      operatingSince: '2025-06-25'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredLocations = locations.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteLocation = (id) => {
    if (confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter(l => l.id !== id));
    }
  };

  const handleExport = () => {
    const csv = [
      ['Location', 'Zone', 'City', 'Workers', 'Services', 'Revenue', 'Bookings', 'Rating', 'Status'],
      ...filteredLocations.map(l => [
        l.name, l.zone, l.city, l.activeWorkers, l.activeServices, l.revenue, l.monthlyBookings, l.avgRating, l.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `locations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-surface-cream p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-deep-navy">Location Management</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              <Download className="w-5 h-5" /> Export
            </button>
            <button
              onClick={() => { setSelectedLocation(null); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" /> Add Location
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Location, city, zone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Results</label>
              <div className="px-3 py-2 bg-brand-teal/10 rounded-lg text-sm font-semibold text-brand-teal">
                {filteredLocations.length} locations
              </div>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredLocations.map((location) => (
            <div key={location.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-brand-teal/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{location.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{location.zone} • {location.city}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  location.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {location.status}
                </span>
              </div>

              {/* Location Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                <p className="text-gray-600 mb-1">Service Area</p>
                <p className="font-semibold text-gray-900">Pin Code: {location.pincode}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Active Workers</p>
                  <p className="text-2xl font-bold text-blue-600">{location.activeWorkers}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Briefcase className="w-4 h-4 text-green-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Services</p>
                  <p className="text-2xl font-bold text-green-600">{location.activeServices}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <DollarSign className="w-4 h-4 text-purple-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Monthly Revenue</p>
                  <p className="font-bold text-purple-600">{location.revenue}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-orange-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Bookings</p>
                  <p className="text-2xl font-bold text-orange-600">{location.monthlyBookings}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-3 bg-yellow-50 rounded-lg mb-4 flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Average Rating</p>
                  <p className="font-bold text-gray-900">{location.avgRating}/5</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => { setSelectedLocation(location); setShowDetailsModal(true); }}
                  className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  <Eye className="w-4 h-4 inline mr-1" /> View
                </button>
                <button
                  onClick={() => { setSelectedLocation(location); setShowModal(true); }}
                  className="flex-1 px-3 py-2 text-sm text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                >
                  <Edit2 className="w-4 h-4 inline mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteLocation(location.id)}
                  className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-semibold"
                >
                  <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedLocation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-deep-navy">Location Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="p-4 bg-brand-teal/10 rounded-lg">
                  <MapPin className="w-8 h-8 text-brand-teal" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedLocation.name}</h3>
                  <p className="text-gray-600">{selectedLocation.zone} • {selectedLocation.state}</p>
                </div>
              </div>

              {/* Location Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Location Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">City</p>
                    <p className="font-bold text-gray-900">{selectedLocation.city}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">State</p>
                    <p className="font-bold text-gray-900">{selectedLocation.state}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg col-span-2">
                    <p className="text-sm text-gray-600 mb-2">Service Pin Codes</p>
                    <p className="font-bold text-gray-900">{selectedLocation.pincode}</p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Active Workers</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedLocation.activeWorkers}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <Briefcase className="w-5 h-5 text-green-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Active Services</p>
                    <p className="text-2xl font-bold text-green-600">{selectedLocation.activeServices}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                    <p className="text-lg font-bold text-purple-600">{selectedLocation.revenue}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Monthly Bookings</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedLocation.monthlyBookings}</p>
                  </div>
                </div>
              </div>

              {/* Rating & Operating Info */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Average Rating</p>
                    <p className="text-2xl font-bold text-yellow-600">⭐ {selectedLocation.avgRating}/5</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Operating Since</p>
                    <p className="font-bold text-gray-900">{selectedLocation.operatingSince}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Status</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedLocation.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {selectedLocation.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
