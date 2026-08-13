import type { Metadata } from "next";
import { AdminSidebar } from "@/app/components/admin-sidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Merlin",
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  );
}
