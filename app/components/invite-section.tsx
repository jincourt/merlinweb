"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import { isValidPhone } from "@/lib/phone";
import { MotionDiv } from "./motion";

const inputOnDark =
  "block w-full rounded-xl border border-[var(--border-on-dark)] bg-white/5 px-4 py-3.5 text-[0.9375rem] text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/40";

export function InviteSection() {
  const content = useIntlayer("forms");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setCopied(false);

    if (!isValidPhone(phone)) {
      setErrorMsg(content.errorPhone);
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? content.inviteErrorCreate);
        return;
      }

      setLink(data.link);
      setCode(data.code);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMsg(content.errorNetwork);
    }
  }

  async function copyLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback ignored */
    }
  }

  return (
    <section className="bg-gray-dark text-white border-t border-[var(--border-on-dark)]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pt-28 sm:pt-40 pb-28 sm:pb-40">
        <MotionDiv immediate className="mx-auto max-w-2xl text-center">
          <h2 className="t-display text-[clamp(2rem,5vw,3.25rem)] text-white">
            {content.inviteTitle}
          </h2>

          <p className="t-body-on-dark mt-6 max-w-lg mx-auto">{content.inviteBody}</p>

          <form onSubmit={handleSubmit} className="mt-10 mx-auto max-w-xl text-left">
            <label htmlFor="invite-phone" className="t-mono-on-dark">
              {content.invitePhoneLabel}
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="invite-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={content.phonePlaceholder}
                className={`${inputOnDark} flex-1`}
                autoComplete="tel"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary shrink-0 justify-center disabled:opacity-50"
              >
                {status === "loading" ? content.inviteGenerating : content.inviteGetLink}
              </button>
            </div>

            {errorMsg ? (
              <p className="mt-3 text-sm text-red/90" role="alert">
                {errorMsg}
              </p>
            ) : null}
          </form>

          {link && code ? (
            <MotionDiv immediate soft className="mt-8 mx-auto max-w-xl text-left">
              <p className="t-mono-on-dark !text-white/85">{content.inviteShareLink}</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  readOnly
                  value={link}
                  className={`${inputOnDark} flex-1 font-mono text-sm`}
                  aria-label={content.inviteLinkAria}
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="btn-outline-white shrink-0 justify-center"
                >
                  {copied ? (
                    <>
                      <Check size={14} strokeWidth={2} aria-hidden />
                      {content.copied}
                    </>
                  ) : (
                    <>
                      <Copy size={14} strokeWidth={2} aria-hidden />
                      {content.copy}
                    </>
                  )}
                </button>
              </div>
              <p className="t-body-on-dark mt-3 text-sm">
                {content.associatedCode}{" "}
                <span className="font-mono font-medium text-white">{code}</span>
              </p>
            </MotionDiv>
          ) : null}
        </MotionDiv>
      </div>
    </section>
  );
}
