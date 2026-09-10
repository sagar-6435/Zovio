import React, { useState } from 'react';
import { 
  ClipboardList, Clock, Wallet, Star, CheckCircle, AlertCircle, 
  MapPin, Phone, Calendar, TrendingUp, Eye, X, MapPinIcon
} from 'lucide-react';

export default function WorkerDashboard() {
  const [activeTab, setActiveTab] = useState('Active Jobs');
  const [selectedJob, setSelectedJob] = useState(null);

  // Mock data for worker
  const stats = [
    { title: 'Active Jobs', value: '5', icon: <ClipboardList className="w-8 h-8 text-blue-500" /> },
    { title: 'Pending Today', value: '2', icon: <Clock className="w-8 h-8 text-orange-500" /> },
    { title: 'This Month', value: '₹5,400', icon: <Wallet className="w-8 h-8 text-green-500" /> },
    { title: 'Rating', value: '4.8/5', icon: <Star className="w-8 h-8 text-yellow-500" /> },
  ];

  const activeJobs = [
    {
      id: 1,
      service: 'Plumbing - Leak Repair',
      customer: 'Rajesh Kumar',
      address: '123 Main Street, Apt 5B',
      scheduledDate: 'Today, 2:00 PM',
      amount: '₹450',
      status: 'Confirmed',
      phone: '+91 98765 43210',
      notes: 'Leaking pipe under kitchen sink',
      priority: 'High'
    },
    {
      id: 2,
      service: 'Electrical - Light Installation',
      customer: 'Priya Singh',
      address: '456 Oak Avenue, Ground Floor',
      scheduledDate: 'Today, 4:30 PM',
      amount: '₹600',
      status: 'Confirmed',
      phone: '+91 97654 32109',
      notes: 'Install 4 wall lights in living room',
      priority: 'Medium'
    },
    {
      id: 3,
      service: 'Carpentry - Door Installation',
      customer: 'Amit Patel',
      address: '789 Elm Road, 2nd Floor',
      scheduledDate: 'Tomorrow, 10:00 AM',
      amount: '₹1,200',
      status: 'Accepted',
      phone: '+91 96543 21098',
      notes: 'Install wooden door frame and door',
      priority: 'Medium'
    },
    {
      id: 4,
      service: 'Electrical - Wiring',
      customer: 'Sneha Desai',
      address: '321 Pine Lane, 3rd Floor',
      scheduledDate: 'Oct 15, 11:00 AM',
      amount: '₹800',
      status: 'Pending',
      phone: '+91 95432 10987',
      notes: 'Rewire bedroom circuit',
      priority: 'Low'
    },
    {
      id: 5,
      service: 'Plumbing - Tap Replacement',
      customer: 'Vikram Reddy',
      address: '654 Maple Drive, Apt 2C',
      scheduledDate: 'Oct 16, 3:00 PM',
      amount: '₹350',
      status: 'Pending',
      phone: '+91 94321 09876',
      notes: 'Replace bathroom tap with new faucet',
      priority: 'Low'
    },
  ];

  const completedJobs = [
    {
      id: 101,
      service: 'Plumbing - Drain Cleaning',
      customer: 'Arjun Sharma',
      completedDate: 'Sep 20, 2026',
      amount: '₹550',
      rating: 5,
      feedback: 'Excellent work, very professional'
    },
    {
      id: 102,
      service: 'Electrical - Socket Repair',
      customer: 'Deepika Gupta',
      completedDate: 'Sep 18, 2026',
      amount: '₹400',
      rating: 4,
      feedback: 'Good service, completed on time'
    },
    {
      id: 103,
      service: 'Carpentry - Shelf Installation',
      customer: 'Rohan Kapoor',
      completedDate: 'Sep 15, 2026',
      amount: '₹750',
      rating: 5,
      feedback: 'Perfect installation, very neat work'
    },
  ];

  const earnings = [
    { month: 'August', completed: '₹12,500', pending: '₹2,300' },
    { month: 'September', completed: '₹15,800', pending: '₹3,200' },
    { month: 'October', completed: '₹8,400', pending: '₹5,400' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Active Jobs':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-500" /> Active Jobs
            </h2>
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-teal/30 bg-gray-50/50 transition-all duration-300 hover:shadow-md">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-start justify-between md:justify-start md:gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{job.service}</h3>
                        <p className="text-sm text-gray-600 mt-1">Customer: {job.customer}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-2 ${
                        job.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        job.status === 'Accepted' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {job.scheduledDate}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.address}</span>
                      <span className="font-semibold text-gray-900">{job.amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedJob(job)}
                      className="px-4 py-2 text-sm font-semibold text-brand-teal border border-brand-teal rounded-lg hover:bg-brand-teal/5 transition-colors"
                    >
                      <Eye className="w-4 h-4 inline mr-1" /> Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'Completed':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Completed Jobs
            </h2>
            <div className="space-y-4">
              {completedJobs.map((job) => (
                <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="font-bold text-gray-900">{job.service}</h3>
                    <p className="text-sm text-gray-500 mt-1">Completed on {job.completedDate} for {job.customer}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1 text-brand-orange">
                      {[...Array(job.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                      {[...Array(5 - job.rating)].map((_, j) => <Star key={j + job.rating} className="w-4 h-4" />)}
                    </div>
                    <span className="font-semibold text-gray-900 whitespace-nowrap">{job.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'Earnings':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" /> Earnings Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="pb-3 font-semibold">Month</th>
                    <th className="pb-3 font-semibold">Completed Jobs</th>
                    <th className="pb-3 font-semibold">Pending Amount</th>
                    <th className="pb-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {earnings.map((earning, i) => {
                    const completedNum = parseInt(earning.completed.replace(/₹|,/g, ''));
                    const pendingNum = parseInt(earning.pending.replace(/₹|,/g, ''));
                    const total = completedNum + pendingNum;
                    return (
                      <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                        <td className="py-4 text-gray-600 font-medium">{earning.month}</td>
                        <td className="py-4 text-gray-900 font-semibold">{earning.completed}</td>
                        <td className="py-4 text-orange-600 font-semibold">{earning.pending}</td>
                        <td className="py-4 text-brand-teal font-bold">₹{total.toLocaleString()}</td>
                      </tr>
                    );
                  })}
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
        <h1 className="text-3xl font-display font-bold text-brand-deep-navy mb-8">Worker Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
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

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-deep-navy">Job Details</h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Service Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedJob.service}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    selectedJob.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    selectedJob.status === 'Accepted' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {selectedJob.status}
                  </span>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    selectedJob.priority === 'High' ? 'bg-red-100 text-red-700' :
                    selectedJob.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedJob.priority} Priority
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" /> Customer Information
                </h4>
                <div className="space-y-3 text-sm">
                  <p><span className="text-gray-600">Name:</span> <span className="font-semibold text-gray-900">{selectedJob.customer}</span></p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-500" /> {selectedJob.phone}</p>
                </div>
              </div>

              {/* Location & Timing */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" /> Location & Schedule
                </h4>
                <div className="space-y-3 text-sm">
                  <p className="flex gap-2"><MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-1" /> <span className="text-gray-900">{selectedJob.address}</span></p>
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> {selectedJob.scheduledDate}</p>
                </div>
              </div>

              {/* Notes & Amount */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Job Details</h4>
                <div className="space-y-4 text-sm">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 mb-2">Notes:</p>
                    <p className="text-gray-900">{selectedJob.notes}</p>
                  </div>
                  <div className="flex items-center justify-between bg-brand-teal/5 p-4 rounded-lg border border-brand-teal/20">
                    <span className="font-semibold text-gray-900">Amount:</span>
                    <span className="text-2xl font-bold text-brand-teal">{selectedJob.amount}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6 flex gap-3">
                {selectedJob.status === 'Pending' && (
                  <>
                    <button className="flex-1 px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                      Accept Job
                    </button>
                    <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                      Decline
                    </button>
                  </>
                )}
                {selectedJob.status === 'Confirmed' && (
                  <>
                    <button className="flex-1 px-4 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange-strong transition-colors">
                      Mark as Complete
                    </button>
                    <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                      Contact Customer
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Placeholder for User icon
function User(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
