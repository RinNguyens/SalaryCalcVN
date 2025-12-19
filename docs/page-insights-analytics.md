# Page Insights & Analytics Documentation

## Overview

This document provides comprehensive guidance for implementing and understanding page insights and analytics for the SalaryCalcVN (SalaryLens) application.

## Current Analytics State

### Existing Implementation
- **No Analytics Currently Implemented**: The codebase currently has no analytics integration
- **Cookie Policy Prepared**: Comprehensive cookie policy exists in `/lib/legal/cookie-policy.ts` but no actual cookie implementation
- **Privacy-First Approach**: The application is built with privacy considerations

### Pages Structure
The application follows Next.js 13+ App Router structure:
```
app/
├── page.tsx                    # Home page
├── calculator/page.tsx         # Salary calculator
├── blog/
│   ├── page.tsx               # Blog listing
│   └── [slug]/page.tsx        # Individual blog posts
├── about/page.tsx             # About page
├── contact/page.tsx           # Contact page
├── history/page.tsx           # Calculation history
├── compare/page.tsx           # Salary comparison
├── salary-estimator/page.tsx  # Salary estimator
├── job-offer-comparison/page.tsx
├── what-if/page.tsx           # What-if scenarios
├── salary-sharing/page.tsx    # Salary sharing
├── roadmap/page.tsx           # Product roadmap
└── (legal)/
    ├── privacy/page.tsx       # Privacy policy
    ├── terms/page.tsx         # Terms of service
    └── cookies/page.tsx       # Cookie policy
```

## Recommended Analytics Implementation

### 1. Google Analytics 4 (GA4)

#### Setup Configuration
```typescript
// .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Implementation Script
```typescript
// lib/analytics.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

interface GTagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (GA_MEASUREMENT_ID) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

#### Integration in Layout
```typescript
// app/layout.tsx
import Script from 'next/script';

// Add to head section
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>
```

### 2. Custom Page Tracking

#### Page View Tracking
```typescript
// hooks/usePageTracking.ts
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/analytics';

export const usePageTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);
};
```

#### Event Tracking for Key Interactions
```typescript
// events/tracking.ts
import { event } from '@/lib/analytics';

// Calculator events
export const trackCalculation = (salary: number, region: string) => {
  event({
    action: 'calculate_salary',
    category: 'calculator',
    label: region,
    value: salary,
  });
};

// Blog engagement
export const trackBlogView = (slug: string, category: string) => {
  event({
    action: 'view_blog_post',
    category: 'blog',
    label: `${category}/${slug}`,
  });
};

export const trackBlogShare = (slug: string, platform: string) => {
  event({
    action: 'share_blog_post',
    category: 'blog',
    label: platform,
  });
};

// Feature usage
export const trackFeatureUsage = (feature: string, action: string) => {
  event({
    action: action,
    category: 'feature_usage',
    label: feature,
  });
};

// Contact form
export const trackContactSubmission = (type: string) => {
  event({
    action: 'submit_contact_form',
    category: 'contact',
    label: type,
  });
};
```

### 3. Performance Monitoring

#### Core Web Vitals Tracking
```typescript
// lib/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

export function reportWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
```

## Key Metrics to Track

### 1. User Engagement Metrics
- Page views per session
- Time on page
- Bounce rate
- Return user rate
- Session duration

### 2. Feature-Specific Metrics
#### Calculator Usage
- Number of calculations per session
- Average salary calculated
- Regional usage patterns
- Net vs Gross calculations
- Tax calculation usage

#### Blog Performance
- Article read time
- Scroll depth
- Social shares
- Comment engagement
- Popular categories

#### Conversion Metrics
- Demo requests
- Contact form submissions
- Newsletter signups
- Donations

### 3. Performance Metrics
- Page load speed
- Core Web Vitals
- Error rates
- API response times

## Privacy & Compliance

### 1. Cookie Consent Implementation
```typescript
// components/cookie-consent.tsx
import { useState, useEffect } from 'react';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setAnalytics(true);
    setShowConsent(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="mb-4 md:mb-0">
          We use cookies to analyze site traffic and improve your experience.
        </p>
        <div className="flex gap-4">
          <button
            onClick={acceptNecessary}
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-gray-900"
          >
            Necessary Only
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-100"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
```

### 2. Data Anonymization
- Remove IP addresses
- No personal identifiers
- Aggregate data only
- Respect DNT headers

### 3. GDPR Compliance
- Clear consent mechanism
- Data deletion options
- Transparent data usage
- Right to access data

## Implementation Checklist

### Phase 1: Basic Setup
- [ ] Set up Google Analytics 4 property
- [ ] Configure measurement ID in environment
- [ ] Install gtag script in layout
- [ ] Implement page view tracking
- [ ] Set up cookie consent banner

### Phase 2: Event Tracking
- [ ] Calculator interaction events
- [ ] Blog engagement tracking
- [ ] Contact form submissions
- [ ] Feature usage tracking
- [ ] Error tracking

### Phase 3: Performance Monitoring
- [ ] Core Web Vitals tracking
- [ ] Page load performance
- [ ] API response times
- [ ] Error rate monitoring

### Phase 4: Advanced Features
- [ ] Custom dashboards
- [ ] Goal tracking setup
- [ ] Conversion funnels
- [ ] A/B testing framework
- [ ] Heatmap integration

## Data Analysis Guide

### 1. Key Reports to Monitor
#### Audience Overview
- Users vs New Users
- Sessions by Location
- Device Categories
- Browser Usage

#### Behavior Analysis
- Most Viewed Pages
- Average Time on Page
- Bounce Rate by Page
- Exit Pages

#### Conversion Tracking
- Goal Completions
- Conversion Paths
- Multi-Channel Funnels

### 2. Custom Reports
#### Salary Calculator Performance
```
Report: Calculator Usage
Metrics: Calculations, Average Salary, Unique Users
Dimensions: Region, Date Range, Calculator Type
```

#### Content Engagement
```
Report: Blog Performance
Metrics: Page Views, Avg. Time, Scroll Depth
Dimensions: Category, Author, Publication Date
```

### 3. Alert Configuration
- Traffic anomalies
- Performance degradation
- Error rate spikes
- Conversion rate changes

## Best Practices

### 1. Tagging Strategy
- Consistent naming conventions
- Clear event categorization
- Meaningful labels
- Proper value tracking

### 2. Data Quality
- Regular data validation
- Test tracking implementation
- Monitor data completeness
- Validate funnels

### 3. Privacy Considerations
- Minimal data collection
- Clear consent management
- Regular privacy audits
- Transparent policies

### 4. Performance Impact
- Async script loading
- Minimal tracking code
- Bundle size optimization
- CDN utilization

## Troubleshooting

### Common Issues
1. **No data in GA4**
   - Check measurement ID configuration
   - Verify gtag script installation
   - Ensure ad blockers aren't blocking GA

2. **Incorrect page views**
   - Check SPAs navigation tracking
   - Verify path structure
   - Test multiple page types

3. **Events not firing**
   - Validate event implementation
   - Check consent state
   - Test with debug mode

4. **Performance issues**
   - Optimize script loading
   - Check bundle size impact
   - Monitor Core Web Vitals

### Debug Tools
- GA4 DebugView
- Google Tag Assistant
- Browser developer tools
- Real-time reports

## Conclusion

This analytics implementation provides comprehensive insights into user behavior while maintaining privacy standards and performance. Regular monitoring and optimization will help improve the SalaryCalcVN user experience and achieve business objectives.