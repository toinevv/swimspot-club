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
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  
  // Custom hooks
  const { mapboxToken, isTokenLoading } = useMapboxToken();
  const { userLocation } = useUserLocation(city);
  
  // Fetch city data from database
  const { data: cityData } = useQuery({
    queryKey: ['city', city],
    queryFn: async () => {
      if (!city) return null;
      const cityFromDb = await api.getCityBySlug(city);
      return cityFromDb ? convertCityToCityData(cityFromDb) : null;
    },
    enabled: !!city
  });
  
  // Fetch all swim spots - always show all spots, let filters handle the filtering
  const { data: spotsData = [], isLoading: spotsLoading } = useQuery({
    queryKey: ['swimSpots'],
    queryFn: createSimpleQueryFn(api.getAllSwimSpots)
  });

  // Ensure spots is always an array of SwimSpot
  const spots: SwimSpot[] = Array.isArray(spotsData) ? spotsData : [];

  const handleSpotClick = (spot: SwimSpot, currentMapCenter: [number, number], currentZoom: number) => {
    // Store the current map state before navigating to spot detail
    const params = new URLSearchParams();
    params.set('returnLat', currentMapCenter[1].toString());
    params.set('returnLng', currentMapCenter[0].toString());
    params.set('returnZoom', currentZoom.toString());
    
    // Navigate to spot detail with return coordinates
    navigate(`/spot/${spot.id}?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Generate SEO content
  const seoTitle = cityData 
    ? `Swim Spots in ${cityData.displayName}` 
    : 'Wild Swimming Map - Netherlands';
  
  const seoDescription = cityData 
    ? cityData.description
    : 'Discover the best wild swimming locations across the Netherlands. Explore natural swim spots, lakes, and canals with our interactive map.';

  // Determine map center - check return coordinates first, then URL params, then other sources
  const getMapCenter = (): [number, number] => {
    // Check for return coordinates first (when coming back from spot detail)
    const returnLat = searchParams.get('returnLat');
    const returnLng = searchParams.get('returnLng');
    if (returnLat && returnLng) {
      return [parseFloat(returnLng), parseFloat(returnLat)];
    }
    
    // Check regular URL parameters
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    if (lat && lng) {
      return [parseFloat(lng), parseFloat(lat)];
    }
    
    if (mapCenter) {
      return mapCenter;
    }
    if (cityData?.coordinates) {
      return cityData.coordinates;
    }
    
    // Default to Central Europe for zoomed out view - covers Western Europe and Mediterranean
    return [10.0, 50.0];
  };

  // Get initial zoom - check return zoom first, then URL params, then defaults
  const getInitialZoom = (): number => {
    // Check for return zoom first (when coming back from spot detail)
    const returnZoom = searchParams.get('returnZoom');
    if (returnZoom) {
      return parseFloat(returnZoom);
    }
    
    // Check regular URL zoom parameter
    const zoom = searchParams.get('zoom');
    if (zoom) {
      return parseFloat(zoom);
    }
    
    // Use different zoom levels based on context
    if (cityData?.coordinates) return 13;
    
    // Zoomed out view for Central/Western Europe
    return 4;
  };

  // Show loading state while token is being fetched
  if (isTokenLoading) {
    return <MapLoadingState />;
  }

  console.log('Current city parameter:', city);
  console.log('Fetched spots:', spots.length);

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
