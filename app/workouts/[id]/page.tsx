'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function WorkoutDetails() {
  const params = useParams();
  const id = params?.id;
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch('/workouts.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item: any) => String(item.id) === String(id));
        setWorkout(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToPlan = () => {
    if (!workout) return;
    const existingPlan = JSON.parse(localStorage.getItem('todayPlan') || '[]');
    if (existingPlan.some((item: any) => String(item.id) === String(workout.id))) {
      toast.warn("Already added to today's plan!");
      return;
    }
    if (existingPlan.length >= 5) {
      toast.error("Cap of five lifts reached for today!");
      return;
    }
    const updated = [...existingPlan, workout];
    localStorage.setItem('todayPlan', JSON.stringify(updated));
    toast.success("Added to today's plan");
  };

  const handleSaveForLater = () => {
    if (!workout) return;
    const existingSaved = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    if (existingSaved.some((item: any) => String(item.id) === String(workout.id))) {
      toast.warn("Already in saved list!");
      return;
    }
    const updated = [...existingSaved, workout];
    localStorage.setItem('savedWorkouts', JSON.stringify(updated));
    toast.success("Saved for later");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
        <Link href="/" className="inline-block bg-lime-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl">Back to Workouts</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <Link href="/" className="text-xs text-slate-400 hover:text-lime-400 font-semibold mb-8 inline-block transition">← Back to library</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center relative min-h-[400px]">
          <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.muscleGroups?.map((group: string, idx: number) => (
              <span key={idx} className="text-xs font-bold px-2.5 py-1 bg-lime-400/10 text-lime-400 rounded-md">
                {group}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4">{workout.name}</h1>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">{workout.description}</p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">EQUIPMENT</span>
              <span className="font-bold text-slate-200">{workout.equipment}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">DIFFICULTY</span>
              <span className="font-bold text-slate-200">{workout.difficulty}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">SETS & REPS</span>
              <span className="font-bold text-slate-200">{workout.sets} Sets / {workout.reps}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">DURATION</span>
              <span className="font-bold text-slate-200">{workout.duration} min</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">CALORIES</span>
              <span className="font-bold text-slate-200">{workout.caloriesBurned} kcal</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">RATING</span>
              <span className="font-bold text-slate-200">⭐ {workout.rating}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-4">Instructions</h3>
            <ol className="space-y-3">
              {workout.instructions.map((step: string, index: number) => (
                <li key={index} className="flex gap-3 text-xs text-slate-400 leading-relaxed">
                  <span className="font-bold text-lime-400">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleAddToPlan} className="bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold px-6 py-3 rounded-xl transition flex-1 text-sm shadow-md">
              Add to today's plan
            </button>
            <button onClick={handleSaveForLater} className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-3 rounded-xl transition flex-1 text-sm">
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}