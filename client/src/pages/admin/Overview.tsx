import React, { useState } from 'react';
import { Users, Briefcase, DollarSign, MapPin } from 'lucide-react';

export default function Overview() {
  // Mock data for now, eventually fetched from API
  const [workers] = useState([
    { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', service: 'Plumbing', location: 'North Delhi', status: 'Active', joinDate: '2026-01-15', rating: 4.8 },
    { id: 2, name: 'Priya Singh', phone: '+91 97654 32109', service: 'Electrical', location: 'South Delhi', status: 'Active', joinDate: '2026-02-20', rating: 4.9 },
    { id: 3, name: 'Amit Patel', phone: '+91 96543 21098', service: 'Carpentry', location: 'East Delhi', status: 'Inactive', joinDate: '2025-12-10', rating: 4.5 },
  ]);

  const [services] = useState([
    { id: 1, name: 'Plumbing', description: 'Plumbing repairs and maintenance', category: 'Home & Repair', active: true },
    { id: 2, name: 'Electrical', description: 'Electrical work and installations', category: 'Home & Repair', active: true },
    { id: 3, name: 'Carpentry', description: 'Wooden furniture and repairs', category: 'Home & Repair', active: true },
    { id: 4, name: 'House Cleaning', description: 'Professional house cleaning', category: 'Cleaning', active: true },
    { id: 5, name: 'AC Repair', description: 'AC servicing and repair', category: 'Appliances', active: false },
  ]);

  const [locations] = useState([
    { id: 1, name: 'North Delhi', zone: 'Delhi', city: 'Delhi', workersCount: 12, servicesCount: 8 },
    { id: 2, name: 'South Delhi', zone: 'Delhi', city: 'Delhi', workersCount: 15, servicesCount: 10 },
    { id: 3, name: 'East Delhi', zone: 'Delhi', city: 'Delhi', workersCount: 8, servicesCount: 6 },
    { id: 4, name: 'West Delhi', zone: 'Delhi', city: 'Delhi', workersCount: 10, servicesCount: 7 },
  ]);

  const [complaints] = useState([
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

  return (
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
}
