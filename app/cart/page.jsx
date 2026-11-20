'use client';

import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import Steps from '@/components/Steps';
import CartExtras from '@/components/CartExtras';
import { ArrowRight, ClockIcon } from '@/components/Icons';
import { useCart } from '@/lib/cart';
import { EXTRAS, MENU, SITE, formatPrice, getItem } from '@/lib/data';

const UPSELL = ['chicken-fajita', 'grilled-pasta', 'peri-peri'];

export default function CartPage() {
  const { ready, items, prefs, setOrderType, setQty, setLineExtras, removeItem, unitPrice, count, subtotal, deliveryFee, total, addItem } = useCart();

  if (!ready) return <div className="min-h-[60vh]" />;

  if (count === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-soft px-6 py-16 text-center">
        <svg width="220" height="180" viewBox="0 0 240 200" aria-hidden="true"><ellipse cx="120" cy="182" rx="90" ry="10" fill="#000" opacity="0.08" /><path d="M30 80h180v90a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8z" fill="#E8C48C" /><path d="M30 80 50 40h140l20 40z" fill="#F3D9A8" /><rect x="88" y="104" width="64" height="40" rx="8" fill="#007545" /><text x="120" y="130" textAnchor="middle" fontWeight="700" fontSize="14" fill="#FFCC00">PIZZA</text><circle cx="196" cy="40" r="22" fill="#FFCC00" /><text x="196" y="47" textAnchor="middle" fontWeight="700" fontSize="20">0</text></svg>
        <h1 className="text-[28px] font-bold tracking-tight md:text-[44px]">Your Cart Is Empty</h1>
        <p className="max-w-[460px] text-muted">Looks like you haven’t added any pizza yet. Let’s fix that.</p>
        <div className="flex flex-col gap-3 md:flex-row">
          <Link href="/menu" className="rounded-xl bg-brand px-7 py-4 font-bold text-white">Browse the menu</Link>
        </div>
      </div>
    );
  }

  const quickAdd = (slug) => {
    const m = getItem(slug);
    addItem({ slug: m.slug, name: m.name, image: m.image, size: m.sizes[0].name, price: m.sizes[0].price, qty: 1, extras: [] });
  };

  return (
    <div className="bg-soft">
      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 md:px-16 md:pt-10">
        <Steps active={0} />
        <h1 className="mt-4 text-[28px] font-bold tracking-tight md:text-[44px]">Your Cart</h1>
        <p className="text-sm text-muted md:text-base">{count} {count === 1 ? 'item' : 'items'}</p>

        <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-[1fr_420px] lg:gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex w-fit gap-1.5 rounded-xl border border-line bg-white p-1.5">
              {['delivery', 'pickup'].map((t) => (
                <button key={t} onClick={() => setOrderType(t)} className={`rounded-lg px-7 py-3 text-[15px] font-bold capitalize ${(prefs.orderType || 'delivery') === t ? 'bg-black text-white' : ''}`}>{t}</button>
              ))}
            </div>

            <div className="divide-y divide-line rounded-[16px] border border-line bg-white px-4 md:px-7">
              {items.map((l) => (
                <div key={l.id} className="py-4">
                <div className="flex items-center gap-3 md:gap-5">
                  <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-[#FFF8E1] md:h-24 md:w-24">
                    <ProductImage item={getItem(l.slug) || { category: 'pizza' }} src={l.image} className="h-full w-full object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold md:text-lg">{l.name}</p>
                    <p className="text-xs text-muted md:text-sm">{l.size}{l.extras?.length ? ' · ' + l.extras.map((e) => e.name).join(', ') : ''}</p>
                    {l.note && <p className="truncate text-xs italic text-muted">“{l.note}”</p>}
                    <button onClick={() => removeItem(l.id)} className="mt-1 text-xs font-semibold text-[#C0392B]">Remove</button>
                    <p className="font-bold md:hidden">{formatPrice(unitPrice(l) * l.qty)}</p>
                  </div>
                  <p className="hidden w-28 text-right text-lg font-bold md:block">{formatPrice(unitPrice(l) * l.qty)}</p>
                  <div className="flex items-center rounded-lg bg-soft">
                    <button onClick={() => setQty(l.id, l.qty - 1)} className="h-9 w-9 text-lg font-bold" aria-label="Decrease">–</button>
                    <span className="w-6 text-center font-bold">{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} className="h-9 w-9 rounded-lg bg-brand text-lg font-bold text-white" aria-label="Increase">+</button>
                  </div>
                </div>
                {getItem(l.slug)?.category !== 'pasta' && EXTRAS.length > 0 && (
                  <div className="pl-[84px] md:pl-[116px]"><CartExtras line={l} onChange={(ex) => setLineExtras(l.id, ex)} /></div>
                )}
                </div>
              ))}
            </div>

            <div className="rounded-[16px] border border-line bg-white p-5 md:p-6">
              <p className="text-lg font-bold">Make It a Feast 🍕</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {UPSELL.map((slug) => {
                  const m = getItem(slug);
                  return (
                    <div key={slug} className="flex items-center gap-3 rounded-xl bg-soft p-3">
                      <div className="h-[52px] w-[52px] shrink-0 overflow-hidden rounded-lg bg-[#FFF8E1]"><ProductImage item={m} className="h-full w-full object-contain" /></div>
                      <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{m.name}</p><p className="text-xs font-semibold text-brand">From {formatPrice(m.sizes[0].price)}</p></div>
                      <button onClick={() => quickAdd(slug)} className="grid h-8 w-8 place-items-center rounded-full bg-brand font-bold text-white" aria-label={`Add ${m.name}`}>+</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-[16px] border border-line bg-white p-5 md:p-7 lg:sticky lg:top-32">
            <p className="text-xl font-bold">Order Summary</p>
            <div className="mt-5 space-y-3 text-[15px]">
              <div className="flex justify-between"><span className="text-muted">Subtotal ({count} items)</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted">{(prefs.orderType || 'delivery') === 'pickup' ? 'Pickup' : 'Delivery fee'}</span><span className="font-semibold">{deliveryFee ? formatPrice(deliveryFee) : 'Free'}</span></div>
              <div className="flex justify-between border-t border-line pt-3"><span className="text-[17px] font-bold">Total</span><span className="text-xl font-bold text-brand">{formatPrice(total)}</span></div>
            </div>
            <p className="mt-4 flex items-center gap-2 rounded-lg bg-sun/25 px-3 py-2.5 text-[13px] font-semibold"><ClockIcon size={18} />Estimated {(prefs.orderType || 'delivery') === 'pickup' ? 'ready in 20–25 min' : `delivery: ${SITE.etaLabel}`}</p>
            <Link href="/checkout" className="mt-5 flex items-center justify-between rounded-xl bg-brand px-6 py-4 font-bold text-white hover:bg-brand-dark">Go to checkout<span className="flex items-center gap-2 text-sun">{formatPrice(total)} <ArrowRight size={16} /></span></Link>
            <Link href="/menu" className="mt-3 block text-center text-sm font-semibold text-brand">+ Add more items</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
