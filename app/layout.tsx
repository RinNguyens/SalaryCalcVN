import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingDonateButton } from "@/components/donate/floating-donate-button";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "SalaryCalc VN - Tính lương Gross Net chính xác cho Việt Nam",
  description:
    "Công cụ tính chuyển đổi lương Gross sang Net và ngược lại. Tính toán chính xác thuế TNCN và bảo hiểm theo quy định 2024-2025.",
  keywords: [
    "tính lương",
    "gross to net",
    "net to gross",
    "thuế TNCN",
    "bảo hiểm xã hội",
    "lương thực nhận",
  ],
  authors: [{ name: "SalaryCalc VN" }],
  openGraph: {
    title: "SalaryCalc VN - Tính lương Gross Net",
    description: "Công cụ tính lương miễn phí cho người lao động Việt Nam",
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
