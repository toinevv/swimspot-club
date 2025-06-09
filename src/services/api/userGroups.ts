
import { apiClient } from './client';

export interface UserGroupData {
  id: string;
  role: string;
  groups: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    location: string;
    type: string;
    is_premium: boolean;
  };
}

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

      return data || [];
    } catch (error) {
      console.error('Error fetching user groups:', error);
      return [];
    }
  }
};
