
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SwimSpot } from "@/types";
import { api } from "@/services/api"; // This import remains the same, thanks to our re-export
import InteractiveMap from "@/components/map/InteractiveMap";
import SearchBar from "@/components/map/SearchBar";
import FiltersDropdown from "@/components/map/FiltersDropdown";
import { settingsService } from "@/services/settingsService";

// Fallback token if we can't retrieve from Supabase
const FALLBACK_TOKEN = "pk.eyJ1IjoidG9pbmV2IiwiYSI6ImNtYWZtaThoZDAzamEyanI2M3ZqOW5qcXkifQ.Cbm2AuiD07FcctvHIxz-DA";

const SwimMap = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  
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
    queryKey: ['swimSpots', filters],
    queryFn: () => api.getSwimSpots(filters)
  });

  const handleSpotClick = (spot: SwimSpot) => {
    navigate(`/spot/${spot.id}`);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

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
      />
    </div>
  );
};

export default SwimMap;
