import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">
      <LoadingSpinner text="Loading workout…" />
    </main>
  );
}
