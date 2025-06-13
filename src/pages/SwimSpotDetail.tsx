
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
  const [isSaved, setIsSaved] = useState(false);
  const [hasFeedback, setHasFeedback] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

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

  const { data: savedCheck } = useQuery({
    queryKey: ['spotSaved', id],
    queryFn: () => api.checkIfSaved(id!),
    enabled: !!id,
  });

  const saveMutation = useMutation({
    mutationFn: () => api.toggleSaveSpot(id!),
    onSuccess: () => {
      setIsSaved(!isSaved);
      toast.success(isSaved ? "Spot removed from saved" : "Spot saved!");
      queryClient.invalidateQueries({ queryKey: ['savedSpots'] });
      queryClient.invalidateQueries({ queryKey: ['spotSaved', id] });
    }
  });

  const visitMutation = useMutation({
    mutationFn: () => api.markAsVisited(id!),
    onSuccess: () => {
      toast.success("Marked as visited!");
      queryClient.invalidateQueries({ queryKey: ['spotVisits', id] });
    }
  });

  const feedbackMutation = useMutation({
    mutationFn: (feedbackData: { type: string; details?: string }) => 
      api.submitFeedbackWithText(id!, `${feedbackData.type}${feedbackData.details ? `: ${feedbackData.details}` : ''}`),
    onSuccess: () => {
      setHasFeedback(true);
      setFeedbackDialogOpen(false);
      toast.success("Feedback submitted!");
    }
  });

  const flagClickMutation = useMutation({
    mutationFn: () => api.submitFeedbackWithText(id!, "flag_clicked"),
    onSuccess: () => {
      console.log("Flag click recorded");
    }
  });

  const handleSave = () => saveMutation.mutate();
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
    
    if (returnLat && returnLng && returnZoom) {
      const params = new URLSearchParams();
      params.set('lat', returnLat);
      params.set('lng', returnLng);
      params.set('zoom', returnZoom);
      navigate(`/?${params.toString()}`);
    } else {
      navigate('/');
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
        isSaved={savedCheck || false}
        hasFeedback={hasFeedback}
        onSave={handleSave}
        onMarkVisited={handleMarkVisited}
        onFeedback={handleFeedback}
        onShare={handleShare}
        saveMutationPending={saveMutation.isPending}
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
