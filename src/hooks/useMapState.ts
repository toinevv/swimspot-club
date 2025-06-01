
import { useState, useEffect, useCallback } from 'react';

interface MapState {
  center: [number, number];
  zoom: number;
}

const MAP_STATE_KEY = 'map_position';

export const useMapState = () => {
  const [savedMapState, setSavedMapState] = useState<MapState | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

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

  // Debounced save map position - only save after user stops moving for 1 second
  const saveMapPosition = useCallback((center: [number, number], zoom: number) => {
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      const state = { center, zoom };
      localStorage.setItem(MAP_STATE_KEY, JSON.stringify(state));
      setSavedMapState(state);
      console.log('Map position saved:', state);
    }, 1000); // Save after 1 second of no movement

    setDebounceTimer(timer);
  }, [debounceTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return {
    savedMapState,
    saveMapPosition
  };
};
