
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractiveMap from "@/components/map/InteractiveMap";
import MapFilters from "@/components/map/MapFilters";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import type { SwimSpot } from "@/types";

const SwimMap = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  
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

  return (
    <div className="relative h-[calc(100vh-64px)]">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search for swim spots..."
            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-swimspot-blue-green"
          />
          <Button
            variant="ghost"
            size="icon"
            className="bg-white hover:bg-gray-100"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        
        {isFilterOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 px-4">
            <MapFilters onFilterChange={handleFilterChange} />
          </div>
        )}
      </div>

      <InteractiveMap 
        spots={spots}
        onSpotClick={handleSpotClick}
      />
    </div>
  );
};

export default SwimMap;
