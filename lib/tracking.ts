/**
 * GTM dataLayer push utility - convenience wrappers
 * Re-exports standardized events from gtm-events.ts
 */

export { pushPhoneClick as trackPhoneClick } from './gtm-events';
export { pushEmailClick as trackEmailClick } from './gtm-events';
export { pushFormSubmit as trackFormSubmit } from './gtm-events';
export { pushWhatsAppClick as trackWhatsAppClick } from './gtm-events';
