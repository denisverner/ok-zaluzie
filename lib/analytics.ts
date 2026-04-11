type EventName =
  | 'page_view'
  | 'click_cta_poptavka'
  | 'click_phone'
  | 'click_email'
  | 'form_submit'
  | 'form_success'
  | 'form_error'
  | 'scroll_depth';

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: EventName, data?: EventData): void {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', name, data ?? '');
  }

  /* Google Analytics 4 */
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, data);
  }

  /* Google Tag Manager dataLayer */
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...data });
  }
}
