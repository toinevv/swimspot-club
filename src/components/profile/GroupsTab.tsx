
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { UserGroupData } from "@/types/entities";

interface GroupsTabProps {
  groups: UserGroupData[];
  isLoading: boolean;
}

const GroupsTab = ({ groups, isLoading }: GroupsTabProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No groups joined yet</h3>
          <p className="text-gray-500 mb-4">Join swim groups to connect with fellow swimmers!</p>
          <Link to="/groups">
            <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
              Find Groups
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {groups.map((group) => (
        <Link key={group.id} to={`/groups`}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-swimspot-blue-green rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-swimspot-blue-green mb-1">
                    {group.groups.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{group.groups.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {group.role}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {group.groups.location}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GroupsTab;
