const PHONE_RE = /^[+]?[\d\s()./-]{8,20}$/;

export function isValidPhone(value: string) {
  const v = value.trim();
  if (!v) return false;
  const digits = v.replace(/\D/g, "");
  return PHONE_RE.test(v) && digits.length >= 8 && digits.length <= 15;
}

/** Normalise un numéro suisse/international pour comparaison. */
export function normalizePhoneDigits(phone: string): string {
  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  // 078… → 4178…
  if (digits.startsWith("0") && digits.length >= 9) {
    digits = "41" + digits.slice(1);
  }

  return digits;
}

export function phonesMatch(a: string, b: string): boolean {
  const da = normalizePhoneDigits(a);
  const db = normalizePhoneDigits(b);
  return da.length > 0 && da === db;
}
