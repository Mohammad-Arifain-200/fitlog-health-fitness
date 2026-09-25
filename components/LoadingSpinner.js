export default function LoadingSpinner({ text = 'Loading workouts…' }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center gap-4 text-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#343946] border-t-fit-accent" />
      <p className="text-sm text-[#8f96a3]">{text}</p>
    </div>
  );
}
