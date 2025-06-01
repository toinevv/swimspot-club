
import { supabase } from '@/integrations/supabase/client';

export const userInteractionsApi = {
  // Like functionality
  async toggleLikeSpot(spotId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('swim_spot_likes')
      .select('*')
      .eq('user_id', user.id)
      .eq('swim_spot_id', spotId)
      .single();

    if (existingLike) {
      // Unlike
      await supabase
        .from('swim_spot_likes')
        .delete()
        .eq('user_id', user.id)
        .eq('swim_spot_id', spotId);
      return false;
    } else {
      // Like
      await supabase
        .from('swim_spot_likes')
        .insert({ user_id: user.id, swim_spot_id: spotId });
      return true;
    }
  },

  async getSpotLikes(spotId: string): Promise<{ count: number; userHasLiked: boolean; likedBy: any[] }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data: likes } = await supabase
      .from('swim_spot_likes')
      .select(`
        *,
        profiles:user_id (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('swim_spot_id', spotId);

    const userHasLiked = user ? likes?.some(like => like.user_id === user.id) || false : false;
    
    return {
      count: likes?.length || 0,
      userHasLiked,
      likedBy: likes || []
    };
  },

  // Save functionality
  async toggleSaveSpot(spotId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: existingSave } = await supabase
      .from('swim_spot_saves')
      .select('*')
      .eq('user_id', user.id)
      .eq('swim_spot_id', spotId)
      .single();

    if (existingSave) {
      await supabase
        .from('swim_spot_saves')
        .delete()
        .eq('user_id', user.id)
        .eq('swim_spot_id', spotId);
      return false;
    } else {
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

  // Visit functionality
  async markAsVisited(spotId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    await supabase
      .from('swim_spot_visits')
      .insert({ user_id: user.id, swim_spot_id: spotId });
  },

  async getSpotVisits(spotId: string): Promise<{ count: number; recentVisitors: any[] }> {
    const { data: visits } = await supabase
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

    return {
      count: visits?.length || 0,
      recentVisitors: visits?.slice(0, 10) || []
    };
  }
};
