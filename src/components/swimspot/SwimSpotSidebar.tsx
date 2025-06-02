
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { SwimSpot } from "@/types";

interface SwimSpotSidebarProps {
  swimSpot: SwimSpot;
}

const SwimSpotSidebar = ({ swimSpot }: SwimSpotSidebarProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="font-serif text-xl text-swimspot-blue-green mb-4">Location</h3>
        
        {/* Map placeholder */}
        <div className="h-48 bg-swimspot-blue-mist rounded-lg flex items-center justify-center mb-4">
          <p className="text-sm text-swimspot-blue-green">Map will be integrated here</p>
        </div>
        
        <p className="text-gray-700 mb-4">{swimSpot.location.address}</p>
        
        <Button className="w-full bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
          <Map className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
      </div>
      
      <div className="bg-swimspot-blue-green rounded-2xl p-6 shadow-sm text-white">
        <h3 className="font-serif text-xl mb-3">Start Swimming</h3>
        <p className="text-white/80 mb-4">Join a swim group at this location to meet fellow swimmers.</p>
        
        <Link to="/groups">
          <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
            Find Swim Groups
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SwimSpotSidebar;
