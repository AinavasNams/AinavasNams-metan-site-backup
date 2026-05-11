'use client';

import { useEffect } from 'react';
import { initializePageTracking } from '@/lib/gtm-events';
import { initializeEnhancedEcommerce } from '@/lib/ga4-events';

/**
 * Утилиты очистки данных событий перед отправкой в dataLayer/gtag.
 * (оставляем как есть, это не связано с Cloudflare)
 */
const sanitizeAnalyticsValue = (value: any, seen: WeakSet<object>): any => {
  if (value === null) return null;
  if (value === undefined) return undefined;

  const valueType = typeof value;

  if (valueType === 'string' || valueType === 'boolean') {
    return value;
  }

  if (valueType === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (valueType === 'bigint') {
    return value.toString();
  }

  if (valueType === 'symbol' || valueType === 'function') {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof URL !== 'undefined' && value instanceof URL) {
    return value.toString();
  }

  if (typeof RegExp !== 'undefined' && value instanceof RegExp) {
    return value.toString();
  }

  if (typeof File !== 'undefined' && value instanceof File) {
    return {
      name: value.name,
      size: value.size,
      type: value.type,
      lastModified: value.lastModified,
    };
  }

  if (typeof Blob !== 'undefined' && value instanceof Blob) {
    return {
      size: value.size,
      type: value.type,
    };
  }

  if (Array.isArray(value)) {
    const sanitizedArray: any[] = [];
    for (const item of value) {
      const sanitizedItem = sanitizeAnalyticsValue(item, seen);
      if (sanitizedItem !== undefined) {
        sanitizedArray.push(sanitizedItem);
      }
    }
    return sanitizedArray;
  }

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack ? value.stack.split('\n').slice(0, 3).join('\n') : undefined,
    };
  }

  if (value instanceof Map) {
    const mapped: Record<string, any> = {};
    value.forEach((mapValue, key) => {
      const sanitizedMapValue = sanitizeAnalyticsValue(mapValue, seen);
      if (sanitizedMapValue !== undefined) {
        mapped[String(key)] = sanitizedMapValue;
      }
    });
    return mapped;
  }

  if (value instanceof Set) {
    const sanitizedSet: any[] = [];
    value.forEach((entry) => {
      const sanitizedEntry = sanitizeAnalyticsValue(entry, seen);
      if (sanitizedEntry !== undefined) {
        sanitizedSet.push(sanitizedEntry);
      }
    });
    return sanitizedSet;
  }

  if (typeof window !== 'undefined') {
    if (typeof Element !== 'undefined' && value instanceof Element) {
      return {
        tag: value.tagName,
        id: value.id || undefined,
        class: value.className || undefined,
      };
    }

    if (typeof Event !== 'undefined' && value instanceof Event) {
      const target = value.target;
      const targetTag =
        target && typeof (target as Element).tagName === 'string'
          ? (target as Element).tagName
          : undefined;

      return {
        type: value.type,
        target: targetTag,
      };
    }
  }

  if (valueType === 'object') {
    if (seen.has(value)) {
      return undefined;
    }

    seen.add(value);
    const sanitizedObject: Record<string, any> = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      const sanitizedNestedValue = sanitizeAnalyticsValue(nestedValue, seen);
      if (sanitizedNestedValue !== undefined) {
        sanitizedObject[key] = sanitizedNestedValue;
      }
    }
    seen.delete(value);

    return sanitizedObject;
  }

  return undefined;
};

const sanitizeAnalyticsPayload = (
  payload?: Record<string, any> | null
): Record<string, any> => {
  if (!payload || typeof payload !== 'object') {
    return {};
  }

  const sanitized = sanitizeAnalyticsValue(payload, new WeakSet());
  return sanitized && typeof sanitized === 'object' ? sanitized : {};
};

const pushToDataLayer = (payload: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  try {
    window.dataLayer = window.dataLayer || [];
    const sanitizedPayload = sanitizeAnalyticsPayload(payload);
    window.dataLayer.push(sanitizedPayload);
  } catch (error) {
    console.warn('Analytics dataLayer push prevented', error);
  }
};

// Универсальная отправка события
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window === 'undefined') return;
  try {
    const safeParameters = sanitizeAnalyticsPayload(parameters);

    // GTM
    pushToDataLayer({
      event: eventName,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title,
      ...safeParameters,
    });

    // GA4 через gtag, если он уже есть (он должен быть развёрнут GTM)
    if (window.gtag) {
      window.gtag('event', eventName, {
        custom_parameter: 'metan_lv_action',
        ...safeParameters,
      });
    }

    console.log('Analytics event tracked:', eventName, safeParameters);
  } catch {
    console.warn('Analytics tracking error prevented:', eventName);
  }
};

