'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCart } from '@/lib/cart';
import { SITE } from '@/lib/data';
import { BagIcon, BikeIcon, CartIcon, ChevronDown, PizzaMenuIcon, SearchIcon } from './Icons';
import MenuPopup from './MenuPopup';

// Floating header card.
// Heights (used by the sticky category bar below it): 132px on phones, 100px on desktop.
export default function Header() {
  const { count, ready, prefs } = useCart();
  const [q, setQ] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef(null);

  const isMenu = pathname.startsWith('/menu');
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const pickup = prefs.orderType === 'pickup';

  // ⌘K / Ctrl+K focuses search
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    router.push(q.trim() ? `/menu?q=${encodeURIComponent(q.trim())}` : '/menu');
  };

  const chooseType = () => window.dispatchEvent(new Event('ph:choose-order-type'));

  const searchBox = (cls, withKbd) => (
    <form onSubmit={submit} role="search" className={`items-center gap-3 rounded-full bg-soft pl-5 pr-3 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-brand ${cls}`}>
      <SearchIcon size={20} className="shrink-0 text-muted" />
      <input ref={withKbd ? searchRef : undefined} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pizzas, pasta, flavours…" className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#8E8E88] md:text-base" aria-label="Search menu" />
      {withKbd && (
        <span className="hidden shrink-0 items-center gap-1 lg:flex" aria-hidden="true">
          <kbd className="grid h-7 min-w-7 place-items-center rounded-md border border-line bg-white px-1.5 text-[11px] font-semibold text-muted">{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd className="grid h-7 w-7 place-items-center rounded-md border border-line bg-white text-[11px] font-semibold text-muted">K</kbd>
        </span>
      )}
    </form>
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 px-3 pb-2 pt-2 backdrop-blur md:px-6 md:pb-3 md:pt-3">
        <div className="mx-auto flex h-[60px] max-w-[1440px] items-center gap-2 rounded-[22px] min-[380px]:gap-2.5 border border-line/70 bg-white px-3 shadow-[0_8px_30px_rgba(0,0,0,0.07)] md:h-[76px] md:gap-5 md:rounded-[28px] md:px-5">
          <Link href="/" className="min-w-0 shrink" aria-label="Pizza Hub home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Pizza Hub" className="h-8 w-auto max-w-full object-contain object-left min-[380px]:h-9 md:h-12" />
          </Link>

          <span className="hidden h-10 w-px bg-line md:block" aria-hidden="true" />

          {/* Delivery / pickup chip */}
          <button type="button" data-no-gate onClick={chooseType} className="group flex shrink-0 items-center gap-2.5 rounded-full text-left md:gap-3" aria-label={`Order type: ${pickup ? 'Pickup' : 'Delivery'}. Change`}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sun text-black min-[380px]:h-10 min-[380px]:w-10 md:h-12 md:w-12">{pickup ? <BagIcon size={22} /> : <BikeIcon size={22} />}</span>
            <span className="hidden leading-tight xl:block">
              <span className="block text-[13px] text-muted">{pickup ? 'Pickup · 20–25 min' : `Delivery · ${SITE.etaLabel}`}</span>
              <span className="flex items-center gap-1 text-[16px] font-bold group-hover:text-brand">{pickup ? 'Pickup from Shop' : 'Deliver to Me'}<ChevronDown size={16} /></span>
            </span>
          </button>

          {searchBox('hidden h-[52px] flex-1 md:flex md:ml-1', true)}

          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0 md:gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-label="Open menu"
              className={`flex h-10 items-center gap-2 rounded-full border-2 border-black px-2.5 min-[380px]:px-3.5 text-sm font-semibold transition md:h-[52px] md:px-5 md:text-[15px] ${menuOpen || isMenu ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-black hover:text-white'}`}
            >
              <PizzaMenuIcon size={20} />
              <span className="hidden min-[380px]:inline">Menu</span>
            </button>
            <Link href="/cart" className="flex h-10 items-center gap-2 rounded-full bg-sun pl-3.5 pr-1.5 font-bold text-black md:h-[52px] md:pl-5 md:pr-2" aria-label={`Cart, ${count} items`}>
              <CartIcon size={20} />
              <span className="hidden text-[15px] md:inline">Cart</span>
              <span className="grid h-7 min-w-7 place-items-center rounded-full bg-black px-1.5 text-xs text-white md:h-9 md:min-w-9 md:text-sm">{ready ? count : 0}</span>
            </Link>
          </div>
        </div>

        {/* Phones: search under the card */}
        <div className="mx-auto mt-2 max-w-[1440px] md:hidden">{searchBox('flex h-12 w-full', false)}</div>
      </header>
      {/* Outside the header: its backdrop-blur would trap a fixed popup */}
      <MenuPopup open={menuOpen} onClose={closeMenu} />
    </>
  );
}
