
import { useState, useEffect } from 'react';

interface MapState {
  center: [number, number];
  zoom: number;
}

const MAP_STATE_KEY = 'swimmap_state';

export const useMapState = () => {
  const [mapState, setMapState] = useState<MapState | null>(null);

  // Load map state from sessionStorage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem(MAP_STATE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setMapState(parsed);
      } catch (error) {
        console.error('Error parsing saved map state:', error);
      }
    }
  }, []);

  // Save map state to sessionStorage
  const saveMapState = (center: [number, number], zoom: number) => {
    const state: MapState = { center, zoom };
    setMapState(state);
    sessionStorage.setItem(MAP_STATE_KEY, JSON.stringify(state));
  };

  // Clear map state
  const clearMapState = () => {
    setMapState(null);
    sessionStorage.removeItem(MAP_STATE_KEY);
  };

  return {
    mapState,
    saveMapState,
    clearMapState
  };
};
