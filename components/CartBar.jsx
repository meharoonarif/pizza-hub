'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/data';
import { ArrowRight } from './Icons';

// Floating "View cart" bar shown while browsing.
export default function CartBar() {
  const { count, subtotal, ready } = useCart();
  const pathname = usePathname();
  if (!ready || count === 0 || ['/cart', '/checkout', '/order-sent'].includes(pathname) || pathname.startsWith('/menu/')) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 md:bottom-6">
      <Link href="/cart" className="pointer-events-auto flex w-full max-w-[520px] items-center justify-between gap-3 rounded-xl bg-black py-2 pl-4 pr-2 text-white shadow-pop md:rounded-full md:pl-6">
        <span className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-sun text-sm font-bold text-black">{count}</span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{count} {count === 1 ? 'item' : 'items'} in cart</span>
            <span className="block text-xs font-medium text-sun">{formatPrice(subtotal)}</span>
          </span>
        </span>
        <span className="flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold">View Cart <ArrowRight size={16} /></span>
      </Link>
    </div>
  );
}
