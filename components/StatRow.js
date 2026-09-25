import { Clock3, Flame, Star } from 'lucide-react';

export default function StatRow({ workout, compact = false }) {
  const itemClass = `flex items-center gap-1.5 ${compact ? 'text-[11px]' : 'text-xs'} text-[#7f8795]`;
  const iconClass = compact ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className={itemClass}><Clock3 className={iconClass} />{workout.duration} min</span>
      <span className={itemClass}><Flame className={iconClass} />{workout.caloriesBurned} kcal</span>
      <span className={itemClass}><Star className={`${iconClass} text-fit-accent`} />{workout.rating}</span>
    </div>
  );
}
