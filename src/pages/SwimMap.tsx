
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

// Default Mapbox token provided by the user
const DEFAULT_MAPBOX_TOKEN = "pk.eyJ1IjoidG9pbmV2IiwiYSI6ImNtYWZtaThoZDAzamEyanI2M3ZqOW5qcXkifQ.Cbm2AuiD07FcctvHIxz-DA";

const SwimMap = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem("mapboxToken") || DEFAULT_MAPBOX_TOKEN;
  });
  const [tokenInput, setTokenInput] = useState(mapboxToken);
  const [showTokenInput, setShowTokenInput] = useState(false);
  
  // Store the default token in localStorage if it's not already set
  useEffect(() => {
    if (!localStorage.getItem("mapboxToken")) {
      localStorage.setItem("mapboxToken", DEFAULT_MAPBOX_TOKEN);
    }
  }, []);
  
  const { data: spots = [] } = useQuery<SwimSpot[]>({
    queryKey: ['swimSpots', filters],
    queryFn: () => api.getSwimSpots(filters)
  });

  const handleSpotClick = (spot: SwimSpot) => {
    navigate(`/spot/${spot.id}`);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const saveToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem("mapboxToken", tokenInput);
      setMapboxToken(tokenInput);
      setShowTokenInput(false);
      toast.success("Mapbox token saved successfully");
    } else {
      toast.error("Please enter a valid Mapbox token");
    }
  };

  return (
    <div className="relative h-[calc(100vh-64px)]">
      <SearchBar onFilterToggle={() => setIsFilterOpen(!isFilterOpen)} />
      
      {showTokenInput && (
        <div className="absolute top-16 left-0 right-0 z-10 bg-white p-4 shadow-md">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="flex-grow">
                <Input
                  placeholder="Enter your Mapbox token"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={saveToken} className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                  Save Token
                </Button>
                <Button variant="outline" onClick={() => setShowTokenInput(false)}>
                  Cancel
                </Button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <p>Get your token at <a href="https://www.mapbox.com/account/access-tokens" target="_blank" rel="noopener noreferrer" className="text-swimspot-blue-green underline">mapbox.com</a></p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-16 right-4 z-10">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowTokenInput(true)}
          className="text-xs bg-white/80 backdrop-blur-sm"
        >
          Change Mapbox Token
        </Button>
      </div>
      
      <FiltersDropdown 
        isOpen={isFilterOpen}
        onFilterChange={handleFilterChange}
      />
      <InteractiveMap 
        spots={spots}
        onSpotClick={handleSpotClick}
        mapboxToken={mapboxToken}
      />
    </div>
  );
};

export default SwimMap;
