import "server-only";

import PDFDocument from "pdfkit";
import { SwissQRBill } from "swissqrbill/pdf";
import { formatChf } from "@/lib/options";
import { INVOICE_COMPANY, INVOICE_PAYMENT_TERMS_DAYS } from "@/lib/invoice-config";
import {
  computeLineTotal,
  parseClientAddress,
  type InvoiceRecord,
} from "@/lib/invoice-types";

const RED = "#DA291C";
const MUTED = "#666666";
const BORDER = "#E5E5E5";
const QR_SLIP_HEIGHT = 105 * 2.83465; // mm to pt (~297pt)

function formatDocDate(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("fr-CH", { dateStyle: "long" }).format(
    new Date(iso),
  );
}

function formatShortDate(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("fr-CH", { dateStyle: "medium" }).format(
    new Date(iso),
  );
}

function pdfBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
}

function drawHeader(
  doc: PDFKit.PDFDocument,
  invoice: InvoiceRecord,
  margin: number,
) {
  const isFacture = invoice.type === "facture";
  const title = isFacture ? "Facture" : "Devis";

  doc
    .fillColor(RED)
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(INVOICE_COMPANY.brand, margin, margin);

  doc
    .fillColor("#111111")
    .font("Helvetica")
    .fontSize(9)
    .text(INVOICE_COMPANY.name, margin, margin + 28)
    .text(`${INVOICE_COMPANY.street}`)
    .text(`${INVOICE_COMPANY.zip} ${INVOICE_COMPANY.city}`)
    .text(INVOICE_COMPANY.email);

  const rightX = doc.page.width - margin - 180;
  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor("#111111")
    .text(title, rightX, margin, { width: 180, align: "right" });

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(MUTED)
    .text(invoice.number, rightX, margin + 28, { width: 180, align: "right" })
    .text(`Émis le ${formatShortDate(invoice.created_at)}`, {
      width: 180,
      align: "right",
    });

  if (isFacture && invoice.due_date) {
    doc.text(`Échéance ${formatShortDate(invoice.due_date)}`, {
      width: 180,
      align: "right",
    });
  } else if (!isFacture && invoice.valid_until) {
    doc.text(`Valable jusqu'au ${formatShortDate(invoice.valid_until)}`, {
      width: 180,
      align: "right",
    });
  }

  doc.moveDown(2);
}

function drawClientBlock(doc: PDFKit.PDFDocument, invoice: InvoiceRecord) {
  const y = doc.y + 8;
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(MUTED)
    .text("CLIENT", doc.page.margins.left, y);

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#111111")
    .text(invoice.client_name, doc.page.margins.left, y + 16);

  doc.font("Helvetica").fontSize(10).fillColor("#333333");

  let lineY = y + 32;
  if (invoice.client_address) {
    for (const line of invoice.client_address.split("\n")) {
      if (line.trim()) {
        doc.text(line.trim(), doc.page.margins.left, lineY);
        lineY += 14;
      }
    }
  }
  if (invoice.client_email) {
    doc.text(invoice.client_email, doc.page.margins.left, lineY);
    lineY += 14;
  }
  if (invoice.client_phone) {
    doc.text(invoice.client_phone, doc.page.margins.left, lineY);
  }

  doc.y = Math.max(doc.y, lineY + 24);
}

function drawLineItems(doc: PDFKit.PDFDocument, invoice: InvoiceRecord) {
  const margin = doc.page.margins.left;
  const tableTop = doc.y + 12;
  const colDesc = margin;
  const colQty = doc.page.width - margin - 180;
  const colUnit = doc.page.width - margin - 110;
  const colTotal = doc.page.width - margin - 60;
  const rowHeight = 22;

  doc
    .moveTo(margin, tableTop)
    .lineTo(doc.page.width - margin, tableTop)
    .strokeColor(BORDER)
    .lineWidth(1)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(MUTED)
    .text("DESCRIPTION", colDesc, tableTop + 8)
    .text("QTÉ", colQty, tableTop + 8, { width: 40, align: "right" })
    .text("PRIX", colUnit, tableTop + 8, { width: 60, align: "right" })
    .text("TOTAL", colTotal, tableTop + 8, { width: 60, align: "right" });

  let y = tableTop + rowHeight;

  for (const item of invoice.line_items) {
    const lineTotal = computeLineTotal(item);
    const maxContentY =
      doc.page.height -
      doc.page.margins.bottom -
      (invoice.type === "facture" ? QR_SLIP_HEIGHT + 80 : 80);

    if (y + rowHeight > maxContentY) {
      doc.addPage();
      y = doc.page.margins.top;
    }

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#111111")
      .text(item.label, colDesc, y, { width: colQty - colDesc - 12 });

    if (item.description) {
      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(MUTED)
        .text(item.description, colDesc, y + 13, { width: colQty - colDesc - 12 });
      y += 10;
    }

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#111111")
      .text(String(item.quantity), colQty, y, { width: 40, align: "right" })
      .text(formatChf(item.unitPrice), colUnit, y, { width: 60, align: "right" })
      .text(formatChf(lineTotal), colTotal, y, { width: 60, align: "right" });

    y += rowHeight + (item.description ? 8 : 0);

    doc
      .moveTo(margin, y - 4)
      .lineTo(doc.page.width - margin, y - 4)
      .strokeColor(BORDER)
      .lineWidth(0.5)
      .stroke();
  }

  doc.y = y + 16;
}

