
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Loader2,
  Users,
  Plus,
  MapPin,
  Phone,
  ExternalLink
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { SwimSpot } from "@/types";
import { toast } from "sonner";

const SwimSpotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: swimSpot, isLoading, error } = useQuery({
    queryKey: ['swimSpot', id],
    queryFn: () => api.getSwimSpotById(id!),
  });

  const { data: visitData } = useQuery({
    queryKey: ['spotVisits', id],
    queryFn: () => api.getSpotVisits(id!),
    enabled: !!id,
  });

  const { data: isSaved } = useQuery({
    queryKey: ['spotSaved', id],
    queryFn: () => api.checkIfSaved(id!),
    enabled: !!id,
  });

  const { data: partners = [] } = useQuery({
    queryKey: ['spotPartners', id],
    queryFn: () => api.getSpotPartners(id!),
    enabled: !!id,
  });

  const { data: groups = [] } = useQuery({
    queryKey: ['userGroups'],
    queryFn: api.getUserGroups,
  });

  const saveMutation = useMutation({
    mutationFn: () => api.toggleSaveSpot(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spotSaved', id] });
      toast.success(isSaved ? "Removed from saved spots" : "Added to saved spots");
    },
    onError: () => {
      toast.error("Please sign in to save spots");
    }
  });

  const visitMutation = useMutation({
    mutationFn: () => api.markAsVisited(id!),
    onSuccess: (wasRecorded) => {
      queryClient.invalidateQueries({ queryKey: ['spotVisits', id] });
      if (wasRecorded) {
        toast.success("Visit recorded!");
      } else {
        toast.info("You've already visited this spot recently (within the last hour)");
      }
    },
    onError: () => {
      toast.error("Please sign in to record visits");
    }
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load swim spot details");
      navigate("/");
    }
  }, [error, navigate]);

  const handleSave = () => {
    saveMutation.mutate();
  };

  const handleMarkVisited = () => {
    visitMutation.mutate();
  };

  const handleReport = () => {
    toast("Report functionality will be implemented soon");
  };

  // Generate back to map URL with preserved coordinates
  const getBackToMapUrl = () => {
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const zoom = searchParams.get('zoom');
    
    if (lat && lng && zoom) {
      return `/?lat=${lat}&lng=${lng}&zoom=${zoom}`;
    }
    return "/";
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
        
        {/* Back button - Now uses preserved coordinates */}
        <div className="absolute top-4 left-4">
          <Link 
            to={getBackToMapUrl()}
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
                
                {/* Stats - Updated with saves and visits */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm">
                    <Plus className="h-4 w-4" />
                    <span>{visitData?.count || 0} visits</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Bookmark className="h-4 w-4" />
                    <span>Saved by many</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSave}
                  disabled={saveMutation.isPending}
                  className={`rounded-full border-white bg-black/20 backdrop-blur-sm ${
                    isSaved ? "text-swimspot-burnt-coral" : "text-white"
                  }`}
                >
                  <Bookmark
                    className="h-5 w-5"
                    fill={isSaved ? "currentColor" : "none"}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleMarkVisited}
                  disabled={visitMutation.isPending}
                  className="rounded-full border-white bg-black/20 backdrop-blur-sm text-white"
                >
                  <Plus className="h-5 w-5" />
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
                <TabsTrigger value="community" className="flex-1">Community</TabsTrigger>
                <TabsTrigger value="groups" className="flex-1">Groups</TabsTrigger>
                <TabsTrigger value="partners" className="flex-1">Partners</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-4">About This Spot</h2>
                  <p className="text-gray-700 mb-6">{swimSpot.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-swimspot-blue-mist/50 rounded-xl p-4">
                      <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
                        <Droplet className="h-5 w-5 mr-2" />
                        Water Info
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium">{swimSpot.water_type}</span>
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
                          <span>Food & Drinks:</span>
                          <span className="font-medium">{swimSpot.facilities.food_drinks ? 'Available nearby' : 'Not available'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Temperature and Current added here */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-swimspot-blue-mist/50 rounded-xl p-4">
                      <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
                        <Thermometer className="h-5 w-5 mr-2" />
                        Temperature
                      </h3>
                      <p className="text-gray-700">
                        {swimSpot.current_temperature ? `${swimSpot.current_temperature}°C` : 'Not available'}
                      </p>
                    </div>
                    
                    <div className="bg-swimspot-drift-sand rounded-xl p-4">
                      <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
                        <Waves className="h-5 w-5 mr-2" />
                        Current
                      </h3>
                      <p className="text-gray-700">
                        {swimSpot.current || 'Not available'}
                      </p>
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
              
              <TabsContent value="community" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Community Activity</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                    <div className="bg-swimspot-drift-sand/50 rounded-xl p-4">
                      <h3 className="font-medium text-swimspot-blue-green mb-3 flex items-center">
                        <Plus className="h-5 w-5 mr-2" />
                        Recent Visitors ({visitData?.count || 0})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {visitData?.recentVisitors.slice(0, 6).map((visit, index) => (
                          <Avatar key={index} className="h-8 w-8">
                            <AvatarImage src={visit.profiles?.avatar_url} />
                            <AvatarFallback className="bg-swimspot-blue-green text-white text-xs">
                              {(visit.profiles?.username || visit.profiles?.full_name || 'U').charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {(visitData?.count || 0) > 6 && (
                          <div className="h-8 w-8 rounded-full bg-swimspot-drift-sand flex items-center justify-center text-xs text-swimspot-blue-green">
                            +{(visitData?.count || 0) - 6}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="groups" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Swim Groups</h2>
                  
                  {groups.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {groups.slice(0, 4).map((group) => (
                        <Link key={group.id} to={`/groups`}>
                          <div className="bg-swimspot-drift-sand/50 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 bg-swimspot-blue-green rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-swimspot-blue-green mb-1">
                                  {group.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {group.location}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-8 text-gray-500">
                      <div className="text-center">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p>No swim groups found for this area.</p>
                        <Link to="/groups">
                          <Button className="mt-4 bg-swimspot-blue-green hover:bg-swimspot-blue-green/90">
                            Find Groups
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="partners" className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-2xl text-swimspot-blue-green mb-6">Local Partners</h2>
                  
                  {partners.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {partners.map((partner) => (
                        <div key={partner.id} className="bg-swimspot-drift-sand/50 rounded-xl p-4">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 bg-swimspot-blue-green rounded-lg flex items-center justify-center">
                              <MapPin className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-swimspot-blue-green mb-1">
                                {partner.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2 capitalize">{partner.type}</p>
                              {partner.description && (
                                <p className="text-xs text-gray-500 mb-2">{partner.description}</p>
                              )}
                              <div className="flex items-center gap-2">
                                {partner.phone && (
                                  <Phone className="h-3 w-3 text-gray-400" />
                                )}
                                {partner.website && (
                                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3 text-swimspot-blue-green hover:text-swimspot-blue-green/80" />
                                  </a>
                                )}
                                {partner.distance_meters && (
                                  <span className="text-xs text-gray-500">
                                    {Math.round(partner.distance_meters)}m away
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-8 text-gray-500">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p>No local partners found for this spot.</p>
                      </div>
                    </div>
                  )}
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
