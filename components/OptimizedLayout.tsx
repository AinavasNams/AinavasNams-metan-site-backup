import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TranslationProvider } from "@/components/TranslationProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import OptimizedAnalytics from "@/components/OptimizedAnalytics";
import OptimizedCookieConsent from "@/components/OptimizedCookieConsent";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "METAN.LV - No organiskajiem atkritumiem līdz tīrai enerģijai",
  description: "SIA Ainavas Nams piedāvā sertificētus risinājumus tauku, eļļas un pārtikas atkritumu savākšanai un pārstrādei uz biometānu. Biometāna ražošana Latvijā.",
  keywords: "biometāns, atkritumu savākšana, tauku utilizācija, eļļas savākšana, organisko atkritumu pārstrāde, videi draudzīga enerģija, Latvija",
  authors: [{ name: "SIA Ainavas Nams" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "METAN.LV - Biometāna ražošana Latvijā",
    description: "Sertificēti risinājumi organisko atkritumu savākšanai un pārstrādei uz biometānu.",
    type: "website",
    locale: "lv_LV",
    alternateLocale: ["ru_RU", "en_US"],
  }
};

export default function OptimizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv" className={inter.variable}>
      <head>
        {/* Критичные мета-теги для LCP */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://www.metan.lv" />
        
        {/* Preconnect для улучшения загрузки */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Оптимизированный GTM - только критичная часть */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5QTWHWF6');
            `,
          }}
        />
        
        {/* Минимальная GA4 инициализация */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SEE2ZK4Y0J"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'personalization_storage': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted'
              });
              gtag('js', new Date());
              gtag('config', 'G-SEE2ZK4Y0J', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `,
          }}
        />
        
        {/* Структурированные данные для SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SIA Ainavas Nams",
              "alternateName": "METAN.LV",
              "url": "https://www.metan.lv",
              "logo": "https://www.metan.lv/logo.png",
              "description": "Sertificēti risinājumi organisko atkritumu savākšanai un pārstrādei uz biometānu",
              "foundingDate": "2021",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+371-26000000",
                "contactType": "customer service",
                "availableLanguage": ["lv", "ru", "en"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "LV",
                "addressRegion": "Dobeles novads",
                "addressLocality": "Bēne"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Latvia"
              }
            })
          }}
        />
      </head>
      
      <body className="font-sans antialiased bg-white">
        {/* GTM noscript - минимальный код */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QTWHWF6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <TranslationProvider>
          <OptimizedAnalytics />
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster />
          <OptimizedCookieConsent />
        </TranslationProvider>
      </body>
    </html>
  );
}