
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
  
  // Profiles - These functions take no parameters and get current user's data
  getCurrentUserProfile: profilesApi.getCurrentUserProfile,
  updateProfile: profilesApi.updateProfile,
  getUserSavedSpots: profilesApi.getUserSavedSpots,
  getUserStats: profilesApi.getUserStats,
  
  // Spot interactions - These functions take spotId parameter
  getSpotPartners: spotPartnersApi.getSpotPartners,
  getSpotVisits: spotVisitsApi.getSpotVisits,
  markAsVisited: spotVisitsApi.markAsVisited,
  toggleSaveSpot: spotSavesApi.toggleSaveSpot,
  checkIfSaved: spotSavesApi.checkIfSaved,
  
  // User groups - No parameters, gets current user's groups
  getUserGroups: userGroupsApi.getUserGroups,
  
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
