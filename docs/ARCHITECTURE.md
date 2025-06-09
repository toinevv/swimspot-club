
# SwimSpot Architecture Guide

## 📁 Recommended Folder Structure

```
src/
├── types/                    # Central type definitions (SINGLE SOURCE OF TRUTH)
│   ├── entities.ts          # Core business entities
│   ├── api.ts              # API response types
│   └── README.md           # Type usage guidelines
│
├── services/api/            # Backend integration layer
│   ├── client.ts           # Supabase client configuration
│   ├── mappers.ts          # Raw data → Frontend type converters
│   ├── queryHelpers.ts     # React Query utilities
│   ├── utils.ts            # Legacy utilities (to be migrated)
│   ├── domains/            # Domain-specific API modules
│   │   ├── swimSpots.ts
│   │   ├── profiles.ts
│   │   ├── groups.ts
│   │   └── cities.ts
│   └── index.ts            # Unified API exports
│
├── components/              # UI components
│   ├── ui/                 # Shadcn base components
│   ├── layout/             # App layout components
│   ├── forms/              # Reusable form components
│   ├── map/                # Map-specific components
│   ├── profile/            # Profile-related components
│   └── shared/             # Shared business components
│
├── pages/                   # Route components (keep under 200 lines each)
├── hooks/                   # Custom React hooks
├── utils/                   # Pure utility functions
├── contexts/               # React contexts
└── docs/                   # Documentation
```

## 🎯 Naming Conventions

### Files
- **PascalCase**: React components (`SwimSpotCard.tsx`)
- **camelCase**: Utilities, hooks, services (`useMapboxToken.ts`)
- **kebab-case**: Non-component files when appropriate (`api-client.ts`)

### Types
- **PascalCase**: All interfaces and types (`SwimSpot`, `UserProfile`)
- **Descriptive suffixes**: `Data` for enriched data, `Raw` for API responses

### Functions
- **camelCase**: All functions (`getAllSwimSpots`)
- **Verb-first**: Action functions (`createQueryFn`, `mapRawSpotToSwimSpot`)

### API Functions
- **CRUD pattern**: `get`, `create`, `update`, `delete` + entity name
- **Specific actions**: `toggleSaveSpot`, `markAsVisited`

## 🔄 Data Flow Architecture

```
Database (Supabase)
    ↓
Raw API Response
    ↓
Mapper Function (in mappers.ts)
    ↓
Unified Frontend Type
    ↓
React Query Cache
    ↓
Component Props
```

## 📋 Refactoring Heuristics

### When to Split Components (200+ lines):
- **Extract by responsibility**: Forms, display logic, data fetching
- **Create sub-components**: Header, content, actions sections
- **Custom hooks**: Complex state logic or data fetching

### Example Split:
```tsx
// Before: ProfilePage.tsx (300 lines)
// After:
ProfilePage.tsx          (50 lines - layout & orchestration)
├── ProfileHeader.tsx    (30 lines)
├── ProfileStats.tsx     (40 lines)
├── ProfileTabs.tsx      (60 lines)
└── useProfileData.ts    (40 lines - custom hook)
```

### When to Extract Utilities:
- **Repeated logic**: 3+ identical code blocks
- **Complex transformations**: Data manipulation
- **Business rules**: Validation, calculations

## 🔧 Development Patterns

### API Integration Pattern:
```typescript
// 1. Define type in types/entities.ts
export interface SwimSpot { ... }

// 2. Create mapper in mappers.ts
export const mapRawSpotToSwimSpot = (raw: any): SwimSpot => { ... }

// 3. Create API function
export const getSwimSpotById = async (id: string): Promise<SwimSpot> => {
  const { data, error } = await supabase.from('swim_spots').select('*').eq('id', id).single();
  if (error) throw error;
  return mapRawSpotToSwimSpot(data);
}

// 4. Use in component with React Query
const { data: spot } = useQuery({
  queryKey: queryKeys.swimSpot(id),
  queryFn: createQueryFn(api.getSwimSpotById),
  ...defaultQueryOptions
});
```

### Component Pattern:
```typescript
// Good: Focused, single responsibility
interface SwimSpotCardProps {
  spot: SwimSpot;
  onSave?: (spotId: string) => void;
  showActions?: boolean;
}

export const SwimSpotCard = ({ spot, onSave, showActions = true }: SwimSpotCardProps) => {
  // < 50 lines of focused logic
};
```

## 📚 For New Contributors

### Getting Started Checklist:
1. **Read this guide** + `types/README.md`
2. **Understand the data flow**: Database → Mapper → Type → Component
3. **Use existing patterns**: Copy from similar components/APIs
4. **Add types first**: Define in `types/entities.ts` before coding
5. **Test locally**: Ensure TypeScript compiles and app runs

### Where to Find Things:
- **Types**: Always in `types/entities.ts`
- **API functions**: `services/api/index.ts` (exports) or domain-specific files
- **React Query helpers**: `services/api/queryHelpers.ts`
- **Data mappers**: `services/api/mappers.ts`
- **Reusable components**: `components/shared/`

### Adding New Features:
1. **Define types** in `types/entities.ts`
2. **Add API function** in appropriate domain file
3. **Create mapper** if raw data ≠ frontend type
4. **Build component** using existing patterns
5. **Add to unified API** in `services/api/index.ts`

### Common Pitfalls to Avoid:
- ❌ Creating types in multiple files
- ❌ Doing data mapping in components
- ❌ Writing API functions without proper error handling
- ❌ Components over 200 lines
- ❌ Using raw Supabase types in UI components

### Code Review Checklist:
- ✅ Types defined in central location
- ✅ Mappers used for data transformation
- ✅ Components focused and under 200 lines
- ✅ Proper error handling in API functions
- ✅ React Query patterns followed
- ✅ No duplicate type definitions
