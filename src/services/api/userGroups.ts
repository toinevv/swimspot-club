
import { apiClient } from './client';

export const userGroupsApi = {
  async getUserGroups() {
    try {
      const { data: { user } } = await apiClient.supabase.auth.getUser();

      if (!user) {
        return [];
      }

      const { data, error } = await apiClient.supabase
        .from('user_groups')
        .select(`
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
