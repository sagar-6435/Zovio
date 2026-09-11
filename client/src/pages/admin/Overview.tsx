import React, { useState } from 'react';
import { Users, Briefcase, DollarSign, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useLocationRestriction } from '../../contexts/LocationRestrictionContext';

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

  // Location restriction state from context
  const { 
    locationRestrictionEnabled, 
    setLocationRestrictionEnabled,
    userLocation,
    setUserLocation,
    isWithinRadius,
    setIsWithinRadius
  } = useLocationRestriction();
  
  const [locationError, setLocationError] = useState<string | null>(null);
  const RADIUS_KM = 15;

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Check if user is within radius of supported locations (using center point as example: Delhi)
  const checkLocationRestriction = (userLat: number, userLng: number): boolean => {
    // Delhi center coordinates as reference point
    const delhiCenter = { lat: 28.7041, lng: 77.1025 };
    const distance = calculateDistance(userLat, userLng, delhiCenter.lat, delhiCenter.lng);
    return distance <= RADIUS_KM;
  };

  // Handle location restriction toggle
  const handleLocationToggle = () => {
    console.log('Toggle clicked. Current state:', locationRestrictionEnabled);
    
    if (!locationRestrictionEnabled) {
      // Turning ON - request location
      setLocationError(null);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Location obtained:', latitude, longitude);
            setUserLocation({ lat: latitude, lng: longitude });
            const withinRadius = checkLocationRestriction(latitude, longitude);
            console.log('Within radius:', withinRadius);
            setIsWithinRadius(withinRadius);
            setLocationRestrictionEnabled(true);
            console.log('Location restriction enabled');
          },
          (error) => {
            console.error('Geolocation error:', error);
            setLocationError(`Unable to access location: ${error.message}`);
            setIsWithinRadius(null);
            // Still enable the toggle even if location failed
            setLocationRestrictionEnabled(true);
          }
        );
      } else {
        console.warn('Geolocation not supported');
        setLocationError('Geolocation is not supported by your browser');
        // Still enable the toggle
        setLocationRestrictionEnabled(true);
      }
    } else {
      // Turning OFF
      console.log('Disabling location restriction');
      setLocationRestrictionEnabled(false);
      setUserLocation(null);
      setIsWithinRadius(null);
      setLocationError(null);
    }
  };

  const stats = [
    { title: 'Total Users', value: '1,245', icon: <Users className="text-blue-500 w-8 h-8" /> },
    { title: 'Active Services', value: '342', icon: <Briefcase className="text-green-500 w-8 h-8" /> },
    { title: 'Total Revenue', value: '₹45k', icon: <DollarSign className="text-yellow-500 w-8 h-8" /> },
    { title: 'Locations', value: `${locations.length}`, icon: <MapPin className="text-purple-500 w-8 h-8" /> },
  ];

  return (
    <div>
      {/* Location Restriction Toggle */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Location Restriction</h3>
            <p className="text-sm text-gray-600 mb-4">
              {locationRestrictionEnabled 
                ? `Enable: Users must be within ${RADIUS_KM}km to access services`
                : `Disable: Users can access services from anywhere`
              }
            </p>
            
            {locationRestrictionEnabled && (
              <div className="mt-4 space-y-2">
                {userLocation && (
                  <p className="text-sm text-gray-500">
                    Your Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                )}
                {isWithinRadius !== null && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    isWithinRadius 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {isWithinRadius ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${
                      isWithinRadius ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isWithinRadius 
                        ? `✓ Within ${RADIUS_KM}km radius` 
                        : `✗ Outside ${RADIUS_KM}km radius`
                      }
                    </span>
                  </div>
                )}
                {locationError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-red-600">{locationError}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Toggle Switch */}
          <button
            onClick={handleLocationToggle}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              locationRestrictionEnabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={locationRestrictionEnabled}
            aria-label="Location restriction toggle"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                locationRestrictionEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
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
