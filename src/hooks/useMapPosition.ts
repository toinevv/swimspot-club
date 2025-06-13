
import { useState, useEffect } from 'react';

interface MapPosition {
  lat: number;
  lng: number;
  zoom: number;
}

export const useMapPosition = () => {
  const [lastPosition, setLastPosition] = useState<MapPosition | null>(null);

  useEffect(() => {
    // Load saved position from localStorage on init
    const saved = localStorage.getItem('swimspot_last_map_position');
    if (saved) {
      try {
        setLastPosition(JSON.parse(saved));
      } catch (error) {
        console.log('Failed to parse saved map position');
      }
    }
  }, []);

  const saveMapPosition = (lat: number, lng: number, zoom: number) => {
    const position = { lat, lng, zoom };
    setLastPosition(position);
    localStorage.setItem('swimspot_last_map_position', JSON.stringify(position));
  };

  const getMapPosition = (): MapPosition | null => {
    return lastPosition;
  };

  return { saveMapPosition, getMapPosition };
};
