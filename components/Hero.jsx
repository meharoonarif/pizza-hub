'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Banners exported from the Figma file (Banners section). To change one,
// export the frame at 1312×460 and replace the file in /public/images/banners.
const SLIDES = [
  { src: '/images/banners/banner-1.webp', alt: 'Peri Peri pizza at Pizza Hub', href: '/menu/peri-peri' },
  { src: '/images/banners/banner-2.webp', alt: 'Pizza Hub Special', href: '/menu/pizza-hub-special' },
  { src: '/images/banners/banner-3.webp', alt: 'BBQ pizza at Pizza Hub', href: '/menu/bbq' },
  { src: '/images/banners/banner-4.webp', alt: 'Chicken Fajita pizza at Pizza Hub', href: '/menu/chicken-fajita' },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (d) => setI((v) => (v + d + SLIDES.length) % SLIDES.length);

  return (
    <section className="mx-auto max-w-[1440px] px-4 pt-4 md:px-16 md:pt-6" aria-roledescription="carousel" aria-label="Featured">
      <div
        className="group relative overflow-hidden rounded-[12px] md:rounded-[16px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
          {SLIDES.map((s, n) => (
            <Link key={n} href={s.href} className="block w-full shrink-0" aria-hidden={n !== i} tabIndex={n === i ? 0 : -1}>
              <img src={s.src} alt={s.alt} width={1312} height={460} className="block aspect-[1312/460] w-full object-cover" loading={n === 0 ? 'eager' : 'lazy'} />
            </Link>
          ))}
        </div>

        <button aria-label="Previous banner" onClick={() => go(-1)} className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black opacity-0 shadow-lg transition group-hover:opacity-100 md:grid">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button aria-label="Next banner" onClick={() => go(1)} className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black opacity-0 shadow-lg transition group-hover:opacity-100 md:grid">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>

        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5 md:bottom-5">
          {SLIDES.map((_, n) => (
            <button key={n} aria-label={`Banner ${n + 1}`} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all md:h-2 ${n === i ? 'w-6 bg-sun md:w-7' : 'w-1.5 bg-white/60 md:w-2'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
