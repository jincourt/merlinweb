export type OptionCategory = "site" | "marketing" | "identite";

export type OptionFilterId = "all" | OptionCategory;

export type CategoryMeta = {
  id: OptionCategory;
  label: string;
  slug: string;
  intro: string;
  summary: string;
};

export type SiteOption = {
  id: string;
  label: string;
  description: string;
  /** Texte détaillé pour les pages options */
  detail?: string;
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
  /** Mention affichée avec * (ex. inclus par défaut) */
  footnote?: string;
};

export const BASE_OFFER: SiteOption = {
  id: "base",
  label: "Site one-page sur mesure",
  description: "Design, développement et livraison sous 7 jours.",
  price: 0,
  category: "site",
};

/** Prix catalogue avant promotion à 0 CHF */
export const BASE_OFFER_ORIGINAL_PRICE = 690;

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

/** Parcours wizard — une catégorie par écran, sans onglet « Tout » */
export const OPTION_CATEGORIES: { id: OptionCategory; label: string }[] = [
  { id: "site", label: "Site web" },
  { id: "marketing", label: "Marketing" },
  { id: "identite", label: "Identité" },
];

export const CATEGORY_META: Record<OptionCategory, CategoryMeta> = {
  site: {
    id: "site",
    label: "Site web",
    slug: "site-web",
    intro:
      "Modules pour enrichir votre site one-page : fonctionnalités métier, outils de contact, espaces clients et automatisations adaptées à votre activité.",
    summary:
      "Catalogue, maintenance, domaine, devis automatisé, facturation, formulaires, newsletter, rendez-vous, espace client, multilingue, analytics, chat, assistant IA et plus.",
  },
  marketing: {
    id: "marketing",
    label: "Marketing",
    slug: "marketing",
    intro:
      "Accélérez votre visibilité en ligne avec des modules pensés pour attirer, convertir et fidéliser vos clients sur le marché suisse.",
    summary:
      "SEO local, Google Ads, fiche Google Business, stratégie digitale, audit de présence, avis clients et prospection.",
  },
  identite: {
    id: "identite",
    label: "Identité",
    slug: "identite",
    intro:
      "Donnez une image cohérente et professionnelle à votre marque, du logo aux supports imprimés.",
    summary:
      "Création de logo, charte graphique, affiches & flyers et cartes de visite.",
  },
};

