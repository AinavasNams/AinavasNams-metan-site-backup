import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import React from "react";
import { Inter } from "next/font/google";

import { TranslationProvider } from "@/components/TranslationProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
// import Analytics from "@/components/Analytics"; // временно выключено, чтобы не дублировать трекинг
import CookieConsent from "@/components/CookieConsent";
import ClientComponents from "@/components/ClientComponents";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

if (!GTM_ID) {
  throw new Error(
    "NEXT_PUBLIC_GTM_ID is not defined. Проверь .env.production и .env.production.example"
  );
}

export const metadata: Metadata = {
  title: "METAN.LV - No organiskajiem atkritumiem līdz tīrai enerģijai",
  description:
    "SIA Ainavas Nams piedāvā sertificētus risinājumus tauku, eļļas un pārtikas atkritumu savākšanai un pārstrādei uz biometānu. Biometāna ražošana Latvijā.",
  keywords:
    "biometāns, atkritumu savākšana, tauku utilizācija, eļļas savākšana, organisko atkritumu pārstrāde, videi draudzīga enerģija, Latvija",
  authors: [{ name: "SIA Ainavas Nams" }],
  robots: "index, follow",
  openGraph: {
    title: "METAN.LV - Biometāna ražošana Latvijā",
    description:
      "Sertificēti risinājumi organisko atkritumu savākšanai un pārstrādei uz biometānu.",
    type: "website",
    locale: "lv_LV",
    alternateLocale: ["ru_RU", "en_US"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv" className={inter.variable}>
      <head>
        {/* Performance hints for analytics */}
        <link
          rel="preload"
          href={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          as="script"
        />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Инициализируем dataLayer до загрузки GTM */}
        <Script id="init-datalayer" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'page_init',
              timestamp: Date.now()
            });
          `}
        </Script>

        {/* Google Tag Manager (direct, no Cloudflare gateway, no Zaraz) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event:'gtm.js'
                });
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Robots / SEO */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large"
        />
        {/* viewport / themeColor handled by Next viewport export */}
      </head>

      <body className="font-sans antialiased">
        {/* GTM noscript fallback: required for tag compliance */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <TranslationProvider>
          <Navigation />

          <main>{children}</main>

          <Footer />

          {/* Toast notifications (form success etc.) */}
          <Toaster />

          {/* Cookie consent banner.
             Если он продолжает инициировать свой Consent Mode и ломает консоль,
             временно убери компонент из дерева на время отладки.
          */}
          <CookieConsent />

          {/* Client-side helpers (click-to-call tracking, smooth UI, etc.)
             ДОЛЖЕН БЫТЬ РОВНО ОДИН РАЗ.
             Внутри этого компонента мы будем дергать trackEvent(...)
             для calc_complete и lead_submit.
          */}
          <ClientComponents />

          {/*
          <Analytics />
          */}
        </TranslationProvider>
      </body>
    </html>
  );
}
