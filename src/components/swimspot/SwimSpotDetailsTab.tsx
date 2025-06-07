
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet, Users, MapPin, Tag } from "lucide-react";
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
        
        {/* 4 horizontal advice tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Water Type */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Water Type</h3>
            </div>
            <p className="text-blue-800 text-sm capitalize">{swimSpot.water_type}</p>
          </div>

          {/* Tags */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Features</h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {swimSpot.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Location</h3>
            </div>
            <p className="text-purple-800 text-sm">{swimSpot.city}, {swimSpot.country}</p>
          </div>

          {/* Partner */}
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">Local Partner</h3>
            </div>
            {partners.length > 0 ? (
              <div>
                <p className="text-orange-800 text-sm font-medium">{partners[0].name}</p>
                {partners[0].discount_code && (
                  <p className="text-xs text-orange-600">Code: {partners[0].discount_code}</p>
                )}
              </div>
            ) : (
              <p className="text-orange-800 text-sm">No partner yet</p>
            )}
          </div>
        </div>

        {/* Additional partners if more than one */}
        {partners.length > 1 && (
          <div className="mt-6">
            <h3 className="font-medium text-swimspot-blue-green mb-3">More Partners</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {partners.slice(1).map((partner) => (
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
