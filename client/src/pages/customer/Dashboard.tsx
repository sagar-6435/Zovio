import React, { useState } from 'react';
import { Calendar, CheckCircle, CreditCard, Clock, MapPin, Receipt, Star } from 'lucide-react';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('My Bookings');

  const stats = [
    { title: 'My Bookings', value: '3 Active', icon: <Calendar className="text-blue-500 w-8 h-8" /> },
    { title: 'Completed', value: '12 Services', icon: <CheckCircle className="text-green-500 w-8 h-8" /> },
    { title: 'Payments', value: 'History', icon: <CreditCard className="text-purple-500 w-8 h-8" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'My Bookings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" /> Active Bookings
            </h2>
            <div className="space-y-4">
              {[
                { service: "Plumbing Repair", date: "Tomorrow, 10:00 AM", location: "Home - 123 Main St", status: "Confirmed" },
                { service: "AC Servicing", date: "Oct 15, 2:00 PM", location: "Home - 123 Main St", status: "Pending Provider" },
                { service: "House Cleaning", date: "Oct 18, 9:00 AM", location: "Office - 456 Business Rd", status: "Confirmed" }
              ].map((booking, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-brand-teal/30 transition-colors bg-gray-50/50">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="font-bold text-gray-900">{booking.service}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {booking.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {booking.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                    <button className="px-4 py-2 text-sm font-semibold text-brand-deep-navy bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Completed':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Completed Services
            </h2>
            <div className="space-y-4">
              {[
                { service: "Electrician", date: "Sep 20, 2026", provider: "Ravi Kumar", rating: 5 },
                { service: "Pest Control", date: "Aug 15, 2026", provider: "SafeHome Pest Control", rating: 4 },
                { service: "TV Repair", date: "Jul 02, 2026", provider: "TechFix Solutions", rating: 5 }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="font-bold text-gray-900">{item.service}</h3>
                    <p className="text-sm text-gray-500 mt-1">Completed on {item.date} by {item.provider}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-brand-orange">
                      {[...Array(item.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                    </div>
                    <button className="text-sm font-semibold text-brand-teal hover:text-brand-orange-strong transition-colors">
                      Book Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Payments':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-purple-500" /> Payment History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Service</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { date: "Sep 20, 2026", service: "Electrician", amount: "₹450", status: "Paid" },
                    { date: "Aug 15, 2026", service: "Pest Control", amount: "₹1200", status: "Paid" },
                    { date: "Jul 02, 2026", service: "TV Repair", amount: "₹850", status: "Paid" },
                  ].map((payment, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                      <td className="py-4 text-gray-600">{payment.date}</td>
                      <td className="py-4 font-medium text-gray-900">{payment.service}</td>
                      <td className="py-4 text-gray-900 font-semibold">{payment.amount}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-brand-teal font-semibold hover:underline">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface-cream p-4 sm:p-8 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-brand-deep-navy mb-8">Customer Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, i) => {
            const isActive = activeTab === stat.title;
            return (
              <button 
                key={i} 
                onClick={() => setActiveTab(stat.title)}
                className={`text-left p-6 rounded-2xl shadow-sm border transition-all duration-300 flex items-center justify-between group ${
                  isActive 
                    ? 'border-brand-teal ring-2 ring-brand-teal/20 bg-white scale-[1.02]' 
                    : 'border-gray-200 bg-white/70 hover:border-brand-teal/50 hover:bg-white'
                }`}
              >
                <div>
                  <p className={`text-sm mb-1 font-semibold transition-colors ${isActive ? 'text-brand-teal' : 'text-gray-500 group-hover:text-gray-700'}`}>
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-brand-deep-navy">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-brand-teal/10' : 'bg-gray-50 group-hover:bg-brand-teal/5'}`}>
                  {stat.icon}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Area */}
        {renderContent()}

      </div>
    </div>
  );
}
