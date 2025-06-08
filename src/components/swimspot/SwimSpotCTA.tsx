
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SwimSpotCTAProps {
  userIsPremium?: boolean;
}

const SwimSpotCTA = ({ userIsPremium = false }: SwimSpotCTAProps) => {
  return (
    <div className="bg-gradient-to-br from-swimspot-blue-green to-swimspot-blue-green/90 rounded-3xl p-8 text-white text-center">
      <h3 className="font-serif text-2xl font-medium mb-3">
        🏊‍♀️ Ready to Dive In?
      </h3>
      <p className="text-white/85 text-lg leading-relaxed mb-6 max-w-md mx-auto">
        Connect with fellow swimmers and discover Amsterdam's hidden gems
      </p>
      
      <div className="space-y-4 max-w-sm mx-auto">
        {/* Primary Action */}
        <Link to="/groups">
          <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white font-semibold py-4 px-6 rounded-2xl">
            Join Swimming Groups
          </Button>
        </Link>
        
        {/* Community Join */}
        {!userIsPremium && (
          <>
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-white/60 text-sm">COMMUNITY</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>
            
            <p className="text-white/70 text-sm mb-3">
              Become part of our swimming community
            </p>
            
            <Link to="/profile">
              <Button variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 py-4 px-6 rounded-2xl">
                Join SwimSpot Community
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SwimSpotCTA;
