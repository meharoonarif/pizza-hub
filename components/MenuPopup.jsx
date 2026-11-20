'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CATEGORIES, MENU, formatPrice, fromPrice } from '@/lib/data';
import { ArrowRight, CloseIcon } from './Icons';
import ProductImage from './ProductImage';

// Quick menu popup, opened from the "Menu" button in the header.
export default function MenuPopup({ open, onClose }) {
  const [cat, setCat] = useState(CATEGORIES[0].id);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;
  const items = MENU.filter((m) => m.category === cat);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="menu-pop-title" onClick={onClose}>
      <div className="flex max-h-[88vh] w-full max-w-[880px] flex-col overflow-hidden rounded-t-[18px] bg-white md:rounded-[20px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex shrink-0 items-start justify-between gap-4 p-5 pb-4 md:p-8 md:pb-5">
          <div>
            <h2 id="menu-pop-title" className="text-[24px] font-bold leading-tight md:text-[32px]">Our Menu</h2>
            <p className="mt-1 text-sm text-muted md:text-[15px]">Tap any item to choose size and add to cart.</p>
          </div>
          <button onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EDEDED]" aria-label="Close menu"><CloseIcon size={20} /></button>
        </div>

        <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-5 pb-4 pt-1 md:px-8">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black ${cat === c.id ? 'bg-brand text-white' : 'bg-soft text-black hover:bg-brand-tint'}`}>
              {c.name} <span className={cat === c.id ? 'text-sun' : 'text-muted'}>{MENU.filter((m) => m.category === c.id).length}</span>
            </button>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-y-auto border-t border-line bg-soft p-4 md:grid-cols-3 md:gap-4 md:p-8">
          {items.map((m) => (
            <Link key={m.slug} href={`/menu/${m.slug}`} onClick={onClose} className="group flex flex-col rounded-xl border border-line bg-white p-3 transition hover:border-brand md:rounded-[16px] md:p-4">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#FFF8E1]">
                <ProductImage item={m} className="h-full w-full object-contain p-2 transition group-hover:scale-105" />
              </div>
              <p className="mt-3 text-[15px] font-bold leading-tight md:text-base">{m.name}</p>
              <p className="mt-1 text-xs text-muted md:text-[13px]">from <span className="font-bold text-brand">{formatPrice(fromPrice(m))}</span></p>
            </Link>
          ))}
        </div>

        <div className="shrink-0 border-t border-line p-4 md:px-8 md:py-5">
          <Link href="/menu" onClick={onClose} className="flex items-center justify-center gap-2 rounded-xl bg-brand py-4 font-semibold text-white hover:bg-brand-dark">
            See Full Menu <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
