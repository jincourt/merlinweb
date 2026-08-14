import { createServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function clampInt(value: unknown, min: number, max: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const visitorKey =
      typeof body.visitor_key === "string" ? body.visitor_key.trim() : "";

    if (!visitorKey || !UUID_RE.test(visitorKey)) {
      return NextResponse.json({ error: "Identifiant invalide." }, { status: 400 });
    }

    const scrollDepth = clampInt(body.scroll_depth, 0, 100);
    const durationSec = clampInt(body.duration_sec, 0, 86_400);

    if (scrollDepth === null && durationSec === null) {
      return NextResponse.json({ error: "Rien à enregistrer." }, { status: 400 });
    }

    const supabase = createServiceSupabase();
    const { data: existing, error: fetchError } = await supabase
      .from("visitor")
      .select("id, max_scroll_depth, max_duration_sec")
      .eq("visitor_key", visitorKey)
      .maybeSingle();

    if (fetchError) {
      console.error("Engagement lookup error:", fetchError);
      return NextResponse.json({ error: "Erreur." }, { status: 500 });
    }

    if (!existing) {
      return NextResponse.json({ success: true, skipped: true });
    }

    const payload: Record<string, number> = {};

    if (scrollDepth !== null) {
      payload.max_scroll_depth = Math.max(existing.max_scroll_depth, scrollDepth);
    }
    if (durationSec !== null) {
      payload.last_duration_sec = durationSec;
      payload.max_duration_sec = Math.max(existing.max_duration_sec, durationSec);
    }

    const { error: updateError } = await supabase
      .from("visitor")
      .update(payload)
      .eq("id", existing.id);

    if (updateError) {
      console.error("Engagement update error:", updateError);
      return NextResponse.json({ error: "Erreur." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
