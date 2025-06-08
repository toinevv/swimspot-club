import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Bookmark, Plus, Share, AlertTriangle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SwimSpotDetailsTab from "@/components/swimspot/SwimSpotDetailsTab";
import SwimSpotCommunityTab from "@/components/swimspot/SwimSpotCommunityTab";
import SwimSpotSidebar from "@/components/swimspot/SwimSpotSidebar";
import SEOHead from "@/components/seo/SEOHead";
import StructuredData from "@/components/seo/StructuredData";

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

  // Query for actual saved count from database
  const { data: savedCount = 0 } = useQuery({
    queryKey: ['spotSavedCount', id],
    queryFn: async () => {
      const { data } = await api.apiClient.supabase
        .from('swim_spot_saves')
        .select('id', { count: 'exact' })
        .eq('swim_spot_id', id);
      return data?.length || 0;
    },
    enabled: !!id,
  });

  const saveMutation = useMutation({
    mutationFn: () => api.toggleSaveSpot(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spotSaved', id] });
      queryClient.invalidateQueries({ queryKey: ['spotSavedCount', id] });
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

  const seoTitle = `${swimSpot.name} - Wild Swimming Spot`;
  const seoDescription = swimSpot.summary || `Discover ${swimSpot.name}, a beautiful wild swimming location. ${swimSpot.description.substring(0, 100)}...`;
  const currentUrl = `${window.location.origin}/spot/${swimSpot.id}`;

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        city={swimSpot.city}
      />
      
      <StructuredData 
        data={{
          type: 'Place',
          name: swimSpot.name,
          description: seoDescription,
          address: swimSpot.city ? {
            addressLocality: swimSpot.city,
            addressCountry: "Netherlands"
          } : undefined,
          geo: {
            latitude: swimSpot.location.latitude,
            longitude: swimSpot.location.longitude
          },
          url: currentUrl
        }}
      />

      <div className="min-h-screen bg-swimspot-drift-sand">
        {/* Compact spot header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-swimspot-blue-green mb-3">{swimSpot.name}</h1>
                
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  {swimSpot.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-swimspot-light-blue-mist rounded-full text-sm font-medium text-swimspot-blue-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swimspot-blue-green rounded-full"></div>
                    <span className="font-medium">{visitData?.count || 0} visits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swimspot-blue-green rounded-full"></div>
                    <span className="font-medium">{savedCount} saves</span>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSave}
                  disabled={saveMutationPending}
                  className={`rounded-full ${
                    isSaved ? "text-swimspot-burnt-coral border-swimspot-burnt-coral" : "text-swimspot-blue-green border-swimspot-blue-green"
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
                  disabled={visitMutationPending}
                  className="rounded-full text-swimspot-blue-green border-swimspot-blue-green"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full text-swimspot-blue-green border-swimspot-blue-green"
                >
                  <Share className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReport}
                  className="rounded-full text-swimspot-blue-green border-swimspot-blue-green"
                >
                  <AlertTriangle className="h-5 w-5" />
                </Button>
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
                </TabsList>
                
                <TabsContent value="details">
                  <SwimSpotDetailsTab swimSpot={swimSpot} partners={partners} groups={groups} />
                </TabsContent>
                
                <TabsContent value="community">
                  <SwimSpotCommunityTab visitData={visitData} groups={groups} />
                </TabsContent>
              </Tabs>
            </div>
            
            <SwimSpotSidebar swimSpot={swimSpot} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SwimSpotDetail;
