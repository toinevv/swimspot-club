
import { useState, useEffect } from 'react';

interface MapState {
  center: [number, number];
  zoom: number;
}

const MAP_STATE_KEY = 'map_position';

export const useMapState = () => {
  const [savedMapState, setSavedMapState] = useState<MapState | null>(null);

  // Load saved map position on mount
  useEffect(() => {
    const saved = localStorage.getItem(MAP_STATE_KEY);
    if (saved) {
      try {
        setSavedMapState(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved map position:', error);
      }
    }
  }, []);

  // Simple save map position - save immediately
  const saveMapPosition = (center: [number, number], zoom: number) => {
    const state = { center, zoom };
    localStorage.setItem(MAP_STATE_KEY, JSON.stringify(state));
    setSavedMapState(state);
    console.log('Map position saved:', state);
  };

  return {
    savedMapState,
    saveMapPosition
  };
};
