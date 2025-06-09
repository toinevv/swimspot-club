
import { apiClient } from './client';

export const spotPartnersApi = {
  async getSpotPartners(id: string) {
    try {
      const { data, error } = await apiClient.supabase
        .from('swim_spot_partners')
        .select('*')
        .eq('swim_spot_id', id);

      if (error) {
        console.error(`Error fetching partners for spot ${id}:`, error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error(`Error fetching partners for spot ${id}:`, error);
      return [];
    }
  }
};
