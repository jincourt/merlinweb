import { t, type Dictionary } from "intlayer";

const servicesContent = {
  key: "services",
  content: {
    title: t({
      fr: "Services",
      en: "Services",
      de: "Leistungen",
    }),
    subtitle: t({
      fr: "Sur mesure. Modulaire. Sans template.",
      en: "Custom. Modular. No templates.",
      de: "Massgeschneidert. Modular. Ohne Vorlagen.",
    }),
    siteWebTitle: t({
      fr: "Site web",
      en: "Website",
      de: "Website",
    }),
    siteWebDetail: t({
      fr: "One-page sur mesure. Livré en 7 jours.",
      en: "Custom one-page site. Delivered in 7 days.",
      de: "Massgeschneiderte One-Page. Lieferung in 7 Tagen.",
    }),
    marketingTitle: t({
      fr: "Marketing",
      en: "Marketing",
      de: "Marketing",
    }),
    marketingDetail: t({
      fr: "SEO, visibilité, conversion.",
      en: "SEO, visibility, conversion.",
      de: "SEO, Sichtbarkeit, Conversion.",
    }),
    identiteTitle: t({
      fr: "Identité",
      en: "Branding",
      de: "Identität",
    }),
    identiteDetail: t({
      fr: "Logo, charte, supports visuels.",
      en: "Logo, guidelines, visual assets.",
      de: "Logo, Styleguide, visuelle Medien.",
    }),
  },
} satisfies Dictionary;

export default servicesContent;
