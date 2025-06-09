
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";
import SavedSpotsTab from "@/components/profile/SavedSpotsTab";
import GroupsTab from "@/components/profile/GroupsTab";
import { UserProfile } from "@/services/api/profiles";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getCurrentUserProfile,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: api.getUserStats,
  });

  const { data: savedSpots = [], isLoading: savedSpotsLoading } = useQuery({
    queryKey: ['savedSpots'],
    queryFn: api.getUserSavedSpots,
  });

  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ['userGroups'],
    queryFn: api.getUserGroups,
  });

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    queryClient.setQueryData(['profile'], updatedProfile);
    setIsEditing(false);
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-swimspot-drift-sand p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-swimspot-drift-sand p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-serif text-swimspot-blue-green mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
          <Link to="/auth">
            <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-serif text-swimspot-blue-green">My Profile</h1>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <ProfileCard profile={profile} />
        <ProfileStats stats={stats || { spots_saved: 0, spots_visited: 0, groups_joined: 0 }} isLoading={statsLoading} />

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

        {isEditing && (
          <ProfileEditForm
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
