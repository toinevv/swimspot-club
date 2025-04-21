
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Filter, 
  Search, 
  Droplet,
  MapPin,
  Info
} from "lucide-react";

const SwimMap = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleSpotClick = (id: number) => {
    navigate(`/spot/${id}`);
  };
  
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="relative h-[calc(100vh-64px)]">
      {/* Map Placeholder */}
      <div className="absolute inset-0 bg-swimspot-blue-mist flex items-center justify-center">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-swimspot-blue-green font-medium">
            Map API will be integrated here
          </p>
        </div>
        
        {/* Placeholder swim spot markers */}
        {swimSpots.map((spot) => (
          <div
            key={spot.id}
            className="absolute cursor-pointer group"
            style={{
              top: `${spot.position.y}%`,
              left: `${spot.position.x}%`,
            }}
            onClick={() => handleSpotClick(spot.id)}
          >
            <div className="relative">
              <MapPin 
                className={`h-8 w-8 ${
                  spot.quality === 'Excellent' 
                    ? 'text-green-500' 
                    : spot.quality === 'Good' 
                    ? 'text-blue-500' 
                    : 'text-orange-500'
                }`} 
                fill="currentColor" 
                fillOpacity={0.2}
              />
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-white p-3 rounded-lg shadow-lg">
                  <h3 className="font-medium text-swimspot-blue-green mb-1">{spot.name}</h3>
                  <div className="flex items-center mb-1">
                    <Droplet className="h-4 w-4 mr-1 text-swimspot-blue-green" />
                    <span className="text-xs text-gray-600">{spot.waterType}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {spot.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-1.5 py-0.5 bg-swimspot-blue-mist text-swimspot-blue-green rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Tooltip arrow */}
                <div className="w-3 h-3 bg-white transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Search Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for swim spots..."
            className="w-full pl-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-swimspot-blue-green focus:border-transparent shadow-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-swimspot-drift-sand hover:bg-swimspot-drift-sand/80"
            onClick={toggleFilters}
          >
            <Filter className="h-5 w-5 text-swimspot-blue-green" />
          </Button>
        </div>
      </div>
      
      {/* Filters Panel */}
      {isFilterOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl p-4 mt-2 bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2 text-swimspot-blue-green">Water Type</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="river" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="river">River</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="lake" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="lake">Lake</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="canal" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="canal">Canal</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="beach" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="beach">Beach</Label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 text-swimspot-blue-green">Access Type</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="public" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="premium" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="premium">Premium Only</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="accessible" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="accessible">Accessible</Label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 text-swimspot-blue-green">Water Quality</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="excellent" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="excellent">Excellent</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="good" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="good">Good</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="moderate" className="rounded text-swimspot-blue-green focus:ring-swimspot-blue-green" />
                  <Label htmlFor="moderate">Moderate</Label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 text-swimspot-blue-green">Distance</h3>
              <Slider
                defaultValue={[5]}
                max={20}
                step={1}
                className="mb-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 km</span>
                <span>5 km</span>
                <span>10 km</span>
                <span>20+ km</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <Switch id="show-all" />
              <Label htmlFor="show-all">Show all swim spots</Label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={toggleFilters}>
                Cancel
              </Button>
              <Button size="sm" className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Info box */}
      <div className="absolute bottom-8 right-8 z-10 p-4 bg-white rounded-lg shadow-lg max-w-xs">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-swimspot-blue-green mr-2 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-swimspot-blue-green mb-1">About Water Quality</h3>
            <p className="text-sm text-gray-600">
              Markers are color-coded by water quality. Green is excellent, blue is good, and orange indicates moderate quality.
            </p>
            <div className="mt-2 text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder data
const swimSpots = [
  {
    id: 1,
    name: "Amstel River Oasis",
    position: { x: 30, y: 40 },
    quality: "Excellent",
    waterType: "River",
    tags: ["Family-friendly", "Picnic Area"]
  },
  {
    id: 2,
    name: "Nieuwe Meer Beach",
    position: { x: 70, y: 30 },
    quality: "Good",
    waterType: "Lake",
    tags: ["Sandy Beach", "Sunset Views"]
  },
  {
    id: 3,
    name: "Hidden Canal Gem",
    position: { x: 50, y: 60 },
    quality: "Good",
    waterType: "Canal",
    tags: ["Historic", "Urban"]
  },
  {
    id: 4,
    name: "Sloterplas Shores",
    position: { x: 20, y: 70 },
    quality: "Moderate",
    waterType: "Lake",
    tags: ["Family-friendly", "Shallow Waters"]
  },
  {
    id: 5,
    name: "Erasmuspark Pond",
    position: { x: 80, y: 50 },
    quality: "Good",
    waterType: "Pond",
    tags: ["Secluded", "Natural"]
  }
];

export default SwimMap;
