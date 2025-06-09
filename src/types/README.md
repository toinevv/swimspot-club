
# Types Documentation

## Overview
This directory contains the unified type definitions for the SwimSpot application.

## Structure

### `entities.ts`
Contains all core entity types that represent data structures in our application:

- **SwimSpot**: Main swim location entity
- **UserProfile**: User account and profile information
- **SavedSpotData**: Enriched saved spot data with related swim spot details
- **Group**: Swimming groups and communities
- **UserGroupData**: User membership in groups with group details
- **BlogArticle**: Blog posts and articles
- **City**: City/location data
- **Partner**: Business partners and services
- **SpotVisitData**: Visit tracking and statistics

## Usage Guidelines

### 1. Single Source of Truth
All types are defined in this directory and should be imported from here:

```typescript
import type { SwimSpot, UserProfile } from '@/services/api';
// or
import type { SwimSpot, UserProfile } from '@/types/entities';
```

### 2. API Consistency
All API functions should return data that matches these interfaces. If the raw database data differs from these types, use mapping functions in `/src/services/api/mappers.ts`.

### 3. Component Props
Components should use these types for their props to ensure consistency:

```typescript
interface SwimSpotCardProps {
  spot: SwimSpot;
  onSave?: () => void;
}
```

### 4. React Query Integration
Use the utility functions in `/src/services/api/utils.ts` for proper React Query integration:

```typescript
const { data: spots } = useQuery({
  queryKey: ['swimSpots'],
  queryFn: createSimpleQueryFn(api.getAllSwimSpots)
});
```

## Best Practices

1. **Never duplicate types** - Always import from this centralized location
2. **Keep types aligned with database schema** - Update types when database changes
3. **Use descriptive names** - Types should be self-documenting
4. **Add JSDoc comments** for complex types or business logic
5. **Version breaking changes** - Coordinate type changes with API and component updates

## Future Considerations

- Consider splitting into domain-specific files if this grows too large
- Add utility types for common patterns (e.g., `WithTimestamps<T>`)
- Consider using branded types for IDs to prevent mixing different entity IDs
