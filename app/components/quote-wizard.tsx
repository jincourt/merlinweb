"use client";

import {
  DEFAULT_SELECTED_OPTION_IDS,
  OPTION_FILTERS,
  SITE_OPTIONS,
  computeTotal,
  filterOptionsByCategory,
  formatChf,
  formatOptionPrice,
  type OptionFilterId,
} from "@/lib/options";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";
import { PromoBasePrice } from "./promo-base-price";

const STEPS = ["Contact", "Options", "Envoi"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()./-]{8,20}$/;

function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim());
}

function isValidPhone(value: string) {
  const v = value.trim();
  if (!v) return false;
  const digits = v.replace(/\D/g, "");
  return PHONE_RE.test(v) && digits.length >= 8 && digits.length <= 15;
}

const stepTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

function OptionLabel({
  label,
  footnote,
}: {
  label: string;
  footnote?: string;
}) {
  return (
    <>
      {label}
      {footnote ? <span className="text-red">*</span> : null}
    </>
  );
}

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED_OPTION_IDS);
  const [categoryFilter, setCategoryFilter] = useState<OptionFilterId>("all");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const total = useMemo(() => computeTotal(selected), [selected]);
  const selectedOptions = SITE_OPTIONS.filter((o) => selected.includes(o.id));
  const filteredOptions = useMemo(
    () => filterOptionsByCategory(categoryFilter),
    [categoryFilter],
  );

  function toggleOption(id: string) {
    const option = SITE_OPTIONS.find((o) => o.id === id);
    if (option?.locked) return;

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function next() {
    if (step === 0) {
      const hasEmail = email.trim().length > 0;
      const hasPhone = phone.trim().length > 0;

      if (!hasEmail && !hasPhone) {
        setErrorMsg("Indiquez un email ou un téléphone.");
        return;
      }
      if (hasEmail && !isValidEmail(email)) {
        setErrorMsg("Adresse email invalide.");
        return;
      }
      if (hasPhone && !isValidPhone(phone)) {
        setErrorMsg("Numéro de téléphone invalide.");
        return;
      }
    }
    setErrorMsg("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setErrorMsg("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          selectedIds: selected,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Erreur lors de l'envoi.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Erreur réseau. Réessayez.");
    }
  }

  if (status === "success") {
    const reach = [email.trim(), phone.trim()].filter(Boolean).join(" · ");
    return (
      <MotionDiv immediate className="wizard-panel text-center py-12">
        <p className="t-mono !text-black">Demande envoyée</p>
        <p className="t-display mt-4 text-2xl sm:text-3xl">
          Merci pour votre confiance
          <span className="text-red">.</span>
        </p>
        <p className="t-body mt-4">
          Nous revenons vers vous sous 24h
          {reach ? (
            <>
              {" "}
              via <span className="text-black font-medium">{reach}</span>
            </>
          ) : null}
          .
        </p>
        <p className="t-mono mt-6">
          Total estimé · {formatChf(total, { approximate: true })}
        </p>
      </MotionDiv>
    );
  }

  return (
    <div className="wizard-panel">
      {/* Step indicator */}
      <MotionStagger
        immediate
        className="flex items-center gap-2 mb-8"
        stagger={0.06}
      >
        {STEPS.map((label, i) => (
          <MotionItem key={label} soft className="flex items-center gap-2">
            <span
              className={`wizard-step ${i === step ? "wizard-step-active" : i < step ? "wizard-step-done" : ""}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`t-mono hidden sm:inline ${i === step ? "!text-black" : ""}`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="w-6 h-px bg-border mx-1" aria-hidden="true" />
            )}
          </MotionItem>
        ))}
      </MotionStagger>

      <AnimatePresence mode="wait">
        {/* Step 1 — Contact */}
        {step === 0 && (
          <motion.div key="contact" {...stepTransition} className="space-y-5">
            <div>
              <label htmlFor="email" className="t-mono">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@entreprise.ch"
                className="wizard-input mt-3"
                autoComplete="email"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="phone" className="t-mono">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="078 604 15 44"
                className="wizard-input mt-3"
                autoComplete="tel"
              />
            </div>
            <p className="t-body text-sm">
              Remplissez au moins un des deux champs pour que l&apos;on vous
              recontacte.
            </p>
          </motion.div>
        )}

        {/* Step 2 — Options */}
        {step === 1 && (
          <motion.div key="options" {...stepTransition}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="t-mono">Modules optionnels</p>
                <p className="t-body mt-1 text-sm">
                  Base incluse · <PromoBasePrice />
                </p>
              </div>
              <p className="t-mono !text-black">
                Total ·{" "}
                <span className="text-red">
                  {formatChf(total, { approximate: true })}
                </span>
              </p>
            </div>

            <div className="option-filters mb-4">
              {OPTION_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setCategoryFilter(filter.id)}
                  aria-pressed={categoryFilter === filter.id}
                  className={`option-filter ${categoryFilter === filter.id ? "option-filter-active" : ""}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <MotionStagger
              immediate
              className="grid gap-2 max-h-[420px] overflow-y-auto pr-1"
              stagger={0.04}
            >
              {filteredOptions.map((option) => {
                const isSelected = selected.includes(option.id);
                const isLocked = option.locked === true;
                return (
                  <MotionItem key={option.id} soft>
                    <button
                      type="button"
                      onClick={() => toggleOption(option.id)}
                      aria-pressed={isSelected}
                      aria-disabled={isLocked}
                      className={`option-card w-full ${isSelected ? "option-card-selected" : ""} ${isLocked ? "option-card-locked" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-left">
                          <p className="text-[0.9375rem] font-medium text-black">
                            <OptionLabel
                              label={option.label}
                              footnote={option.footnote}
                            />
                          </p>
                          <p className="mt-1 text-sm text-muted leading-relaxed">
                            {option.description}
                          </p>
                          {option.footnote ? (
                            <p className="mt-2 text-xs text-muted leading-relaxed">
                              <span className="text-red">*</span> {option.footnote}
                            </p>
                          ) : null}
                        </div>
                        {!option.hidePrice && (
                          <span className="t-mono shrink-0 !text-black">
                            {formatOptionPrice(option)}
                          </span>
                        )}
                      </div>
                    </button>
                  </MotionItem>
                );
              })}
            </MotionStagger>
          </motion.div>
        )}

        {/* Step 3 — Récap */}
        {step === 2 && (
          <motion.div key="recap" {...stepTransition}>
            <p className="t-mono">Récapitulatif</p>

            <div className="mt-6 space-y-0">
              <div className="spec-row">
                <span className="t-mono">Site de base</span>
                <span className="text-[0.9375rem] font-medium text-black">
                  <PromoBasePrice />
                </span>
              </div>
              {selectedOptions.length > 0 ? (
                selectedOptions.map((o) => (
                  <div key={o.id} className="spec-row">
                    <span className="t-mono">
                      <OptionLabel label={o.label} footnote={o.footnote} />
                      {o.footnote ? (
                        <span className="mt-0.5 block !normal-case !tracking-normal text-[0.6875rem] text-muted">
                          * {o.footnote}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-[0.9375rem] font-medium text-black">
                      {o.hidePrice
                        ? "—"
                        : formatOptionPrice(o)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="spec-row">
                  <span className="t-mono">Options</span>
                  <span className="text-[0.9375rem] text-muted">Aucune</span>
                </div>
              )}
              {email.trim() && (
                <div className="spec-row">
                  <span className="t-mono">Email</span>
                  <span className="text-[0.9375rem] font-medium text-black">
                    {email.trim()}
                  </span>
                </div>
              )}
              {phone.trim() && (
                <div className="spec-row">
                  <span className="t-mono">Téléphone</span>
                  <span className="text-[0.9375rem] font-medium text-black">
                    {phone.trim()}
                  </span>
                </div>
              )}
              <div className="spec-row border-b-0">
                <span className="t-mono">Total estimé</span>
                <span className="text-[0.9375rem] font-medium text-red">
                  {formatChf(total, { approximate: true })}
                </span>
              </div>
            </div>

            <label htmlFor="message" className="t-mono mt-8 block">
              Message (optionnel)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décrivez brièvement votre projet…"
              rows={3}
              className="wizard-input mt-3 resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {errorMsg && (
        <MotionDiv immediate soft>
          <p className="mt-4 text-sm text-error" role="alert">
            {errorMsg}
          </p>
        </MotionDiv>
      )}

      {/* Navigation */}
      <MotionDiv
        immediate
        soft
        delay={0.15}
        className="flex items-center justify-between mt-8 pt-6 rule"
      >
        {step > 0 ? (
          <button type="button" onClick={back} className="btn-outline">
            Retour
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn-primary">
            Continuer
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={status === "loading"}
            className="btn-primary disabled:opacity-50"
          >
            {status === "loading" ? "Envoi…" : "Envoyer la demande"}
          </button>
        )}
      </MotionDiv>
    </div>
  );
}
