
import { useState, useEffect } from 'react';
import { settingsService } from '@/services/settingsService';

const FALLBACK_TOKEN = "pk.eyJ1IjoidG9pbmV2IiwiYSI6ImNtYWZtaThoZDAzamEyanI2M3ZqOW5qcXkifQ.Cbm2AuiD07FcctvHIxz-DA";

export const useMapboxToken = () => {
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        setIsTokenLoading(true);
        const { mapboxToken } = await settingsService.getMapSettings();
        
        if (mapboxToken) {
          setMapboxToken(mapboxToken);
          console.log("Retrieved Mapbox token from Supabase");
        } else {
          console.warn("No Mapbox token found in Supabase, using fallback token");
          setMapboxToken(FALLBACK_TOKEN);
        }
      } catch (error) {
        console.error("Error fetching Mapbox token:", error);
        setMapboxToken(FALLBACK_TOKEN);
      } finally {
        setIsTokenLoading(false);
      }
    };
    
    fetchMapboxToken();
  }, []);

  return { mapboxToken, isTokenLoading };
};