// Примеры обёрток
export const trackCTA = (
  ctaType: string,
  location: string,
  destination?: string
) => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    page_location: location,
    destination: destination,
    event_category: 'engagement',
    event_label: `${ctaType}_${location}`,
  });
};

export const trackFormSubmission = (
  formType: string,
  formData?: Record<string, any>
) => {
  try {
    const safeFormData = sanitizeAnalyticsPayload(formData);

    trackEvent('form_submit', {
      form_type: formType,
      event_category: 'form_interaction',
      event_label: formType,
      ...safeFormData,
    });

    // Дополнительный пуш в dataLayer для GTM как конверсия
    if (
      typeof window !== 'undefined' &&
      window.dataLayer &&
      (formType === 'contact_form' || formType === 'document_request')
    ) {
      pushToDataLayer({
        event: 'enhanced_conversion',
        conversion_type: formType,
        value: formType === 'contact_form' ? 80 : 75,
        currency: 'EUR',
        transaction_id: `${formType}_${Date.now()}`,
        google_ads_integration: true,
        // cloudflare_ready: true,   <-- ВЫКИНУЛИ
        ...safeFormData,
      });

      console.log(
        '✅ Enhanced conversion event sent to GTM DataLayer:',
        formType
      );
    }
  } catch {
    console.warn('Analytics tracking error prevented:', formType);
  }
};

export const trackFormStart = (formType: string) => {
  trackEvent('form_start', {
    form_type: formType,
    event_category: 'form_interaction',
    event_label: `${formType}_started`,
  });
};

export const trackInvestmentInterest = (
  interestType: string,
  amount?: number
) => {
  trackEvent('investment_interest', {
    interest_type: interestType,
    potential_amount: amount,
    event_category: 'investment',
    event_label: interestType,
  });
};

export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent('language_change', {
    from_language: fromLang,
    to_language: toLang,
    event_category: 'user_preference',
    event_label: `${fromLang}_to_${toLang}`,
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    event_category: 'engagement',
    event_label: `${depth}%`,
  });
};

export const trackTimeOnPage = (
  timeSeconds: number,
  pageName: string
) => {
  trackEvent('time_on_page', {
    time_seconds: timeSeconds,
    page_name: pageName,
    event_category: 'engagement',
    event_label: `${pageName}_${Math.round(timeSeconds)}s`,
  });
};

export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    event_category: 'file_engagement',
    event_label: fileName,
  });
};

export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_click', {
    external_url: url,
    link_text: linkText,
    event_category: 'external_engagement',
    event_label: url,
  });
};

export const trackProjectPageView = (
  projectName: string,
  userBehavior?: Record<string, any>
) => {
  const safeUserBehavior = sanitizeAnalyticsPayload(userBehavior);

  trackEvent('project_page_view', {
    project_name: projectName,
    event_category: 'project_engagement',
    event_label: projectName,
    ...safeUserBehavior,
  });

  // доп. пуши в dataLayer (без gateway-бреда)
  if (typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer({
      event: 'investor_interest',
      project_name: projectName,
      interest_level: 'browsing',
      value: 25,
      currency: 'EUR',
      ...safeUserBehavior,
    });
  }
};

export const trackPageView = (
  pageName: string,
  pageData?: Record<string, any>
) => {
  trackEvent('page_view', {
    page_name: pageName,
    event_category: 'page_engagement',
    event_label: pageName,
    ...pageData,
  });
};

export const trackROICalculation = (calculationData: Record<string, any>) => {
  trackEvent('roi_calculation', {
    ...calculationData,
    event_category: 'calculator_usage',
    event_label: 'roi_calculated',
  });
};

export const trackUserDemographics = (
  demographicData: Record<string, any>
) => {
  trackEvent('user_demographics', {
    ...demographicData,
    event_category: 'user_profile',
    event_label: 'demographic_data',
  });
};

export const trackPhoneConversion = (phoneNumber: string, url?: string) => {
  console.log('📞 Phone conversion triggered:', phoneNumber);

  trackEvent('phone_conversion', {
    phone_number: phoneNumber,
    event_category: 'conversion',
    event_label: 'phone_call',
  });

  // dataLayer push как "это конверсия"
  if (typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer({
      event: 'phone_conversion_enhanced',
      phone_number: phoneNumber,
      value: 90,
      currency: 'EUR',
      conversion_type: 'phone_call',
    });
  }

  if (url && typeof window !== 'undefined') {
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  }
};

