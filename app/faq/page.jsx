import { Breadcrumb } from '@/components/ui';
import { FAQ, SITE } from '@/lib/data';

export const metadata = { title: 'FAQ', description: 'Answers about Pizza Hub opening hours, delivery, payment and WhatsApp ordering.' };

export default function FaqPage() {
  return (
    <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-8 md:grid-cols-[400px_1fr] md:gap-16 md:px-16 md:py-20">
      <div className="flex flex-col gap-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
        <span className="w-fit rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">HELP CENTRE</span>
        <h1 className="text-[32px] font-bold leading-[1.08] tracking-tight md:text-[46px]">Questions?<br /><span className="text-brand">We’ve Got Answers.</span></h1>
        <div className="mt-2 flex flex-col gap-3 rounded-[16px] bg-black p-6 text-white">
          <p className="text-xl font-bold">Still Need Help?</p>
          <p className="text-sm text-white/80">Our team replies on WhatsApp within minutes, {SITE.hoursLabel}.</p>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="w-fit rounded-xl bg-brand px-5 py-3 text-sm font-bold">Chat on WhatsApp</a>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {FAQ.map(([q, a], i) => (
          <details key={q} open={i === 0} className="group rounded-[14px] border border-line bg-white px-5 py-4 open:border-2 open:border-brand open:bg-brand-tint md:px-6 md:py-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold md:text-[17px]">
              {q}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft text-lg group-open:bg-brand group-open:text-white"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">–</span></span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
