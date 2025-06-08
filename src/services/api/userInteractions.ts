
import { supabase } from '@/integrations/supabase/client';

export const userInteractionsApi = {
  // Save functionality (replacing like)
  async toggleSaveSpot(spotId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if already saved
    const { data: existingSave } = await supabase
      .from('swim_spot_saves')
      .select('*')
      .eq('user_id', user.id)
      .eq('swim_spot_id', spotId)
      .single();

    if (existingSave) {
      // Remove from saved
      await supabase
        .from('swim_spot_saves')
        .delete()
        .eq('user_id', user.id)
        .eq('swim_spot_id', spotId);
      return false;
    } else {
      // Save spot
      await supabase
        .from('swim_spot_saves')
        .insert({ user_id: user.id, swim_spot_id: spotId });
      return true;
    }
  },

  async checkIfSaved(spotId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('swim_spot_saves')
      .select('*')
      .eq('user_id', user.id)
      .eq('swim_spot_id', spotId)
      .single();

    return !!data;
  },

  // Visit functionality (now acts like likes - total visit count)
  async markAsVisited(spotId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if user has visited in the last hour (realistic limitation)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { data: recentVisit } = await supabase
      .from('swim_spot_visits')
      .select('*')
      .eq('user_id', user.id)
      .eq('swim_spot_id', spotId)
      .gt('visited_at', oneHourAgo)
      .maybeSingle();

    if (recentVisit) {
      // Already visited within the last hour
      return false;
    }

    // Record new visit
    const { error } = await supabase
      .from('swim_spot_visits')
      .insert({ user_id: user.id, swim_spot_id: spotId });
    
    if (error) {
      console.error('Error recording visit:', error);
      throw error;
    }
    
    return true;
  },

  async getSpotVisits(spotId: string): Promise<{ count: number; userHasVisited: boolean; recentVisitors: any[] }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data: visits, error } = await supabase
      .from('swim_spot_visits')
      .select(`
        *,
        profiles:user_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('swim_spot_id', spotId)
      .order('visited_at', { ascending: false });

    if (error) {
      console.error('Error fetching visits:', error);
      return { count: 0, userHasVisited: false, recentVisitors: [] };
    }

    const userHasVisited = user ? visits?.some(visit => visit.user_id === user.id) || false : false;
    
    return {
      count: visits?.length || 0,
      userHasVisited,
      recentVisitors: visits?.slice(0, 10) || []
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
          tags
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return saves?.map(save => {
      if (!save.swim_spots) return null;
      return {
        ...save.swim_spots,
        savedAt: save.created_at
      };
    }).filter(Boolean) || [];
  }
};
