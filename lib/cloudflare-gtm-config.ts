/**
 * Google Tag Gateway Configuration for Cloudflare
 * Optimized for metan.lv domain with enhanced CTA tracking
 */

export interface CloudflareGTMConfig {
  container_id: string;
  ga4_id: string;
  google_ads_id: string;
  domain: string;
  first_party_collection: boolean;
  enhanced_measurement: boolean;
}

export const CLOUDFLARE_GTM_CONFIG = {
  // Cloudflare Gateway - это домен откуда будет загружаться GTM
  // Выберите один из вариантов:
  domain: 'metan.lv', // Canonical domain - choose between 'metan.lv' or 'www.metan.lv'
  
  // Альтернативно, для полной поддержки обеих доменов:
  domains: ['metan.lv', 'www.metan.lv'],
  
  container_id: 'GTM-5QTWHWF6',
  ga4_id: 'G-SEE2ZK4Y0J',
  google_ads_id: 'AW-17334979521',
  first_party_collection: true,
  enhanced_measurement: true,
};

/**
 * Enhanced CTA Tracking Configuration for Google Tag Gateway
 */
export interface CTATrackingConfig {
  button_text: string;
  page_location: string;
  css_selector: string;
  action_type: 'navigate' | 'call' | 'email' | 'form' | 'modal';
  destination?: string;
  conversion_value: number;
  conversion_event: 'close_convert_lead' | 'contact_interaction' | 'qualify_lead';
  is_primary_cta: boolean;
}

/**
 * Complete CTA Mapping for metan.lv with Google Tag Gateway
 */
export const CTA_TRACKING_MAP: CTATrackingConfig[] = [
  // Main Hero Section CTAs
  {
    button_text: 'Pieteikt atkritumu savākšanu',
    page_location: 'hero_section',
    css_selector: 'a[href="/pakalpojumi/savaksana"] button',
    action_type: 'navigate',
    destination: '/pakalpojumi/savaksana',
    conversion_value: 70,
    conversion_event: 'qualify_lead',
    is_primary_cta: true
  },
  {
    button_text: 'Uzzināt par investīciju iespējām',
    page_location: 'hero_section',
    css_selector: 'a[href="/projekti/biometans"] button',
    action_type: 'navigate',
    destination: '/projekti/biometans',
    conversion_value: 50,
    conversion_event: 'qualify_lead',
    is_primary_cta: true
  },
  
  // Enhanced CTA Section
  {
    button_text: '+371 27727724',
    page_location: 'enhanced_cta',
    css_selector: 'a[href="tel:+37127727724"] button',
    action_type: 'call',
    destination: 'tel:+37127727724',
    conversion_value: 90,
    conversion_event: 'close_convert_lead',
    is_primary_cta: true
  },
  {
    button_text: 'tsv@metan.lv',
    page_location: 'enhanced_cta',
    css_selector: 'a[href="mailto:tsv@metan.lv"] button',
    action_type: 'email',
    destination: 'mailto:tsv@metan.lv',
    conversion_value: 50,
    conversion_event: 'contact_interaction',
    is_primary_cta: true
  },
  {
    button_text: 'Aprēķināt izmaksas',
    page_location: 'enhanced_cta',
    css_selector: 'a[href="/#calculator"] button',
    action_type: 'navigate',
    destination: '/#calculator',
    conversion_value: 40,
    conversion_event: 'contact_interaction',
    is_primary_cta: false
  },
  
  // Services Grid CTAs
  {
    button_text: 'Uzzināt vairāk',
    page_location: 'services_grid',
    css_selector: 'a[href="/pakalpojumi/savaksana"] button',
    action_type: 'navigate',
    destination: '/pakalpojumi/savaksana',
    conversion_value: 30,
    conversion_event: 'contact_interaction',
    is_primary_cta: false
  },
  {
    button_text: 'Uzzināt vairāk',
    page_location: 'services_grid',
    css_selector: 'a[href="/projekti/biometans"] button',
    action_type: 'navigate',
    destination: '/projekti/biometans',
    conversion_value: 35,
    conversion_event: 'contact_interaction',
    is_primary_cta: false
  },
  {
    button_text: 'Uzzināt vairāk',
    page_location: 'services_grid',
    css_selector: 'a[href="/pakalpojumi/apstrade"] button',
    action_type: 'navigate',
    destination: '/pakalpojumi/apstrade',
    conversion_value: 25,
    conversion_event: 'contact_interaction',
    is_primary_cta: false
  },
  
  // Contact Forms
  {
    button_text: 'Pieteikt pakalpojumu',
    page_location: 'contact_form_full',
    css_selector: 'form button[type="submit"]',
    action_type: 'form',
    conversion_value: 80,
    conversion_event: 'close_convert_lead',
    is_primary_cta: true
  },
  {
    button_text: 'Pieprasīt pakalpojumu',
    page_location: 'quick_order_form',
    css_selector: 'form button[type="submit"]',
    action_type: 'form',
    conversion_value: 85,
    conversion_event: 'close_convert_lead',
    is_primary_cta: true
  },
  
  // Calculator CTAs
  {
    button_text: 'Nosūtīt pieprasījumu',
    page_location: 'service_calculator',
    css_selector: 'form button[type="submit"]',
    action_type: 'form',
    conversion_value: 75,
    conversion_event: 'close_convert_lead',
    is_primary_cta: true
  },
  {
    button_text: 'Pieprasīt precīzu piedāvājumu',
    page_location: 'service_calculator',
    css_selector: 'button[onClick*="setShowContactForm"]',
    action_type: 'modal',
    conversion_value: 60,
    conversion_event: 'contact_interaction',
    is_primary_cta: false
  },
  
  // Sticky Phone Widget
  {
    button_text: 'Sticky Phone',
    page_location: 'sticky_phone',
    css_selector: 'button[data-macaly="sticky-phone-button"]',
    action_type: 'call',
    destination: 'tel:+37127727724',
    conversion_value: 90,
    conversion_event: 'close_convert_lead',
    is_primary_cta: true
  },
  
  // Alternative contact methods in forms
  {
    button_text: '+371 27727724',
    page_location: 'form_alternative_contact',
    css_selector: 'a[href="tel:+37127727724"]',
    action_type: 'call',
    destination: 'tel:+37127727724',
    conversion_value: 85,
    conversion_event: 'close_convert_lead',
    is_primary_cta: true
  },
  {
    button_text: 'tsv@metan.lv',
    page_location: 'form_alternative_contact',
    css_selector: 'a[href="mailto:tsv@metan.lv"]',
    action_type: 'email',
    destination: 'mailto:tsv@metan.lv',
    conversion_value: 45,
    conversion_event: 'contact_interaction',
    is_primary_cta: true
  }
];

