"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  Mail,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { InvoiceClientPicker } from "@/app/components/invoice-client-picker";
import type { AdminClientOption } from "@/lib/admin-clients";
import {
  BASE_OFFER,
  DEFAULT_SELECTED_OPTION_IDS,
  SITE_OPTIONS,
  computeTotal,
  formatChf,
} from "@/lib/options";
import {
  computeInvoiceTotals,
  computeLineTotal,
  type InvoiceLineItem,
  type InvoiceStatus,
  type InvoiceType,
} from "@/lib/invoice-types";
import { defaultDueDate, defaultValidUntil } from "@/lib/invoice-types";
import type { AdminInvoice } from "@/lib/invoice-data";

type InvoiceEditorProps = {
  initial?: AdminInvoice;
  existingClients?: AdminClientOption[];
};

function newLineItem(partial?: Partial<InvoiceLineItem>): InvoiceLineItem {
  return {
    id: crypto.randomUUID(),
    label: "",
    quantity: 1,
    unitPrice: 0,
    isCustom: true,
    ...partial,
  };
}

function defaultLineItems(): InvoiceLineItem[] {
  const ids = [BASE_OFFER.id, ...DEFAULT_SELECTED_OPTION_IDS];
  return ids.map((optionId) => {
    const option =
      optionId === BASE_OFFER.id
        ? BASE_OFFER
        : SITE_OPTIONS.find((o) => o.id === optionId);
    if (!option) return newLineItem();
    return {
      id: crypto.randomUUID(),
      optionId: option.id,
      label: option.label,
      description: option.description,
      quantity: 1,
      unitPrice: option.price,
      isCustom: false,
    };
  });
}

const inputClass =
  "block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-black/30";

const labelClass = "t-mono !text-black/70 !text-[0.625rem]";

