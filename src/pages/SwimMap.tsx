
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SwimSpot } from "@/types";
import { api } from "@/services/api";
import InteractiveMap from "@/components/map/InteractiveMap";
import SearchBar from "@/components/map/SearchBar";
import FiltersDropdown from "@/components/map/FiltersDropdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSecureSetting } from "@/services/settingsService";

const SwimMap = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load the Mapbox token from Supabase
  useEffect(() => {
    const fetchMapboxToken = async () => {
      setIsLoading(true);
      try {
        const token = await getSecureSetting('mapbox_token');
        if (token) {
          setMapboxToken(token);
        } else {
          toast.error("Failed to load Mapbox token. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching Mapbox token:", error);
        toast.error("Error loading map data. Please try again later.");
      } finally {
        setIsLoading(false);
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

  return (
    <div className="relative h-[calc(100vh-64px)]">
      <SearchBar onFilterToggle={() => setIsFilterOpen(!isFilterOpen)} />
      
      <FiltersDropdown 
        isOpen={isFilterOpen}
        onFilterChange={handleFilterChange}
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-64px)] bg-swimspot-drift-sand/10">
          <div className="text-center p-6">
            <div className="text-swimspot-blue-green text-xl font-medium mb-4">Loading map...</div>
          </div>
        </div>
      ) : (
        <InteractiveMap 
          spots={spots}
          onSpotClick={handleSpotClick}
          mapboxToken={mapboxToken}
        />
      )}
    </div>
  );
};

export default SwimMap;
