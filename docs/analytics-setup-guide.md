# Analytics Setup Guide for SalaryCalcVN

## Quick Start Implementation

This guide provides step-by-step instructions to implement analytics tracking for your SalaryCalcVN application.

## Step 1: Environment Configuration

### 1.1 Add Google Analytics to Environment Variables

Create or update your `.env.local` file:
```bash
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Enable debug mode
NEXT_PUBLIC_GA_DEBUG=true
```

### 1.2 Get Your GA4 Measurement ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Select "Web" platform
4. Add your website URL
5. Copy the Measurement ID (G-XXXXXXXXXX format)

## Step 2: Install Required Dependencies

```bash
npm install web-vitals
# or
yarn add web-vitals
# or
pnpm add web-vitals
```

## Step 3: Create Analytics Library

### 3.1 Create Analytics Utilities
```typescript
// lib/analytics.ts
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      send_page_view: true,
    });
  }
};

interface GTagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

export const event = ({ action, category, label, value, nonInteraction = false }: GTagEvent) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction,
    });
  }
};

// Specific tracking functions for SalaryCalcVN
export const trackSalaryCalculation = (grossSalary: number, netSalary: number, region: string) => {
  event({
    action: 'salary_calculation',
    category: 'calculator',
    label: region,
    value: grossSalary,
  });

  event({
    action: 'net_salary_calculated',
    category: 'calculator',
    label: region,
    value: netSalary,
  });
};

export const trackBlogPostView = (slug: string, category: string, readTime: number) => {
  event({
    action: 'blog_post_view',
    category: 'content',
    label: `${category}/${slug}`,
    value: readTime,
  });
};

export const trackFeatureUsage = (feature: string, action: string) => {
  event({
    action: action,
    category: 'feature_usage',
    label: feature,
  });
};

export const trackUserInteraction = (element: string, context: string) => {
  event({
    action: 'user_interaction',
    category: 'engagement',
    label: `${context}/${element}`,
  });
};
```

### 3.2 Create Performance Monitoring
```typescript
// lib/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

export function sendToAnalytics(metric: Metric) {
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_parameter_1: metric.name,
      custom_parameter_2: metric.value.toFixed(3),
    });
  }
}

export function reportWebVitals() {
  if (typeof window !== 'undefined') {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }
}

// Page load time tracking
export function trackPageLoadTime(pageName: string) {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        window.gtag('event', 'page_load_time', {
          event_category: 'performance',
          event_label: pageName,
          value: Math.round(loadTime),
          non_interaction: true,
        });
      }
    });
  }
}
```

## Step 4: Update Layout with Analytics

### 4.1 Modify Root Layout
```typescript
// app/layout.tsx
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  content_group1: 'salary-calculator',
                  custom_map: {
                    custom_parameter_1: 'metric_name',
                    custom_parameter_2: 'metric_value',
                  }
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {/* Your existing layout content */}
      </body>
    </html>
  );
}
```

## Step 5: Create Page Tracking Hook

### 5.1 Page View Tracking Hook
```typescript
// hooks/usePageTracking.ts
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, trackPageLoadTime } from '@/lib/analytics';
import { reportWebVitals } from '@/lib/performance';

export const usePageTracking = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

      // Track page view
      pageview(url);

      // Track page load performance
      const pageName = pathname.split('/').pop() || 'home';
      trackPageLoadTime(pageName);

      // Track web vitals
      reportWebVitals();
    }
  }, [pathname, searchParams]);
};
```

### 5.2 Apply Page Tracking
```typescript
// app/layout.tsx
import { usePageTracking } from '@/hooks/usePageTracking';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePageTracking(); // This will track all page changes

  return (
    <html lang="vi">
      {/* Rest of your layout */}
    </html>
  );
}
```

## Step 6: Implement Event Tracking

### 6.1 Calculator Page Tracking
```typescript
// app/calculator/page.tsx
'use client';

import { trackSalaryCalculation, trackFeatureUsage } from '@/lib/analytics';

export default function CalculatorPage() {
  const handleCalculation = (grossSalary: number, netSalary: number, region: string) => {
    // Your calculation logic here

    // Track the calculation
    trackSalaryCalculation(grossSalary, netSalary, region);
  };

  const handleDemoMode = () => {
    trackFeatureUsage('calculator', 'demo_mode_activated');
    // Enable demo mode
  };

  const handleExportPDF = () => {
    trackFeatureUsage('calculator', 'export_pdf');
    // Export PDF logic
  };

  return (
    <div>
      {/* Your calculator components */}
      <button onClick={handleDemoMode}>Try Demo</button>
      <button onClick={handleExportPDF}>Export PDF</button>
    </div>
  );
}
```

### 6.2 Blog Page Tracking
```typescript
// app/blog/[slug]/page.tsx
'use client';

import { trackBlogPostView, trackUserInteraction } from '@/lib/analytics';
import { useEffect } from 'react';

export default function BlogPost({ params }: { params: { slug: string } }) {
  useEffect(() => {
    // Track blog post view when component mounts
    const readTime = Math.ceil(content.split(' ').length / 200); // Assuming 200 words per minute
    trackBlogPostView(params.slug, 'salary-guide', readTime);
  }, [params.slug]);

  const handleShare = (platform: string) => {
    trackUserInteraction('share', `blog/${platform}`);
    // Share logic
  };

  const handleBookmark = () => {
    trackUserInteraction('bookmark', 'blog');
    // Bookmark logic
  };

  return (
    <article>
      {/* Your blog content */}
      <button onClick={() => handleShare('facebook')}>Share on Facebook</button>
      <button onClick={() => handleShare('twitter')}>Share on Twitter</button>
      <button onClick={handleBookmark}>Bookmark</button>
    </article>
  );
}
```

