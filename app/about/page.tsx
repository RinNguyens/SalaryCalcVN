import { Metadata } from 'next';

// Import the new components
import { WhyChooseUs } from '@/components/about/why-choose-us';
import { TestimonialsSection } from '@/components/about/testimonials-section';
import { CTASection } from '@/components/about/cta-section';

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
      {/* Hero Section - Simple for now */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Về SalaryLens
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
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