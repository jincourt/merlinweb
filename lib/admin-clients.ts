import { getAdminQuotes, type AdminQuote } from "@/lib/admin-data";

export type AdminClientOption = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  selectedIds: string[];
  message: string;
  totalFormatted: string;
  searchText: string;
  label: string;
  sublabel: string;
};

function normalizeContactKey(quote: AdminQuote) {
  const email = quote.email.trim().toLowerCase();
  if (email) return `email:${email}`;
  const phone = quote.phone.replace(/\D/g, "");
  if (phone) return `phone:${phone}`;
  return `quote:${quote.id}`;
}

function clientDisplayName(quote: AdminQuote) {
  if (quote.email) {
    const local = quote.email.split("@")[0] ?? quote.email;
    return local
      .replace(/[._-]+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
  if (quote.phone) return quote.phone;
  return "Client";
}

function clientContactLine(quote: AdminQuote) {
  return [quote.email, quote.phone].filter(Boolean).join(" · ");
}

function quoteToClientOption(quote: AdminQuote): AdminClientOption {
  const name = clientDisplayName(quote);
  const contact = clientContactLine(quote);

  return {
    id: quote.id,
    name,
    email: quote.email,
    phone: quote.phone,
    address: "",
    selectedIds: quote.selected_ids,
    message: quote.message,
    totalFormatted: quote.totalFormatted,
    searchText: [
      name,
      quote.email,
      quote.phone,
      quote.invite_code,
      quote.message,
      ...quote.optionLabels,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
    label: name,
    sublabel: contact || quote.totalFormatted,
  };
}

export async function getAdminClientOptions(): Promise<AdminClientOption[]> {
  const quotes = await getAdminQuotes();
  const byContact = new Map<string, AdminClientOption>();

  for (const quote of quotes) {
    const key = normalizeContactKey(quote);
    if (!byContact.has(key)) {
      byContact.set(key, quoteToClientOption(quote));
    }
  }

  return [...byContact.values()].sort((a, b) =>
    a.label.localeCompare(b.label, "fr-CH"),
  );
}
