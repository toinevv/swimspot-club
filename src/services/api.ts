
// This file contains API functions to connect to Supabase

import { SwimSpot, User, Review, SavedSpot, Group, UserGroup, WaterQualityData } from '@/types';
import { supabase } from '@/integrations/supabase/client';

export const api = {
  // Swim Spots
  async getSwimSpots(filters?: any): Promise<SwimSpot[]> {
    try {
      // Start building the query
      let query = supabase.from('swim_spots').select('*');
      
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
        const facilitiesObj = typeof spot.facilities === 'object' && spot.facilities !== null ? spot.facilities : {};
        
        // Parse best_times as an object with default values
        const bestTimesObj = typeof spot.best_times === 'object' && spot.best_times !== null ? spot.best_times : {};
        
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
  },
  
  // Quality Data
  async getWaterQualityHistory(spotId: number): Promise<WaterQualityData[]> {
    // Mock water quality history - would be fetched from Supabase
    const mockHistory: WaterQualityData[] = [
      {
        id: 1,
        swim_spot_id: spotId,
        date: "2023-07-15T10:30:00Z",
        quality: "Excellent",
        temperature: 21,
        ph_level: 7.2,
        bacteria_level: 5,
        clarity: 90,
        notes: "Ideal swimming conditions"
      },
      // Add more historical data points
    ];
    
    return Promise.resolve(mockHistory);
  },
  
  // Reviews
  async getReviewsForSpot(spotId: number): Promise<Review[]> {
    // Mock reviews - would be fetched from Supabase
    const mockReviews: Review[] = [
      {
        id: 1,
        user_id: "user-1",
        swim_spot_id: spotId,
        rating: 5,
        comment: "Beautiful spot with clean water. The picnic area is perfect for spending the whole day!",
        created_at: "2023-07-15T14:30:00Z",
        updated_at: "2023-07-15T14:30:00Z",
        helpful_count: 12
      },
      {
        id: 2,
        user_id: "user-2",
        swim_spot_id: spotId,
        rating: 4,
        comment: "Really enjoyed swimming here. The water quality is excellent, though it can get crowded on weekends.",
        created_at: "2023-08-03T10:15:00Z",
        updated_at: "2023-08-03T10:15:00Z",
        helpful_count: 8
      }
    ];
    
    return Promise.resolve(mockReviews);
  },
  
  // Groups
  async getGroups(filters?: any): Promise<Group[]> {
    // Mock groups - would be fetched from Supabase
    const mockGroups: Group[] = [
      {
        id: 1,
        name: "Amsterdam Morning Dippers",
        description: "Early morning swim group that meets for sunrise dips around Amsterdam. Perfect for early risers!",
        image_url: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
        location: "Amsterdam",
        type: "Public",
        preferred_spots: "Rivers, Lakes",
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-07-20T11:30:00Z",
        is_premium: false
      },
      {
        id: 2,
        name: "Wild Swimming Club",
        description: "Exploring natural swimming spots throughout the Netherlands, from hidden lakes to pristine rivers.",
        image_url: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
        location: "Noord-Holland",
        type: "Private",
        preferred_spots: "Natural Waters",
        created_at: "2023-02-15T14:20:00Z",
        updated_at: "2023-07-25T16:45:00Z",
        is_premium: true
      }
    ];
    
    return Promise.resolve(mockGroups);
  },
  
  async getUserGroups(userId: string): Promise<Group[]> {
    // Mock user groups - would be fetched from Supabase
    // In real implementation, would join usergroups and groups tables
    const mockUserGroups: Group[] = [
      {
        id: 1,
        name: "Amsterdam Morning Dippers",
        description: "Early morning swim group that meets for sunrise dips around Amsterdam.",
        image_url: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
        location: "Amsterdam",
        type: "Public",
        preferred_spots: "Rivers, Lakes",
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-07-20T11:30:00Z",
        is_premium: false
      }
    ];
    
    return Promise.resolve(mockUserGroups);
  },
  
  // User related
  async getUserSavedSpots(userId: string): Promise<SavedSpot[]> {
    // Mock saved spots - would be fetched from Supabase
    const mockSavedSpots: SavedSpot[] = [
      {
        id: 1,
        user_id: userId,
        swim_spot_id: 1,
        created_at: "2023-07-10T14:30:00Z",
        last_visited: "2023-07-18T11:20:00Z"
      },
      {
        id: 2,
        user_id: userId,
        swim_spot_id: 3,
        created_at: "2023-07-12T09:15:00Z",
        last_visited: "2023-07-15T10:30:00Z"
      }
    ];
    
    return Promise.resolve(mockSavedSpots);
  },
  
  async toggleSaveSpot(userId: string, spotId: number): Promise<boolean> {
    // In real implementation, this would toggle a saved spot in Supabase
    console.log(`Toggle save spot ${spotId} for user ${userId}`);
    return Promise.resolve(true);
  },
  
  async toggleLikeSpot(userId: string, spotId: number): Promise<boolean> {
    // In real implementation, this would toggle a liked spot in Supabase
    console.log(`Toggle like spot ${spotId} for user ${userId}`);
    return Promise.resolve(true);
  }
};
