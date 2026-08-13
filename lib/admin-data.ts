import { formatChf, SITE_OPTIONS } from "@/lib/options";
import { buildInviteLink } from "@/lib/invite-code";
import { createServiceSupabase, type InviteCodeRow, type QuoteRow } from "@/lib/supabase";

export type AdminStats = {
  visits: number;
  partners: number;
  clients: number;
  notes: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const supabase = createServiceSupabase();

    const [visits, partners, clients, notes] = await Promise.all([
      supabase.from("visit").select("id", { count: "exact", head: true }),
      supabase.from("code").select("id", { count: "exact", head: true }),
      supabase.from("quote").select("id", { count: "exact", head: true }),
      supabase.from("note").select("id", { count: "exact", head: true }),
    ]);

    return {
      visits: visits.count ?? 0,
      partners: partners.count ?? 0,
      clients: clients.count ?? 0,
      notes: notes.count ?? 0,
    };
  } catch {
    return { visits: 0, partners: 0, clients: 0, notes: 0 };
  }
}

export type AdminQuote = QuoteRow & {
  optionLabels: string[];
  totalFormatted: string;
};

export async function getAdminQuotes(): Promise<AdminQuote[]> {
  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("quote")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];

    return (data ?? []).map((row) => {
      const ids = Array.isArray(row.selected_ids) ? row.selected_ids : [];
      const optionLabels = ids
        .map((id) => SITE_OPTIONS.find((o) => o.id === id)?.label ?? id)
        .filter(Boolean);

      return {
        ...row,
        selected_ids: ids,
        optionLabels,
        totalFormatted: formatChf(row.total),
      };
    });
  } catch {
    return [];
  }
}

export function formatAdminDate(iso: string) {
  return new Intl.DateTimeFormat("fr-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export type AdminPartner = InviteCodeRow & {
  link: string;
};

function getSiteOrigin() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  );
}

export async function getAdminPartners(): Promise<AdminPartner[]> {
  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("code")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];

    const origin = getSiteOrigin();

    return (data ?? []).map((row) => ({
      ...row,
      link: buildInviteLink(row.code, origin),
    }));
  } catch {
    return [];
  }
}
