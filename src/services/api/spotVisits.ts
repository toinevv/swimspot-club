
import { apiClient } from './client';

export const spotVisitsApi = {
  async getSpotVisits(id: string) {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return { count: 0 };
      }

      const { data, error } = await apiClient.supabase
        .from('swim_spot_visits')
        .select('*')
        .eq('swim_spot_id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error(`Error fetching visit count for spot ${id}:`, error);
        return { count: 0 };
      }

      return { count: data?.length || 0 };
    } catch (error) {
      console.error(`Error fetching visit count for spot ${id}:`, error);
      return { count: 0 };
    }
  },

  async markAsVisited(swimSpotId: string): Promise<boolean> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return false;
      }

      // Check if the user has already visited the spot in the last hour
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      const { data: existingVisit, error: existingVisitError } = await apiClient.supabase
        .from('swim_spots_audit')
        .select('created_at')
        .eq('spot_id', swimSpotId)
        .eq('user_id', user.id)
        .eq('action', 'visit')
        .gte('created_at', oneHourAgo.toISOString())
        .maybeSingle();

      if (existingVisitError) {
        console.error('Error checking existing visit:', existingVisitError);
        return false;
      }

      if (existingVisit) {
        return true;
      }

      // Create a new visit record
      const { error: insertError } = await apiClient.supabase
        .from('swim_spot_visits')
        .insert({
          swim_spot_id: swimSpotId,
          user_id: user.id,
        });

      if (insertError) {
        console.error('Error creating visit:', insertError);
        return false;
      }

      // Log the visit in the audit table
      const { error: auditError } = await apiClient.supabase
        .from('swim_spots_audit')
        .insert({
          spot_id: swimSpotId,
          action: 'visit',
          user_id: user.id,
          success: true,
        });

      if (auditError) {
        console.error('Error logging visit in audit table:', auditError);
      }

      return true;
    } catch (error) {
      console.error('Error marking spot as visited:', error);
      return false;
    }
  }
};
