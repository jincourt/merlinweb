export const COOKIE_NAME = "merlin_admin_session";

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
}

async function hashSecret(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (!password) return null;
  const secret = getSessionSecret();
  return hashSecret(`${secret}:merlin-admin`);
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (!password || !token) return false;

  const expected = await createSessionToken();
  if (!expected || token.length !== expected.length) return false;

  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyAdminPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (!password || !input) return false;
  if (input.length !== password.length) return false;

  let mismatch = 0;
  for (let i = 0; i < input.length; i++) {
    mismatch |= input.charCodeAt(i) ^ password.charCodeAt(i);
  }
  return mismatch === 0;
}
