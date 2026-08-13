"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MerlinLogo } from "@/app/components/ui";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erreur de connexion.");
        setLoading(false);
        return;
      }

      router.replace(next);
      router.refresh();
    } catch {
      setError("Erreur réseau.");
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-panel">
        <div className="flex items-center gap-3">
          <MerlinLogo className="h-10 w-10" />
          <span className="t-mono !text-black/70">Administration</span>
        </div>
        <h1 className="t-display mt-8 text-[1.75rem] text-black">
          Connexion
        </h1>
        <p className="t-body mt-3">
          Accès réservé à l&apos;équipe Merlin.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label htmlFor="admin-password" className="t-mono !text-black/70">
            Mot de passe
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="wizard-input mt-2"
            autoComplete="current-password"
            disabled={loading}
            required
          />
          {error && (
            <p className="mt-3 text-sm text-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6 w-full justify-center"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
