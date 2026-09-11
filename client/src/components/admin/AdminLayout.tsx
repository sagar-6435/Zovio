import React from 'react';
import { Link, Outlet, useLocation } from '@tanstack/react-router';

export default function AdminLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { name: 'Overview', path: '/admin' },
    { name: 'Workers', path: '/admin/workers' },
    { name: 'Services', path: '/admin/services' },
    { name: 'Locations', path: '/admin/locations' },
    { name: 'Complaints', path: '/admin/complaints' },
    { name: 'Analytics', path: '/admin/analytics' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-surface-cream p-4 sm:p-8 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-brand-deep-navy mb-8">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          {tabs.map((tab) => {
            // For overview, exact match. For others, prefix match.
            const isActive = tab.path === '/admin' ? currentPath === '/admin' : currentPath.startsWith(tab.path);
            return (
              <Link
                key={tab.name}
                to={tab.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-teal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>

        {/* Content */}
        <Outlet />
      </div>
    </div>
  );
}
