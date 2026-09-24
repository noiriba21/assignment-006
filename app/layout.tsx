import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export const metadata = {
  title: 'FitLog — Workout Library',
  description: 'Train with intent. Log every set.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-lime-400 selection:text-slate-950">
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        
        <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-black text-xl tracking-wider text-white">
            <img src="/logo.png" alt="FitLog" className="w-8 h-8 object-contain" />
            FITLOG
          </Link>
          <div className="flex items-center gap-8 text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-lime-400 transition">Workouts</Link>
            <Link href="/my-plan" className="hover:text-lime-400 transition">My Plan</Link>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <Link href="/my-plan" className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-slate-200 hover:border-lime-400 transition">
              Plan <span className="bg-lime-400 text-slate-950 px-2 py-0.5 rounded-full" id="nav-plan-count">0</span>
            </Link>
            <Link href="/my-plan" className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-slate-200 hover:border-lime-400 transition">
              Saved <span className="border border-slate-500 px-2 py-0.5 rounded-full" id="nav-saved-count">0</span>
            </Link>
          </div>
        </nav>

        <main className="flex-grow">{children}</main>

        <footer className="border-t border-slate-900 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <img src="/logo.png" alt="" className="w-5 h-5 object-contain" /> FITLOG
          </div>
          <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
        </footer>
      </body>
    </html>
  );
}