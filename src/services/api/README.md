# API Services Documentation

## Overview
This directory contains all backend integration logic for the SwimSpot application.

## Core Principles

### 1. Single Source of Truth
- All types are defined in `/src/types/entities.ts`
- API functions return data that matches these unified types
- Never create duplicate type definitions

### 2. Consistent Error Handling
- All API functions should handle errors gracefully
- Use `withErrorHandling` wrapper for automatic error logging
- Always provide meaningful error messages

### 3. Data Mapping
- Raw database responses are mapped to frontend types in `mappers.ts`
- Never use raw Supabase types directly in React components
- Mapping happens at the API layer, not in components

### 4. React Query Integration
- Use utility functions from `queryHelpers.ts`
- Follow consistent query key patterns
- Leverage `defaultQueryOptions` for consistent behavior

## File Structure

```
api/
├── client.ts           # Supabase client configuration
├── index.ts           # Unified API exports (main interface)
├── mappers.ts         # Data transformation functions
├── queryHelpers.ts    # React Query utilities
├── utils.ts          # Legacy utilities (to be migrated)
└── domains/          # Domain-specific API modules
    ├── swimSpots.ts
    ├── profiles.ts
    ├── groups.ts
    └── cities.ts
```

## Usage Examples

### Creating a New API Function

```typescript
// 1. In domains/swimSpots.ts
export const searchSwimSpots = async (query: string): Promise<SwimSpot[]> => {
  const { data, error } = await apiClient.supabase
    .from('swim_spots')
    .select('*')
    .ilike('name', `%${query}%`);

  if (error) {
    console.error('Error searching swim spots:', error);
    return [];
  }

  return data.map(mapRawSpotToSwimSpot);
};

// 2. Export in index.ts
export const api = {
  // ... existing functions
  searchSwimSpots: swimSpotsApi.searchSwimSpots,
};

// 3. Use in component
const { data: results } = useQuery({
  queryKey: ['swimSpots', 'search', query],
  queryFn: createQueryFn(api.searchSwimSpots),
  enabled: !!query
});
```

### Using React Query Helpers

```typescript
// For functions that take parameters
const { data: spot } = useQuery({
  queryKey: queryKeys.swimSpot(id),
  queryFn: createQueryFn(api.getSwimSpotById),
  enabled: !!id
});

// For functions with no parameters
const { data: spots } = useQuery({
  queryKey: queryKeys.swimSpots,
  queryFn: createSimpleQueryFn(api.getAllSwimSpots)
});

// For mutations
const mutation = useMutation({
  mutationFn: createMutationFn(
    api.toggleSaveSpot,
    'Spot saved successfully!',
    'Failed to save spot'
  )
});
```

## Best Practices

### API Function Design
```typescript
// ✅ Good: Clear signature, proper error handling
export const getSwimSpotById = async (id: string): Promise<SwimSpot> => {
  const { data, error } = await apiClient.supabase
    .from('swim_spots')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching swim spot:', error);
    throw error;
  }

  return mapRawSpotToSwimSpot(data);
};

// ❌ Bad: No error handling, unclear return type
export const getSpot = async (id) => {
  const { data } = await supabase.from('swim_spots').select('*').eq('id', id);
  return data;
};
```

### Data Mapping
```typescript
// ✅ Good: Explicit mapping with defaults
export const mapRawSpotToSwimSpot = (rawSpot: any): SwimSpot => {
  return {
    id: rawSpot.id,
    name: rawSpot.name,
    description: rawSpot.description || '',
    // ... all required fields with sensible defaults
  };
};

// ❌ Bad: Direct return of raw data
export const getSpot = async (id: string) => {
  const { data } = await supabase.from('swim_spots').select('*');
  return data; // Raw Supabase types leak to frontend
};
```

### Query Key Management
```typescript
// ✅ Good: Use predefined query keys
import { queryKeys } from './queryHelpers';

useQuery({
  queryKey: queryKeys.swimSpot(id),
  queryFn: createQueryFn(api.getSwimSpotById)
});

// ❌ Bad: Manual query keys
useQuery({
  queryKey: ['spot', id], // Inconsistent, error-prone
  queryFn: () => api.getSwimSpotById(id)
});
```

## Migration Guide

### From Old Pattern to New Pattern

```typescript
// Old pattern (before refactor)
const { data } = useQuery(['spots'], () => 
  supabase.from('swim_spots').select('*')
);

// New pattern (after refactor)
const { data } = useQuery({
  queryKey: queryKeys.swimSpots,
  queryFn: createSimpleQueryFn(api.getAllSwimSpots)
});
```

## Testing Considerations

- API functions should be easily testable in isolation
- Mock the `apiClient.supabase` for unit tests
- Test both success and error scenarios
- Verify that mappers transform data correctly

## Performance Notes

- Use `defaultQueryOptions` for consistent caching behavior
- Consider pagination for large datasets
- Implement proper loading and error states
- Use React Query's built-in optimistic updates where appropriate
