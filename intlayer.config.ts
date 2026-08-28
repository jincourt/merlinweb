import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.FRENCH, Locales.ENGLISH, Locales.GERMAN],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
    enableProxy: false,
  },
};

export default config;
