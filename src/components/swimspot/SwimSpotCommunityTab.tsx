
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users } from "lucide-react";

interface SwimSpotCommunityTabProps {
  visitData: { count: number; recentVisitors: any[] } | undefined;
  groups: any[];
}

const SwimSpotCommunityTab = ({ visitData, groups }: SwimSpotCommunityTabProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Community Activity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
          <div className="bg-swimspot-drift-sand/50 rounded-xl p-4">
            <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Recent Visitors ({visitData?.count || 0})
            </h3>
            <div className="flex flex-wrap gap-2">
              {visitData?.recentVisitors.slice(0, 6).map((visit, index) => (
                <Avatar key={index} className="h-8 w-8">
                  <AvatarImage src={visit.profiles?.avatar_url} />
                  <AvatarFallback className="bg-swimspot-blue-green text-white text-xs">
                    {(visit.profiles?.username || visit.profiles?.full_name || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {(visitData?.count || 0) > 6 && (
                <div className="h-8 w-8 rounded-full bg-swimspot-drift-sand flex items-center justify-center text-xs text-swimspot-blue-green">
                  +{(visitData?.count || 0) - 6}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Groups tile in community */}
        <div className="bg-swimspot-blue-mist/50 rounded-xl p-4">
          <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Local Swim Groups
          </h3>
          {groups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {groups.slice(0, 2).map((group) => (
                <Link key={group.id} to={`/groups`}>
                  <div className="bg-white/50 rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-swimspot-blue-green rounded-md flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-swimspot-blue-green text-sm">
                          {group.name}
                        </h4>
                        <p className="text-xs text-gray-500">{group.location}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm mb-2">No groups found for this area</p>
              <Link to="/groups">
                <Button size="sm" className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                  Find Groups
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwimSpotCommunityTab;
