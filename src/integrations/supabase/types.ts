export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_settings: {
        Row: {
          created_at: string
          id: string
          is_public: boolean
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_public?: boolean
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      blog_articles: {
        Row: {
          author: string
          content: string
          cover_image_url: string
          created_at: string
          id: string
          keyword: string | null
          published_at: string
          slug: string
          tags: string[] | null
          title: string
        }
        Insert: {
          author: string
          content: string
          cover_image_url: string
          created_at?: string
          id?: string
          keyword?: string | null
          published_at?: string
          slug: string
          tags?: string[] | null
          title: string
        }
        Update: {
          author?: string
          content?: string
          cover_image_url?: string
          created_at?: string
          id?: string
          keyword?: string | null
          published_at?: string
          slug?: string
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          coordinates_lat: number
          coordinates_lng: number
          created_at: string
          description: string
          display_name: string
          featured: boolean
          id: string
          image_url: string
          name: string
          population: number | null
          region: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          coordinates_lat: number
          coordinates_lng: number
          created_at?: string
          description: string
          display_name: string
          featured?: boolean
          id?: string
          image_url: string
          name: string
          population?: number | null
          region?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          coordinates_lat?: number
          coordinates_lng?: number
          created_at?: string
          description?: string
          display_name?: string
          featured?: boolean
          id?: string
          image_url?: string
          name?: string
          population?: number | null
          region?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string
          is_premium: boolean
          location: string
          name: string
          preferred_spots: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_url: string
          is_premium?: boolean
          location: string
          name: string
          preferred_spots?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          is_premium?: boolean
          location?: string
          name?: string
          preferred_spots?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          type: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          type: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          type?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          explorer_level: string | null
          full_name: string | null
          id: string
          is_premium: boolean | null
          location: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          explorer_level?: string | null
          full_name?: string | null
          id: string
          is_premium?: boolean | null
          location?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          explorer_level?: string | null
          full_name?: string | null
          id?: string
          is_premium?: boolean | null
          location?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      swim_spot_likes: {
        Row: {
          created_at: string
          id: string
          swim_spot_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          swim_spot_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          swim_spot_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swim_spot_likes_swim_spot_id_fkey"
            columns: ["swim_spot_id"]
            isOneToOne: false
            referencedRelation: "swim_spots"
            referencedColumns: ["id"]
          },
        ]
      }
      swim_spot_partners: {
        Row: {
          created_at: string
          discount_code: string | null
          distance_meters: number | null
          id: string
          partner_id: string
          swim_spot_id: string
        }
        Insert: {
          created_at?: string
          discount_code?: string | null
          distance_meters?: number | null
          id?: string
          partner_id: string
          swim_spot_id: string
        }
        Update: {
          created_at?: string
          discount_code?: string | null
          distance_meters?: number | null
          id?: string
          partner_id?: string
          swim_spot_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swim_spot_partners_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swim_spot_partners_swim_spot_id_fkey"
            columns: ["swim_spot_id"]
            isOneToOne: false
            referencedRelation: "swim_spots"
            referencedColumns: ["id"]
          },
        ]
      }
      swim_spot_saves: {
        Row: {
          created_at: string
          id: string
          swim_spot_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          swim_spot_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          swim_spot_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "swim_spot_saves_swim_spot_id_fkey"
            columns: ["swim_spot_id"]
            isOneToOne: false
            referencedRelation: "swim_spots"
            referencedColumns: ["id"]
          },
        ]
      }
      swim_spot_visits: {
        Row: {
          id: string
          swim_spot_id: string
          user_id: string
          visited_at: string
        }
        Insert: {
          id?: string
          swim_spot_id: string
          user_id: string
          visited_at?: string
        }
        Update: {
          id?: string
          swim_spot_id?: string
          user_id?: string
          visited_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "swim_spot_visits_swim_spot_id_fkey"
            columns: ["swim_spot_id"]
            isOneToOne: false
            referencedRelation: "swim_spots"
            referencedColumns: ["id"]
          },
        ]
      }
      swim_spots: {
        Row: {
          address: string
          city: string | null
          country: string | null
          created_at: string
          description: string
          id: string
          image_url: string
          latitude: number
          longitude: number
          name: string
          summary: string
          tags: string[]
          updated_at: string
          visibility: string
          water_type: string
        }
        Insert: {
          address: string
          city?: string | null
          country?: string | null
          created_at?: string
          description: string
          id?: string
          image_url: string
          latitude: number
          longitude: number
          name: string
          summary: string
          tags?: string[]
          updated_at?: string
          visibility?: string
          water_type: string
        }
        Update: {
          address?: string
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          latitude?: number
          longitude?: number
          name?: string
          summary?: string
          tags?: string[]
          updated_at?: string
          visibility?: string
          water_type?: string
        }
        Relationships: []
      }
      user_groups: {
        Row: {
          group_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string
          role: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
