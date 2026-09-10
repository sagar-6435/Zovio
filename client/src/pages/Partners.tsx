import React, { useState } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Star, MapPin, BadgeCheck, Clock, ArrowLeft, ChevronDown, Check, ShieldCheck, Phone } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Route } from '../routes/partners';

export default function Partners() {
  const { service } = Route.useSearch();
  const serviceName = service || "Selected Service";

  const [viewMode, setViewMode] = useState<'list' | 'profile'>('list');
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('Recommended');

  // Mock partners data
  const partners = [
    {
      id: 1,
      name: "Ramesh Kumar",
      avatar: "https://loremflickr.com/150/150/portrait,face,man?random=1",
      rating: 4.8,
      reviews: 124,
      jobsCompleted: 340,
      distance: "1.2 km away",
      hourlyRate: "₹250/hr",
      isVerified: true,
      bio: "Expert with 5+ years of experience in quick and reliable service. I specialize in fast turnarounds and high-quality finishes.",
      skills: ["Fast Worker", "Reliable", "Expertise"],
      memberSince: "2021",
      phone: "+919494453388"
    },
    {
      id: 2,
      name: "Sunita Sharma",
      avatar: "https://loremflickr.com/150/150/portrait,face,woman?random=2",
      rating: 4.9,
      reviews: 89,
      jobsCompleted: 210,
      distance: "2.5 km away",
      hourlyRate: "₹300/hr",
      isVerified: true,
      bio: "Specialist focused on high-quality work and customer satisfaction. Always leaving the workspace cleaner than I found it.",
      skills: ["Detail Oriented", "Clean", "Friendly"],
      memberSince: "2022",
      phone: "+919876543211"
    },
    {
      id: 3,
      name: "Anil Reddy",
      avatar: "https://loremflickr.com/150/150/portrait,face,man?random=3",
      rating: 4.6,
      reviews: 56,
      jobsCompleted: 115,
      distance: "3.8 km away",
      hourlyRate: "₹200/hr",
      isVerified: false,
      bio: "Affordable and fast service provider ready to help. Available for emergency callouts 24/7.",
      skills: ["Emergency", "Affordable"],
      memberSince: "2023",
      phone: "+919876543212"
    },
    {
      id: 4,
      name: "Priya Patel",
      avatar: "https://loremflickr.com/150/150/portrait,face,woman?random=4",
      rating: 4.7,
      reviews: 210,
      jobsCompleted: 560,
      distance: "4.1 km away",
      hourlyRate: "₹280/hr",
      isVerified: true,
      bio: "Highly experienced professional with top ratings. I guarantee my work for up to 6 months.",
      skills: ["Guarantee", "Experienced", "Top Rated"],
      memberSince: "2019",
      phone: "+919876543213"
    }
  ];

  const handleProfileClick = (worker: any) => {
    setSelectedWorker(worker);
    setViewMode('profile');
  };

  const renderContent = () => {
    if (viewMode === 'profile' && selectedWorker) {
      return (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4">
          <button 
            onClick={() => setViewMode('list')}
            className="flex items-center text-sm font-semibold text-brand-teal hover:text-brand-orange-strong transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Partners
          </button>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4 border-4 border-white">
                <img src={selectedWorker.avatar} alt={selectedWorker.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-brand-deep-navy">{selectedWorker.name}</h1>
              {selectedWorker.isVerified && (
                <div className="flex items-center gap-1 text-sm font-bold text-brand-teal bg-brand-teal-soft px-3 py-1 rounded-full mt-2">
                  <ShieldCheck className="w-4 h-4" /> Verified Professional
                </div>
              )}
              
              <div className="flex items-center gap-4 mt-6 w-full justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 font-bold text-brand-deep-navy text-xl">
                    <Star className="w-5 h-5 fill-brand-orange text-brand-orange" /> {selectedWorker.rating}
                  </div>
                  <p className="text-xs text-ink-soft">{selectedWorker.reviews} reviews</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="font-bold text-brand-deep-navy text-xl">{selectedWorker.jobsCompleted}</div>
                  <p className="text-xs text-ink-soft">Jobs done</p>
                </div>
              </div>
              
              <a 
                href={`tel:${selectedWorker.phone}`}
                className="w-full mt-8 py-3 bg-brand-orange text-brand-deep-navy font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" /> Call {selectedWorker.name} Now
              </a>
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold text-brand-deep-navy mb-4 border-b border-gray-100 pb-2">About</h2>
              <p className="text-ink-soft leading-relaxed mb-6">{selectedWorker.bio}</p>
              
              <h2 className="text-xl font-bold text-brand-deep-navy mb-4 border-b border-gray-100 pb-2">Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-ink-soft mb-6">
                <div>
                  <span className="block font-semibold text-brand-deep-navy">Hourly Rate</span>
                  {selectedWorker.hourlyRate}
                </div>
                <div>
                  <span className="block font-semibold text-brand-deep-navy">Distance</span>
                  {selectedWorker.distance}
                </div>
                <div>
                  <span className="block font-semibold text-brand-deep-navy">Member Since</span>
                  {selectedWorker.memberSince}
                </div>
                <div>
                  <span className="block font-semibold text-brand-deep-navy">Primary Service</span>
                  {serviceName}
                </div>
              </div>

              <h2 className="text-xl font-bold text-brand-deep-navy mb-4 border-b border-gray-100 pb-2">Skills & Badges</h2>
              <div className="flex flex-wrap gap-2">
                {selectedWorker.skills.map((skill: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default List View
    return (
      <>
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 mb-6 relative">
          <span className="text-sm font-semibold text-ink-soft">Sort by:</span>
          
          <div className="relative">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-brand-deep-navy text-sm font-semibold shadow-sm hover:border-brand-teal transition-colors"
            >
              {activeSort}
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {isSortOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                {['Recommended', 'Highest Rated', 'Nearest', 'Price: Low to High'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setActiveSort(option);
                      setIsSortOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-brand-deep-navy hover:bg-brand-teal-soft hover:text-brand-teal flex items-center justify-between"
                  >
                    {option}
                    {activeSort === option && <Check className="w-4 h-4 text-brand-teal" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Partners List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
              <div className="flex gap-4 sm:gap-6">
                
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                    <img src={partner.avatar} alt={partner.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  {partner.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-sm">
                      <BadgeCheck className="w-6 h-6 text-brand-teal" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-display text-xl font-bold text-brand-deep-navy group-hover:text-brand-orange-strong transition-colors line-clamp-1">{partner.name}</h2>
                      <div className="flex items-center gap-1 mt-1 text-sm font-semibold text-brand-deep-navy">
                        <Star className="w-4 h-4 fill-brand-orange text-brand-orange" />
                        <span>{partner.rating}</span>
                        <span className="text-ink-soft font-normal">({partner.reviews})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-brand-teal">{partner.hourlyRate}</p>
                    </div>
                  </div>

                  <p className="text-sm text-ink-soft mt-3 line-clamp-2 leading-relaxed">
                    {partner.bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-ink-soft">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-orange" /> {partner.distance}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-teal" /> {partner.jobsCompleted} jobs</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-5 border-t border-gray-100 flex gap-3">
                <a 
                  href={`tel:${partner.phone}`}
                  className="flex-1 py-3 bg-brand-orange text-brand-deep-navy font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Call Now
                </a>
                <button 
                  onClick={() => handleProfileClick(partner)}
                  className="px-5 py-3 bg-brand-teal-soft text-brand-teal font-bold rounded-xl hover:bg-brand-teal/20 transition-colors"
                >
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="relative min-h-screen bg-surface-cream text-foreground overflow-hidden font-sans pb-24 lg:pb-10">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Header (Only show in list view) */}
        {viewMode === 'list' && (
          <div className="mb-2 animate-in fade-in slide-in-from-top-4">
            <Link to="/services" className="inline-flex items-center text-sm font-semibold text-brand-teal hover:text-brand-orange-strong transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Services
            </Link>
          </div>
        )}

        {/* Dynamic Content */}
        {renderContent()}

      </div>
    </div>
  );
}
