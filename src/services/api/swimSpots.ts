
import { apiClient } from './client';

export interface SwimSpot {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  image_url?: string;
  city?: string;
  country?: string;
  water_type?: string;
  difficulty_level?: string;
  accessibility?: string;
  facilities?: string[];
  best_time_to_visit?: string;
  entry_fee?: number;
  created_at?: string;
  updated_at?: string;
}

export const swimSpotsApi = {
  async getAllSwimSpots(): Promise<SwimSpot[]> {
    const { data, error } = await apiClient.supabase
      .from('swim_spots')
      .select('*');

    if (error) {
      console.error('Error fetching swim spots:', error);
      return [];
    }

    return data || [];
  },

  async getSwimSpotById(id: string): Promise<SwimSpot> {
    const { data, error } = await apiClient.supabase
      .from('swim_spots')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching swim spot:', error);
      throw error;
    }

    return data;
  },

  async getSwimSpotsByCity(city: string): Promise<SwimSpot[]> {
    const { data, error } = await apiClient.supabase
      .from('swim_spots')
      .select('*')
      .eq('city', city);

    if (error) {
      console.error('Error fetching swim spots by city:', error);
      return [];
    }

    return data || [];
  },

  async searchSwimSpots(query: string): Promise<SwimSpot[]> {
    const { data, error } = await apiClient.supabase
      .from('swim_spots')
      .select('*')
      .ilike('name', `%${query}%`);

    if (error) {
      console.error('Error searching swim spots:', error);
      return [];
    }

    return data || [];
  },

  async getSwimSpotsNearby(lat: number, lng: number, radius: number = 50): Promise<SwimSpot[]> {
    const { data, error } = await apiClient.supabase
      .from('swim_spots')
      .select('*');

    if (error) {
      console.error('Error fetching nearby swim spots:', error);
      return [];
    }

    // Simple distance filtering (in a real app, you'd use PostGIS)
    return (data || []).filter(spot => {
      const distance = Math.sqrt(
        Math.pow(spot.latitude - lat, 2) + Math.pow(spot.longitude - lng, 2)
      );
      return distance <= radius / 111; // Rough conversion to degrees
    });
  }
};
