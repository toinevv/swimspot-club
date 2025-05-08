
import { swimSpotsApi } from './swimSpots';
import { waterQualityApi } from './waterQuality';
import { reviewsApi } from './reviews';
import { groupsApi } from './groups';
import { usersApi } from './users';

export const api = {
  ...swimSpotsApi,
  ...waterQualityApi,
  ...reviewsApi,
  ...groupsApi,
  ...usersApi
};

export { swimSpotsApi, waterQualityApi, reviewsApi, groupsApi, usersApi };
