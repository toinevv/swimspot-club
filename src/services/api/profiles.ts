
import { apiClient } from './client';

export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  explorer_level?: string;
  is_premium?: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  spots_saved: number;
  spots_visited: number;
  groups_joined: number;
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

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  async getUserSavedSpots() {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return [];
      }

      const { data, error } = await apiClient.supabase
        .from('swim_spot_saves')
        .select(`
          id,
          created_at,
          swim_spots!swim_spot_saves_swim_spot_id_fkey (
            id,
            name,
            image_url,
            water_type,
            address,
            tags
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching saved spots:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching saved spots:', error);
      return [];
    }
  },

  async getUserStats(): Promise<UserStats> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return { spots_saved: 0, spots_visited: 0, groups_joined: 0 };
      }

      // Get saved spots count
      const { data: savedSpots } = await apiClient.supabase
        .from('swim_spot_saves')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      // Get visited spots count
      const { data: visitedSpots } = await apiClient.supabase
        .from('swim_spot_visits')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      // Get groups count
      const { data: userGroups } = await apiClient.supabase
        .from('user_groups')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);

      return {
        spots_saved: savedSpots?.length || 0,
        spots_visited: visitedSpots?.length || 0,
        groups_joined: userGroups?.length || 0
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return { spots_saved: 0, spots_visited: 0, groups_joined: 0 };
    }
  }
};
