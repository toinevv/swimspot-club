
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { createSimpleQueryFn, createQueryFn } from "@/services/api/utils";

export const useProfileData = () => {
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: createSimpleQueryFn(api.getCurrentUserProfile),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: createSimpleQueryFn(api.getUserStats),
  });

  // Fix: Get userId from profile and use it properly
  const { data: savedSpots = [], isLoading: savedSpotsLoading } = useQuery({
    queryKey: ['userSavedSpots', profile?.id],
    queryFn: ({ queryKey }) => {
      const userId = queryKey[1];
      if (!userId) throw new Error("No user ID");
      return api.getUserSavedSpots(userId);
    },
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
    savedSpots,
    savedSpotsLoading,
    userGroups,
    groupsLoading,
    isLoading: profileLoading || statsLoading || savedSpotsLoading || groupsLoading,
    error: profileError
  };
};
