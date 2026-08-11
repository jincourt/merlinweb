import {
  BASE_OFFER,
  SITE_OPTIONS,
  computeTotal,
  formatChf,
  formatOptionPrice,
} from "@/lib/options";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.QUOTE_RECIPIENT_EMAIL ?? "wizhd55@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()./-]{8,20}$/;

function isValidEmail(value: string) {
  return EMAIL_RE.test(value);
}

function isValidPhone(value: string) {
  if (!value) return false;
  const digits = value.replace(/\D/g, "");
  return PHONE_RE.test(value) && digits.length >= 8 && digits.length <= 15;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const selectedIds = Array.isArray(body.selectedIds)
      ? (body.selectedIds as string[])
      : [];
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Indiquez un email ou un téléphone." },
        { status: 400 },
      );
    }
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 },
      );
    }
    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide." },
        { status: 400 },
      );
    }

    const validIds = selectedIds.filter((id) =>
      SITE_OPTIONS.some((o) => o.id === id),
    );

    const selectedOptions = SITE_OPTIONS.filter((o) =>
      validIds.includes(o.id),
    );
    const total = computeTotal(validIds);

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
                `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${o.label}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${o.hidePrice ? "—" : formatOptionPrice(o, { approximate: true })}</td></tr>`,
            )
            .join("")
        : `<tr><td colspan="2" style="padding:8px 0;color:#666">Aucune option supplémentaire</td></tr>`;

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
