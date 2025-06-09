
import { apiClient } from './client';

export const swimSpotsApi = {
  async getSwimSpots(filters: any = {}) {
    try {
      let query = apiClient.supabase
        .from('swim_spots')
        .select('*');

      // Apply filters if provided
      if (filters.waterType) {
        query = query.eq('water_type', filters.waterType);
      }

      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      if (filters.isPremium) {
        query = query.eq('is_premium', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching swim spots:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching swim spots:', error);
      return [];
    }
  },

  async getSwimSpotById(id: string) {
    try {
      const { data, error } = await apiClient.supabase
        .from('swim_spots')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(`Error fetching swim spot with id ${id}:`, error);
        throw new Error(`Failed to fetch swim spot with id ${id}`);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching swim spot with id ${id}:`, error);
      throw error;
    }
  }
};
