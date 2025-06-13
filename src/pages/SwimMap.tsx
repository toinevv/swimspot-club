
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [filters, setFilters] = useState({});
  
  const { mapboxToken, isTokenLoading } = useMapboxToken();
  const { userLocation } = useUserLocation();
  
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

  const handleSpotClick = (spot: SwimSpot) => {
    navigate(`/spot/${spot.id}`);
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

  // Simple map center logic
  const getMapCenter = (): [number, number] => {
    if (cityData?.coordinates) {
      return cityData.coordinates;
    }
    if (userLocation) {
      return userLocation;
    }
    return [10.0, 50.0]; // Europe fallback
  };

  const getInitialZoom = (): number => {
    if (cityData?.coordinates) return 13;
    if (userLocation) return 10;
    return 4; // Europe fallback zoom
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
