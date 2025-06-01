
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SwimSpot } from '@/types';

export const useCityRedirect = (
  city: string | undefined,
  locationPermissionDenied: boolean,
  allSpots: SwimSpot[]
) => {
  const navigate = useNavigate();

  // Find city with most swim spots
  const getCityWithMostSpots = () => {
    if (!allSpots.length) return null;
    
    const cityCount = allSpots.reduce((acc, spot) => {
      if (spot.city) {
        acc[spot.city] = (acc[spot.city] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    const topCity = Object.entries(cityCount).reduce((max, [city, count]) => 
      count > max.count ? { city, count } : max, 
      { city: '', count: 0 }
    );
    
    return topCity.city || null;
  };

  // Redirect to city with most spots if no location and no city selected
  useEffect(() => {
    if (!city && locationPermissionDenied && allSpots.length > 0) {
      const topCity = getCityWithMostSpots();
      if (topCity) {
        navigate(`/${topCity}`, { replace: true });
      }
    }
  }, [city, locationPermissionDenied, allSpots, navigate]);

  return { getCityWithMostSpots };
};
