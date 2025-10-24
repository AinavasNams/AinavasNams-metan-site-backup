'use client';

import { useEffect } from 'react';
import { initializePageTracking } from '@/lib/gtm-events';
import { initializeEnhancedEcommerce } from '@/lib/ga4-events';
import { initializeGoogleTagGateway, testGoogleTagGateway, CLOUDFLARE_GTM_CONFIG } from '@/lib/cloudflare-gtm-config';

/**
 * Sanitizes analytics payloads to avoid circular references and unsupported values when
 * data is forwarded to `JSON.stringify`, `dataLayer.push`, or `gtag`.
 * The sanitizer removes functions/symbols, flattens DOM/Event objects, and guards against
 * recursive structures by tracking seen objects.
 */
const sanitizeAnalyticsValue = (value: any, seen: WeakSet<object>): any => {
  if (value === null) {
    return null;
  }

  if (value === undefined) {
    return undefined;
  }

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

const sanitizeAnalyticsPayload = (payload?: Record<string, any> | null): Record<string, any> => {
  if (!payload || typeof payload !== 'object') {
    return {};
  }

  const sanitized = sanitizeAnalyticsValue(payload, new WeakSet());

  return sanitized && typeof sanitized === 'object' ? sanitized : {};
};

const pushToDataLayer = (payload: Record<string, any>) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    const sanitizedPayload = sanitizeAnalyticsPayload(payload);
    window.dataLayer.push(sanitizedPayload);
  } catch (error) {
    console.warn('Analytics dataLayer push prevented', error);
  }
};

// Enhanced Analytics with GTM DataLayer support
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    try {
      // Ensure parameters are safely serializable
      const safeParameters = sanitizeAnalyticsPayload(parameters);

      // GTM DataLayer push
      pushToDataLayer({
        event: eventName,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_title: document.title,
        ...safeParameters,
      });
      
      // GA4 tracking
      if (window.gtag) {
        window.gtag('event', eventName, {
          custom_parameter: 'metan_lv_action',
          ...safeParameters,
        });
      }
      
      console.log('Analytics event tracked:', eventName, safeParameters);
    } catch (error) {
      // Prevent console plugin parsing errors
      console.warn('Analytics tracking error prevented:', eventName);
    }
  }
};

// CTA click tracking
export const trackCTA = (ctaType: string, location: string, destination?: string) => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    page_location: location,
    destination: destination,
    event_category: 'engagement',
    event_label: `${ctaType}_${location}`,
  });
};

// Form submission tracking  
export const trackFormSubmission = (formType: string, formData?: Record<string, any>) => {
  try {
    // Ensure formData is safely serializable
    const safeFormData = sanitizeAnalyticsPayload(formData);
    
    trackEvent('form_submit', {
      form_type: formType,
      event_category: 'form_interaction',
      event_label: formType,
      ...safeFormData,
    });
    
    // Track Google Ads conversion for important forms using NEW events
    if (formType === 'contact_form' || formType === 'document_request') {
      console.log('🎯 Tracking important form submission with NEW Google events:', formType);
      
      // NEW Google Ads Events Integration
      if (typeof window !== 'undefined') {
        // Trigger new Google conversion events
        if (formType === 'contact_form') {
          window.triggerContactInteraction && window.triggerContactInteraction('form_contact', 80);
          window.triggerQualifyLead && window.triggerQualifyLead('high', 85);
        }
        
        if (formType === 'document_request') {
          window.triggerContactInteraction && window.triggerContactInteraction('document_request', 75);
          window.triggerQualifyLead && window.triggerQualifyLead('medium', 70);
        }
        
        // Enhanced DataLayer event for GTM
        if (window.dataLayer) {
          pushToDataLayer({
            event: 'enhanced_conversion',
            conversion_type: formType,
            value: formType === 'contact_form' ? 80 : 75,
            currency: 'EUR',
            transaction_id: `${formType}_${Date.now()}`,
            google_ads_integration: true,
            cloudflare_ready: true,
            ...safeFormData,
          });
          console.log('✅ Enhanced conversion event sent to GTM DataLayer');
        }
      }
    }
  } catch (error) {
    // Prevent console plugin parsing errors
    console.warn('Analytics tracking error prevented:', formType);
  }
};

