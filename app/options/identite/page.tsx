import type { Metadata } from "next";
import { getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
import { OptionCategoryPage } from "@/app/components/option-category-page";
import { getLocalizedOptions } from "@/lib/get-localized-options";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = getIntlayer("metadata", locale);
  const bundle = await getLocalizedOptions();

  return {
    title: meta.optionsIdentiteTitle,
    description: bundle.categoryMeta.identite.intro,
  };
}

export default function IdentiteOptionsPage() {
  return <OptionCategoryPage category="identite" />;
}