export const SITE_OPTIONS: SiteOption[] = [
  // ── Site web ──
  {
    id: "catalogue",
    label: "Catalogue produits & services",
    description: "Présentation structurée de votre offre avec filtres, CMS modifiable.",
    detail:
      "Mettez en valeur votre catalogue avec catégories, filtres et fiches détaillées. Vous modifiez prix, descriptions et visuels depuis un espace simple, sans toucher au code.",
    price: 1290,
    category: "site",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    description: "Sauvegardes, mises à jour et support technique continu.",
    detail:
      "Nous assurons les sauvegardes régulières, les mises à jour de sécurité et un support réactif pour que votre site reste fiable et performant dans le temps.",
    price: 690,
    category: "site",
  },
  {
    id: "domaine-hebergement",
    label: "Nom de domaine et hébergement",
    description: "Adresse web et hébergement sécurisé pour votre site.",
    detail:
      "Enregistrement ou transfert de domaine, hébergement sécurisé avec certificat SSL et configuration DNS. Votre site est accessible en HTTPS dès la mise en ligne.",
    price: 200,
    priceSuffix: "/ an",
    category: "site",
    defaultSelected: true,
    locked: true,
    exactPrice: true,
    footnote: "Inclus par défaut",
  },
  {
    id: "devis",
    label: "Devis automatisé",
    description: "Formulaire intelligent avec calcul et envoi PDF.",
    detail:
      "Vos visiteurs configurent une demande, le total se calcule automatiquement et un PDF récapitulatif est généré. Idéal pour les artisans, consultants et prestataires de services.",
    price: 990,
    category: "site",
  },
  {
    id: "facturation",
    label: "Facturation en ligne",
    description: "Émission et suivi de factures depuis votre site.",
    detail:
      "Créez et envoyez des factures directement depuis votre espace. Suivez les paiements en attente et gardez une trace claire de votre activité commerciale.",
    price: 1190,
    category: "site",
  },
  {
    id: "contact",
    label: "Formulaire de contact avancé",
    description: "Champs personnalisés, pièces jointes et notifications.",
    detail:
      "Au-delà d'un simple formulaire : champs sur mesure, upload de fichiers, notifications instantanées et routage vers la bonne personne de votre équipe.",
    price: 490,
    category: "site",
  },
  {
    id: "formulaire-personnalise",
    label: "Formulaire personnalisé",
    description: "Formulaire sur mesure adapté à votre activité et vos processus.",
    detail:
      "Un formulaire conçu autour de votre métier — demandes de rendez-vous, briefs clients, inscriptions ou questionnaires. Logique conditionnelle incluse si nécessaire.",
    price: 690,
    category: "site",
  },
  {
    id: "email",
    label: "Newsletter & email",
    description: "Inscription, campagnes et templates professionnels.",
    detail:
      "Collectez des abonnés, envoyez des newsletters soignées et gardez le contact avec votre audience grâce à des templates alignés avec votre identité visuelle.",
    price: 790,
    category: "site",
  },
  {
    id: "rdv",
    label: "Prise de rendez-vous",
    description: "Agenda en ligne synchronisé avec votre planning.",
    detail:
      "Vos clients réservent un créneau en ligne selon vos disponibilités. Confirmations automatiques et rappels pour limiter les absences.",
    price: 890,
    category: "site",
  },
  {
    id: "espace-client",
    label: "Espace client sécurisé",
    description: "Connexion, documents et suivi de projets.",
    detail:
      "Offrez à vos clients un accès privé pour consulter documents, suivre l'avancement d'un projet ou échanger des fichiers en toute sécurité.",
    price: 1490,
    category: "site",
  },
  {
    id: "multilingue",
    label: "Multilingue FR / DE / IT",
    description: "Site accessible aux marchés suisses et frontaliers.",
    detail:
      "Touchez les quatre régions linguistiques de la Suisse et vos clients frontaliers. Contenu traduit et navigation adaptée à chaque langue.",
    price: 990,
    category: "site",
  },
  {
    id: "analytics",
    label: "Analytics & suivi",
    description: "Tableau de bord des visites et conversions.",
    detail:
      "Comprenez d'où viennent vos visiteurs, quelles pages performent et où vous perdez des prospects. Tableau de bord clair, sans jargon technique.",
    price: 490,
    category: "site",
  },
  {
    id: "chat",
    label: "Chat & WhatsApp",
    description: "Contact instantané intégré à votre site.",
    detail:
      "Permettez à vos visiteurs de vous contacter en un clic via chat intégré ou WhatsApp. Réduisez la friction entre la découverte et la prise de contact.",
    price: 590,
    category: "site",
  },
  {
    id: "ia-assistant",
    label: "Assistant IA pour votre site",
    description: "Assistant conversationnel entraîné sur vos services, FAQ et documents.",
    detail:
      "Un assistant disponible 24h/24 qui répond aux questions fréquentes sur vos services, tarifs et disponibilités — entraîné sur votre contenu réel.",
    price: 1490,
    category: "site",
  },
  {
    id: "qr-menu",
    label: "Menu QR",
    description: "Menu digital accessible par QR code, modifiable à tout moment.",
    detail:
      "Parfait pour la restauration et l'hôtellerie : menu digital scannable, mise à jour instantanée des plats, prix et allergènes sans réimpression.",
    price: 590,
    category: "site",
  },
  {
    id: "coaching",
    label: "Coaching d'utilisation",
    description: "Prise en main guidée de votre site et de vos modules.",
    detail:
      "Une session dédiée pour maîtriser votre site, modifier vos contenus et tirer le meilleur parti de chaque module activé.",
    price: 590,
    category: "site",
  },
  {
    id: "personnalise",
    label: "Personnalisé",
    description: "Design et contenu adaptés à votre activité.",
    detail:
      "Un besoin spécifique qui ne figure pas dans notre catalogue ? Décrivez-le dans votre devis et nous construisons une solution sur mesure.",
    price: 0,
    category: "site",
    hidePrice: true,
  },

  // ── Marketing ──
  {
    id: "seo",
    label: "SEO & référencement local",
    description: "Structure, métadonnées et visibilité Google.",
    detail:
      "Optimisation technique et sémantique pour apparaître dans les recherches locales. Balises, structure, contenu et fiche Google alignés sur votre zone géographique.",
    price: 790,
    category: "marketing",
  },
  {
    id: "google-ads",
    label: "Publicité Google Ads",
    description: "Création, configuration et lancement de campagnes locales ou nationales.",
    detail:
      "Campagnes Search et Display ciblées sur votre marché suisse. Configuration des annonces, suivi des conversions et ajustements pour maximiser votre retour.",
    price: 890,
    category: "marketing",
  },
  {
    id: "google-business",
    label: "Google Business Profile",
    description: "Optimisation complète de votre fiche Google et de votre présence locale.",
    detail:
      "Fiche Google complète et optimisée : horaires, photos, catégories, posts et gestion des avis pour dominer les recherches « près de moi ».",
    price: 690,
    category: "marketing",
  },
  {
    id: "strategie-digitale",
    label: "Stratégie digitale",
    description: "Analyse de votre activité et feuille de route digitale sur mesure.",
    detail:
      "Audit de votre situation actuelle, analyse concurrentielle et plan d'action priorisé sur 6 à 12 mois pour structurer votre présence en ligne.",
    price: 1290,
    category: "marketing",
  },
  {
    id: "audit-presence",
    label: "Audit de présence en ligne",
    description: "Analyse de votre visibilité, réputation et présence sur les principaux canaux.",
    detail:
      "État des lieux complet : site web, réseaux sociaux, annuaires, avis et cohérence de marque. Rapport actionnable avec recommandations concrètes.",
    price: 690,
    category: "marketing",
  },
  {
    id: "avis-reputation",
    label: "Avis clients & e-réputation",
    description: "Collecte d'avis, relances automatiques et mise en avant de vos témoignages.",
    detail:
      "Système de collecte d'avis post-prestation, relances automatiques et affichage des meilleurs témoignages sur votre site pour rassurer vos prospects.",
    price: 690,
    category: "marketing",
  },
  {
    id: "prospection",
    label: "Système de prospection",
    description: "Outils pour identifier, qualifier et suivre de nouveaux prospects.",
    detail:
      "Pipeline de prospects structuré : capture de leads, qualification, relances et suivi jusqu'à la conversion. Adapté aux indépendants et petites équipes.",
    price: 990,
    category: "marketing",
  },

  // ── Identité ──
  {
    id: "logo",
    label: "Création de logo",
    description: "Identité graphique simple et professionnelle pour votre marque.",
    detail:
      "Logo professionnel en plusieurs déclinaisons (couleur, noir & blanc, favicon). Fichiers sources livrés pour une utilisation sur tous vos supports.",
    price: 790,
    category: "identite",
  },
  {
    id: "charte-graphique",
    label: "Charte graphique",
    description: "Document de référence pour garantir une communication visuelle cohérente.",
    detail:
      "Palette de couleurs, typographies, usages du logo et règles graphiques. Votre référence pour une communication cohérente sur web et print.",
    price: 990,
    category: "identite",
  },
  {
    id: "affiche",
    label: "Affiche & flyer",
    description: "Conception d'une affiche professionnelle pour votre entreprise ou événement.",
    detail:
      "Design print-ready pour événements, promotions ou communication locale. Formats A4, A3 ou sur mesure, prêts à envoyer à l'imprimeur.",
    price: 390,
    category: "identite",
  },
  {
    id: "carte-visite",
    label: "Cartes de visite",
    description: "Design de cartes de visite professionnelles, prêtes à imprimer.",
    detail:
      "Cartes de visite élégantes et alignées avec votre identité. Fichiers haute résolution livrés pour impression offset ou numérique.",
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

export function getOptionsForCategory(category: OptionCategory): SiteOption[] {
  return SITE_OPTIONS.filter((o) => o.category === category);
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return Object.values(CATEGORY_META).find((c) => c.slug === slug);
}
