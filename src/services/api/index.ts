
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
  ...partnersApi
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
  partnersApi
};