// Form start tracking
export const trackFormStart = (formType: string) => {
  trackEvent('form_start', {
    form_type: formType,
    event_category: 'form_interaction',
    event_label: `${formType}_started`,
  });
};

// Investment interest tracking
export const trackInvestmentInterest = (interestType: string, amount?: number) => {
  trackEvent('investment_interest', {
    interest_type: interestType,
    potential_amount: amount,
    event_category: 'investment',
    event_label: interestType,
  });
};

// Language change tracking
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent('language_change', {
    from_language: fromLang,
    to_language: toLang,
    event_category: 'user_preference',
    event_label: `${fromLang}_to_${toLang}`,
  });
};

// Scroll depth tracking
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    event_category: 'engagement',
    event_label: `${depth}%`,
  });
};

// Time on page tracking
export const trackTimeOnPage = (timeSeconds: number, pageName: string) => {
  trackEvent('time_on_page', {
    time_seconds: timeSeconds,
    page_name: pageName,
    event_category: 'engagement',
    event_label: `${pageName}_${Math.round(timeSeconds)}s`,
  });
};

// File download tracking
export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    event_category: 'file_engagement',
    event_label: fileName,
  });
};

// External link tracking
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_click', {
    external_url: url,
    link_text: linkText,
    event_category: 'external_engagement',
    event_label: url,
  });
};

// Project page tracking with detailed analytics
export const trackProjectPageView = (projectName: string, userBehavior?: Record<string, any>) => {
  const safeUserBehavior = sanitizeAnalyticsPayload(userBehavior);

  trackEvent('project_page_view', {
    project_name: projectName,
    event_category: 'project_engagement',
    event_label: projectName,
    ...safeUserBehavior,
  });
  
  // Track project interest as potential investor lead with NEW Google events
  if (typeof window !== 'undefined') {
    // Trigger contact_interaction for project page views
    if (window.triggerContactInteraction) {
      window.triggerContactInteraction('project_page_view', 35);
    }
    
    // Qualify lead based on project type
    if (window.triggerQualifyLead) {
      const highValueProjects = ['biometans', 'biopolimeri', 'co2'];
      const isHighValue = highValueProjects.some(project => projectName.toLowerCase().includes(project));
      
      const quality = isHighValue ? 'high' : 'medium';
      const value = isHighValue ? 50 : 35;
      
      window.triggerQualifyLead(quality, value);
    }
    
    // GTM DataLayer
    if (window.dataLayer) {
      pushToDataLayer({
        event: 'investor_interest',
        project_name: projectName,
        interest_level: 'browsing',
        value: 25,
        currency: 'EUR',
        ...safeUserBehavior,
      });
    }
  }
};

// Page view tracking
export const trackPageView = (pageName: string, pageData?: Record<string, any>) => {
  trackEvent('page_view', {
    page_name: pageName,
    event_category: 'page_engagement',
    event_label: pageName,
    ...pageData,
  });
};

// ROI Calculator usage tracking
export const trackROICalculation = (calculationData: Record<string, any>) => {
  trackEvent('roi_calculation', {
    ...calculationData,
    event_category: 'calculator_usage',
    event_label: 'roi_calculated',
  });
};

