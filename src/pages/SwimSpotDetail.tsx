
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SwimSpotHero from "@/components/swimspot/SwimSpotHero";
import SwimSpotAbout from "@/components/swimspot/SwimSpotAbout";
import SwimSpotCommunity from "@/components/swimspot/SwimSpotCommunity";
import SwimSpotCTA from "@/components/swimspot/SwimSpotCTA";
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: swimSpot.name,
        text: `Check out this swim spot: ${swimSpot.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
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

      <div className="min-h-screen bg-swimspot-drift-sand/30">
        {/* Hero Section */}
        <SwimSpotHero
          swimSpot={swimSpot}
          isSaved={isSaved}
          onSave={handleSave}
          onMarkVisited={handleMarkVisited}
          onShare={handleShare}
          saveMutationPending={saveMutation.isPending}
          visitMutationPending={visitMutation.isPending}
        />
        
        {/* Single Column Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
            <SwimSpotAbout swimSpot={swimSpot} partners={partners} />
            <SwimSpotCommunity 
              visitData={visitData} 
              groups={groups}
              userIsPremium={false} // TODO: Get from user context
            />
            <SwimSpotCTA userIsPremium={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SwimSpotDetail;
