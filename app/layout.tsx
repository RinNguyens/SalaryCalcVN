import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingDonateButton } from "@/components/donate/floating-donate-button";
import { PastelBackground } from "@/components/layout/pastel-background";
import { GA_MEASUREMENT_ID, GA_DEBUG } from "@/lib/analytics";
import { CookieConsent } from "@/components/cookie-consent";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://salarylens.com'),
  title: "SalaryLens - Crystal Clear Salary Insights",
  description:
    "Công cụ tính lương thông minh với AI. Phân tích thu nhập, tối ưu thuế, và tư vấn tài chính cho người Việt Nam.",
  keywords: [
    "tính lương",
    "salary calculator",
    "vietnam salary",
    "tax calculator",
    "salarylens",
    "lương net",
    "thu nhập",
    "gross to net",
    "thuế TNCN",
    "bảo hiểm xã hội",
  ],
  authors: [{ name: "SalaryLens Team" }],
  openGraph: {
    title: "SalaryLens - Crystal Clear Salary Insights",
    description: "Công cụ tính lương thông minh với AI cho người lao động Việt Nam",
    type: "website",
    locale: "vi_VN",
    siteName: "SalaryLens",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SalaryLens - Công cụ tính lương thông minh",
      },
      {
        url: "/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "SalaryLens Logo",
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
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
                      custom_parameter_3: 'metric_rating',
                    },
                    debug_mode: ${GA_DEBUG},
                    anonymize_ip: true,
                    send_page_view: false, // We'll handle page views manually
                  });
                `}
              </Script>
            </>
          )}
        </head>
        <body className={inter.className}>
          <Suspense fallback={null}>
            <AnalyticsProvider />
          </Suspense>
          <PastelBackground />
          <div className="min-h-screen relative z-10">
            <Header />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
            <FloatingDonateButton />
          </div>
          <Toaster />
          <CookieConsent />
        </body>
      </html>
    </ClerkProvider>
  );
}