export const trackServiceInterest = (
  serviceType: string,
  location: string,
  userData?: Record<string, any>
) => {
  trackEvent('service_interest', {
    service_type: serviceType,
    page_location: location,
    event_category: 'service_engagement',
    event_label: `${serviceType}_${location}`,
    potential_customer: true,
    ...userData,
  });

  // high-value услуги пушим дополнительно в dataLayer
  if (
    ['biogaz', 'skalosana', 'tauki', 'bio_energy', 'atkritumu_savaksana'].includes(
      serviceType
    ) &&
    typeof window !== 'undefined' &&
    window.dataLayer
  ) {
    pushToDataLayer({
      event: 'qualified_service_interest',
      service_type: serviceType,
      page_location: location,
      value: 60,
      currency: 'EUR',
      lead_quality: 'high',
      ...userData,
    });
  }
};

export const trackDocumentRequest = (
  documentName: string,
  userInfo?: Record<string, any>
) => {
  trackEvent('document_request', {
    document_name: documentName,
    event_category: 'document_engagement',
    event_label: documentName,
    ...userInfo,
  });

  if (typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer({
      event: 'qualified_document_request',
      document_name: documentName,
      value: 60,
      currency: 'EUR',
      lead_quality: 'high',
      ...userInfo,
    });
  }
};

export const trackDocumentInterest = (
  documentType: string,
  documentName: string,
  userInfo?: Record<string, any>
) => {
  const safeUserInfo = sanitizeAnalyticsPayload(userInfo);

  trackEvent('document_interest', {
    document_type: documentType,
    document_name: documentName,
    event_category: 'document_engagement',
    event_label: `${documentType}_${documentName}`,
    ...safeUserInfo,
  });

  if (
    ['business_plan', 'financial_model', 'license'].includes(documentType) &&
    typeof window !== 'undefined' &&
    window.dataLayer
  ) {
    pushToDataLayer({
      event: 'qualified_document_interest',
      document_type: documentType,
      document_name: documentName,
      value: 40,
      currency: 'EUR',
      lead_quality: 'high',
      ...safeUserInfo,
    });
  }
};

export const trackInvestorAction = (
  actionType: string,
  projectName?: string,
  userData?: Record<string, any>
) => {
  const safeUserData = sanitizeAnalyticsPayload(userData);

  trackEvent('investor_action', {
    action_type: actionType,
    project_name: projectName,
    event_category: 'investor_engagement',
    event_label: `${actionType}_${projectName || 'general'}`,
    ...safeUserData,
  });

  const conversionValues: Record<string, number> = {
    document_request: 75,
    contact_form: 100,
    phone_call: 150,
    meeting_request: 200,
    investment_inquiry: 250,
  };

  const value = conversionValues[actionType] || 25;

  if (typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer({
      event: 'investor_conversion',
      action_type: actionType,
      project_name: projectName,
      value: value,
      currency: 'EUR',
      lead_quality: 'very_high',
      ...safeUserData,
    });
  }
};

export const trackContactInteraction = (
  interactionType: string,
  contactInfo?: string
) => {
  trackEvent('contact_interaction', {
    interaction_type: interactionType,
    contact_info: contactInfo,
    event_category: 'contact_engagement',
    event_label: interactionType,
  });

  if (typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer({
      event: 'contact_conversion',
      interaction_type: interactionType,
      value:
        interactionType === 'phone_call'
          ? 60
          : interactionType === 'email_click'
          ? 40
          : 80,
      currency: 'EUR',
      lead_quality: 'high',
    });
  }
};

export const trackUserJourney = (
  journeyStep: string,
  stepData?: Record<string, any>
) => {
  const safeStepData = sanitizeAnalyticsPayload(stepData);

  trackEvent('user_journey', {
    journey_step: journeyStep,
    event_category: 'user_flow',
    event_label: journeyStep,
    ...safeStepData,
  });

  const funnelSteps: Record<string, number> = {
    homepage_visit: 1,
    services_viewed: 2,
    project_explored: 3,
    calculator_used: 4,
    document_requested: 5,
    contact_initiated: 6,
    form_submitted: 7,
  };

  const stepValue = funnelSteps[journeyStep] || 0;

  if (
    stepValue > 0 &&
    typeof window !== 'undefined' &&
    window.dataLayer
  ) {
    pushToDataLayer({
      event: 'funnel_progression',
      journey_step: journeyStep,
      funnel_step: stepValue,
      value: stepValue * 5,
      currency: 'EUR',
      ...safeStepData,
    });
  }
};

/**
 * Основной компонент: клиентская инициализация аналитики.
 * Вся логика Cloudflare Gateway, initializeGoogleTagGateway(), CLOUDFLARE_GTM_CONFIG,
 * проверки "first-party cookies via metan.lv" и т.д. удалена.
 */
