'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState('plan');
  const [todayPlan, setTodayPlan] = useState<any[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const plan = JSON.parse(localStorage.getItem('todayPlan') || '[]');
    const saved = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    setTodayPlan(plan);
    setSavedWorkouts(saved);
    setLoading(false);
  }, []);

  const handleRemovePlan = (id: any) => {
    const updated = todayPlan.filter((item) => String(item.id) !== String(id));
    setTodayPlan(updated);
    localStorage.setItem('todayPlan', JSON.stringify(updated));
    toast.info("Removed from today's plan");
  };

  const handleRemoveSaved = (id: any) => {
    const updated = savedWorkouts.filter((item) => String(item.id) !== String(id));
    setSavedWorkouts(updated);
    localStorage.setItem('savedWorkouts', JSON.stringify(updated));
    toast.info("Removed from saved list");
  };

  const handleMarkDone = (name: string) => {
    toast.success(`Completed: ${name}! Great job!`);
  };

  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

  const currentList = activeTab === 'plan' ? todayPlan : savedWorkouts;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-1">MY PLAN</h1>
        <p className="text-slate-400 text-xs">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-semibold text-slate-500 block mb-2">Exercises</span>
          <span className="text-3xl font-black text-white">{totalExercises}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-semibold text-slate-500 block mb-2">Minutes</span>
          <span className="text-3xl font-black text-white">{totalMinutes}</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-semibold text-slate-500 block mb-2">Calories</span>
          <span className="text-3xl font-black text-lime-400">{totalCalories}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-4">
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('plan')}
            className={`text-sm font-bold pb-2 transition border-b-2 ${activeTab === 'plan' ? 'border-lime-400 text-lime-400' : 'border-transparent text-slate-400'}`}
          >
            Today's Plan ({todayPlan.length})
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`text-sm font-bold pb-2 transition border-b-2 ${activeTab === 'saved' ? 'border-lime-400 text-lime-400' : 'border-transparent text-slate-400'}`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>
      </div>

      {currentList.length === 0 ? (
        <div className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-16 text-center">
          <h3 className="font-extrabold text-lg mb-2 text-slate-300">NOTHING HERE YET</h3>
          <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="inline-block bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => (
            <div key={item.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex-shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{item.name}</h4>
                  <span className="text-[10px] text-slate-400 block mb-2">{item.equipment}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>⏱ {item.duration} min</span>
                    <span>🔥 {item.caloriesBurned} kcal</span>
                    <span>⭐ {item.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                <Link href={`/workouts/${item.id}`} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg transition">
                  View Details
                </Link>
                {activeTab === 'plan' && (
                  <button onClick={() => handleMarkDone(item.name)} className="bg-lime-400/10 text-lime-400 border border-lime-400/30 hover:bg-lime-400 hover:text-slate-950 text-xs px-3 py-1.5 rounded-lg font-semibold transition">
                    Mark as Done
                  </button>
                )}
                <button 
                  onClick={() => activeTab === 'plan' ? handleRemovePlan(item.id) : handleRemoveSaved(item.id)} 
                  className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white text-xs px-2.5 py-1.5 rounded-lg transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}