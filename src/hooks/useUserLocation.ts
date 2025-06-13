
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useUserLocation = (city?: string) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Don't automatically get location - let the map show the default zoomed out Europe view
    // Only get location if specifically requested by user interaction
    if (city) {
      // If there's a specific city, don't try to get user location
      return;
    }
    
    // Set default to Central Europe coordinates for zoomed out view
    setUserLocation([6.0, 48.7]);
  }, [city, navigate]);

  return { userLocation, locationPermissionDenied };
};
