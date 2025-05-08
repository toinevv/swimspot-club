
import { Group } from '@/types';
import { apiClient } from './client';

export const groupsApi = {
  async getGroups(filters?: any): Promise<Group[]> {
    const { data: groups, error } = await apiClient.supabase
      .from('groups')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching groups:', error);
      return [];
    }
    
    return groups || [];
  },
  
  async getUserGroups(userId: string): Promise<Group[]> {
    const { data: userGroups, error } = await apiClient.supabase
      .from('user_groups')
      .select(`
        group_id,
        groups:group_id (*)
      `)
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching user groups:', error);
      return [];
    }
    
    // Extract the groups from the joined query
    return userGroups?.map(ug => ug.groups) || [];
  }
};
