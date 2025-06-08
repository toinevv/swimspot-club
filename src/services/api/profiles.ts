
import { supabase } from '@/integrations/supabase/client';

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
  groupsJoined: number;
  reviewsWritten: number;
  savedSpots: number;
  totalVisits: number;
}

export const profilesApi = {
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return profile;
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return profile;
  },

  async getUserStats(): Promise<UserStats> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
      spotsVisited: 0,
      groupsJoined: 0,
      reviewsWritten: 0,
      savedSpots: 0,
      totalVisits: 0
    };

    // Get unique visited spots count
    const { data: visits } = await supabase
      .from('swim_spot_visits')
      .select('swim_spot_id')
      .eq('user_id', user.id);

    const uniqueSpots = new Set(visits?.map(v => v.swim_spot_id));
    const spotsVisited = uniqueSpots.size;

    // Get groups joined count
    const { data: groups } = await supabase
      .from('user_groups')
      .select('id')
      .eq('user_id', user.id);

    // Get saved spots count
    const { data: saves } = await supabase
      .from('swim_spot_saves')
      .select('id')
      .eq('user_id', user.id);

    return {
      spotsVisited,
      groupsJoined: groups?.length || 0,
      reviewsWritten: 0, // TODO: implement when reviews are added
      savedSpots: saves?.length || 0,
      totalVisits: visits?.length || 0
    };
  },

  async getUserSavedSpots(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: saves } = await supabase
      .from('swim_spot_saves')
      .select(`
        *,
        swim_spots:swim_spot_id (
          id,
          name,
          image_url,
          water_type,
          address,
          tags,
          official_location
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return saves?.map(save => {
      if (!save.swim_spots) return null;
      return {
        ...(save.swim_spots as any),
        savedAt: save.created_at
      };
    }).filter(Boolean) || [];
  },

  async getUserGroups(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: userGroups } = await supabase
      .from('user_groups')
      .select(`
        *,
        groups:group_id (
          id,
          name,
          description,
          image_url,
          location,
          type
        )
      `)
      .eq('user_id', user.id)
      .order('joined_at', { ascending: false });

    return userGroups?.map(ug => {
      if (!ug.groups) return null;
      return {
        ...(ug.groups as any),
        role: ug.role,
        joinedAt: ug.joined_at
      };
    }).filter(Boolean) || [];
  }
};