// Enhanced Analytics component with scroll tracking
export default function Analytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize GTM DataLayer (если не инициализирован)
      window.dataLayer = window.dataLayer || [];
      
      // Initialize Google Tag Gateway configuration
      initializeGoogleTagGateway();
      
      // Автоматическое отслеживание конверсий на страницах благодарности
      const currentPath = window.location.pathname;
      if (currentPath.includes('/paldies/')) {
        console.log('🎯 Thank you page detected:', currentPath);
        
        // Определяем тип страницы благодарности
        const pageType = currentPath.includes('konsultacija') ? 'konsultacija' :
                        currentPath.includes('investors') ? 'investors' :
                        currentPath.includes('precizu-piedavajums') ? 'precizu-piedavajums' :
                        currentPath.includes('atzkazs') ? 'atzkazs' : 'general';
        
        // Отслеживаем загрузку страницы благодарности как конверсию
        setTimeout(() => {
          if (window.trackThankYouPageLoad) {
            window.trackThankYouPageLoad(pageType);
          }
          
          // Также отслеживаем как registration page load
          if (window.trackRegistrationPageLoad) {
            window.trackRegistrationPageLoad();
          }
          
          console.log('✅ Thank you page conversion tracked:', pageType);
        }, 1000);
      }
      
      // Автоматическое отслеживание кликов по формам как конверсий
      const trackFormClicks = () => {
        // Отслеживаем все формы на сайте
        const forms = document.querySelectorAll('form');
        forms.forEach((form, index) => {
          form.addEventListener('submit', (e) => {
            console.log('📝 Form submission detected:', form);
            
            if (window.trackRegistrationClick) {
              window.trackRegistrationClick('form_submit');
            }
            
            // Дополнительное отслеживание через dataLayer
            pushToDataLayer({
              event: 'form_submission_conversion',
              form_id: form.id || `form_${index}`,
              form_action: form.action || window.location.href,
              conversion_value: 1,
              currency: 'USD'
            });
          });
        });
        
        // Отслеживаем клики по кнопкам CTA
        const ctaButtons = document.querySelectorAll('button[type="submit"], a[href*="kontakti"], a[href*="konsultacija"], .cta-button');
        ctaButtons.forEach((button) => {
          button.addEventListener('click', (e) => {
            console.log('🖱️ CTA button clicked:', button);
            
            if (window.trackRegistrationClick) {
              window.trackRegistrationClick('cta_button');
            }
          });
        });
        
        // Отслеживаем клики по телефонным номерам
        const phoneLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]');
        phoneLinks.forEach((link) => {
          link.addEventListener('click', (e) => {
            console.log('📞 Phone link clicked:', link.href);
            
            if (window.trackRegistrationClick) {
              window.trackRegistrationClick('phone_click');
            }
          });
        });
        
        // Отслеживаем клики по email ссылкам
        const emailLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]');
        emailLinks.forEach((link) => {
          link.addEventListener('click', (e) => {
            console.log('📧 Email link clicked:', link.href);
            
            if (window.trackRegistrationClick) {
              window.trackRegistrationClick('email_click');
            }
          });
        });
      };
      
      // Инициализируем отслеживание кликов после загрузки DOM
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackFormClicks);
      } else {
        trackFormClicks();
      }
      
      // Переинициализируем при изменении DOM (для SPA навигации)
      const observer = new MutationObserver((mutations) => {
        let shouldReinitialize = false;
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const hasNewForms = Array.from(mutation.addedNodes).some(node => 
              node.nodeType === 1 && (node as Element).tagName === 'FORM'
            );
            if (hasNewForms) {
              shouldReinitialize = true;
            }
          }
        });
        
        if (shouldReinitialize) {
          setTimeout(trackFormClicks, 500);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Wait for GTM to fully load before checking gtag
      setTimeout(() => {
        console.log('- GTM gtag function available:', !!window.gtag);
        console.log('- GTM Manager object available:', !!window.google_tag_manager);
        
        // Check if Google Tag Gateway is working
        if (window.google_tag_manager && window.gtag) {
          console.log('✅ Google Tag Gateway is working correctly');
          console.log('📊 All events will be processed via', CLOUDFLARE_GTM_CONFIG.domain, 'domain');
          console.log('🛡️ First-party cookies enabled for enhanced privacy');
          console.log('⚡ Improved performance through Cloudflare edge network');
        } else {
          console.warn('⚠️ Google Tag Gateway check failed - verify Cloudflare configuration');
        }
        
        // Test basic Gateway functionality
        pushToDataLayer({
          event: 'gateway_health_check',
          timestamp: new Date().toISOString(),
          gtm_loaded: !!window.google_tag_manager,
          gtag_available: !!window.gtag,
          first_party_domain: CLOUDFLARE_GTM_CONFIG.domain,
        });
        
        // Test all new conversion events
        pushToDataLayer({
          event: 'test_conversion',
          timestamp: new Date().toISOString(),
          conversion_value: 1,
          currency: 'USD',
        });
      }, 1000);
      
      // Throttled scroll depth tracking for better Core Web Vitals
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
              trackScrollDepth(depth);
              
              // Trigger qualify_lead for deep engagement
              if (depth >= 75 && window.triggerQualifyLead) {
                window.triggerQualifyLead('engaged_user', 25);
              }
            }
          });
        }, 250);
      };

      // Set up time on page tracking with conversion triggers
      const startTime = Date.now();
      const handleBeforeUnload = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent > 10) {
          trackTimeOnPage(timeSpent, document.title);
          
          // Trigger qualify_lead for long engagement
          if (timeSpent > 120 && window.triggerQualifyLead) { // 2+ minutes
            window.triggerQualifyLead('long_engagement', 35);
          }
        }
      };

      // Enhanced click tracking with conversion events
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const link = target.closest('a');
        
        if (link && link.href) {
          const url = new URL(link.href, window.location.origin);
          
          // External links
          if (url.origin !== window.location.origin) {
            trackExternalLink(link.href, link.textContent || '');
            return;
          }
          
          // Internal navigation - trigger contact_interaction for important pages
          const href = link.href.toLowerCase();
          if (href.includes('kontakti') || href.includes('contact')) {
            window.triggerContactInteraction && window.triggerContactInteraction('contact_page_visit', 40);
          }
          
          if (href.includes('investoriem') || href.includes('investor')) {
            window.triggerQualifyLead && window.triggerQualifyLead('investor_interest', 60);
          }
          
          if (href.includes('kalkulators') || href.includes('calculator')) {
            window.triggerContactInteraction && window.triggerContactInteraction('calculator_interest', 45);
          }
        }
        
        // Phone number clicks
        if (link && link.href.startsWith('tel:')) {
          const phoneNumber = link.href.replace('tel:', '');
          trackPhoneConversion(phoneNumber);
          window.triggerCloseConvertLead && window.triggerCloseConvertLead(90, 'EUR');
        }
        
        // Email clicks
        if (link && link.href.startsWith('mailto:')) {
          window.triggerContactInteraction && window.triggerContactInteraction('email_click', 50);
        }
      };

      // Add passive event listeners for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('beforeunload', handleBeforeUnload, { passive: true });
      document.addEventListener('click', handleClick, { passive: true });

      // Initial page view with conversion context
      trackPageView(document.title, {
        page_path: window.location.pathname,
        page_search: window.location.search,
      });
      
      // Track user demographics if available
      const trackUserDemographicsOnLoad = () => {
        if (typeof window !== 'undefined') {
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
        }
      };
      
      // Track demographics after page load
      trackUserDemographicsOnLoad();

      // Проверяем состояние GTM и новых событий
      const checkEnhancedGTMStatus = () => {
        if (window.google_tag_manager) {
          console.log('✅ GTM Container GTM-5QTWHWF6 is working correctly');
          console.log('📊 Tracking: GA4 and Google Ads via GTM (no duplicates)');
        } else {
          console.warn('⚠️ GTM Container not found. Check:');
          console.warn('1. Container GTM-5QTWHWF6 is published');
          console.warn('2. Ad blockers are not interfering');
        }
        
        // Check new Google events
        if (window.triggerCloseConvertLead && window.triggerContactInteraction && window.triggerQualifyLead) {
          console.log('✅ New Google Ads conversion events ready');
        } else {
          console.warn('⚠️ New Google conversion events not available');
        }
      };

      setTimeout(checkEnhancedGTMStatus, 3000);

      // Initialize new tracking systems
      const pageType = currentPath.includes('investoriem') ? 'investor' :
                       currentPath.includes('pakalpojumi') ? 'services' :
                       currentPath.includes('kalkulators') ? 'calculator' :
                       currentPath.includes('kontakti') ? 'contact' : 'general';
      
      // Initialize GTM events tracking
      initializePageTracking(pageType, currentPath);
      
      // Initialize GA4 Enhanced Ecommerce
      initializeEnhancedEcommerce();
      
      console.log('📊 New tracking systems initialized:', { pageType, currentPath });

      // Enhanced diagnostic functions
      (window as any).diagnoseAnalytics = () => {
        console.log('🔍 Complete Analytics Diagnostic:');
        console.log('- GTM Container: GTM-5QTWHWF6');
        console.log('- GA4 ID: G-SEE2ZK4Y0J (via GTM)');
        console.log('- Google Ads ID: AW-987654321 (via GTM)');
        console.log('- DataLayer:', window.dataLayer?.length || 0, 'events');
        console.log('- New Conversion Events:', {
          closeConvertLead: !!window.triggerCloseConvertLead,
          contactInteraction: !!window.triggerContactInteraction,
          qualifyLead: !!window.triggerQualifyLead
        });
        console.log('- GTM Function:', !!window.gtag);
        console.log('- GTM Manager:', !!window.google_tag_manager);
        return 'Analytics diagnostic complete.';
      };
      
      // Test all new conversion events
      (window as any).testAllConversions = () => {
        console.log('🧪 Testing all Google Ads conversion events...');
        
        if (window.triggerCloseConvertLead) {
          window.triggerCloseConvertLead(1, 'EUR');
          console.log('✅ close_convert_lead event tested');
        }
        
        if (window.triggerContactInteraction) {
          window.triggerContactInteraction('test_contact', 1);
          console.log('✅ contact_interaction event tested');
        }
        
        if (window.triggerQualifyLead) {
          window.triggerQualifyLead('test_lead', 1);
          console.log('✅ qualify_lead event tested');
        }
        
        return 'All conversion events tested. Check GTM Preview mode.';
      };

      console.log('🚀 Enhanced Analytics initialized via Google Tag Gateway');
      console.log('📊 Container:', CLOUDFLARE_GTM_CONFIG.container_id, '| GA4:', CLOUDFLARE_GTM_CONFIG.ga4_id, '| Ads:', CLOUDFLARE_GTM_CONFIG.google_ads_id);
      console.log('🛡️ First-party data collection via', CLOUDFLARE_GTM_CONFIG.domain, 'domain');
      console.log('🎯 New Google Ads Events: close_convert_lead, contact_interaction, qualify_lead');
      console.log('💡 Run diagnoseGoogleTagGateway() for complete diagnostic');
      console.log('🧪 Run testGoogleTagGateway() to test all Gateway functions');
      console.log('📋 CTA tracking enabled for all buttons with micro-conversions');
      console.log('⚡ Optimized for Core Web Vitals with Cloudflare acceleration');

      // Cleanup
      return () => {
        clearTimeout(scrollTimeout);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('click', handleClick);
      };
    }
  }, []);

  return null;
}

