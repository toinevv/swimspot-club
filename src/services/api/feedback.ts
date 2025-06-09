
import { apiClient } from './client';

export const feedbackApi = {
  async submitFeedback(swimSpotId: string): Promise<boolean> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to submit feedback');
      }

      // Check if user has already flagged this spot
      const { data: existingFlag } = await apiClient.supabase
        .from('swim_spots')
        .select('flagged_by, flag_count')
        .eq('id', swimSpotId)
        .eq('flagged_by', user.id)
        .single();

      if (existingFlag) {
        return false; // User has already flagged this spot
      }

      // Get current flag count first
      const { data: currentSpot } = await apiClient.supabase
        .from('swim_spots')
        .select('flag_count')
        .eq('id', swimSpotId)
        .single();

      const currentFlagCount = currentSpot?.flag_count || 0;

      // Update the swim spot with flag information
      const { error } = await apiClient.supabase
        .from('swim_spots')
        .update({
          flagged_by: user.id,
          flagged_at: new Date().toISOString(),
          flag_count: currentFlagCount + 1
        })
        .eq('id', swimSpotId);

      if (error) {
        console.error('Error submitting feedback:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  },

  async checkUserFeedback(swimSpotId: string): Promise<boolean> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();
      
      if (!user) {
        return false;
      }

      const { data } = await apiClient.supabase
        .from('swim_spots')
        .select('flagged_by')
        .eq('id', swimSpotId)
        .eq('flagged_by', user.id)
        .single();

      return !!data;
    } catch (error) {
      return false;
    }
  }
};
