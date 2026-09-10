import React, { useState } from 'react';
import {
  Users, Briefcase, DollarSign, Settings, Plus, Trash2, Edit2, Eye, EyeOff,
  MapPin, AlertCircle, MessageSquare, Phone, Mail, Clock, Check, X, Search
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'worker', 'service', 'location'
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Mock data
  const [workers, setWorkers] = useState([
    { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', service: 'Plumbing', location: 'North Delhi', status: 'Active', joinDate: '2026-01-15', rating: 4.8 },
    { id: 2, name: 'Priya Singh', phone: '+91 97654 32109', service: 'Electrical', location: 'South Delhi', status: 'Active', joinDate: '2026-02-20', rating: 4.9 },
    { id: 3, name: 'Amit Patel', phone: '+91 96543 21098', service: 'Carpentry', location: 'East Delhi', status: 'Inactive', joinDate: '2025-12-10', rating: 4.5 },
  ]);

  const [services, setServices] = useState([
    { id: 1, name: 'Plumbing', description: 'Plumbing repairs and maintenance', category: 'Home & Repair', active: true },
    { id: 2, name: 'Electrical', description: 'Electrical work and installations', category: 'Home & Repair', active: true },
    { id: 3, name: 'Carpentry', description: 'Wooden furniture and repairs', category: 'Home & Repair', active: true },
    { id: 4, name: 'House Cleaning', description: 'Professional house cleaning', category: 'Cleaning', active: true },
    { id: 5, name: 'AC Repair', description: 'AC servicing and repair', category: 'Appliances', active: false },
  ]);

  const [locations, setLocations] = useState([
    { id: 1, name: 'North Delhi', zone: 'Delhi', city: 'Delhi', workersCount: 12, servicesCount: 8 },
    { id: 2, name: 'South Delhi', zone: 'Delhi', city: 'Delhi', workersCount: 15, servicesCount: 10 },
    { id: 3, name: 'East Delhi', zone: 'Delhi', city: 'Delhi', workersCount: 8, servicesCount: 6 },
    { id: 4, name: 'West Delhi', zone: 'Delhi', city: 'Delhi', workersCount: 10, servicesCount: 7 },
  ]);

  const [complaints, setComplaints] = useState([
    { id: 1, customer: 'Rajesh Kumar', worker: 'Priya Singh', title: 'Poor Service Quality', description: 'Work was not completed properly', date: '2026-10-12', status: 'Open', priority: 'High' },
    { id: 2, customer: 'Sneha Desai', worker: 'Amit Patel', title: 'Late Arrival', description: 'Worker arrived 30 minutes late', date: '2026-10-11', status: 'Resolved', priority: 'Low' },
    { id: 3, customer: 'Vikram Reddy', worker: 'Rajesh Kumar', title: 'Billing Issue', description: 'Charged more than quoted price', date: '2026-10-10', status: 'In Progress', priority: 'High' },
  ]);

  const stats = [
    { title: 'Total Users', value: '1,245', icon: <Users className="text-blue-500 w-8 h-8" /> },
    { title: 'Active Services', value: '342', icon: <Briefcase className="text-green-500 w-8 h-8" /> },
    { title: 'Total Revenue', value: '₹45k', icon: <DollarSign className="text-yellow-500 w-8 h-8" /> },
    { title: 'Locations', value: `${locations.length}`, icon: <MapPin className="text-purple-500 w-8 h-8" /> },
  ];

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setShowAddModal(true);
    setEditingId(null);
  };

  const handleAddWorker = (data: any) => {
    if (editingId) {
      setWorkers(workers.map(w => w.id === editingId ? { ...w, ...data } : w));
    } else {
      setWorkers([...workers, { id: Date.now(), ...data, status: 'Active', joinDate: new Date().toISOString().split('T')[0], rating: 0 }]);
    }
    setShowAddModal(false);
  };

  const handleAddService = (data: any) => {
    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...s, ...data } : s));
    } else {
      setServices([...services, { id: Date.now(), ...data, active: true }]);
    }
    setShowAddModal(false);
  };

  const handleAddLocation = (data: any) => {
    if (editingId) {
      setLocations(locations.map(l => l.id === editingId ? { ...l, ...data } : l));
    } else {
      setLocations([...locations, { id: Date.now(), ...data, workersCount: 0, servicesCount: 0 }]);
    }
    setShowAddModal(false);
  };

  const handleDelete = (type: string, id: number) => {
    if (type === 'worker') setWorkers(workers.filter(w => w.id !== id));
    if (type === 'service') setServices(services.filter(s => s.id !== id));
    if (type === 'location') setLocations(locations.filter(l => l.id !== id));
  };

  const renderOverview = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Active Workers</span>
              <span className="font-bold text-blue-600">{workers.filter(w => w.status === 'Active').length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Active Services</span>
              <span className="font-bold text-green-600">{services.filter(s => s.active).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-gray-700">Operating Locations</span>
              <span className="font-bold text-orange-600">{locations.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-gray-700">Open Complaints</span>
              <span className="font-bold text-red-600">{complaints.filter(c => c.status === 'Open').length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Complaints</h3>
          <div className="space-y-3">
            {complaints.slice(0, 3).map((complaint) => (
              <div key={complaint.id} className="p-3 border border-gray-100 rounded-lg hover:border-red-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{complaint.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{complaint.customer} vs {complaint.worker}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    complaint.priority === 'High' ? 'bg-red-100 text-red-700' :
                    complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {complaint.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkers = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Workers</h2>
        <button
          onClick={() => handleOpenModal('worker')}
          className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" /> Add Worker
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workers
                .filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((worker) => (
                  <tr key={worker.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{worker.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{worker.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{worker.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{worker.location}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        worker.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {worker.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">⭐ {worker.rating}</td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => { setEditingId(worker.id); handleOpenModal('worker'); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('worker', worker.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Services</h2>
        <button
          onClick={() => handleOpenModal('service')}
          className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{service.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                service.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {service.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => { setEditingId(service.id); handleOpenModal('service'); }}
                className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                <Edit2 className="w-4 h-4 inline mr-2" /> Edit
              </button>
              <button
                onClick={() => handleDelete('service', service.id)}
                className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-semibold"
              >
                <Trash2 className="w-4 h-4 inline mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocations = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Locations</h2>
        <button
          onClick={() => handleOpenModal('location')}
          className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" /> Add Location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-teal" /> {location.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{location.zone} • {location.city}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Active Workers</p>
                <p className="text-2xl font-bold text-blue-600">{location.workersCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Services</p>
                <p className="text-2xl font-bold text-green-600">{location.servicesCount}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setEditingId(location.id); handleOpenModal('location'); }}
                className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                <Edit2 className="w-4 h-4 inline mr-2" /> Edit
              </button>
              <button
                onClick={() => handleDelete('location', location.id)}
                className="flex-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-semibold"
              >
                <Trash2 className="w-4 h-4 inline mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Complaints & Queries</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Worker</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{complaint.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{complaint.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{complaint.worker}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{complaint.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      complaint.priority === 'High' ? 'bg-red-100 text-red-700' :
                      complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      complaint.status === 'Open' ? 'bg-red-100 text-red-700' :
                      complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Workers': return renderWorkers();
      case 'Services': return renderServices();
      case 'Locations': return renderLocations();
      case 'Complaints': return renderComplaints();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-surface-cream p-4 sm:p-8 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-brand-deep-navy mb-8">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          {['Overview', 'Workers', 'Services', 'Locations', 'Complaints', 'Analytics', 'Settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-brand-teal text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Modal for Adding/Editing */}
      {showAddModal && (
        <Modal
          type={modalType}
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            if (modalType === 'worker') handleAddWorker(data);
            if (modalType === 'service') handleAddService(data);
            if (modalType === 'location') handleAddLocation(data);
          }}
          isEditing={!!editingId}
        />
      )}
    </div>
  );
}

// Modal Component
function Modal({ type, onClose, onSubmit, isEditing }: { type: string, onClose: () => void, onSubmit: (data: any) => void, isEditing: boolean }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getModalTitle = () => {
    if (type === 'worker') return isEditing ? 'Edit Worker' : 'Add New Worker';
    if (type === 'service') return isEditing ? 'Edit Service' : 'Add New Service';
    if (type === 'location') return isEditing ? 'Edit Location' : 'Add New Location';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-deep-navy">{getModalTitle()}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === 'worker' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="Enter worker name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium border-r border-gray-200 pr-2">+91</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    className="w-full pl-14 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="98765 43210"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                <select
                  name="service"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                >
                  <option>Select Service</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Carpentry</option>
                  <option>Cleaning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <select
                  name="location"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                >
                  <option>Select Location</option>
                  <option>North Delhi</option>
                  <option>South Delhi</option>
                  <option>East Delhi</option>
                  <option>West Delhi</option>
                </select>
              </div>
            </>
          )}

          {type === 'service' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                >
                  <option>Select Category</option>
                  <option>Home & Repair</option>
                  <option>Cleaning</option>
                  <option>Appliances</option>
                  <option>Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="Enter service description"
                  rows="3"
                />
              </div>
            </>
          )}

          {type === 'location' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="e.g., North Delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Zone</label>
                <input
                  type="text"
                  name="zone"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="e.g., Delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="e.g., Delhi"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 bg-brand-teal text-white rounded-lg font-semibold hover:bg-brand-teal/90 transition-colors mt-6"
          >
            {isEditing ? 'Update' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
}
