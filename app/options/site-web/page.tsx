import type { Metadata } from "next";
import { OptionCategoryPage } from "@/app/components/option-category-page";
import { CATEGORY_META } from "@/lib/options";

export const metadata: Metadata = {
  title: "Modules Site web — Merlin",
  description: CATEGORY_META.site.intro,
};

export default function SiteWebOptionsPage() {
  return <OptionCategoryPage category="site" />;
}
