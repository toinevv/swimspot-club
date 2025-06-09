
import { apiClient } from './client';

export const feedbackApi = {
  async submitFeedback(swimSpotId: string): Promise<boolean> {
    return this.submitFeedbackWithText(swimSpotId, "General feedback");
  },

  async submitFeedbackWithText(swimSpotId: string, feedbackText: string): Promise<boolean> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();
      
      // Get current spot data
      const { data: currentSpot } = await apiClient.supabase
        .from('swim_spots')
        .select('flag_count, feedback_flag')
        .eq('id', swimSpotId)
        .single();

      if (!currentSpot) {
        throw new Error('Swim spot not found');
      }

      const currentFlagCount = currentSpot.flag_count || 0;
      const existingFeedback = currentSpot.feedback_flag || '';
      
      // Create new feedback entry with actual text
      const feedbackEntry = `feedback${currentFlagCount + 1}: ${feedbackText}`;
      
      // Append to existing feedback array-style string
      const updatedFeedback = existingFeedback 
        ? `${existingFeedback} | ${feedbackEntry}`
        : feedbackEntry;

      // Update the swim spot with flag information
      const { error } = await apiClient.supabase
        .from('swim_spots')
        .update({
          flagged: true,
          flagged_by: user?.id || 'anonymous',
          flagged_at: new Date().toISOString(),
          flag_count: currentFlagCount + 1,
          feedback_flag: updatedFeedback
        })
        .eq('id', swimSpotId);

      if (error) {
        console.error('Error submitting feedback:', error);
        return false;
      }

      // Log the feedback action in the audit table
      if (user) {
        await apiClient.supabase
          .from('swim_spots_audit')
          .insert({
            spot_id: swimSpotId,
            action: 'flag',
            user_id: user.id,
            flag_type: 'user_feedback',
            message: `Feedback ${currentFlagCount + 1} submitted: ${feedbackText}`,
            success: true
          });
      } else {
        await apiClient.supabase
          .from('swim_spots_audit')
          .insert({
            spot_id: swimSpotId,
            action: 'flag',
            user_id: 'anonymous',
            flag_type: 'anonymous_feedback',
            message: `Anonymous feedback ${currentFlagCount + 1} submitted: ${feedbackText}`,
            success: true
          });
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
      
      // If no user, they can always submit feedback (no cooldown for anonymous users)
      if (!user) {
        return false;
      }

      // Check if authenticated user has submitted feedback in the last hour (to prevent spam)
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      const { data, error } = await apiClient.supabase
        .from('swim_spots_audit')
        .select('created_at')
        .eq('spot_id', swimSpotId)
        .eq('user_id', user.id)
        .eq('action', 'flag')
        .gte('created_at', oneHourAgo.toISOString())
        .maybeSingle();

      if (error) {
        console.error('Error checking user feedback:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking user feedback:', error);
      return false;
    }
  }
};
