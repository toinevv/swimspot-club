
import { apiClient } from './client';
import { mapRawSpotToSwimSpot } from './mappers';
import type { SwimSpot } from '@/types/entities';

/**
 * API functions for swim spots
 * All functions return data that matches the SwimSpot interface
 */
export const swimSpotsApi = {
  /**
   * Fetch all swim spots from the database
   * @returns Promise<SwimSpot[]> Array of swim spots with consistent structure
   */
  async getAllSwimSpots(): Promise<SwimSpot[]> {
    const { data, error } = await apiClient.supabase
      .from('swim_spots')
      .select('*');

    if (error) {
      console.error('Error fetching swim spots:', error);
      return [];
    }

    return (data || []).map(mapRawSpotToSwimSpot);
  },

  /**
   * Fetch a single swim spot by ID
   * @param id - The swim spot ID
   * @returns Promise<SwimSpot> Single swim spot data
   */
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

    return mapRawSpotToSwimSpot(data);
  },

  /**
   * Search swim spots by name
   * @param query - Search query string
   * @returns Promise<SwimSpot[]> Array of matching swim spots
   */
  async searchSwimSpots(query: string): Promise<SwimSpot[]> {
    const { data, error } = await apiClient.supabase
      .from('swim_spots')
      .select('*')
      .ilike('name', `%${query}%`);

    if (error) {
      console.error('Error searching swim spots:', error);
      return [];
    }

    return (data || []).map(mapRawSpotToSwimSpot);
  }
};
