export type SiteOption = {
  id: string;
  label: string;
  description: string;
  price: number;
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
};

/** Places restantes pour l'offre promotionnelle à 0 CHF */
export const PROMO_SPOTS_TOTAL = 10;
export const PROMO_SPOTS_TAKEN = 7;
export const PROMO_SPOTS_LEFT = PROMO_SPOTS_TOTAL - PROMO_SPOTS_TAKEN;

export const SITE_OPTIONS: SiteOption[] = [
  {
    id: "catalogue",
    label: "Catalogue produits & services",
    description: "Présentation structurée de votre offre avec filtres, CMS modifiable.",
    price: 1290,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    description: "Sauvegardes, mises à jour et support technique continu.",
    price: 690,
  },
  {
    id: "domaine-hebergement",
    label: "Nom de domaine et hébergement",
    description: "Adresse web et hébergement sécurisé pour votre site.",
    price: 200,
    priceSuffix: "/ an",
    defaultSelected: true,
    locked: true,
    exactPrice: true,
  },
  {
    id: "devis",
    label: "Devis automatisé",
    description: "Formulaire intelligent avec calcul et envoi PDF.",
    price: 990,
  },
  {
    id: "facturation",
    label: "Facturation en ligne",
    description: "Émission et suivi de factures depuis votre site.",
    price: 1190,
  },
  {
    id: "contact",
    label: "Formulaire de contact avancé",
    description: "Champs personnalisés, pièces jointes, notifications.",
    price: 490,
  },
  {
    id: "email",
    label: "Newsletter & email",
    description: "Inscription, campagnes et templates professionnels.",
    price: 790,
  },
  {
    id: "rdv",
    label: "Prise de rendez-vous",
    description: "Agenda en ligne synchronisé avec votre planning.",
    price: 890,
  },
  {
    id: "espace-client",
    label: "Espace client sécurisé",
    description: "Connexion, documents et suivi de projets.",
    price: 1490,
  },
  {
    id: "multilingue",
    label: "Multilingue FR / DE / IT",
    description: "Site accessible aux marchés suisses et frontaliers.",
    price: 990,
  },
  {
    id: "seo",
    label: "SEO & référencement local",
    description: "Structure, métadonnées et visibilité Google.",
    price: 790,
  },
  {
    id: "analytics",
    label: "Analytics & suivi",
    description: "Tableau de bord des visites et conversions.",
    price: 490,
  },
  {
    id: "chat",
    label: "Chat & WhatsApp",
    description: "Contact instantané intégré à votre site.",
    price: 590,
  },
  {
    id: "coaching",
    label: "Coaching d'utilisation des nouveaux outils",
    description: "Prise en main guidée de votre site et de vos modules.",
    price: 590,
  },
  {
    id: "personnalise",
    label: "Personnalisé",
    description: "Design et contenu adaptés à votre activité.",
    price: 0,
    hidePrice: true,
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
