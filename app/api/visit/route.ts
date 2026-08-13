import { createServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function trimText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function trimPath(value: unknown): string {
  const path = trimText(value, 200);
  return path ?? "/";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const visitorKey = trimText(body.visitor_key, 36);

    if (!visitorKey || !UUID_RE.test(visitorKey)) {
      return NextResponse.json({ error: "Identifiant invalide." }, { status: 400 });
    }

    const path = trimPath(body.path);
    const newSession = body.new_session === true;
    const userAgent =
      request.headers.get("user-agent")?.slice(0, 500) ??
      trimText(body.user_agent, 500);

    const payload = {
      referrer: trimText(body.referrer, 500),
      user_agent: userAgent,
      language:
        trimText(body.language, 20) ??
        request.headers.get("accept-language")?.split(",")[0]?.trim().slice(0, 20) ??
        null,
      screen: trimText(body.screen, 20),
      timezone: trimText(body.timezone, 80),
      utm_source: trimText(body.utm_source, 120),
      utm_medium: trimText(body.utm_medium, 120),
      utm_campaign: trimText(body.utm_campaign, 120),
      invite_code: trimText(body.invite_code, 20)?.toUpperCase() ?? null,
      last_path: path,
      last_seen_at: new Date().toISOString(),
    };

    const supabase = createServiceSupabase();
    const { data: existing, error: fetchError } = await supabase
      .from("visitor")
      .select("id, session_count")
      .eq("visitor_key", visitorKey)
      .maybeSingle();

    if (fetchError) {
      console.error("Visitor lookup error:", fetchError);
      return NextResponse.json({ error: "Erreur." }, { status: 500 });
    }

    if (!existing) {
      const { error } = await supabase.from("visitor").insert({
        visitor_key: visitorKey,
        first_path: path,
        ...payload,
        session_count: 1,
      });

      if (error) {
        console.error("Visitor insert error:", error);
        return NextResponse.json({ error: "Erreur." }, { status: 500 });
      }

      return NextResponse.json({ success: true, created: true });
    }

    const { error } = await supabase
      .from("visitor")
      .update({
        ...payload,
        session_count: existing.session_count + (newSession ? 1 : 0),
      })
      .eq("id", existing.id);

    if (error) {
      console.error("Visitor update error:", error);
      return NextResponse.json({ error: "Erreur." }, { status: 500 });
    }

    return NextResponse.json({ success: true, created: false });
  } catch {
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
