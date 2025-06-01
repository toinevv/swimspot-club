
import { apiClient } from './client';

export interface City {
  id: string;
  slug: string;
  name: string;
  display_name: string;
  description: string;
  image_url: string;
  coordinates_lat: number;
  coordinates_lng: number;
  population?: number;
  region?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const citiesApi = {
  async getAllCities(): Promise<City[]> {
    try {
      const { data, error } = await apiClient.supabase
        .from('cities')
        .select('*')
        .order('featured', { ascending: false })
        .order('display_name');
      
      if (error) {
        console.error("Error fetching cities:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Unexpected error fetching cities:", error);
      return [];
    }
  },

  async getCityBySlug(slug: string): Promise<City | null> {
    try {
      const { data, error } = await apiClient.supabase
        .from('cities')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error || !data) {
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error fetching city by slug:", error);
      return null;
    }
  },

  async getFeaturedCities(): Promise<City[]> {
    try {
      const { data, error } = await apiClient.supabase
        .from('cities')
        .select('*')
        .eq('featured', true)
        .order('display_name');
      
      if (error) {
        console.error("Error fetching featured cities:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Unexpected error fetching featured cities:", error);
      return [];
    }
  }
};
