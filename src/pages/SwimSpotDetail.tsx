
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { createQueryFn, createSimpleQueryFn } from "@/services/api/utils";
import SwimSpotHero from "@/components/swimspot/SwimSpotHero";
import SwimSpotAbout from "@/components/swimspot/SwimSpotAbout";
import SwimSpotCommunity from "@/components/swimspot/SwimSpotCommunity";
import SwimSpotCTA from "@/components/swimspot/SwimSpotCTA";
import FeedbackDialog from "@/components/feedback/FeedbackDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { SpotVisitData } from "@/types/entities";

const SwimSpotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hasFeedback, setHasFeedback] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  // Get current user profile for userId
  const { data: profile } = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: createSimpleQueryFn(api.getCurrentUserProfile),
  });

  const { data: spot, isLoading: spotLoading, error: spotError } = useQuery({
    queryKey: ['swimSpot', id],
    queryFn: createQueryFn(api.getSwimSpotById),
    enabled: !!id,
  });

  const { data: partners = [], isLoading: partnersLoading } = useQuery({
    queryKey: ['spotPartners', id],
    queryFn: createQueryFn(api.getSpotPartners),
    enabled: !!id,
  });

  const { data: visitsData } = useQuery({
    queryKey: ['spotVisits', id],
    queryFn: createQueryFn(api.getSpotVisits),
    enabled: !!id,
  });

  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: createSimpleQueryFn(api.getGroups),
  });

  // Mutations for spot interactions
  const visitMutation = useMutation({
    mutationFn: () => {
      if (!id) throw new Error("No spot ID");
      return api.markAsVisited(id);
    },
    onSuccess: () => {
      toast.success("Marked as visited!");
      queryClient.invalidateQueries({ queryKey: ['spotVisits', id] });
    }
  });

  const feedbackMutation = useMutation({
    mutationFn: (feedbackData: { type: string; details?: string }) => {
      if (!id) throw new Error("No spot ID");
      return api.submitFeedbackWithText(id, `${feedbackData.type}${feedbackData.details ? `: ${feedbackData.details}` : ''}`);
    },
    onSuccess: () => {
      setHasFeedback(true);
      setFeedbackDialogOpen(false);
      toast.success("Feedback submitted!");
    }
  });

  const flagClickMutation = useMutation({
    mutationFn: () => {
      if (!id) throw new Error("No spot ID");
      return api.submitFeedbackWithText(id, "flag_clicked");
    },
    onSuccess: () => {
      console.log("Flag click recorded");
    }
  });

  const handleMarkVisited = () => visitMutation.mutate();
  const handleFeedback = () => {
    flagClickMutation.mutate();
    setFeedbackDialogOpen(true);
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: spot?.name,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleSubmitFeedback = (feedbackData: { type: string; details?: string }) => {
    feedbackMutation.mutate(feedbackData);
  };

  const handleBackToMap = () => {
    const returnLat = searchParams.get('returnLat');
    const returnLng = searchParams.get('returnLng');
    const returnZoom = searchParams.get('returnZoom');
    
    console.log('🔄 Back button clicked, coordinates from URL:', { returnLat, returnLng, returnZoom });
    
    if (returnLat && returnLng && returnZoom) {
      const params = new URLSearchParams();
      params.set('lat', returnLat);
      params.set('lng', returnLng);
      params.set('zoom', returnZoom);
      console.log('🗺️ Navigating back to saved map position:', { lat: returnLat, lng: returnLng, zoom: returnZoom });
      navigate(`/?${params.toString()}`);
    } else {
      console.log('⚠️ No saved coordinates, using default view');
      const params = new URLSearchParams();
      params.set('lat', '50.0');
      params.set('lng', '10.0');
      params.set('zoom', '4');
      navigate(`/?${params.toString()}`);
    }
  };

  if (spotLoading) {
    return <div className="min-h-screen bg-swimspot-drift-sand">Loading...</div>;
  }

  if (spotError || !spot) {
    return <div className="min-h-screen bg-swimspot-drift-sand">Spot not found</div>;
  }

  const visitCount = (visitsData as SpotVisitData)?.count || 0;
  const visits = Array.isArray(visitsData) ? visitsData : [];

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      <div className="sticky top-16 z-20 bg-swimspot-drift-sand/95 backdrop-blur-sm border-b border-swimspot-blue-green/10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={handleBackToMap}
            className="flex items-center gap-2 text-swimspot-blue-green hover:text-swimspot-blue-green hover:bg-swimspot-blue-green/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Map
          </Button>
        </div>
      </div>

      <SwimSpotHero 
        swimSpot={spot}
        isSaved={false}
        hasFeedback={hasFeedback}
        onSave={() => {}} // Disabled save function
        onMarkVisited={handleMarkVisited}
        onFeedback={handleFeedback}
        onShare={handleShare}
        saveMutationPending={false}
        visitMutationPending={visitMutation.isPending}
        feedbackMutationPending={feedbackMutation.isPending}
        savedCount={0}
        visitCount={visitCount}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SwimSpotAbout 
              swimSpot={spot} 
              partners={partners}
            />
            <SwimSpotCommunity 
              visitData={visits}
              groups={groups}
            />
          </div>
          <div className="lg:col-span-1">
            <SwimSpotCTA />
          </div>
        </div>
      </div>

      <FeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        onSubmit={handleSubmitFeedback}
        isSubmitting={feedbackMutation.isPending}
      />
    </div>
  );
};

export default SwimSpotDetail;
