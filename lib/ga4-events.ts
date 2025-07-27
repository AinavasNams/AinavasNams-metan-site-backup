/**
 * Google Analytics 4 Events Configuration
 * Настройка событий для оптимальной интеграции с GA4 и Google Ads
 */

// Типы событий GA4
export type GA4EventName = 
  | 'generate_lead'
  | 'contact'
  | 'purchase'
  | 'view_item'
  | 'begin_checkout'
  | 'add_to_cart'
  | 'page_view'
  | 'user_engagement'
  | 'search'
  | 'select_content'
  | 'download'
  | 'form_start'
  | 'form_submit';

// Интерфейс для GA4 событий
interface GA4Event {
  event_name: GA4EventName;
  event_parameters: {
    currency?: string;
    value?: number;
    content_type?: string;
    content_id?: string;
    item_category?: string;
    item_name?: string;
    source?: string;
    medium?: string;
    campaign?: string;
    custom_parameters?: Record<string, any>;
  };
}

// Основная функция для отправки событий в GA4
export const sendGA4Event = (eventName: GA4EventName, parameters: GA4Event['event_parameters']) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    console.log('📈 GA4 Event:', eventName, parameters);
    (window as any).gtag('event', eventName, parameters);
  } else {
    console.warn('GA4 gtag not available');
  }
};

// Событие: Генерация лида (основное событие конверсии)
export const trackLeadGeneration = (leadType: string, value: number, source: string) => {
  sendGA4Event('generate_lead', {
    currency: 'EUR',
    value: value,
    content_type: 'lead',
    content_id: `lead_${leadType}`,
    item_category: 'conversion',
    item_name: leadType,
    source: source,
    medium: 'website',
    campaign: 'organic',
    custom_parameters: {
      lead_type: leadType,
      lead_source: source,
      conversion_value: value
    }
  });
};

// Событие: Контакт (телефон, email, форма)
export const trackContact = (contactMethod: string, source: string, value: number = 50) => {
  sendGA4Event('contact', {
    currency: 'EUR',
    value: value,
    content_type: 'contact',
    content_id: `contact_${contactMethod}`,
    item_category: 'communication',
    item_name: contactMethod,
    source: source,
    medium: 'website',
    custom_parameters: {
      contact_method: contactMethod,
      contact_source: source,
      contact_value: value
    }
  });
};

// Событие: Просмотр услуги (аналог view_item)
export const trackServiceView = (serviceName: string, serviceCategory: string, value: number = 10) => {
  sendGA4Event('view_item', {
    currency: 'EUR',
    value: value,
    content_type: 'service',
    content_id: `service_${serviceName}`,
    item_category: serviceCategory,
    item_name: serviceName,
    source: 'website',
    medium: 'organic',
    custom_parameters: {
      service_name: serviceName,
      service_category: serviceCategory,
      service_value: value
    }
  });
};

// Событие: Начало процесса заказа (аналог begin_checkout)
export const trackOrderStart = (serviceName: string, estimatedValue: number, source: string) => {
  sendGA4Event('begin_checkout', {
    currency: 'EUR',
    value: estimatedValue,
    content_type: 'service_order',
    content_id: `order_${serviceName}`,
    item_category: 'service',
    item_name: serviceName,
    source: source,
    medium: 'website',
    custom_parameters: {
      service_name: serviceName,
      estimated_value: estimatedValue,
      order_source: source
    }
  });
};

// Событие: Отправка формы
export const trackFormSubmission = (formType: string, formSource: string, value: number = 60) => {
  sendGA4Event('form_submit', {
    currency: 'EUR',
    value: value,
    content_type: 'form',
    content_id: `form_${formType}`,
    item_category: 'conversion',
    item_name: formType,
    source: formSource,
    medium: 'website',
    custom_parameters: {
      form_type: formType,
      form_source: formSource,
      form_value: value
    }
  });
};

// Событие: Скачивание документа
export const trackDocumentDownload = (documentName: string, documentType: string, value: number = 15) => {
  sendGA4Event('download', {
    currency: 'EUR',
    value: value,
    content_type: 'document',
    content_id: `doc_${documentName}`,
    item_category: documentType,
    item_name: documentName,
    source: 'website',
    medium: 'organic',
    custom_parameters: {
      document_name: documentName,
      document_type: documentType,
      download_value: value
    }
  });
};

