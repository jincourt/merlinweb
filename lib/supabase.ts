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
