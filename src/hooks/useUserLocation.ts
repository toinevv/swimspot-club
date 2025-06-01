
import { useState, useEffect } from 'react';

export const useUserLocation = (city?: string) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  useEffect(() => {
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
          setLocationPermissionDenied(false);
        },
        (error) => {
          console.log("Geolocation error:", error);
          setLocationPermissionDenied(true);
          // Default to Western Europe center if no location access
          setUserLocation([10.0, 54.0]);
        }
      );
    }
  }, [city]);

  return { userLocation, locationPermissionDenied };
};
