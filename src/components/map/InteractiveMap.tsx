
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SwimSpot } from '@/types';
import SwimSpotMarker from './SwimSpotMarker';
import { createRoot } from 'react-dom/client';

interface InteractiveMapProps {
  spots: SwimSpot[];
  onSpotClick: (spot: SwimSpot) => void;
  mapboxToken?: string;
}

const InteractiveMap = ({ spots, onSpotClick, mapboxToken }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Changed to outdoors style which is better for swim spots
      center: [4.9041, 52.3676], // Amsterdam coordinates
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add geolocation control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

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

  if (!mapboxToken) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-64px)] bg-swimspot-drift-sand/10">
        <div className="text-center p-6 max-w-md">
          <div className="text-swimspot-blue-green text-xl font-medium mb-4">Mapbox API Key Required</div>
          <p className="text-gray-600 mb-4">Please provide a Mapbox token in the search bar above to view the map.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;
