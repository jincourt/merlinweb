import { t, type Dictionary } from "intlayer";

const clientsContent = {
  key: "clients",
  content: {
    title: t({
      fr: "Clients",
      en: "Clients",
      de: "Kunden",
    }),
    subtitle: t({
      fr: "Indépendants et PME en Suisse romande.",
      en: "Freelancers and SMEs in French-speaking Switzerland.",
      de: "Selbstständige und KMU in der Romandie.",
    }),
    nicolasActivity: t({
      fr: "Maçonnerie · Lausanne",
      en: "Masonry · Lausanne",
      de: "Maurerarbeiten · Lausanne",
    }),
    atelierLumiereActivity: t({
      fr: "Électricien · Morges",
      en: "Electrician · Morges",
      de: "Elektriker · Morges",
    }),
    studioVertActivity: t({
      fr: "Paysagiste · Nyon",
      en: "Landscaper · Nyon",
      de: "Landschaftsgärtner · Nyon",
    }),
  },
} satisfies Dictionary;

export default clientsContent;
