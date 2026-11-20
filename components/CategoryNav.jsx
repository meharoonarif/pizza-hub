'use client';

import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '@/lib/data';
import { ChevronRight } from './Icons';

// Category tabs on the home page. They stick under the floating header while you
// scroll and highlight the section you're looking at.
// Must match the header height: 132px on phones, 100px on desktop.
const HEADER = { mobile: 132, desktop: 100 };

export default function CategoryNav() {
  const [active, setActive] = useState('all');
  const [canScroll, setCanScroll] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    const els = CATEGORIES.map((c) => document.getElementById(c.id)).filter(Boolean);
    const onScroll = () => {
      const line = (window.innerWidth >= 768 ? HEADER.desktop : HEADER.mobile) + 100;
      let cur = 'all';
      els.forEach((el) => { if (el.getBoundingClientRect().top <= line) cur = el.id; });
      if (els.length && els[els.length - 1].getBoundingClientRect().bottom < line) cur = 'none';
      setActive(cur);
      const r = rowRef.current;
      if (r) setCanScroll(r.scrollWidth - r.clientWidth - r.scrollLeft > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const r = rowRef.current;
    r?.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); r?.removeEventListener('scroll', onScroll); };
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id === 'all' ? CATEGORIES[0].id : id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tab = (on) => `flex h-11 shrink-0 items-center rounded-full px-5 text-[15px] font-semibold transition md:h-12 md:px-7 md:text-base ${on ? 'bg-black text-white' : 'border border-line bg-white text-black hover:border-black'}`;

  return (
    <div data-no-gate className="sticky top-[132px] z-30 -mx-4 mt-4 bg-white/90 px-4 py-2.5 backdrop-blur md:top-[100px] md:-mx-16 md:mt-6 md:px-16 md:py-3">
      <div className="relative mx-auto max-w-[1440px]">
        <nav ref={rowRef} className="no-scrollbar flex gap-2 overflow-x-auto py-1 md:gap-3" aria-label="Menu categories">
          <a href="#menu-top" onClick={go('all')} className={tab(active === 'all')}>All</a>
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} onClick={go(c.id)} className={tab(active === c.id)} aria-current={active === c.id ? 'true' : undefined}>{c.name}</a>
          ))}
        </nav>
        {canScroll && (
          <button type="button" onClick={() => rowRef.current?.scrollBy({ left: 220, behavior: 'smooth' })} aria-label="More categories"
            className="absolute right-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white shadow-card md:h-12 md:w-12">
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
