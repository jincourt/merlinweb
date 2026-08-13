import {
  COOKIE_NAME,
  createSessionToken,
  verifyAdminPassword,
} from "@/lib/admin-session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password =
      typeof body.password === "string" ? body.password : "";

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { error: "Mot de passe incorrect." },
        { status: 401 },
      );
    }

    const token = await createSessionToken();
    if (!token) {
      return NextResponse.json(
        { error: "Configuration admin manquante." },
        { status: 500 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
