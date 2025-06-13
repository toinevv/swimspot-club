
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
    userGroups,
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

  // Transform saved spots to the expected format with proper type conversion
  const transformedSavedSpots = savedSpots.map(spot => ({
    id: String(spot.id), // Convert number to string
    created_at: spot.created_at,
    swim_spots: {
      id: String(spot.swim_spot_id), // Convert number to string
      name: spot.name || 'Unknown Spot',
      image_url: spot.image_url || '',
      water_type: spot.water_type || 'unknown',
      address: spot.address || '',
      tags: spot.tags || []
    }
  }));

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      <ProfileContent
        profile={profile}
        stats={stats}
        statsLoading={statsLoading}
        savedSpots={transformedSavedSpots}
        savedSpotsLoading={savedSpotsLoading}
        groups={userGroups}
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
