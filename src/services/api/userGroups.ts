
import { apiClient } from './client';
import type { UserGroupData } from '@/types/entities';

export const userGroupsApi = {
  async getUserGroups(): Promise<UserGroupData[]> {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return [];
      }

      const { data, error } = await apiClient.supabase
        .from('user_groups')
        .select(`
          id,
          role,
          joined_at,
          groups:group_id (
            id,
            name,
            description,
            image_url,
            location,
            type,
            is_premium
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user groups:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        role: item.role,
        joined_at: item.joined_at,
        groups: {
          id: item.groups.id,
          name: item.groups.name,
          description: item.groups.description,
          image_url: item.groups.image_url,
          location: item.groups.location,
          type: item.groups.type
        }
      })) || [];
    } catch (error) {
      console.error('Error fetching user groups:', error);
      return [];
    }
  }
};
