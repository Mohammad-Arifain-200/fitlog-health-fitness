'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();
  const workoutActive = pathname === '/' || pathname.startsWith('/workout/');
  const planActive = pathname.startsWith('/my-plan');

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-fit-bg/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="FitLog home">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} priority />
          <span className="font-display text-lg font-bold tracking-wide text-white">FITLOG</span>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-white/[0.04] bg-[#101217] p-1 text-xs font-semibold sm:text-sm">
          <Link
            href="/"
            className={`rounded-full px-3 py-2 transition ${workoutActive ? 'bg-[#1a2312] text-fit-accent' : 'text-[#9ba1ac] hover:text-white'}`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-3 py-2 transition ${planActive ? 'bg-[#1a2312] text-fit-accent' : 'text-[#9ba1ac] hover:text-white'}`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-wide sm:text-xs">
          <Link href="/my-plan?tab=plan" className="flex items-center gap-1.5 text-[#b7bdc8]">
            <span className="hidden xs:inline sm:inline">Plan</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-fit-accent px-1.5 text-fit-bg">
              {planCount}
            </span>
          </Link>
          <Link href="/my-plan?tab=saved" className="flex items-center gap-1.5 text-[#b7bdc8]">
            <span className="hidden xs:inline sm:inline">Saved</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full border border-[#5b626f] px-1.5 text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
