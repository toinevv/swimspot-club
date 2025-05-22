
import { Button } from "@/components/ui/button";

const CommunityBanner = () => {
  return (
    <section className="py-20 bg-swimspot-blue-green text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Join Our Swimming Community</h2>
          <p className="text-lg text-white/80 mb-8">
            Connect with fellow swimmers, find new spots, and enjoy exclusive benefits as part of our growing community.
          </p>
          <Button 
            size="lg" 
            className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90 text-white font-medium"
          >
            Join The Community
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityBanner;
