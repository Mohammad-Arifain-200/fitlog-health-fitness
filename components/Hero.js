import Image from 'next/image';
import { Dumbbell } from 'lucide-react';

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-[4px] bg-fit-panel">
      <div className="grid min-h-[448px] items-center gap-8 px-7 py-12 sm:px-12 lg:grid-cols-[1.15fr_.85fr] lg:px-14 lg:py-0">
        <div className="max-w-[620px]">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-fit-accent">Workout Library</p>
          <h1 className="font-display text-[42px] font-bold uppercase leading-[0.98] tracking-[-0.025em] text-white sm:text-[52px] lg:text-[60px]">
            Train with intent. Log every set.
          </h1>
          <p className="mt-6 max-w-[540px] text-sm leading-6 text-[#939aa7]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-[3px] bg-fit-accent px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#11140d] transition hover:brightness-110"
          >
            <Dumbbell className="h-4 w-4" />
            Browse workouts
          </a>
        </div>

        <div className="relative flex min-h-[300px] items-center justify-center lg:min-h-[448px] lg:justify-end">
          <div className="absolute h-64 w-64 rounded-full bg-fit-accent/[0.035] blur-3xl" />
          <Image
            src="/banner.png"
            alt="Workout machine illustration"
            width={334}
            height={334}
            className="relative max-h-[360px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,.45)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
