'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '@/lib/scrollLock';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/data';
import { CheckIcon, CloseIcon } from './Icons';
import ProductImage from './ProductImage';

// Popup opened from the "+" on a product tile: set a quantity for each size, then add them all.
export default function SizePicker({ item, open, onClose }) {
  const { addItem } = useCart();
  const [qtys, setQtys] = useState({});
  const [added, setAdded] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    setQtys(item.sizes.length === 1 ? { [item.sizes[0].name]: 1 } : {});
    setAdded(false);
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, item, onClose]);

  if (!open || typeof document === 'undefined') return null;
  const step = (name, d) => setQtys((q) => ({ ...q, [name]: Math.max(0, (q[name] || 0) + d) }));
  const lines = item.sizes.filter((sz) => (qtys[sz.name] || 0) > 0);
  const count = lines.reduce((n, sz) => n + qtys[sz.name], 0);
  const total = lines.reduce((n, sz) => n + sz.price * qtys[sz.name], 0);

  const add = () => {
    if (!count) return;
    lines.forEach((sz) => addItem({ slug: item.slug, name: item.name, image: item.image, size: sz.name, price: sz.price, qty: qtys[sz.name], extras: [] }));
    setAdded(true);
    setTimeout(onClose, 900);
  };

  // Rendered into <body> so the tile's hover lift can't trap the fixed popup
  return createPortal(
    <div className="fixed inset-0 z-[75] flex items-end justify-center bg-black/50 md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby={`sp-${item.slug}`} onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto overscroll-contain rounded-t-[18px] bg-white p-5 md:rounded-[20px] md:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#FFF8E1]"><ProductImage item={item} className="h-full w-full object-contain p-1" /></div>
          <div className="min-w-0 flex-1">
            <h2 id={`sp-${item.slug}`} className="text-xl font-bold leading-tight">{item.name}</h2>
            <p className="mt-1 line-clamp-2 text-[13px] text-muted">{item.description}</p>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EDEDED]" aria-label="Close"><CloseIcon size={18} /></button>
        </div>

        <p className="mt-6 text-[15px] font-bold">Choose Sizes</p>
        <p className="text-[13px] text-muted">Add as many of each size as you like.</p>
        <div className="mt-3 flex flex-col gap-2.5">
          {item.sizes.map((sz) => {
            const n = qtys[sz.name] || 0;
            return (
              <div key={sz.name} className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 transition ${n ? 'border-sun bg-[#FFF8E1]' : 'border-line bg-white'}`}>
                <div>
                  <p className="text-[15px] font-semibold">{sz.name}</p>
                  <p className="text-[13px] font-medium text-muted">{formatPrice(sz.price)}</p>
                </div>
                {n === 0 ? (
                  <button type="button" onClick={() => step(sz.name, 1)} className="h-10 rounded-full border-2 border-black px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white" aria-label={`Add ${sz.name}`}>Add</button>
                ) : (
                  <div className="flex h-10 items-center rounded-full bg-black text-white">
                    <button type="button" onClick={() => step(sz.name, -1)} className="h-full w-10 text-xl font-medium" aria-label={`One less ${sz.name}`}>−</button>
                    <span className="w-6 text-center font-bold" aria-live="polite">{n}</span>
                    <button type="button" onClick={() => step(sz.name, 1)} className="h-full w-10 text-xl font-medium" aria-label={`One more ${sz.name}`}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={add} disabled={!count || added}
          className={`mt-6 flex h-14 w-full items-center justify-between rounded-full px-6 font-semibold transition ${added ? 'bg-black text-white' : count ? 'bg-brand text-white hover:bg-brand-dark' : 'cursor-not-allowed bg-[#E4E6E0] text-muted'}`}>
          {added ? <span className="flex w-full items-center justify-center gap-2"><CheckIcon size={18} />Added to Cart</span>
            : count ? (<><span>Add {count} to Cart</span><span className="text-sun">{formatPrice(total)}</span></>)
            : <span className="w-full text-center">Choose at Least One Size</span>}
        </button>
        <Link href={`/menu/${item.slug}`} onClick={onClose} className="mt-4 block text-center text-[13px] font-semibold text-brand">See Full Details</Link>
      </div>
    </div>,
    document.body,
  );
}
