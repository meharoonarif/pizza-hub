'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/data';
import { isOpen, pakistanNow } from '@/lib/hours';
import { LineDirections, MoonIcon, PhoneIcon, PinIcon } from './Icons';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function FindUs() {
  const [now, setNow] = useState(null);
  useEffect(() => setNow({ ...pakistanNow(), open: isOpen() }), []);
  const today = now ? now.weekday : null;
  const { lat, lng } = SITE.location;
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}(${encodeURIComponent('Pizza Hub')})&z=17&output=embed`;

  return (
    <section className="bg-white py-12 md:py-24" id="find-us">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white md:text-xs">VISIT US</span>
            <h2 className="text-[30px] font-bold leading-[1.08] tracking-tight md:text-[58px]">Hot Pizza, Late<br /><span className="text-brand">Into the Night</span></h2>
          </div>
          <span className="flex w-fit items-center gap-2 rounded-full bg-soft px-4 py-2.5 text-sm font-semibold"><MoonIcon size={18} className="text-flame" />Late-Night Delivery Across Lahore</span>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[16px] border border-line md:mt-10 md:h-[560px] md:rounded-[22px]">
          <iframe title="Pizza Hub on Google Maps" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[280px] w-full md:absolute md:inset-0 md:h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="relative z-10 flex flex-col gap-4 bg-white p-5 md:absolute md:left-8 md:top-1/2 md:w-[440px] md:-translate-y-1/2 md:rounded-[18px] md:p-8 md:shadow-pop">
            <span className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${now && !now.open ? 'bg-flame/15 text-black' : 'bg-brand/10 text-brand'}`}>
              <span className={`h-2 w-2 rounded-full ${now && !now.open ? 'bg-flame' : 'bg-brand'}`} />
              {now && !now.open ? 'Closed now · opens 2 PM' : 'Open now · closes 3 AM'}
            </span>
            <div>
              <p className="text-2xl font-bold md:text-[28px]">Pizza Hub</p>
              <p className="mt-1 flex items-start gap-2 text-sm text-muted"><PinIcon size={18} className="mt-0.5 shrink-0 text-flame" />{SITE.address}</p>
            </div>
            <div className="rounded-xl bg-black p-4 md:p-5">
              <div className="flex items-center justify-between">
                <p className="text-[26px] font-bold text-sun md:text-[34px]">{SITE.hoursLabel}</p>
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold">EVERY DAY</span>
              </div>
              <div className="mt-3 flex justify-between gap-1">
                {DAYS.map((d) => (
                  <span key={d} className={`grid h-9 w-9 place-items-center rounded-full text-sm md:h-10 md:w-10 ${d === today ? 'bg-sun font-bold text-black' : 'bg-white/10 font-semibold text-white'}`}>{d[0]}</span>
                ))}
              </div>
              {today && <p className="mt-3 text-xs font-medium text-[#BDBDB6]">Today: {today} · open 2 PM to 3 AM</p>}
            </div>
            <div className="flex gap-2.5">
              <a href={SITE.directionsUrl} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-[15px] font-bold text-white"><LineDirections size={20} />Directions</a>
              <a href={`tel:${SITE.phones[0].replace(/\s/g, '')}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sun py-3.5 text-[15px] font-bold text-black"><PhoneIcon />Call Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
