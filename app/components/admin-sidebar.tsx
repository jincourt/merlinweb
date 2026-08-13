"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Gift, LogOut, Eye } from "lucide-react";
import { MerlinLogo } from "./ui";

const NAV = [
  { href: "/admin", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/admin/visites", label: "Visites", icon: Eye, exact: false },
  { href: "/admin/clients", label: "Clients", icon: Users, exact: false },
  { href: "/admin/partenaires", label: "Partenaires", icon: Gift, exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <MerlinLogo className="h-8 w-8" red={false} />
        <span className="admin-sidebar-brand">Merlin Admin</span>
      </div>

      <nav className="admin-sidebar-nav">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`admin-sidebar-link${active ? " admin-sidebar-link-active" : ""}`}
            >
              <Icon size={16} strokeWidth={1.75} aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-sidebar-link">
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
