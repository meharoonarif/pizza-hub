import Link from 'next/link';
import PageHero from '@/components/PageHero';
import DealCard from '@/components/DealCard';
import { DEALS, SHOW_DEALS } from '@/lib/data';

export const metadata = { title: 'Deals', description: 'Pizza Hub deals — bundle your favourites and save. Open till 3 AM.' };

export default function DealsPage() {
  return (
    <>
      <PageHero dark crumb="Deals" eyebrow="SAVE MORE" title="Deals That Hit" highlight="Different at 2 AM" sub="Bundle your favourites and save. Add a deal to your cart and order on WhatsApp." />
      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-16 md:py-16">
        {SHOW_DEALS ? (
          <div className="grid gap-5 md:grid-cols-2 md:gap-7">{DEALS.map((d) => <DealCard key={d.id} deal={d} />)}</div>
        ) : (
          <div className="rounded-[16px] bg-soft p-10 text-center">
            <p className="text-2xl font-bold">New Deals Coming Soon</p>
            <p className="mt-2 text-muted">Follow us or check back this week.</p>
            <Link href="/menu" className="mt-5 inline-block rounded-xl bg-brand px-6 py-3 font-bold text-white">See the full menu</Link>
          </div>
        )}
      </div>
    </>
  );
}
