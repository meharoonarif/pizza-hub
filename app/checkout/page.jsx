'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { addressError, formatPhone, nameError, normalizePhone, phoneError } from '@/lib/validate';
import Steps from '@/components/Steps';
import ProductImage from '@/components/ProductImage';
import { WhatsAppIcon } from '@/components/Icons';
import { useCart } from '@/lib/cart';
import { SITE, formatPrice, getItem } from '@/lib/data';
import { isOpen } from '@/lib/hours';
import { buildOrderMessage, waLink } from '@/lib/whatsapp';

const DETAILS_KEY = 'pizzahub_details_v1';
// Payment logos: put the official logo files in /public/images/payments/
// (jazzcash.png, easypaisa.png). Until then a coloured badge is shown.
const PAYMENTS = [
  { title: 'Cash on Delivery', sub: 'Pay when your order arrives', icon: 'cash' },
  { title: 'JazzCash', sub: 'We’ll send payment details on WhatsApp', logo: '/images/payments/jazzcash.png', badge: ['Jazz', '#C8102E'] },
  { title: 'EasyPaisa', sub: 'We’ll send payment details on WhatsApp', logo: '/images/payments/easypaisa.png', badge: ['Easy', '#00A859'] },
];

function PayIcon({ p }) {
  const [failed, setFailed] = useState(false);
  if (p.icon === 'cash') {
    return (
      <span className="grid h-11 w-14 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand">
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1.5" y="3.5" width="27" height="15" rx="2.5" /><circle cx="15" cy="11" r="3.6" /><path d="M5.5 7.5v.01M24.5 14.5v.01" strokeWidth="2.6" /></svg>
      </span>
    );
  }
  if (p.logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <span className="grid h-11 w-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-white p-1"><img src={p.logo} alt={`${p.title} logo`} className="max-h-full max-w-full object-contain" onError={() => setFailed(true)} /></span>
    );
  }
  return <span className="grid h-11 w-14 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-white" style={{ background: p.badge[1] }}>{p.badge[0]}</span>;
}

