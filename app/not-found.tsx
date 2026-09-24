import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-black text-lime-400 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-xs text-slate-400 mb-6 max-w-xs">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="inline-block bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition">
        Back to Home
      </Link>
    </div>
  );
}