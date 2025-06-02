
import { supabase } from '@/integrations/supabase/client';

export interface Partner {
  id: string;
  name: string;
  description: string | null;
  type: string;
  image_url: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  distance_meters: number | null;
  discount_code: string | null;
  created_at: string;
  updated_at: string;
}

export const partnersApi = {
  async getSpotPartners(spotId: string): Promise<Partner[]> {
    const { data: spotPartners } = await supabase
      .from('swim_spot_partners')
      .select(`
        distance_meters,
        discount_code,
        partners:partner_id (
          id,
          name,
          description,
          type,
          image_url,
          address,
          phone,
          website,
          latitude,
          longitude,
          created_at,
          updated_at
        )
      `)
      .eq('swim_spot_id', spotId)
      .order('distance_meters', { ascending: true });

    return spotPartners?.map(sp => ({
      ...sp.partners,
      distance_meters: sp.distance_meters,
      discount_code: sp.discount_code
    })) || [];
  }
};
