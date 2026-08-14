"use client";

import { useEffect, useRef } from "react";

const VISITOR_KEY = "merlin_visitor_key";
const SESSION_KEY = "merlin_visit_session";
const ENGAGEMENT_SENT_KEY = "merlin_engagement_sent";

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

function computeScrollDepth(): number {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const scrollHeight = doc.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return 100;
  return Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
}

function sendEngagement(
  visitorKey: string,
  scrollDepth: number,
  durationSec: number,
) {
  const payload = JSON.stringify({
    visitor_key: visitorKey,
    scroll_depth: scrollDepth,
    duration_sec: durationSec,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/visit/engagement",
      new Blob([payload], { type: "application/json" }),
    );
    return;
  }

  fetch("/api/visit/engagement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

export function VisitTracker() {
  const maxScrollRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const sentRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/admin")) return;

    const visitorKey = getOrCreateVisitorKey();
    const isNewSession = !sessionStorage.getItem(SESSION_KEY);
    const params = new URLSearchParams(window.location.search);

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitor_key: visitorKey,
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

    function flushEngagement() {
      if (sentRef.current) return;
      if (sessionStorage.getItem(ENGAGEMENT_SENT_KEY) === "1") return;

      const durationSec = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (durationSec < 2 && maxScrollRef.current < 5) return;

      sentRef.current = true;
      sessionStorage.setItem(ENGAGEMENT_SENT_KEY, "1");
      sendEngagement(visitorKey, maxScrollRef.current, durationSec);
    }

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const depth = computeScrollDepth();
        if (depth > maxScrollRef.current) {
          maxScrollRef.current = depth;
        }
      });
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") flushEngagement();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flushEngagement);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", flushEngagement);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      flushEngagement();
    };
  }, []);

  return null;
}
