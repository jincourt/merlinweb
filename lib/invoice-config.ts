export const INVOICE_COMPANY = {
  name: process.env.INVOICE_COMPANY_NAME ?? "INCOURT JULIEN",
  brand: "Merlin",
  street: process.env.INVOICE_COMPANY_STREET ?? "Route de la Corniche 3",
  zip: process.env.INVOICE_COMPANY_ZIP ?? "1066",
  city: process.env.INVOICE_COMPANY_CITY ?? "Epalinges",
  country: "CH" as const,
  iban: process.env.INVOICE_COMPANY_IBAN ?? "CH2200767000T53996774",
  bic: process.env.INVOICE_COMPANY_BIC ?? "BCVLCH2LXXX",
  bank: process.env.INVOICE_COMPANY_BANK ?? "Banque Cantonale Vaudoise",
  email:
    process.env.INVOICE_COMPANY_EMAIL ??
    process.env.QUOTE_RECIPIENT_EMAIL ??
    "contact@merlin.ch",
  vatNote: "Non assujetti à la TVA",
};

export const INVOICE_PAYMENT_TERMS_DAYS = 30;
