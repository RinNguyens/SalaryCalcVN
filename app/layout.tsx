import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Script from "next/script";
import { Inter } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://salarylens.cc'),
  title: {
    default: "SalaryLens - Công Cụ Tính Lương Thông Minh Cho Người Việt",
    template: "%s | SalaryLens"
  },
  description:
    "Công cụ tính lương chính xác với AI, hỗ trợ tính thuế TNCN, bảo hiểm xã hội, lương gross-net. Phân tích thu nhập, tối ưu thuế, và tư vấn tài chính miễn phí cho người lao động Việt Nam.",
  keywords: [
    "tính lương",
    "tính lương online",
    "máy tính lương",
    "lương gross to net",
    "lương net to gross",
    "tính thuế thu nhập cá nhân",
    "thuế TNCN",
    "bảo hiểm xã hội",
    "BHXH",
    "BHYT",
    "BHTN",
    "tính lương thực lãnh",
    "lương net",
    "lương gross",
    "thu nhập",
    "tối ưu thuế",
    "giảm trừ gia cảnh",
    "người phụ thuộc",
    "công cụ tài chính",
    "tư vấn lương",
    "SalaryLens",
    "tính lương Việt Nam",
  ],
  authors: [{ name: "SalaryLens Team" }],
  creator: "SalaryLens",
  publisher: "SalaryLens",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://salarylens.cc",
  },
  openGraph: {
    title: "SalaryLens - Công Cụ Tính Lương Thông Minh Cho Người Việt",
    description: "Công cụ tính lương chính xác với AI. Tính thuế TNCN, bảo hiểm xã hội, lương gross-net. Miễn phí cho người lao động Việt Nam.",
    type: "website",
    locale: "vi_VN",
    url: "https://salarylens.cc",
    siteName: "SalaryLens",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SalaryLens - Công cụ tính lương thông minh với AI cho người Việt",
      },
      {
        url: "/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "SalaryLens - Biểu tượng ứng dụng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SalaryLens - Công Cụ Tính Lương Thông Minh Cho Người Việt",
    description: "Công cụ tính lương chính xác với AI. Tính thuế TNCN, bảo hiểm xã hội, lương gross-net. Miễn phí!",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
