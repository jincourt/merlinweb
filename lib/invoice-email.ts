import "server-only";

import { Resend } from "resend";
import { formatChf } from "@/lib/options";
import { INVOICE_COMPANY } from "@/lib/invoice-config";
import {
  computeLineTotal,
  type InvoiceRecord,
} from "@/lib/invoice-types";
import {
  generateInvoicePdf,
  getInvoicePdfFilename,
} from "@/lib/invoice-pdf";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatShortDate(iso: string | null) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("fr-CH", { dateStyle: "long" }).format(
    new Date(iso),
  );
}

export function buildInvoiceEmailHtml(invoice: InvoiceRecord) {
  const isFacture = invoice.type === "facture";
  const title = isFacture ? "Facture" : "Devis";
  const rows = invoice.line_items
    .map((item) => {
      const total = computeLineTotal(item);
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#111">${escapeHtml(item.label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center;color:#666;width:48px">${item.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;color:#666;width:96px">${escapeHtml(formatChf(item.unitPrice))}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;color:#111;width:96px">${escapeHtml(formatChf(total))}</td>
      </tr>`;
    })
    .join("");

  const dateLine = isFacture
    ? invoice.due_date
      ? `<p style="margin:0 0 24px;color:#444">Échéance : <strong>${escapeHtml(formatShortDate(invoice.due_date) ?? "")}</strong></p>`
      : ""
    : invoice.valid_until
      ? `<p style="margin:0 0 24px;color:#444">Valable jusqu'au <strong>${escapeHtml(formatShortDate(invoice.valid_until) ?? "")}</strong></p>`
      : "";

  const paymentBlock = isFacture
    ? `<p style="margin:24px 0 0;padding:16px;background:#f7f7f7;border-radius:8px;font-size:13px;color:#444;line-height:1.6">
        Paiement par QR-facture (PDF joint) ou virement bancaire.<br>
        IBAN : <span style="font-family:monospace">${escapeHtml(INVOICE_COMPANY.iban)}</span><br>
        Bénéficiaire : ${escapeHtml(INVOICE_COMPANY.name)} — ${escapeHtml(INVOICE_COMPANY.bank)}
      </p>`
    : "";

  const notesBlock = invoice.notes.trim()
    ? `<p style="margin:24px 0 0"><strong style="color:#888;font-size:11px;letter-spacing:0.08em;text-transform:uppercase">Notes</strong></p>
       <p style="margin:8px 0 0;color:#444;line-height:1.6">${escapeHtml(invoice.notes.trim())}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:32px 16px;background:#fafafa;font-family:Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:12px;padding:32px">
    <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#da291c">${escapeHtml(INVOICE_COMPANY.brand)}</p>
    <h1 style="margin:12px 0 8px;font-size:24px;font-weight:500;color:#111">${title} ${escapeHtml(invoice.number)}</h1>
    <p style="margin:0 0 24px;color:#666;font-size:14px">Bonjour ${escapeHtml(invoice.client_name)},</p>
    <p style="margin:0 0 24px;color:#444;line-height:1.6">
      Veuillez trouver ci-joint votre ${isFacture ? "facture" : "devis"} Merlin.
      Le détail des prestations figure ci-dessous.
    </p>
    ${dateLine}
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead>
        <tr>
          <th style="padding:0 0 8px;text-align:left;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#888;font-weight:600">Description</th>
          <th style="padding:0 0 8px;text-align:center;font-size:11px;color:#888;font-weight:600">Qté</th>
          <th style="padding:0 0 8px;text-align:right;font-size:11px;color:#888;font-weight:600">Prix</th>
          <th style="padding:0 0 8px;text-align:right;font-size:11px;color:#888;font-weight:600">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:20px 0 0;font-weight:600;color:#111">Total</td>
          <td style="padding:20px 0 0;text-align:right;font-weight:600;color:#da291c">${escapeHtml(formatChf(invoice.total))}</td>
        </tr>
      </tfoot>
    </table>
    ${notesBlock}
    ${paymentBlock}
    <p style="margin:32px 0 0;padding-top:24px;border-top:1px solid #eee;font-size:12px;color:#888;line-height:1.6">
      ${escapeHtml(INVOICE_COMPANY.name)} · ${escapeHtml(INVOICE_COMPANY.street)} · ${escapeHtml(INVOICE_COMPANY.zip)} ${escapeHtml(INVOICE_COMPANY.city)}<br>
      ${escapeHtml(INVOICE_COMPANY.email)}
    </p>
  </div>
</body>
</html>`;
}

export async function sendInvoiceEmail(invoice: InvoiceRecord) {
  if (!invoice.client_email?.trim()) {
    throw new Error("Adresse email client manquante.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Configuration email manquante.");
  }

  const pdf = await generateInvoicePdf(invoice);
  const filename = getInvoicePdfFilename(invoice);
  const isFacture = invoice.type === "facture";
  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Merlin <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: invoice.client_email.trim(),
    replyTo: INVOICE_COMPANY.email,
    subject: `[Merlin] ${isFacture ? "Facture" : "Devis"} ${invoice.number}`,
    html: buildInvoiceEmailHtml(invoice),
    attachments: [
      {
        filename,
        content: pdf,
      },
    ],
  });

  if (error) {
    throw new Error(error.message);
  }
}
