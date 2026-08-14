import { isValidPhone, phonesMatch } from "@/lib/phone";
import type { SupabaseClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidQuoteEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

export type QuoteContactInput = {
  email: string;
  phone: string;
  message: string;
  inviteCode: string;
};

export function parseQuoteContact(body: unknown): QuoteContactInput {
  const raw = body as Record<string, unknown>;
  return {
    email: typeof raw.email === "string" ? raw.email.trim() : "",
    phone: typeof raw.phone === "string" ? raw.phone.trim() : "",
    message: typeof raw.message === "string" ? raw.message.trim() : "",
    inviteCode:
      typeof raw.inviteCode === "string"
        ? raw.inviteCode.trim().toUpperCase()
        : "",
  };
}

export function validateQuoteContact(contact: QuoteContactInput): string | null {
  const { email, phone } = contact;

  if (!email && !phone) {
    return "Indiquez un email ou un téléphone.";
  }
  if (email && !isValidQuoteEmail(email)) {
    return "Adresse email invalide.";
  }
  if (phone && !isValidPhone(phone)) {
    return "Numéro de téléphone invalide.";
  }

  return null;
}

export type InviteCodeResult =
  | { ok: true; inviteCodeHtml: string }
  | { ok: false; error: string; status: number };

export async function resolveInviteCode(
  supabase: SupabaseClient,
  inviteCode: string,
  phone: string,
): Promise<InviteCodeResult> {
  if (!inviteCode) {
    return { ok: true, inviteCodeHtml: "" };
  }

  const { data: inviteRow, error: inviteError } = await supabase
    .from("code")
    .select("code, phone")
    .eq("code", inviteCode)
    .maybeSingle();

  if (inviteError) {
    console.error("Invite code lookup error:", inviteError);
    return {
      ok: false,
      error: "Impossible de vérifier le code d'invitation.",
      status: 500,
    };
  }

  if (!inviteRow) {
    return { ok: false, error: "Code d'invitation invalide.", status: 400 };
  }

  if (phone && phonesMatch(phone, inviteRow.phone)) {
    return {
      ok: false,
      error: "Vous ne pouvez pas utiliser votre propre code d'invitation.",
      status: 400,
    };
  }

  const inviteCodeHtml = `<p style="margin:0 0 6px"><strong>Code d'invitation</strong></p><p style="margin:0 0 24px;font-family:monospace;font-size:16px;color:#da291c">${inviteRow.code}</p>`;

  return { ok: true, inviteCodeHtml };
}
