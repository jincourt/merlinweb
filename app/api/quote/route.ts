import {
  BASE_OFFER,
  LOCKED_OPTION_IDS,
  SITE_OPTIONS,
  computeTotal,
  formatChf,
  formatOptionPrice,
} from "@/lib/options";
import {
  parseQuoteContact,
  resolveInviteCode,
  validateQuoteContact,
} from "@/lib/quote-request";
import { createServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.QUOTE_RECIPIENT_EMAIL ?? "wizhd55@gmail.com";

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

    const selectedIds = Array.isArray(body.selectedIds)
      ? (body.selectedIds as string[])
      : [];
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

    const validIds = [
      ...new Set([
        ...LOCKED_OPTION_IDS,
        ...selectedIds.filter((id) => SITE_OPTIONS.some((o) => o.id === id)),
      ]),
    ];

    const selectedOptions = SITE_OPTIONS.filter((o) =>
      validIds.includes(o.id),
    );
    const total = computeTotal(validIds);

    const payload = {
      email: contact.email,
      phone: contact.phone,
      selected_ids: validIds,
      message: contact.message,
      invite_code: contact.inviteCode,
      total,
      status: "submitted" as const,
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
          { error: "Impossible d'enregistrer la demande." },
          { status: 500 },
        );
      }

      if (existing?.status === "draft") {
        const { error: updateError } = await supabase
          .from("quote")
          .update(payload)
          .eq("id", quoteId);

        if (updateError) {
          console.error("Quote update error:", updateError);
          return NextResponse.json(
            { error: "Impossible d'enregistrer la demande." },
            { status: 500 },
          );
        }
      } else {
        const { error: insertError } = await supabase.from("quote").insert(payload);
        if (insertError) {
          console.error("Quote insert error:", insertError);
          return NextResponse.json(
            { error: "Impossible d'enregistrer la demande." },
            { status: 500 },
          );
        }
      }
    } else {
      const { error: dbError } = await supabase.from("quote").insert(payload);

      if (dbError) {
        console.error("Quote insert error:", dbError);
        return NextResponse.json(
          { error: "Impossible d'enregistrer la demande." },
          { status: 500 },
        );
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Configuration email manquante." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Merlin <onboarding@resend.dev>";

    const optionsHtml =
      selectedOptions.length > 0
        ? selectedOptions
            .map(
              (o) =>
                `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${o.label}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${o.hidePrice ? "—" : formatOptionPrice(o)}</td></tr>`,
            )
            .join("")
        : `<tr><td colspan="2" style="padding:8px 0;color:#666">Aucune option supplémentaire</td></tr>`;

    const { email, phone, message } = contact;
    const contactSubject = [email, phone].filter(Boolean).join(" · ");
    const contactHtml = [
      email
        ? `<p style="margin:0 0 6px"><strong>Email client</strong></p><p style="margin:0 0 24px"><a href="mailto:${email}">${email}</a></p>`
        : "",
      phone
        ? `<p style="margin:0 0 6px"><strong>Téléphone client</strong></p><p style="margin:0 0 24px"><a href="tel:${phone.replace(/[^\d+]/g, "")}">${phone}</a></p>`
        : "",
    ].join("");

    const { error } = await resend.emails.send({
      from,
      to: RECIPIENT,
      ...(email ? { replyTo: email } : {}),
      subject: `[Merlin] Nouvelle demande — ${contactSubject}`,
      html: `
        <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
          <p style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#888">Merlin · Demande de devis</p>
          <h1 style="font-size:22px;font-weight:500;margin:16px 0 24px">Nouvelle configuration site</h1>
          ${contactHtml}
          ${inviteResult.inviteCodeHtml}
          ${
            message
              ? `<p style="margin:0 0 6px"><strong>Message</strong></p><p style="margin:0 0 24px;color:#444">${message.replace(/</g, "&lt;")}</p>`
              : ""
          }
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #111;font-weight:600">${BASE_OFFER.label}</td>
              <td style="padding:8px 0;border-bottom:1px solid #111;text-align:right;font-weight:600">${formatChf(BASE_OFFER.price)}</td>
            </tr>
            ${optionsHtml}
            <tr>
              <td style="padding:16px 0 0;font-weight:600">Total estimé</td>
              <td style="padding:16px 0 0;text-align:right;font-weight:600;color:#da291c">${formatChf(total)}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Impossible d'envoyer la demande." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, total });
  } catch {
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
