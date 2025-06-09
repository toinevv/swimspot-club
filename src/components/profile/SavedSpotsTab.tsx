
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Droplet } from "lucide-react";
import { Link } from "react-router-dom";
import type { SavedSpotData } from "@/types/entities";

interface SavedSpotsTabProps {
  savedSpots: SavedSpotData[];
  isLoading: boolean;
}

const SavedSpotsTab = ({ savedSpots, isLoading }: SavedSpotsTabProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (savedSpots.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No saved spots yet</h3>
          <p className="text-gray-500 mb-4">Start exploring and save your favorite swim spots!</p>
          <Link to="/">
            <Button className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
              Explore Spots
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {savedSpots.map((spot) => (
        <Link key={spot.id} to={`/spot/${spot.swim_spots.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${spot.swim_spots.image_url})` }}>
              <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{spot.swim_spots.name}</h3>
                  <div className="flex items-center text-sm opacity-90">
                    <Droplet className="h-4 w-4 mr-1" />
                    {spot.swim_spots.water_type}
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-2">{spot.swim_spots.address}</p>
              <div className="flex gap-1 flex-wrap">
                {spot.swim_spots.tags?.slice(0, 3).map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SavedSpotsTab;
