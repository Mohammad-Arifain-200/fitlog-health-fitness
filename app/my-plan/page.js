import { Suspense } from 'react';
import MyPlanClient from '@/components/MyPlanClient';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function MyPlanPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-[1280px] px-6 py-12"><LoadingSpinner /></main>}>
      <MyPlanClient />
    </Suspense>
  );
}
