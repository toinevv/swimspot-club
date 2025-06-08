
import { MapPin, Bookmark, Plus, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwimSpotHeroProps {
  swimSpot: any;
  isSaved?: boolean;
  onSave: () => void;
  onMarkVisited: () => void;
  onShare: () => void;
  saveMutationPending: boolean;
  visitMutationPending: boolean;
}

const SwimSpotHero = ({
  swimSpot,
  isSaved,
  onSave,
  onMarkVisited,
  onShare,
  saveMutationPending,
  visitMutationPending
}: SwimSpotHeroProps) => {
  return (
    <div className="relative h-72 md:h-96 overflow-hidden">
      <img 
        src={swimSpot.image_url} 
        alt={swimSpot.name}
        className="w-full h-full object-cover contrast-105 saturate-95"
        style={{ filter: 'contrast(1.05) saturate(0.95)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      
      <div className="absolute bottom-8 left-6 right-6">
        <div className="flex justify-between items-end">
          <div className="text-white space-y-2">
            <h1 className="font-serif font-medium leading-tight tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              {swimSpot.name}
            </h1>
            <p className="text-white/85 flex items-center gap-2 text-lg font-sans">
              <MapPin className="h-4 w-4" />
              {swimSpot.city}, {swimSpot.country}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              onClick={onSave}
              disabled={saveMutationPending}
              className="h-11 w-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all duration-300"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <Bookmark 
                className="h-5 w-5 text-white" 
                fill={isSaved ? "currentColor" : "none"}
              />
            </Button>
            <Button
              size="icon"
              onClick={onMarkVisited}
              disabled={visitMutationPending}
              className="h-11 w-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all duration-300"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <Plus className="h-5 w-5 text-white" />
            </Button>
            <Button
              size="icon"
              onClick={onShare}
              className="h-11 w-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all duration-300"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <Share className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimSpotHero;
