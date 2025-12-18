import { Metadata } from 'next';

// Import the new components
import { WhyChooseUs } from '@/components/about/why-choose-us';
import { TestimonialsSection } from '@/components/about/testimonials-section';
import { CTASection } from '@/components/about/cta-section';
import { PastelBackground } from '@/components/layout/pastel-background';
import { BackgroundElements } from '@/components/ui/background-elements';

export const metadata: Metadata = {
  title: 'Về chúng tôi | SalaryLens - Công cụ tính lương #1 Việt Nam',
  description: 'Câu chuyện, sứ mệnh và giá trị cốt lõi của SalaryLens. Được tin tưởng bởi 50,000+ người lao động. Miễn phí, chính xác, dễ dùng.',
  keywords: 'về salarylens, câu chuyện, sứ mệnh, giá trị, đánh giá, testimonials',
  openGraph: {
    title: 'Về chúng tôi | SalaryLens',
    description: 'Công cụ tính lương miễn phí, chính xác nhất Việt Nam',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PastelBackground />
      <BackgroundElements />
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Về SalaryLens
          </h1>
          <p className="text-xl text-black/80 max-w-2xl mx-auto">
            Công cụ tính lương Gross ↔ Net chính xác, miễn phí và dễ dàng nhất cho người lao động Việt Nam
          </p>
        </div>
      </section>

      {/* Why Choose Us - NEW ✨ */}
      <WhyChooseUs />

      {/* Testimonials - NEW ✨ */}
      <TestimonialsSection />

      {/* Final CTA - NEW ✨ */}
      <CTASection />
    </div>
  );
}