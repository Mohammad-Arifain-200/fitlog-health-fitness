'use client';

import { Bookmark, CalendarPlus } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function WorkoutDetails({ workout }) {
  const { plan, saved, addToPlan, saveForLater, MAX_PLAN } = usePlan();
  const inPlan = plan.some((item) => Number(item.id) === Number(workout.id));
  const isSaved = saved.includes(Number(workout.id));
  const planFull = plan.length >= MAX_PLAN && !inPlan;

  const specs = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', workout.sets],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.caloriesBurned} kcal`],
    ['Rating', workout.rating],
  ];

  return (
    <main className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
      <div className="grid gap-9 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#1f232b] lg:sticky lg:top-28">
          <img
            src={workout.image}
            alt={workout.name}
            className="aspect-[1.05/1] h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = '/banner.png';
              event.currentTarget.className = 'aspect-[1.05/1] h-full w-full object-contain p-8';
            }}
          />
        </div>

        <section>
          <h1 className="font-display text-4xl font-bold uppercase tracking-[-0.025em] text-white sm:text-[42px]">{workout.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8d94a1]">{workout.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span key={tag} className="rounded-full bg-fit-accent px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#10130c]">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-[3px] border border-white/[0.07] bg-fit-panel">
            <div className="border-b border-white/[0.07] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7f8793]">Key Specs</div>
            {specs.map(([label, value], index) => (
              <div key={label} className={`grid grid-cols-[120px_1fr] gap-5 px-5 py-3 text-xs ${index !== specs.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
                <span className="font-bold uppercase tracking-wide text-[#69717f]">{label}</span>
                <span className="text-right font-semibold text-[#d8dce3]">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">Instructions</h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={step} className="flex gap-4 text-sm leading-6 text-[#939aa7]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-fit-accent/45 text-[10px] font-bold text-fit-accent">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToPlan(workout)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] bg-fit-accent px-5 text-[11px] font-extrabold uppercase tracking-[0.07em] text-[#11140d] transition hover:brightness-110"
            >
              <CalendarPlus className="h-4 w-4" />
              {inPlan ? 'In today\'s plan' : planFull ? 'Plan full' : 'Add to today\'s plan'}
            </button>
            <button
              type="button"
              onClick={() => saveForLater(workout)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#3a404c] bg-[#12141a] px-5 text-[11px] font-extrabold uppercase tracking-[0.07em] text-white transition hover:border-[#656d7a]"
            >
              <Bookmark className="h-4 w-4" />
              {isSaved ? 'Saved' : 'Save for later'}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
