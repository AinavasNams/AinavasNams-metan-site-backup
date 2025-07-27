import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TranslationProvider } from "@/components/TranslationProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import ClientComponents from "@/components/ClientComponents";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: "METAN.LV - No organiskajiem atkritumiem līdz tīrai enerģijai",
  description: "SIA Ainavas Nams piedāvā sertificētus risinājumus tauku, eļļas un pārtikas atkritumu savākšanai un pārstrādei uz biometānu. Biometāna ražošana Latvijā.",
  keywords: "biometāns, atkritumu savākšana, tauku utilizācija, eļļas savākšana, organisko atkritumu pārstrāde, videi draudzīga enerģija, Latvija",
  authors: [{ name: "SIA Ainavas Nams" }],
  robots: "index, follow",
  openGraph: {
    title: "METAN.LV - Biometāna ražošana Latvijā",
    description: "Sertificēti risinājumi organisko atkritumu savākšanai un pārstrādei uz biometānu.",
    type: "website",
    locale: "lv_LV",
    alternateLocale: ["ru_RU", "en_US"],
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#16a34a'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv" className={inter.variable}>
      <head>
        {/* Critical Resource Preloads for Core Web Vitals */}
        <link rel="preload" href="https://www.googletagmanager.com/gtm.js?id=GTM-5QTWHWF6" as="script" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Google Tag Gateway - First-party Analytics via Cloudflare */}
        <link rel="preconnect" href="https://metan.lv" />
        <link rel="dns-prefetch" href="//metan.lv" />
        
        {/* ТОЛЬКО Google Tag Manager - все остальное через GTM! */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Инициализация dataLayer перед GTM
              window.dataLayer = window.dataLayer || [];
              
              // Google Tag Gateway Configuration
              window.gtag_config = {
                'G-SEE2ZK4Y0J': {
                  'custom_map': {
                    'gtm_container_id': 'GTM-5QTWHWF6',
                    'cloudflare_enabled': true,
                    'first_party_collection': true,
                    'server_container_url': 'https://metan.lv'
                  }
                }
              };
              
              // Enhanced dataLayer для Google Tag Gateway
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                'event': 'gtm.js',
                'gtm.uniqueEventId': 1,
                'cloudflare_gateway': true,
                'first_party_analytics': true,
                'container_id': 'GTM-5QTWHWF6',
                'ga4_id': 'G-SEE2ZK4Y0J',
                'google_ads_id': 'AW-17334979521'
              });
              
              // GTM Container with Google Tag Gateway support
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5QTWHWF6');
              
              // Глобальная функция для новых событий Google Ads с Google Tag Gateway
              window.trackGoogleConversion = function(eventName, parameters = {}) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: eventName,
                  ...parameters,
                  timestamp: new Date().toISOString(),
                  source: 'metan_lv_website',
                  cloudflare_gateway: true,
                  first_party_data: true
                });
                console.log('🎯 Google Conversion Event (via Gateway):', eventName, parameters);
              };
              
              // Google Ads Конверсия "Регистрация" согласно официальному тегу
              window.trackRegistrationConversion = function() {
                // Официальный код события от Google Ads
                gtag('event', 'conversion', {
                  'send_to': 'AW-17334979521/XB6HCNHA__YaEMGX-8lA'
                });
                console.log('🎯 Official Google Ads Registration Conversion tracked');
              };
              
              // Google Ads Конверсия "Регистрация" - Загрузка страницы
              window.trackRegistrationPageLoad = function() {
                // Используем официальный send_to ID
                gtag('event', 'conversion', {
                  'send_to': 'AW-17334979521/XB6HCNHA__YaEMGX-8lA',
                  'value': 1.0,
                  'currency': 'USD'
                });
                
                // Дублируем в dataLayer для GTM
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'registration_page_load',
                  google_ads_conversion_id: 'AW-17334979521',
                  google_ads_conversion_label: 'XB6HCNHA__YaEMGX-8lA',
                  value: 1.0,
                  currency: 'USD'
                });
                
                console.log('📄 Registration Page Load Conversion tracked (Official)');
              };
              
              // Google Ads Конверсия "Регистрация" - Клик по элементу  
              window.trackRegistrationClick = function(elementType = 'button') {
                // Используем официальный send_to ID
                gtag('event', 'conversion', {
                  'send_to': 'AW-17334979521/XB6HCNHA__YaEMGX-8lA',
                  'value': 1.0,
                  'currency': 'USD'
                });
                
                // Дублируем в dataLayer для GTM
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'registration_click',
                  google_ads_conversion_id: 'AW-17334979521',
                  google_ads_conversion_label: 'XB6HCNHA__YaEMGX-8lA',
                  value: 1.0,
                  currency: 'USD',
                  element_type: elementType
                });
                
                console.log('🖱️ Registration Click Conversion tracked (Official):', elementType);
              };
              
              // Автоматическое отслеживание загрузки страницы благодарности
              window.trackThankYouPageLoad = function(pageType = 'konsultacija') {
                // Используем официальный send_to ID
                gtag('event', 'conversion', {
                  'send_to': 'AW-17334979521/XB6HCNHA__YaEMGX-8lA',
                  'value': 1.0,
                  'currency': 'USD'
                });
                
                // Дублируем в dataLayer для GTM
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: 'thank_you_page_load',
                  google_ads_conversion_id: 'AW-17334979521',  
                  google_ads_conversion_label: 'XB6HCNHA__YaEMGX-8lA',
                  value: 1.0,
                  currency: 'USD',
                  page_type: pageType,
                  conversion_url: window.location.href
                });
                
                console.log('✅ Thank You Page Load Conversion tracked (Official):', pageType);
              };
              
              // Новые события конверсий от Google с улучшенной ценностью
              window.triggerCloseConvertLead = function(value = 80, currency = 'EUR') {
                window.trackGoogleConversion('close_convert_lead', {
                  value: value,
                  currency: currency,
                  event_category: 'conversion',
                  event_label: 'lead_closed',
                  conversion_id: 'AW-17334979521/close_convert_lead'
                });
              };
              
              window.triggerContactInteraction = function(contactType = 'general', value = 60) {
                window.trackGoogleConversion('contact_interaction', {
                  contact_type: contactType,
                  value: value,
                  currency: 'EUR',
                  event_category: 'engagement',
                  event_label: contactType,
                  conversion_id: 'AW-17334979521/contact_interaction'
                });
              };
              
              window.triggerQualifyLead = function(leadQuality = 'medium', value = 70) {
                window.trackGoogleConversion('qualify_lead', {
                  lead_quality: leadQuality,
                  value: value,
                  currency: 'EUR',
                  event_category: 'qualification',
                  event_label: leadQuality,
                  conversion_id: 'AW-17334979521/qualify_lead'
                });
              };
              
              console.log('🚀 GTM Container GTM-5QTWHWF6 loading via Google Tag Gateway...');
              console.log('📊 New Google Ads conversion events ready (first-party data)');
              console.log('💡 Use triggerCloseConvertLead(), triggerContactInteraction(), triggerQualifyLead() for testing');
              
              // Проверка GTM загрузки и Google Tag Gateway
              setTimeout(function() {
                if (window.google_tag_manager) {
                  console.log('✅ GTM Container GTM-5QTWHWF6 loaded successfully via Cloudflare Gateway');
                  console.log('📈 Analytics: GA4 (G-SEE2ZK4Y0J) and Google Ads (AW-17334979521) via GTM');
                  console.log('🛡️ First-party data collection enabled via metan.lv domain');
                } else {
                  console.warn('⚠️ GTM Container GTM-5QTWHWF6 not found - check if container is published');
                }
              }, 2000);
            `,
          }}
        />
        
        {/* Google Tag Gateway - GA4 через первую сторону */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SEE2ZK4Y0J"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Конфигурация GA4 для Google Tag Gateway
              gtag('config', 'G-SEE2ZK4Y0J', {
                'cookie_domain': 'metan.lv',
                'cookie_flags': 'SameSite=None;Secure',
                'first_party_collection': true,
                'server_container_url': 'https://metan.lv',
                'transport_url': 'https://metan.lv',
                'custom_parameter': 'cloudflare_gateway_enabled'
              });
              
              // Google Ads конфигурация согласно официальным инструкциям
              gtag('config', 'AW-17334979521');
              
              // Enhanced measurement для лучшего отслеживания
              gtag('config', 'G-SEE2ZK4Y0J', {
                'enhanced_measurement': true,
                'link_attribution': true,
                'allow_ad_personalization_signals': true,
                'allow_google_signals': true
              });
              
              console.log('📊 GA4 (G-SEE2ZK4Y0J) loaded via Google Tag Gateway');
              console.log('🛡️ First-party cookies enabled via metan.lv domain');
            `,
          }}
        />
        
        {/* Essential SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        {/* viewport and theme-color are now handled by Next.js viewport export */}
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QTWHWF6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <TranslationProvider>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster />
          <CookieConsent />
          
          {/* Conversion Enhancement Components */}
          <ClientComponents />
          
          {/* Analytics загружаем в конце для неблокирующей работы */}
          <Analytics />
        </TranslationProvider>
      </body>
    </html>
  );
}