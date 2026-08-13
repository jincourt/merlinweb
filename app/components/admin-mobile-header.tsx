"use client";

import { Menu, X } from "lucide-react";
import { MerlinLogo } from "./ui";

type AdminMobileHeaderProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function AdminMobileHeader({ isOpen, onToggle }: AdminMobileHeaderProps) {
  return (
    <header className="admin-mobile-header">
      <button
        type="button"
        className="admin-mobile-menu-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? (
          <X size={20} strokeWidth={1.75} aria-hidden />
        ) : (
          <Menu size={20} strokeWidth={1.75} aria-hidden />
        )}
      </button>
      <div className="admin-mobile-header-brand">
        <MerlinLogo className="h-6 w-6" red={false} />
        <span>Merlin Admin</span>
      </div>
    </header>
  );
}