// Global type definitions for enhanced analytics
declare global {
  interface Window {
    gtag?: ((...args: any[]) => void) | undefined;
    dataLayer?: any[];
    google_tag_manager?: any;
    
    // New Google Ads Conversion Events (from Google)
    triggerCloseConvertLead?: (value?: number, currency?: string) => void;
    triggerContactInteraction?: (contactType?: string, value?: number) => void; 
    triggerQualifyLead?: (leadQuality?: string, value?: number) => void;
    trackGoogleConversion?: (eventName: string, parameters?: Record<string, any>) => void;
    
    // Google Ads Page Load & Click Conversions
    trackRegistrationPageLoad?: () => void;
    trackRegistrationClick?: (elementType?: string) => void;
    trackThankYouPageLoad?: (pageType?: string) => void;
    trackRegistrationConversion?: () => void;
  }
}

// Enhanced contact interaction tracking with NEW Google events
export const trackContactInteraction = (interactionType: string, contactInfo?: string) => {
  trackEvent('contact_interaction', {
    interaction_type: interactionType,
    contact_info: contactInfo,
    event_category: 'contact_engagement',
    event_label: interactionType,
  });
  
  // Trigger new Google Ads contact_interaction event
  if (typeof window !== 'undefined' && window.triggerContactInteraction) {
    const valueMap = {
      'phone_click': 70,
      'email_click': 50,
      'form_start': 40,
      'chat_open': 35,
      'contact_page': 30
    };
    const value = valueMap[interactionType as keyof typeof valueMap] || 45;
    window.triggerContactInteraction(interactionType, value);
  }
};

