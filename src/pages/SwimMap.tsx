
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { SwimSpot } from "@/types";
import { api } from "@/services/api";
import { convertCityToCityData } from "@/utils/cityData";
import InteractiveMap from "@/components/map/InteractiveMap";
import SearchBar from "@/components/map/SearchBar";
import FiltersDropdown from "@/components/map/FiltersDropdown";
import MapLoadingState from "@/components/map/MapLoadingState";
import SEOHead from "@/components/seo/SEOHead";
import CityContent from "@/components/seo/CityContent";
import { useMapboxToken } from "@/hooks/useMapboxToken";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useCityRedirect } from "@/hooks/useCityRedirect";

const SwimMap = () => {
  const navigate = useNavigate();
  const { city } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  
  // Custom hooks
  const { mapboxToken, isTokenLoading } = useMapboxToken();
  const { userLocation, locationPermissionDenied } = useUserLocation(city);
  
  // Fetch all swim spots to find city with most spots
  const { data: allSpots = [] } = useQuery<SwimSpot[]>({
    queryKey: ['allSwimSpots'],
    queryFn: () => api.getSwimSpots(),
    enabled: !city // Only fetch when no city is selected
  });
  
  // Handle city redirect logic
  useCityRedirect(city, locationPermissionDenied, allSpots);
  
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
  
  const { data: spots = [] } = useQuery<SwimSpot[]>({
    queryKey: ['swimSpots', filters, city],
    queryFn: () => api.getSwimSpots({ ...filters, city })
  });

  const handleSpotClick = (spot: SwimSpot) => {
    navigate(`/spot/${spot.id}`);
  };

  const handleSpotSelect = (spot: SwimSpot) => {
    // Center map on selected spot and navigate to it
    setMapCenter([spot.location.longitude, spot.location.latitude]);
    navigate(`/spot/${spot.id}`);
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

  // Determine map center - use selected spot, city coordinates, user location, or default to Netherlands
  const getMapCenter = (): [number, number] => {
    if (mapCenter) {
      return mapCenter;
    }
    if (cityData?.coordinates) {
      return cityData.coordinates;
    }
    if (userLocation) {
      return userLocation;
    }
    // Default to Netherlands center
    return [5.2913, 52.1326];
  };

  // Show loading state while token is being fetched
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
        <SearchBar 
          onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
          spots={spots}
          onSpotSelect={handleSpotSelect}
        />
        
        <FiltersDropdown 
          isOpen={isFilterOpen}
          onFilterChange={handleFilterChange}
        />
        
        <InteractiveMap 
          spots={spots}
          onSpotClick={handleSpotClick}
          mapboxToken={mapboxToken || undefined}
          initialCenter={getMapCenter()}
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
