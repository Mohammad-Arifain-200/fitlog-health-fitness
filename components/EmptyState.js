import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function EmptyState({ saved = false }) {
  return (
    <div className="flex min-h-[290px] flex-col items-center justify-center rounded-[4px] border border-white/[0.05] bg-[#101217] px-6 text-center">
      <Dumbbell className="mb-4 h-8 w-8 text-[#363c46]" />
      <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">Nothing here yet</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#7e8592]">
        {saved ? 'Save a lift from its details page and it will wait for you here.' : 'Browse the library and add a lift to get today moving.'}
      </p>
      <Link href="/#library" className="mt-5 rounded-[3px] bg-fit-accent px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.07em] text-[#10130c]">
        Go to workouts
      </Link>
    </div>
  );
}
