
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

      // Transform database data to match SwimSpot interface
      return (data || []).map(spot => ({
        id: spot.id,
        name: spot.name,
        description: spot.description,
        summary: spot.summary,
        image_url: spot.image_url,
        water_type: spot.water_type,
        location: {
          latitude: parseFloat(spot.latitude.toString()),
          longitude: parseFloat(spot.longitude.toString()),
          address: spot.address
        },
        tags: spot.tags || [],
        visibility: spot.visibility,
        city: spot.city,
        country: spot.country,
        official_location: spot.official_location,
        created_at: spot.created_at,
        updated_at: spot.updated_at
      }));
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

      // Transform database data to match SwimSpot interface
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        summary: data.summary,
        image_url: data.image_url,
        water_type: data.water_type,
        location: {
          latitude: parseFloat(data.latitude.toString()),
          longitude: parseFloat(data.longitude.toString()),
          address: data.address
        },
        tags: data.tags || [],
        visibility: data.visibility,
        city: data.city,
        country: data.country,
        official_location: data.official_location,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error(`Error fetching swim spot with id ${id}:`, error);
      throw error;
    }
  }
};
