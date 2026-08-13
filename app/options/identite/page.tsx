import type { Metadata } from "next";
import { OptionCategoryPage } from "@/app/components/option-category-page";
import { CATEGORY_META } from "@/lib/options";

export const metadata: Metadata = {
  title: "Modules Identité — Merlin",
  description: CATEGORY_META.identite.intro,
};

export default function IdentiteOptionsPage() {
  return <OptionCategoryPage category="identite" />;
}
