'use client';

import { useState } from 'react';
import { SITE } from '@/lib/data';
import { buildFeedbackMessage, waLink } from '@/lib/whatsapp';
import InfoDoodles from './InfoDoodles';
import { ArrowRight, LineClock, LinePhone, LinePin, FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './Icons';

const TOPICS = ['Complaint', 'Feedback', 'Suggestion'];
const inputCls = 'h-14 w-full rounded-xl bg-soft px-5 text-[15px] outline-none ring-brand placeholder:text-[#8E8E88] focus:bg-white focus:ring-2 md:h-16';

// Spinning round badge, like a sticker
function Badge() {
  return (
    <div className="relative hidden h-[150px] w-[210px] shrink-0 md:block" aria-hidden="true">
      <span className="absolute left-0 top-0 h-[150px] w-[150px] rounded-full bg-sun" />
      <div className="absolute right-0 top-0 grid h-[150px] w-[150px] place-items-center rounded-full border-4 border-white bg-black">
        <svg viewBox="0 0 150 150" className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite] motion-reduce:animate-none">
          <defs><path id="fb-circle" d="M75,75 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" /></defs>
          <text fill="#fff" fontSize="13" fontWeight="600" letterSpacing="3.2">
            <textPath href="#fb-circle">WE’RE LISTENING • TELL US • </textPath>
          </text>
        </svg>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white"><ArrowRight size={20} /></span>
      </div>
    </div>
  );
}

function InfoBlock({ title, icon: Icon, children }) {
  return (
    <div className="relative">
      <p className="relative flex items-center gap-2.5 text-xl font-semibold text-white md:text-[22px]">{Icon && <Icon size={24} className="text-sun" />}{title}</p>
      <div className="relative mt-2.5 space-y-1.5 text-[15px] text-white/80">{children}</div>
    </div>
  );
}

export default function FeedbackForm() {
  const [f, setF] = useState({ first: '', last: '', phone: '', orderId: '', topic: 'Complaint', message: '' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!f.first.trim() || !f.last.trim() || !f.phone.trim() || !f.message.trim()) {
      return setError('Please fill in your name, phone number and message.');
    }
    setError('');
    const msg = buildFeedbackMessage({ topic: f.topic, name: `${f.first.trim()} ${f.last.trim()}`, phone: f.phone, orderId: f.orderId, message: f.message });
    window.open(waLink(SITE.whatsapp, msg), '_blank');
  };

  const socials = [
    ['Facebook', SITE.socials.facebook, FacebookIcon],
    ['Instagram', SITE.socials.instagram, InstagramIcon],
    ['TikTok', SITE.socials.tiktok, TikTokIcon],
    ['WhatsApp', `https://wa.me/${SITE.whatsapp}`, (props) => <WhatsAppIcon {...props} color="currentColor" inner="#000" />],
  ];

  return (
    <section className="bg-white py-12 md:py-24" id="feedback">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        {/* Heading row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-[32px] font-bold leading-[1.12] tracking-tight md:text-[56px]">
              Help Us Make Every<br />Slice <span className="text-brand">Better</span>
            </h2>
          </div>
          <Badge />
        </div>

        <div className="mt-8 grid gap-6 md:mt-14 lg:grid-cols-[1fr_440px] lg:gap-10">
          {/* Form */}
          <form onSubmit={submit} noValidate className="flex flex-col gap-4 md:gap-5">
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="What’s it about?">
              {TOPICS.map((t) => (
                <button key={t} type="button" role="radio" aria-checked={f.topic === t} onClick={() => setF({ ...f, topic: t })}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${f.topic === t ? 'bg-black text-white' : 'bg-soft text-black hover:bg-brand-tint'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <input className={inputCls} value={f.first} onChange={set('first')} placeholder="First Name *" autoComplete="given-name" aria-label="First name" />
              <input className={inputCls} value={f.last} onChange={set('last')} placeholder="Last Name *" autoComplete="family-name" aria-label="Last name" />
              <input className={inputCls} value={f.phone} onChange={set('phone')} placeholder="Phone Number *" inputMode="tel" autoComplete="tel" aria-label="Phone number" />
              <input className={inputCls} value={f.orderId} onChange={set('orderId')} placeholder="Order ID (optional)" aria-label="Order ID" />
            </div>
            <textarea className="h-[120px] w-full resize-none rounded-xl bg-soft p-5 text-[15px] outline-none ring-brand placeholder:text-[#8E8E88] focus:bg-white focus:ring-2 md:h-[140px]" value={f.message} onChange={set('message')} placeholder="Message *" aria-label="Message" />
            {error && <p className="text-sm font-semibold text-[#C0392B]">{error}</p>}
            <div className="flex items-center gap-2">
              <button type="submit" className="h-14 rounded-full bg-sun px-8 text-[15px] font-semibold text-black transition hover:brightness-95">Send Message</button>
              <button type="submit" aria-label="Send message" className="grid h-14 w-14 place-items-center rounded-full bg-black text-white transition hover:bg-brand"><ArrowRight size={20} /></button>
            </div>
            <p className="text-xs text-muted">Your message opens in WhatsApp, ready to send.</p>
          </form>

          {/* Info card */}
          <aside className="relative isolate flex h-fit flex-col gap-7 overflow-hidden rounded-[18px] bg-brand p-7 md:gap-8 md:p-10">
            <InfoDoodles />
            <InfoBlock title="Address" icon={LinePin}><p>{SITE.address}</p></InfoBlock>
            <InfoBlock title="Contact" icon={LinePhone}>
              {SITE.phones.map((p) => <p key={p}>Phone : <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-sun">{p}</a></p>)}
              <p>Email : <a href={`mailto:${SITE.email}`} className="hover:text-sun">{SITE.email}</a></p>
            </InfoBlock>
            <InfoBlock title="Open Time" icon={LineClock}><p>Monday – Sunday : <span className="font-semibold text-sun">{SITE.hoursLabel}</span></p></InfoBlock>
            <div className="relative">
              <p className="relative text-xl font-semibold text-white md:text-[22px]">Stay Connected</p>
              <div className="relative mt-4 flex gap-3">
                {socials.map(([label, href, Icon]) => (
                  <a key={label} href={href} {...(href !== '#' ? { target: '_blank', rel: 'noreferrer' } : {})} aria-label={label} className="grid h-12 w-12 place-items-center rounded-full bg-black text-white transition hover:bg-sun hover:text-black md:h-14 md:w-14">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
