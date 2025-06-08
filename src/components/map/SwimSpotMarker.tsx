
import { MapPin } from "lucide-react";
import { SwimSpot } from "@/types";

interface SwimSpotMarkerProps {
  spot: SwimSpot;
  onClick: () => void;
}

const SwimSpotMarker = ({ spot, onClick }: SwimSpotMarkerProps) => {
  // Use water type for pin color, but override with light blue for official locations
  const getMarkerColor = (waterType: string, isOfficial: boolean) => {
    // Override: if it's an official location, always use light blue
    if (isOfficial) {
      return 'text-blue-400';
    }
    
    // Otherwise, use water type colors
    switch (waterType.toLowerCase()) {
      case 'lake':
        return 'text-blue-300'; // Much more subdued lake color
      case 'river':
        return 'text-teal-600';
      case 'canal':
        return 'text-cyan-600';
      case 'sea':
      case 'ocean':
        return 'text-blue-800';
      case 'pond':
        return 'text-blue-200';
      case 'stream':
        return 'text-teal-400';
      default:
        return 'text-swimspot-blue-green';
    }
  };

  const markerColor = getMarkerColor(spot.water_type, spot.official_location);

  return (
    <div 
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
    >
      <MapPin 
        className={`h-8 w-8 ${markerColor}`}
        fill="currentColor"
        fillOpacity={0.2}
      />
      
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <h3 className="font-medium text-swimspot-blue-green mb-1">{spot.name}</h3>
          <div className="flex items-center text-xs text-gray-600">
            <span>{spot.water_type}</span>
            {spot.official_location && (
              <>
                <span className="mx-1">•</span>
                <span className="text-blue-600">Official</span>
              </>
            )}
            {spot.visibility === 'premium' && (
              <>
                <span className="mx-1">•</span>
                <span className="text-swimspot-burnt-coral">Premium</span>
              </>
            )}
          </div>
        </div>
        <div className="w-3 h-3 bg-white transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};

export default SwimSpotMarker;
