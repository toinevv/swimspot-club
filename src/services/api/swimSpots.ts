
import { SwimSpot } from '@/types';
import { apiClient } from './client';

export const swimSpotsApi = {
  async getSwimSpots(filters?: any): Promise<SwimSpot[]> {
    try {
      // Start building the query
      let query = apiClient.supabase.from('swim_spots').select('*');
      
      if (filters) {
        // Apply filters (water type, quality, etc.)
        if (filters.waterType) {
          query = query.eq('water_type', filters.waterType);
        }
        
        if (filters.quality) {
          query = query.eq('water_quality', filters.quality);
        }
        
        // Add more filters as needed
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching swim spots:", error);
        return [];
      }
      
      if (!data) {
        return [];
      }
      
      // Transform Supabase data to match our SwimSpot type
      return data.map(spot => {
        // Parse facilities as an object with default values
        let facilitiesObj: Record<string, boolean> = {};
        if (typeof spot.facilities === 'object' && spot.facilities !== null && !Array.isArray(spot.facilities)) {
          facilitiesObj = spot.facilities as Record<string, any>;
        }
        
        // Parse best_times as an object with default values
        let bestTimesObj: Record<string, string> = {};
        if (typeof spot.best_times === 'object' && spot.best_times !== null && !Array.isArray(spot.best_times)) {
          bestTimesObj = spot.best_times as Record<string, any>;
        }
        
        return {
          id: parseInt(spot.id.split('-')[0], 16), // Generate numeric ID from UUID
          name: spot.name,
          description: spot.description,
          summary: spot.summary,
          image_url: spot.image_url,
          water_type: spot.water_type,
          location: {
            latitude: Number(spot.latitude),
            longitude: Number(spot.longitude),
            address: spot.address
          },
          tags: spot.tags,
          water_quality: spot.water_quality,
          current_temperature: spot.current_temperature ? Number(spot.current_temperature) : undefined,
          current: spot.current,
          visibility: spot.visibility,
          created_at: spot.created_at,
          updated_at: spot.updated_at,
          // Parse the JSON fields with safe access
          facilities: {
            changing_rooms: Boolean(facilitiesObj.changing_rooms),
            restrooms: Boolean(facilitiesObj.restrooms),
            lifeguard: Boolean(facilitiesObj.lifeguard),
            food_drinks: Boolean(facilitiesObj.food_drinks)
          },
          best_times: {
            season: String(bestTimesObj.season || ''),
            time_of_day: String(bestTimesObj.time_of_day || ''),
            weather: String(bestTimesObj.weather || ''),
            water_condition: String(bestTimesObj.water_condition || '')
          }
        };
      });
    } catch (error) {
      console.error("Unexpected error fetching swim spots:", error);
      return [];
    }
  },
  
  async getSwimSpotById(id: number): Promise<SwimSpot | null> {
    try {
      // First, get all spots and find the one with matching generated id
      const spots = await this.getSwimSpots();
      const spot = spots.find(spot => spot.id === id);
      return spot || null;
    } catch (error) {
      console.error("Error fetching swim spot by ID:", error);
      return null;
    }
  },
  
  async getSwimSpotsByIds(ids: number[]): Promise<SwimSpot[]> {
    try {
      // Get all spots and filter by ids
      const spots = await this.getSwimSpots();
      return spots.filter(spot => ids.includes(spot.id));
    } catch (error) {
      console.error("Error fetching swim spots by IDs:", error);
      return [];
    }
  },
  
  async getNearbySpotsById(id: number, limit: number = 3): Promise<SwimSpot[]> {
    try {
      // In a real implementation, this would query spots by geographic proximity
      // Get all spots and filter out the current one
      const spots = await this.getSwimSpots();
      const otherSpots = spots.filter(spot => spot.id !== id);
      return otherSpots.slice(0, limit);
    } catch (error) {
      console.error("Error fetching nearby spots:", error);
      return [];
    }
  }
};
