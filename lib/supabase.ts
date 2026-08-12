import { createClient } from "@supabase/supabase-js";

export type InviteCodeRow = {
  id: string;
  phone: string;
  phone_digits: string;
  code: string;
  created_at: string;
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

export function createServiceSupabase() {
  return createClient<{
    public: {
      Tables: {
        code: {
          Row: InviteCodeRow;
          Insert: {
            phone: string;
            phone_digits: string;
            code: string;
          };
          Update: Partial<InviteCodeRow>;
        };
      };
    };
  }>(getSupabaseUrl(), getServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
