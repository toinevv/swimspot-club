
export type SwimSpot = {
  id: number;
  name: string;
  image: string;
  visibility: 'public' | 'premium';
  tags: string[];
  description: string;
};

export const featuredSpots: SwimSpot[] = [
  {
    id: 1,
    name: "Amstel River Oasis",
    image: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    visibility: "public",
    tags: ["River", "Family-friendly", "Picnic Area"],
    description: "A peaceful swimming spot along the Amstel with clear waters and grassy banks perfect for picnics and sunbathing."
  },
  {
    id: 2,
    name: "Nieuwe Meer Beach",
    image: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
    visibility: "premium",
    tags: ["Lake", "Sandy Beach", "Sunset Views"],
    description: "Popular lake beach with sandy shores and beautiful sunset views. Family-friendly with designated swimming areas."
  },
  {
    id: 3,
    name: "Hidden Canal Gem",
    image: "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
    visibility: "public",
    tags: ["Canal", "Historic", "Urban"],
    description: "A lesser-known urban swimming spot in a clean canal section with easy access and historic surroundings."
  }
];
