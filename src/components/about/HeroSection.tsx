
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, Users } from "lucide-react";

const HeroSection = () => {
  return (
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
          Discover Europe's Natural Swimming Spots
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
          Find pristine natural waters across Europe, curated by local experts and swimming enthusiasts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            asChild
            size="lg" 
            className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white font-medium"
          >
            <Link to="/">
              Explore Swim Map
              <Map className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-swimspot-blue-green"
          >
            <Link to="/groups">
              Join a Swim Group
              <Users className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
