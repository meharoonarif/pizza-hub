import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { Breadcrumb } from '@/components/ui';
import { BRANCHES, MENU, SHOW_BRANCHES, getItem } from '@/lib/data';

export const metadata = { title: 'About Us', description: 'Pizza Hub — born in Lahore, baked for late nights.' };

export default function AboutPage() {
  const stats = [
    [String(MENU.length), 'pizzas & pastas', 'bg-sun text-black'],
    SHOW_BRANCHES ? [String(BRANCHES.length), 'branches in Lahore', 'bg-brand text-white'] : ['Lahore', 'baked & delivered', 'bg-brand text-white'],
    ['13 hrs', 'open every day', 'bg-black text-white'],
    ['3 AM', 'last orders', 'bg-flame text-black'],
  ];
  const values = [
    ['🍕', 'Fresh Dough, Every Day', 'Made in-house each afternoon before we open at 2 PM.'],
    ['🌙', 'Real Late-Night Service', 'Our full menu until 3 AM, not a reduced night menu.'],
    ['💛', 'Fair Prices', 'Big flavour from Rs. 250, with sizes for every appetite.'],
  ];
  return (
    <>
      <section className="overflow-hidden bg-brand text-white">
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-10 md:grid-cols-2 md:gap-14 md:px-16 md:py-20">
          <div className="flex flex-col gap-4">
            <div className="opacity-75 [&_*]:!text-white"><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About us' }]} /></div>
            <span className="w-fit rounded-full bg-sun px-3 py-1 text-xs font-bold text-black">OUR STORY</span>
            <h1 className="text-[32px] font-bold leading-[1.06] tracking-tight md:text-[60px]">Born in Lahore.<br /><span className="text-sun">Baked for Late Nights.</span></h1>
            {/* TODO: replace with your real story */}
            <p className="max-w-[560px] leading-relaxed text-white/85 md:text-[17px]">Pizza Hub started with one oven on Kacha Jail Road and a simple idea: great pizza shouldn’t stop when the city goes to sleep. Today we bake hand-stretched pizzas and pastas every day from 2 PM till 3 AM.</p>
          </div>
          <div className="mx-auto aspect-square w-full max-w-[520px]"><ProductImage item={getItem('pizza-hub-special')} className="h-full w-full object-contain drop-shadow-2xl" /></div>
        </div>
      </section>
      <div className="mx-auto grid max-w-[1440px] gap-3 px-4 pt-8 md:grid-cols-4 md:gap-5 md:px-16 md:pt-16">
        {stats.map(([n, l, cls]) => (
          <div key={l} className={`rounded-[16px] p-6 ${cls}`}><p className="text-[32px] font-bold md:text-[44px]">{n}</p><p className="text-sm font-medium opacity-80">{l}</p></div>
        ))}
      </div>
      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-16 md:py-24">
        <h2 className="text-[26px] font-bold tracking-tight md:text-[44px]">What We Stand For</h2>
        <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-6">
          {values.map(([e, h, b]) => (
            <div key={h} className="flex flex-col gap-3 rounded-[16px] bg-soft p-6 md:p-7">
              <span className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-sun text-2xl">{e}</span>
              <p className="text-lg font-bold md:text-xl">{h}</p>
              <p className="text-sm text-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-sun">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-4 py-10 md:flex-row md:items-center md:px-16 md:py-14">
          <p className="text-[22px] font-bold md:text-[36px]">Hungry yet? Order in two taps.</p>
          <Link href="/menu" className="rounded-xl bg-black px-7 py-4 font-bold text-white">See the menu →</Link>
        </div>
      </section>
    </>
  );
}
