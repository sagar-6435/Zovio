import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import {
  MapPin,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  HelpCircle,
  Loader
} from "lucide-react";

const supportedLocations = ["Kakinada", "Kathipudi", "Tuni", "Annavaram"];

// Function to get nearest city based on coordinates
async function getNearestCity(lat: number, lng: number): Promise<string> {
  try {
    console.log(`Getting city for coordinates: ${lat}, ${lng}`);
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en'
        }
      }
    );
    const data = await response.json();
    console.log("Nominatim response:", data);
    
    // Try different address fields to find city
    const city = data.address?.city || 
                 data.address?.town || 
                 data.address?.village || 
                 data.address?.county ||
                 data.name ||
                 "Unknown";
    
    console.log("Detected city:", city);
    
    // Check if city is in supported locations
    const supportedCity = supportedLocations.find(
      loc => city.toLowerCase().includes(loc.toLowerCase()) || loc.toLowerCase().includes(city.toLowerCase())
    );
    
    const result = supportedCity || city || "Kakinada";
    console.log("Final city result:", result);
    return result;
  } catch (error) {
    console.error("Error getting city from coordinates:", error);
    return "Kakinada"; // Default fallback
  }
}

export function Navbar() {
  const [location, setLocation] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log(`User location obtained: ${latitude}, ${longitude}`);
            const city = await getNearestCity(latitude, longitude);
            console.log("Setting location to:", city);
            setLocation(city);
            setIsLoadingLocation(false);
          } catch (error) {
            console.error("Error processing location:", error);
            setLocation("Kakinada");
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error.code, error.message);
          console.log("Using default location: Kakinada");
          setLocation("Kakinada"); // Fallback to Kakinada
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.warn("Geolocation not available");
      setLocation("Kakinada"); // Fallback if geolocation not available
      setIsLoadingLocation(false);
    }
  }, []);

  return (
    <header className="relative z-20 border-b border-brand-deep-navy/10 bg-surface-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Zovio home">
          <img src="/zovio-logo.png" alt="Zovio Logo" className="h-10 w-auto object-contain" />
          <span className="font-display text-[22px] font-extrabold tracking-[-0.04em]">Zovio</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-ink-soft lg:flex" aria-label="Main navigation">
          <a href="/#services" className="text-brand-deep-navy transition-colors hover:text-brand-orange-strong">Services</a>
          <a href="/#properties" className="transition-colors hover:text-brand-orange-strong">Properties</a>
          <a href="/#how-it-works" className="transition-colors hover:text-brand-orange-strong">How it works</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 rounded-lg px-3 py-2 bg-brand-orange/10 border border-brand-orange/30 sm:px-4">
            <MapPin className="h-4 w-4 text-brand-orange-strong" aria-hidden="true" />
            {isLoadingLocation ? (
              <Loader className="h-4 w-4 text-brand-orange-strong animate-spin" aria-hidden="true" />
            ) : (
              <span className="text-xs font-bold text-brand-orange-strong sm:text-sm">{location}</span>
            )}
          </div>
          
          <Link to="/help" className="hidden h-10 items-center gap-2 rounded-full border border-brand-deep-navy/15 px-4 text-sm font-bold transition-colors hover:border-brand-orange hover:bg-brand-orange/10 sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-teal-soft text-xs text-brand-teal"><HelpCircle className="h-4 w-4" /></span>
            <span>Help</span>
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="hidden h-10 items-center gap-2 rounded-full border border-brand-deep-navy/15 px-4 text-sm font-bold transition-colors hover:border-brand-teal hover:bg-brand-teal/10 sm:flex">
                <UserIcon className="h-4 w-4 text-brand-teal" />
                <span>{user?.name?.split(' ')[0] || 'Profile'}</span>
              </Link>
              <button onClick={logout} className="hidden h-10 items-center justify-center rounded-full bg-red-50 text-red-600 px-3 text-sm font-bold transition-colors hover:bg-red-100 sm:flex" title="Logout">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden h-10 items-center gap-2 rounded-full bg-brand-deep-navy text-white px-5 text-sm font-bold transition-colors hover:bg-brand-deep-navy/90 sm:flex">
              Login / Register
            </Link>
          )}
          <button type="button" aria-label="Open menu" onClick={() => setMobileMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-deep-navy/15 lg:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="border-t border-brand-deep-navy/10 px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-bold">
            <a href="/#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="/#properties" onClick={() => setMobileMenuOpen(false)}>Properties</a>
            <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <Link to="/help" onClick={() => setMobileMenuOpen(false)}>Help</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
