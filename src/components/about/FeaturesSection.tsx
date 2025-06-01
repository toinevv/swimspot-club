
import { Map, Droplet, Users } from "lucide-react";

const FeaturesSection = () => {
  return (
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
              Explore our curated map of Europe's most beautiful swimming locations.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-swimspot-blue-mist p-6 rounded-2xl mb-6">
              <Droplet className="h-12 w-12 text-swimspot-blue-green" />
            </div>
            <h3 className="font-serif text-xl mb-3 text-swimspot-blue-green">Find Hidden Gems</h3>
            <p className="text-gray-600">
              Discover secret swimming locations that only locals know about.
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
  );
};

export default FeaturesSection;
