
import { swimSpotsApi } from './swimSpots';
import { waterQualityApi } from './waterQuality';
import { reviewsApi } from './reviews';
import { groupsApi } from './groups';
import { usersApi } from './users';
import { blogPostsApi } from './blogPosts';

export const api = {
  ...swimSpotsApi,
  ...waterQualityApi,
  ...reviewsApi,
  ...groupsApi,
  ...usersApi,
  ...blogPostsApi
};

export { swimSpotsApi, waterQualityApi, reviewsApi, groupsApi, usersApi, blogPostsApi };
