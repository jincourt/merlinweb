import { isValidPhone } from "@/lib/phone";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT = process.env.QUOTE_RECIPIENT_EMAIL ?? "wizhd55@gmail.com";
const TIME_SLOTS = new Set([
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]);

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return false;

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date >= tomorrow;
}

async function sendAppointmentEmail(
  date: string,
  time: string,
  email: string,
  phone: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Appointment saved but RESEND_API_KEY is missing.");
    return;
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Merlin <onboarding@resend.dev>";

  const formattedDate = new Intl.DateTimeFormat("fr-CH", {
    dateStyle: "full",
  }).format(new Date(`${date}T12:00:00`));

  const { error } = await resend.emails.send({
    from,
    to: RECIPIENT,
    subject: `[Merlin] Rendez-vous — ${date} ${time}`,
    html: `
      <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
        <p style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#888">Merlin · Prise de rendez-vous</p>
        <h1 style="font-size:22px;font-weight:500;margin:16px 0 24px">Nouvelle demande de rendez-vous</h1>
        <p style="margin:0 0 6px"><strong>Date</strong></p>
        <p style="margin:0 0 24px;color:#444">${formattedDate.replace(/</g, "&lt;")}</p>
        <p style="margin:0 0 6px"><strong>Heure</strong></p>
        <p style="margin:0 0 24px;color:#444">${time.replace(/</g, "&lt;")}</p>
        <p style="margin:0 0 6px"><strong>Email</strong></p>
        <p style="margin:0 0 24px;color:#444">${email.replace(/</g, "&lt;")}</p>
        <p style="margin:0 0 6px"><strong>Téléphone</strong></p>
        <p style="margin:0;color:#444">${phone.replace(/</g, "&lt;")}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend appointment error:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    const date = typeof body.date === "string" ? body.date.trim() : "";
    const time = typeof body.time === "string" ? body.time.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!isValidDate(date)) {
      return NextResponse.json({ error: "Date invalide." }, { status: 400 });
    }

    if (!TIME_SLOTS.has(time)) {
      return NextResponse.json({ error: "Heure invalide." }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide." },
        { status: 400 },
      );
    }

    await sendAppointmentEmail(date, time, email, phone);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
