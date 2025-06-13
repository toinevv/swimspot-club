
import { useState, useEffect } from 'react';

const MAP_POSITION_KEY = 'swimspot_last_map_position';

interface MapPosition {
  lat: number;
  lng: number;
  zoom: number;
}

export const useMapPosition = () => {
  const [lastPosition, setLastPosition] = useState<MapPosition | null>(null);

  useEffect(() => {
    // Load saved position from localStorage on init
    const saved = localStorage.getItem(MAP_POSITION_KEY);
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
    localStorage.setItem(MAP_POSITION_KEY, JSON.stringify(position));
  };

  const getMapPosition = (): MapPosition | null => {
    return lastPosition;
  };

  return { saveMapPosition, getMapPosition };
};
