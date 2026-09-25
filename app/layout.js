import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlanProvider } from '@/context/PlanContext';

export const metadata = {
  title: 'FitLog — Workout Library',
  description: 'Pick a lift, build today’s plan, and keep your training focused.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <div className="min-h-screen bg-fit-bg text-white">
            <Navbar />
            {children}
            <Footer />
          </div>
        </PlanProvider>
      </body>
    </html>
  );
}