function drawTotals(doc: PDFKit.PDFDocument, invoice: InvoiceRecord) {
  const margin = doc.page.margins.left;
  const labelX = doc.page.width - margin - 180;
  const valueX = doc.page.width - margin - 60;

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(MUTED)
    .text("Sous-total", labelX, doc.y, { width: 120, align: "right" })
    .fillColor("#111111")
    .text(formatChf(invoice.subtotal), valueX, doc.y, {
      width: 60,
      align: "right",
    });

  doc.moveDown(0.6);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#111111")
    .text("Total", labelX, doc.y, { width: 120, align: "right" })
    .fillColor(RED)
    .text(formatChf(invoice.total), valueX, doc.y, { width: 60, align: "right" });

  doc.moveDown(1.2);

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED)
    .text(INVOICE_COMPANY.vatNote, margin, doc.y);
}

function drawNotes(doc: PDFKit.PDFDocument, invoice: InvoiceRecord) {
  if (!invoice.notes.trim()) return;

  doc.moveDown(1);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(MUTED)
    .text("NOTES");

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333333")
    .text(invoice.notes.trim(), { lineGap: 3 });
}

function drawPaymentInfo(doc: PDFKit.PDFDocument, invoice: InvoiceRecord) {
  if (invoice.type !== "facture") return;

  doc.moveDown(1.5);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(MUTED)
    .text("PAIEMENT");

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333333")
    .text(
      `Paiement sous ${INVOICE_PAYMENT_TERMS_DAYS} jours. Scannez le QR code en bas de page ou virement sur IBAN ${INVOICE_COMPANY.iban}.`,
      { lineGap: 3 },
    );
}

function attachQrBill(doc: PDFKit.PDFDocument, invoice: InvoiceRecord) {
  const parsed = parseClientAddress(invoice.client_address);

  const qrData = {
    currency: "CHF" as const,
    amount: invoice.total,
    creditor: {
      account: INVOICE_COMPANY.iban,
      name: INVOICE_COMPANY.name,
      address: INVOICE_COMPANY.street,
      zip: INVOICE_COMPANY.zip,
      city: INVOICE_COMPANY.city,
      country: INVOICE_COMPANY.country,
    },
    message: `${invoice.number} — ${invoice.client_name}`.slice(0, 140),
    ...(parsed.zip && parsed.city
      ? {
          debtor: {
            name: invoice.client_name,
            address: parsed.street || parsed.city,
            zip: parsed.zip,
            city: parsed.city,
            country: "CH",
          },
        }
      : {}),
  };

  const qrBill = new SwissQRBill(qrData, { language: "FR" });
  qrBill.attachTo(doc);
}

export async function generateInvoicePdf(invoice: InvoiceRecord): Promise<Buffer> {
  const margin = 50;
  const bottomMargin =
    invoice.type === "facture" ? QR_SLIP_HEIGHT + 20 : margin;

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: margin, bottom: bottomMargin, left: margin, right: margin },
    bufferPages: true,
  });

  const bufferPromise = pdfBuffer(doc);

  drawHeader(doc, invoice, margin);
  drawClientBlock(doc, invoice);
  drawLineItems(doc, invoice);
  drawTotals(doc, invoice);
  drawNotes(doc, invoice);
  drawPaymentInfo(doc, invoice);

  if (invoice.type === "facture") {
    attachQrBill(doc, invoice);
  } else {
    doc.moveDown(2);
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor(MUTED)
      .text(
        "Ce devis est une proposition commerciale. Les montants sont en CHF, TVA non comprise.",
      );
  }

  doc.end();
  return bufferPromise;
}

export function getInvoicePdfFilename(invoice: InvoiceRecord) {
  return `${invoice.number.replace(/\s+/g, "-")}.pdf`;
}

export { formatDocDate };
