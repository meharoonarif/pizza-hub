'use client';

import { useEffect, useState } from 'react';
import { formatCountdown, isOpen, secondsUntilOpen } from '@/lib/hours';
import { SITE } from '@/lib/data';
import { MoonIcon } from './Icons';

// Thin bar at the top: "Open now" or "Closed · opens in hh:mm:ss"
export default function StatusBar() {
  const [state, setState] = useState(null);
  useEffect(() => {
    const tick = () => setState({ open: isOpen(), wait: secondsUntilOpen() });
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (!state) return <div className="h-9 bg-black" />;
  return (
    <div className={`flex h-9 items-center justify-center gap-2 px-4 text-center text-xs font-semibold md:text-[13px] ${state.open ? 'bg-black text-white' : 'bg-flame text-black'}`}>
      <MoonIcon size={14} className={state.open ? 'text-sun' : 'text-black'} />
      {state.open ? (
        <span>We’re open · Late-night delivery across Lahore till 3 AM</span>
      ) : (
        <span>We’re closed right now · opens at 2 PM (in {formatCountdown(state.wait)}) · you can still schedule an order</span>
      )}
    </div>
  );
}

export function useOpenStatus() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(isOpen());
    const id = setInterval(() => setOpen(isOpen()), 30000);
    return () => clearInterval(id);
  }, []);
  return open;
}

export const HOURS = SITE.hoursLabel;
