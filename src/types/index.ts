
// Supabase table types for our SwimSpot application

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  is_premium: boolean;
  bio?: string;
  location?: string;
  invite_codes?: string[];
  explorer_level?: string;
}

export interface SwimSpot {
  id: number;
  name: string;
  description: string;
  summary: string; // AI-generated
  image_url: string;
  water_type: string; // Changed from union type to string to match database
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  tags: string[];
  water_quality: string; // Changed from union type to string to match database
  current_temperature?: number;
  current?: string; // Changed from union type to string to match database
  visibility: string; // Changed from union type to string to match database
  created_at: string;
  updated_at: string;
  facilities: {
    changing_rooms: boolean;
    restrooms: boolean;
    lifeguard: boolean;
    food_drinks: boolean;
  };
  best_times: {
    season: string;
    time_of_day: string;
    weather: string;
    water_condition: string;
  };
}

export interface Review {
  id: number;
  user_id: string;
  swim_spot_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  helpful_count: number;
}

export interface SavedSpot {
  id: number;
  user_id: string;
  swim_spot_id: number;
  created_at: string;
  last_visited?: string;
}

export interface Group {
  id: string; // Changed from number to string to match UUID from database
  name: string;
  description: string;
  image_url: string;
  location: string;
  type: 'Public' | 'Private' | 'Invite Only';
  preferred_spots?: string;
  created_at: string;
  updated_at: string;
  is_premium: boolean;
}

export interface UserGroup {
  id: string; // Changed from number to string to match UUID from database
  user_id: string;
  group_id: string; // Changed from number to string to match UUID from database
  role: 'member' | 'admin' | 'owner';
  joined_at: string;
}

export interface WaterQualityData {
  id: number;
  swim_spot_id: number;
  date: string;
  quality: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
  temperature?: number;
  ph_level?: number;
  bacteria_level?: number;
  clarity?: number;
  notes?: string;
}
