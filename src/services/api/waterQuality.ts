
import { WaterQualityData } from '@/types';
import { apiClient } from './client';

export const waterQualityApi = {
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
  }
};
