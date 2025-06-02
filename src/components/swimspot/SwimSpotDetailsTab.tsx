
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Info, Users } from "lucide-react";
import { SwimSpot } from "@/types";
import QuickInfoTiles from "./QuickInfoTiles";
import { Partner } from "@/services/api/partners";

interface SwimSpotDetailsTabProps {
  swimSpot: SwimSpot;
  partners: Partner[];
  groups: any[];
}

const SwimSpotDetailsTab = ({ swimSpot, partners, groups }: SwimSpotDetailsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-serif text-2xl text-swimspot-blue-green mb-4">About This Spot</h2>
        <p className="text-gray-700 mb-6">{swimSpot.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-swimspot-blue-mist/50 rounded-xl p-4">
            <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
              <Droplet className="h-5 w-5 mr-2" />
              Water Info
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Type:</span>
                <span className="font-medium">{swimSpot.water_type}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-swimspot-drift-sand rounded-xl p-4">
            <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Facilities & Access
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Changing Rooms:</span>
                <span className="font-medium">{swimSpot.facilities.changing_rooms ? 'Available' : 'Not available'}</span>
              </li>
              <li className="flex justify-between">
                <span>Restrooms:</span>
                <span className="font-medium">{swimSpot.facilities.restrooms ? 'Available' : 'Not available'}</span>
              </li>
              <li className="flex justify-between">
                <span>Food & Drinks:</span>
                <span className="font-medium">{swimSpot.facilities.food_drinks ? 'Available nearby' : 'Not available'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <QuickInfoTiles swimSpot={swimSpot} partners={partners} />

      {/* Groups section at bottom of details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Swim Groups</h2>
        
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groups.slice(0, 4).map((group) => (
              <Link key={group.id} to={`/groups`}>
                <div className="bg-swimspot-drift-sand/50 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-swimspot-blue-green rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-swimspot-blue-green mb-1">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {group.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-8 text-gray-500">
            <div className="text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p>No swim groups found for this area.</p>
              <Link to="/groups">
                <Button className="mt-4 bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                  Find Groups
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwimSpotDetailsTab;
