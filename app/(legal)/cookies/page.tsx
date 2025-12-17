import { cookiePolicyContent } from '@/lib/legal/cookie-policy';
import { LegalPage } from '@/components/legal/legal-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính Sách Cookie | SalaryLens',
  description: 'Tìm hiểu cách SalaryLens sử dụng cookies và công nghệ theo dõi',
};

export default function CookiesPage() {
  return <LegalPage content={cookiePolicyContent} />;
}
