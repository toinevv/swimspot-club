
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Info, Users, MapPin } from "lucide-react";
import { SwimSpot } from "@/types";
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Water Info Tile */}
          <div className="bg-swimspot-blue-mist/50 rounded-xl p-4">
            <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
              <Droplet className="h-5 w-5 mr-2" />
              Water Info
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex justify-between">
                <span>Type:</span>
                <span className="font-medium">{swimSpot.water_type}</span>
              </li>
              {swimSpot.current_temperature && (
                <li className="flex justify-between">
                  <span>Temp:</span>
                  <span className="font-medium">{swimSpot.current_temperature}°C</span>
                </li>
              )}
              {swimSpot.current && (
                <li className="flex justify-between">
                  <span>Current:</span>
                  <span className="font-medium capitalize">{swimSpot.current}</span>
                </li>
              )}
            </ul>
          </div>
          
          {/* Facilities Tile */}
          <div className="bg-swimspot-drift-sand rounded-xl p-4">
            <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Facilities
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex justify-between">
                <span>Changing:</span>
                <span className="font-medium">{swimSpot.facilities.changing_rooms ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex justify-between">
                <span>Restrooms:</span>
                <span className="font-medium">{swimSpot.facilities.restrooms ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex justify-between">
                <span>Lifeguard:</span>
                <span className="font-medium">{swimSpot.facilities.lifeguard ? 'Yes' : 'No'}</span>
              </li>
              <li className="flex justify-between">
                <span>Food/Drinks:</span>
                <span className="font-medium">{swimSpot.facilities.food_drinks ? 'Yes' : 'No'}</span>
              </li>
            </ul>
          </div>

          {/* First Partner Tile */}
          {partners.length > 0 && (
            <div className="bg-swimspot-burnt-coral/10 rounded-xl p-4">
              <h3 className="font-medium text-swimspot-burnt-coral mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Partner
              </h3>
              <div className="text-sm">
                <p className="font-medium text-gray-800 mb-1">{partners[0].name}</p>
                {partners[0].discount_code ? (
                  <p className="text-gray-600">Code: <span className="font-mono bg-gray-100 px-1 rounded">{partners[0].discount_code}</span></p>
                ) : (
                  <p className="text-gray-600 capitalize">{partners[0].type}</p>
                )}
                {partners[0].description && (
                  <p className="text-gray-600 mt-1 text-xs">{partners[0].description.slice(0, 50)}...</p>
                )}
              </div>
            </div>
          )}

          {/* Best Times Tile */}
          <div className="bg-swimspot-drift-sand/50 rounded-xl p-4">
            <h3 className="font-medium text-swimspot-blue-green mb-3">Best Times</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              {swimSpot.best_times.season && (
                <li className="flex justify-between">
                  <span>Season:</span>
                  <span className="font-medium">{swimSpot.best_times.season}</span>
                </li>
              )}
              {swimSpot.best_times.time_of_day && (
                <li className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{swimSpot.best_times.time_of_day}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Additional partners if more than one */}
        {partners.length > 1 && (
          <div className="mt-4">
            <h3 className="font-medium text-swimspot-blue-green mb-3">More Partners</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {partners.slice(1).map((partner, index) => (
                <div key={partner.id} className="bg-swimspot-burnt-coral/5 rounded-lg p-3 border border-swimspot-burnt-coral/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-swimspot-burnt-coral" />
                    <h4 className="font-medium text-swimspot-burnt-coral">{partner.name}</h4>
                  </div>
                  {partner.discount_code ? (
                    <p className="text-sm text-gray-600">Discount code: <span className="font-mono bg-gray-100 px-1 rounded">{partner.discount_code}</span></p>
                  ) : (
                    <p className="text-sm text-gray-600 capitalize">{partner.type}</p>
                  )}
                  {partner.description && (
                    <p className="text-sm text-gray-600 mt-1">{partner.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Groups section */}
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
