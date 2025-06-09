
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { createSimpleQueryFn } from "@/services/api/utils";

export const useProfileData = () => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: createSimpleQueryFn(api.getCurrentUserProfile),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: createSimpleQueryFn(api.getUserStats),
  });

  const { data: savedSpots = [], isLoading: savedSpotsLoading } = useQuery({
    queryKey: ['savedSpots'],
    queryFn: createSimpleQueryFn(api.getUserSavedSpots),
    enabled: !!profile?.id,
  });

  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ['userGroups'],
    queryFn: createSimpleQueryFn(api.getUserGroups),
    enabled: !!profile?.id,
  });

  return {
    profile,
    profileLoading,
    stats: stats || { spots_saved: 0, spots_visited: 0, groups_joined: 0 },
    statsLoading,
    savedSpots,
    savedSpotsLoading,
    groups,
    groupsLoading
  };
};
