
import { Group } from '@/types';
import { apiClient } from './client';

export const groupsApi = {
  async getGroups(filters?: any): Promise<Group[]> {
    // Mock groups - would be fetched from Supabase
    const mockGroups: Group[] = [
      {
        id: 1,
        name: "Amsterdam Morning Dippers",
        description: "Early morning swim group that meets for sunrise dips around Amsterdam. Perfect for early risers!",
        image_url: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
        location: "Amsterdam",
        type: "Public",
        preferred_spots: "Rivers, Lakes",
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-07-20T11:30:00Z",
        is_premium: false
      },
      {
        id: 2,
        name: "Wild Swimming Club",
        description: "Exploring natural swimming spots throughout the Netherlands, from hidden lakes to pristine rivers.",
        image_url: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
        location: "Noord-Holland",
        type: "Private",
        preferred_spots: "Natural Waters",
        created_at: "2023-02-15T14:20:00Z",
        updated_at: "2023-07-25T16:45:00Z",
        is_premium: true
      }
    ];
    
    return Promise.resolve(mockGroups);
  },
  
  async getUserGroups(userId: string): Promise<Group[]> {
    // Mock user groups - would be fetched from Supabase
    // In real implementation, would join usergroups and groups tables
    const mockUserGroups: Group[] = [
      {
        id: 1,
        name: "Amsterdam Morning Dippers",
        description: "Early morning swim group that meets for sunrise dips around Amsterdam.",
        image_url: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
        location: "Amsterdam",
        type: "Public",
        preferred_spots: "Rivers, Lakes",
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-07-20T11:30:00Z",
        is_premium: false
      }
    ];
    
    return Promise.resolve(mockUserGroups);
  }
};
