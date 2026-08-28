"use client";

import { useMemo } from "react";
import { useIntlayer } from "next-intlayer";
import {
  buildLocalizedOptions,
  type OptionsDictionary,
} from "./localized-options";

export function useLocalizedOptions() {
  const content = useIntlayer("options") as OptionsDictionary;
  return useMemo(() => buildLocalizedOptions(content), [content]);
}
