'use client';

import { useState } from 'react';
import { extrasForSize, formatPrice } from '@/lib/data';
import { CheckIcon } from './Icons';

// "Add Extras" for one cart line: a toggle that opens a row of tap-on chips.
// Extras apply to every pizza in that line (e.g. qty 2 → both get extra cheese).
export default function CartExtras({ line, onChange }) {
  const options = extrasForSize(line.size); // prices for this line's size
  const chosen = (line.extras || []).map((e) => e.id);
  const [open, setOpen] = useState(false);

  const toggle = (id) => {
    const next = chosen.includes(id) ? chosen.filter((x) => x !== id) : [...chosen, id];
    onChange(options.filter((e) => next.includes(e.id)));
  };

  return (
    <div className="mt-2">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="flex items-center gap-1.5 text-xs font-semibold text-black underline decoration-line underline-offset-4 hover:decoration-black md:text-[13px]">
        <span className="grid h-4 w-4 place-items-center rounded-full bg-sun text-[11px] leading-none">{open ? '−' : '+'}</span>
        {chosen.length ? `Edit Extras (${chosen.length})` : 'Add Extras'}
      </button>
      {open && (
        <div className="mt-3 rounded-xl bg-soft p-3">
          {line.qty > 1 && <p className="mb-2 text-[11px] font-medium text-muted md:text-xs">Added to all {line.qty} pizzas in this line.</p>}
          <div className="flex flex-wrap gap-2">
            {options.map((e) => {
              const on = chosen.includes(e.id);
              return (
                <button key={e.id} type="button" onClick={() => toggle(e.id)} aria-pressed={on}
                  className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition md:text-[13px] ${on ? 'border-sun bg-[#FFF8E1]' : 'border-line bg-white hover:border-black'}`}>
                  {on ? <CheckIcon size={13} /> : <span className="leading-none">+</span>}
                  {e.name}
                  <span className="font-medium text-muted">{formatPrice(e.price)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
