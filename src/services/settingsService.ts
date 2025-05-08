
import { supabase } from "@/integrations/supabase/client";

export const getPublicSetting = async (key: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', key)
    .eq('is_public', true)
    .single();
  
  if (error || !data) {
    console.error(`Error fetching public setting ${key}:`, error);
    return null;
  }
  
  return data.value;
};

export const getSecureSetting = async (key: string): Promise<string | null> => {
  // Changed this function to not filter on is_public, so it can find any setting by key
  const { data, error } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', key)
    .single();
  
  if (error || !data) {
    console.error(`Error fetching secure setting ${key}:`, error);
    return null;
  }
  
  return data.value;
};

export const updateSetting = async (key: string, value: string, isPublic: boolean = false): Promise<boolean> => {
  const { error } = await supabase
    .from('app_settings')
    .update({ value, is_public: isPublic, updated_at: new Date().toISOString() })
    .eq('key', key);
  
  if (error) {
    console.error(`Error updating setting ${key}:`, error);
    return false;
  }
  
  return true;
};
