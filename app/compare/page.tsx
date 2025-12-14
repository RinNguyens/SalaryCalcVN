'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ComparePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new job offer comparison page
    router.replace('/job-offer-comparison');
  }, [router]);

  return null;
}