import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type InviteCodeRow = {
  id: string;
  phone: string;
  phone_digits: string;
  code: string;
  created_at: string;
};

export type NoteRow = {
  id: string;
  stars: number;
  comment: string;
  created_at: string;
};

export type VisitRow = {
  id: string;
  path: string;
  created_at: string;
};

export type VisitorRow = {
  id: string;
  visitor_key: string;
  first_path: string;
  last_path: string;
  referrer: string | null;
  user_agent: string | null;
  language: string | null;
  screen: string | null;
  timezone: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  invite_code: string | null;
  session_count: number;
  first_seen_at: string;
  last_seen_at: string;
};

export type QuoteRow = {
  id: string;
  email: string;
  phone: string;
  selected_ids: string[];
  message: string;
  invite_code: string;
  total: number;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      code: {
        Row: InviteCodeRow;
        Insert: {
          phone: string;
          phone_digits: string;
          code: string;
          id?: string;
          created_at?: string;
        };
        Update: Partial<InviteCodeRow>;
        Relationships: [];
      };
      note: {
        Row: NoteRow;
        Insert: {
          stars: number;
          comment?: string;
          id?: string;
          created_at?: string;
        };
        Update: Partial<NoteRow>;
        Relationships: [];
      };
      visit: {
        Row: VisitRow;
        Insert: {
          path?: string;
          id?: string;
          created_at?: string;
        };
        Update: Partial<VisitRow>;
        Relationships: [];
      };
      visitor: {
        Row: VisitorRow;
        Insert: {
          visitor_key: string;
          first_path?: string;
          last_path?: string;
          referrer?: string | null;
          user_agent?: string | null;
          language?: string | null;
          screen?: string | null;
          timezone?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          invite_code?: string | null;
          session_count?: number;
          first_seen_at?: string;
          last_seen_at?: string;
          id?: string;
        };
        Update: Partial<VisitorRow>;
        Relationships: [];
      };
      quote: {
        Row: QuoteRow;
        Insert: {
          email?: string;
          phone?: string;
          selected_ids?: string[];
          message?: string;
          invite_code?: string;
          total?: number;
          id?: string;
          created_at?: string;
        };
        Update: Partial<QuoteRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

function getSupabaseUrl() {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error("SUPABASE_URL manquant.");
  return url;
}

function getServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY manquant.");
  return key;
}

export function createServiceSupabase(): SupabaseClient<Database> {
  return createClient<Database>(getSupabaseUrl(), getServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
