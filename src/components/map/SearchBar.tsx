
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onFilterToggle: () => void;
}

const SearchBar = ({ onFilterToggle }: SearchBarProps) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-4">
      <div className="flex gap-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for swim spots..."
            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-swimspot-blue-green pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white hover:bg-gray-100"
          onClick={onFilterToggle}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
