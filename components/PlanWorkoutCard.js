'use client';

import Link from 'next/link';
import { Check, Plus, X } from 'lucide-react';
import StatRow from '@/components/StatRow';
import { usePlan } from '@/context/PlanContext';

export default function PlanWorkoutCard({ workout, mode = 'plan', done = false }) {
  const { markDone, removeFromPlan, removeFromSaved, addToPlan, plan } = usePlan();
  const alreadyPlanned = plan.some((item) => Number(item.id) === Number(workout.id));

  return (
    <article className={`flex flex-col gap-5 rounded-[4px] border border-white/[0.06] bg-fit-panel p-3 sm:flex-row sm:items-center ${done ? 'opacity-70' : ''}`}>
      <img
        src={workout.image}
        alt={workout.name}
        className="h-28 w-full rounded-[3px] object-cover sm:h-20 sm:w-36"
        onError={(event) => {
          event.currentTarget.src = '/banner.png';
          event.currentTarget.className = 'h-28 w-full rounded-[3px] object-contain p-2 sm:h-20 sm:w-36';
        }}
      />

      <div className="min-w-0 flex-1">
        <h3 className={`font-display text-lg font-bold uppercase tracking-wide text-white ${done ? 'line-through decoration-[#69717f]' : ''}`}>{workout.name}</h3>
        <p className="mt-1 text-xs text-[#7e8592]">{workout.equipment}</p>
        <div className="mt-2"><StatRow workout={workout} compact /></div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-[3px] border border-[#363c47] bg-[#111318] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white transition hover:border-[#656d7a]"
        >
          View Details
        </Link>

        {mode === 'plan' ? (
          <button
            type="button"
            onClick={() => markDone(workout.id)}
            disabled={done}
            className="inline-flex items-center gap-1.5 rounded-[3px] bg-fit-accent px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-[#10130c] transition hover:brightness-110 disabled:cursor-default disabled:opacity-55"
          >
            <Check className="h-3.5 w-3.5" />
            {done ? 'Done' : 'Mark as Done'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => addToPlan(workout)}
            disabled={alreadyPlanned}
            className="inline-flex items-center gap-1.5 rounded-[3px] bg-fit-accent px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-[#10130c] transition hover:brightness-110 disabled:cursor-default disabled:opacity-55"
          >
            <Plus className="h-3.5 w-3.5" />
            {alreadyPlanned ? 'In Plan' : 'Add Today'}
          </button>
        )}

        <button
          type="button"
          onClick={() => (mode === 'plan' ? removeFromPlan(workout.id) : removeFromSaved(workout.id))}
          aria-label={`Remove ${workout.name}`}
          className="grid h-9 w-9 place-items-center rounded-[3px] text-[#8b929e] transition hover:bg-[#20242c] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
