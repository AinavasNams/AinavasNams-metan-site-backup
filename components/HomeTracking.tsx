'use client';

import { useEffect } from 'react';
import { trackPageView, trackUserJourney, trackUserDemographics } from "@/components/Analytics";

export default function HomeTracking() {
  useEffect(() => {
    trackPageView('homepage', {
      page_section: 'main',
      visitor_type: 'new_or_returning',
      page_priority: 'high',
    });

    trackUserJourney('homepage_visit', {
      entry_point: 'homepage',
      session_start: true,
      funnel_entry: true,
    });

    if (typeof window !== 'undefined') {
      trackUserDemographics({
        user_language: navigator.language,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
      });
    }
  }, []);

  return null;
}
