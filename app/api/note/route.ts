import { createServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.QUOTE_RECIPIENT_EMAIL ?? "wizhd55@gmail.com";
const MAX_COMMENT_LENGTH = 2000;
const MAX_NAME_LENGTH = 120;

function renderStars(stars: number) {
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}

function parseStars(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.trunc(value);
  }
  if (typeof value === "string" && value.trim()) {
    return Number.parseInt(value, 10);
  }
  return NaN;
}

function dbErrorMessage(code: string | undefined): string {
  if (code === "42P01") {
    return "Service temporairement indisponible. Réessayez plus tard.";
  }
  return "Impossible d'enregistrer la note.";
}

async function sendNoteEmail(stars: number, name: string, comment: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Note saved but RESEND_API_KEY is missing.");
    return;
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Merlin <onboarding@resend.dev>";

  const nameHtml = name
    ? `<p style="margin:0 0 6px"><strong>Nom ou entreprise</strong></p><p style="margin:0 0 24px;color:#444">${name.replace(/</g, "&lt;")}</p>`
    : "";

  const commentHtml = comment
    ? `<p style="margin:0 0 6px"><strong>Commentaire</strong></p><p style="margin:0 0 24px;color:#444;white-space:pre-wrap">${comment.replace(/</g, "&lt;")}</p>`
    : `<p style="margin:0 0 24px;color:#666">Aucun commentaire</p>`;

  const { error } = await resend.emails.send({
    from,
    to: RECIPIENT,
    subject: `[Merlin] Nouvelle note — ${stars}/5`,
    html: `
      <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
        <p style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#888">Merlin · Avis client</p>
        <h1 style="font-size:22px;font-weight:500;margin:16px 0 24px">Nouvelle note reçue</h1>
        <p style="margin:0 0 6px"><strong>Note</strong></p>
        <p style="margin:0 0 24px;font-size:20px;color:#da291c;letter-spacing:0.08em">${renderStars(stars)} <span style="font-size:14px;color:#666">(${stars}/5)</span></p>
        ${nameHtml}
        ${commentHtml}
      </div>
    `,
  });

  if (error) {
    console.error("Resend note error:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    const stars = parseStars(body.stars);
    const name =
      typeof body.name === "string"
        ? body.name.trim().slice(0, MAX_NAME_LENGTH)
        : "";
    const comment =
      typeof body.comment === "string"
        ? body.comment.trim().slice(0, MAX_COMMENT_LENGTH)
        : "";

    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return NextResponse.json(
        { error: "Sélectionnez une note entre 1 et 5 étoiles." },
        { status: 400 },
      );
    }

    const supabase = createServiceSupabase();
    const { error: dbError } = await supabase.from("note").insert({
      stars,
      name,
      comment,
    });

    if (dbError) {
      console.error("Supabase note insert error:", dbError);
      return NextResponse.json(
        { error: dbErrorMessage(dbError.code) },
        { status: 500 },
      );
    }

    await sendNoteEmail(stars, name, comment);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Note API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
