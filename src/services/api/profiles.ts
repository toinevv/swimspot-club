
import { apiClient } from './client';

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  explorer_level: string | null;
  is_premium: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  spotsVisited: number;
  savedSpots: number;
  groupsJoined: number;
  totalVisits: number;
}

export const profilesApi = {
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return null;
      }

      const { data, error } = await apiClient.supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await apiClient.supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  async getUserStats(): Promise<UserStats> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return {
          spotsVisited: 0,
          savedSpots: 0,
          groupsJoined: 0,
          totalVisits: 0
        };
      }

      // Get saved spots count
      const { data: savedSpots } = await apiClient.supabase
        .from('swim_spot_saves')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      // Get groups joined count
      const { data: groupsJoined } = await apiClient.supabase
        .from('user_groups')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      // Get spots visited and total visits from spot_visits table
      const { data: visitData } = await apiClient.supabase
        .from('swim_spot_visits')
        .select('*')
        .eq('user_id', user.id);

      const spotsVisited = visitData?.length || 0;
      const totalVisits = visitData?.length || 0;

      return {
        spotsVisited,
        savedSpots: savedSpots?.length || 0,
        groupsJoined: groupsJoined?.length || 0,
        totalVisits
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return {
        spotsVisited: 0,
        savedSpots: 0,
        groupsJoined: 0,
        totalVisits: 0
      };
    }
  },

  async getUserSavedSpots() {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return [];
      }

      // Fix the relationship query by being more explicit
      const { data, error } = await apiClient.supabase
        .from('swim_spot_saves')
        .select(`
          swim_spots!swim_spot_saves_swim_spot_id_fkey (
            id,
            name,
            image_url,
            city,
            water_type,
            address,
            tags
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching saved spots:', error);
        return [];
      }

      return data?.map(save => save.swim_spots).filter(Boolean) || [];
    } catch (error) {
      console.error('Error fetching saved spots:', error);
      return [];
    }
  },

  async getUserGroups() {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return [];
      }

      const { data, error } = await apiClient.supabase
        .from('user_groups')
        .select(`
          role,
          groups!user_groups_group_id_fkey (
            id,
            name,
            description,
            image_url,
            location,
            type,
            is_premium
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user groups:', error);
        return [];
      }

      return data?.map(userGroup => ({
        id: userGroup.groups.id,
        name: userGroup.groups.name,
        description: userGroup.groups.description,
        image_url: userGroup.groups.image_url,
        location: userGroup.groups.location,
        type: userGroup.groups.type,
        is_premium: userGroup.groups.is_premium,
        role: userGroup.role
      })) || [];
    } catch (error) {
      console.error('Error fetching user groups:', error);
      return [];
    }
  }
};
