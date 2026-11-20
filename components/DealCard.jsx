'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/data';
import ProductImage from './ProductImage';

const TONES = {
  sun: ['bg-sun', 'text-black', 'bg-black text-white'],
  brand: ['bg-brand', 'text-white', 'bg-white text-black'],
  black: ['bg-black', 'text-white', 'bg-white text-black'],
  flame: ['bg-flame', 'text-black', 'bg-black text-white'],
};

export default function DealCard({ deal }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [bg, fg, btn] = TONES[deal.tone] || TONES.brand;
  const add = () => {
    addItem({ slug: 'deal-' + deal.id, name: deal.name, image: deal.images[0], size: 'Deal', price: deal.price, qty: 1, extras: [], note: deal.includes });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <article className={`flex flex-col gap-4 overflow-hidden rounded-[18px] p-5 md:p-7 ${bg} ${fg}`}>
      <span className="w-fit rounded-full bg-white/25 px-3 py-1 text-[11px] font-bold ring-1 ring-black/10">{deal.when.toUpperCase()}</span>
      <div className="flex justify-center -space-x-10 py-2">
        {deal.images.map((src) => (
          <div key={src} className="h-[130px] w-[130px] overflow-hidden rounded-full md:h-[150px] md:w-[150px]"><ProductImage item={{ category: src.includes('pasta') ? 'pasta' : 'pizza' }} src={src} className="h-full w-full object-contain" /></div>
        ))}
      </div>
      <h3 className="text-2xl font-bold md:text-[28px]">{deal.name}</h3>
      <p className="text-sm opacity-85">{deal.includes}</p>
      <div className="mt-auto flex items-center justify-between">
        <p className="flex items-baseline gap-2"><span className="text-2xl font-bold md:text-[28px]">{formatPrice(deal.price)}</span>{deal.oldPrice && <span className="text-sm line-through opacity-55">{formatPrice(deal.oldPrice)}</span>}</p>
        <button onClick={add} className={`rounded-xl px-5 py-3 text-sm font-bold ${btn}`}>{added ? 'Added ✓' : 'Add deal'}</button>
      </div>
    </article>
  );
}
