import type { Metadata } from 'next';
import { PastelBackground } from '@/components/layout/pastel-background';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactMethods } from '@/components/contact/contact-methods';
import { ContactFAQ } from '@/components/contact/contact-faq';
import { ContactSocial } from '@/components/contact/contact-social';

export const metadata: Metadata = {
  title: 'Liên Hệ | SalaryLens',
  description: 'Liên hệ với đội ngũ SalaryLens để được hỗ trợ, giải đáp thắc mắc hoặc đóng góp ý kiến',
  openGraph: {
    title: 'Liên Hệ | SalaryLens',
    description: 'Liên hệ với đội ngũ SalaryLens',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      <PastelBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <ContactHero />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Methods & Info */}
          <div className="space-y-8">
            <ContactMethods />
            <ContactSocial />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <ContactFAQ />
        </div>
      </div>
      </div>
    </div>
  );
}
