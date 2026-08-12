"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { InviteDialog } from "./invite-dialog";

type InviteContextValue = {
  inviteCode: string | null;
};

const InviteContext = createContext<InviteContextValue>({ inviteCode: null });

export function useInviteCode() {
  return useContext(InviteContext).inviteCode;
}

export function InviteProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const urlCode = searchParams.get("code")?.trim().toUpperCase() ?? null;

  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checking, setChecking] = useState(Boolean(urlCode));

  useEffect(() => {
    if (!urlCode) {
      setChecking(false);
      return;
    }

    let cancelled = false;

    async function verify() {
      try {
        const res = await fetch(
          `/api/code?code=${encodeURIComponent(urlCode!)}`,
        );
        const data = await res.json();

        if (cancelled) return;

        if (res.ok && data.valid) {
          setInviteCode(data.code);
          setDialogOpen(true);
        }
      } catch {
        /* ignore invalid codes */
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [urlCode]);

  return (
    <InviteContext.Provider value={{ inviteCode }}>
      {children}
      {!checking && inviteCode && (
        <InviteDialog
          code={inviteCode}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </InviteContext.Provider>
  );
}
