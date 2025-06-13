
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useUserLocation = (city?: string) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If there's a specific city, don't try to get user location
    if (city) {
      return;
    }
    
    // Try to get user's current location on app start
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
          // Fallback to Central Europe coordinates for zoomed out view
          setUserLocation([10.0, 50.0]);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      // Geolocation not supported, use Europe fallback
      setUserLocation([10.0, 50.0]);
    }
  }, [city, navigate]);

  return { userLocation, locationPermissionDenied };
};
