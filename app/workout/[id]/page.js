import { notFound } from 'next/navigation';
import WorkoutDetails from '@/components/WorkoutDetails';

export const dynamic = 'force-dynamic';

export default async function WorkoutPage({ params }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) notFound();

  let workout;
  try {
    const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${numericId}`, {
      cache: 'no-store',
    });
    if (!response.ok) notFound();
    workout = await response.json();
  } catch {
    notFound();
  }

  if (!workout || !workout.id) notFound();
  return <WorkoutDetails workout={workout} />;
}
