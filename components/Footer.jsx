import Link from 'next/link';
import CtaDoodles from './CtaDoodles';
import { SHOW_BRANCHES, SITE } from '@/lib/data';
import { ArrowRight, LineClock, LineFacebook, LineInstagram, LineMail, LinePhone, LinePin, LineTikTok, LineWhatsApp, MoonIcon, WhatsAppIcon } from './Icons';

const Col = ({ title, links }) => (
  <div className="flex flex-col gap-3">
    <p className="text-[13px] font-bold text-sun">{title}</p>
    {links.map(([label, href]) => (
      <Link key={label} href={href} className="text-[15px] font-medium text-white/85 hover:text-white">{label}</Link>
    ))}
  </div>
);

const Contact = ({ icon, label, children }) => (
  <div className="flex items-start gap-3">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 text-sun">{icon}</span>
    <div>
      <p className="text-xs font-medium text-white/60">{label}</p>
      <div className="text-[15px] font-medium leading-relaxed text-white">{children}</div>
    </div>
  </div>
);

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-brand text-white">
      <div className="mx-auto max-w-[1440px] px-4 pt-7 md:px-16 md:pt-14">
        {/* CTA band */}
        <div className="relative isolate flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[16px] bg-sun p-6 text-black md:flex-row md:items-center md:rounded-[20px] md:p-12">
          <CtaDoodles />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-flame px-3.5 py-1.5 text-xs font-bold tracking-wide text-black"><MoonIcon size={16} className="text-black" />LATE-NIGHT CRAVINGS</p>
            <p className="mt-3 text-[26px] font-bold leading-tight tracking-tight md:text-[40px]">Hungry at 2 AM?<br />We’re Still Baking.</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Link href="/menu" className="flex items-center gap-2 rounded-xl bg-black px-6 py-4 font-bold text-white">Order Now <ArrowRight /></Link>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-black"><WhatsAppIcon /> WhatsApp Us</a>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-[1.2fr_auto_1.4fr_auto] md:gap-12">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-xl bg-white px-5 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Pizza Hub" className="h-9 w-auto" />
            </span>
            <p className="max-w-[300px] text-[15px] leading-relaxed text-white/85">{SITE.tagline}</p>
            <div className="flex gap-2.5">
              {[[LineFacebook, SITE.socials.facebook, 'Facebook'], [LineInstagram, SITE.socials.instagram, 'Instagram'], [LineTikTok, SITE.socials.tiktok, 'TikTok'], [LineWhatsApp, `https://wa.me/${SITE.whatsapp}`, 'WhatsApp']].map(([Icon, href, label]) => (
                <a key={label} href={href} aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-sun hover:text-sun"><Icon /></a>
              ))}
            </div>
          </div>
          <div className="flex gap-12">
            <Col title="Help" links={[...(SHOW_BRANCHES ? [['Our Branches', '/branches']] : []), ['Feedback', '/contact#feedback'], ['My Orders', '/my-orders'], ['FAQ', '/faq']]} />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[13px] font-bold text-sun">Get in Touch</p>
            <Contact icon={<LineWhatsApp />} label="WhatsApp">{SITE.phones.map((p) => <a key={p} href={`https://wa.me/${p.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="block hover:text-sun">{p}</a>)}</Contact>
            <Contact icon={<LinePhone />} label="Call us"><a href={`tel:${SITE.phones[0].replace(/\s/g, '')}`} className="hover:text-sun">{SITE.phones[0]}</a></Contact>
            <Contact icon={<LineMail />} label="Email"><a href={`mailto:${SITE.email}`} className="hover:text-sun">{SITE.email}</a></Contact>
            <Contact icon={<LinePin />} label="Address"><a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="block max-w-[300px] hover:text-sun">{SITE.address}</a></Contact>
          </div>
          <div className="h-fit rounded-[16px] border border-white/15 bg-black/25 p-6 md:w-[240px]">
            <p className="flex items-center gap-2 text-xs font-bold text-sun"><LineClock size={18} />OPEN EVERY DAY</p>
            <p className="mt-1 text-[28px] font-bold leading-none">2 PM</p>
            <p className="my-2 flex items-center gap-2 text-[13px] text-white/70"><span className="h-[3px] w-6 rounded bg-sun" />till</p>
            <p className="text-[28px] font-bold leading-none text-sun">3 AM</p>
            <p className="mt-2 text-[13px] font-medium text-white/75">Monday – Sunday</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 py-5 text-[13px] md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="text-white/70">© {new Date().getFullYear()} Pizza Hub. All rights reserved.</p>
          <div className="flex gap-5 text-white/85">
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
        <p aria-hidden="true" className="select-none text-center text-[92px] font-bold leading-[0.8] tracking-tighter text-white/[0.07] md:text-[290px]">PIZZA HUB</p>
      </div>
    </footer>
  );
}
