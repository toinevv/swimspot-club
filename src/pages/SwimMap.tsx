
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SwimSpot } from "@/types";
import { api } from "@/services/api";
import InteractiveMap from "@/components/map/InteractiveMap";
import SearchBar from "@/components/map/SearchBar";
import FiltersDropdown from "@/components/map/FiltersDropdown";
import SEOHead from "@/components/seo/SEOHead";
import CityContent from "@/components/seo/CityContent";
import { settingsService } from "@/services/settingsService";
import { getCityData } from "@/utils/cityData";

// Fallback token if we can't retrieve from Supabase
const FALLBACK_TOKEN = "pk.eyJ1IjoidG9pbmV2IiwiYSI6ImNtYWZtaThoZDAzamEyanI2M3ZqOW5qcXkifQ.Cbm2AuiD07FcctvHIxz-DA";

const SwimMap = () => {
  const navigate = useNavigate();
  const { city } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  
  const cityData = getCityData(city);
  
  // Fetch Mapbox token from Supabase
  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        setIsTokenLoading(true);
        const { mapboxToken } = await settingsService.getMapSettings();
        
        if (mapboxToken) {
          setMapboxToken(mapboxToken);
          console.log("Retrieved Mapbox token from Supabase");
        } else {
          console.warn("No Mapbox token found in Supabase, using fallback token");
          setMapboxToken(FALLBACK_TOKEN);
        }
      } catch (error) {
        console.error("Error fetching Mapbox token:", error);
        setMapboxToken(FALLBACK_TOKEN);
      } finally {
        setIsTokenLoading(false);
      }
    };
    
    fetchMapboxToken();
  }, []);
  
  const { data: spots = [], isLoading: isSpotsLoading } = useQuery<SwimSpot[]>({
    queryKey: ['swimSpots', filters, city],
    queryFn: () => api.getSwimSpots({ ...filters, city })
  });

  const handleSpotClick = (spot: SwimSpot) => {
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

  // Show loading state while token is being fetched
  if (isTokenLoading) {
    return (
      <div className="relative h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-swimspot-blue-green text-xl font-medium mb-4">Loading Map...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        city={cityData?.displayName}
      />
      
      <div className="relative h-[calc(100vh-64px)]">
        <SearchBar onFilterToggle={() => setIsFilterOpen(!isFilterOpen)} />
        
        <FiltersDropdown 
          isOpen={isFilterOpen}
          onFilterChange={handleFilterChange}
        />
        
        <InteractiveMap 
          spots={spots}
          onSpotClick={handleSpotClick}
          mapboxToken={mapboxToken || undefined}
          initialCenter={cityData?.coordinates}
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
