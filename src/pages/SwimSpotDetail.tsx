
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SwimSpotHeader from "@/components/swimspot/SwimSpotHeader";
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
        city={swimSpot.city?.display_name}
      />
      
      <StructuredData 
        data={{
          type: 'Place',
          name: swimSpot.name,
          description: seoDescription,
          address: swimSpot.city ? {
            addressLocality: swimSpot.city.display_name,
            addressCountry: "Netherlands"
          } : undefined,
          geo: {
            latitude: swimSpot.latitude,
            longitude: swimSpot.longitude
          },
          url: currentUrl
        }}
      />

      <div className="min-h-screen bg-swimspot-drift-sand">
        <SwimSpotHeader
          swimSpot={swimSpot}
          getBackToMapUrl={getBackToMapUrl}
          visitData={visitData}
          savedCount={savedCount}
          isSaved={isSaved}
          onSave={handleSave}
          onMarkVisited={handleMarkVisited}
          onReport={handleReport}
          saveMutationPending={saveMutation.isPending}
          visitMutationPending={visitMutation.isPending}
        />

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