// Enhanced phone conversion with close_convert_lead event
export const trackPhoneConversion = (phoneNumber: string, url?: string) => {
  console.log('📞 Phone conversion triggered:', phoneNumber);
  
  // Track in analytics
  trackEvent('phone_conversion', {
    phone_number: phoneNumber,
    event_category: 'conversion',
    event_label: 'phone_call',
  });
  
  // Trigger NEW Google Ads close_convert_lead event (highest value conversion)
  if (typeof window !== 'undefined' && window.triggerCloseConvertLead) {
    window.triggerCloseConvertLead(90, 'EUR'); // High value for phone calls
  }
  
  // Also trigger contact_interaction
  if (typeof window !== 'undefined' && window.triggerContactInteraction) {
    window.triggerContactInteraction('phone_call', 85);
  }
  
  // GTM DataLayer for comprehensive tracking
  if (typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer({
      event: 'phone_conversion_enhanced',
      phone_number: phoneNumber,
      value: 90,
      currency: 'EUR',
      conversion_type: 'phone_call'
    });
  }
  
  // Handle redirect if URL provided
  if (url && typeof window !== 'undefined') {
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  }
};

// Enhanced service tracking with qualify_lead events
export const trackServiceInterest = (serviceType: string, location: string, userData?: Record<string, any>) => {
  trackEvent('service_interest', {
    service_type: serviceType,
    page_location: location,
    event_category: 'service_engagement',
    event_label: `${serviceType}_${location}`,
    potential_customer: true,
    ...userData,
  });
  
  // Trigger qualify_lead for high-value services
  if (['biogaz', 'skalosana', 'tauki', 'bio_energy', 'atkritumu_savaksana'].includes(serviceType)) {
    console.log('🎯 High-value service interest:', serviceType);
    
    if (typeof window !== 'undefined' && window.triggerQualifyLead) {
      const qualityMap = {
        'biogaz': 'very_high',
        'skalosana': 'high', 
        'tauki': 'high',
        'bio_energy': 'very_high',
        'atkritumu_savaksana': 'medium'
      };
      const valueMap = {
        'biogaz': 80,
        'skalosana': 65,
        'tauki': 70,
        'bio_energy': 85,
        'atkritumu_savaksana': 55
      };
      
      const quality = qualityMap[serviceType as keyof typeof qualityMap] || 'medium';
      const value = valueMap[serviceType as keyof typeof valueMap] || 50;
      
      window.triggerQualifyLead(quality, value);
    }
  }
};

