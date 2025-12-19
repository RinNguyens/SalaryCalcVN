declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const GA_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === 'true';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      send_page_view: true,
      debug_mode: GA_DEBUG,
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
      debug_mode: GA_DEBUG,
    });
  }
};

// Specific tracking functions for SalaryCalcVN
export const trackSalaryCalculation = (grossSalary: number, netSalary: number, region: string) => {
  event({
    action: 'salary_calculation',
    category: 'calculator',
    label: region,
    value: Math.round(grossSalary),
  });

  event({
    action: 'net_salary_calculated',
    category: 'calculator',
    label: region,
    value: Math.round(netSalary),
  });
};

export const trackTaxCalculation = (incomeTax: number, socialInsurance: number, healthInsurance: number, unemploymentInsurance: number) => {
  event({
    action: 'tax_breakdown_calculated',
    category: 'calculator',
    label: 'vietnam_taxes',
    value: Math.round(incomeTax),
  });
};

export const trackBlogPostView = (slug: string, category: string, readTime?: number) => {
  event({
    action: 'blog_post_view',
    category: 'content',
    label: `${category}/${slug}`,
    value: readTime,
    nonInteraction: true,
  });
};

export const trackBlogEngagement = (slug: string, action: 'scroll' | 'share' | 'bookmark', platform?: string) => {
  const label = platform ? `${action}/${platform}` : action;
  event({
    action: 'blog_engagement',
    category: 'content',
    label: `${slug}/${label}`,
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

export const trackNavigation = (from: string, to: string) => {
  event({
    action: 'navigation',
    category: 'user_flow',
    label: `${from} -> ${to}`,
    nonInteraction: true,
  });
};

export const trackSearch = (query: string, resultsCount?: number) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
    value: resultsCount,
  });
};

export const trackFormSubmission = (formName: string, success: boolean = true) => {
  event({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'forms',
    label: formName,
  });
};

export const trackError = (error: string, context: string) => {
  event({
    action: 'error',
    category: 'technical',
    label: `${context}: ${error}`,
    nonInteraction: true,
  });
};

export const trackContentSharing = (contentType: string, platform: string, url?: string) => {
  event({
    action: 'share',
    category: 'social',
    label: `${contentType}/${platform}`,
  });
};

export const trackTimeOnPage = (pageName: string, timeSpent: number) => {
  event({
    action: 'time_on_page',
    category: 'engagement',
    label: pageName,
    value: Math.round(timeSpent / 1000), // Convert to seconds
    nonInteraction: true,
  });
};

export const trackDeviceInfo = () => {
  if (typeof window !== 'undefined') {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    event({
      action: 'device_info',
      category: 'technical',
      label: isMobile ? 'mobile' : 'desktop',
      nonInteraction: true,
    });

    // Track viewport size category
    const width = window.innerWidth;
    let sizeCategory = 'unknown';
    if (width < 640) sizeCategory = 'mobile';
    else if (width < 1024) sizeCategory = 'tablet';
    else if (width < 1920) sizeCategory = 'desktop';
    else sizeCategory = 'large_desktop';

    event({
      action: 'viewport_size',
      category: 'technical',
      label: sizeCategory,
      nonInteraction: true,
    });
  }
};

export const trackThemeChange = (theme: 'light' | 'dark' | 'system') => {
  event({
    action: 'theme_change',
    category: 'preferences',
    label: theme,
  });
};

export const trackLanguageChange = (language: string) => {
  event({
    action: 'language_change',
    category: 'preferences',
    label: language,
  });
};

// Export functions
export const trackExportPDF = () => {
  event({
    action: 'export_pdf',
    category: 'calculator',
    label: 'salary_breakdown',
  });
};

export const trackDemoMode = () => {
  event({
    action: 'demo_mode_activated',
    category: 'calculator',
    label: 'try_demo',
  });
};

export const trackComparisonCreated = () => {
  event({
    action: 'comparison_created',
    category: 'calculator',
    label: 'job_offers',
  });
};

export const trackHistoryAccess = () => {
  event({
    action: 'history_accessed',
    category: 'user',
    label: 'calculations',
  });
};