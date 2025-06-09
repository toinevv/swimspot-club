
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import ProfileStats from "./ProfileStats";
import SavedSpotsTab from "./SavedSpotsTab";
import GroupsTab from "./GroupsTab";
import type { UserProfile, UserStats, SavedSpotData, UserGroupData } from "@/types/entities";

interface ProfileContentProps {
  profile: UserProfile;
  stats: UserStats;
  statsLoading: boolean;
  savedSpots: SavedSpotData[];
  savedSpotsLoading: boolean;
  groups: UserGroupData[];
  groupsLoading: boolean;
  onEditClick: () => void;
}

const ProfileContent = ({
  profile,
  stats,
  statsLoading,
  savedSpots,
  savedSpotsLoading,
  groups,
  groupsLoading,
  onEditClick
}: ProfileContentProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileHeader profile={profile} onEditClick={onEditClick} />
      <ProfileCard profile={profile} />
      <ProfileStats stats={stats} isLoading={statsLoading} />

      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="w-full bg-white mb-6">
          <TabsTrigger value="saved" className="flex-1">Saved Spots</TabsTrigger>
          <TabsTrigger value="groups" className="flex-1">My Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="space-y-4">
          <SavedSpotsTab savedSpots={savedSpots} isLoading={savedSpotsLoading} />
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-4">
          <GroupsTab groups={groups} isLoading={groupsLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileContent;
