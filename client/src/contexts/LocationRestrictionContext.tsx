import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationRestrictionContextType {
  locationRestrictionEnabled: boolean;
  setLocationRestrictionEnabled: (enabled: boolean) => void;
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  isWithinRadius: boolean | null;
  setIsWithinRadius: (within: boolean | null) => void;
}

const LocationRestrictionContext = createContext<LocationRestrictionContextType | undefined>(undefined);

export function LocationRestrictionProvider({ children }: { children: React.ReactNode }) {
  const [locationRestrictionEnabled, setLocationRestrictionEnabledState] = useState<boolean>(() => {
    // Load from localStorage on initialization
    try {
      const stored = localStorage.getItem('locationRestrictionEnabled');
      return stored ? JSON.parse(stored) : false;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return false;
    }
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isWithinRadius, setIsWithinRadius] = useState<boolean | null>(null);

  // Update localStorage when state changes
  const setLocationRestrictionEnabled = (enabled: boolean) => {
    console.log('Setting location restriction to:', enabled);
    try {
      localStorage.setItem('locationRestrictionEnabled', JSON.stringify(enabled));
      setLocationRestrictionEnabledState(enabled);
    } catch (e) {
      console.error('Error writing to localStorage:', e);
      setLocationRestrictionEnabledState(enabled);
    }
  };

  return (
    <LocationRestrictionContext.Provider 
      value={{
        locationRestrictionEnabled,
        setLocationRestrictionEnabled,
        userLocation,
        setUserLocation,
        isWithinRadius,
        setIsWithinRadius,
      }}
    >
      {children}
    </LocationRestrictionContext.Provider>
  );
}

export function useLocationRestriction() {
  const context = useContext(LocationRestrictionContext);
  if (!context) {
    throw new Error('useLocationRestriction must be used within LocationRestrictionProvider');
  }
  return context;
}
