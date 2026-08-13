"use client";

import { useMemo, useState } from "react";
import { Search, UserRound } from "lucide-react";
import type { AdminClientOption } from "@/lib/admin-clients";

type InvoiceClientPickerProps = {
  clients: AdminClientOption[];
  onSelect: (client: AdminClientOption) => void;
};

export function InvoiceClientPicker({
  clients,
  onSelect,
}: InvoiceClientPickerProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return clients.slice(0, 8);
    return clients
      .filter((client) => client.searchText.includes(normalizedQuery))
      .slice(0, 8);
  }, [clients, normalizedQuery]);

  if (clients.length === 0) return null;

  function handleSelect(client: AdminClientOption) {
    onSelect(client);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="admin-client-picker">
      <label className="admin-client-picker-label">
        <UserRound size={14} strokeWidth={1.75} aria-hidden />
        Client existant
      </label>
      <div className="admin-search-field">
        <Search size={16} strokeWidth={1.75} aria-hidden className="admin-search-icon" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 120);
          }}
          placeholder="Rechercher un client existant…"
          className="admin-search-input"
          aria-label="Rechercher un client existant"
          aria-expanded={open}
          aria-controls="invoice-client-picker-list"
        />
      </div>

      {open && filtered.length > 0 && (
        <ul id="invoice-client-picker-list" className="admin-client-picker-list" role="listbox">
          {filtered.map((client) => (
            <li key={client.id}>
              <button
                type="button"
                className="admin-client-picker-option"
                role="option"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(client)}
              >
                <span className="admin-client-picker-option-name">{client.label}</span>
                <span className="admin-client-picker-option-meta">
                  {client.sublabel}
                  {client.totalFormatted ? ` · ${client.totalFormatted}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && normalizedQuery && filtered.length === 0 && (
        <p className="admin-client-picker-empty">Aucun client trouvé.</p>
      )}
    </div>
  );
}
