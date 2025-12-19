'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const storedConsent = localStorage.getItem('cookie-consent');

    if (!storedConsent) {
      // First time visitor, show consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(storedConsent);
        setPreferences(parsed);

        // Initialize analytics if user previously consented
        if (parsed.analytics && window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: parsed.marketing ? 'granted' : 'denied',
          });
        }
      } catch (e) {
        // Invalid JSON, show consent again
        setShowConsent(true);
      }
    }
  }, []);

  const savePreferences = (pref: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(pref));
    setPreferences(pref);
    setHasInteracted(true);

    // Update Google Analytics consent
    if (window.gtag) {
      window.gtag('consent', 'default', {
        ad_storage: pref.marketing ? 'granted' : 'denied',
        analytics_storage: pref.analytics ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
      });

      window.gtag('consent', 'update', {
        ad_storage: pref.marketing ? 'granted' : 'denied',
        analytics_storage: pref.analytics ? 'granted' : 'denied',
      });

      // Send consent event
      window.gtag('event', 'consent_updated', {
        event_category: 'privacy',
        event_label: pref.analytics ? 'analytics_accepted' : 'analytics_rejected',
        custom_parameter_1: pref.marketing ? 'marketing_accepted' : 'marketing_rejected',
      });
    }

    // Hide banner after a brief delay to allow user to see the confirmation
    setTimeout(() => {
      setShowConsent(false);
    }, 1000);
  };

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allPreferences);
  };

  const acceptEssential = () => {
    const essentialPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(essentialPreferences);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  if (!showConsent || hasInteracted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full">
              <Cookie className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Cookie Preferences</h3>
              <p className="text-sm text-gray-300">We value your privacy</p>
            </div>
          </div>
          <button
            onClick={() => setShowConsent(false)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Message */}
        <div className="mb-6 max-w-4xl">
          <p className="text-gray-200 leading-relaxed">
            We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience.
            By clicking accept, you agree to this, as outlined in our{' '}
            <a href="/cookies" className="text-blue-400 hover:text-blue-300 underline">
              Cookie Policy
            </a>
            .
          </p>
        </div>

        {/* Detailed Options */}
        {showDetails && (
          <div className="mb-6 bg-white/5 backdrop-blur-sm rounded-lg p-4 space-y-4 border border-white/10">
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-not-allowed opacity-60">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 rounded"
                  />
                  <div>
                    <span className="font-medium">Essential Cookies</span>
                    <p className="text-xs text-gray-400 mt-1">
                      Required for the website to function properly
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-gray-600 px-2 py-1 rounded">Always Active</span>
              </label>

              <label className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                  <div>
                    <span className="font-medium">Analytics Cookies</span>
                    <p className="text-xs text-gray-400 mt-1">
                      Help us understand how you use our website
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Recommended</span>
              </label>

              <label className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                  <div>
                    <span className="font-medium">Marketing Cookies</span>
                    <p className="text-xs text-gray-400 mt-1">
                      Used to deliver ads and track marketing campaigns
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={acceptAll}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 font-semibold"
            >
              Accept All
            </Button>
            <Button
              onClick={acceptEssential}
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-black px-6 py-3 font-semibold"
            >
              Essential Only
            </Button>
          </div>

          {showDetails && (
            <Button
              onClick={() => savePreferences(preferences)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold"
            >
              Save Preferences
            </Button>
          )}
        </div>

        {/* Additional Links */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-sm">
          <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </a>
          <span className="text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};