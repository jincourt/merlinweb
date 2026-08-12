import { generateInviteCode, buildInviteLink } from "@/lib/invite-code";
import { isValidPhone, normalizePhoneDigits } from "@/lib/phone";
import { createServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide." },
        { status: 400 },
      );
    }

    const phoneDigits = normalizePhoneDigits(phone);
    const supabase = createServiceSupabase();

    const { data: existing } = await supabase
      .from("code")
      .select("code")
      .eq("phone_digits", phoneDigits)
      .maybeSingle();

    if (existing?.code) {
      const origin = new URL(request.url).origin;
      return NextResponse.json({
        code: existing.code,
        link: buildInviteLink(existing.code, origin),
        existing: true,
      });
    }

    let inserted: { code: string } | null = null;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const code = generateInviteCode();
      const { data, error } = await supabase
        .from("code")
        .insert({ phone, phone_digits: phoneDigits, code })
        .select("code")
        .single();

      if (!error && data) {
        inserted = data;
        break;
      }

      if (error?.code !== "23505") {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Impossible de créer le code." },
          { status: 500 },
        );
      }
    }

    if (!inserted) {
      return NextResponse.json(
        { error: "Impossible de générer un code unique." },
        { status: 500 },
      );
    }

    const origin = new URL(request.url).origin;
    return NextResponse.json({
      code: inserted.code,
      link: buildInviteLink(inserted.code, origin),
      existing: false,
    });
  } catch (err) {
    console.error("POST /api/code:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code")?.trim().toUpperCase();

    if (!code || code.length < 6 || code.length > 12) {
      return NextResponse.json({ error: "Code invalide." }, { status: 400 });
    }

    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("code")
      .select("code")
      .eq("code", code)
      .maybeSingle();

    if (error) {
      console.error("Supabase lookup error:", error);
      return NextResponse.json(
        { error: "Impossible de vérifier le code." },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Code introuvable." }, { status: 404 });
    }

    return NextResponse.json({ code: data.code, valid: true });
  } catch (err) {
    console.error("GET /api/code:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
