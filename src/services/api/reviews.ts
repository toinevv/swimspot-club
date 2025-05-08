
import { Review } from '@/types';
import { apiClient } from './client';

export const reviewsApi = {
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
  }
};
