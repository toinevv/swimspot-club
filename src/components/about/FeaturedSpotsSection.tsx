
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type SwimSpot = {
  id: number;
  name: string;
  image: string;
  visibility: 'public' | 'premium';
  tags: string[];
  description: string;
};

interface FeaturedSpotsSectionProps {
  spots: SwimSpot[];
}

const FeaturedSpotsSection = ({ spots }: FeaturedSpotsSectionProps) => {
  return (
    <section className="py-20 bg-swimspot-drift-sand">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-swimspot-blue-green mb-4 md:mb-0">Featured Swim Spots</h2>
          <Link 
            to="/" 
            className="flex items-center text-swimspot-burnt-coral hover:text-swimspot-burnt-coral/80 transition-colors"
          >
            View All Spots
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spots.map((spot) => (
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
                    spot.visibility === 'premium' 
                      ? 'bg-swimspot-burnt-coral/20 text-swimspot-burnt-coral' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {spot.visibility === 'premium' ? 'Premium' : 'Public'}
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
  );
};

export default FeaturedSpotsSection;
