import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, Edit2, Eye, Search, Filter, Download, Tag, Zap, ToggleLeft, ToggleRight,
  Users, TrendingUp, DollarSign, X, AlertCircle, CheckCircle
} from 'lucide-react';

import { serviceAPI } from '../../lib/api';

// Service Form Modal Component
function ServiceFormModal({ service, onClose, onSave }: { service: any; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState(service ? {
    name: service.name,
    description: service.description,
    category: service.category,
    basePrice: service.basePrice,
    icon: service.icon,
    minPrice: service.minPrice || '',
    maxPrice: service.maxPrice || '',
  } : {
    name: '',
    description: '',
    category: 'Home & Repair',
    basePrice: '',
    icon: '🛠️',
    minPrice: '',
    maxPrice: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Home & Repair', 'Cleaning', 'Appliances', 'Technology', 'Beauty', 'Transportation'];
  const icons = ['🛠️', '🧹', '❄️', '💻', '💄', '🚗', '📚', '🏋️', '🍳', '🏠'];

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.basePrice || parseFloat(formData.basePrice) <= 0) newErrors.basePrice = 'Valid price is required';
    if (formData.minPrice && parseFloat(formData.minPrice) < 0) newErrors.minPrice = 'Minimum price cannot be negative';
    if (formData.maxPrice && parseFloat(formData.maxPrice) < 0) newErrors.maxPrice = 'Maximum price cannot be negative';
    if (formData.minPrice && formData.maxPrice && parseFloat(formData.minPrice) > parseFloat(formData.maxPrice)) {
      newErrors.maxPrice = 'Maximum price must be greater than minimum price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        basePrice: parseFloat(formData.basePrice),
        minPrice: formData.minPrice ? parseFloat(formData.minPrice) : undefined,
        maxPrice: formData.maxPrice ? parseFloat(formData.maxPrice) : undefined,
      };

      if (service) {
        await serviceAPI.update(service._id, submitData);
      } else {
        await serviceAPI.create(submitData);
      }

      onSave(submitData);
      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
      setErrors({ submit: 'Failed to save service. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-deep-navy">
            {service ? 'Edit Service' : 'Add New Service'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Service Icon</label>
            <div className="grid grid-cols-5 gap-2">
              {icons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-4 rounded-lg text-2xl transition-all ${
                    formData.icon === icon
                      ? 'bg-brand-teal text-white border-2 border-brand-teal'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Service Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter service name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                errors.description ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Describe the service"
              rows={4}
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Base Price *</label>
              <input
                type="number"
                step="0.01"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                  errors.basePrice ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="0.00"
              />
              {errors.basePrice && <p className="text-red-600 text-sm mt-1">{errors.basePrice}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.minPrice}
                onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                  errors.minPrice ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="0.00"
              />
              {errors.minPrice && <p className="text-red-600 text-sm mt-1">{errors.minPrice}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.maxPrice}
                onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                  errors.maxPrice ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="0.00"
              />
              {errors.maxPrice && <p className="text-red-600 text-sm mt-1">{errors.maxPrice}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (service ? 'Update Service' : 'Add Service')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ServiceManagement() {
  const [services, setServices] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await serviceAPI.getAll();
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const categories = ['All', 'Home & Repair', 'Cleaning', 'Appliances', 'Technology', 'Beauty'];
  const demandLevels = ['Very High', 'High', 'Medium', 'Low'];

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || s.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || (filterStatus === 'Active' ? s.active : !s.active);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleStatus = async (id: string, active: boolean) => {
    try {
      await serviceAPI.toggleStatus(id, !active);
      fetchServices();
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await serviceAPI.delete(id);
        fetchServices();
      } catch (err) {
        console.error('Failed to delete service:', err);
      }
    }
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Name', 'Category', 'Base Price', 'Status', 'Workers', 'Completed', 'Rating', 'Demand'],
      ...filteredServices.map(s => [
        s._id, s.name, s.category, s.basePrice, s.active ? 'Active' : 'Inactive',
        s.workersAvailable, s.completedServices, s.avgRating, s.demandLevel
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `services-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-surface-cream p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-deep-navy">Service Management</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              <Download className="w-5 h-5" /> Export
            </button>
            <button
              onClick={() => { setSelectedService(null); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" /> Add Service
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Service name, category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm"
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
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
                {filteredServices.length} services
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{service.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleStatus(service._id, service.active)}
                  className={`p-2 rounded-lg transition-colors ${
                    service.active
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {service.active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Base Price</p>
                  <p className="font-bold text-brand-teal">{service.basePrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Rating</p>
                  <p className="font-bold">⭐ {service.avgRating}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Workers</p>
                  <p className="font-bold text-blue-600">{service.workersAvailable}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Demand</p>
                  <p className={`font-bold text-sm ${
                    service.demandLevel === 'Very High' ? 'text-red-600' :
                    service.demandLevel === 'High' ? 'text-orange-600' :
                    'text-green-600'
                  }`}>{service.demandLevel}</p>
                </div>
              </div>

              <div className="p-2 bg-brand-teal/5 rounded-lg mb-4 text-center">
                <p className="text-xs text-gray-600 mb-1">Completed Services</p>
                <p className="text-lg font-bold text-brand-teal">{service.completedServices}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => { setSelectedService(service); setShowDetailsModal(true); }}
                  className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  <Eye className="w-4 h-4 inline mr-1" /> View
                </button>
                <button
                  onClick={() => { setSelectedService(service); setShowModal(true); }}
                  className="flex-1 px-3 py-2 text-sm text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                >
                  <Edit2 className="w-4 h-4 inline mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
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
      {showDetailsModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-deep-navy">Service Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <span className="text-5xl">{selectedService.icon}</span>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedService.name}</h3>
                  <p className="text-gray-600 mt-2">{selectedService.description}</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Service Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Category</p>
                    <p className="font-bold text-gray-900">{selectedService.category}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Base Price</p>
                    <p className="font-bold text-blue-600 text-lg">{selectedService.basePrice}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Status</p>
                    <p className={`font-bold ${selectedService.active ? 'text-green-600' : 'text-gray-600'}`}>
                      {selectedService.active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Rating</p>
                    <p className="font-bold text-amber-600">⭐ {selectedService.avgRating}</p>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Available Workers</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedService.workersAvailable}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{selectedService.completedServices}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-600 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Demand</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedService.demandLevel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showModal && <ServiceFormModal service={selectedService} onClose={() => setShowModal(false)} onSave={() => fetchServices()} />}
    </div>
  );
}
