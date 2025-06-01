
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MapFilters from "./MapFilters";

interface FiltersDropdownProps {
  onFilterChange: (filters: any) => void;
  currentCity?: string;
}

const FiltersDropdown = ({ onFilterChange, currentCity }: FiltersDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 left-4 z-20">
      <Button
        variant="ghost"
        size="icon"
        className="bg-white hover:bg-gray-100 border shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search className="h-5 w-5" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border">
          <MapFilters onFilterChange={onFilterChange} currentCity={currentCity} />
        </div>
      )}
    </div>
  );
};

export default FiltersDropdown;
