'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import PlanWorkoutCard from '@/components/PlanWorkoutCard';

const API_URL = '/api/workouts';

export default function MyPlanClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { plan, saved, hydrated } = usePlan();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(searchParams.get('tab') === 'saved' ? 'saved' : 'plan');
  const [sortBy, setSortBy] = useState('Duration');

  useEffect(() => {
    const requested = searchParams.get('tab') === 'saved' ? 'saved' : 'plan';
    setTab(requested);
  }, [searchParams]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error('Could not load workouts');
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') setError('Workout data could not be loaded. Please try again.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadWorkouts();
    return () => controller.abort();
  }, []);

  const byId = useMemo(() => new Map(workouts.map((workout) => [Number(workout.id), workout])), [workouts]);

  const planItems = useMemo(
    () => plan.map((item) => ({ ...byId.get(Number(item.id)), done: item.done })).filter((item) => item.id),
    [plan, byId]
  );

  const savedItems = useMemo(
    () => saved.map((id) => byId.get(Number(id))).filter(Boolean),
    [saved, byId]
  );

  const metrics = useMemo(() => ({
    exercises: planItems.length,
    minutes: planItems.reduce((sum, item) => sum + Number(item.duration || 0), 0),
    calories: planItems.reduce((sum, item) => sum + Number(item.caloriesBurned || 0), 0),
  }), [planItems]);

  function sortItems(items) {
    return [...items].sort((a, b) => {
      if (sortBy === 'Calories') return Number(b.caloriesBurned) - Number(a.caloriesBurned);
      if (sortBy === 'Rating') return Number(b.rating) - Number(a.rating);
      return Number(a.duration) - Number(b.duration);
    });
  }

  const currentItems = sortItems(tab === 'plan' ? planItems : savedItems);

  function changeTab(nextTab) {
    setTab(nextTab);
    router.replace(`/my-plan?tab=${nextTab}`, { scroll: false });
  }

  const waiting = loading || !hydrated;

  return (
    <main className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
      <section>
        <h1 className="font-display text-3xl font-bold uppercase tracking-[-0.025em] text-white">My Plan</h1>
        <p className="mt-1 text-xs text-[#7e8592]">Cap of five lifts for today. Finish them, then load more.</p>

        <div className="mt-8 grid overflow-hidden rounded-[4px] border border-white/[0.06] bg-fit-panel sm:grid-cols-3">
          <Metric label="Exercises" value={metrics.exercises} />
          <Metric label="Minutes" value={metrics.minutes} border />
          <Metric label="Calories" value={metrics.calories} border />
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <TabButton active={tab === 'plan'} onClick={() => changeTab('plan')}>Today&apos;s Plan</TabButton>
            <TabButton active={tab === 'saved'} onClick={() => changeTab('saved')}>Saved</TabButton>
          </div>

          <label className="relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#7f8793]">
            <span>Sort By</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="appearance-none rounded-[3px] border border-[#303641] bg-[#13161d] py-2 pl-3 pr-9 text-[10px] font-bold uppercase text-white outline-none focus:border-fit-accent"
            >
              <option>Duration</option>
              <option>Calories</option>
              <option>Rating</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-[#858c98]" />
          </label>
        </div>

        <div className="mt-6">
          {waiting && <LoadingSpinner text="Loading workouts…" />}

          {!waiting && error && (
            <div className="rounded-[4px] border border-red-400/20 bg-red-400/[0.06] px-5 py-8 text-center text-sm text-red-200">{error}</div>
          )}

          {!waiting && !error && currentItems.length === 0 && <EmptyState saved={tab === 'saved'} />}

          {!waiting && !error && currentItems.length > 0 && (
            <div className="space-y-3">
              {currentItems.map((workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  mode={tab}
                  done={Boolean(workout.done)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value, border = false }) {
  return (
    <div className={`px-7 py-5 ${border ? 'border-t border-white/[0.06] sm:border-l sm:border-t-0' : ''}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6f7784]">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[3px] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.06em] transition ${active ? 'bg-[#1f242d] text-white' : 'text-[#737b88] hover:text-white'}`}
    >
      {children}
    </button>
  );
}
