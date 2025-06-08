
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface SwimSpotCTAProps {
  userIsPremium?: boolean;
}

const SwimSpotCTA = ({ userIsPremium = false }: SwimSpotCTAProps) => {
  if (userIsPremium) {
    // For existing premium members - different message
    return (
      <div className="bg-gradient-to-br from-swimspot-blue-green to-swimspot-blue-green/90 rounded-3xl p-8 text-white text-center">
        <h3 className="font-serif text-2xl font-medium mb-3 tracking-tight">
          🏊‍♀️ You're Part of the Community!
        </h3>
        <p className="text-white/85 text-lg leading-relaxed mb-6 max-w-md mx-auto font-sans">
          Enjoy exclusive access to premium spots and connect with fellow swimmers
        </p>
        <Button className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300">
          Explore Premium Features
        </Button>
      </div>
    );
  }

  // For free users - focus on membership conversion
  return (
    <div className="bg-gradient-to-br from-swimspot-blue-green to-swimspot-blue-green/90 rounded-3xl p-8 text-white text-center relative overflow-hidden">
      {/* Premium badge/icon */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-10 w-10 bg-swimspot-burnt-coral rounded-full flex items-center justify-center">
          <Crown className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-serif text-2xl font-medium tracking-tight">
          Join Our Swimming Community
        </h3>
      </div>
      
      <p className="text-white/85 text-lg leading-relaxed mb-6 max-w-lg mx-auto font-sans">
        Get access to exclusive swimming spots, connect with experienced swimmers, and unlock premium features
      </p>
      
      {/* Premium benefits list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-swimspot-burnt-coral font-semibold mb-1">Exclusive Spots</div>
          <div className="text-white/80">Access hidden swimming locations</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-swimspot-burnt-coral font-semibold mb-1">Community Access</div>
          <div className="text-white/80">Connect with all swimmers</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="text-swimspot-burnt-coral font-semibold mb-1">Safety Features</div>
          <div className="text-white/80">Water conditions & safety tips</div>
        </div>
      </div>
      
      <div className="space-y-3 max-w-sm mx-auto">
        {/* Primary CTA - Premium Membership */}
        <Link to="/profile">
          <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-300">
            Become a Premium Member
          </Button>
        </Link>
        
        {/* Secondary - Learn More */}
        <Link to="/about" className="block">
          <Button variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 py-3 px-6 rounded-2xl font-medium transition-all duration-300">
            Learn More About Premium
          </Button>
        </Link>
      </div>
      
      {/* Small print */}
      <p className="text-white/60 text-xs mt-4">
        Join 500+ swimmers in Amsterdam's premier swimming community
      </p>
    </div>
  );
};

export default SwimSpotCTA;
