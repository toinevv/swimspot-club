
// Core entity types for the SwimSpot application
// This is the single source of truth for all data structures

export interface SwimSpot {
  id: string;
  name: string;
  description: string;
  summary: string;
  latitude: number;
  longitude: number;
  image_url: string;
  city?: string;
  country?: string;
  water_type: string;
  address: string;
  tags: string[];
  visibility: string;
  official_location: boolean;
  created_at: string;
  updated_at: string;
  // Computed field for backwards compatibility
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  explorer_level?: string;
  is_premium?: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  spots_saved: number;
  spots_visited: number;
  groups_joined: number;
}

// Raw saved spot data from the database
export interface SavedSpotRaw {
  id: string;
  created_at: string;
  swim_spot_id: string;
  user_id: string;
}

// Enriched saved spot data with swim spot details
export interface SavedSpotData {
  id: string;
  created_at: string;
  swim_spots: {
    id: string;
    name: string;
    image_url: string;
    water_type: string;
    address: string;
    tags: string[];
  };
}

export interface Group {
  id: string;
  name: string;
  description: string;
  image_url: string;
  location: string;
  type: string;
  preferred_spots?: string;
  created_at: string;
  updated_at: string;
  is_premium: boolean;
}

export interface UserGroup {
  id: string;
  user_id: string;
  group_id: string;
  role: 'member' | 'admin' | 'owner';
  joined_at: string;
}

export interface UserGroupData {
  id: string;
  role: string;
  joined_at: string;
  groups: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    location: string;
    type: string;
  };
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string;
  tags?: string[];
  created_at: string;
  published_at: string;
  keyword?: string;
  author: string;
}

export interface City {
  id: string;
  name: string;
  display_name: string;
  slug: string;
  description: string;
  image_url: string;
  coordinates_lat: number;
  coordinates_lng: number;
  population?: number;
  region?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  description?: string;
  type: string;
  image_url?: string;
  address?: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface SpotVisitData {
  count: number;
  visits?: Array<{
    id: string;
    user_id: string;
    swim_spot_id: string;
    visited_at: string;
  }>;
}
