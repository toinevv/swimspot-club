
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
        console.log('🗺️ Map loaded successfully');
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
        // Clean up existing markers first
        Object.values(markersRef.current).forEach(marker => {
          try {
            marker.remove();
          } catch (e) {
            console.warn('Error removing marker:', e);
          }
        });
        markersRef.current = {};
        
        // Remove map
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      } catch (error) {
        console.error('Error cleaning up map:', error);
      }
    };
  }, [mapboxToken, initialCenter, initialZoom]);

  useEffect(() => {
    // Only proceed if map is loaded and we have a valid map reference
    if (!mapLoaded || !map.current || !spots.length) {
      console.log('Map not ready or no spots:', { mapLoaded, hasMap: !!map.current, spotsCount: spots.length });
      return;
    }

    console.log('Adding markers for', spots.length, 'spots');

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      try {
        marker.remove();
      } catch (e) {
        console.warn('Error removing existing marker:', e);
      }
    });
    markersRef.current = {};

    // Add new markers
    spots.forEach(spot => {
      try {
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
                console.log('📍 Spot clicked, saving map state:', { 
                  spotName: spot.name,
                  center: [center.lng, center.lat], 
                  zoom 
                });
                onSpotClick(spot, [center.lng, center.lat], zoom);
              }
            }}
          />
        );

        // Ensure map is still valid before adding marker
        if (map.current) {
          const marker = new mapboxgl.Marker(markerDiv)
            .setLngLat([spot.location.longitude, spot.location.latitude])
            .addTo(map.current);

          markersRef.current[spot.id] = marker;
        }
      } catch (error) {
        console.error('Error adding marker for spot:', spot.id, error);
      }
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
