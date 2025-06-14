
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Users, Droplet } from "lucide-react";
import type { UserStats } from "@/types/entities";

interface ProfileStatsProps {
  stats: UserStats;
  isLoading: boolean;
}

const ProfileStats = ({ stats, isLoading }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-2">
            <Plus className="h-8 w-8 text-swimspot-blue-green" />
          </div>
          <div className="text-2xl font-bold text-swimspot-blue-green">
            {isLoading ? "..." : stats?.spots_visited || 0}
          </div>
          <div className="text-sm text-gray-600">Spots Visited</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-2">
            <Users className="h-8 w-8 text-swimspot-blue-green" />
          </div>
          <div className="text-2xl font-bold text-swimspot-blue-green">
            {isLoading ? "..." : stats?.groups_joined || 0}
          </div>
          <div className="text-sm text-gray-600">Groups Joined</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-2">
            <Droplet className="h-8 w-8 text-swimspot-blue-green" />
          </div>
          <div className="text-2xl font-bold text-swimspot-blue-green">
            {isLoading ? "..." : stats?.spots_visited || 0}
          </div>
          <div className="text-sm text-gray-600">Total Visits</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStats;
