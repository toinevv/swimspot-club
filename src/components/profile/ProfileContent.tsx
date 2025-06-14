
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import ProfileStats from "./ProfileStats";
import GroupsTab from "./GroupsTab";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import type { UserProfile, UserStats, UserGroupData } from "@/types/entities";

interface ProfileContentProps {
  profile: UserProfile;
  stats: UserStats;
  statsLoading: boolean;
  savedSpots: any[];
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

      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="w-full bg-white mb-6">
          <TabsTrigger value="saved" className="flex-1" disabled>Saved Spots (Disabled)</TabsTrigger>
          <TabsTrigger value="groups" className="flex-1">My Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Save functionality temporarily disabled</h3>
              <p className="text-gray-500">This feature will be restored soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-4">
          <GroupsTab groups={groups} isLoading={groupsLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileContent;
