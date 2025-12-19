import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';
import { GA_MEASUREMENT_ID, GA_DEBUG } from './analytics';

export function sendToAnalytics(metric: Metric) {
  if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_map: {
        custom_parameter_1: 'metric_name',
        custom_parameter_2: 'metric_value',
        custom_parameter_3: 'metric_rating',
      },
      metric_name: metric.name,
      metric_value: metric.value.toFixed(3),
      metric_rating: getRating(metric),
      debug_mode: GA_DEBUG,
    });
  }
}

function getRating(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
  if (metric.name === 'CLS') {
    if (metric.value <= 0.1) return 'good';
    if (metric.value <= 0.25) return 'needs-improvement';
    return 'poor';
  } else if (metric.name === 'INP' || metric.name === 'TTFB') {
    if (metric.value <= 100) return 'good';
    if (metric.value <= 300) return 'needs-improvement';
    return 'poor';
  } else {
    // FCP, LCP
    if (metric.value <= 2500) return 'good';
    if (metric.value <= 4000) return 'needs-improvement';
    return 'poor';
  }
}

export function reportWebVitals() {
  if (typeof window !== 'undefined') {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }
}

// Page load time tracking
export function trackPageLoadTime(pageName: string) {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (navigation) {
          const metrics = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            firstByte: navigation.responseStart - navigation.requestStart,
            totalTime: navigation.loadEventEnd - navigation.fetchStart,
            ttfb: navigation.responseStart - navigation.requestStart,
          };

          // Send individual metrics
          Object.entries(metrics).forEach(([metricName, value]) => {
            if (value > 0) {
              window.gtag('event', `performance_${metricName}`, {
                event_category: 'performance',
                event_label: pageName,
                value: Math.round(value),
                non_interaction: true,
                debug_mode: GA_DEBUG,
              });
            }
          });

          // Overall page load performance
          window.gtag('event', 'page_load_time', {
            event_category: 'performance',
            event_label: pageName,
            value: Math.round(metrics.totalTime),
            non_interaction: true,
            debug_mode: GA_DEBUG,
          });
        }
      }, 0);
    });
  }
}

// Track resource loading performance
export function trackResourceLoading() {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

      const resourceTypes: Record<string, { count: number; totalTime: number; size?: number }> = {
        image: { count: 0, totalTime: 0, size: 0 },
        script: { count: 0, totalTime: 0, size: 0 },
        stylesheet: { count: 0, totalTime: 0, size: 0 },
        fetch: { count: 0, totalTime: 0 },
        other: { count: 0, totalTime: 0 },
      };

      resources.forEach(resource => {
        const duration = resource.responseEnd - resource.startTime;
        const type = resource.initiatorType as keyof typeof resourceTypes;

        if (resourceTypes[type]) {
          resourceTypes[type].count++;
          resourceTypes[type].totalTime += duration;
          if ('transferSize' in resource && resource.transferSize && resourceTypes[type].size !== undefined) {
            resourceTypes[type].size += resource.transferSize;
          }
        } else {
          resourceTypes.other.count++;
          resourceTypes.other.totalTime += duration;
        }
      });

      // Report resource loading metrics
      Object.entries(resourceTypes).forEach(([type, metrics]) => {
        if (metrics.count > 0) {
          const avgTime = metrics.totalTime / metrics.count;

          window.gtag('event', 'resource_loading', {
            event_category: 'performance',
            event_label: `${type}_avg_load_time`,
            value: Math.round(avgTime),
            non_interaction: true,
            debug_mode: GA_DEBUG,
          });

          window.gtag('event', 'resource_count', {
            event_category: 'performance',
            event_label: type,
            value: metrics.count,
            non_interaction: true,
            debug_mode: GA_DEBUG,
          });

          if (metrics.size !== undefined && metrics.size > 0) {
            window.gtag('event', 'resource_size', {
              event_category: 'performance',
              event_label: type,
              value: Math.round(metrics.size / 1024), // Convert to KB
              non_interaction: true,
              debug_mode: GA_DEBUG,
            });
          }
        }
      });
    });
  }
}

// Track user interaction performance
export function trackInteractionPerformance(element: string, action: string) {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    const startTime = performance.now();

    // Track when the interaction completes (when the next frame is painted)
    requestAnimationFrame(() => {
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      window.gtag('event', 'interaction_performance', {
        event_category: 'performance',
        event_label: `${element}_${action}`,
        value: Math.round(responseTime),
        non_interaction: true,
        debug_mode: GA_DEBUG,
      });
    });
  }
}

// Track long tasks that might block the main thread
export function trackLongTasks() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) { // Tasks longer than 50ms
          window.gtag('event', 'long_task', {
            event_category: 'performance',
            event_label: 'main_thread_block',
            value: Math.round(entry.duration),
            non_interaction: true,
            debug_mode: GA_DEBUG,
          });
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.warn('Long task observation not supported');
    }
  }
}

// Track memory usage (where supported)
export function trackMemoryUsage() {
  if (typeof window !== 'undefined' && 'memory' in performance && GA_MEASUREMENT_ID) {
    const memory = (performance as any).memory;

    window.gtag('event', 'memory_usage', {
      event_category: 'performance',
      event_label: 'used_js_heap_size',
      value: Math.round(memory.usedJSHeapSize / 1048576), // Convert to MB
      non_interaction: true,
      debug_mode: GA_DEBUG,
    });

    window.gtag('event', 'memory_usage', {
      event_category: 'performance',
      event_label: 'total_js_heap_size',
      value: Math.round(memory.totalJSHeapSize / 1048576), // Convert to MB
      non_interaction: true,
      debug_mode: GA_DEBUG,
    });
  }
}

// Network connection quality tracking
export function trackNetworkQuality() {
  if (typeof window !== 'undefined' && 'connection' in navigator && GA_MEASUREMENT_ID) {
    const connection = (navigator as any).connection;

    if (connection) {
      window.gtag('event', 'network_info', {
        event_category: 'technical',
        event_label: 'effective_type',
        non_interaction: true,
        custom_map: {
          custom_parameter_1: 'connection_type',
          custom_parameter_2: 'downlink',
          custom_parameter_3: 'rtt',
        },
        connection_type: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
        debug_mode: GA_DEBUG,
      });
    }
  }
}

// Initialize all performance tracking
export function initializePerformanceTracking(pageName: string) {
  reportWebVitals();
  trackPageLoadTime(pageName);
  trackResourceLoading();
  trackLongTasks();
  trackNetworkQuality();

  // Track memory usage every 30 seconds (in production only)
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => trackMemoryUsage(), 30000);
  }
}