export function InvoiceEditor({ initial, existingClients = [] }: InvoiceEditorProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [type, setType] = useState<InvoiceType>(initial?.type ?? "devis");
  const [status, setStatus] = useState<InvoiceStatus>(
    initial?.status ?? "draft",
  );
  const [clientName, setClientName] = useState(initial?.client_name ?? "");
  const [clientEmail, setClientEmail] = useState(initial?.client_email ?? "");
  const [clientPhone, setClientPhone] = useState(initial?.client_phone ?? "");
  const [clientAddress, setClientAddress] = useState(
    initial?.client_address ?? "",
  );
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>(
    initial?.line_items?.length ? initial.line_items : defaultLineItems(),
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [validUntil, setValidUntil] = useState(
    initial?.valid_until ?? defaultValidUntil(),
  );
  const [dueDate, setDueDate] = useState(initial?.due_date ?? defaultDueDate());
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [busy, setBusy] = useState<"save" | "send" | "delete" | null>(null);
  const [error, setError] = useState("");

  const totals = useMemo(() => computeInvoiceTotals(lineItems), [lineItems]);

  const catalogOptions = useMemo(
    () =>
      SITE_OPTIONS.filter(
        (option) => !lineItems.some((item) => item.optionId === option.id),
      ),
    [lineItems],
  );

  function applyExistingClient(client: AdminClientOption) {
    setClientName(client.name);
    setClientEmail(client.email);
    setClientPhone(client.phone);
    if (client.address) setClientAddress(client.address);

    if (client.selectedIds.length > 0) {
      setLineItems(quotePresetLineItems(client.selectedIds));
    }

    if (client.message.trim()) {
      setNotes(client.message.trim());
    }
  }

  function addCatalogOption() {
    if (!selectedOptionId) return;
    const option = SITE_OPTIONS.find((o) => o.id === selectedOptionId);
    if (!option) return;

    setLineItems((items) => [
      ...items,
      {
        id: crypto.randomUUID(),
        optionId: option.id,
        label: option.label,
        description: option.description,
        quantity: 1,
        unitPrice: option.price,
        isCustom: false,
      },
    ]);
    setSelectedOptionId("");
  }

  function addCustomLine() {
    setLineItems((items) => [...items, newLineItem()]);
  }

  function updateLine(id: string, patch: Partial<InvoiceLineItem>) {
    setLineItems((items) =>
      items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  function removeLine(id: string) {
    setLineItems((items) => items.filter((item) => item.id !== id));
  }

  function buildPayload() {
    return {
      type,
      status,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      lineItems,
      notes,
      validUntil: type === "devis" ? validUntil : undefined,
      dueDate: type === "facture" ? dueDate : undefined,
    };
  }

  async function handleSave() {
    setError("");
    setBusy("save");

    try {
      const payload = buildPayload();
      const url = isEdit
        ? `/api/admin/invoices/${initial!.id}`
        : "/api/admin/invoices";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'enregistrement.");
        return;
      }

      if (!isEdit) {
        router.push(`/admin/factures/${data.invoice.id}`);
        router.refresh();
        return;
      }

      router.refresh();
    } catch {
      setError("Erreur réseau.");
    } finally {
      setBusy(null);
    }
  }

  async function handleDownloadPdf() {
    if (!isEdit) {
      setError("Enregistrez le document avant d'exporter le PDF.");
      return;
    }

    window.open(`/api/admin/invoices/${initial!.id}/pdf`, "_blank");
  }

  async function handleSendEmail() {
    if (!isEdit) {
      setError("Enregistrez le document avant l'envoi.");
      return;
    }

    if (!clientEmail.trim()) {
      setError("Indiquez l'email du client.");
      return;
    }

    setError("");
    setBusy("send");

    try {
      await handleSave();

      const res = await fetch(`/api/admin/invoices/${initial!.id}/send`, {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'envoi.");
        return;
      }

      setStatus("sent");
      router.refresh();
    } catch {
      setError("Erreur réseau.");
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete() {
    if (!isEdit || !confirm("Supprimer ce document ?")) return;

    setBusy("delete");
    try {
      const res = await fetch(`/api/admin/invoices/${initial!.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setError("Impossible de supprimer.");
        return;
      }
      router.push("/admin/factures");
      router.refresh();
    } catch {
      setError("Erreur réseau.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="admin-invoice-editor">
      <div className="admin-invoice-toolbar">
        <div className="admin-invoice-type-toggle">
          <button
            type="button"
            className={type === "devis" ? "active" : ""}
            onClick={() => setType("devis")}
          >
            Devis
          </button>
          <button
            type="button"
            className={type === "facture" ? "active" : ""}
            onClick={() => setType("facture")}
          >
            Facture
          </button>
        </div>

        <div className="admin-invoice-actions">
          {isEdit && (
            <button
              type="button"
              className="btn-outline !py-2 !px-4"
              onClick={handleDownloadPdf}
            >
              <Download size={14} strokeWidth={2} aria-hidden />
              PDF
            </button>
          )}
          {isEdit && (
            <button
              type="button"
              className="btn-outline !py-2 !px-4"
              onClick={handleSendEmail}
              disabled={busy !== null}
            >
              <Mail size={14} strokeWidth={2} aria-hidden />
              {busy === "send" ? "Envoi…" : "Envoyer"}
            </button>
          )}
          <button
            type="button"
            className="btn-primary !py-2 !px-4"
            onClick={handleSave}
            disabled={busy !== null}
          >
            <Save size={14} strokeWidth={2} aria-hidden />
            {busy === "save" ? "Enregistrement…" : "Enregistrer"}
          </button>
          {isEdit && (
            <button
              type="button"
              className="admin-invoice-delete"
              onClick={handleDelete}
              disabled={busy !== null}
              aria-label="Supprimer"
            >
              <Trash2 size={16} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="admin-invoice-error" role="alert">
          {error}
        </p>
      )}

      <div className="admin-invoice-grid">
        <section className="admin-invoice-panel">
          <h2 className="admin-invoice-panel-title">Client</h2>
          {existingClients.length > 0 && (
            <InvoiceClientPicker
              clients={existingClients}
              onSelect={applyExistingClient}
            />
          )}
          <div className="admin-invoice-fields">
            <label className="admin-invoice-field">
              <span className={labelClass}>Nom *</span>
              <input
                className={inputClass}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Entreprise ou personne"
              />
            </label>
            <label className="admin-invoice-field">
              <span className={labelClass}>Email</span>
              <input
                type="email"
                className={inputClass}
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@example.ch"
              />
            </label>
            <label className="admin-invoice-field">
              <span className={labelClass}>Téléphone</span>
              <input
                type="tel"
                className={inputClass}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="078 000 00 00"
              />
            </label>
            <label className="admin-invoice-field admin-invoice-field-full">
              <span className={labelClass}>Adresse</span>
              <textarea
                className={`${inputClass} min-h-[88px] resize-y`}
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder={"Rue Example 1\n1000 Lausanne"}
              />
            </label>
          </div>
        </section>

        <section className="admin-invoice-panel">
          <h2 className="admin-invoice-panel-title">Document</h2>
          <div className="admin-invoice-fields">
            <label className="admin-invoice-field">
              <span className={labelClass}>Statut</span>
              <select
                className={inputClass}
                value={status}
                onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
              >
                <option value="draft">Brouillon</option>
                <option value="sent">Envoyé</option>
                <option value="paid">Payé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </label>
            {type === "devis" ? (
              <label className="admin-invoice-field">
                <span className={labelClass}>Valable jusqu'au</span>
                <input
                  type="date"
                  className={inputClass}
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </label>
            ) : (
              <label className="admin-invoice-field">
                <span className={labelClass}>Échéance</span>
                <input
                  type="date"
                  className={inputClass}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </label>
            )}
            {isEdit && (
              <div className="admin-invoice-field">
                <span className={labelClass}>Numéro</span>
                <p className="text-sm font-mono font-medium text-black">
                  {initial!.number}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="admin-invoice-panel mt-6">
        <div className="admin-invoice-lines-header">
          <h2 className="admin-invoice-panel-title !mb-0">Lignes</h2>
          <div className="admin-invoice-lines-tools">
            <select
              className={inputClass}
              value={selectedOptionId}
              onChange={(e) => setSelectedOptionId(e.target.value)}
            >
              <option value="">Ajouter une option du catalogue…</option>
              {catalogOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label} — {formatChf(option.price)}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn-outline !py-2 !px-4 shrink-0"
              onClick={addCatalogOption}
              disabled={!selectedOptionId}
            >
              <Plus size={14} strokeWidth={2} aria-hidden />
              Option
            </button>
            <button
              type="button"
              className="btn-outline !py-2 !px-4 shrink-0"
              onClick={addCustomLine}
            >
              <Plus size={14} strokeWidth={2} aria-hidden />
              Ligne custom
            </button>
          </div>
        </div>

        <div className="admin-invoice-lines">
          {lineItems.map((item) => (
            <div key={item.id} className="admin-invoice-line">
              <div className="admin-invoice-line-main">
                <input
                  className={inputClass}
                  value={item.label}
                  onChange={(e) =>
                    updateLine(item.id, {
                      label: e.target.value,
                      isCustom: !item.optionId,
                    })
                  }
                  placeholder="Description"
                />
                <input
                  className={`${inputClass} admin-invoice-line-qty`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateLine(item.id, {
                      quantity: Number(e.target.value) || 1,
                    })
                  }
                />
                <input
                  className={`${inputClass} admin-invoice-line-price`}
                  type="number"
                  min={0}
                  step={10}
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateLine(item.id, {
                      unitPrice: Number(e.target.value) || 0,
                    })
                  }
                />
                <span className="admin-invoice-line-total">
                  {formatChf(computeLineTotal(item))}
                </span>
                <button
                  type="button"
                  className="admin-invoice-line-remove"
                  onClick={() => removeLine(item.id)}
                  aria-label="Retirer la ligne"
                >
                  <Trash2 size={14} strokeWidth={1.75} />
                </button>
              </div>
              <input
                className={`${inputClass} mt-2`}
                value={item.description ?? ""}
                onChange={(e) =>
                  updateLine(item.id, { description: e.target.value })
                }
                placeholder="Description détaillée (optionnel)"
              />
            </div>
          ))}
        </div>

        <div className="admin-invoice-summary">
          <div>
            <span className={labelClass}>Sous-total</span>
            <p className="text-sm font-medium text-black">
              {formatChf(totals.subtotal)}
            </p>
          </div>
          <div>
            <span className={labelClass}>Total</span>
            <p className="text-lg font-medium text-red">
              {formatChf(totals.total)}
            </p>
          </div>
          {type === "facture" && (
            <p className="admin-invoice-qr-note">
              Le PDF inclura un QR-facture suisse (IBAN BCV).
            </p>
          )}
        </div>
      </section>

      <section className="admin-invoice-panel mt-6">
        <h2 className="admin-invoice-panel-title">Notes</h2>
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Conditions, remarques, délais…"
        />
      </section>
    </div>
  );
}

export function quotePresetLineItems(selectedIds: string[]): InvoiceLineItem[] {
  const ids = [
    BASE_OFFER.id,
    ...selectedIds.filter((id) => SITE_OPTIONS.some((o) => o.id === id)),
  ];

  return [...new Set(ids)].map((optionId) => {
    const option =
      optionId === BASE_OFFER.id
        ? BASE_OFFER
        : SITE_OPTIONS.find((o) => o.id === optionId)!;
    return {
      id: crypto.randomUUID(),
      optionId: option.id,
      label: option.label,
      description: option.description,
      quantity: 1,
      unitPrice: option.price,
      isCustom: false,
    };
  });
}

export function quotePresetTotal(selectedIds: string[]) {
  return computeTotal(selectedIds);
}
