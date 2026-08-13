"use client";

import { useEffect } from "react";

export function VisitTracker() {
  useEffect(() => {
    const key = "merlin_visit_recorded";
    if (sessionStorage.getItem(key)) return;

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname || "/" }),
    })
      .then(() => sessionStorage.setItem(key, "1"))
      .catch(() => {});
  }, []);

  return null;
}
