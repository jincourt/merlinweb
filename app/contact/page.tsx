import type { Metadata } from "next";
import { getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { ContactAppointmentForm } from "../components/contact-appointment-form";
import { MarketingContactSection } from "../components/marketing-contact-section";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = getIntlayer("metadata", locale);

  return {
    title: meta.contactTitle,
    description: meta.contactDescription,
  };
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-w-0 w-full overflow-x-clip">
        <MarketingContactSection
          showAppointmentButton={false}
          pageLayout
          col2={<ContactAppointmentForm embedded />}
        />
      </main>
      <SiteFooter />
    </>
  );
}
