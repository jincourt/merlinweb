import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VisitTracker } from "./components/visit-tracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Merlin — Studio web suisse",
  description:
    "Agence web suisse. Sites internet personnalisés, conçus par des professionnels. Livraison 7 jours. Offre limitée à 0 CHF.",
  openGraph: {
    title: "Merlin — Studio web suisse",
    description:
      "Sites internet sur mesure pour indépendants et PME. Design suisse, livraison 7 jours.",
    locale: "fr_CH",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
