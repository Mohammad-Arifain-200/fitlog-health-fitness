import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/[0.06] bg-[#090a0d]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-10 text-center sm:flex-row sm:text-left">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={20} height={20} />
          <span className="font-display text-sm font-bold text-white">FITLOG</span>
        </Link>
        <p className="text-xs text-[#747b87]">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
