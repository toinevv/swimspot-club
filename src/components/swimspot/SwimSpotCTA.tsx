
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SwimSpotCTAProps {
  userIsPremium?: boolean;
}

const SwimSpotCTA = ({ userIsPremium = false }: SwimSpotCTAProps) => {
  return (
    <div className="bg-gradient-to-br from-swimspot-blue-green to-swimspot-blue-green/90 rounded-3xl p-8 text-white text-center">
      <h3 className="font-serif text-2xl font-medium mb-3 tracking-tight">
        🏊‍♀️ Ready to Dive In?
      </h3>
      <p className="text-white/85 text-lg leading-relaxed mb-6 max-w-md mx-auto font-sans">
        Become part of Amsterdam's natural swimming movement and help us grow the community
      </p>
      
      <div className="space-y-4 max-w-sm mx-auto">
        {/* Primary Action - Community Movement */}
        <Link to="/groups">
          <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300">
            Join the Movement
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SwimSpotCTA;
