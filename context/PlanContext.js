'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const PlanContext = createContext(null);
const PLAN_KEY = 'fitlog-today-plan';
const SAVED_KEY = 'fitlog-saved';
const MAX_PLAN = 5;

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readJson(PLAN_KEY, []));
    setSaved(readJson(SAVED_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  function addToPlan(workoutOrId) {
    const id = Number(typeof workoutOrId === 'object' ? workoutOrId.id : workoutOrId);
    if (plan.some((item) => Number(item.id) === id)) {
      toast('Already in today\'s plan');
      return false;
    }
    if (plan.length >= MAX_PLAN) {
      toast.error('Today\'s plan is full (maximum 5 lifts)');
      return false;
    }
    setPlan((current) => [...current, { id, done: false }]);
    toast.success('Added to today\'s plan');
    return true;
  }

  function saveForLater(workoutOrId) {
    const id = Number(typeof workoutOrId === 'object' ? workoutOrId.id : workoutOrId);
    if (saved.includes(id)) {
      toast('Already saved for later');
      return false;
    }
    setSaved((current) => [...current, id]);
    toast.success('Saved for later');
    return true;
  }

  function removeFromPlan(id) {
    setPlan((current) => current.filter((item) => Number(item.id) !== Number(id)));
    toast.success('Removed from today\'s plan');
  }

  function removeFromSaved(id) {
    setSaved((current) => current.filter((itemId) => Number(itemId) !== Number(id)));
    toast.success('Removed from saved');
  }

  function markDone(id) {
    setPlan((current) =>
      current.map((item) =>
        Number(item.id) === Number(id) ? { ...item, done: true } : item
      )
    );
    toast.success('Workout marked as done');
  }

  const value = useMemo(
    () => ({
      plan,
      saved,
      hydrated,
      planCount: plan.length,
      savedCount: saved.length,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markDone,
      MAX_PLAN,
    }),
    [plan, saved, hydrated]
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2200,
          style: {
            background: '#171a20',
            color: '#fff',
            border: '1px solid #2a2f39',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#c2f800', secondary: '#0c0d10' } },
        }}
      />
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used inside PlanProvider');
  return context;
}
