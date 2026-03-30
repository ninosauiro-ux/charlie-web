type EventName = 'add_to_cart' | 'begin_checkout' | 'purchase_intent' | 'lead_submit' | 'newsletter_signup' | 'quick_view';

export const trackEvent = (event: EventName, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cc_analytics', { detail: { event, data, timestamp: Date.now() } }));
  }
};