## Step 7: Create Cookie Consent

### 7.1 Cookie Consent Component
```typescript
// components/cookie-consent.tsx
'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    } else {
      const parsed = JSON.parse(consent);
      setPreferences(parsed);
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));

    // Load analytics scripts if consented
    if (preferences.analytics && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      window.location.reload(); // Reload to load GA scripts
    }

    setShowConsent(false);
  };

  const acceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
    setTimeout(savePreferences, 100);
  };

  const rejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    setTimeout(savePreferences, 100);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 z-50 shadow-2xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Cookie className="h-6 w-6" />
            <h3 className="text-lg font-semibold">Cookie Preferences</h3>
          </div>
          <button
            onClick={() => setShowConsent(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 text-gray-300">
          We use cookies to enhance your experience, analyze site traffic, and personalize content.
          You can manage your preferences below.
        </p>

        {showDetails && (
          <div className="mb-4 space-y-2 bg-gray-800 p-4 rounded">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="rounded"
              />
              <span>Essential Cookies (Required)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                className="rounded"
              />
              <span>Analytics Cookies (Help us improve)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                className="rounded"
              />
              <span>Marketing Cookies (Personalized content)</span>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={acceptAll}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={rejectAll}
            className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
          >
            Customize
          </button>
          {showDetails && (
            <button
              onClick={savePreferences}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Save Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
```

### 7.2 Add Cookie Consent to Layout
```typescript
// app/layout.tsx
import { CookieConsent } from '@/components/cookie-consent';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {/* Your existing layout */}
        <CookieConsent />
      </body>
    </html>
  );
}
```

## Step 8: Create Analytics Dashboard

### 8.1 Custom Dashboard Component
```typescript
// components/analytics-dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Users, Eye, Calculator, FileText, Clock } from 'lucide-react';

interface AnalyticsData {
  pageViews: number;
  uniqueUsers: number;
  calculations: number;
  avgTimeOnPage: number;
  topPages: Array<{ path: string; views: number }>;
}

export const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Fetch analytics data from your API
    fetch(`/api/analytics?range=${timeRange}`)
      .then(res => res.json())
      .then(setData);
  }, [timeRange]);

  if (!data) return <div>Loading analytics...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Page Views</p>
              <p className="text-2xl font-bold">{data.pageViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Unique Users</p>
              <p className="text-2xl font-bold">{data.uniqueUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Calculations</p>
              <p className="text-2xl font-bold">{data.calculations.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Avg. Time</p>
              <p className="text-2xl font-bold">{Math.round(data.avgTimeOnPage)}s</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
        <div className="space-y-2">
          {data.topPages.map((page, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">{page.path}</span>
              <span className="text-gray-600">{page.views.toLocaleString()} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## Step 9: Testing & Validation

### 9.1 Google Tag Assistant
1. Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/fjgjkllncohejgflpdkpbdhmfndleado)
2. Navigate to your website
3. Check that GA4 tags are firing correctly

### 9.2 Real-time Analytics
1. Go to Google Analytics
2. Navigate to Reports > Realtime
3. Interact with your website
4. Verify events appear in real-time

### 9.3 Debug Mode
```typescript
// Enable debug mode in development
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_GA_DEBUG) {
  window.gtag('config', GA_MEASUREMENT_ID, { debug_mode: true });
}
```

## Step 10: Advanced Configuration

### 10.1 Custom Dimensions
```typescript
// Track user segments
export const trackUserSegment = (segment: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      custom_parameter_1: segment, // User segment
      custom_parameter_2: new Date().toISOString(), // Session timestamp
    });
  }
};

// Track content categories
export const trackContentCategory = (category: string, subcategory: string) => {
  event({
    action: 'content_view',
    category: 'engagement',
    label: `${category}/${subcategory}`,
    nonInteraction: true,
  });
};
```

### 10.2 Conversion Tracking
```typescript
// Track goal completions
export const trackConversion = (goal: string, value: number = 0) => {
  if (GA_MEASUREMENT_ID) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_MEASUREMENT_ID}/${goal}`,
      value: value,
      currency: 'VND',
    });
  }
};

// Example usage
trackConversion('salary_calculation_complete', 100); // Value in VND
trackConversion('contact_form_submit', 50);
trackConversion('newsletter_signup', 25);
```

## Maintenance & Monitoring

### Regular Tasks
1. **Weekly**: Check data quality and anomalies
2. **Monthly**: Review conversion goals and adjust
3. **Quarterly**: Audit tracking implementation
4. **Annually**: Update privacy policy and consent mechanism

### Key Metrics to Monitor
- Data collection completeness
- Tracking code errors
- Privacy compliance
- Performance impact
- User consent rates

## Troubleshooting Common Issues

1. **No data showing in GA4**
   - Verify measurement ID is correct
   - Check browser console for errors
   - Ensure cookie consent is granted

2. **Events not tracking**
   - Check event syntax
   - Verify gtag is loaded
   - Test with debug mode

3. **Performance issues**
   - Optimize script loading
   - Check bundle size impact
   - Monitor Core Web Vitals

4. **Privacy concerns**
   - Review consent mechanism
   - Check data retention settings
   - Validate anonymization

This setup provides a comprehensive analytics solution for SalaryCalcVN while maintaining user privacy and optimal performance.