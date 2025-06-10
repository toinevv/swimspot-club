
import { swimSpotsApi } from './swimSpots';
import { groupsApi } from './groups';
import { usersApi } from './users';
import { blogPostsApi } from './blogPosts';
import { citiesApi } from './cities';
import { profilesApi } from './profiles';
import { partnersApi } from './partners';
import { feedbackApi } from './feedback';
import { spotPartnersApi } from './spotPartners';
import { spotVisitsApi } from './spotVisits';
import { spotSavesApi } from './spotSaves';
import { userGroupsApi } from './userGroups';
import { apiClient } from './client';

/**
 * Unified API interface for the SwimSpot application
 * All API calls should go through this interface to ensure consistency
 */
export const api = {
  // Swim spots
  getAllSwimSpots: swimSpotsApi.getAllSwimSpots,
  getSwimSpotById: swimSpotsApi.getSwimSpotById,
  
  // Cities
  getAllCities: citiesApi.getAllCities,
  getCityBySlug: citiesApi.getCityBySlug,
  
  // Blog posts
  getAllBlogPosts: blogPostsApi.getAllBlogPosts,
  getBlogPostBySlug: blogPostsApi.getBlogPostBySlug,
  
  // Profiles - Fixed signatures to match implementations
  getCurrentUserProfile: profilesApi.getCurrentUserProfile,
  updateProfile: profilesApi.updateProfile,
  getUserSavedSpots: profilesApi.getUserSavedSpots, // No parameters needed
  getUserStats: profilesApi.getUserStats, // No parameters needed
  
  // Spot interactions - Fixed signatures
  getSpotPartners: spotPartnersApi.getSpotPartners, // Takes spotId
  getSpotVisits: spotVisitsApi.getSpotVisits, // Takes spotId  
  markAsVisited: spotVisitsApi.markAsVisited, // Takes spotId
  toggleSaveSpot: spotSavesApi.toggleSaveSpot, // Takes spotId
  checkIfSaved: spotSavesApi.checkIfSaved, // Takes spotId
  
  // User groups
  getUserGroups: userGroupsApi.getUserGroups, // No parameters needed
  
  // Groups
  getGroups: groupsApi.getGroups,
  
  // Users
  ...usersApi,
  
  // Partners
  ...partnersApi,
  
  // Feedback
  ...feedbackApi,
  
  // Expose the API client for direct queries
  apiClient
};

// Export individual APIs for specific use cases
export { 
  swimSpotsApi, 
  groupsApi, 
  usersApi, 
  blogPostsApi, 
  citiesApi,
  profilesApi,
  partnersApi,
  feedbackApi,
  spotPartnersApi,
  spotVisitsApi,
  spotSavesApi,
  userGroupsApi,
  apiClient
};

// Export all types from entities - this is the single source of truth
export type * from '@/types/entities';
