import {
  BASE_OFFER,
  SITE_OPTIONS,
  formatChf,
  getCategoryPriceRange,
  type CategoryMeta,
  type OptionCategory,
  type OptionFilterId,
  type SiteOption,
} from "./options";

type OptionItemContent = {
  label: string;
  description: string;
  detail: string;
  footnote?: string;
};

type OptionPageContent = {
  highlight1: string;
  highlight2: string;
  example: string;
};

export type OptionsDictionary = {
  filters: Record<OptionFilterId, string>;
  baseOffer: { label: string; description: string };
  categories: Record<
    OptionCategory,
    { label: string; intro: string; summary: string }
  >;
  perYear: string;
  includedByDefault: string;
  priceFromSingle: string;
  priceFromRange: string;
  chfZero: string;
  items: Record<string, OptionItemContent>;
  pages: Record<string, OptionPageContent>;
};

export type LocalizedOptionsBundle = {
  siteOptions: SiteOption[];
  baseOffer: SiteOption;
  categoryMeta: Record<OptionCategory, CategoryMeta>;
  optionFilters: { id: OptionFilterId; label: string }[];
  optionCategories: { id: OptionCategory; label: string }[];
  pages: Record<string, { highlights: string[]; example: string }>;
  strings: {
    perYear: string;
    includedByDefault: string;
    chfZero: string;
  };
  formatCategoryPriceRange: (category: OptionCategory) => string;
};

function mergeOption(
  option: SiteOption,
  item: OptionItemContent | undefined,
  strings: OptionsDictionary,
): SiteOption {
  if (!item) return option;

  return {
    ...option,
    label: item.label,
    description: item.description,
    detail: item.detail,
    footnote: item.footnote ?? option.footnote,
    priceSuffix: option.priceSuffix ? strings.perYear : option.priceSuffix,
  };
}

export function buildLocalizedOptions(
  content: OptionsDictionary,
): LocalizedOptionsBundle {
  const siteOptions = SITE_OPTIONS.map((option) =>
    mergeOption(option, content.items[option.id], content),
  );

  const baseOffer: SiteOption = {
    ...BASE_OFFER,
    label: content.baseOffer.label,
    description: content.baseOffer.description,
  };

  const categoryMeta: Record<OptionCategory, CategoryMeta> = {
    site: {
      id: "site",
      slug: "site-web",
      ...content.categories.site,
    },
    marketing: {
      id: "marketing",
      slug: "marketing",
      ...content.categories.marketing,
    },
    identite: {
      id: "identite",
      slug: "identite",
      ...content.categories.identite,
    },
  };

  const optionFilters: { id: OptionFilterId; label: string }[] = [
    { id: "all", label: content.filters.all },
    { id: "site", label: content.filters.site },
    { id: "marketing", label: content.filters.marketing },
    { id: "identite", label: content.filters.identite },
  ];

  const optionCategories: { id: OptionCategory; label: string }[] = [
    { id: "site", label: content.categories.site.label },
    { id: "marketing", label: content.categories.marketing.label },
    { id: "identite", label: content.categories.identite.label },
  ];

  const pages = Object.fromEntries(
    Object.entries(content.pages).map(([id, page]) => [
      id,
      {
        highlights: [page.highlight1, page.highlight2],
        example: page.example,
      },
    ]),
  );

  const formatCategoryPriceRange = (category: OptionCategory) => {
    const range = getCategoryPriceRange(category);
    if (!range) return "";

    const min = formatChf(range.min, { approximate: true });
    const max = formatChf(range.max, { approximate: true });

    if (range.min === range.max) {
      return content.priceFromSingle.replace("{min}", min);
    }

    return content.priceFromRange
      .replace("{min}", min)
      .replace("{max}", max);
  };

  return {
    siteOptions,
    baseOffer,
    categoryMeta,
    optionFilters,
    optionCategories,
    pages,
    strings: {
      perYear: content.perYear,
      includedByDefault: content.includedByDefault,
      chfZero: content.chfZero,
    },
    formatCategoryPriceRange,
  };
}

export function getLocalizedOptionPageContent(
  bundle: LocalizedOptionsBundle,
  optionId: string,
) {
  return bundle.pages[optionId] ?? null;
}

export function filterLocalizedOptionsByCategory(
  bundle: LocalizedOptionsBundle,
  category: OptionFilterId,
): SiteOption[] {
  if (category === "all") return bundle.siteOptions;
  return bundle.siteOptions.filter((option) => option.category === category);
}

export function getLocalizedOptionsForCategory(
  bundle: LocalizedOptionsBundle,
  category: OptionCategory,
): SiteOption[] {
  return bundle.siteOptions.filter((option) => option.category === category);
}
