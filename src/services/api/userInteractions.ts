
import { apiClient } from './client';

export const userInteractionsApi = {
  async getSpotPartners(id: string) {
    try {
      const { data, error } = await apiClient.supabase
        .from('swim_spot_partners')
        .select('*')
        .eq('swim_spot_id', id);

      if (error) {
        console.error(`Error fetching partners for spot ${id}:`, error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error(`Error fetching partners for spot ${id}:`, error);
      return [];
    }
  },

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
  },

  async toggleSaveSpot(swimSpotId: string): Promise<void> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        throw new Error("User not logged in");
      }

      // Check if the spot is already saved by the user
      const { data: existingSave, error: existingSaveError } = await apiClient.supabase
        .from('swim_spot_saves')
        .select('id')
        .eq('swim_spot_id', swimSpotId)
        .eq('user_id', user.id)
        .single();

      if (existingSaveError && existingSaveError.code !== 'PGRST116') {
        console.error('Error checking existing save:', existingSaveError);
        throw existingSaveError;
      }

      if (existingSave) {
        // Remove the save
        const { error: deleteError } = await apiClient.supabase
          .from('swim_spot_saves')
          .delete()
          .eq('id', existingSave.id);

        if (deleteError) {
          console.error('Error deleting save:', deleteError);
          throw deleteError;
        }

        // Log the unsave action
        await apiClient.supabase
          .from('swim_spots_audit')
          .insert({
            spot_id: swimSpotId,
            action: 'unsave',
            user_id: user.id,
            success: true
          });

      } else {
        // Create a new save
        const { error: insertError } = await apiClient.supabase
          .from('swim_spot_saves')
          .insert({
            swim_spot_id: swimSpotId,
            user_id: user.id,
          });

        if (insertError) {
          console.error('Error creating save:', insertError);
          throw insertError;
        }

        // Log the save action
        await apiClient.supabase
          .from('swim_spots_audit')
          .insert({
            spot_id: swimSpotId,
            action: 'save',
            user_id: user.id,
            success: true
          });
      }
    } catch (error) {
      console.error('Error toggling save spot:', error);
      throw error;
    }
  },

  async checkIfSaved(swimSpotId: string): Promise<boolean> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return false;
      }

      const { data, error } = await apiClient.supabase
        .from('swim_spot_saves')
        .select('id')
        .eq('swim_spot_id', swimSpotId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking if spot is saved:', error);
      return false;
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
          groups:group_id (
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

      return data || [];
    } catch (error) {
      console.error('Error fetching user groups:', error);
      return [];
    }
  }
};
