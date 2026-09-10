import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, CalendarDays, 
  Heart, Settings, ShieldCheck, LogOut, ChevronRight,
  Camera, Map, CreditCard, Bell, HelpCircle, Sparkles, ArrowLeft, Clock, Loader2
} from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, token, updateUser, logout } = useAuth();
  const navigate = useNavigate({ from: '/profile' });
  
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Form States
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [city, setCity] = useState(user?.address?.city || '');
  const [state, setState] = useState(user?.address?.state || '');
  const [zipCode, setZipCode] = useState(user?.address?.zipCode || '');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Protect route
  useEffect(() => {
    if (!user) {
      navigate({ to: '/login' });
    }
  }, [user, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent, type: 'personal' | 'address') => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = type === 'personal' 
        ? { name, phone } 
        : { address: { street, city, state, zipCode } };

      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update');

      updateUser(data);
      setMessage(type === 'personal' ? 'Personal details updated!' : 'Address updated!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Bookings':
        return (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-6">My Bookings</h2>
            <div className="space-y-4">
              {[
                { service: "Plumbing Repair", date: "Tomorrow, 10:00 AM", location: "Home", status: "Confirmed" },
                { service: "AC Servicing", date: "Oct 15, 2:00 PM", location: "Home", status: "Pending Provider" }
              ].map((booking, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl bg-surface-cream/50 border border-gray-100 hover:border-brand-teal/30 transition-colors">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-bold text-brand-deep-navy">{booking.service}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-ink-soft">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {booking.date}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Saved':
        return (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-6">Saved Properties</h2>
            <div className="text-center py-10 text-ink-soft">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>You haven't saved any properties yet.</p>
            </div>
          </div>
        );
      case 'Payments':
        return (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-6">Payments</h2>
            <div className="p-4 rounded-2xl border border-brand-teal/30 bg-brand-teal-soft flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-brand-teal">Wallet Balance</p>
                <p className="text-3xl font-display font-extrabold text-brand-deep-navy">₹1,250</p>
              </div>
              <button className="px-4 py-2 bg-brand-teal text-white rounded-xl font-semibold shadow hover:bg-brand-teal/90">Add Funds</button>
            </div>
          </div>
        );
      case 'Addresses':
      case 'Manage Addresses':
        return (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-6">Manage Addresses</h2>
            {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm">{message}</div>}
            <form onSubmit={(e) => handleUpdateProfile(e, 'address')} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink-soft mb-1">Street Address</label>
                <input type="text" value={street} onChange={e => setStreet(e.target.value)} placeholder="123 Main St" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-brand-teal" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink-soft mb-1">City</label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Bhimavaram" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-brand-teal" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink-soft mb-1">State</label>
                  <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="AP" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-brand-teal" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-soft mb-1">ZIP Code</label>
                <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)} placeholder="534202" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-brand-teal" />
              </div>
              <button disabled={loading} className="w-full mt-4 flex items-center justify-center py-3 bg-brand-orange text-brand-deep-navy font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-70">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Address'}
              </button>
            </form>
          </div>
        );
      case 'Personal Details':
        return (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-6">Personal Details</h2>
            {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm">{message}</div>}
            <form onSubmit={(e) => handleUpdateProfile(e, 'personal')} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink-soft mb-1">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-brand-teal" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-soft mb-1">Email Address</label>
                <input type="email" value={user?.email} disabled className="w-full p-3 rounded-xl border border-gray-200 bg-gray-200 text-gray-500 outline-none cursor-not-allowed" />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-soft mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium border-r border-gray-200 pr-2">+91</span>
                  </div>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="9876543210" className="w-full pl-14 p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-brand-teal" />
                </div>
              </div>
              <button disabled={loading} className="w-full mt-4 flex items-center justify-center py-3 bg-brand-orange text-brand-deep-navy font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-70">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
              </button>
            </form>
          </div>
        );
      case 'Notifications':
        return (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-6">Notifications</h2>
            <div className="space-y-4">
              {['Order Updates', 'Promotions & Offers', 'Service Reminders', 'System Alerts'].map((notif, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-brand-deep-navy">{notif}</span>
                  <div className="w-11 h-6 bg-brand-teal rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-6">Settings</h2>
            <div className="space-y-4 text-ink-soft">
              <p>App settings, language preferences, and privacy controls will appear here.</p>
            </div>
          </div>
        );
      case 'Help & Support':
        return (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="font-display text-xl font-bold text-brand-deep-navy mb-6">Help & Support</h2>
            <div className="space-y-4 text-ink-soft">
              <button className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-brand-teal-soft transition-colors">
                <span className="font-bold text-brand-deep-navy block">FAQs</span>
                <span className="text-sm">Find answers to common questions</span>
              </button>
              <button className="w-full p-4 text-left border border-gray-200 rounded-xl hover:bg-brand-teal-soft transition-colors">
                <span className="font-bold text-brand-deep-navy block">Contact Support</span>
                <span className="text-sm">Reach out to our customer care team</span>
              </button>
            </div>
          </div>
        );
      case 'Overview':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <CalendarDays className="w-5 h-5" />, label: "Bookings", color: "text-blue-600", bg: "bg-blue-100" },
                  { icon: <Heart className="w-5 h-5" />, label: "Saved", color: "text-rose-600", bg: "bg-rose-100" },
                  { icon: <CreditCard className="w-5 h-5" />, label: "Payments", color: "text-emerald-600", bg: "bg-emerald-100" },
                  { icon: <Map className="w-5 h-5" />, label: "Addresses", color: "text-purple-600", bg: "bg-purple-100" },
                ].map((item, idx) => (
                  <button key={idx} onClick={() => setActiveTab(item.label)} className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-brand-deep-navy">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display text-xl font-bold text-brand-deep-navy">Recent Bookings</h2>
                  <button onClick={() => setActiveTab('Bookings')} className="text-sm font-semibold text-brand-teal hover:text-brand-orange-strong transition-colors">View all</button>
                </div>
                <div className="space-y-4">
                  {[
                    { service: "AC Repair", date: "Oct 12, 2026", status: "Completed", icon: <Settings /> },
                    { service: "Deep Cleaning", date: "Sep 28, 2026", status: "Completed", icon: <Sparkles /> },
                  ].map((booking, idx) => (
                    <div key={idx} onClick={() => setActiveTab('Bookings')} className="flex items-center p-4 rounded-2xl bg-surface-cream/50 border border-gray-100 hover:border-brand-teal/20 transition-colors cursor-pointer group">
                      <div className="p-3 bg-brand-teal-soft text-brand-teal rounded-xl mr-4 group-hover:scale-110 transition-transform">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-deep-navy">{booking.service}</h3>
                        <p className="text-xs text-ink-soft">{booking.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column / Settings */}
            <div className="space-y-4">
              <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-display text-lg font-bold text-brand-deep-navy px-2">Account</h2>
                </div>
                <div className="flex flex-col">
                  {[
                    { icon: <User />, label: "Personal Details" },
                    { icon: <MapPin />, label: "Manage Addresses" },
                    { icon: <Bell />, label: "Notifications" },
                    { icon: <Settings />, label: "Settings" },
                  ].map((item, idx) => (
                    <button key={idx} onClick={() => setActiveTab(item.label)} className="flex items-center px-6 py-4 hover:bg-brand-teal-soft/50 transition-colors group">
                      <div className="text-ink-soft group-hover:text-brand-teal mr-4">
                        {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" } as any)}
                      </div>
                      <span className="font-medium text-brand-deep-navy flex-1 text-left">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-orange-strong transform group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-sm overflow-hidden mt-4">
                <div className="flex flex-col">
                  <button onClick={() => setActiveTab('Help & Support')} className="flex items-center px-6 py-4 hover:bg-brand-teal-soft/50 transition-colors group">
                    <div className="text-ink-soft group-hover:text-brand-teal mr-4"><HelpCircle className="w-5 h-5" /></div>
                    <span className="font-medium text-brand-deep-navy flex-1 text-left">Help & Support</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-orange-strong transform group-hover:translate-x-1 transition-all" />
                  </button>
                  <button onClick={logout} className="flex items-center px-6 py-4 hover:bg-red-50 transition-colors group border-t border-gray-100 w-full">
                    <div className="text-red-400 group-hover:text-red-600 mr-4"><LogOut className="w-5 h-5" /></div>
                    <span className="font-medium text-red-500 group-hover:text-red-700 flex-1 text-left">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-surface-cream text-foreground overflow-hidden font-sans pb-24 lg:pb-10">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        {activeTab === 'Overview' ? (
          <div className="flex flex-col items-center mb-10 animate-in fade-in slide-in-from-top-4">
            <div className="relative group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-brand-teal-soft">
                <img 
                  src="https://loremflickr.com/400/400/portrait,face" 
                  alt="Profile Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-brand-orange text-brand-deep-navy rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <h1 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-brand-deep-navy">{user?.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-ink-soft text-sm font-medium">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-brand-teal" /> {user?.email}</span>
              {user?.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-brand-teal" /> {user.phone}</span>}
            </div>
            <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-brand-teal-soft text-brand-teal rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified User
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center animate-in fade-in slide-in-from-left-4">
            <button 
              onClick={() => setActiveTab('Overview')} 
              className="flex items-center gap-2 text-ink-soft hover:text-brand-orange-strong font-semibold bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Profile
            </button>
          </div>
        )}

        {/* Dynamic Content */}
        {renderContent()}

      </div>
    </div>
  );
}
