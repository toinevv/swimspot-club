
import { supabase } from "@/integrations/supabase/client";

export const settingsService = {
  /**
   * Get a setting from the app_settings table
   * @param key The setting key to retrieve
   * @returns The setting value or null if not found
   */
  async getSetting(key: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', key)
        .maybeSingle();
      
      if (error) {
        console.error('Error retrieving setting:', error);
        return null;
      }
      
      return data?.value || null;
    } catch (err) {
      console.error('Unexpected error retrieving setting:', err);
      return null;
    }
  },
  
  /**
   * Set a setting in the app_settings table
   * @param key The setting key
   * @param value The setting value
   * @param isPublic Whether the setting is publicly accessible
   * @returns Success status
   */
  async setSetting(key: string, value: string, isPublic: boolean = false): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .upsert({ key, value, is_public: isPublic })
        .select();
      
      if (error) {
        console.error('Error saving setting:', error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Unexpected error saving setting:', err);
      return false;
    }
  },
  
  /**
   * Get map settings
   * @returns Map settings object
   */
  async getMapSettings(): Promise<{mapboxToken: string | null}> {
    const mapboxToken = await this.getSetting('mapbox_token');
    return { mapboxToken };
  }
};
