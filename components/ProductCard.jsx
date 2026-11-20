'use client';

import { useCallback, useState } from 'react';
import { formatPrice, fromPrice } from '@/lib/data';
import ProductImage from './ProductImage';
import SizePicker from './SizePicker';

export default function ProductCard({ item, compact = false }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="group flex cursor-pointer flex-col gap-3 rounded-[16px] border border-line bg-white p-3 shadow-card transition hover:-translate-y-0.5 hover:border-brand md:gap-4">
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#FFF8E1]" aria-label={`Order ${item.name}`}>
        <ProductImage item={item} className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105" />
        {item.tag && <span className="absolute left-2.5 top-2.5 rounded-full bg-flame px-2.5 py-1 text-[10px] font-bold text-black md:text-[11px]">{item.tag.toUpperCase()}</span>}
      </button>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="flex flex-1 flex-col gap-1 px-1 text-left">
        <h3 className={`font-bold leading-tight ${compact ? 'text-[15px]' : 'text-[17px]'}`}>{item.name}</h3>
        <p className="text-[11px] text-muted md:text-xs">{item.sizes.map((s) => `${s.name} ${s.price}`).join('  ·  ')}</p>
      </button>
      <div className="flex items-center justify-between px-1 pb-1">
        <p className={`font-bold ${compact ? 'text-[14px]' : 'text-[17px]'}`}><span className="text-xs font-medium text-muted">From </span>{formatPrice(fromPrice(item))}</p>
        <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={`Choose a size for ${item.name}`} className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-dark md:h-10 md:w-10">
          <span className="text-xl font-medium leading-none">+</span>
        </button>
      </div>
      <SizePicker item={item} open={open} onClose={close} />
    </div>
  );
}
