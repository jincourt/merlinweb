import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  createSessionToken,
  verifySessionToken,
} from "@/lib/admin-session";

export { COOKIE_NAME, verifyAdminPassword } from "@/lib/admin-session";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function createAdminSessionToken(): Promise<string | null> {
  return createSessionToken();
}
