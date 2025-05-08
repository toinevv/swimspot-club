
import { SavedSpot } from '@/types';
import { apiClient } from './client';

export const usersApi = {
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
