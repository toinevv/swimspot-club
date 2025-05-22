
import { WaterQualityData } from '@/types';
import { apiClient } from './client';

export const waterQualityApi = {
  async getWaterQualityHistory(spotId: number): Promise<WaterQualityData[]> {
    // Return empty array as we're not providing water quality data
    return Promise.resolve([]);
  }
};
