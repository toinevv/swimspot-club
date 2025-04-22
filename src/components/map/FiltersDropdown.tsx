
import { MapFilters } from "./MapFilters";

interface FiltersDropdownProps {
  isOpen: boolean;
  onFilterChange: (filters: any) => void;
}

const FiltersDropdown = ({ isOpen, onFilterChange }: FiltersDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 px-4">
      <MapFilters onFilterChange={onFilterChange} />
    </div>
  );
};

export default FiltersDropdown;
