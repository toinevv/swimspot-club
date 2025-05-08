
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
  try {
    // First try to find the setting with any visibility
    const { data, error } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', key)
      .maybeSingle();
    
    if (error) {
      console.error(`Error fetching secure setting ${key}:`, error);
      return null;
    }
    
    return data?.value || null;
  } catch (err) {
    console.error(`Exception fetching secure setting ${key}:`, err);
    return null;
  }
};

export const updateSetting = async (key: string, value: string, isPublic: boolean = false): Promise<boolean> => {
  try {
    // First check if the setting exists
    const { data } = await supabase
      .from('app_settings')
      .select('id')
      .eq('key', key)
      .maybeSingle();
    
    if (data) {
      // Update existing setting
      const { error } = await supabase
        .from('app_settings')
        .update({ value, is_public: isPublic, updated_at: new Date().toISOString() })
        .eq('key', key);
      
      if (error) {
        console.error(`Error updating setting ${key}:`, error);
        return false;
      }
    } else {
      // Create new setting if it doesn't exist
      const { error } = await supabase
        .from('app_settings')
        .insert({ key, value, is_public: isPublic });
      
      if (error) {
        console.error(`Error creating setting ${key}:`, error);
        return false;
      }
    }
    
    return true;
  } catch (err) {
    console.error(`Exception updating/creating setting ${key}:`, err);
    return false;
  }
};
