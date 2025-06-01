
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useUserLocation = (city?: string) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(location);
          setLocationPermissionDenied(false);
          
          // Immediately redirect to the user's location with map parameters
          const params = new URLSearchParams();
          params.set('lat', position.coords.latitude.toString());
          params.set('lng', position.coords.longitude.toString());
          params.set('zoom', '12');
          navigate(`/?${params.toString()}`, { replace: true });
        },
        (error) => {
          console.log("Geolocation error:", error);
          setLocationPermissionDenied(true);
          // Default to Western Europe center if no location access
          setUserLocation([10.0, 54.0]);
        }
      );
    }
  }, [city, navigate]);

  return { userLocation, locationPermissionDenied };
};
