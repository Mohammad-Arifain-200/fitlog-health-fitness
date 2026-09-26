'use client';

import { useRouter } from 'next/navigation';
import StatRow from '@/components/StatRow';

export default function WorkoutCard({ workout }) {
  const router = useRouter();

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/workout/${workout.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') router.push(`/workout/${workout.id}`);
      }}
      className="group cursor-pointer overflow-hidden rounded-[3px] border border-white/[0.06] bg-fit-panel shadow-card transition duration-200 hover:-translate-y-1 hover:border-fit-accent/40"
    >
      <div className="h-48 overflow-hidden bg-[#1f232b]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = '/banner.png';
            event.currentTarget.className = 'h-full w-full object-contain p-3';
          }}
        />
      </div>

      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="rounded-full bg-fit-accent px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#11140d]">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold uppercase tracking-[0.02em] text-white">{workout.name}</h3>
        <p className="mt-1 text-xs text-[#858c98]">{workout.equipment}</p>
        <div className="mt-4 border-t border-white/[0.07] pt-4">
          <StatRow workout={workout} compact />
        </div>
      </div>
    </article>
  );
}
