
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useUserLocation = (city?: string) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Don't get user location if we already have URL coordinates or a city
    const hasUrlCoordinates = searchParams.get('lat') && searchParams.get('lng');
    
    if (!city && !hasUrlCoordinates && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(location);
          setLocationPermissionDenied(false);
          
          // Only redirect if we don't already have coordinates in URL
          const params = new URLSearchParams();
          params.set('lat', position.coords.latitude.toString());
          params.set('lng', position.coords.longitude.toString());
          params.set('zoom', '12');
          navigate(`/?${params.toString()}`, { replace: true });
        },
        (error) => {
          console.log("Geolocation error:", error);
          setLocationPermissionDenied(true);
          // Default to France-Switzerland border area
          setUserLocation([6.0, 48.7]);
        }
      );
    }
  }, [city, navigate, searchParams]);

  return { userLocation, locationPermissionDenied };
};
