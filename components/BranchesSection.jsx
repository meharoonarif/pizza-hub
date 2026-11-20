import { BRANCHES } from '@/lib/data';
import { ArrowUpRight, ClockIcon, PhoneIcon, PinIcon } from './Icons';

export default function BranchesSection() {
  return (
    <section className="relative overflow-hidden bg-brand py-12 md:py-24" id="branches">
      <div aria-hidden="true" className="absolute -right-40 -top-56 h-[520px] w-[520px] rounded-full border-[60px] border-white/[0.08]" />
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-sun px-3 py-1 text-[11px] font-bold text-black md:text-xs">ONLY FOR LAHORE CUSTOMERS</span>
            <h2 className="text-[30px] font-bold leading-[1.08] tracking-tight text-white md:text-[58px]">Find Your Nearest<br /><span className="text-sun">Pizza Hub in Lahore</span></h2>
            <p className="max-w-[560px] text-sm leading-relaxed text-white/85 md:text-[17px]">Delivery or pickup from the branch closest to you. Late-night cravings sorted, every day.</p>
          </div>
          <div className="grid h-[120px] w-[120px] -rotate-[10deg] place-items-center rounded-full border-[3px] border-black bg-flame text-center md:h-[168px] md:w-[168px]">
            <div className="leading-none"><p className="text-xs font-bold md:text-[15px]">OPEN TILL</p><p className="text-[32px] font-bold md:text-[44px]">3 AM</p><p className="text-[10px] font-semibold md:text-xs">EVERY DAY</p></div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-7">
          {BRANCHES.map((b, i) => (
            <article key={b.id} className="relative overflow-hidden rounded-[18px] bg-white">
              <div className="flex items-center gap-4 p-6 pb-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-sun text-2xl font-bold">0{i + 1}</span>
                <div className="flex-1"><h3 className="text-xl font-bold md:text-2xl">{b.name}</h3><p className="text-sm text-muted">{b.area}</p></div>
                {b.main && <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">MAIN</span>}
              </div>
              <div className="relative mx-6 border-t-2 border-dashed border-line">
                <span className="absolute -left-[38px] -top-[15px] h-7 w-7 rounded-full bg-brand" />
                <span className="absolute -right-[38px] -top-[15px] h-7 w-7 rounded-full bg-brand" />
              </div>
              <div className="flex flex-col gap-3.5 p-6 pt-5">
                <p className="flex items-start gap-3 text-[15px] font-medium"><PinIcon className="mt-0.5 shrink-0 text-flame" />{b.address}</p>
                <p className="flex items-center gap-3 text-[15px] font-medium"><ClockIcon className="text-brand" />{b.hours}</p>
                <div className="mt-1 flex gap-2.5">
                  <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sun py-3.5 font-bold"><PhoneIcon />{b.phone}</a>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`} target="_blank" rel="noreferrer" aria-label={`Directions to ${b.name}`} className="grid w-14 place-items-center rounded-xl bg-black text-white"><ArrowUpRight /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