/**
 * Thank You Pages Configuration
 */
export interface ThankYouPageConfig {
  url: string;
  trigger_form: string;
  conversion_value: number;
  conversion_event: string;
  ga4_event: string;
}

export const THANK_YOU_PAGES: ThankYouPageConfig[] = [
  {
    url: '/paldies',
    trigger_form: 'contact_form',
    conversion_value: 80,
    conversion_event: 'close_convert_lead',
    ga4_event: 'form_submission_success'
  },
  {
    url: '/paldies/atzkazs',
    trigger_form: 'quick_order_form',
    conversion_value: 85,
    conversion_event: 'close_convert_lead',
    ga4_event: 'quick_order_success'
  },
  {
    url: '/paldies/investors',
    trigger_form: 'investor_form',
    conversion_value: 150,
    conversion_event: 'close_convert_lead',
    ga4_event: 'investor_lead_success'
  },
  {
    url: '/paldies/konsultacija',
    trigger_form: 'consultation_form',
    conversion_value: 70,
    conversion_event: 'close_convert_lead',
    ga4_event: 'consultation_success'
  }
];

/**
 * Micro-conversions Configuration
 */
export interface MicroConversionConfig {
  action: string;
  value: number;
  event: string;
  description: string;
}

export const MICRO_CONVERSIONS: MicroConversionConfig[] = [
  {
    action: 'phone_number_click',
    value: 10,
    event: 'contact_interaction',
    description: 'Clicked phone number anywhere on site'
  },
  {
    action: 'email_click',
    value: 8,
    event: 'contact_interaction',
    description: 'Clicked email address anywhere on site'
  },
  {
    action: 'calculator_page_visit',
    value: 15,
    event: 'contact_interaction',
    description: 'Visited calculator page'
  },
  {
    action: 'calculator_usage',
    value: 25,
    event: 'contact_interaction',
    description: 'Used calculator tool'
  },
  {
    action: 'services_page_visit',
    value: 12,
    event: 'contact_interaction',
    description: 'Visited services page'
  },
  {
    action: 'investor_page_visit',
    value: 20,
    event: 'qualify_lead',
    description: 'Visited investor page'
  },
  {
    action: 'document_download',
    value: 18,
    event: 'qualify_lead',
    description: 'Downloaded document'
  },
  {
    action: 'scroll_75_percent',
    value: 5,
    event: 'qualify_lead',
    description: 'Scrolled 75% of page'
  },
  {
    action: 'time_on_site_120s',
    value: 8,
    event: 'qualify_lead',
    description: 'Spent 2+ minutes on site'
  }
];

/**
 * Function to initialize Google Tag Gateway tracking
 */
