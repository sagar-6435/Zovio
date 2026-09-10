import React from 'react';
import { Building, Users, PenTool, TrendingUp } from 'lucide-react';

export default function PropertyOwnerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Property Owner Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Properties', value: '4 Listed', icon: <Building className="text-blue-500 w-8 h-8" /> },
            { title: 'Tenants', value: '12 Active', icon: <Users className="text-purple-500 w-8 h-8" /> },
            { title: 'Maintenance', value: '2 Requests', icon: <PenTool className="text-red-500 w-8 h-8" /> },
            { title: 'Income', value: '$3,200', icon: <TrendingUp className="text-green-500 w-8 h-8" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">{stat.icon}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Maintenance Requests</h2>
          <p className="text-gray-500">No new requests pending.</p>
        </div>
      </div>
    </div>
  );
}
