export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      news_items: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          url: string | null;
          published_at: string | null;
          category: "disease" | "regulation" | "disaster" | "market" | null;
          priority: "high" | "medium" | "low" | null;
          source: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["news_items"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["news_items"]["Insert"]>;
      };
      metrics: {
        Row: {
          id: string;
          key: string;
          value: number | null;
          text_value: string | null;
          unit: string | null;
          year: number | null;
          source: string | null;
          updated_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["metrics"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["metrics"]["Insert"]>;
      };
      alerts: {
        Row: {
          id: string;
          region: string | null;
          severity: "high" | "medium" | "low" | null;
          title: string;
          description: string | null;
          resolved: boolean | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["alerts"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["alerts"]["Insert"]>;
      };
      regions_cache: {
        Row: {
          id: string;
          region_name: string;
          status: "good" | "warning" | "critical" | null;
          notes: string | null;
          updated_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["regions_cache"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["regions_cache"]["Insert"]>;
      };
      price_data: {
        Row: {
          id: string;
          commodity: string;
          price: number | null;
          unit: string | null;
          currency: string | null;
          recorded_at: string;
          source: string | null;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["price_data"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["price_data"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
