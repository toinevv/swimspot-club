
import { useState, useEffect } from 'react';

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  useEffect(() => {
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
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    }
  }, []);

  return { userLocation, locationPermissionDenied };
};
