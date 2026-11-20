'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Breadcrumb } from '@/components/ui';
import { SearchIcon } from '@/components/Icons';
import { CATEGORIES, MENU, SITE, fromPrice } from '@/lib/data';

const PRICE = [
  { id: 'all', label: 'All prices', test: () => true },
  { id: 'u500', label: 'Under Rs. 500', test: (p) => p < 500 },
  { id: '500-1000', label: 'Rs. 500 – 1,000', test: (p) => p >= 500 && p <= 1000 },
  { id: 'a1000', label: 'Above Rs. 1,000', test: (p) => p > 1000 },
];

export default function MenuBrowser() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [cat, setCat] = useState('all');
  const [price, setPrice] = useState('all');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const pf = PRICE.find((p) => p.id === price);
    return MENU.filter((m) => (cat === 'all' || m.category === cat) && (!term || (m.name + ' ' + m.description).toLowerCase().includes(term)) && pf.test(fromPrice(m)));
  }, [q, cat, price]);

  const groups = CATEGORIES.map((c) => ({ ...c, items: filtered.filter((m) => m.category === c.id) })).filter((g) => g.items.length);

  return (
    <>
      <div className="bg-soft">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 md:flex-row md:items-end md:justify-between md:px-16 md:py-12">
          <div className="flex flex-col gap-2">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Menu' }]} />
            <h1 className="text-[30px] font-bold tracking-tight md:text-[52px]">Our Menu</h1>
            <p className="text-sm text-muted md:text-base">{MENU.length} hand-stretched pizzas & pastas, baked fresh from {SITE.hoursLabel}.</p>
          </div>
          <label className="flex h-[52px] w-full items-center gap-2.5 rounded-xl border border-line bg-white px-4 md:w-[420px]">
            <SearchIcon className="text-brand" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pizzas, pasta…" className="w-full bg-transparent outline-none" aria-label="Search menu" />
          </label>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] gap-10 px-4 pb-28 pt-6 md:px-16 md:pt-10">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-[260px] shrink-0 lg:block">
          <div className="sticky top-32 flex flex-col gap-1.5 rounded-[16px] border border-line bg-white p-3">
            <p className="px-3 pb-1 pt-2 text-[11px] font-bold text-muted">CATEGORIES</p>
            {[{ id: 'all', name: 'All items' }, ...CATEGORIES].map((c) => {
              const n = c.id === 'all' ? MENU.length : MENU.filter((m) => m.category === c.id).length;
              const on = cat === c.id;
              return (
                <button key={c.id} onClick={() => setCat(c.id)} className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-left text-[15px] ${on ? 'bg-brand font-semibold text-white' : 'font-medium hover:bg-soft'}`}>
                  {c.name}<span className={`rounded-full px-2 text-xs font-bold text-black ${on ? 'bg-sun' : 'bg-soft'}`}>{n}</span>
                </button>
              );
            })}
            <div className="mt-2 rounded-xl bg-sun p-4"><p className="font-bold">Open Till 3 AM</p><p className="text-[13px] font-medium">Order on WhatsApp<br />{SITE.whatsappDisplay}</p></div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Category chips (mobile) */}
          <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 lg:hidden">
            {[{ id: 'all', name: 'All' }, ...CATEGORIES].map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`shrink-0 rounded-full px-4 py-2.5 text-[13px] ${cat === c.id ? 'bg-brand font-semibold text-white' : 'border border-line bg-soft font-medium'}`}>{c.name}</button>
            ))}
          </div>
          <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            {PRICE.map((p) => (
              <button key={p.id} onClick={() => setPrice(p.id)} className={`shrink-0 rounded-full px-4 py-2 text-[13px] ${price === p.id ? 'bg-black font-semibold text-white' : 'border border-line bg-white font-medium'}`}>{p.label}</button>
            ))}
          </div>

          {groups.length === 0 && (
            <div className="rounded-[16px] bg-soft p-10 text-center">
              <p className="text-xl font-bold">No Pizzas Match “{q}”</p>
              <p className="mt-1 text-muted">Try another name or clear the filters.</p>
              <button onClick={() => { setQ(''); setCat('all'); setPrice('all'); }} className="mt-5 rounded-xl bg-brand px-6 py-3 font-bold text-white">Clear filters</button>
            </div>
          )}

          <div className="flex flex-col gap-12">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-32">
                <h2 className="mb-5 flex items-center gap-3 text-[22px] font-bold md:text-[28px]">{g.name}<span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">{g.items.length} items</span></h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
                  {g.items.map((item) => <ProductCard key={item.slug} item={item} />)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
