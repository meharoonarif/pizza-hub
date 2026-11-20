'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/lib/cart';
import { ArrowRight, BagIcon, BikeIcon, ClockIcon, CloseIcon } from './Icons';

const SEEN_KEY = 'pizzahub_ordertype_seen';

// "How would you like your order?" popup.
// It does NOT open on page load. The first time a visitor clicks any button, link or
// pizza tile (once per visit), we pause that click, ask Delivery or Pickup, then carry
// on with what they clicked.
export default function OrderTypeModal() {
  const { ready, prefs, setOrderType } = useCart();
  const [show, setShow] = useState(false);
  const pending = useRef(null);
  const seen = useRef(true);

  useEffect(() => {
    try { seen.current = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { seen.current = true; }
    const onClick = (e) => {
      if (seen.current || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const el = e.target.closest('a, button');
      if (!el || el.closest('[data-ordertype-modal]') || el.closest('[data-no-gate]')) return;
      if (el.tagName === 'A' && (el.target === '_blank' || /^(tel:|mailto:|https?:\/\/(?!localhost))/.test(el.getAttribute('href') || ''))) return;
      e.preventDefault();
      e.stopPropagation();
      pending.current = el;
      setShow(true);
    };
    const openFromHeader = () => { pending.current = null; setShow(true); };
    document.addEventListener('click', onClick, true);
    window.addEventListener('ph:choose-order-type', openFromHeader);
    return () => { document.removeEventListener('click', onClick, true); window.removeEventListener('ph:choose-order-type', openFromHeader); };
  }, []);

  if (!ready || !show) return null;

  const choose = (type) => {
    setOrderType(type);
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch {}
    seen.current = true;
    setShow(false);
    const el = pending.current;
    pending.current = null;
    if (el && el.isConnected) setTimeout(() => el.click(), 0); // continue to what they clicked
  };
  const current = prefs.orderType;

  const Option = ({ type, title, sub, chip, Icon }) => (
    <button onClick={() => choose(type)} className={`group relative flex flex-1 flex-col items-start gap-1 rounded-[16px] border-2 p-5 text-left transition hover:border-brand hover:bg-brand-tint md:p-6 ${current === type ? 'border-brand bg-brand-tint' : 'border-line bg-soft'}`}>
      <ArrowRight size={18} className="absolute right-5 top-6 text-[#BDBDB6] group-hover:text-brand" />
      <span className="mb-5 grid h-16 w-16 place-items-center rounded-xl border border-line bg-white text-black"><Icon /></span>
      <span className="text-xl font-bold">{title}</span>
      <span className="text-sm text-muted">{sub}</span>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-[#444]"><ClockIcon size={14} />{chip}</span>
    </button>
  );

  return (
    <div data-ordertype-modal className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 md:items-center" role="dialog" aria-modal="true" aria-labelledby="ot-title">
      <div className="relative w-full max-w-[600px] rounded-t-[18px] bg-white p-6 md:rounded-[20px] md:p-10">
        <button onClick={() => choose(current || 'delivery')} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-[#EDEDED]" aria-label="Close"><CloseIcon size={20} /></button>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF5CC] px-3 py-1.5 text-xs font-bold tracking-wider text-black"><span className="h-2 w-2 rounded-full bg-sun" />OPEN 2 PM – 3 AM</span>
        <h2 id="ot-title" className="mt-5 max-w-[380px] text-[26px] font-bold leading-tight tracking-tight md:text-[34px]">How Would You Like Your Order?</h2>
        <p className="mt-2 text-muted">Choose one to get started.</p>
        <div className="mt-7 flex flex-col gap-3 md:flex-row md:gap-4">
          <Option type="delivery" title="Delivery" sub="Hot & fresh at your door" chip="~35–45 mins" Icon={BikeIcon} />
          <Option type="pickup" title="Pickup" sub="Collect from our shop" chip="Skip the wait" Icon={BagIcon} />
        </div>
      </div>
    </div>
  );
}