// Событие: Поиск по сайту
export const trackSiteSearch = (searchTerm: string, searchResults: number) => {
  sendGA4Event('search', {
    content_type: 'search',
    content_id: `search_${searchTerm}`,
    item_category: 'navigation',
    item_name: searchTerm,
    source: 'website',
    medium: 'organic',
    custom_parameters: {
      search_term: searchTerm,
      search_results: searchResults
    }
  });
};

// Событие: Выбор контента (клики по разделам)
export const trackContentSelection = (contentType: string, contentId: string, value: number = 5) => {
  sendGA4Event('select_content', {
    currency: 'EUR',
    value: value,
    content_type: contentType,
    content_id: contentId,
    item_category: 'navigation',
    item_name: contentType,
    source: 'website',
    medium: 'organic',
    custom_parameters: {
      content_type: contentType,
      content_id: contentId,
      content_value: value
    }
  });
};

// Событие: Пользовательское взаимодействие
export const trackUserEngagement = (engagementType: string, engagementValue: number) => {
  sendGA4Event('user_engagement', {
    content_type: 'engagement',
    content_id: `engagement_${engagementType}`,
    item_category: 'interaction',
    item_name: engagementType,
    source: 'website',
    medium: 'organic',
    custom_parameters: {
      engagement_type: engagementType,
      engagement_value: engagementValue,
      engagement_time: Date.now()
    }
  });
};

// Функция для инициализации Enhanced Ecommerce отслеживания
export const initializeEnhancedEcommerce = () => {
  // Отслеживание просмотра каталога услуг
  if (window.location.pathname.includes('/pakalpojumi')) {
    trackServiceView('services_catalog', 'services', 10);
  }
  
  // Отслеживание использования калькулятора теперь происходит при фактическом использовании
  // а не при посещении URL, так как калькулятор интегрирован в главную страницу
  
  // Отслеживание страницы инвесторов
  if (window.location.pathname.includes('/investoriem')) {
    trackServiceView('investment_opportunity', 'investment', 50);
  }
  
  console.log('🚀 Enhanced Ecommerce tracking initialized');
};

// Конфигурация для интеграции с Google Ads
export const configureGoogleAdsIntegration = () => {
  // Настройка конверсий для Google Ads с реальными ID
  const adConversions = {
    'consultation_request': {
      conversion_id: 'AW-17334979521',
      conversion_label: 'consultation_conversion',
      value: 60,
      currency: 'EUR'
    },
    'quick_order': {
      conversion_id: 'AW-17334979521',
      conversion_label: 'quick_order_conversion',
      value: 70,
      currency: 'EUR'
    },
    'investor_interest': {
      conversion_id: 'AW-17334979521',
      conversion_label: 'investor_conversion',
      value: 250,
      currency: 'EUR'
    },
    'phone_call': {
      conversion_id: 'AW-17334979521',
      conversion_label: 'phone_call_conversion',
      value: 90,
      currency: 'EUR'
    },
    'calculator_usage': {
      conversion_id: 'AW-17334979521',
      conversion_label: 'calculator_conversion',
      value: 75,
      currency: 'EUR'
    },
    'document_download': {
      conversion_id: 'AW-17334979521',
      conversion_label: 'document_conversion',
      value: 45,
      currency: 'EUR'
    },
    'email_contact': {
      conversion_id: 'AW-17334979521',
      conversion_label: 'email_conversion',
      value: 55,
      currency: 'EUR'
    },
    'precise_offer': {
      conversion_id: 'AW-17334979521',
      conversion_label: 'precise_offer_conversion',
      value: 85,
      currency: 'EUR'
    }
  };
  
  return adConversions;
};

// Функция для отправки конверсии в Google Ads
export const sendGoogleAdsConversion = (conversionType: string, value: number) => {
  const adConversions = configureGoogleAdsIntegration();
  const conversion = adConversions[conversionType as keyof typeof adConversions];
  
  if (conversion && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': `${conversion.conversion_id}/${conversion.conversion_label}`,
      'value': value,
      'currency': conversion.currency
    });
    
    console.log('🎯 Google Ads conversion sent:', conversionType, value);
  }
};

// Экспорт всех функций
export default {
  sendGA4Event,
  trackLeadGeneration,
  trackContact,
  trackServiceView,
  trackOrderStart,
  trackFormSubmission,
  trackDocumentDownload,
  trackSiteSearch,
  trackContentSelection,
  trackUserEngagement,
  initializeEnhancedEcommerce,
  configureGoogleAdsIntegration,
  sendGoogleAdsConversion
};