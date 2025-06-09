
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileLoadingState from "@/components/profile/ProfileLoadingState";
import ProfileNotFound from "@/components/profile/ProfileNotFound";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { useProfileData } from "@/hooks/useProfileData";
import type { UserProfile } from "@/types/entities";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  
  const {
    profile,
    profileLoading,
    stats,
    statsLoading,
    savedSpots,
    savedSpotsLoading,
    groups,
    groupsLoading
  } = useProfileData();

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    queryClient.setQueryData(['profile'], updatedProfile);
    setIsEditing(false);
  };

  if (profileLoading) {
    return <ProfileLoadingState />;
  }

  if (!profile) {
    return <ProfileNotFound />;
  }

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      <ProfileContent
        profile={profile}
        stats={stats}
        statsLoading={statsLoading}
        savedSpots={savedSpots}
        savedSpotsLoading={savedSpotsLoading}
        groups={groups}
        groupsLoading={groupsLoading}
        onEditClick={() => setIsEditing(true)}
      />

      {isEditing && (
        <ProfileEditForm
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default Profile;
