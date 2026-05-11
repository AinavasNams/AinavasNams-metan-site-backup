import type { Metadata } from "next";
import { locales, type Locale, getTranslation } from "@/lib/i18n";

const ogLocaleMap: Record<Locale, string> = {
  lv: "lv_LV",
  ru: "ru_RU",
  en: "en_US",
  lt: "lt_LT",
};

/**
 * Generate page-level metadata with correct canonical URL and localized SEO text.
 * Prefer `titleKey` / `descriptionKey` (resolved per-locale via getTranslation).
 * Raw `title` / `description` are kept for backward compatibility.
 */
export function generatePageMetadata(
  lang: Locale,
  pagePath: string, // e.g. "/pakalpojumi/horeca"
  overrides?: {
    titleKey?: string;
    descriptionKey?: string;
    title?: string;
    description?: string;
  }
): Metadata {
  const canonical = `https://metan.lv/${lang}${pagePath}`;
  const languageAlternates = Object.fromEntries(
    locales.map((l) => [l, `https://metan.lv/${l}${pagePath}`])
  );
  const alternateLocales = locales.filter((l) => l !== lang).map((l) => ogLocaleMap[l]);

  const title = overrides?.titleKey
    ? getTranslation(overrides.titleKey, lang)
    : overrides?.title;
  const description = overrides?.descriptionKey
    ? getTranslation(overrides.descriptionKey, lang)
    : overrides?.description;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      type: "website",
      locale: ogLocaleMap[lang],
      alternateLocale: alternateLocales,
      url: canonical,
      siteName: "METAN.LV",
    },
  };
}
