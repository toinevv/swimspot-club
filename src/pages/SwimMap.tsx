
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { SwimSpot } from "@/types";
import { api } from "@/services/api";
import InteractiveMap from "@/components/map/InteractiveMap";
import SearchBar from "@/components/map/SearchBar";
import FiltersDropdown from "@/components/map/FiltersDropdown";

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
      <SearchBar onFilterToggle={() => setIsFilterOpen(!isFilterOpen)} />
      <FiltersDropdown 
        isOpen={isFilterOpen}
        onFilterChange={handleFilterChange}
      />
      <InteractiveMap 
        spots={spots}
        onSpotClick={handleSpotClick}
      />
    </div>
  );
};

export default SwimMap;
