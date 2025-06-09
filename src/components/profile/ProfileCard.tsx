
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Trophy, Star } from "lucide-react";
import type { UserProfile } from "@/types/entities";

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const getExplorerBadgeColor = (level: string | undefined) => {
    switch (level) {
      case 'Expert': return 'bg-swimspot-burnt-coral';
      case 'Advanced': return 'bg-swimspot-blue-green';
      case 'Intermediate': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="bg-swimspot-blue-green text-white text-2xl">
              {profile.username?.charAt(0).toUpperCase() || profile.full_name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-swimspot-blue-green">
                {profile.full_name || profile.username || 'Anonymous User'}
              </h2>
              <div className="flex gap-2">
                <Badge className={`${getExplorerBadgeColor(profile.explorer_level)} text-white`}>
                  <Trophy className="h-3 w-3 mr-1" />
                  {profile.explorer_level || 'Beginner'}
                </Badge>
                {profile.is_premium && (
                  <Badge className="bg-swimspot-burnt-coral text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
            
            {profile.bio && (
              <p className="text-gray-700 mb-4">{profile.bio}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {new Date(profile.created_at).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
