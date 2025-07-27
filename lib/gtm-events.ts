/**
 * Google Tag Manager Events для отслеживания конверсий
 * Используется для интеграции с Google Analytics 4 и Google Ads
 */

// Типы событий для GTM
export type GTMEventType = 
  | 'form_submission'
  | 'phone_call'
  | 'email_click'
  | 'document_download'
  | 'consultation_request'
  | 'quick_order'
  | 'investor_interest'
  | 'service_calculator'
  | 'page_view'
  | 'user_engagement';

// Интерфейс для GTM событий
interface GTMEvent {
  event: string;
  event_category: string;
  event_action: string;
  event_label?: string;
  value?: number;
  currency?: string;
  user_id?: string;
  custom_parameters?: Record<string, any>;
}

// Основная функция для отправки событий в GTM
export const sendGTMEvent = (eventData: GTMEvent) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    console.log('🔥 GTM Event:', eventData);
    (window as any).dataLayer.push(eventData);
  } else {
    console.warn('GTM DataLayer not available');
  }
};

// Событие: Отправка формы консультации
export const trackConsultationRequest = (formType: string, source: string) => {
  sendGTMEvent({
    event: 'consultation_request',
    event_category: 'conversion',
    event_action: 'form_submit',
    event_label: `${formType}_consultation`,
    value: 60,
    currency: 'EUR',
    custom_parameters: {
      form_type: formType,
      source: source,
      conversion_type: 'consultation'
    }
  });
};

// Событие: Быстрый заказ услуги
export const trackQuickOrder = (service: string, source: string) => {
  sendGTMEvent({
    event: 'quick_order',
    event_category: 'conversion',
    event_action: 'service_order',
    event_label: `quick_order_${service}`,
    value: 70,
    currency: 'EUR',
    custom_parameters: {
      service_type: service,
      source: source,
      conversion_type: 'quick_order'
    }
  });
};

// Событие: Инвестиционный запрос
export const trackInvestorRequest = (documentType: string, purpose: string) => {
  sendGTMEvent({
    event: 'investor_interest',
    event_category: 'high_value_conversion',
    event_action: 'document_request',
    event_label: `investor_${documentType}`,
    value: 250,
    currency: 'EUR',
    custom_parameters: {
      document_type: documentType,
      purpose: purpose,
      conversion_type: 'investor_interest'
    }
  });
};

// Событие: Телефонный звонок
export const trackPhoneCall = (source: string, phoneNumber: string) => {
  sendGTMEvent({
    event: 'phone_call',
    event_category: 'conversion',
    event_action: 'click_to_call',
    event_label: `phone_call_${source}`,
    value: 90,
    currency: 'EUR',
    custom_parameters: {
      phone_number: phoneNumber,
      source: source,
      conversion_type: 'phone_call'
    }
  });
};

// Событие: Клик по email
export const trackEmailClick = (source: string, emailAddress: string) => {
  sendGTMEvent({
    event: 'email_click',
    event_category: 'conversion',
    event_action: 'click_to_email',
    event_label: `email_${source}`,
    value: 50,
    currency: 'EUR',
    custom_parameters: {
      email_address: emailAddress,
      source: source,
      conversion_type: 'email_click'
    }
  });
};

// Событие: Использование калькулятора
export const trackCalculatorUse = (calculatorType: string, totalCost: number) => {
  sendGTMEvent({
    event: 'service_calculator',
    event_category: 'engagement',
    event_action: 'calculator_use',
    event_label: `calculator_${calculatorType}`,
    value: 25,
    currency: 'EUR',
    custom_parameters: {
      calculator_type: calculatorType,
      calculated_cost: totalCost,
      conversion_type: 'calculator_engagement'
    }
  });
};

// Событие: Скачивание документа
export const trackDocumentDownload = (documentName: string, userType: string) => {
  sendGTMEvent({
    event: 'document_download',
    event_category: 'engagement',
    event_action: 'download',
    event_label: `download_${documentName}`,
    value: 15,
    currency: 'EUR',
    custom_parameters: {
      document_name: documentName,
      user_type: userType,
      conversion_type: 'document_download'
    }
  });
};

// Событие: Просмотр страницы благодарности (конверсия завершена)
export const trackThankYouPageView = (conversionType: string, source: string) => {
  sendGTMEvent({
    event: 'conversion_complete',
    event_category: 'conversion',
    event_action: 'thank_you_page',
    event_label: `conversion_${conversionType}`,
    value: 100,
    currency: 'EUR',
    custom_parameters: {
      conversion_type: conversionType,
      source: source,
      conversion_complete: true
    }
  });
};

// Событие: Критически важные страницы (услуги, калькулятор, инвесторы)
export const trackHighValuePageView = (pageType: string, pagePath: string) => {
  sendGTMEvent({
    event: 'high_value_page_view',
    event_category: 'engagement',
    event_action: 'page_view',
    event_label: `page_${pageType}`,
    value: 5,
    currency: 'EUR',
    custom_parameters: {
      page_type: pageType,
      page_path: pagePath,
      high_value: true
    }
  });
};

// Функция для инициализации GTM событий на странице
export const initializePageTracking = (pageType: string, pagePath: string) => {
  // Отслеживаем просмотр страницы
  trackHighValuePageView(pageType, pagePath);
  
  // Инициализация отслеживания кликов по телефону
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const phoneLink = target.closest('a[href^="tel:"]');
    
    if (phoneLink) {
      const phoneNumber = phoneLink.getAttribute('href')?.replace('tel:', '') || '';
      trackPhoneCall(pageType, phoneNumber);
    }
  });
  
  // Инициализация отслеживания кликов по email
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const emailLink = target.closest('a[href^="mailto:"]');
    
    if (emailLink) {
      const emailAddress = emailLink.getAttribute('href')?.replace('mailto:', '') || '';
      trackEmailClick(pageType, emailAddress);
    }
  });
  
  console.log(`📊 GTM tracking initialized for page: ${pageType}`);
};

// Событие: Пользовательское взаимодействие (скролл, время на странице)
export const trackUserEngagement = (engagementType: string, value: number) => {
  sendGTMEvent({
    event: 'user_engagement',
    event_category: 'engagement',
    event_action: engagementType,
    event_label: `engagement_${engagementType}`,
    value: value,
    currency: 'EUR',
    custom_parameters: {
      engagement_type: engagementType,
      engagement_value: value
    }
  });
};

// Экспорт всех функций для использования в компонентах
export default {
  sendGTMEvent,
  trackConsultationRequest,
  trackQuickOrder,
  trackInvestorRequest,
  trackPhoneCall,
  trackEmailClick,
  trackCalculatorUse,
  trackDocumentDownload,
  trackThankYouPageView,
  trackHighValuePageView,
  initializePageTracking,
  trackUserEngagement
};