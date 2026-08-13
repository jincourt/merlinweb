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

export type TaskRow = {
  id: string;
  title: string;
  description: string;
  due_date: string | null;
  status: "todo" | "in_progress" | "done";
  position: number;
  created_at: string;
  updated_at: string;
};

export type InvoiceRow = {
  id: string;
  number: string;
  type: "devis" | "facture";
  status: "draft" | "sent" | "paid" | "cancelled";
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  client_address: string | null;
  line_items: unknown;
  notes: string;
  subtotal: number;
  total: number;
  valid_until: string | null;
  due_date: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
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
      task: {
        Row: TaskRow;
        Insert: {
          title: string;
          description?: string;
          due_date?: string | null;
          status?: "todo" | "in_progress" | "done";
          position?: number;
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<TaskRow>;
        Relationships: [];
      };
      invoice: {
        Row: InvoiceRow;
        Insert: {
          number: string;
          type: "devis" | "facture";
          status?: "draft" | "sent" | "paid" | "cancelled";
          client_name: string;
          client_email?: string | null;
          client_phone?: string | null;
          client_address?: string | null;
          line_items?: unknown;
          notes?: string;
          subtotal?: number;
          total?: number;
          valid_until?: string | null;
          due_date?: string | null;
          sent_at?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<InvoiceRow>;
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
