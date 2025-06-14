
import { Bookmark, Share, Eye, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwimSpotHeroProps {
  swimSpot: any;
  isSaved?: boolean;
  hasFeedback?: boolean;
  onSave: () => void;
  onMarkVisited: () => void;
  onFeedback: () => void;
  onShare: () => void;
  saveMutationPending: boolean;
  visitMutationPending: boolean;
  feedbackMutationPending: boolean;
  savedCount?: number;
  visitCount?: number;
}

const SwimSpotHero = ({
  swimSpot,
  isSaved,
  hasFeedback,
  onSave,
  onMarkVisited,
  onFeedback,
  onShare,
  saveMutationPending,
  visitMutationPending,
  feedbackMutationPending,
  savedCount = 0,
  visitCount = 0
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
          <div className="text-white space-y-3">
            <h1 className="font-serif font-medium leading-tight tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
              {swimSpot.name}
            </h1>
            
            {/* Engagement Stats - only showing visits now */}
            <div className="flex items-center gap-6 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Eye className="h-4 w-4 text-white/70" />
                  <div className="text-white font-semibold text-xl">{visitCount}</div>
                </div>
                <div className="text-white/70 text-sm font-medium">Visits</div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons - removed save button */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              onClick={onMarkVisited}
              disabled={visitMutationPending}
              className="h-11 w-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all duration-300"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <Eye className="h-5 w-5 text-white" />
            </Button>
            <Button
              size="icon"
              onClick={onFeedback}
              disabled={feedbackMutationPending}
              className={`h-11 w-11 rounded-full backdrop-blur-md border transition-all duration-300 ${
                hasFeedback 
                  ? "bg-orange-500/80 border-orange-400/50 hover:bg-orange-500/90" 
                  : "bg-white/15 border-white/20 hover:bg-white/25"
              }`}
              style={{ backdropFilter: 'blur(12px)' }}
              title={hasFeedback ? "Feedback submitted" : "Report an issue"}
            >
              <Flag 
                className={`h-5 w-5 ${hasFeedback ? "text-white" : "text-white"}`}
                fill={hasFeedback ? "currentColor" : "none"}
              />
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
