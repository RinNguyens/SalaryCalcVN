import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingDonateButton } from "@/components/donate/floating-donate-button";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
          <Header />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
          <FloatingDonateButton />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
