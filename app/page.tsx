'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('duration');

  useEffect(() => {
    fetch('/workouts.json')
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === 'duration') return a.duration - b.duration;
    if (sortBy === 'calories') return (a.caloriesBurned || 0) - (b.caloriesBurned || 0);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-bold text-lime-400 tracking-widest uppercase mb-3 block">Workout Library</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-none">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-slate-400 text-base mb-8 leading-relaxed max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <a href="#library" className="inline-block bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold px-8 py-3 rounded-xl shadow-lg shadow-lime-400/15 transition">
            BROWSE WORKOUTS ↓
          </a>
        </div>
        <div className="flex justify-center">
          <img src="/banner.png" alt="Workout Hero" className="max-h-[420px] object-contain drop-shadow-2xl" />
        </div>
      </section>

      <section id="library" className="py-12 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-1">THE LIBRARY</h2>
            <p className="text-slate-400 text-sm">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Sort By</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs px-4 py-2 rounded-xl focus:outline-none focus:border-lime-400"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <div key={workout.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition group">
              <div>
                <div className="h-48 bg-slate-900 rounded-xl mb-4 overflow-hidden border border-slate-800/60 relative">
                  <img src={workout.image} alt={workout.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {workout.muscleGroups?.map((group: string, idx: number) => (
                    <span key={idx} className="text-[10px] font-bold px-2 py-0.5 bg-lime-400/10 text-lime-400 rounded-md">
                      {group}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-base mb-1 text-slate-100">{workout.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{workout.equipment}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pt-3 border-t border-slate-800/80">
                  <span>⏱ {workout.duration} min</span>
                  <span>🔥 {workout.caloriesBurned} kcal</span>
                  <span>⭐ {workout.rating}</span>
                </div>
                <Link href={`/workouts/${workout.id}`} className="block text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 rounded-xl transition">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}