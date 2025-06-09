
/**
 * Enhanced React Query utilities and helpers
 * Provides consistent patterns for API integration
 */

import { QueryFunction } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Creates a React Query function that extracts arguments from queryKey
 * @param apiFunction - The API function to wrap
 * @returns QueryFunction compatible with useQuery
 */
export function createQueryFn<TArgs extends readonly unknown[], TReturn>(
  apiFunction: (...args: TArgs) => Promise<TReturn>
): QueryFunction<TReturn, readonly [string, ...TArgs]> {
  return ({ queryKey }) => {
    const [, ...args] = queryKey;
    return apiFunction(...(args as TArgs));
  };
}

/**
 * Creates a React Query function for APIs that take no arguments
 * @param apiFunction - The API function to wrap
 * @returns QueryFunction compatible with useQuery
 */
export function createSimpleQueryFn<TReturn>(
  apiFunction: () => Promise<TReturn>
): QueryFunction<TReturn, readonly [string]> {
  return () => apiFunction();
}

/**
 * Creates a React Query function with optional arguments
 * @param apiFunction - The API function to wrap
 * @returns QueryFunction compatible with useQuery
 */
export function createOptionalQueryFn<TArg, TReturn>(
  apiFunction: (arg?: TArg) => Promise<TReturn>
): QueryFunction<TReturn, readonly [string] | readonly [string, TArg]> {
  return ({ queryKey }) => {
    const [, arg] = queryKey;
    return apiFunction(arg);
  };
}

/**
 * Wraps an API function with automatic error handling and logging
 * @param apiFunction - The API function to wrap
 * @param errorMessage - Custom error message to display
 * @returns Wrapped API function with error handling
 */
export function withErrorHandling<TArgs extends any[], TReturn>(
  apiFunction: (...args: TArgs) => Promise<TReturn>,
  errorMessage?: string
) {
  return async (...args: TArgs): Promise<TReturn> => {
    try {
      return await apiFunction(...args);
    } catch (error) {
      console.error('API Error:', error);
      const message = errorMessage || 'An error occurred while fetching data';
      toast.error(message);
      throw error;
    }
  };
}

/**
 * Creates a mutation function with automatic success/error handling
 * @param mutationFn - The mutation function
 * @param successMessage - Success message to display
 * @param errorMessage - Error message to display
 * @returns Wrapped mutation function
 */
export function createMutationFn<TArgs extends any[], TReturn>(
  mutationFn: (...args: TArgs) => Promise<TReturn>,
  successMessage?: string,
  errorMessage?: string
) {
  return async (...args: TArgs): Promise<TReturn> => {
    try {
      const result = await mutationFn(...args);
      if (successMessage) {
        toast.success(successMessage);
      }
      return result;
    } catch (error) {
      console.error('Mutation Error:', error);
      const message = errorMessage || 'An error occurred while updating data';
      toast.error(message);
      throw error;
    }
  };
}

/**
 * Default query options for consistent behavior across the app
 */
export const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

/**
 * Query keys factory for consistent cache key management
 */
export const queryKeys = {
  // Swim spots
  swimSpots: ['swimSpots'] as const,
  swimSpot: (id: string) => ['swimSpot', id] as const,
  swimSpotsByCity: (city: string) => ['swimSpots', 'city', city] as const,
  
  // User profile and data
  profile: ['profile'] as const,
  userStats: ['userStats'] as const,
  savedSpots: ['savedSpots'] as const,
  userGroups: ['userGroups'] as const,
  
  // Cities and locations
  cities: ['cities'] as const,
  city: (slug: string) => ['city', slug] as const,
  
  // Blog content
  blogPosts: ['blogPosts'] as const,
  blogPost: (slug: string) => ['blogPost', slug] as const,
  
  // Groups
  groups: ['groups'] as const,
  group: (id: string) => ['group', id] as const,
  
  // Spot interactions
  spotSaved: (id: string) => ['spotSaved', id] as const,
  spotVisits: (id: string) => ['spotVisits', id] as const,
  spotPartners: (id: string) => ['spotPartners', id] as const,
} as const;
