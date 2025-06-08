
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
    <div className="relative h-[60vh] bg-swimspot-blue-green">
      <img
        src={swimSpot.image_url}
        alt={swimSpot.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Link 
          to={getBackToMapUrl()}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
        >
          <Map className="h-4 w-4" />
          Back to Map
        </Link>
      </div>
      
      {/* Premium badge */}
      {swimSpot.visibility === "premium" && (
        <div className="absolute top-6 right-6 px-3 py-1 bg-swimspot-burnt-coral text-white rounded-full text-sm font-medium flex items-center shadow-lg">
          <Star className="h-4 w-4 mr-1" />
          Premium Spot
        </div>
      )}
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex-1">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 leading-tight">{swimSpot.name}</h1>
              
              <div className="flex items-center flex-wrap gap-2 mb-4">
                {swimSpot.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg font-medium">{visitData?.count || 0} visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg font-medium">{savedCount} saves</span>
                </div>
              </div>
            </div>
            
            <div className="lg:ml-8">
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
    </div>
  );
};

export default SwimSpotHeader;
