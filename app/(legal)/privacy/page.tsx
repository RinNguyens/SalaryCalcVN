import { privacyPolicyContent } from '@/lib/legal/privacy-policy';
import { LegalPage } from '@/components/legal/legal-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật | SalaryLens',
  description: 'Tìm hiểu cách SalaryLens thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn',
};

export default function PrivacyPage() {
  return <LegalPage content={privacyPolicyContent} />;
}
