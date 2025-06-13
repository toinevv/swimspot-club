
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SwimSpot } from '@/types';
import SwimSpotMarker from './SwimSpotMarker';
import { createRoot } from 'react-dom/client';

interface InteractiveMapProps {
  spots: SwimSpot[];
  onSpotClick: (spot: SwimSpot, mapCenter: [number, number], zoom: number) => void;
  mapboxToken?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

const InteractiveMap = ({ spots, onSpotClick, mapboxToken, initialCenter, initialZoom = 12 }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: initialCenter || [10.0, 50.0], // Default to Central Europe
        zoom: initialZoom
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

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError('There was an error loading the map. Please check your Mapbox token.');
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please try again later.');
    }

    return () => {
      try {
        map.current?.remove();
      } catch (error) {
        console.error('Error cleaning up map:', error);
      }
    };
  }, [mapboxToken, initialCenter, initialZoom]);

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
          onClick={() => {
            // Get CURRENT map center and zoom when clicking a spot
            if (map.current) {
              const center = map.current.getCenter();
              const zoom = map.current.getZoom();
              onSpotClick(spot, [center.lng, center.lat], zoom);
            }
          }}
        />
      );

      const marker = new mapboxgl.Marker(markerDiv)
        .setLngLat([spot.location.longitude, spot.location.latitude])
        .addTo(map.current!);

      markersRef.current[spot.id] = marker;
    });
  }, [spots, mapLoaded, onSpotClick]);

  if (mapError) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-64px)] bg-swimspot-drift-sand/10">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 text-xl font-medium mb-4">Map Error</div>
          <p className="text-gray-600 mb-4">{mapError}</p>
        </div>
      </div>
    );
  }

  if (!mapboxToken) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-64px)] bg-swimspot-drift-sand/10">
        <div className="text-center p-6 max-w-md">
          <div className="text-swimspot-blue-green text-xl font-medium mb-4">Mapbox API Key Required</div>
          <p className="text-gray-600 mb-4">The Mapbox token is missing. Please contact the administrator.</p>
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
