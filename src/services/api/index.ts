
import { swimSpotsApi } from './swimSpots';
import { waterQualityApi } from './waterQuality';
import { reviewsApi } from './reviews';
import { groupsApi } from './groups';
import { usersApi } from './users';
import { blogPostsApi } from './blogPosts';
import { citiesApi } from './cities';
import { userInteractionsApi } from './userInteractions';
import { profilesApi } from './profiles';

export const api = {
  ...swimSpotsApi,
  ...waterQualityApi,
  ...reviewsApi,
  ...groupsApi,
  ...usersApi,
  ...blogPostsApi,
  ...citiesApi,
  ...userInteractionsApi,
  ...profilesApi
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
  profilesApi
};
