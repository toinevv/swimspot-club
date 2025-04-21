
// This file contains mock API functions that would typically connect to Supabase
// In the future, these would be replaced with actual Supabase client calls

import { SwimSpot, User, Review, SavedSpot, Group, UserGroup, WaterQualityData } from '@/types';

// Mock data - this would come from Supabase
const mockSwimSpots: SwimSpot[] = [
  {
    id: 1,
    name: "Amstel River Oasis",
    description: "A peaceful swimming spot along the Amstel with clear waters and grassy banks perfect for picnics and sunbathing. This area features a gentle slope into the water making it ideal for families with children and those looking for a relaxing swim experience in natural surroundings.",
    summary: "Peaceful river swimming spot with clear waters and grassy banks, ideal for families and picnics.",
    image_url: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    water_type: "River",
    location: {
      latitude: 52.345,
      longitude: 4.912,
      address: "Amstelpark, 1083 Amsterdam"
    },
    tags: ["Family-friendly", "Picnic Area", "Shallow Entry", "Peaceful"],
    water_quality: "Excellent",
    current_temperature: 19,
    current: "Mild",
    visibility: "public",
    created_at: "2023-01-15T12:00:00Z",
    updated_at: "2023-07-01T10:30:00Z",
    facilities: {
      changing_rooms: true,
      restrooms: true,
      lifeguard: false,
      food_drinks: true
    },
    best_times: {
      season: "Summer",
      time_of_day: "Morning",
      weather: "Sunny",
      water_condition: "Calm"
    }
  },
  {
    id: 2,
    name: "Nieuwe Meer Beach",
    description: "Popular lake beach with sandy shores and beautiful sunset views. This family-friendly location features designated swimming areas with both shallow and deeper sections. The surrounding park offers plenty of shade and facilities, making it perfect for a full day of water activities.",
    summary: "Popular sandy lake beach with sunset views and designated swimming areas for all ages.",
    image_url: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
    water_type: "Lake",
    location: {
      latitude: 52.338,
      longitude: 4.828,
      address: "Nieuwe Meer, Amsterdam"
    },
    tags: ["Sandy Beach", "Sunset Views", "Deep Water", "Family-friendly"],
    water_quality: "Good",
    current_temperature: 21,
    current: "None",
    visibility: "public",
    created_at: "2023-02-20T14:15:00Z",
    updated_at: "2023-07-05T16:45:00Z",
    facilities: {
      changing_rooms: true,
      restrooms: true,
      lifeguard: true,
      food_drinks: true
    },
    best_times: {
      season: "Late Summer",
      time_of_day: "Late Afternoon",
      weather: "Sunny",
      water_condition: "Calm"
    }
  },
  {
    id: 3,
    name: "Hidden Canal Gem",
    description: "A lesser-known urban swimming spot in a clean canal section with easy access and historic surroundings. This unique swimming experience offers a chance to enjoy Amsterdam's canal culture in a safe environment. Special swimming ladders provide easy entry and exit points.",
    summary: "Unique urban canal swimming experience in a historic area with special swimming ladders for access.",
    image_url: "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
    water_type: "Canal",
    location: {
      latitude: 52.381,
      longitude: 4.888,
      address: "Westelijke Eilanden, Amsterdam"
    },
    tags: ["Historic", "Urban", "Ladder Entry", "Cultural"],
    water_quality: "Good",
    current_temperature: 18,
    current: "Mild",
    visibility: "premium",
    created_at: "2023-03-10T09:30:00Z",
    updated_at: "2023-07-10T13:20:00Z",
    facilities: {
      changing_rooms: false,
      restrooms: true,
      lifeguard: false,
      food_drinks: true
    },
    best_times: {
      season: "Summer",
      time_of_day: "Midday",
      weather: "Warm",
      water_condition: "Monitored"
    }
  },
  {
    id: 4,
    name: "Sloterplas Shores",
    description: "Sloterplas is one of Amsterdam's largest lakes with several swimming areas. This particular shore features shallow waters ideal for families with small children. The adjacent park has playgrounds and picnic facilities, making it a perfect day trip destination.",
    summary: "Family-friendly lake shore with shallow waters and nearby playgrounds - perfect for children.",
    image_url: "https://source.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    water_type: "Lake",
    location: {
      latitude: 52.367,
      longitude: 4.806,
      address: "Sloterplas, Amsterdam"
    },
    tags: ["Family-friendly", "Shallow Waters", "Playground", "Park"],
    water_quality: "Moderate",
    current_temperature: 20,
    current: "None",
    visibility: "public",
    created_at: "2023-03-25T11:45:00Z",
    updated_at: "2023-07-12T14:30:00Z",
    facilities: {
      changing_rooms: true,
      restrooms: true,
      lifeguard: true,
      food_drinks: true
    },
    best_times: {
      season: "Summer",
      time_of_day: "Morning",
      weather: "Any",
      water_condition: "Monitored"
    }
  },
  {
    id: 5,
    name: "Erasmuspark Pond",
    description: "A serene swimming pond tucked away in Erasmuspark. This natural swimming spot offers a peaceful retreat from the city with its lush surroundings and diverse wildlife. The water is monitored regularly for quality and the secluded nature makes it a favorite among locals.",
    summary: "Serene natural pond in a lush park setting, perfect for peaceful swims among wildlife.",
    image_url: "https://source.unsplash.com/photo-1487252665478-49b61b47f302",
    water_type: "Pond",
    location: {
      latitude: 52.371,
      longitude: 4.856,
      address: "Erasmuspark, Amsterdam"
    },
    tags: ["Secluded", "Natural", "Bird Watching", "Peaceful"],
    water_quality: "Good",
    current_temperature: 19,
    current: "None",
    visibility: "premium",
    created_at: "2023-04-05T10:20:00Z",
    updated_at: "2023-07-15T12:15:00Z",
    facilities: {
      changing_rooms: false,
      restrooms: true,
      lifeguard: false,
      food_drinks: false
    },
    best_times: {
      season: "Late Spring",
      time_of_day: "Early Morning",
      weather: "Clear",
      water_condition: "Still"
    }
  }
];

