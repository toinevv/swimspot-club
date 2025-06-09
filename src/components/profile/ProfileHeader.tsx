
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Trophy, Star, Edit } from "lucide-react";
import type { UserProfile } from "@/types/entities";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const ProfileHeader = ({ profile, onEditClick }: ProfileHeaderProps) => {
  const getExplorerBadgeColor = (level: string | undefined) => {
    switch (level) {
      case 'Expert': return 'bg-swimspot-burnt-coral';
      case 'Advanced': return 'bg-swimspot-blue-green';
      case 'Intermediate': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex justify-between items-start mb-8">
      <h1 className="text-3xl font-serif text-swimspot-blue-green">My Profile</h1>
      <Button
        onClick={onEditClick}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileHeader;
