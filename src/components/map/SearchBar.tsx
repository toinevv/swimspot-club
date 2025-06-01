
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { SwimSpot } from "@/types";

interface SearchBarProps {
  onFilterToggle: () => void;
  spots: SwimSpot[];
  onSpotSelect: (spot: SwimSpot) => void;
}

const SearchBar = ({ onFilterToggle, spots, onSpotSelect }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredSpots = spots.filter(spot => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return (
      spot.name.toLowerCase().includes(query) ||
      spot.location.address.toLowerCase().includes(query) ||
      spot.tags.some(tag => tag.toLowerCase().includes(query)) ||
      spot.water_type.toLowerCase().includes(query)
    );
  });

  const handleSpotSelect = (spot: SwimSpot) => {
    onSpotSelect(spot);
    setSearchQuery("");
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-4">
      <div className="flex gap-2">
        <div className="relative w-full">
          <Command className="rounded-lg border shadow-md bg-white">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Search for swim spots..."
                value={searchQuery}
                onValueChange={(value) => {
                  setSearchQuery(value);
                  setIsOpen(value.length > 0);
                }}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {isOpen && searchQuery && (
              <CommandList className="max-h-[300px] overflow-y-auto">
                <CommandEmpty>No swim spots found.</CommandEmpty>
                {filteredSpots.length > 0 && (
                  <CommandGroup>
                    {filteredSpots.slice(0, 8).map((spot) => (
                      <CommandItem
                        key={spot.id}
                        onSelect={() => handleSpotSelect(spot)}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{spot.name}</span>
                          <span className="text-sm text-gray-500">{spot.location.address}</span>
                          <div className="flex gap-1 mt-1">
                            {spot.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            )}
          </Command>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="bg-white hover:bg-gray-100 border shadow-md"
          onClick={onFilterToggle}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
