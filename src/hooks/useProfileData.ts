
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { createSimpleQueryFn } from "@/services/api/utils";

export const useProfileData = () => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: createSimpleQueryFn(api.getCurrentUserProfile),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: createSimpleQueryFn(api.getUserStats),
  });

  // Fix: Use the correct API function that returns SavedSpotData[]
  const { data: savedSpots = [], isLoading: savedSpotsLoading } = useQuery({
    queryKey: ['userSavedSpots'],
    queryFn: createSimpleQueryFn(api.getUserSavedSpots),
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
    savedSpots,
    savedSpotsLoading,
    userGroups,
    groupsLoading,
    isLoading: profileLoading || statsLoading || savedSpotsLoading || groupsLoading,
    error: profileError
  };
};
