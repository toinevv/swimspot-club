
export interface CityData {
  name: string;
  displayName: string;
  description: string;
  coordinates?: [number, number];
}

export const cityDatabase: Record<string, CityData> = {
  amsterdam: {
    name: 'amsterdam',
    displayName: 'Amsterdam',
    description: 'Discover the best wild swimming locations in Amsterdam. Find hidden canals, lakes, and urban swim spots reviewed by the SwimSpot community.',
    coordinates: [4.9041, 52.3676]
  },
  utrecht: {
    name: 'utrecht',
    displayName: 'Utrecht',
    description: 'Explore wild swimming spots in Utrecht. From peaceful canals to scenic lakes, find the perfect place to swim in and around Utrecht.',
    coordinates: [5.1214, 52.0907]
  },
  rotterdam: {
    name: 'rotterdam',
    displayName: 'Rotterdam',
    description: 'Find wild swimming locations in Rotterdam. Discover urban swim spots, harbors, and nearby natural swimming areas.',
    coordinates: [4.4777, 51.9244]
  },
  'den-haag': {
    name: 'den-haag',
    displayName: 'Den Haag',
    description: 'Explore swimming spots in Den Haag (The Hague). From coastal areas to city canals, find your perfect swim location.',
    coordinates: [4.3007, 52.0705]
  },
  eindhoven: {
    name: 'eindhoven',
    displayName: 'Eindhoven',
    description: 'Discover wild swimming locations in Eindhoven. Find lakes, canals, and natural swimming spots in and around the city.',
    coordinates: [5.4697, 51.4416]
  }
};

export const getCityData = (citySlug: string | undefined): CityData | null => {
  if (!citySlug) return null;
  const normalizedSlug = citySlug.toLowerCase().replace(/\s+/g, '-');
  return cityDatabase[normalizedSlug] || null;
};

export const formatCityName = (citySlug: string): string => {
  return citySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
