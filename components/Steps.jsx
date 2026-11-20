import Link from 'next/link';

const STEPS = [
  { label: 'Cart', href: '/cart' },
  { label: 'Details', href: '/checkout' },
  { label: 'Sent', href: null },
];
// Where the back arrow goes from each step
const BACK = [
  { href: '/menu', label: 'Back to Menu' },
  { href: '/cart', label: 'Back to Cart' },
  null, // order already sent: nothing to go back to
];

export default function Steps({ active }) {
  const back = BACK[active];
  // Earlier steps are clickable until the order is sent (after that the cart is empty)
  const canGoBack = (i) => i < active && active < STEPS.length - 1 && STEPS[i].href;

  return (
    <div className="flex flex-col items-start gap-4">
      {back && (
        <Link href={back.href} className="flex items-center gap-2 rounded-full border border-line bg-white py-2 pl-2.5 pr-4 text-[13px] font-semibold transition hover:border-black md:text-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          {back.label}
        </Link>
      )}
      <ol className="flex items-center gap-2 md:gap-3" aria-label="Order steps">
        {STEPS.map((s, i) => {
          const done = i < active;
          const inner = (
            <>
              <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${done ? 'bg-brand text-white' : i === active ? 'bg-sun text-black' : 'border-[1.5px] border-line bg-white text-muted'}`}>{done ? '✓' : i + 1}</span>
              <span className={`text-xs md:text-sm ${i === active ? 'font-bold' : 'font-medium text-muted'} ${i !== active ? 'hidden md:inline' : ''}`}>{s.label}</span>
            </>
          );
          return (
            <li key={s.label} className="flex items-center gap-2 md:gap-3" aria-current={i === active ? 'step' : undefined}>
              {canGoBack(i) ? (
                <Link href={s.href} className="flex items-center gap-2 rounded-full transition hover:opacity-75 md:gap-3 [&>span:last-child]:underline [&>span:last-child]:decoration-line [&>span:last-child]:underline-offset-4" title={`Go back to ${s.label}`}>{inner}</Link>
              ) : (
                <span className="flex items-center gap-2 md:gap-3">{inner}</span>
              )}
              {i < STEPS.length - 1 && <span className={`h-0.5 w-5 md:w-10 ${done ? 'bg-brand' : 'bg-line'}`} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
