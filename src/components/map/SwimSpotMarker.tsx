
import { MapPin } from "lucide-react";
import { SwimSpot } from "@/types";

interface SwimSpotMarkerProps {
  spot: SwimSpot;
  onClick: () => void;
}

const SwimSpotMarker = ({ spot, onClick }: SwimSpotMarkerProps) => {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellent':
        return 'text-green-500';
      case 'Good':
        return 'text-blue-500';
      case 'Moderate':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
    >
      <MapPin 
        className={`h-8 w-8 ${getQualityColor(spot.water_quality)}`}
        fill="currentColor"
        fillOpacity={0.2}
      />
      
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <h3 className="font-medium text-swimspot-blue-green mb-1">{spot.name}</h3>
          <div className="flex items-center text-xs text-gray-600">
            <span>{spot.water_type}</span>
            <span className="mx-1">•</span>
            <span className={getQualityColor(spot.water_quality)}>
              {spot.water_quality}
            </span>
          </div>
        </div>
        <div className="w-3 h-3 bg-white transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};

export default SwimSpotMarker;