export function initializeGoogleTagGateway() {
  if (typeof window !== 'undefined') {
    // Enhanced DataLayer initialization
    window.dataLayer = window.dataLayer || [];
    
    // Push initial configuration
    window.dataLayer.push({
      'event': 'gtm.init',
      'gtm.uniqueEventId': Date.now(),
      'cloudflare_gateway': true,
      'first_party_collection': true,
      'container_id': CLOUDFLARE_GTM_CONFIG.container_id,
      'ga4_id': CLOUDFLARE_GTM_CONFIG.ga4_id,
      'google_ads_id': CLOUDFLARE_GTM_CONFIG.google_ads_id,
      'domain': CLOUDFLARE_GTM_CONFIG.domain,
      'cta_tracking_enabled': true,
      'micro_conversions_enabled': true,
      'enhanced_measurement': CLOUDFLARE_GTM_CONFIG.enhanced_measurement
    });
    
    // Initialize CTA tracking
    initializeCTATracking();
    
    // Initialize micro-conversions
    initializeMicroConversions();
    
    console.log('🚀 Google Tag Gateway initialized successfully');
    console.log('📊 CTA tracking:', CTA_TRACKING_MAP.length, 'buttons configured');
    console.log('🎯 Micro-conversions:', MICRO_CONVERSIONS.length, 'events configured');
  }
}

/**
 * Initialize CTA tracking for all configured buttons
 */
function initializeCTATracking() {
  CTA_TRACKING_MAP.forEach(cta => {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest(cta.css_selector);
      
      if (button) {
        // Track CTA click
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'cta_click',
          'cta_text': cta.button_text,
          'cta_location': cta.page_location,
          'cta_type': cta.action_type,
          'cta_destination': cta.destination,
          'conversion_value': cta.conversion_value,
          'is_primary_cta': cta.is_primary_cta,
          'cloudflare_gateway': true
        });
        
        // Trigger appropriate conversion event
        if (cta.conversion_event === 'close_convert_lead' && window.triggerCloseConvertLead) {
          window.triggerCloseConvertLead(cta.conversion_value, 'EUR');
        } else if (cta.conversion_event === 'contact_interaction' && window.triggerContactInteraction) {
          window.triggerContactInteraction(cta.action_type, cta.conversion_value);
        } else if (cta.conversion_event === 'qualify_lead' && window.triggerQualifyLead) {
          window.triggerQualifyLead(cta.is_primary_cta ? 'high' : 'medium', cta.conversion_value);
        }
        
        console.log('🎯 CTA tracked:', cta.button_text, 'Value:', cta.conversion_value);
      }
    });
  });
}

/**
 * Initialize micro-conversions tracking
 */
function initializeMicroConversions() {
  // Phone number clicks
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href^="tel:"]');
    
    if (link) {
      const microConversion = MICRO_CONVERSIONS.find(mc => mc.action === 'phone_number_click');
      if (microConversion && window.triggerContactInteraction) {
        window.triggerContactInteraction('phone_click', microConversion.value);
      }
    }
  });
  
  // Email clicks
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href^="mailto:"]');
    
    if (link) {
      const microConversion = MICRO_CONVERSIONS.find(mc => mc.action === 'email_click');
      if (microConversion && window.triggerContactInteraction) {
        window.triggerContactInteraction('email_click', microConversion.value);
      }
    }
  });
  
  // Scroll depth tracking
  let scrollDepthTracked = new Set();
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent >= 75 && !scrollDepthTracked.has(75)) {
      scrollDepthTracked.add(75);
      const microConversion = MICRO_CONVERSIONS.find(mc => mc.action === 'scroll_75_percent');
      if (microConversion && window.triggerQualifyLead) {
        window.triggerQualifyLead('engaged_user', microConversion.value);
      }
    }
  });
  
  // Time on site tracking
  const startTime = Date.now();
  setTimeout(() => {
    const microConversion = MICRO_CONVERSIONS.find(mc => mc.action === 'time_on_site_120s');
    if (microConversion && window.triggerQualifyLead) {
      window.triggerQualifyLead('engaged_user', microConversion.value);
    }
  }, 120000); // 2 minutes
}

/**
 * Function to test Google Tag Gateway configuration
 */
export function testGoogleTagGateway() {
  if (typeof window !== 'undefined') {
    console.log('🧪 Testing Google Tag Gateway configuration...');
    
    // Test all conversion events
    if (window.triggerCloseConvertLead) {
      window.triggerCloseConvertLead(1, 'EUR');
      console.log('✅ close_convert_lead event tested');
    }
    
    if (window.triggerContactInteraction) {
      window.triggerContactInteraction('test', 1);
      console.log('✅ contact_interaction event tested');
    }
    
    if (window.triggerQualifyLead) {
      window.triggerQualifyLead('test', 1);
      console.log('✅ qualify_lead event tested');
    }
    
    // Test DataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'test_gateway',
      'test_timestamp': new Date().toISOString(),
      'cloudflare_gateway': true
    });
    
    console.log('🎯 Google Tag Gateway test completed');
    console.log('📊 Check GTM Preview mode to verify all events');
    
    return {
      container_id: CLOUDFLARE_GTM_CONFIG.container_id,
      ga4_id: CLOUDFLARE_GTM_CONFIG.ga4_id,
      google_ads_id: CLOUDFLARE_GTM_CONFIG.google_ads_id,
      cta_count: CTA_TRACKING_MAP.length,
      micro_conversions_count: MICRO_CONVERSIONS.length,
      thank_you_pages: THANK_YOU_PAGES.length
    };
  }
}