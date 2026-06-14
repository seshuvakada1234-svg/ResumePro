'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AtsScannerPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ats-score');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  );
}
