
import { apiClient } from './client';

export interface City {
  id: string;
  name: string;
  display_name: string;
  slug: string;
  description: string;
  image_url: string;
  coordinates_lat: number;
  coordinates_lng: number;
  region?: string;
  population?: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const citiesApi = {
  async getAllCities() {
    try {
      const { data, error } = await apiClient.supabase
        .from('cities')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching cities:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  },

  async getCityBySlug(slug: string) {
    try {
      const { data, error } = await apiClient.supabase
        .from('cities')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error(`Error fetching city with slug ${slug}:`, error);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Error fetching city with slug ${slug}:`, error);
      return null;
    }
  }
};
