'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductImage from '@/components/ProductImage';
import { useCart } from '@/lib/cart';
import { SITE, formatPrice, getItem } from '@/lib/data';
import { waLink } from '@/lib/whatsapp';

export default function MyOrdersPage() {
  const { ready, orders, addItem } = useCart();
  const router = useRouter();

  const reorder = (o) => {
    o.items.forEach(({ id, ...line }) => addItem(line));
    router.push('/cart');
  };

  return (
    <div className="min-h-[60vh] bg-soft">
      <div className="mx-auto max-w-[960px] px-4 pb-16 pt-6 md:pt-12">
        <h1 className="text-[28px] font-bold tracking-tight md:text-[44px]">My Orders</h1>
        <p className="text-sm text-muted md:text-base">Orders you placed on this device. Reorder your favourites in one tap.</p>

        {ready && orders.length === 0 && (
          <div className="mt-8 rounded-[16px] bg-white p-10 text-center">
            <p className="text-xl font-bold">No Orders Yet</p>
            <p className="mt-1 text-muted">Your orders will show up here after you place them.</p>
            <Link href="/menu" className="mt-5 inline-block rounded-xl bg-brand px-6 py-3 font-bold text-white">Browse the menu</Link>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {orders.map((o) => (
            <article key={o.id} className="rounded-[16px] border border-line bg-white p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold md:text-lg">Order #{o.id}</p>
                  <p className="text-xs text-muted">{new Date(o.date).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
                <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold capitalize text-white">{o.orderType}</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {o.items.slice(0, 3).map((l) => (
                    <div key={l.id} className="h-14 w-14 overflow-hidden rounded-lg border-[3px] border-white bg-[#FFF8E1]"><ProductImage item={getItem(l.slug) || {}} src={l.image} className="h-full w-full object-contain" /></div>
                  ))}
                </div>
                <p className="flex-1 text-sm font-medium">{o.items.map((l) => `${l.qty}× ${l.name}`).join(', ')}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-lg font-bold">{formatPrice(o.total)}</p>
                <div className="flex gap-2">
                  <a href={waLink(SITE.whatsapp, `Hi, I want to check on my order #${o.id}`)} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-4 py-2.5 text-sm font-bold">Ask about order</a>
                  <button onClick={() => reorder(o)} className="rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-white">Reorder</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
