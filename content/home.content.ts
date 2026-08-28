import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    heroTitle: t({
      fr: "Merlin est votre agence pour vos projets ambitieux.",
      en: "Merlin is your agency for ambitious projects.",
      de: "Merlin ist Ihre Agentur für ehrgeizige Projekte.",
    }),
    since2025: t({
      fr: "Depuis 2025",
      en: "Since 2025",
      de: "Seit 2025",
    }),
    clientsCount: t({
      fr: "+5 clients",
      en: "+5 clients",
      de: "+5 Kunden",
    }),
    clientsTrust: t({
      fr: "nous ont fait confiance",
      en: "have trusted us",
      de: "haben uns vertraut",
    }),
    subscriptionsTitle: t({
      fr: "Nos abonnements",
      en: "Our subscriptions",
      de: "Unsere Abonnements",
    }),
    subscriptionSiteDetail: t({
      fr: "One-page sur mesure. Contact, rendez-vous et catalogue en ligne.",
      en: "Custom one-page site. Contact, appointments and online catalogue.",
      de: "Massgeschneiderte One-Page. Kontakt, Termine und Online-Katalog.",
    }),
    subscriptionMarketingDetail: t({
      fr: "Site personnalisé avec SEO local, visibilité Google.",
      en: "Custom site with local SEO and Google visibility.",
      de: "Individuelle Website mit lokalem SEO und Google-Sichtbarkeit.",
    }),
    subscriptionIdentiteDetail: t({
      fr: "Logo, charte graphique et supports visuels.",
      en: "Logo, brand guidelines and visual assets.",
      de: "Logo, Styleguide und visuelle Medien.",
    }),
    priceSite: t({
      fr: "800 CHF.- / par mois",
      en: "800 CHF / per month",
      de: "800 CHF / pro Monat",
    }),
    priceMarketing: t({
      fr: "1'600 CHF.- / par mois",
      en: "1,600 CHF / per month",
      de: "1'600 CHF / pro Monat",
    }),
    priceCustom: t({
      fr: "Personnalisé",
      en: "Custom",
      de: "Individuell",
    }),
    projectShowcaseSite: t({
      fr: "Site vitrine",
      en: "Showcase site",
      de: "Referenzwebsite",
    }),
    projectPreviewAlt: t({
      fr: "{name} — aperçu {n}",
      en: "{name} — preview {n}",
      de: "{name} — Vorschau {n}",
    }),
  },
} satisfies Dictionary;

export default homeContent;
