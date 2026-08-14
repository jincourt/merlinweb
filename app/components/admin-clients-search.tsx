"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { formatAdminDate } from "@/lib/admin-format";
import type { AdminQuote } from "@/lib/admin-data";

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function quoteMatchesSearch(quote: AdminQuote, query: string) {
  if (!query) return true;

  const haystack = [
    quote.email,
    quote.phone,
    quote.invite_code,
    quote.message,
    quote.totalFormatted,
    String(quote.total),
    quote.status === "draft" ? "brouillon" : "soumis",
    ...quote.optionLabels,
    ...quote.selected_ids,
    formatAdminDate(quote.created_at),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

type AdminClientsSearchProps = {
  quotes: AdminQuote[];
};

export function AdminClientsSearch({ quotes }: AdminClientsSearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearch(query);

  const filtered = useMemo(
    () => quotes.filter((quote) => quoteMatchesSearch(quote, normalizedQuery)),
    [quotes, normalizedQuery],
  );

  if (quotes.length === 0) {
    return (
      <div className="admin-empty">
        <p className="t-body">Aucune demande pour le moment.</p>
        <Link href="/#devis" className="btn-outline mt-6">
          Voir le formulaire
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="admin-search-bar">
        <div className="admin-search-field">
          <Search size={16} strokeWidth={1.75} aria-hidden className="admin-search-icon" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un client (email, téléphone, code, option…)"
            className="admin-search-input"
            aria-label="Rechercher un client"
          />
        </div>
        {normalizedQuery && (
          <span className="admin-search-count">
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <p className="t-body">Aucun client ne correspond à « {query} ».</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Statut</th>
                <th>Contact</th>
                <th>Options</th>
                <th>Total</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((quote) => (
                <tr key={quote.id}>
                  <td className="admin-table-date">
                    {formatAdminDate(quote.created_at)}
                  </td>
                  <td>
                    <span
                      className={`admin-table-tag${
                        quote.status === "draft" ? " admin-table-tag-muted" : ""
                      }`}
                    >
                      {quote.status === "draft" ? "Brouillon" : "Soumis"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-contact">
                      {quote.email && (
                        <a href={`mailto:${quote.email}`}>{quote.email}</a>
                      )}
                      {quote.phone && (
                        <a href={`tel:${quote.phone.replace(/\s/g, "")}`}>
                          {quote.phone}
                        </a>
                      )}
                      {quote.invite_code && (
                        <span className="admin-table-tag">
                          Code {quote.invite_code}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <ul className="admin-table-options">
                      {quote.optionLabels.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="admin-table-total">{quote.totalFormatted}</td>
                  <td className="admin-table-message">
                    {quote.message || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
