'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, trackDeviceInfo, trackNavigation } from '@/lib/analytics';
import { initializePerformanceTracking } from '@/lib/performance';

interface PageTrackingOptions {
  trackDevice?: boolean;
  trackPerformance?: boolean;
  timeOnPageThreshold?: number; // Track time on page after this many milliseconds
}

export const usePageTracking = (options: PageTrackingOptions = {}) => {
  const {
    trackDevice: shouldTrackDevice = true,
    trackPerformance: shouldTrackPerformance = true,
    timeOnPageThreshold = 30000, // Default 30 seconds
  } = options;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathRef = useRef<string>('');
  const pageStartTimeRef = useRef<number>(Date.now());
  const timeOnPageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Track device info on first load
    if (shouldTrackDevice && !previousPathRef.current) {
      trackDeviceInfo();
    }

    // Track page navigation
    if (previousPathRef.current && previousPathRef.current !== currentPath) {
      // Calculate time spent on previous page
      const timeSpent = Date.now() - pageStartTimeRef.current;

      // Only track if user spent meaningful time on the page
      if (timeSpent > 3000) { // At least 3 seconds
        const previousPageName = previousPathRef.current.split('/')[1] || 'home';
        import('@/lib/analytics').then(({ trackTimeOnPage }) => {
          trackTimeOnPage(previousPageName, timeSpent);
        });
      }

      // Track navigation
      const fromPage = previousPathRef.current.split('/')[1] || 'home';
      const toPage = pathname.split('/')[1] || 'home';
      trackNavigation(fromPage, toPage);
    }

    // Track page view
    if (currentPath) {
      pageview(currentPath);
      previousPathRef.current = currentPath;
      pageStartTimeRef.current = Date.now();

      // Initialize performance tracking for the new page
      if (shouldTrackPerformance) {
        const pageName = pathname.split('/')[1] || 'home';
        initializePerformanceTracking(pageName);
      }
    }

    // Set up time on page tracking
    if (timeOnPageTimeoutRef.current) {
      clearTimeout(timeOnPageTimeoutRef.current);
    }

    // Track extended time on page
    if (timeOnPageThreshold > 0) {
      timeOnPageTimeoutRef.current = setTimeout(() => {
        const timeSpent = Date.now() - pageStartTimeRef.current;
        const pageName = pathname.split('/')[1] || 'home';

        import('@/lib/analytics').then(({ trackTimeOnPage }) => {
          trackTimeOnPage(`${pageName}_extended`, timeSpent);
        });
      }, timeOnPageThreshold);
    }

    return () => {
      if (timeOnPageTimeoutRef.current) {
        clearTimeout(timeOnPageTimeoutRef.current);
      }
    };
  }, [pathname, searchParams, shouldTrackDevice, shouldTrackPerformance, timeOnPageThreshold]);

  // Track page visibility changes (for more accurate time tracking)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause tracking
        if (timeOnPageTimeoutRef.current) {
          clearTimeout(timeOnPageTimeoutRef.current);
        }
      } else {
        // Page is visible again, resume tracking
        if (timeOnPageThreshold > 0) {
          timeOnPageTimeoutRef.current = setTimeout(() => {
            const timeSpent = Date.now() - pageStartTimeRef.current;
            const pageName = pathname.split('/')[1] || 'home';

            import('@/lib/analytics').then(({ trackTimeOnPage }) => {
              trackTimeOnPage(`${pageName}_return`, timeSpent);
            });
          }, timeOnPageThreshold);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timeOnPageTimeoutRef.current) {
        clearTimeout(timeOnPageTimeoutRef.current);
      }
    };
  }, [pathname, timeOnPageThreshold]);

  // Track page unload
  useEffect(() => {
    const handlePageUnload = () => {
      const timeSpent = Date.now() - pageStartTimeRef.current;
      const pageName = pathname.split('/')[1] || 'home';

      // Use sendBeacon for reliable tracking during page unload
      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
        const data = new URLSearchParams({
          event_name: 'time_on_page_unload',
          event_category: 'engagement',
          event_label: pageName,
          value: Math.round(timeSpent / 1000).toString(),
          non_interaction: 'true',
        });

        // Note: For actual implementation, you would need to set up an API secret in GA4
        // For now, we'll use a simplified approach
        if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
          navigator.sendBeacon(
            `https://www.google-analytics.com/g/collect?${data.toString()}&measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`
          );
        }
      }
    };

    window.addEventListener('beforeunload', handlePageUnload);

    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
    };
  }, [pathname]);
};