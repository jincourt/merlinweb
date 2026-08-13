import { createServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path =
      typeof body.path === "string" && body.path.trim()
        ? body.path.trim().slice(0, 200)
        : "/";

    const supabase = createServiceSupabase();
    const { error } = await supabase.from("visit").insert({ path });

    if (error) {
      console.error("Visit insert error:", error);
      return NextResponse.json({ error: "Erreur." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
