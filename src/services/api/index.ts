
import { swimSpotsApi } from './swimSpots';
import { waterQualityApi } from './waterQuality';
import { reviewsApi } from './reviews';
import { groupsApi } from './groups';
import { usersApi } from './users';
import { blogPostsApi } from './blogPosts';
import { citiesApi } from './cities';
import { userInteractionsApi } from './userInteractions';
import { profilesApi } from './profiles';
import { partnersApi } from './partners';
import { apiClient } from './client';

export const api = {
  ...swimSpotsApi,
  ...waterQualityApi,
  ...reviewsApi,
  ...groupsApi,
  ...usersApi,
  ...blogPostsApi,
  ...citiesApi,
  ...userInteractionsApi,
  ...profilesApi,
  ...partnersApi,
  apiClient // Expose the API client for direct queries
};

export { 
  swimSpotsApi, 
  waterQualityApi, 
  reviewsApi, 
  groupsApi, 
  usersApi, 
  blogPostsApi, 
  citiesApi,
  userInteractionsApi,
  profilesApi,
  partnersApi,
  apiClient
};
