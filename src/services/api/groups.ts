
import { apiClient } from './client';
import { mapRawGroupToGroup } from './mappers';
import type { Group } from '@/types/entities';

export const groupsApi = {
  async getGroups(): Promise<Group[]> {
    try {
      const { data, error } = await apiClient.supabase
        .from('groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching groups:', error);
        return [];
      }

      return (data || []).map(mapRawGroupToGroup);
    } catch (error) {
      console.error('Error fetching groups:', error);
      return [];
    }
  }
};
