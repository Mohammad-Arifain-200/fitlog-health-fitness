import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[62vh] max-w-[1280px] flex-col items-center justify-center px-6 py-16 text-center">
      <Dumbbell className="h-10 w-10 text-fit-accent" />
      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.12em] text-fit-accent">404 — Not Found</p>
      <h1 className="mt-2 font-display text-5xl font-bold uppercase text-white">Wrong Rack.</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-[#868d99]">That page or workout does not exist. Head back to the library and pick your next lift.</p>
      <Link href="/" className="mt-7 rounded-[3px] bg-fit-accent px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.07em] text-[#10130c]">Back to workouts</Link>
    </main>
  );
}