// Enhanced document request with qualify_lead progression
export const trackDocumentRequest = (documentName: string, userInfo?: Record<string, any>) => {
  trackEvent('document_request', {
    document_name: documentName,
    event_category: 'document_engagement',
    event_label: documentName,
    ...userInfo,
  });
  
  // Trigger progressive Google Ads events for document requests
  if (typeof window !== 'undefined') {
    // First trigger contact_interaction
    if (window.triggerContactInteraction) {
      window.triggerContactInteraction('document_request', 60);
    }
    
    // Then qualify the lead based on document type
    if (window.triggerQualifyLead) {
      const highValueDocs = ['business_plan', 'financial_model', 'license', 'investment_deck'];
      const isHighValue = highValueDocs.some(doc => documentName.toLowerCase().includes(doc));
      
      const quality = isHighValue ? 'very_high' : 'high';
      const value = isHighValue ? 75 : 55;
      
      window.triggerQualifyLead(quality, value);
    }
  }
};

// Enhanced calculator usage with lead qualification
export const trackCalculatorUsage = (calculatorType: string, inputData: Record<string, any>, results?: Record<string, any>) => {
  trackEvent('calculator_usage', {
    calculator_type: calculatorType,
    input_data: inputData,
    results: results,
    event_category: 'calculator_engagement',
    event_label: calculatorType,
  });
  
  // Calculator completion indicates serious interest
  if (results && typeof window !== 'undefined') {
    // Trigger contact_interaction for calculator use
    if (window.triggerContactInteraction) {
      window.triggerContactInteraction('calculator_completed', 50);
    }
    
    // Qualify lead based on calculator results value
    if (window.triggerQualifyLead) {
      const resultValue = results.estimatedSavings || results.roiValue || 0;
      const quality = resultValue > 5000 ? 'very_high' : resultValue > 1000 ? 'high' : 'medium';
      const conversionValue = Math.min(80, Math.max(30, Math.round(resultValue / 100)));
      
      window.triggerQualifyLead(quality, conversionValue);
    }
  }
};

