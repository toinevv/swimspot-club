
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SwimSpot } from '@/types';
import SwimSpotMarker from './SwimSpotMarker';
import { createRoot } from 'react-dom/client';

interface InteractiveMapProps {
  spots: SwimSpot[];
  onSpotClick: (spot: SwimSpot) => void;
}

const InteractiveMap = ({ spots, onSpotClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // TODO: In production, use environment variable for token
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [4.9041, 52.3676], // Amsterdam coordinates
      zoom: 12
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    spots.forEach(spot => {
      const markerDiv = document.createElement('div');
      const root = createRoot(markerDiv);
      
      root.render(
        <SwimSpotMarker 
          spot={spot}
          onClick={() => onSpotClick(spot)}
        />
      );

      const marker = new mapboxgl.Marker(markerDiv)
        .setLngLat([spot.location.longitude, spot.location.latitude])
        .addTo(map.current!);

      markersRef.current[spot.id] = marker;
    });
  }, [spots, mapLoaded, onSpotClick]);

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;
