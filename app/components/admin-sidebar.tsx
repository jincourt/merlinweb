"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gift,
  LogOut,
  Eye,
  FileText,
  CheckSquare,
  X,
  Images,
} from "lucide-react";
import { MerlinLogo } from "./ui";

const NAV = [
  { href: "/admin", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/admin/visites", label: "Visites", icon: Eye, exact: false },
  { href: "/admin/clients", label: "Clients", icon: Users, exact: false },
  { href: "/admin/factures", label: "Factures", icon: FileText, exact: false },
  { href: "/admin/taches", label: "Tâches", icon: CheckSquare, exact: false },
  { href: "/admin/partenaires", label: "Partenaires", icon: Gift, exact: false },
];

type AdminSidebarProps = {
  isOpen?: boolean;
  onNavigate?: () => void;
};

export function AdminSidebar({ isOpen = false, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className={`admin-sidebar${isOpen ? " admin-sidebar-open" : ""}`}>
      <div className="admin-sidebar-header">
        <MerlinLogo className="h-8 w-8" red={false} />
        <span className="admin-sidebar-brand">Merlin</span>
        {onNavigate && (
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={onNavigate}
            aria-label="Fermer le menu"
          >
            <X size={18} strokeWidth={1.75} aria-hidden />
          </button>
        )}
      </div>

      <nav className="admin-sidebar-nav">
        <div className="admin-sidebar-nav-main">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={`admin-sidebar-link${active ? " admin-sidebar-link-active" : ""}`}
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden />
                {label}
              </Link>
            );
          })}
        </div>

        <div className="admin-sidebar-nav-bottom">
          <Link
            href="/admin/library"
            onClick={onNavigate}
            className={`admin-sidebar-link${pathname.startsWith("/admin/library") ? " admin-sidebar-link-active" : ""}`}
          >
            <Images size={16} strokeWidth={1.75} aria-hidden />
            Library
          </Link>
        </div>
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-sidebar-link" onClick={onNavigate}>
          Voir le site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="admin-sidebar-link w-full"
        >
          <LogOut size={16} strokeWidth={1.75} aria-hidden />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
