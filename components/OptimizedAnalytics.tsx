'use client';

import { useEffect } from 'react';

// Оптимизированный Analytics компонент для Core Web Vitals
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // GTM DataLayer push (приоритет)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      current_page_title: document.title,
      ...parameters,
    });
    
    // GA4 tracking (fallback)
    if (window.gtag) {
      window.gtag('event', eventName, {
        custom_parameter: 'metan_lv_action',
        ...parameters,
      });
    }
    
    console.log('✅ Analytics event tracked:', eventName, parameters);
  }
};

// Специальные функции для CTA tracking (критично для B2B)
export const trackCTA = (ctaType: string, location: string, destination?: string) => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    page_location: location,
    destination: destination,
    event_category: 'engagement',
    event_label: `${ctaType}_${location}`,
  });
};

// Форма заявки (критично для конверсии)
export const trackFormSubmission = (formType: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', {
    form_type: formType,
    event_category: 'form_interaction',
    event_label: formType,
    ...formData,
  });
};

// Отслеживание инвестиционного интереса
export const trackInvestmentInterest = (interestType: string, amount?: number) => {
  trackEvent('investment_interest', {
    interest_type: interestType,
    potential_amount: amount,
    event_category: 'investment',
    event_label: interestType,
  });
};

// Оптимизированный Analytics компонент
export default function OptimizedAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Инициализация GTM DataLayer
      window.dataLayer = window.dataLayer || [];
      
      // Оптимизированная gtag функция
      window.gtag = function() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(arguments);
      };
      
      console.log('🚀 GTM DataLayer initialized');
      
      // Throttled scroll tracking для LCP оптимизации
      let scrollDepthTracked = new Set();
      let scrollTimeout: NodeJS.Timeout;
      
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
          );
          
          const depths = [25, 50, 75, 90, 100];
          depths.forEach(depth => {
            if (scrollPercent >= depth && !scrollDepthTracked.has(depth)) {
              scrollDepthTracked.add(depth);
              trackEvent('scroll_depth', {
                scroll_depth: depth,
                event_category: 'engagement',
                event_label: `${depth}%`,
              });
            }
          });
        }, 250); // Throttle 250ms для производительности
      };

      // Оптимизированное отслеживание времени на странице
      const startTime = Date.now();
      const handleBeforeUnload = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent > 10) {
          trackEvent('time_on_page', {
            time_seconds: timeSpent,
            page_name: document.title,
            event_category: 'engagement',
            event_label: `${document.title}_${Math.round(timeSpent)}s`,
          });
        }
      };

      // Пассивные слушатели для лучшей производительности
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('beforeunload', handleBeforeUnload, { passive: true });

      // Начальное отслеживание страницы
      trackEvent('page_view', {
        page_name: document.title,
        page_path: window.location.pathname,
        page_search: window.location.search,
        event_category: 'page_engagement',
        event_label: document.title,
      });

      console.log('🚀 Optimized Analytics initialized for Core Web Vitals');

      // Cleanup
      return () => {
        clearTimeout(scrollTimeout);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  return null;
}

// Global type definitions
declare global {
  interface Window {
    gtag?: ((...args: any[]) => void) | undefined;
    dataLayer?: any[];
  }
}