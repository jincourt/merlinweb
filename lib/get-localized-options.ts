import { getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
import {
  buildLocalizedOptions,
  type OptionsDictionary,
} from "./localized-options";

export async function getLocalizedOptions() {
  const locale = await getLocale();
  const content = getIntlayer("options", locale) as OptionsDictionary;
  return buildLocalizedOptions(content);
}
