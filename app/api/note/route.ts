import { createServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.QUOTE_RECIPIENT_EMAIL ?? "wizhd55@gmail.com";
const MAX_COMMENT_LENGTH = 2000;

function renderStars(stars: number) {
  return "★".repeat(stars) + "☆".repeat(5 - stars);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const stars =
      typeof body.stars === "number"
        ? body.stars
        : typeof body.stars === "string"
          ? Number.parseInt(body.stars, 10)
          : NaN;
    const comment =
      typeof body.comment === "string" ? body.comment.trim().slice(0, MAX_COMMENT_LENGTH) : "";

    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return NextResponse.json(
        { error: "Sélectionnez une note entre 1 et 5 étoiles." },
        { status: 400 },
      );
    }

    const supabase = createServiceSupabase();
    const { error: dbError } = await supabase.from("note").insert({
      stars,
      comment,
    });

    if (dbError) {
      console.error("Supabase note insert error:", dbError);
      return NextResponse.json(
        { error: "Impossible d'enregistrer la note." },
        { status: 500 },
      );
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
          ${commentHtml}
        </div>
      `,
    });

    if (error) {
      console.error("Resend note error:", error);
      return NextResponse.json(
        { error: "Impossible d'envoyer la note." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
