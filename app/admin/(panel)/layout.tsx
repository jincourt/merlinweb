import type { Metadata } from "next";
import { AdminShell } from "@/app/components/admin-shell";

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
  return <AdminShell>{children}</AdminShell>;
}
