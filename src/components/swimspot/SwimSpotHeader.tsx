
import { Link } from "react-router-dom";
import { Map, Star } from "lucide-react";
import { SwimSpot } from "@/types";
import SwimSpotActions from "./SwimSpotActions";

interface SwimSpotHeaderProps {
  swimSpot: SwimSpot;
  getBackToMapUrl: () => string;
  visitData: { count: number; recentVisitors: any[] } | undefined;
  savedCount: number;
  isSaved: boolean | undefined;
  onSave: () => void;
  onMarkVisited: () => void;
  onReport: () => void;
  saveMutationPending: boolean;
  visitMutationPending: boolean;
}

const SwimSpotHeader = ({
  swimSpot,
  getBackToMapUrl,
  visitData,
  savedCount,
  isSaved,
  onSave,
  onMarkVisited,
  onReport,
  saveMutationPending,
  visitMutationPending
}: SwimSpotHeaderProps) => {
  return (
    <div className="relative h-[40vh] md:h-[50vh] bg-swimspot-blue-green">
      <img
        src={swimSpot.image_url}
        alt={swimSpot.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Link 
          to={getBackToMapUrl()}
          className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/40 transition-colors"
        >
          <Map className="h-4 w-4" />
          Back to Map
        </Link>
      </div>
      
      {/* Premium badge */}
      {swimSpot.visibility === "premium" && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-swimspot-burnt-coral text-white rounded-full text-sm font-medium flex items-center">
          <Star className="h-4 w-4 mr-1" />
          Premium Spot
        </div>
      )}
      
      {/* Title area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">{swimSpot.name}</h1>
              <div className="flex items-center flex-wrap gap-2 mb-2">
                {swimSpot.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm">
                  <span>{visitData?.count || 0} visits</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span>{savedCount} saves</span>
                </div>
              </div>
            </div>
            
            <SwimSpotActions
              isSaved={isSaved}
              onSave={onSave}
              onMarkVisited={onMarkVisited}
              onReport={onReport}
              saveMutationPending={saveMutationPending}
              visitMutationPending={visitMutationPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimSpotHeader;
