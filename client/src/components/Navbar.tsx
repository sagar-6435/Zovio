import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import {
  MapPin,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  HelpCircle,
  ChevronDown
} from "lucide-react";

const supportedLocations = ["Kakinada", "Kathipudi", "Tuni", "Annavaram"];

export function Navbar() {
  const [location, setLocation] = useState("Kakinada");
  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="relative z-20 border-b border-brand-deep-navy/10 bg-surface-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
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
          <div className="relative">
            <button
              type="button"
              aria-expanded={locationOpen}
              onClick={() => setLocationOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 bg-brand-orange/10 border border-brand-orange/30 transition-all hover:bg-brand-orange/20 sm:px-4 sm:text-sm"
            >
              <MapPin className="h-4 w-4 text-brand-orange-strong" aria-hidden="true" />
              <span className="text-xs font-bold text-brand-orange-strong sm:text-sm">{location}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-brand-orange-strong transition-transform ${locationOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {locationOpen && (
              <div className="absolute right-0 top-12 w-48 rounded-xl border border-brand-deep-navy/10 bg-background p-1.5 shadow-xl">
                {supportedLocations.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setLocation(city);
                      setLocationOpen(false);
                    }}
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-brand-deep-navy transition-colors hover:bg-brand-orange/10"
                  >
                    <MapPin className="mr-2 h-3.5 w-3.5 text-brand-teal" aria-hidden="true" />
                    {city}
                  </button>
                ))}
              </div>
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
