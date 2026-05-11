import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { TranslationProvider } from "@/components/TranslationProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import CookieConsent from "@/components/CookieConsent";
import ClientComponents from "@/components/ClientComponents";

// Static generation for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Per-locale metadata
const metadataByLocale: Record<Locale, { title: string; description: string; keywords: string }> = {
  lv: {
    title: "METAN.LV - No organiskajiem atkritumiem lidz tirai energijai",
    description: "SIA Ainavas Nams piedava sertificetus risinajumus tauku, ellas un partikas atkritumu savaksanai un parstradei uz biometanu. Biometana razosana Latvija.",
    keywords: "biometans, atkritumu savaksana, tauku utilizacija, ellas savaksana, organisko atkritumu parstrade, videi draudziga energija, Latvija",
  },
  ru: {
    title: "METAN.LV - Сбор отходов и производство биометана в Латвии",
    description: "SIA Ainavas Nams предлагает сертифицированные услуги по сбору и переработке жиров, масел и пищевых отходов в биометан. Очистка жироуловителей в Риге и по всей Латвии.",
    keywords: "биометан, сбор отходов, утилизация жиров, очистка жироуловителей, переработка пищевых отходов, Латвия, Рига",
  },
  en: {
    title: "METAN.LV - Waste Collection & Biomethane Production in Latvia",
    description: "SIA Ainavas Nams provides certified grease trap cleaning, waste oil collection and biomethane production services across Latvia and the Baltics.",
    keywords: "biomethane, waste collection, grease trap cleaning, used cooking oil, organic waste recycling, Latvia, Baltics",
  },
  lt: {
    title: "METAN.LV - Atliekų surinkimas ir biometano gamyba Latvijoje",
    description: "SIA Ainavas Nams siulo sertifikuotas riebalų surinkimo, aliejaus perdirbimo ir biometano gamybos paslaugas Latvijoje ir Baltijos salyse.",
    keywords: "biometanas, atliekų surinkimas, riebalų gaudyklių valymas, panaudotas aliejus, Latvija, Baltijos salys",
  },
};

const ogLocaleMap: Record<Locale, string> = {
  lv: "lv_LV",
  ru: "ru_RU",
  en: "en_US",
  lt: "lt_LT",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locales.includes(locale as Locale) ? locale : defaultLocale) as Locale;
  const meta = metadataByLocale[lang];
  const alternateLocales = locales.filter((l) => l !== lang).map((l) => ogLocaleMap[l]);

  // Layout sets canonical to locale root; child pages override via their own generateMetadata
  const languageAlternates = Object.fromEntries(
    locales.map((l) => [l, `https://metan.lv/${l}`])
  );

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "SIA Ainavas Nams" }],
    robots: "index, follow, max-image-preview:large",
    alternates: {
      // canonical removed — set by each page via generatePageMetadata
      languages: languageAlternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: ogLocaleMap[lang],
      alternateLocale: alternateLocales,
      url: `https://metan.lv/${lang}`,
      siteName: "METAN.LV",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const lang = locale as Locale;

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://metan.lv/#organization",
                name: "SIA Ainavas Nams",
                alternateName: ["METAN.LV", "Ainavas Nams"],
                url: "https://metan.lv",
                logo: "https://metan.lv/logo.png",
                description: metadataByLocale[lang].description,
                foundingDate: "2020",
                areaServed: { "@type": "Country", name: "Latvia" },
                knowsLanguage: ["lv", "ru", "en", "lt"],
                sameAs: ["https://llm.metan.lv"],
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+371-27727724",
                  contactType: "customer service",
                  email: "info@metan.lv",
                  availableLanguage: ["Latvian", "Russian", "English"],
                },
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://metan.lv/#localbusiness",
                name: "METAN.LV",
                image: "https://metan.lv/logo.png",
                url: `https://metan.lv/${lang}`,
                telephone: "+371-27727724",
                email: "info@metan.lv",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Bene",
                  addressLocality: "Dobeles novads",
                  addressCountry: "LV",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 56.4907,
                  longitude: 23.7275,
                },
                openingHoursSpecification: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                priceRange: "$$",
                serviceArea: {
                  "@type": "GeoCircle",
                  geoMidpoint: {
                    "@type": "GeoCoordinates",
                    latitude: 56.9496,
                    longitude: 24.1052,
                  },
                  geoRadius: "300000",
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Pakalpojumi",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Grease trap cleaning",
                        description: "Professional grease trap and separator cleaning for HoReCa and industrial facilities",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Used cooking oil collection",
                        description: "Collection of used oils, fats and food waste with vacuum trucks",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Biomethane production",
                        description: "Organic waste processing into biomethane and CO2",
                      },
                    },
                  ],
                },
              },
              {
                "@type": "WebSite",
                "@id": "https://metan.lv/#website",
                name: "METAN.LV",
                url: "https://metan.lv",
                publisher: { "@id": "https://metan.lv/#organization" },
                inLanguage: ["lv", "ru", "en", "lt"],
              },
            ],
          }),
        }}
      />

      <TranslationProvider initialLocale={lang}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <CookieConsent />
        <ClientComponents />
      </TranslationProvider>
    </>
  );
}
