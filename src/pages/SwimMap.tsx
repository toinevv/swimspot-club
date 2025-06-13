
import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { createSimpleQueryFn } from "@/services/api/utils";
import { convertCityToCityData } from "@/utils/cityData";
import InteractiveMap from "@/components/map/InteractiveMap";
import FiltersDropdown from "@/components/map/FiltersDropdown";
import MapLoadingState from "@/components/map/MapLoadingState";
import SEOHead from "@/components/seo/SEOHead";
import CityContent from "@/components/seo/CityContent";
import { useMapboxToken } from "@/hooks/useMapboxToken";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useMapPosition } from "@/hooks/useMapPosition";
import type { SwimSpot } from "@/services/api";

const SwimMap = () => {
  const navigate = useNavigate();
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  
  const { mapboxToken, isTokenLoading } = useMapboxToken();
  const { userLocation } = useUserLocation();
  const { saveMapPosition, getMapPosition } = useMapPosition();
  
  const { data: cityData } = useQuery({
    queryKey: ['city', city],
    queryFn: async () => {
      if (!city) return null;
      const cityFromDb = await api.getCityBySlug(city);
      return cityFromDb ? convertCityToCityData(cityFromDb) : null;
    },
    enabled: !!city
  });
  
  const { data: spotsData = [], isLoading: spotsLoading } = useQuery({
    queryKey: ['swimSpots'],
    queryFn: createSimpleQueryFn(api.getAllSwimSpots)
  });

  const spots: SwimSpot[] = Array.isArray(spotsData) ? spotsData : [];

  const handleSpotClick = (spot: SwimSpot, currentMapCenter: [number, number], currentZoom: number) => {
    // Save current map position
    saveMapPosition(currentMapCenter[1], currentMapCenter[0], currentZoom);
    
    // Navigate to spot with return coordinates
    const params = new URLSearchParams();
    params.set('returnLat', currentMapCenter[1].toString());
    params.set('returnLng', currentMapCenter[0].toString());
    params.set('returnZoom', currentZoom.toString());
    
    navigate(`/spot/${spot.id}?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const seoTitle = cityData 
    ? `Swim Spots in ${cityData.displayName}` 
    : 'Wild Swimming Map - Europe';
  
  const seoDescription = cityData 
    ? cityData.description
    : 'Discover the best wild swimming locations across Europe. Explore natural swim spots, lakes, and rivers with our interactive map.';

  const getMapCenter = (): [number, number] => {
    // Priority 1: URL parameters (for returns from spot details)
    const lat = searchParams.get('lat') || searchParams.get('returnLat');
    const lng = searchParams.get('lng') || searchParams.get('returnLng');
    if (lat && lng) {
      return [parseFloat(lng), parseFloat(lat)];
    }
    
    // Priority 2: City-specific coordinates
    if (cityData?.coordinates) {
      return cityData.coordinates;
    }
    
    // Priority 3: Last saved map position
    const lastPosition = getMapPosition();
    if (lastPosition) {
      return [lastPosition.lng, lastPosition.lat];
    }
    
    // Priority 4: User location
    if (userLocation) {
      return userLocation;
    }
    
    // Priority 5: Europe fallback
    return [10.0, 50.0];
  };

  const getInitialZoom = (): number => {
    // Priority 1: URL zoom parameter
    const zoom = searchParams.get('zoom') || searchParams.get('returnZoom');
    if (zoom) {
      return parseFloat(zoom);
    }
    
    // Priority 2: City-specific zoom
    if (cityData?.coordinates) return 13;
    
    // Priority 3: Last saved zoom
    const lastPosition = getMapPosition();
    if (lastPosition) {
      return lastPosition.zoom;
    }
    
    // Priority 4: User location zoom
    if (userLocation) return 10;
    
    // Priority 5: Europe fallback zoom (zoomed out)
    return 4;
  };

  if (isTokenLoading) {
    return <MapLoadingState />;
  }

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        city={cityData?.displayName}
      />
      
      <div className="relative h-[calc(100vh-64px)]">
        <FiltersDropdown 
          onFilterChange={handleFilterChange}
          currentCity={city}
        />
        
        <InteractiveMap 
          spots={spots}
          onSpotClick={handleSpotClick}
          mapboxToken={mapboxToken || undefined}
          initialCenter={getMapCenter()}
          initialZoom={getInitialZoom()}
          onMapMove={saveMapPosition}
        />
        
        {cityData && (
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <CityContent 
                cityData={cityData}
                spotCount={spots.length}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SwimMap;
