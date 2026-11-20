'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Steps from '@/components/Steps';
import { CheckIcon, WhatsAppIcon } from '@/components/Icons';
import { useCart } from '@/lib/cart';
import { SITE, formatPrice, getItem } from '@/lib/data';
import ProductImage from '@/components/ProductImage';
import OrderSentDoodles from '@/components/OrderSentDoodles';
import { waLink } from '@/lib/whatsapp';

function OrderSent() {
  const params = useSearchParams();
  const { ready, orders } = useCart();
  const id = params.get('id');
  const order = ready ? orders.find((o) => o.id === id) || orders[0] : null;

  return (
    <div className="bg-soft">
      <div className="mx-auto max-w-[960px] px-4 pb-16 pt-6 md:pt-10">
        <Steps active={2} />
        <div className="relative isolate mt-6 flex flex-col gap-5 overflow-hidden rounded-[18px] bg-brand p-6 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <OrderSentDoodles />
          <div className="relative flex items-center gap-4 md:gap-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sun text-black md:h-20 md:w-20"><CheckIcon size={32} /></span>
            <div>
              <h1 className="text-[26px] font-bold md:text-[40px]">Order Ready to Send!</h1>
              <p className="text-sm text-white/85 md:text-[15px]">{order ? `Order #${order.id} · ` : ''}Tap send in WhatsApp so we receive it.</p>
            </div>
          </div>
          {order && (
            <a href={waLink(SITE.whatsapp, order.message)} target="_blank" rel="noreferrer" className="relative flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-black"><WhatsAppIcon />Open WhatsApp Again</a>
          )}
        </div>

        <div className="mt-5 rounded-[16px] border border-line bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-lg font-bold md:text-xl">Order Details</p>
              {order && <p className="mt-0.5 text-[13px] text-muted">#{order.id} · {new Date(order.date).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })}</p>}
            </div>
            {order && <span className="rounded-full bg-[#FFF8E1] px-3 py-1.5 text-xs font-bold capitalize">{order.orderType}</span>}
          </div>
          {order ? (() => {
            const linePrice = (l) => (l.price + (l.extras || []).reduce((n, e) => n + e.price, 0)) * l.qty;
            const subtotal = order.items.reduce((n, l) => n + linePrice(l), 0);
            const fee = Math.max(0, order.total - subtotal);
            return (
              <>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {order.items.map((l) => (
                    <li key={l.id} className="flex items-center gap-4 py-3.5">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#FFF8E1]"><ProductImage item={getItem(l.slug) || {}} src={l.image} className="h-full w-full object-contain p-1" /></div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{l.qty}× {l.name}</p>
                        <p className="text-xs text-muted md:text-[13px]">{l.size}{l.extras?.length ? ' · ' + l.extras.map((e) => e.name).join(', ') : ''}</p>
                      </div>
                      <p className="font-semibold">{formatPrice(linePrice(l))}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 ml-auto max-w-[360px] space-y-2 text-[15px]">
                  <p className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></p>
                  <p className="flex justify-between"><span className="text-muted">{order.orderType === 'pickup' ? 'Pickup' : 'Delivery fee'}</span><span className="font-semibold">{fee ? formatPrice(fee) : 'Free'}</span></p>
                  <p className="flex justify-between border-t border-line pt-2"><span className="text-[17px] font-bold">Total</span><span className="text-xl font-bold text-brand">{formatPrice(order.total)}</span></p>
                </div>
              </>
            );
          })() : (
            <p className="mt-4 text-sm text-muted">Your order details will appear here.</p>
          )}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
            <Link href="/my-orders" className="rounded-xl border border-line px-6 py-3 text-center text-sm font-bold">My Orders</Link>
            <Link href="/menu" className="rounded-xl bg-brand px-6 py-3 text-center text-sm font-bold text-white">Order More</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSentPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <OrderSent />
    </Suspense>
  );
}
