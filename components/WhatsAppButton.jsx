'use client';

import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { SITE } from '@/lib/data';
import { waLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './Icons';

// Round WhatsApp button fixed to the bottom-right corner on every page.
// On phones it moves up when a bottom bar is showing (cart bar, checkout / pizza page buttons).
// On larger screens those bars don't reach the corner, so it stays put.
export default function WhatsAppButton() {
  const { count, ready } = useCart();
  const pathname = usePathname();

  const pageBar = pathname === '/checkout' || pathname.startsWith('/menu/');
  const cartBar = ready && count > 0 && !['/cart', '/checkout', '/order-sent'].includes(pathname) && !pathname.startsWith('/menu/');
  const position = pageBar ? 'bottom-[112px] lg:bottom-6' : cartBar ? 'bottom-[88px] md:bottom-6' : 'bottom-5 md:bottom-6';

  return (
    <a
      href={waLink(SITE.whatsapp, 'Hi Pizza Hub! I have a question.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Pizza Hub on WhatsApp"
      className={`group fixed right-4 z-40 flex items-center gap-2 rounded-full bg-gradient-to-br from-[#5FFC7B] via-[#25D366] to-[#0E8F5B] p-3 text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] ring-4 ring-white/80 transition-all hover:brightness-105 hover:shadow-[0_12px_34px_rgba(37,211,102,0.6)] md:right-6 md:p-3.5 ${position}`}
    >
      <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"><WhatsAppIcon size={30} color="#fff" inner="#1FB85C" /></span>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-semibold transition-all duration-300 group-hover:max-w-[140px] group-hover:pr-2 md:inline">Chat with Us</span>
      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-sun" aria-hidden="true" />
    </a>
  );
}
