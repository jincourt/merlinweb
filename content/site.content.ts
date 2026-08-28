import { t, type Dictionary } from "intlayer";

const siteContent = {
  key: "site",
  content: {
    brand: t({
      fr: "Merlin",
      en: "Merlin",
      de: "Merlin",
    }),
    headerHomeAria: t({
      fr: "Merlin — accueil",
      en: "Merlin — home",
      de: "Merlin — Startseite",
    }),
    mainNavAria: t({
      fr: "Navigation principale",
      en: "Main navigation",
      de: "Hauptnavigation",
    }),
    footerNavAria: t({
      fr: "Navigation pied de page",
      en: "Footer navigation",
      de: "Footer-Navigation",
    }),
    contact: t({
      fr: "Contact",
      en: "Contact",
      de: "Kontakt",
    }),
    services: t({
      fr: "Services",
      en: "Services",
      de: "Leistungen",
    }),
    clients: t({
      fr: "Clients",
      en: "Clients",
      de: "Kunden",
    }),
    siteWeb: t({
      fr: "Site web",
      en: "Website",
      de: "Website",
    }),
    infrastructure: t({
      fr: "Infrastructure",
      en: "Infrastructure",
      de: "Infrastruktur",
    }),
    gestion: t({
      fr: "Gestion",
      en: "Management",
      de: "Verwaltung",
    }),
    interface: t({
      fr: "Interface",
      en: "Interface",
      de: "Interface",
    }),
    allServices: t({
      fr: "Tous nos services",
      en: "All our services",
      de: "Alle unsere Leistungen",
    }),
    french: t({
      fr: "Français",
      en: "French",
      de: "Französisch",
    }),
    english: t({
      fr: "Anglais",
      en: "English",
      de: "Englisch",
    }),
    german: t({
      fr: "Allemand",
      en: "German",
      de: "Deutsch",
    }),
    footerTagline: t({
      fr: "Ce qui fonctionne n'est pas un hasard.",
      en: "What works is no accident.",
      de: "Was funktioniert, ist kein Zufall.",
    }),
    bookSpot: t({
      fr: "Réserver ma place",
      en: "Reserve my spot",
      de: "Platz reservieren",
    }),
    back: t({
      fr: "Retour",
      en: "Back",
      de: "Zurück",
    }),
    modules: t({
      fr: "Modules",
      en: "Modules",
      de: "Module",
    }),
    otherCategories: t({
      fr: "Autres catégories",
      en: "Other categories",
      de: "Weitere Kategorien",
    }),
    modulesAria: t({
      fr: "Modules {category}",
      en: "{category} modules",
      de: "Module {category}",
    }),
    discuss: t({
      fr: "Discutons",
      en: "Let's talk",
      de: "Lassen Sie uns sprechen",
    }),
    yourProject: t({
      fr: "Votre projet",
      en: "Your project",
      de: "Ihr Projekt",
    }),
    bookAppointment: t({
      fr: "Prendre rendez-vous",
      en: "Book an appointment",
      de: "Termin vereinbaren",
    }),
    insteadOf: t({
      fr: "Au lieu de",
      en: "Instead of",
      de: "Statt",
    }),
    chf: t({
      fr: "CHF",
      en: "CHF",
      de: "CHF",
    }),
    leaveNote: t({
      fr: "Laisser une note",
      en: "Leave a review",
      de: "Bewertung hinterlassen",
    }),
  },
} satisfies Dictionary;

export default siteContent;
