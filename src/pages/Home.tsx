
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplet, Map, Users } from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://source.unsplash.com/photo-1500375592092-40eb2168fd21')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-swimspot-blue-green/80 to-transparent" />
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 max-w-3xl">
            Discover Amsterdam's Hidden Natural Swimming Spots
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
            Find pristine waters across the city, curated by local experts and swimming enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white font-medium"
            >
              <Link to="/map">
                Explore Swim Map
                <Map className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/groups">
                Join a Swim Group
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-swimspot-blue-green mb-16">How SwimSpot Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-swimspot-blue-mist p-6 rounded-2xl mb-6">
                <Map className="h-12 w-12 text-swimspot-blue-green" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-swimspot-blue-green">Discover Swim Spots</h3>
              <p className="text-gray-600">
                Explore our curated map of Amsterdam's most beautiful swimming locations.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-swimspot-blue-mist p-6 rounded-2xl mb-6">
                <Droplet className="h-12 w-12 text-swimspot-blue-green" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-swimspot-blue-green">Check Water Quality</h3>
              <p className="text-gray-600">
                Real-time water quality data and conditions for a safe swimming experience.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-swimspot-blue-mist p-6 rounded-2xl mb-6">
                <Users className="h-12 w-12 text-swimspot-blue-green" />
              </div>
              <h3 className="font-serif text-xl mb-3 text-swimspot-blue-green">Join Swim Groups</h3>
              <p className="text-gray-600">
                Connect with other swimming enthusiasts and join local swim groups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spots Section */}
      <section className="py-20 bg-swimspot-drift-sand">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-swimspot-blue-green mb-4 md:mb-0">Featured Swim Spots</h2>
            <Link 
              to="/map" 
              className="flex items-center text-swimspot-burnt-coral hover:text-swimspot-burnt-coral/80 transition-colors"
            >
              View All Spots
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpots.map((spot) => (
              <Link 
                key={spot.id} 
                to={`/spot/${spot.id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={spot.image} 
                    alt={spot.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-medium text-xl text-swimspot-blue-green">{spot.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      spot.quality === 'Excellent' 
                        ? 'bg-green-100 text-green-800' 
                        : spot.quality === 'Good' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {spot.quality}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {spot.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-swimspot-blue-mist text-swimspot-blue-green rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 line-clamp-2 mb-4">{spot.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-20 bg-swimspot-blue-green text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Upgrade to Premium Access</h2>
            <p className="text-lg text-white/80 mb-8">
              Get exclusive access to hidden swim gems, premium-only spots, and special community events.
            </p>
            <Button 
              size="lg" 
              className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white font-medium"
            >
              Join Premium
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const featuredSpots = [
  {
    id: 1,
    name: "Amstel River Oasis",
    image: "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
    quality: "Excellent",
    tags: ["River", "Family-friendly", "Picnic Area"],
    description: "A peaceful swimming spot along the Amstel with clear waters and grassy banks perfect for picnics and sunbathing."
  },
  {
    id: 2,
    name: "Nieuwe Meer Beach",
    image: "https://source.unsplash.com/photo-1506744038136-46273834b3fb",
    quality: "Good",
    tags: ["Lake", "Sandy Beach", "Sunset Views"],
    description: "Popular lake beach with sandy shores and beautiful sunset views. Family-friendly with designated swimming areas."
  },
  {
    id: 3,
    name: "Hidden Canal Gem",
    image: "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
    quality: "Good",
    tags: ["Canal", "Historic", "Urban"],
    description: "A lesser-known urban swimming spot in a clean canal section with easy access and historic surroundings."
  }
];

export default Home;
