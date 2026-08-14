import {
  DEFAULT_SELECTED_OPTION_IDS,
  computeTotal,
} from "@/lib/options";
import {
  parseQuoteContact,
  resolveInviteCode,
  validateQuoteContact,
} from "@/lib/quote-request";
import { createServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contact = parseQuoteContact(body);
    const contactError = validateQuoteContact(contact);
    if (contactError) {
      return NextResponse.json({ error: contactError }, { status: 400 });
    }

    const quoteId =
      typeof body.quoteId === "string" && UUID_RE.test(body.quoteId.trim())
        ? body.quoteId.trim()
        : "";

    const supabase = createServiceSupabase();
    const inviteResult = await resolveInviteCode(
      supabase,
      contact.inviteCode,
      contact.phone,
    );

    if (!inviteResult.ok) {
      return NextResponse.json(
        { error: inviteResult.error },
        { status: inviteResult.status },
      );
    }

    const selectedIds = DEFAULT_SELECTED_OPTION_IDS;
    const total = computeTotal(selectedIds);
    const payload = {
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      invite_code: contact.inviteCode,
      selected_ids: selectedIds,
      total,
      status: "draft" as const,
    };

    if (quoteId) {
      const { data: existing, error: fetchError } = await supabase
        .from("quote")
        .select("id, status")
        .eq("id", quoteId)
        .maybeSingle();

      if (fetchError) {
        console.error("Quote fetch error:", fetchError);
        return NextResponse.json(
          { error: "Impossible d'enregistrer vos coordonnées." },
          { status: 500 },
        );
      }

      if (existing?.status === "draft") {
        const { error: updateError } = await supabase
          .from("quote")
          .update(payload)
          .eq("id", quoteId);

        if (updateError) {
          console.error("Quote lead update error:", updateError);
          return NextResponse.json(
            { error: "Impossible d'enregistrer vos coordonnées." },
            { status: 500 },
          );
        }

        return NextResponse.json({ success: true, id: quoteId });
      }
    }

    const { data: inserted, error: insertError } = await supabase
      .from("quote")
      .insert(payload)
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("Quote lead insert error:", insertError);
      return NextResponse.json(
        { error: "Impossible d'enregistrer vos coordonnées." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: inserted.id });
  } catch {
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
