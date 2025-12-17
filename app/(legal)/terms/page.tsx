import { termsOfServiceContent } from '@/lib/legal/terms-of-service';
import { LegalPage } from '@/components/legal/legal-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng | SalaryLens',
  description: 'Quy định và điều kiện khi sử dụng dịch vụ SalaryLens',
};

export default function TermsPage() {
  return <LegalPage content={termsOfServiceContent} />;
}
