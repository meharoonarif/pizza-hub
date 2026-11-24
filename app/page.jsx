import Link from 'next/link';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import FindUs from '@/components/FindUs';
import BranchesSection from '@/components/BranchesSection';
import { SHOW_BRANCHES } from '@/lib/data';
import FeedbackForm from '@/components/FeedbackForm';
import { CATEGORIES, MENU } from '@/lib/data';
import { ArrowRight } from '@/components/Icons';
import CategoryNav from '@/components/CategoryNav';

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        <CategoryNav />

        <div className="flex flex-col gap-12 py-10 md:gap-16 md:py-14">
          {CATEGORIES.map((c) => {
            const items = MENU.filter((m) => m.category === c.id);
            return (
              <section key={c.id} id={c.id} className="scroll-mt-[200px] md:scroll-mt-[180px]">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h2 className="flex min-w-0 items-center gap-2 text-[20px] font-bold leading-tight min-[380px]:text-[22px] md:gap-3 md:text-[30px]">
                    <span className="truncate">{c.name}</span>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                  </h2>
                  <Link href={`/menu#${c.id}`} className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-brand">View All <ArrowRight size={14} /></Link>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                  {items.map((item) => <ProductCard key={item.slug} item={item} />)}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <FindUs />
      {SHOW_BRANCHES && <BranchesSection />}
      <FeedbackForm />
    </>
  );
}
