import { t, type Dictionary } from "intlayer";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      fr: "Merlin — Studio web suisse · Lausanne",
      en: "Merlin — Swiss web studio · Lausanne",
      de: "Merlin — Schweizer Webstudio · Lausanne",
    }),
    description: t({
      fr: "Des sites web sur mesure, pensés pour votre activité. Studio Merlin à Lausanne — offre à 0 CHF, livraison en 7 jours.",
      en: "Custom websites built for your business. Merlin studio in Lausanne — launch offer at 0 CHF, delivered in 7 days.",
      de: "Massgeschneiderte Websites für Ihr Geschäft. Merlin Studio in Lausanne — Startangebot für 0 CHF, Lieferung in 7 Tagen.",
    }),
    ogDescription: t({
      fr: "Sites personnalisés pour indépendants et PME. Offre de lancement à 0 CHF, livrés en 7 jours. Studio Merlin · Lausanne.",
      en: "Custom sites for freelancers and SMEs. Launch offer at 0 CHF, delivered in 7 days. Merlin studio · Lausanne.",
      de: "Individuelle Websites für Selbstständige und KMU. Startangebot für 0 CHF, Lieferung in 7 Tagen. Merlin Studio · Lausanne.",
    }),
    servicesTitle: t({
      fr: "Services — Merlin",
      en: "Services — Merlin",
      de: "Leistungen — Merlin",
    }),
    servicesDescription: t({
      fr: "Site web, marketing et identité pour indépendants et PME.",
      en: "Website, marketing and branding for freelancers and SMEs.",
      de: "Website, Marketing und Identität für Selbstständige und KMU.",
    }),
    clientsTitle: t({
      fr: "Clients — Merlin",
      en: "Clients — Merlin",
      de: "Kunden — Merlin",
    }),
    clientsDescription: t({
      fr: "Indépendants et PME en Suisse romande.",
      en: "Freelancers and SMEs in French-speaking Switzerland.",
      de: "Selbstständige und KMU in der Romandie.",
    }),
    contactTitle: t({
      fr: "Contact — Merlin",
      en: "Contact — Merlin",
      de: "Kontakt — Merlin",
    }),
    contactDescription: t({
      fr: "Prenez rendez-vous avec Merlin pour discuter de votre projet.",
      en: "Book a meeting with Merlin to discuss your project.",
      de: "Vereinbaren Sie einen Termin mit Merlin, um Ihr Projekt zu besprechen.",
    }),
    optionsSiteTitle: t({
      fr: "Modules Site web — Merlin",
      en: "Website modules — Merlin",
      de: "Website-Module — Merlin",
    }),
    optionsMarketingTitle: t({
      fr: "Modules Marketing — Merlin",
      en: "Marketing modules — Merlin",
      de: "Marketing-Module — Merlin",
    }),
    optionsIdentiteTitle: t({
      fr: "Modules Identité — Merlin",
      en: "Branding modules — Merlin",
      de: "Identitäts-Module — Merlin",
    }),
  },
} satisfies Dictionary;

export default metadataContent;