const Section = ({ n, title, children }) => (
  <section className="rounded-[16px] border border-line bg-white p-5 md:p-7">
    <h2 className="mb-4 flex items-center gap-3 text-lg font-bold md:text-xl"><span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-sun text-sm font-bold">{n}</span>{title}</h2>
    {children}
  </section>
);
const Choice = ({ on, onClick, title, sub, badge, disabled }) => (
  <button type="button" disabled={disabled} onClick={onClick} className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-4 text-left transition disabled:opacity-40 ${on ? 'border-2 border-brand bg-brand-tint' : 'border border-line bg-white hover:border-black'}`}>
    <span className={`h-[22px] w-[22px] shrink-0 rounded-full bg-white ${on ? 'border-[7px] border-brand' : 'border-2 border-[#BDBDB6]'}`} />
    {badge}
    <span className="min-w-0"><span className="block font-bold">{title}</span>{sub && <span className="block text-xs text-muted">{sub}</span>}</span>
  </button>
);
const errCls = '!bg-[#FDEDEC] ring-2 !ring-[#C0392B]';
const FieldError = ({ id, msg, hint }) => (msg
  ? <span id={id} role="alert" className="flex items-start gap-1.5 text-xs font-medium text-[#C0392B]"><span aria-hidden="true">⚠</span>{msg}</span>
  : hint ? <span id={id} className="text-xs font-normal text-muted">{hint}</span> : null);
const inputCls = 'h-[52px] w-full rounded-xl bg-soft px-4 text-[15px] outline-none ring-brand focus:ring-2';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const { ready, items, prefs, setOrderType, unitPrice, count, subtotal, deliveryFee, total, saveOrder, clear } = cart;
  const [open, setOpen] = useState(true);
  const [f, setF] = useState({ name: '', phone: '', address: '', addressByCall: false, payment: PAYMENTS[0].title, notes: '' });
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});
  const touch = (k) => setTouched((t) => ({ ...t, [k]: true }));
  const orderType = prefs.orderType || 'delivery';

  useEffect(() => {
    const o = isOpen();
    setOpen(o);
    try {
      const saved = JSON.parse(localStorage.getItem(DETAILS_KEY) || '{}');
      setF((p) => ({ ...p, ...saved }));
    } catch {}
  }, []);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  if (!ready) return <div className="min-h-[60vh]" />;
  if (count === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-bold">Nothing to Check Out Yet</h1>
        <Link href="/menu" className="rounded-xl bg-brand px-7 py-4 font-bold text-white">Browse the menu</Link>
      </div>
    );
  }

  const errors = {
    name: nameError(f.name),
    phone: phoneError(f.phone),
    address: orderType === 'delivery' && !f.addressByCall ? addressError(f.address) : '',
  };
  const show = (k) => touched[k] && errors[k];

  const placeOrder = () => {
    setTouched({ name: true, phone: true, address: true });
    const first = ['name', 'phone', 'address'].find((k) => errors[k]);
    if (first) {
      setError('Please fix the highlighted details above.');
      const el = document.getElementById(`co-${first}`);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.focus({ preventScroll: true }); }
      return;
    }
    setError('');
    const details = { ...f, phone: formatPhone(normalizePhone(f.phone)), name: f.name.trim(), address: f.addressByCall ? '' : f.address.trim() };
    const orderId = 'PH-' + String(Date.now()).slice(-6);
    const message = buildOrderMessage({ orderId, items, unitPrice, subtotal, deliveryFee, total, form: { ...details, orderType } });
    try { localStorage.setItem(DETAILS_KEY, JSON.stringify({ name: details.name, phone: details.phone, address: f.addressByCall ? f.address : details.address })); } catch {}
    saveOrder({ id: orderId, date: new Date().toISOString(), items, total, orderType, message });
    const url = waLink(SITE.whatsapp, message);
    window.open(url, '_blank');
    clear();
    router.push(`/order-sent?id=${orderId}`);
  };

  return (
    <div className="bg-soft">
      <div className="mx-auto max-w-[1440px] px-4 pb-32 pt-6 md:px-16 md:pb-16 md:pt-10">
        <Steps active={1} />
        <h1 className="mt-4 text-[28px] font-bold tracking-tight md:text-[44px]">Checkout</h1>
        <p className="text-sm text-muted md:text-base">Confirm your details. Your order opens in WhatsApp, ready to send.</p>

        {!open && (
          <p className="mt-5 rounded-xl bg-flame/20 px-4 py-3 text-sm font-semibold">We’re closed right now. We’re open every day {SITE.hoursLabel}, and will confirm your order on WhatsApp when we open.</p>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px] lg:gap-8">
          <div className="flex flex-col gap-4 md:gap-5">
            <Section n={1} title="Delivery or Pickup">
              <div className="grid gap-3 md:grid-cols-2">
                <Choice on={orderType === 'delivery'} onClick={() => setOrderType('delivery')} title="Delivery" sub={`${SITE.etaLabel} · ${formatPrice(SITE.deliveryFee)} fee`} />
                <Choice on={orderType === 'pickup'} onClick={() => setOrderType('pickup')} title="Pickup" sub="Ready in 20–25 min · no fee" />
              </div>
            </Section>

            <Section n={2} title="Your Details">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-[13px] font-semibold">Full name *<input id="co-name" className={`${inputCls} ${show('name') ? errCls : ''}`} value={f.name} onChange={(e) => set('name', e.target.value)} onBlur={() => touch('name')} placeholder="Your name" autoComplete="name" aria-invalid={!!show('name')} aria-describedby="co-name-err" />
                  <FieldError id="co-name-err" msg={show('name')} /></label>
                <label className="flex flex-col gap-2 text-[13px] font-semibold">Phone number *<input id="co-phone" className={`${inputCls} ${show('phone') ? errCls : ''}`} value={f.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => { touch('phone'); const n = normalizePhone(f.phone); if (n) set('phone', formatPhone(n)); }} placeholder="03XX XXXXXXX" inputMode="tel" autoComplete="tel" maxLength={16} aria-invalid={!!show('phone')} aria-describedby="co-phone-err" />
                  <FieldError id="co-phone-err" msg={show('phone')} hint="We’ll confirm your order on this number." /></label>
              </div>
              {orderType === 'delivery' && (
                <div className="mt-4 flex flex-col gap-2">
                  <label htmlFor="co-address" className={`text-[13px] font-semibold ${f.addressByCall ? 'text-muted' : ''}`}>Delivery address {f.addressByCall ? '' : '*'}</label>
                  <textarea id="co-address" disabled={f.addressByCall} className={`min-h-[88px] rounded-xl bg-soft p-4 text-[15px] font-normal outline-none ring-brand transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${show('address') ? errCls : ''}`} value={f.addressByCall ? '' : f.address} onChange={(e) => set('address', e.target.value)} onBlur={() => touch('address')} placeholder={f.addressByCall ? 'We’ll take your address when we call you' : 'House no., street, block/area, nearest landmark (e.g. House 12, Street 4, Amar Sidhu, near Shanghai Bridge)'} autoComplete="street-address" aria-invalid={!!show('address')} aria-describedby="co-address-err" />
                  {!f.addressByCall && <FieldError id="co-address-err" msg={show('address')} hint="Include house no., street and area so our rider can find you." />}
                  <label className={`mt-1 flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition ${f.addressByCall ? 'border-sun bg-[#FFF8E1]' : 'border-line hover:border-black'}`}>
                    <input type="checkbox" className="h-5 w-5 shrink-0 accent-[#007545]" checked={f.addressByCall} onChange={(e) => setF((p) => ({ ...p, addressByCall: e.target.checked }))} />
                    <span className="flex flex-col">
                      <span className="text-[14px] font-semibold">Share address over call</span>
                      <span className="text-xs font-normal text-muted">We’ll call you on your number to get the address.</span>
                    </span>
                  </label>
                </div>
              )}
            </Section>

            <Section n={3} title="Payment">
              <div className="flex flex-col gap-3">
                {PAYMENTS.map((p) => <Choice key={p.title} on={f.payment === p.title} onClick={() => set('payment', p.title)} title={p.title} sub={p.sub} badge={<PayIcon p={p} />} />)}
              </div>
              <label className="mt-4 flex flex-col gap-2 text-[13px] font-semibold">Order notes<input className={inputCls} value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder="e.g. call when outside, extra ketchup" /></label>
            </Section>
          </div>

          <aside className="h-fit rounded-[16px] border border-line bg-white p-5 md:p-7 lg:sticky lg:top-32">
            <p className="text-xl font-bold">Your Order</p>
            <div className="mt-4 flex flex-col gap-3">
              {items.map((l) => (
                <div key={l.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#FFF8E1]"><ProductImage item={getItem(l.slug) || {}} src={l.image} className="h-full w-full object-contain" /></div>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{l.qty}× {l.name}</p><p className="truncate text-xs text-muted">{l.size}{l.extras?.length ? ' · ' + l.extras.map((e) => e.name).join(', ') : ''}</p></div>
                  <p className="text-sm font-bold">{formatPrice(unitPrice(l) * l.qty)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2.5 border-t border-line pt-4 text-[15px]">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted">{orderType === 'pickup' ? 'Pickup' : 'Delivery fee'}</span><span className="font-semibold">{deliveryFee ? formatPrice(deliveryFee) : 'Free'}</span></div>
              <div className="flex justify-between pt-1"><span className="text-[17px] font-bold">Total</span><span className="text-xl font-bold text-brand">{formatPrice(total)}</span></div>
            </div>
            {error && <p className="mt-4 text-sm font-semibold text-[#C0392B]">{error}</p>}
            <button onClick={placeOrder} className="mt-5 hidden w-full items-center justify-between rounded-xl bg-brand px-6 py-4 font-bold text-white hover:bg-brand-dark lg:flex">
              <span className="flex items-center gap-2"><WhatsAppIcon color="#fff" inner="#007545" />Place order on WhatsApp</span><span className="text-sun">{formatPrice(total)}</span>
            </button>
            <p className="mt-3 text-xs text-muted">WhatsApp opens with your order filled in. Tap send and we’ll confirm.</p>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-4 pb-6 pt-3 lg:hidden">
        {error && <p className="mb-2 text-xs font-semibold text-[#C0392B]">{error}</p>}
        <button onClick={placeOrder} className="flex w-full items-center justify-between rounded-xl bg-brand px-5 py-4 font-bold text-white">
          <span className="flex items-center gap-2"><WhatsAppIcon color="#fff" inner="#007545" />Place order</span><span className="text-sun">{formatPrice(total)}</span>
        </button>
      </div>
    </div>
  );
}
