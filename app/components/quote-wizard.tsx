"use client";

import { DEFAULT_SELECTED_OPTION_IDS, type SiteOption } from "@/lib/options";
import { useLocalizedOptions } from "@/lib/use-localized-options";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { useMemo, useRef, useState, useEffect } from "react";
import { MotionDiv, MotionItem, MotionStagger } from "./motion";
import { PromoBasePrice } from "./promo-base-price";
import { useInviteCode } from "./invite-provider";

const CONTACT_STEP = 0;
const OPTIONS_STEP = 1;
const CUSTOM_OPTION_ID = "personnalise";
const QUOTE_ID_KEY = "merlin_quote_id";

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

function OptionCategoryTabs({
  activeIndex,
  optionCategories,
}: {
  activeIndex: number;
  optionCategories: { id: string; label: string }[];
}) {
  return (
    <div className="option-filters mb-4">
      {optionCategories.map((category, index) => (
        <span
          key={category.id}
          aria-current={index === activeIndex ? "step" : undefined}
          className={`option-filter pointer-events-none ${
            index === activeIndex ? "option-filter-active" : ""
          }`}
        >
          {category.label}
        </span>
      ))}
    </div>
  );
}

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function filterOptionsBySearch(options: SiteOption[], query: string) {
  const normalized = normalizeSearch(query);
  if (!normalized) return options;

  return options.filter((option) => {
    const haystack = [option.label, option.description, option.detail ?? ""]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

function getCategoryLabel(
  categoryId: SiteOption["category"],
  optionCategories: { id: string; label: string }[],
) {
  return optionCategories.find((c) => c.id === categoryId)?.label ?? categoryId;
}

type FormsContent = ReturnType<typeof useIntlayer<"forms">>;

function OptionsPanel({
  categoryIndex,
  selected,
  customRequest,
  onToggle,
  onCustomRequestChange,
  siteOptions,
  optionCategories,
  content,
}: {
  categoryIndex: number;
  selected: string[];
  customRequest: string;
  onToggle: (id: string) => void;
  onCustomRequestChange: (value: string) => void;
  siteOptions: SiteOption[];
  optionCategories: { id: string; label: string }[];
  content: FormsContent;
}) {
  const customInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const category = optionCategories[categoryIndex];
  const categoryOptions = useMemo(
    () => siteOptions.filter((option) => option.category === category.id),
    [siteOptions, category.id],
  );
  const isSearching = normalizeSearch(searchQuery).length > 0;
  const displayedOptions = useMemo(() => {
    if (isSearching) {
      return filterOptionsBySearch(siteOptions, searchQuery);
    }
    return categoryOptions;
  }, [isSearching, searchQuery, categoryOptions, siteOptions]);

  function handleToggle(id: string) {
    onToggle(id);
    if (id === CUSTOM_OPTION_ID && !selected.includes(id)) {
      requestAnimationFrame(() => customInputRef.current?.focus());
    }
  }

  function openSearch() {
    setSearchOpen(true);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  return (
    <motion.div key={category.id} {...stepTransition}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="t-mono">{content.optionalModules}</p>
          <p className="t-body mt-1 text-sm">
            {content.baseIncluded} <PromoBasePrice />
          </p>
        </div>
        <button
          type="button"
          className={`wizard-search-toggle${searchOpen ? " wizard-search-toggle-active" : ""}`}
          onClick={() => (searchOpen ? closeSearch() : openSearch())}
          aria-label={searchOpen ? content.closeSearch : content.searchOption}
          aria-expanded={searchOpen}
        >
          {searchOpen ? (
            <X size={16} strokeWidth={1.75} aria-hidden />
          ) : (
            <Search size={16} strokeWidth={1.75} aria-hidden />
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {searchOpen && (
          <motion.div
            key="search"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="wizard-search-bar mb-4">
              <Search
                size={15}
                strokeWidth={1.75}
                className="wizard-search-bar-icon"
                aria-hidden
              />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="wizard-search-input"
                aria-label={content.searchInOptions}
              />
              {isSearching && (
                <span className="wizard-search-count">
                  {displayedOptions.length}{" "}
                  {displayedOptions.length !== 1
                    ? content.results
                    : content.result}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isSearching && (
        <OptionCategoryTabs
          activeIndex={categoryIndex}
          optionCategories={optionCategories}
        />
      )}

      <MotionStagger
        immediate
        className="grid gap-2 max-h-[420px] overflow-y-auto pr-1"
        stagger={0.04}
      >
        {displayedOptions.length === 0 ? (
          <p className="t-body py-8 text-center text-sm">
            {content.noSearchResults}
          </p>
        ) : (
          displayedOptions.map((option) => {
            const isSelected = selected.includes(option.id);
            const isLocked = option.locked === true;
            const isCustom = option.id === CUSTOM_OPTION_ID;

            return (
              <MotionItem key={option.id} soft>
                <div
                  className={`option-card w-full ${isSelected ? "option-card-selected" : ""} ${isLocked ? "option-card-locked" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(option.id)}
                    aria-pressed={isSelected}
                    aria-disabled={isLocked}
                    className="w-full text-left"
                  >
                    <div>
                      {isSearching && (
                        <p className="t-mono mb-1 !text-[0.5625rem] !text-muted">
                          {getCategoryLabel(option.category, optionCategories)}
                        </p>
                      )}
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
                  </button>

                  {isCustom && isSelected && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <label
                        htmlFor="custom-request"
                        className="t-mono !text-[0.625rem]"
                      >
                        {content.describeNeed}
                      </label>
                      <input
                        ref={customInputRef}
                        id="custom-request"
                        type="text"
                        value={customRequest}
                        onChange={(e) => onCustomRequestChange(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder={content.customPlaceholder}
                        className="wizard-input mt-2"
                      />
                    </div>
                  )}
                </div>
              </MotionItem>
            );
          })
        )}
      </MotionStagger>
    </motion.div>
  );
}

function buildSubmissionMessage(
  message: string,
  customRequest: string,
  customNeedPrefix: string,
) {
  const parts: string[] = [];

  if (customRequest.trim()) {
    parts.push(`${customNeedPrefix} ${customRequest.trim()}`);
  }
  if (message.trim()) {
    parts.push(message.trim());
  }

  return parts.join("\n\n");
}

export function QuoteWizard() {
  const content = useIntlayer("forms");
  const site = useIntlayer("site");
  const { siteOptions, optionCategories } = useLocalizedOptions();
  const inviteCode = useInviteCode();
  const [step, setStep] = useState(0);
  const [optionPhase, setOptionPhase] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED_OPTION_IDS);
  const [customRequest, setCustomRequest] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [quoteId, setQuoteId] = useState<string | null>(null);

  const steps = useMemo(
    () => [content.stepContact, content.stepModules],
    [content.stepContact, content.stepModules],
  );

  useEffect(() => {
    const stored = sessionStorage.getItem(QUOTE_ID_KEY);
    if (stored) setQuoteId(stored);
  }, []);

  const isLastOptionPhase = optionPhase >= optionCategories.length - 1;

  function toggleOption(id: string) {
    const option = siteOptions.find((o) => o.id === id);
    if (option?.locked) return;

    setSelected((prev) => {
      if (prev.includes(id)) {
        if (id === CUSTOM_OPTION_ID) setCustomRequest("");
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  }

  function validateContactFields() {
    const hasEmail = email.trim().length > 0;
    const hasPhone = phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      setErrorMsg(content.errorContactRequired);
      return false;
    }
    if (hasEmail && !isValidEmail(email)) {
      setErrorMsg(content.errorEmail);
      return false;
    }
    if (hasPhone && !isValidPhone(phone)) {
      setErrorMsg(content.errorPhone);
      return false;
    }

    return true;
  }

  function validateSubmission() {
    if (!validateContactFields()) return false;
    if (selected.includes(CUSTOM_OPTION_ID) && !customRequest.trim()) {
      setErrorMsg(content.errorCustomNeed);
      return false;
    }
    return true;
  }

  async function captureLead() {
    try {
      const res = await fetch("/api/quote/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          inviteCode: inviteCode ?? undefined,
          quoteId: quoteId ?? undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? content.errorSaveContact);
        return;
      }

      if (typeof data.id === "string") {
        setQuoteId(data.id);
        sessionStorage.setItem(QUOTE_ID_KEY, data.id);
      }
    } catch {
      setErrorMsg(content.errorNetwork);
    }
  }

  function next() {
    if (step === CONTACT_STEP) {
      if (!validateContactFields()) return;
      setErrorMsg("");
      setStep(OPTIONS_STEP);
      setOptionPhase(0);
      void captureLead();
      return;
    }

    if (step === OPTIONS_STEP && !isLastOptionPhase) {
      if (selected.includes(CUSTOM_OPTION_ID) && !customRequest.trim()) {
        setErrorMsg(content.errorCustomNeed);
        return;
      }
      setErrorMsg("");
      setOptionPhase((p) => p + 1);
      return;
    }

    if (selected.includes(CUSTOM_OPTION_ID) && !customRequest.trim()) {
      setErrorMsg(content.errorCustomNeed);
      return;
    }

    void submit();
  }

  function back() {
    setErrorMsg("");

    if (step === OPTIONS_STEP && optionPhase > 0) {
      setOptionPhase((p) => p - 1);
      return;
    }

    if (step === OPTIONS_STEP) {
      setStep(CONTACT_STEP);
      return;
    }

    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!validateSubmission()) return;

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
          message: buildSubmissionMessage(
            message,
            customRequest,
            content.customNeedPrefix,
          ),
          inviteCode: inviteCode ?? undefined,
          quoteId: quoteId ?? undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? content.errorSend);
        return;
      }

      setStatus("success");
      sessionStorage.removeItem(QUOTE_ID_KEY);
    } catch {
      setStatus("error");
      setErrorMsg(content.errorNetwork);
    }
  }

  if (status === "success") {
    const reach = [email.trim(), phone.trim()].filter(Boolean).join(" · ");
    return (
      <MotionDiv immediate className="wizard-panel text-center py-12">
        <p className="t-mono !text-black">{content.requestSent}</p>
        <p className="t-display mt-4 text-2xl sm:text-3xl">
          {content.thankYou}
          <span className="text-red">.</span>
        </p>
        <p className="t-body mt-4">
          {content.replyWithin24h}
          {reach ? (
            <>
              {" "}
              {content.via}{" "}
              <span className="text-black font-medium">{reach}</span>
            </>
          ) : null}
          .
        </p>
      </MotionDiv>
    );
  }

  const showBack = step > CONTACT_STEP || (step === OPTIONS_STEP && optionPhase > 0);
  const isLastStep = step === OPTIONS_STEP && isLastOptionPhase;

  return (
    <div className="wizard-panel">
      <MotionStagger
        immediate
        className="flex items-center gap-2 mb-8"
        stagger={0.06}
      >
        {steps.map((label, i) => (
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
            {i < steps.length - 1 && (
              <span className="w-6 h-px bg-border mx-1" aria-hidden="true" />
            )}
          </MotionItem>
        ))}
      </MotionStagger>

      <AnimatePresence mode="wait">
        {step === CONTACT_STEP && (
          <motion.div key="contact" {...stepTransition} className="space-y-5">
            <div>
              <label htmlFor="email" className="t-mono">
                {content.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.emailPlaceholder}
                className="wizard-input mt-3"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="t-mono">
                {content.phone}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={content.phonePlaceholder}
                className="wizard-input mt-3"
                autoComplete="tel"
              />
            </div>
            <div>
              <label htmlFor="message" className="t-mono">
                {content.messageOptional}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={content.messagePlaceholder}
                rows={3}
                className="wizard-input mt-3 resize-none"
              />
            </div>
          </motion.div>
        )}

        {step === OPTIONS_STEP && (
          <OptionsPanel
            categoryIndex={optionPhase}
            selected={selected}
            customRequest={customRequest}
            onToggle={toggleOption}
            onCustomRequestChange={setCustomRequest}
            siteOptions={siteOptions}
            optionCategories={optionCategories}
            content={content}
          />
        )}
      </AnimatePresence>

      {errorMsg && (
        <MotionDiv immediate soft>
          <p className="mt-4 text-sm text-error" role="alert">
            {errorMsg}
          </p>
        </MotionDiv>
      )}

      <MotionDiv
        immediate
        soft
        delay={0.15}
        className="flex items-center justify-between mt-8 pt-6 rule"
      >
        {showBack ? (
          <button type="button" onClick={back} className="btn-outline">
            {site.back}
          </button>
        ) : (
          <span />
        )}

        {isLastStep ? (
          <button
            type="button"
            onClick={submit}
            disabled={status === "loading"}
            className="btn-primary disabled:opacity-50"
          >
            {status === "loading" ? content.sending : site.bookSpot}
          </button>
        ) : (
          <button type="button" onClick={next} className="btn-primary">
            {content.continue}
          </button>
        )}
      </MotionDiv>
    </div>
  );
}
