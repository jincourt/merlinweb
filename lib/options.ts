export type OptionCategory = "site" | "marketing" | "identite";

export type OptionFilterId = "all" | OptionCategory;

export type SiteOption = {
  id: string;
  label: string;
  description: string;
  price: number;
  category: OptionCategory;
  priceSuffix?: string;
  hidePrice?: boolean;
  /** Pré-sélectionné à l'ouverture du devis */
  defaultSelected?: boolean;
  /** Ne peut pas être retiré par l'utilisateur */
  locked?: boolean;
  /** Affiche le prix sans préfixe « ~ » */
  exactPrice?: boolean;
};

export const BASE_OFFER: SiteOption = {
  id: "base",
  label: "Site one-page sur mesure",
  description: "Design, développement et livraison sous 7 jours.",
  price: 0,
  category: "site",
};

/** Places restantes pour l'offre promotionnelle à 0 CHF */
export const PROMO_SPOTS_TOTAL = 10;
export const PROMO_SPOTS_TAKEN = 7;
export const PROMO_SPOTS_LEFT = PROMO_SPOTS_TOTAL - PROMO_SPOTS_TAKEN;

export const OPTION_FILTERS: { id: OptionFilterId; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "site", label: "Site web" },
  { id: "marketing", label: "Marketing" },
  { id: "identite", label: "Identité" },
];

export const SITE_OPTIONS: SiteOption[] = [
  // ── Site web ──
  {
    id: "catalogue",
    label: "Catalogue produits & services",
    description: "Présentation structurée de votre offre avec filtres, CMS modifiable.",
    price: 1290,
    category: "site",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    description: "Sauvegardes, mises à jour et support technique continu.",
    price: 690,
    category: "site",
  },
  {
    id: "domaine-hebergement",
    label: "Nom de domaine et hébergement",
    description: "Adresse web et hébergement sécurisé pour votre site.",
    price: 200,
    priceSuffix: "/ an",
    category: "site",
    defaultSelected: true,
    locked: true,
    exactPrice: true,
  },
  {
    id: "devis",
    label: "Devis automatisé",
    description: "Formulaire intelligent avec calcul et envoi PDF.",
    price: 990,
    category: "site",
  },
  {
    id: "facturation",
    label: "Facturation en ligne",
    description: "Émission et suivi de factures depuis votre site.",
    price: 1190,
    category: "site",
  },
  {
    id: "contact",
    label: "Formulaire de contact avancé",
    description: "Champs personnalisés, pièces jointes et notifications.",
    price: 490,
    category: "site",
  },
  {
    id: "formulaire-personnalise",
    label: "Formulaire personnalisé",
    description: "Formulaire sur mesure adapté à votre activité et vos processus.",
    price: 690,
    category: "site",
  },
  {
    id: "email",
    label: "Newsletter & email",
    description: "Inscription, campagnes et templates professionnels.",
    price: 790,
    category: "site",
  },
  {
    id: "rdv",
    label: "Prise de rendez-vous",
    description: "Agenda en ligne synchronisé avec votre planning.",
    price: 890,
    category: "site",
  },
  {
    id: "espace-client",
    label: "Espace client sécurisé",
    description: "Connexion, documents et suivi de projets.",
    price: 1490,
    category: "site",
  },
  {
    id: "multilingue",
    label: "Multilingue FR / DE / IT",
    description: "Site accessible aux marchés suisses et frontaliers.",
    price: 990,
    category: "site",
  },
  {
    id: "analytics",
    label: "Analytics & suivi",
    description: "Tableau de bord des visites et conversions.",
    price: 490,
    category: "site",
  },
  {
    id: "chat",
    label: "Chat & WhatsApp",
    description: "Contact instantané intégré à votre site.",
    price: 590,
    category: "site",
  },
  {
    id: "ia-assistant",
    label: "Assistant IA pour votre site",
    description: "Assistant conversationnel entraîné sur vos services, FAQ et documents.",
    price: 1490,
    category: "site",
  },
  {
    id: "qr-menu",
    label: "Menu QR",
    description: "Menu digital accessible par QR code, modifiable à tout moment.",
    price: 590,
    category: "site",
  },
  {
    id: "coaching",
    label: "Coaching d'utilisation",
    description: "Prise en main guidée de votre site et de vos modules.",
    price: 590,
    category: "site",
  },
  {
    id: "personnalise",
    label: "Personnalisé",
    description: "Design et contenu adaptés à votre activité.",
    price: 0,
    category: "site",
    hidePrice: true,
  },

  // ── Marketing ──
  {
    id: "seo",
    label: "SEO & référencement local",
    description: "Structure, métadonnées et visibilité Google.",
    price: 790,
    category: "marketing",
  },
  {
    id: "google-ads",
    label: "Publicité Google Ads",
    description: "Création, configuration et lancement de campagnes locales ou nationales.",
    price: 890,
    category: "marketing",
  },
  {
    id: "google-business",
    label: "Google Business Profile",
    description: "Optimisation complète de votre fiche Google et de votre présence locale.",
    price: 690,
    category: "marketing",
  },
  {
    id: "strategie-digitale",
    label: "Stratégie digitale",
    description: "Analyse de votre activité et feuille de route digitale sur mesure.",
    price: 1290,
    category: "marketing",
  },
  {
    id: "audit-presence",
    label: "Audit de présence en ligne",
    description: "Analyse de votre visibilité, réputation et présence sur les principaux canaux.",
    price: 690,
    category: "marketing",
  },
  {
    id: "avis-reputation",
    label: "Avis clients & e-réputation",
    description: "Collecte d'avis, relances automatiques et mise en avant de vos témoignages.",
    price: 690,
    category: "marketing",
  },
  {
    id: "prospection",
    label: "Système de prospection",
    description: "Outils pour identifier, qualifier et suivre de nouveaux prospects.",
    price: 990,
    category: "marketing",
  },

  // ── Identité ──
  {
    id: "logo",
    label: "Création de logo",
    description: "Identité graphique simple et professionnelle pour votre marque.",
    price: 790,
    category: "identite",
  },
  {
    id: "charte-graphique",
    label: "Charte graphique",
    description: "Document de référence pour garantir une communication visuelle cohérente.",
    price: 990,
    category: "identite",
  },
  {
    id: "affiche",
    label: "Affiche & flyer",
    description: "Conception d'une affiche professionnelle pour votre entreprise ou événement.",
    price: 390,
    category: "identite",
  },
  {
    id: "carte-visite",
    label: "Cartes de visite",
    description: "Design de cartes de visite professionnelles, prêtes à imprimer.",
    price: 290,
    category: "identite",
  },
];

