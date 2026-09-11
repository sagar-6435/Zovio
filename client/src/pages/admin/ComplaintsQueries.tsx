import React, { useState, useEffect } from 'react';
import {
  MessageSquare, AlertCircle, Eye, Check, X, Filter, Search, Download, Phone, Mail,
  Clock, User, Briefcase, Reply, Archive
} from 'lucide-react';

import { complaintAPI } from '../../lib/api';

export default function ComplaintsQueries() {
  const [items, setItems] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [reply, setReply] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await complaintAPI.getAll();
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || item.priority === filterPriority;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await complaintAPI.updateStatus(id, newStatus);
      fetchItems();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleReply = async (id: string) => {
    if (reply.trim()) {
      try {
        await complaintAPI.addResponse(id, reply);
        fetchItems();
        setReply('');
        setShowModal(false);
      } catch (err) {
        console.error('Failed to add reply:', err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Type', 'Title', 'Customer', 'Priority', 'Status', 'Date', 'Resolution'],
      ...filteredItems.map(item => [
        item._id, item.type, item.title, item.customer, item.priority, item.status, item.createdAt, item.resolution || 'Pending'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `complaints-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-surface-cream p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-deep-navy">Complaints & Queries</h1>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            <Download className="w-5 h-5" /> Export
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total', value: items.length, icon: <MessageSquare className="w-6 h-6 text-blue-500" />, color: 'blue' },
            { label: 'Open', value: items.filter(i => i.status === 'Open').length, icon: <AlertCircle className="w-6 h-6 text-red-500" />, color: 'red' },
            { label: 'In Progress', value: items.filter(i => i.status === 'In Progress').length, icon: <Clock className="w-6 h-6 text-orange-500" />, color: 'orange' },
            { label: 'Resolved', value: items.filter(i => i.status === 'Resolved').length, icon: <Check className="w-6 h-6 text-green-500" />, color: 'green' },
          ].map((card, i) => (
            <div key={i} className={`bg-${card.color}-50 rounded-2xl shadow-sm border border-${card.color}-100 p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm text-${card.color}-700 font-semibold`}>{card.label}</p>
                  <p className={`text-3xl font-bold text-${card.color}-600 mt-2`}>{card.value}</p>
                </div>
                <div className={`bg-${card.color}-100 p-3 rounded-lg`}>{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Title, customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm"
              >
                <option>All</option>
                <option>Complaint</option>
                <option>Query</option>
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
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm"
              >
                <option>All</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Results</label>
              <div className="px-3 py-2 bg-brand-teal/10 rounded-lg text-sm font-semibold text-brand-teal">
                {filteredItems.length} items
              </div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {item.type === 'Complaint' ? (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    )}
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'Complaint' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" /> {item.customer}
                    </span>
                    {item.worker && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" /> {item.worker}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                    {item.priority} Priority
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSelectedItem(item); setShowModal(true); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                  >
                    <Eye className="w-4 h-4" /> View Details
                  </button>
                  {item.status !== 'Resolved' && (
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-deep-navy">
                {selectedItem.type === 'Complaint' ? 'Complaint Details' : 'Query Details'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title & Type */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {selectedItem.type === 'Complaint' ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h3>
                </div>
              </div>

              {/* Priority & Status */}
              <div className="flex gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getPriorityColor(selectedItem.priority)}`}>
                  {selectedItem.priority} Priority
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Description</h4>
                <p className="text-gray-600 p-4 bg-gray-50 rounded-lg">{selectedItem.description}</p>
              </div>

              {/* Details */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-bold text-gray-900">{selectedItem.customer}</p>
                    </div>
                  </div>
                  {selectedItem.worker && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Worker</p>
                        <p className="font-bold text-gray-900">{selectedItem.worker}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Submitted</p>
                      <p className="font-bold text-gray-900">{selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleDateString() : ''}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolution */}
              {selectedItem.resolution && (
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Resolution</h4>
                  <p className="text-gray-600 p-4 bg-green-50 rounded-lg border border-green-200">
                    {selectedItem.resolution}
                  </p>
                </div>
              )}

              {/* Reply Form */}
              {selectedItem.status !== 'Resolved' && (
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Add Response</h4>
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Enter your response..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal resize-none"
                    rows="4"
                  />
                  <button
                    onClick={() => handleReply(selectedItem._id)}
                    className="mt-4 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors font-semibold"
                  >
                    <Reply className="w-4 h-4 inline mr-2" /> Send Response
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
