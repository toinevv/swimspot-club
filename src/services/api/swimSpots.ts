
import { apiClient } from './client';
import type { SwimSpot } from '../types/entities';

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

    return (data || []).map(spot => ({
      id: spot.id,
      name: spot.name,
      description: spot.description || '',
      summary: spot.summary || spot.description || '',
      latitude: Number(spot.latitude),
      longitude: Number(spot.longitude),
      image_url: spot.image_url || '',
      city: spot.city,
      country: spot.country,
      water_type: spot.water_type || '',
      address: spot.address || '',
      tags: spot.tags || [],
      visibility: spot.visibility || 'public',
      official_location: spot.official_location || false,
      created_at: spot.created_at || '',
      updated_at: spot.updated_at || '',
      location: {
        latitude: Number(spot.latitude),
        longitude: Number(spot.longitude),
        address: spot.address || ''
      }
    }));
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

    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      summary: data.summary || data.description || '',
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      image_url: data.image_url || '',
      city: data.city,
      country: data.country,
      water_type: data.water_type || '',
      address: data.address || '',
      tags: data.tags || [],
      visibility: data.visibility || 'public',
      official_location: data.official_location || false,
      created_at: data.created_at || '',
      updated_at: data.updated_at || '',
      location: {
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        address: data.address || ''
      }
    };
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

    return (data || []).map(spot => ({
      id: spot.id,
      name: spot.name,
      description: spot.description || '',
      summary: spot.summary || spot.description || '',
      latitude: Number(spot.latitude),
      longitude: Number(spot.longitude),
      image_url: spot.image_url || '',
      city: spot.city,
      country: spot.country,
      water_type: spot.water_type || '',
      address: spot.address || '',
      tags: spot.tags || [],
      visibility: spot.visibility || 'public',
      official_location: spot.official_location || false,
      created_at: spot.created_at || '',
      updated_at: spot.updated_at || '',
      location: {
        latitude: Number(spot.latitude),
        longitude: Number(spot.longitude),
        address: spot.address || ''
      }
    }));
  }
};
