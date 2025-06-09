
import { swimSpotsApi } from './swimSpots';
import { waterQualityApi } from './waterQuality';
import { reviewsApi } from './reviews';
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

export const api = {
  // Swim spots
  getSwimSpots: swimSpotsApi.getSwimSpots,
  getSwimSpotById: swimSpotsApi.getSwimSpotById,
  
  // Cities
  getAllCities: citiesApi.getAllCities,
  getCityBySlug: citiesApi.getCityBySlug,
  
  // Blog posts
  getAllBlogPosts: blogPostsApi.getAllBlogPosts,
  getBlogPostBySlug: blogPostsApi.getBlogPostBySlug,
  
  // Profiles
  getCurrentUserProfile: profilesApi.getCurrentUserProfile,
  getUserSavedSpots: profilesApi.getUserSavedSpots,
  getUserStats: profilesApi.getUserStats,
  
  // Spot interactions
  getSpotPartners: spotPartnersApi.getSpotPartners,
  getSpotVisits: spotVisitsApi.getSpotVisits,
  markAsVisited: spotVisitsApi.markAsVisited,
  toggleSaveSpot: spotSavesApi.toggleSaveSpot,
  checkIfSaved: spotSavesApi.checkIfSaved,
  
  // User groups
  getUserGroups: userGroupsApi.getUserGroups,
  
  // Water quality
  ...waterQualityApi,
  
  // Reviews
  ...reviewsApi,
  
  // Groups
  ...groupsApi,
  
  // Users
  ...usersApi,
  
  // Partners
  ...partnersApi,
  
  // Feedback
  ...feedbackApi,
  
  // Expose the API client for direct queries
  apiClient
};

// Export individual APIs
export { 
  swimSpotsApi, 
  waterQualityApi, 
  reviewsApi, 
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

// Export types
export type { BlogArticle } from './blogPosts';
export type { UserProfile, UserStats } from './profiles';
export type { City } from './cities';