export const DEFAULT_SELECTED_OPTION_IDS = SITE_OPTIONS.filter(
  (o) => o.defaultSelected,
).map((o) => o.id);

export const LOCKED_OPTION_IDS = SITE_OPTIONS.filter((o) => o.locked).map(
  (o) => o.id,
);

export function formatChf(
  amount: number,
  { approximate = false }: { approximate?: boolean } = {},
): string {
  if (amount === 0) return "0.- CHF";
  const prefix = approximate ? "~" : "";
  return `${prefix}${amount.toLocaleString("fr-CH")}.- CHF`;
}

export function formatOptionPrice(
  option: SiteOption,
  { approximate = !option.exactPrice }: { approximate?: boolean } = {},
): string {
  const price = formatChf(option.price, { approximate });
  return option.priceSuffix ? `${price}${option.priceSuffix}` : price;
}

export function computeTotal(selectedIds: string[]): number {
  const optionTotal = SITE_OPTIONS.filter((o) =>
    selectedIds.includes(o.id),
  ).reduce((sum, o) => sum + o.price, 0);
  return BASE_OFFER.price + optionTotal;
}

export function filterOptionsByCategory(
  category: OptionFilterId,
): SiteOption[] {
  if (category === "all") return SITE_OPTIONS;
  return SITE_OPTIONS.filter((o) => o.category === category);
}
