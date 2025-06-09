
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import SwimSpotHero from "@/components/swimspot/SwimSpotHero";
import SwimSpotAbout from "@/components/swimspot/SwimSpotAbout";
import SwimSpotCommunity from "@/components/swimspot/SwimSpotCommunity";
import SwimSpotCTA from "@/components/swimspot/SwimSpotCTA";

const SwimSpotDetail = () => {
  const { id } = useParams<{ id: string }>();

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

  const { data: visits = [], isLoading: visitsLoading } = useQuery({
    queryKey: ['spotVisits', id],
    queryFn: () => api.getSpotVisits(id!),
    enabled: !!id,
  });

  const { data: groups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: () => api.getGroups(),
  });

  if (spotLoading) {
    return <div className="min-h-screen bg-swimspot-drift-sand">Loading...</div>;
  }

  if (spotError || !spot) {
    return <div className="min-h-screen bg-swimspot-drift-sand">Spot not found</div>;
  }

  return (
    <div className="min-h-screen bg-swimspot-drift-sand">
      <SwimSpotHero swimSpot={spot} />
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
            <SwimSpotCTA 
              swimSpot={spot} 
              partners={partners}
              isPartnersLoading={partnersLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimSpotDetail;
