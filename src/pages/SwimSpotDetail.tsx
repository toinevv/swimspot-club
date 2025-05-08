import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Bookmark,
  MessageSquare,
  Share,
  AlertTriangle,
  ThumbsUp,
  Droplet,
  Thermometer,
  Map,
  Calendar,
  Clock,
  Waves,
  Info,
  Star,
  Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { SwimSpot } from "@/types";
import { toast } from "sonner";

const SwimSpotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  
  const { data: swimSpot, isLoading, error } = useQuery({
    queryKey: ['swimSpot', id],
    queryFn: () => api.getSwimSpotById(id!),
  });
  
  const { data: nearbySpots = [] } = useQuery({
    queryKey: ['nearbySpots', id],
    queryFn: () => api.getNearbySpotsById(id!, 4),
    enabled: !!swimSpot,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load swim spot details");
      navigate("/");
    }
  }, [error, navigate]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleReport = () => {
    toast("Report functionality will be implemented soon");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-swimspot-blue-green" />
      </div>
    );
  }

  if (!swimSpot) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-swimspot-blue-green mb-2">Swim spot not found</h2>
          <p className="text-gray-600 mb-4">The swim spot you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/")} className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
            Back to Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      <div className="relative h-[40vh] md:h-[50vh] bg-swimspot-blue-green">
        <img
          src={swimSpot.image_url}
          alt={swimSpot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back button - Fixed to point to / instead of /map */}
        <div className="absolute top-4 left-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/40 transition-colors"
          >
            <Map className="h-4 w-4" />
            Back to Map
          </Link>
        </div>
        
        {/* Premium badge if applicable */}
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
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLike}
                  className={`rounded-full border-white bg-black/20 backdrop-blur-sm ${
                    liked ? "text-red-500" : "text-white"
                  }`}
                >
                  <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSave}
                  className={`rounded-full border-white bg-black/20 backdrop-blur-sm ${
                    saved ? "text-swimspot-burnt-coral" : "text-white"
                  }`}
                >
                  <Bookmark
                    className="h-5 w-5"
                    fill={saved ? "currentColor" : "none"}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white bg-black/20 backdrop-blur-sm text-white"
                >
                  <Share className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReport}
                  className="rounded-full border-white bg-black/20 backdrop-blur-sm text-white"
                >
                  <AlertTriangle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full bg-white mb-6">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                <TabsTrigger value="nearby" className="flex-1">Nearby</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-4">About This Spot</h2>
                  <p className="text-gray-700 mb-6">{swimSpot.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-swimspot-blue-mist/50 rounded-xl p-4">
                      <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
                        <Droplet className="h-5 w-5 mr-2" />
                        Water Type & Conditions
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium">{swimSpot.water_type}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Current Quality:</span>
                          <span className={`font-medium ${
                            swimSpot.water_quality === 'Excellent' 
                              ? 'text-green-600' 
                              : swimSpot.water_quality === 'Good' 
                              ? 'text-blue-600' 
                              : 'text-orange-600'
                          }`}>{swimSpot.water_quality}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Temperature:</span>
                          <span className="font-medium">{swimSpot.current_temperature}°C</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Current:</span>
                          <span className="font-medium">{swimSpot.current || 'Unknown'}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-swimspot-drift-sand rounded-xl p-4">
                      <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Facilities & Access
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex justify-between">
                          <span>Changing Rooms:</span>
                          <span className="font-medium">{swimSpot.facilities.changing_rooms ? 'Available' : 'Not available'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Restrooms:</span>
                          <span className="font-medium">{swimSpot.facilities.restrooms ? 'Available' : 'Not available'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Lifeguard:</span>
                          <span className="font-medium">{swimSpot.facilities.lifeguard ? 'Yes' : 'No'}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Food & Drinks:</span>
                          <span className="font-medium">{swimSpot.facilities.food_drinks ? 'Available nearby' : 'Not available'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-4">Best Times to Visit</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <Calendar className="h-6 w-6 text-swimspot-blue-green" />
                      </div>
                      <h4 className="font-medium text-swimspot-blue-green">Season</h4>
                      <p className="text-gray-600">{swimSpot.best_times.season}</p>
                    </div>
                    <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <Clock className="h-6 w-6 text-swimspot-blue-green" />
                      </div>
                      <h4 className="font-medium text-swimspot-blue-green">Time of Day</h4>
                      <p className="text-gray-600">{swimSpot.best_times.time_of_day}</p>
                    </div>
                    <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <Thermometer className="h-6 w-6 text-swimspot-blue-green" />
                      </div>
                      <h4 className="font-medium text-swimspot-blue-green">Weather</h4>
                      <p className="text-gray-600">{swimSpot.best_times.weather}</p>
                    </div>
                    <div className="bg-swimspot-drift-sand/50 p-4 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <Waves className="h-6 w-6 text-swimspot-blue-green" />
                      </div>
                      <h4 className="font-medium text-swimspot-blue-green">Conditions</h4>
                      <p className="text-gray-600">{swimSpot.best_times.water_condition}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl text-swimspot-blue-green">Reviews</h2>
                    <Button className="bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                      Write a Review
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Placeholder for reviews - will implement later */}
                    <div className="flex items-center justify-center p-8 text-gray-500">
                      <p>No reviews yet. Be the first to review this swim spot!</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nearby" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Nearby Swim Spots</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {nearbySpots.length > 0 ? (
                      nearbySpots.slice(0, 4).map((spot) => (
                        <Link 
                          key={spot.id} 
                          to={`/spot/${spot.id}`}
                          className="flex bg-swimspot-drift-sand/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="w-1/3">
                            <img 
                              src={spot.image_url} 
                              alt={spot.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-3">
                            <h3 className="font-medium text-swimspot-blue-green mb-1">{spot.name}</h3>
                            <div className="flex items-center text-xs text-gray-600 mb-1">
                              <Droplet className="h-3 w-3 mr-1" />
                              {spot.water_type}
                              <span className="mx-2">•</span>
                              <span className={`${
                                spot.water_quality === 'Excellent' 
                                  ? 'text-green-600' 
                                  : spot.water_quality === 'Good' 
                                  ? 'text-blue-600' 
                                  : 'text-orange-600'
                              }`}>{spot.water_quality}</span>
                            </div>
                            <p className="text-xs text-gray-500">Nearby</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-2 flex items-center justify-center p-8 text-gray-500">
                        <p>No nearby swim spots found.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="font-serif text-xl text-swimspot-blue-green mb-4">Location</h3>
              
              {/* Map placeholder */}
              <div className="h-48 bg-swimspot-blue-mist rounded-lg flex items-center justify-center mb-4">
                <p className="text-sm text-swimspot-blue-green">Map will be integrated here</p>
              </div>
              
              <p className="text-gray-700 mb-4">{swimSpot.location.address}</p>
              
              <Button className="w-full bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                <Map className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="font-serif text-xl text-swimspot-blue-green mb-4">Water Quality History</h3>
              
              {/* Chart placeholder */}
              <div className="h-48 bg-swimspot-blue-mist/30 rounded-lg flex items-center justify-center mb-4">
                <p className="text-sm text-swimspot-blue-green">Quality chart will be displayed here</p>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                Data from the past 90 days
              </div>
            </div>
            
            <div className="bg-swimspot-blue-green rounded-2xl p-6 shadow-sm text-white">
              <h3 className="font-serif text-xl mb-3">Start Swimming</h3>
              <p className="text-white/80 mb-4">Join a swim group at this location to meet fellow swimmers.</p>
              
              <Link to="/groups">
                <Button className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90">
                  Find Swim Groups
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimSpotDetail;
