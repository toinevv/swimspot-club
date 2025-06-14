
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { createSimpleQueryFn } from "@/services/api/utils";
import type { SavedSpotData } from "@/types/entities";

export const useProfileData = () => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: createSimpleQueryFn(api.getCurrentUserProfile),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: createSimpleQueryFn(api.getUserStats),
  });

  // Correct: getUserSavedSpots returns SavedSpotData[] - no params needed.
  const { data: savedSpots = [], isLoading: savedSpotsLoading } = useQuery<SavedSpotData[]>({
    queryKey: ['userSavedSpots'],
    queryFn: createSimpleQueryFn(api.getUserSavedSpots),
    enabled: !!profile?.id,
  });

  const { data: userGroups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ['userGroups'],
    queryFn: createSimpleQueryFn(api.getUserGroups),
  });

  return {
    profile,
    profileLoading,
    stats,
    statsLoading,
    savedSpots, // this type now matches everywhere!
    savedSpotsLoading,
    userGroups,
    groupsLoading,
    isLoading: profileLoading || statsLoading || savedSpotsLoading || groupsLoading,
    error: profileError
  };
};
