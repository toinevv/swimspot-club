
import { Calendar, Clock, MapPin } from "lucide-react";
import { SwimSpot } from "@/types";
import { Partner } from "@/services/api/partners";

interface QuickInfoTilesProps {
  swimSpot: SwimSpot;
  partners: Partner[];
}

const QuickInfoTiles = ({ swimSpot, partners }: QuickInfoTilesProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-serif text-2xl text-swimspot-blue-green mb-4">Quick Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
          <div className="flex justify-center mb-2">
            <Calendar className="h-6 w-6 text-swimspot-blue-green" />
          </div>
          <h4 className="font-medium text-swimspot-blue-green">Season</h4>
          <p className="text-gray-600">{swimSpot.best_times.season}</p>
        </div>
        <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
          <div className="flex justify-center mb-2">
            <Clock className="h-6 w-6 text-swimspot-blue-green" />
          </div>
          <h4 className="font-medium text-swimspot-blue-green">Time of Day</h4>
          <p className="text-gray-600">{swimSpot.best_times.time_of_day}</p>
        </div>
        
        {/* First partner */}
        {partners.length > 0 && (
          <div className="bg-swimspot-burnt-coral/10 p-4 rounded-xl text-center">
            <div className="flex justify-center mb-2">
              <MapPin className="h-6 w-6 text-swimspot-burnt-coral" />
            </div>
            <h4 className="font-medium text-swimspot-burnt-coral">{partners[0].name}</h4>
            {partners[0].discount_code ? (
              <p className="text-gray-600 text-sm">Code: {partners[0].discount_code}</p>
            ) : (
              <p className="text-gray-600 text-sm capitalize">{partners[0].type}</p>
            )}
          </div>
        )}
        
        {/* Second partner */}
        {partners.length > 1 && (
          <div className="bg-swimspot-burnt-coral/10 p-4 rounded-xl text-center">
            <div className="flex justify-center mb-2">
              <MapPin className="h-6 w-6 text-swimspot-burnt-coral" />
            </div>
            <h4 className="font-medium text-swimspot-burnt-coral">{partners[1].name}</h4>
            {partners[1].discount_code ? (
              <p className="text-gray-600 text-sm">Code: {partners[1].discount_code}</p>
            ) : (
              <p className="text-gray-600 text-sm capitalize">{partners[1].type}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickInfoTiles;
