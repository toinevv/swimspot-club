
import { useState } from "react";
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
import type { SwimSpot } from "@/services/api";

const SwimMap = () => {
  const navigate = useNavigate();
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  
  const { mapboxToken, isTokenLoading } = useMapboxToken();
  const { userLocation } = useUserLocation(city);
  
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
    : 'Wild Swimming Map - Netherlands';
  
  const seoDescription = cityData 
    ? cityData.description
    : 'Discover the best wild swimming locations across the Netherlands. Explore natural swim spots, lakes, and canals with our interactive map.';

  // Simple location logic: URL params first, then user location, then Europe fallback
  const getMapCenter = (): [number, number] => {
    // Check URL parameters first (including return coordinates)
    const lat = searchParams.get('lat') || searchParams.get('returnLat');
    const lng = searchParams.get('lng') || searchParams.get('returnLng');
    if (lat && lng) {
      return [parseFloat(lng), parseFloat(lat)];
    }
    
    // City-specific coordinates
    if (cityData?.coordinates) {
      return cityData.coordinates;
    }
    
    // User location if available and no city specified
    if (userLocation && !city) {
      return userLocation;
    }
    
    // Europe fallback
    return [10.0, 50.0];
  };

  const getInitialZoom = (): number => {
    // Check URL zoom parameter first (including return zoom)
    const zoom = searchParams.get('zoom') || searchParams.get('returnZoom');
    if (zoom) {
      return parseFloat(zoom);
    }
    
    // City-specific zoom
    if (cityData?.coordinates) return 13;
    
    // User location zoom
    if (userLocation && !city) return 10;
    
    // Europe fallback zoom
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
