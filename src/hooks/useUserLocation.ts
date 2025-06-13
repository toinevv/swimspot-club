
import { useState, useEffect } from 'react';

export const useUserLocation = (city?: string) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  useEffect(() => {
    // If there's a specific city, don't try to get user location
    if (city) {
      return;
    }
    
    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          console.log('User location retrieved:', { latitude, longitude });
        },
        (error) => {
          console.log('Location access denied or failed:', error);
          setLocationPermissionDenied(true);
          // No fallback here - let the calling component handle it
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    }
  }, [city]);

  return { userLocation, locationPermissionDenied };
};
