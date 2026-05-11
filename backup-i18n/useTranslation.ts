'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { Language, getTranslation } from '@/lib/translations';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export function useTranslationState() {
  const [language, setLanguageState] = useState<Language>('lv');

  useEffect(() => {
    // Get language from URL parameters first, then localStorage, then browser default
    const getInitialLanguage = (): Language => {
      // Check URL parameters
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang') as Language;
        if (urlLang && ['lv', 'ru', 'en'].includes(urlLang)) {
          console.log('Language detected from URL:', urlLang);
          return urlLang;
        }

        // Check localStorage
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['lv', 'ru', 'en'].includes(savedLang)) {
          console.log('Language loaded from localStorage:', savedLang);
          return savedLang;
        }

        // Auto-detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('ru')) return 'ru';
        if (browserLang.startsWith('en')) return 'en';
        
        console.log('Language defaulted to Latvian (lv)');
        return 'lv';
      }
      return 'lv';
    };

    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
    
    // Update URL if no lang parameter exists
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (!urlParams.get('lang')) {
        urlParams.set('lang', initialLang);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    console.log('Setting language to:', lang);
    setLanguageState(lang);
    
    if (typeof window !== 'undefined') {
      // Save to localStorage
      localStorage.setItem('language', lang);
      
      // Update URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('lang', lang);
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({}, '', newUrl);
      
      // Track language change event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'language_change',
          new_language: lang,
          previous_language: language,
          timestamp: new Date().toISOString(),
        });
      }
      
      // Update document language
      document.documentElement.lang = lang;
      
      // Update meta tags dynamically if SEO generator is available
      if (typeof window !== 'undefined' && (window as any).updateSEOMeta) {
        (window as any).updateSEOMeta(lang);
      }
    }
  };

  const t = (key: string) => getTranslation(key, language);

  return { language, setLanguage, t };
}