
import { apiClient } from './client';

export interface SwimSpot {
  id: number;
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
    return apiClient.get('/swim-spots');
  },

  async getSwimSpotById(id: string): Promise<SwimSpot> {
    return apiClient.get(`/swim-spots/${id}`);
  },

  async getSwimSpotsByCity(city: string): Promise<SwimSpot[]> {
    return apiClient.get(`/swim-spots?city=${encodeURIComponent(city)}`);
  },

  async searchSwimSpots(query: string): Promise<SwimSpot[]> {
    return apiClient.get(`/swim-spots/search?q=${encodeURIComponent(query)}`);
  },

  async getSwimSpotsNearby(lat: number, lng: number, radius: number = 50): Promise<SwimSpot[]> {
    return apiClient.get(`/swim-spots/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  }
};
