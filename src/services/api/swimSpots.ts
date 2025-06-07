import { SwimSpot } from '@/types';
import { apiClient } from './client';

export const swimSpotsApi = {
  async getSwimSpots(filters?: any): Promise<SwimSpot[]> {
    try {
      // Start building the query
      let query = apiClient.supabase.from('swim_spots').select('*');
      
      if (filters) {
        // Apply city filter if provided
        if (filters.city) {
          query = query.eq('city', filters.city);
        }
        
        // Apply other filters (water type, etc.)
        if (filters.waterType) {
          query = query.eq('water_type', filters.waterType);
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
        return {
          id: spot.id, // Use the UUID directly
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
          current: spot.current,
          visibility: spot.visibility,
          city: spot.city, // Include city field
          country: spot.country, // Include country field
          created_at: spot.created_at,
          updated_at: spot.updated_at
        };
      });
    } catch (error) {
      console.error("Unexpected error fetching swim spots:", error);
      return [];
    }
  },
  
  async getSwimSpotById(id: string | number): Promise<SwimSpot | null> {
    try {
      // If id is a number, we need to get all spots and find by generated id
      if (typeof id === 'number') {
        const spots = await this.getSwimSpots();
        const spot = spots.find(spot => {
          // Try to extract a numeric id from UUID for backward compatibility
          const numericId = parseInt(spot.id.split('-')[0], 16);
          return numericId === id;
        });
        return spot || null;
      }
      
      // Otherwise use the UUID directly to query
      const { data, error } = await apiClient.supabase
        .from('swim_spots')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error || !data) {
        return null;
      }
      
      // Process the spot data similar to getSwimSpots
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        summary: data.summary,
        image_url: data.image_url,
        water_type: data.water_type,
        location: {
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          address: data.address
        },
        tags: data.tags,
        current: data.current,
        visibility: data.visibility,
        city: data.city, // Include city field
        country: data.country, // Include country field
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error("Error fetching swim spot by ID:", error);
      return null;
    }
  },
  
  async getSwimSpotsByIds(ids: (string | number)[]): Promise<SwimSpot[]> {
    try {
      // Get all spots and filter by ids
      const spots = await this.getSwimSpots();
      return spots.filter(spot => ids.includes(spot.id));
    } catch (error) {
      console.error("Error fetching swim spots by IDs:", error);
      return [];
    }
  },
  
  async getNearbySpotsById(id: string | number, limit: number = 3): Promise<SwimSpot[]> {
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
