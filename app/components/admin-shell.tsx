"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AdminSidebar } from "@/app/components/admin-sidebar";
import { AdminMobileHeader } from "@/app/components/admin-mobile-header";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), []);

  useEffect(() => {
    if (!sidebarOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeSidebar();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen, closeSidebar]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div
      className={`admin-shell${sidebarOpen ? " admin-shell-sidebar-open" : ""}`}
    >
      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-backdrop"
          onClick={closeSidebar}
          aria-label="Fermer le menu"
        />
      )}

      <AdminSidebar isOpen={sidebarOpen} onNavigate={closeSidebar} />

      <div className="admin-content">
        <AdminMobileHeader
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
        <div className="admin-main">{children}</div>
      </div>
    </div>
  );
}
