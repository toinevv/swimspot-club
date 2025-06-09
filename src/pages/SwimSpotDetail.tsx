
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import SwimSpotHero from "@/components/swimspot/SwimSpotHero";
import SwimSpotAbout from "@/components/swimspot/SwimSpotAbout";
import SwimSpotCommunity from "@/components/swimspot/SwimSpotCommunity";
import SwimSpotCTA from "@/components/swimspot/SwimSpotCTA";
import { useState } from "react";
import { toast } from "sonner";

const SwimSpotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isSaved, setIsSaved] = useState(false);
  const [hasFeedback, setHasFeedback] = useState(false);

  const { data: spot, isLoading: spotLoading, error: spotError } = useQuery({
    queryKey: ['swimSpot', id],
    queryFn: () => api.getSwimSpotById(id!),
    enabled: !!id,
  });

  const { data: partners = [], isLoading: partnersLoading } = useQuery({
    queryKey: ['spotPartners', id],
    queryFn: () => api.getSpotPartners(id!),
    enabled: !!id,
  });

  const { data: visitsData } = useQuery({
    queryKey: ['spotVisits', id],
    queryFn: () => api.getSpotVisits(id!),
    enabled: !!id,
  });

  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: api.getGroups,
  });

  // Check if spot is saved
  const { data: savedCheck } = useQuery({
    queryKey: ['spotSaved', id],
    queryFn: () => api.checkIfSaved(id!),
    enabled: !!id,
  });

  // Mutations for spot interactions
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
    mutationFn: (feedbackData: any) => Promise.resolve(feedbackData),
    onSuccess: () => {
      setHasFeedback(true);
      toast.success("Feedback submitted!");
    }
  });

  const handleSave = () => saveMutation.mutate();
  const handleMarkVisited = () => visitMutation.mutate();
  const handleFeedback = () => feedbackMutation.mutate({ spotId: id, type: 'general' });
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

  if (spotLoading) {
    return <div className="min-h-screen bg-swimspot-drift-sand">Loading...</div>;
  }

  if (spotError || !spot) {
    return <div className="min-h-screen bg-swimspot-drift-sand">Spot not found</div>;
  }

  // Handle visit count safely
  const visitCount = typeof visitsData === 'object' && visitsData && 'count' in visitsData ? visitsData.count : 0;
  const visits = Array.isArray(visitsData) ? visitsData : [];

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
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
    </div>
  );
};

export default SwimSpotDetail;
