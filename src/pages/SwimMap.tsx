
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
    
    console.log('🚀 Navigating to spot detail with return coordinates:', {
      spotId: spot.id,
      spotName: spot.name,
      returnLat: currentMapCenter[1],
      returnLng: currentMapCenter[0],
      returnZoom: currentZoom
    });
    
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

  // Get URL parameters
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const zoom = searchParams.get('zoom');

  // Determine map center with proper fallback
  const getMapCenter = (): [number, number] => {
    // Check URL parameters first (including saved coordinates from spot detail)
    if (lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      console.log('🗺️ Using URL coordinates:', { lat: parsedLat, lng: parsedLng });
      return [parsedLng, parsedLat];
    }
    
    // Then check other sources
    if (cityData?.coordinates) {
      console.log('🏙️ Using city coordinates:', cityData.coordinates);
      return cityData.coordinates;
    }
    if (userLocation) {
      console.log('📍 Using user location:', userLocation);
      return userLocation;
    }
    // Default to Central Europe view
    console.log('🌍 Using default Central Europe coordinates');
    return [10.0, 50.0];
  };

  // Get initial zoom with proper fallback
  const getInitialZoom = (): number => {
    // Check URL zoom parameter first (including saved zoom from spot detail)
    if (zoom) {
      const parsedZoom = parseFloat(zoom);
      console.log('🔍 Using URL zoom:', parsedZoom);
      return parsedZoom;
    }
    
    // Use different zoom levels based on context
    if (cityData?.coordinates) return 13;
    if (userLocation) return 12;
    // Central Europe view zoom
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
