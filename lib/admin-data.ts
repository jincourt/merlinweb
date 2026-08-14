import { formatChf, SITE_OPTIONS } from "@/lib/options";
import { buildInviteLink } from "@/lib/invite-code";
import { formatAdminDate } from "@/lib/admin-format";
import {
  createServiceSupabase,
  type InviteCodeRow,
  type QuoteRow,
  type VisitorRow,
} from "@/lib/supabase";

export { formatAdminDate };

export type AdminStats = {
  visits: number;
  partners: number;
  clients: number;
  notes: number;
  devis: number;
  factures: number;
  tasks: number;
};

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const supabase = createServiceSupabase();

    const [visitors, partners, clients, notes, devis, factures, tasks] =
      await Promise.all([
        supabase.from("visitor").select("id", { count: "exact", head: true }),
        supabase.from("code").select("id", { count: "exact", head: true }),
        supabase
          .from("quote")
          .select("id", { count: "exact", head: true })
          .eq("status", "submitted"),
        supabase.from("note").select("id", { count: "exact", head: true }),
        supabase
          .from("invoice")
          .select("id", { count: "exact", head: true })
          .eq("type", "devis"),
        supabase
          .from("invoice")
          .select("id", { count: "exact", head: true })
          .eq("type", "facture"),
        supabase.from("task").select("id", { count: "exact", head: true }),
      ]);

    return {
      visits: visitors.count ?? 0,
      partners: partners.count ?? 0,
      clients: clients.count ?? 0,
      notes: notes.count ?? 0,
      devis: devis.count ?? 0,
      factures: factures.count ?? 0,
      tasks: tasks.count ?? 0,
    };
  } catch {
    return {
      visits: 0,
      partners: 0,
      clients: 0,
      notes: 0,
      devis: 0,
      factures: 0,
      tasks: 0,
    };
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
        status: row.status === "draft" ? "draft" : "submitted",
        selected_ids: ids,
        optionLabels,
        totalFormatted: formatChf(row.total),
      };
    });
  } catch {
    return [];
  }
}

export type AdminVisitor = VisitorRow & {
  browserLabel: string;
  utmLabel: string | null;
};

function summarizeUserAgent(ua: string | null): string {
  if (!ua) return "—";
  if (/Edg\//i.test(ua)) return "Edge";
  if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
  if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
  if (/Firefox\//i.test(ua)) return "Firefox";
  return ua.slice(0, 48);
}

function formatUtm(row: VisitorRow): string | null {
  const parts = [row.utm_source, row.utm_medium, row.utm_campaign].filter(
    Boolean,
  );
  return parts.length > 0 ? parts.join(" · ") : null;
}

export async function getAdminVisitors(): Promise<AdminVisitor[]> {
  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("visitor")
      .select("*")
      .order("last_seen_at", { ascending: false });

    if (error) return [];

    return (data ?? []).map((row) => ({
      ...row,
      browserLabel: summarizeUserAgent(row.user_agent),
      utmLabel: formatUtm(row),
    }));
  } catch {
    return [];
  }
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
