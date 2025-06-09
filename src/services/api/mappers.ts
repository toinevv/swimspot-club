
/**
 * Data mapping functions for converting raw API responses to frontend types
 * This ensures consistent data shapes across the application
 */

import type { 
  SwimSpot, 
  UserProfile, 
  SavedSpotData, 
  City, 
  BlogArticle, 
  Group 
} from '@/types/entities';

/**
 * Maps raw Supabase swim spot data to our unified SwimSpot type
 */
export const mapRawSpotToSwimSpot = (rawSpot: any): SwimSpot => {
  return {
    id: rawSpot.id,
    name: rawSpot.name,
    description: rawSpot.description || '',
    summary: rawSpot.summary || rawSpot.description || '',
    latitude: Number(rawSpot.latitude),
    longitude: Number(rawSpot.longitude),
    image_url: rawSpot.image_url || '',
    city: rawSpot.city,
    country: rawSpot.country || 'Netherlands',
    water_type: rawSpot.water_type || '',
    address: rawSpot.address || '',
    tags: rawSpot.tags || [],
    visibility: rawSpot.visibility || 'public',
    official_location: rawSpot.official_location || false,
    created_at: rawSpot.created_at || '',
    updated_at: rawSpot.updated_at || '',
    location: {
      latitude: Number(rawSpot.latitude),
      longitude: Number(rawSpot.longitude),
      address: rawSpot.address || ''
    }
  };
};

/**
 * Maps raw Supabase profile data to our unified UserProfile type
 */
export const mapRawProfileToUserProfile = (rawProfile: any): UserProfile => {
  return {
    id: rawProfile.id,
    username: rawProfile.username,
    full_name: rawProfile.full_name,
    avatar_url: rawProfile.avatar_url,
    bio: rawProfile.bio,
    location: rawProfile.location,
    explorer_level: rawProfile.explorer_level || 'Beginner',
    is_premium: rawProfile.is_premium || false,
    created_at: rawProfile.created_at,
    updated_at: rawProfile.updated_at
  };
};

/**
 * Maps raw saved spot data with joined swim spot details
 */
export const mapRawSavedSpotToSavedSpotData = (rawSavedSpot: any): SavedSpotData => {
  return {
    id: rawSavedSpot.id,
    created_at: rawSavedSpot.created_at,
    swim_spots: {
      id: rawSavedSpot.swim_spots.id,
      name: rawSavedSpot.swim_spots.name,
      image_url: rawSavedSpot.swim_spots.image_url,
      water_type: rawSavedSpot.swim_spots.water_type,
      address: rawSavedSpot.swim_spots.address,
      tags: rawSavedSpot.swim_spots.tags || []
    }
  };
};

/**
 * Maps raw city data to our unified City type
 */
export const mapRawCityToCity = (rawCity: any): City => {
  return {
    id: rawCity.id,
    name: rawCity.name,
    display_name: rawCity.display_name,
    slug: rawCity.slug,
    description: rawCity.description,
    image_url: rawCity.image_url,
    coordinates_lat: Number(rawCity.coordinates_lat),
    coordinates_lng: Number(rawCity.coordinates_lng),
    population: rawCity.population,
    region: rawCity.region,
    featured: rawCity.featured || false,
    created_at: rawCity.created_at,
    updated_at: rawCity.updated_at
  };
};

/**
 * Maps raw blog article data to our unified BlogArticle type
 */
export const mapRawBlogToBlogArticle = (rawBlog: any): BlogArticle => {
  return {
    id: rawBlog.id,
    title: rawBlog.title,
    slug: rawBlog.slug,
    content: rawBlog.content,
    cover_image_url: rawBlog.cover_image_url,
    tags: rawBlog.tags || [],
    created_at: rawBlog.created_at,
    published_at: rawBlog.published_at,
    keyword: rawBlog.keyword,
    author: rawBlog.author
  };
};

/**
 * Maps raw group data to our unified Group type
 */
export const mapRawGroupToGroup = (rawGroup: any): Group => {
  return {
    id: rawGroup.id,
    name: rawGroup.name,
    description: rawGroup.description,
    image_url: rawGroup.image_url,
    location: rawGroup.location,
    type: rawGroup.type,
    preferred_spots: rawGroup.preferred_spots,
    created_at: rawGroup.created_at,
    updated_at: rawGroup.updated_at,
    is_premium: rawGroup.is_premium || false
  };
};
