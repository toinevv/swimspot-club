
import { apiClient } from './client';

export const spotSavesApi = {
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
  }
};
