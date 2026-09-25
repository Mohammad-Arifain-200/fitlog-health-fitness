'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import LoadingSpinner from '@/components/LoadingSpinner';
import WorkoutCard from '@/components/WorkoutCard';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <main className="mx-auto max-w-[1280px] px-4 pt-12 sm:px-6">
      <Hero />

      <section id="library" className="scroll-mt-28 pt-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold uppercase tracking-[-0.025em] text-white">The Library</h2>
          <p className="mt-1 text-xs text-[#7e8592]">Twelve lifts covering every major muscle group.</p>
        </div>

        {loading && <LoadingSpinner text="Loading workouts…" />}

        {!loading && error && (
          <div className="rounded-[4px] border border-red-400/20 bg-red-400/[0.06] px-5 py-8 text-center text-sm text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
          </div>
        )}
      </section>
    </main>
  );
}
