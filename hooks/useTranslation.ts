'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { type Language, getTranslation } from '@/lib/i18n';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  localePath: (href: string) => string;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

const SUPPORTED: Language[] = ['lv', 'ru', 'lt', 'en'];

/**
 * Accepts optional initialLocale from server component (SSR-aware).
 * Falls back to URL path detection / localStorage / browser detection.
 */
export function useTranslationState(initialLocale?: Language) {
  // Use server-provided locale as initial state (avoids hydration mismatch)
  const [language, setLanguageState] = useState<Language>(initialLocale || 'lv');

  useEffect(() => {
    // If server already told us the locale, just sync localStorage
    if (initialLocale && SUPPORTED.includes(initialLocale)) {
      localStorage.setItem('language', initialLocale);
      document.documentElement.lang = initialLocale;
      return;
    }

    // Fallback: detect from URL path, query param, localStorage, or browser
    const getDetectedLanguage = (): Language => {
      if (typeof window === 'undefined') return 'lv';

      // 1. Check URL path (new /[locale]/ format)
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const pathLang = pathSegments[0]?.toLowerCase() as Language;
      if (pathLang && SUPPORTED.includes(pathLang)) {
        return pathLang;
      }

      // 2. Check ?lang= query parameter (legacy)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang') as Language;
      if (urlLang && SUPPORTED.includes(urlLang)) {
        return urlLang;
      }

      // 3. Check localStorage
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && SUPPORTED.includes(savedLang)) {
        return savedLang;
      }

      // 4. Auto-detect from browser
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ru')) return 'ru';
      if (browserLang.startsWith('lt')) return 'lt';
      if (browserLang.startsWith('en')) return 'en';

      return 'lv';
    };

    const detectedLang = getDetectedLanguage();
    setLanguageState(detectedLang);
    localStorage.setItem('language', detectedLang);
    document.documentElement.lang = detectedLang;
  }, [initialLocale]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);

      // Navigate to new locale path
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const currentLocale = pathSegments[0]?.toLowerCase();
      if (currentLocale && SUPPORTED.includes(currentLocale as Language)) {
        // Replace locale segment
        pathSegments[0] = lang;
      } else {
        // Prepend locale
        pathSegments.unshift(lang);
      }
      const newPath = '/' + pathSegments.join('/');
      window.location.href = newPath;

      // Track language change
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'language_change',
          new_language: lang,
          previous_language: language,
          timestamp: new Date().toISOString(),
        });
      }

      document.documentElement.lang = lang;
    }
  };

  const t = (key: string) => getTranslation(key, language);

  const localePath = (href: string) => {
    if (href.startsWith('http') || href.startsWith('/api/') || href.startsWith('/_next/')) {
      return href;
    }
    const cleanHref = href === '/' ? '' : href;
    return `/${language}${cleanHref}`;
  };

  return { language, setLanguage, t, localePath };
}
