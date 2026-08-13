"use client";

import { useEffect } from "react";

const VISITOR_KEY = "merlin_visitor_key";
const SESSION_KEY = "merlin_visit_session";

function getOrCreateVisitorKey(): string {
  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;

  const key = crypto.randomUUID();
  localStorage.setItem(VISITOR_KEY, key);
  return key;
}

function readUtmParam(params: URLSearchParams, name: string): string | null {
  const value = params.get(name)?.trim();
  return value || null;
}

export function VisitTracker() {
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/admin")) return;

    const isNewSession = !sessionStorage.getItem(SESSION_KEY);
    const params = new URLSearchParams(window.location.search);

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitor_key: getOrCreateVisitorKey(),
        path: window.location.pathname || "/",
        referrer: document.referrer || null,
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        utm_source: readUtmParam(params, "utm_source"),
        utm_medium: readUtmParam(params, "utm_medium"),
        utm_campaign: readUtmParam(params, "utm_campaign"),
        invite_code: readUtmParam(params, "code"),
        new_session: isNewSession,
      }),
    })
      .then(() => sessionStorage.setItem(SESSION_KEY, "1"))
      .catch(() => {});
  }, []);

  return null;
}
