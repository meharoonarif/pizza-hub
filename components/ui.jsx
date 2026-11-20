import Link from 'next/link';

export const Container = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-[1312px] px-4 md:px-8 ${className}`}>{children}</div>
);

export const Eyebrow = ({ children, tone = 'brand' }) => {
  const tones = {
    brand: 'bg-brand text-white',
    sun: 'bg-sun text-black',
    flame: 'bg-flame text-black',
  };
  return <span className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold tracking-wider md:text-xs ${tones[tone]}`}>{children}</span>;
};

export const PageTitle = ({ children, className = '' }) => (
  <h1 className={`text-[30px] font-bold leading-[1.08] tracking-tight md:text-[52px] ${className}`}>{children}</h1>
);

export const Breadcrumb = ({ items }) => (
  <nav className="text-xs font-medium text-muted md:text-sm" aria-label="Breadcrumb">
    {items.map((it, i) => (
      <span key={it.label}>
        {i > 0 && <span className="mx-2">/</span>}
        {it.href ? <Link href={it.href} className="hover:text-brand">{it.label}</Link> : <span>{it.label}</span>}
      </span>
    ))}
  </nav>
);

export const Button = ({ href, children, variant = 'brand', className = '', ...rest }) => {
  const v = {
    brand: 'bg-brand text-white hover:bg-brand-dark',
    sun: 'bg-sun text-black hover:brightness-95',
    black: 'bg-black text-white hover:bg-neutral-800',
    white: 'bg-white text-black border border-line hover:bg-soft',
    flame: 'bg-flame text-black hover:brightness-95',
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold transition ${v} ${className}`;
  if (href) return <Link href={href} className={cls} {...rest}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
};
