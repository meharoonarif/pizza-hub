'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductImage from '@/components/ProductImage';
import { Breadcrumb } from '@/components/ui';
import { CheckIcon } from '@/components/Icons';
import { useCart } from '@/lib/cart';
import { CATEGORIES, EXTRAS, MENU, formatPrice, getItem } from '@/lib/data';

const SERVES = { Small: 'Serves 1', Medium: 'Serves 2', Large: 'Serves 3–4', Regular: 'Serves 1' };

export default function ProductDetail({ slug }) {
  const item = getItem(slug);
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState(item.sizes[Math.min(1, item.sizes.length - 1)].name);
  const [extras, setExtras] = useState([]);
  const [note, setNote] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const sizeObj = item.sizes.find((s) => s.name === size);
  const showExtras = false; // extras are chosen on the cart page
  const chosenExtras = []; // extras are added on the cart page
  const unit = sizeObj.price + chosenExtras.reduce((s, e) => s + e.price, 0);
  const total = unit * qty;
  const category = CATEGORIES.find((c) => c.id === item.category);
  const related = MENU.filter((m) => m.slug !== item.slug && m.category !== 'pasta').slice(0, 4);

  const toggle = (id) => setExtras((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const add = (goCart) => {
    addItem({ slug: item.slug, name: item.name, image: item.image, size, price: sizeObj.price, qty, extras: chosenExtras, note: note.trim() });
    setAdded(true);
    if (goCart) router.push('/cart');
    else setTimeout(() => setAdded(false), 1500);
  };

  const Stepper = () => (
    <div className="flex h-[56px] items-center rounded-xl border-[1.5px] border-line">
      <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-full w-12 text-2xl font-bold" aria-label="Decrease">–</button>
      <span className="w-8 text-center text-lg font-bold">{qty}</span>
      <button onClick={() => setQty(qty + 1)} className="h-full w-12 text-2xl font-bold" aria-label="Increase">+</button>
    </div>
  );
  const AddButton = ({ className = '' }) => (
    <button onClick={() => add(false)} className={`flex h-[56px] flex-1 items-center justify-between gap-3 rounded-xl px-6 font-bold text-white transition ${added ? 'bg-black' : 'bg-brand hover:bg-brand-dark'} ${className}`}>
      <span className="flex items-center gap-2">{added && <CheckIcon size={16} />}{added ? 'Added to cart' : 'Add to cart'}</span>
      <span className="font-bold text-sun">{formatPrice(total)}</span>
    </button>
  );

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-4 pb-32 pt-5 md:px-16 md:pb-16 md:pt-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Menu', href: '/menu' }, { label: category.name, href: `/menu#${category.id}` }, { label: item.name }]} />
        <div className="mt-5 grid gap-8 md:mt-8 md:grid-cols-[minmax(0,620px)_1fr] md:gap-16">
          <div className="aspect-square overflow-hidden rounded-[20px] bg-[#FFF8E1]">
            <ProductImage item={item} className="h-full w-full object-contain p-6" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {item.tag && <span className="rounded-full bg-flame px-3 py-1 text-[11px] font-bold">{item.tag.toUpperCase()}</span>}
              <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">{category.name.toUpperCase()}</span>
            </div>
            <h1 className="text-[30px] font-bold tracking-tight md:text-[48px]">{item.name}</h1>
            <p className="leading-relaxed text-muted md:text-[17px]">{item.description}</p>

            <fieldset className="flex flex-col gap-2.5">
              <legend className="mb-2.5 flex items-center gap-2 text-[17px] font-bold">Choose Size <span className="rounded-full bg-sun px-2 py-0.5 text-[11px] font-semibold">Required</span></legend>
              {item.sizes.map((s) => {
                const on = s.name === size;
                return (
                  <button key={s.name} onClick={() => setSize(s.name)} className={`flex items-center justify-between rounded-xl px-4 py-4 text-left transition ${on ? 'border-2 border-brand bg-brand-tint' : 'border border-line bg-white hover:border-black'}`}>
                    <span className="flex items-center gap-3">
                      <span className={`h-[22px] w-[22px] rounded-full bg-white ${on ? 'border-[7px] border-brand' : 'border-2 border-[#BDBDB6]'}`} />
                      <span><span className="block font-bold">{s.name}</span><span className="block text-xs text-muted">{SERVES[s.name] || ''}</span></span>
                    </span>
                    <span className={`font-bold ${on ? 'text-brand' : ''}`}>{formatPrice(s.price)}</span>
                  </button>
                );
              })}
            </fieldset>

            {showExtras && (
              <fieldset>
                <legend className="mb-1.5 flex items-center gap-2 text-[17px] font-bold">Add Extras <span className="rounded-full bg-soft px-2 py-0.5 text-[11px] font-semibold">Optional</span></legend>
                <div className="divide-y divide-line">
                  {EXTRAS.map((e) => {
                    const on = extras.includes(e.id);
                    return (
                      <label key={e.id} className="flex cursor-pointer items-center justify-between py-3">
                        <span className="flex items-center gap-3">
                          <input type="checkbox" checked={on} onChange={() => toggle(e.id)} className="h-[22px] w-[22px] accent-[#007545]" />
                          <span className="font-medium">{e.name}</span>
                        </span>
                        <span className="text-sm font-semibold text-muted">+ {formatPrice(e.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <label className="flex flex-col gap-2 font-bold">Special Instructions
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. less spicy, cut in 8 slices…" className="min-h-[80px] rounded-xl bg-soft p-4 font-normal outline-none ring-brand focus:ring-2" />
            </label>

            <div className="hidden items-center gap-3 md:flex">
              <Stepper />
              <AddButton />
            </div>
            <button onClick={() => add(true)} className="hidden text-sm font-semibold text-brand underline md:block md:w-fit">Add and go to cart →</button>
          </div>
        </div>

        <section className="mt-14 md:mt-20">
          <h2 className="mb-5 text-[22px] font-bold md:text-[28px]">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">{related.map((r) => <ProductCard key={r.slug} item={r} />)}</div>
        </section>
      </div>

      {/* Sticky add bar (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-white px-4 pb-6 pt-3 md:hidden">
        <Stepper />
        <AddButton />
      </div>
    </>
  );
}