export default function Analytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Убедимся, что dataLayer в любом случае есть
    window.dataLayer = window.dataLayer || [];

    const currentPath = window.location.pathname;

    // Авто-конверсия на страницах /paldies/*
    if (currentPath.includes('/paldies/')) {
      console.log('🎯 Thank you page detected:', currentPath);

      const pageType = currentPath.includes('konsultacija')
        ? 'konsultacija'
        : currentPath.includes('investors')
        ? 'investors'
        : currentPath.includes('precizu-piedavajums')
        ? 'precizu-piedavajums'
        : currentPath.includes('atzkazs')
        ? 'atzkazs'
        : 'general';

      setTimeout(() => {
        // кастомные глобальные функции могут быть объявлены в layout или GTM
        if (window.dataLayer) {
          pushToDataLayer({
            event: 'thank_you_page_load',
            page_type: pageType,
            conversion_url: window.location.href,
          });
        }

        console.log('✅ Thank you page conversion tracked:', pageType);
      }, 1000);
    }

    // Form submission tracking via event delegation (no per-element listeners)
    const handleSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.tagName !== 'FORM') return;
      pushToDataLayer({
        event: 'form_submission_conversion',
        form_id: form.id || 'unknown_form',
        form_action: form.action || window.location.href,
        conversion_value: 1,
        currency: 'USD',
      });
    };
    document.addEventListener('submit', handleSubmit, { passive: true });

    // Отслеживание скролла
    let scrollDepthTracked = new Set<number>();
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY /
            (document.body.scrollHeight - window.innerHeight)) *
            100
        );

        const depths = [25, 50, 75, 90, 100];
        depths.forEach((depth) => {
          if (scrollPercent >= depth && !scrollDepthTracked.has(depth)) {
            scrollDepthTracked.add(depth);
            trackScrollDepth(depth);
          }
        });
      }, 250);
    };

    // Время на странице
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) {
        trackTimeOnPage(timeSpent, document.title);
      }
    };

    // Клики по ссылкам (внешние / внутренние важные)
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;

      const href = (link as HTMLAnchorElement).href || '';
      if (!href) return;

      const url = new URL(href, window.location.origin);

      // наружу (уход с сайта)
      if (url.origin !== window.location.origin) {
        trackExternalLink(href, link.textContent || '');
        return;
      }

      // внутри сайта: когда юзер явно идёт в важный раздел
      const hrefLower = href.toLowerCase();
      if (hrefLower.includes('kontakti') || hrefLower.includes('contact')) {
        trackContactInteraction('contact_page');
      }
      if (hrefLower.includes('investoriem') || hrefLower.includes('investor')) {
        trackEvent('investor_interest_nav');
      }
      if (hrefLower.includes('kalkulators') || hrefLower.includes('calculator')) {
        trackEvent('calculator_interest_nav');
      }

      // клик по телефонной ссылке
      if (hrefLower.startsWith('tel:')) {
        const phoneNumber = hrefLower.replace('tel:', '');
        trackPhoneConversion(phoneNumber);
      }

      // клик по email
      if (hrefLower.startsWith('mailto:')) {
        const emailAddr = hrefLower.replace('mailto:', '');
        trackContactInteraction('email_click', emailAddr);
      }
    };

    // Листенеры
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    // Первый page_view
    trackPageView(document.title, {
      page_path: window.location.pathname,
      page_search: window.location.search,
    });

    // отправка базовой демографии
    const trackUserDemographicsOnLoad = () => {
      const userAgent = navigator.userAgent;
      const language = navigator.language;
      const referrer = document.referrer;

      trackUserDemographics({
        user_language: language,
        user_agent: userAgent,
        referrer: referrer,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        page_load_time: new Date().toISOString(),
      });
    };

    trackUserDemographicsOnLoad();

    // Логика "initializePageTracking" и "initializeEnhancedEcommerce"
    const pageType =
      currentPath.includes('investoriem')
        ? 'investor'
        : currentPath.includes('pakalpojumi')
        ? 'services'
        : currentPath.includes('kalkulators')
        ? 'calculator'
        : currentPath.includes('kontakti')
        ? 'contact'
        : 'general';

    initializePageTracking(pageType, currentPath);
    initializeEnhancedEcommerce();

    // финальный статус, но без Cloudflare пропаганды
    setTimeout(() => {
      if (window.google_tag_manager) {
        console.log('✅ GTM Container GTM-5QTWHWF6 active');
      } else {
        console.warn('⚠️ GTM Container missing. Check if GTM-5QTWHWF6 is published or blocked.');
      }

      console.log('📊 GA4 & Ads expected via GTM (no Cloudflare proxy).');
    }, 3000);

    // cleanup
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return null;
}

// типы окна
declare global {
  interface Window {
    gtag?: ((...args: any[]) => void) | undefined;
    dataLayer?: any[];
    google_tag_manager?: any;
  }
}
