import type { Metadata } from "next";
import { OptionCategoryPage } from "@/app/components/option-category-page";
import { CATEGORY_META } from "@/lib/options";

export const metadata: Metadata = {
  title: "Modules Marketing — Merlin",
  description: CATEGORY_META.marketing.intro,
};

export default function MarketingOptionsPage() {
  return <OptionCategoryPage category="marketing" />;
}
