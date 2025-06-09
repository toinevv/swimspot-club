
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { SwimSpot } from "@/types";
import { api } from "@/services/api";
import { convertCityToCityData } from "@/utils/cityData";
import InteractiveMap from "@/components/map/InteractiveMap";
import FiltersDropdown from "@/components/map/FiltersDropdown";
import MapLoadingState from "@/components/map/MapLoadingState";
import SEOHead from "@/components/seo/SEOHead";
import CityContent from "@/components/seo/CityContent";
import { useMapboxToken } from "@/hooks/useMapboxToken";
import { useUserLocation } from "@/hooks/useUserLocation";

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
  const { data: spots = [] } = useQuery<SwimSpot[]>({
    queryKey: ['swimSpots', filters],
    queryFn: api.getSwimSpots
  });

  const handleSpotClick = (spot: SwimSpot, mapCenter: [number, number], zoom: number) => {
    // Navigate to spot detail with current map position in URL
    const params = new URLSearchParams();
    params.set('lat', mapCenter[1].toString());
    params.set('lng', mapCenter[0].toString());
    params.set('zoom', zoom.toString());
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

  // Determine map center - check URL params first, then city coordinates, user location, or default
  const getMapCenter = (): [number, number] => {
    // Check URL parameters first
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
    if (userLocation) {
      return userLocation;
    }
    // Default to France-Switzerland border area
    return [6.0, 48.7];
  };

  // Get initial zoom from URL params or use default
  const getInitialZoom = (): number => {
    const zoom = searchParams.get('zoom');
    if (zoom) {
      return parseFloat(zoom);
    }
    // Use different zoom levels based on context
    if (cityData?.coordinates) return 13;
    if (userLocation) return 12;
    // More zoomed out view for Central Europe
    return 4;
  };

  // Show loading state while token is being fetched
  if (isTokenLoading) {
    return <MapLoadingState />;
  }

  console.log('Current city parameter:', city);
  console.log('Fetched spots:', spots?.length || 0);

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
          spots={spots || []}
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
                spotCount={spots?.length || 0}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SwimMap;