// Mock API service functions
export const api = {
  // Swim Spots
  async getSwimSpots(filters?: any): Promise<SwimSpot[]> {
    // In real implementation, this would query Supabase with filters
    let spots = [...mockSwimSpots];
    
    if (filters) {
      // Apply filters (water type, quality, etc.)
      if (filters.waterType) {
        spots = spots.filter(spot => spot.water_type === filters.waterType);
      }
      
      if (filters.quality) {
        spots = spots.filter(spot => spot.water_quality === filters.quality);
      }
      
      if (filters.isPremium !== undefined) {
        spots = spots.filter(spot => 
          filters.isPremium ? spot.visibility === 'premium' : spot.visibility === 'public'
        );
      }
      
      // Add more filters as needed
    }
    
    return Promise.resolve(spots);
  },
  
  async getSwimSpotById(id: number): Promise<SwimSpot | null> {
    const spot = mockSwimSpots.find(spot => spot.id === id);
    return Promise.resolve(spot || null);
  },
  
  async getSwimSpotsByIds(ids: number[]): Promise<SwimSpot[]> {
    const spots = mockSwimSpots.filter(spot => ids.includes(spot.id));
    return Promise.resolve(spots);
  },
  
  async getNearbySpotsById(id: number, limit: number = 3): Promise<SwimSpot[]> {
    // In a real implementation, this would query spots by geographic proximity
    // For now, we'll just return other spots
    const otherSpots = mockSwimSpots.filter(spot => spot.id !== id);
    return Promise.resolve(otherSpots.slice(0, limit));
  },
  
  // Quality Data
  async getWaterQualityHistory(spotId: number): Promise<WaterQualityData[]> {
    // Mock water quality history - would be fetched from Supabase
    const mockHistory: WaterQualityData[] = [
      {
        id: 1,
        swim_spot_id: spotId,
        date: "2023-07-15T10:30:00Z",
        quality: "Excellent",
        temperature: 21,
        ph_level: 7.2,
        bacteria_level: 5,
        clarity: 90,
        notes: "Ideal swimming conditions"
      },
      // Add more historical data points
    ];
    
    return Promise.resolve(mockHistory);
  },
  
  // Reviews
  async getReviewsForSpot(spotId: number): Promise<Review[]> {
    // Mock reviews - would be fetched from Supabase
    const mockReviews: Review[] = [
      {
        id: 1,
        user_id: "user-1",
        swim_spot_id: spotId,
        rating: 5,
        comment: "Beautiful spot with clean water. The picnic area is perfect for spending the whole day!",
        created_at: "2023-07-15T14:30:00Z",
        updated_at: "2023-07-15T14:30:00Z",
        helpful_count: 12
      },
      {
        id: 2,
        user_id: "user-2",
        swim_spot_id: spotId,
        rating: 4,
        comment: "Really enjoyed swimming here. The water quality is excellent, though it can get crowded on weekends.",
        created_at: "2023-08-03T10:15:00Z",
        updated_at: "2023-08-03T10:15:00Z",
        helpful_count: 8
      }
    ];
    
    return Promise.resolve(mockReviews);
  },
  
  // Groups
  async getGroups(filters?: any): Promise<Group[]> {
    // Mock groups - would be fetched from Supabase
    const mockGroups: Group[] = [
      {
        id: 1,
        name: "Amsterdam Morning Dippers",
        description: "Early morning swim group that meets for sunrise dips around Amsterdam. Perfect for early risers!",
        image_url: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
        location: "Amsterdam",
        type: "Public",
        preferred_spots: "Rivers, Lakes",
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-07-20T11:30:00Z",
        is_premium: false
      },
      {
        id: 2,
        name: "Wild Swimming Club",
        description: "Exploring natural swimming spots throughout the Netherlands, from hidden lakes to pristine rivers.",
        image_url: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
        location: "Noord-Holland",
        type: "Private",
        preferred_spots: "Natural Waters",
        created_at: "2023-02-15T14:20:00Z",
        updated_at: "2023-07-25T16:45:00Z",
        is_premium: true
      }
    ];
    
    return Promise.resolve(mockGroups);
  },
  
  async getUserGroups(userId: string): Promise<Group[]> {
    // Mock user groups - would be fetched from Supabase
    // In real implementation, would join usergroups and groups tables
    const mockUserGroups: Group[] = [
      {
        id: 1,
        name: "Amsterdam Morning Dippers",
        description: "Early morning swim group that meets for sunrise dips around Amsterdam.",
        image_url: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
        location: "Amsterdam",
        type: "Public",
        preferred_spots: "Rivers, Lakes",
        created_at: "2023-01-10T09:00:00Z",
        updated_at: "2023-07-20T11:30:00Z",
        is_premium: false
      }
    ];
    
    return Promise.resolve(mockUserGroups);
  },
  
  // User related
  async getUserSavedSpots(userId: string): Promise<SavedSpot[]> {
    // Mock saved spots - would be fetched from Supabase
    const mockSavedSpots: SavedSpot[] = [
      {
        id: 1,
        user_id: userId,
        swim_spot_id: 1,
        created_at: "2023-07-10T14:30:00Z",
        last_visited: "2023-07-18T11:20:00Z"
      },
      {
        id: 2,
        user_id: userId,
        swim_spot_id: 3,
        created_at: "2023-07-12T09:15:00Z",
        last_visited: "2023-07-15T10:30:00Z"
      }
    ];
    
    return Promise.resolve(mockSavedSpots);
  },
  
  async toggleSaveSpot(userId: string, spotId: number): Promise<boolean> {
    // In real implementation, this would toggle a saved spot in Supabase
    console.log(`Toggle save spot ${spotId} for user ${userId}`);
    return Promise.resolve(true);
  },
  
  async toggleLikeSpot(userId: string, spotId: number): Promise<boolean> {
    // In real implementation, this would toggle a liked spot in Supabase
    console.log(`Toggle like spot ${spotId} for user ${userId}`);
    return Promise.resolve(true);
  }
};
