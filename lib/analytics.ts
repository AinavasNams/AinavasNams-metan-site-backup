"use client";
// Центральный модуль аналитики METAN.LV
// Все события трекинга (GTM / GA4 / Ads) идут только через эти функции.
// Важно: не падать в среде SSR.

type DataLayerEvent = Record<string, unknown> & { event: string };

function pushToDataLayer(payload: DataLayerEvent) {
  if (typeof window === 'undefined') {
    // Серверный рендер. Ничего не делаем, просто не ломаемся.
    return;
  }

  if (!(window as any).dataLayer) {
    (window as any).dataLayer = [];
  }

  try {
    (window as any).dataLayer.push(payload);
  } catch (err) {
    console.warn('[analytics] dataLayer push failed:', err, payload);
  }
}

function emitAnalyticsEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined') {
    return;
  }

  const basePayload: DataLayerEvent = {
    event,
    timestamp: Date.now(),
    ...payload,
  };

  pushToDataLayer(basePayload);

  const gtag = (window as any).gtag;
  if (typeof gtag === 'function') {
    try {
      gtag('event', event, payload ?? {});
    } catch (err) {
      console.warn('[analytics] gtag event failed:', event, err);
    }
  }
}

// Просмотр страницы (page_view)
export function trackPageView(path: string) {
  emitAnalyticsEvent('page_view', {
    page_path: path,
  });
}

// Начало заполнения формы
export function trackFormStart(formName: string) {
  emitAnalyticsEvent('form_start', {
    form_name: formName,
  });
}

// Сабмит формы (клик "отправить", ещё до ответа бэкенда)
export function trackFormSubmit(formName: string) {
  emitAnalyticsEvent('form_submit', {
    form_name: formName,
  });
}

// Продвинутый трекинг калькулятора (ROI, расстояние и т.д.)
export function trackCalculatorUsage(
  calculatorType: string,
  inputData: Record<string, unknown>,
  results?: Record<string, unknown>
) {
  emitAnalyticsEvent('calculator_usage', {
    calculator_type: calculatorType,
    input_data: inputData,
    results,
    event_category: 'calculator_engagement',
    event_label: calculatorType,
  });

  if (results && typeof window !== 'undefined') {
    const contactInteraction = (window as any).triggerContactInteraction;
    if (typeof contactInteraction === 'function') {
      try {
        contactInteraction('calculator_completed', 50);
      } catch (err) {
        console.warn('[analytics] triggerContactInteraction failed:', err);
      }
    }

    const qualifyLead = (window as any).triggerQualifyLead;
    if (typeof qualifyLead === 'function') {
      try {
        const estimatedValue =
          (results as Record<string, number | undefined>).estimatedSavings ??
          (results as Record<string, number | undefined>).roiValue ??
          0;
        const quality =
          estimatedValue && estimatedValue > 5000
            ? 'very_high'
            : estimatedValue && estimatedValue > 1000
            ? 'high'
            : 'medium';
        const conversionValue = Math.min(
          80,
          Math.max(30, Math.round((estimatedValue ?? 0) / 100))
        );
        qualifyLead(quality, conversionValue);
      } catch (err) {
        console.warn('[analytics] triggerQualifyLead failed:', err);
      }
    }
  }
}

// Клик по способу связи: телефон / whatsapp / email
export function trackContactMethod(
  contactType: string,
  contactValue: string,
  source: string
) {
  emitAnalyticsEvent('contact_method_used', {
    contact_type: contactType,
    contact_value: contactValue,
    source,
    event_category: 'contact_engagement',
    event_label: `${contactType}_${source}`,
  });

  if (typeof window !== 'undefined') {
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'contact_conversion',
        contact_type: contactType,
        source,
        value:
          contactType === 'phone'
            ? 60
            : contactType === 'email'
            ? 40
            : 80,
        currency: 'EUR',
        lead_quality: 'high',
      });
    } catch (err) {
      console.warn('[analytics] contact conversion push failed:', err);
    }
  }
}

// Лид ушёл успешно или с ошибкой.
// Это будем вызывать ПОСЛЕ успешного запроса в /api/send-email (этап C).
export function trackLeadSent(status: 'ok' | 'fail', leadEmail?: string) {
  emitAnalyticsEvent('lead_sent', {
    lead_status: status,
    lead_email: leadEmail,
  });
}

// Ошибки доставки лида (CRM не получила, письмо не ушло)
export function trackCrmError(details?: string) {
  emitAnalyticsEvent('crm_error', {
    error_details: details,
  });
}

export function trackEmailError(details?: string) {
  emitAnalyticsEvent('email_error', {
    error_details: details,
  });
}