// Document interest tracking (before download)
export const trackDocumentInterest = (documentType: string, documentName: string, userInfo?: Record<string, any>) => {
  const safeUserInfo = sanitizeAnalyticsPayload(userInfo);

  trackEvent('document_interest', {
    document_type: documentType,
    document_name: documentName,
    event_category: 'document_engagement',
    event_label: `${documentType}_${documentName}`,
    ...safeUserInfo,
  });
  
  // Track business plan and financial documents as high-value
  if (['business_plan', 'financial_model', 'license'].includes(documentType)) {
    console.log('🎯 High-value document interest:', documentName);
    if (typeof window !== 'undefined' && window.dataLayer) {
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
  }
};

// Enhanced investor tracking with detailed funnel
export const trackInvestorAction = (actionType: string, projectName?: string, userData?: Record<string, any>) => {
  const safeUserData = sanitizeAnalyticsPayload(userData);

  trackEvent('investor_action', {
    action_type: actionType,
    project_name: projectName,
    event_category: 'investor_engagement',
    event_label: `${actionType}_${projectName || 'general'}`,
    ...safeUserData,
  });
  
  // Different conversion values for different investor actions
  const conversionValues = {
    'document_request': 75,
    'contact_form': 100,
    'phone_call': 150,
    'meeting_request': 200,
    'investment_inquiry': 250,
  };
  
  const value = conversionValues[actionType as keyof typeof conversionValues] || 25;
  
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

// Contact method tracking with source attribution
export const trackContactMethod = (contactType: string, contactValue: string, source: string) => {
  trackEvent('contact_method_used', {
    contact_type: contactType, // 'phone', 'email', 'form'
    contact_value: contactValue,
    source: source, // page where contact was initiated
    event_category: 'contact_engagement',
    event_label: `${contactType}_${source}`,
  });
  
  // Track all contact methods as conversions
  if (typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer({
      event: 'contact_conversion',
      contact_type: contactType,
      source: source,
      value: contactType === 'phone' ? 60 : contactType === 'email' ? 40 : 80, // Form = highest value
      currency: 'EUR',
      lead_quality: 'high',
    });
  }
};

// Traffic source and funnel analysis
export const trackUserJourney = (journeyStep: string, stepData?: Record<string, any>) => {
  const safeStepData = sanitizeAnalyticsPayload(stepData);

  trackEvent('user_journey', {
    journey_step: journeyStep,
    event_category: 'user_flow',
    event_label: journeyStep,
    ...safeStepData,
  });
  
  // Track progression through sales funnel
  const funnelSteps = {
    'homepage_visit': 1,
    'services_viewed': 2,
    'project_explored': 3,
    'calculator_used': 4,
    'document_requested': 5,
    'contact_initiated': 6,
    'form_submitted': 7,
  };
  
  const stepValue = funnelSteps[journeyStep as keyof typeof funnelSteps] || 0;
  
  if (stepValue > 0 && typeof window !== 'undefined' && window.dataLayer) {
    pushToDataLayer({
      event: 'funnel_progression',
      journey_step: journeyStep,
      funnel_step: stepValue,
      value: stepValue * 5, // Progressive value increase
      currency: 'EUR',
      ...safeStepData,
    });
  }
};

// Geographic and demographic tracking
export const trackUserDemographics = (demographicData: Record<string, any>) => {
  trackEvent('user_demographics', {
    ...demographicData,
    event_category: 'user_profile',
    event_label: 'demographic_data',
  });
};
