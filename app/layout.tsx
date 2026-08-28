import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = getIntlayer("metadata", locale);

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      locale: locale === "fr" ? "fr_CH" : locale === "de" ? "de_CH" : "en_CH",
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={getHTMLTextDir(locale)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <IntlayerClientProvider locale={locale}>
          <VisitTracker />
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
}
