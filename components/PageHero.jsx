import { Breadcrumb } from './ui';

export default function PageHero({ crumb, eyebrow, title, highlight, sub, dark = false }) {
  return (
    <section className={dark ? 'bg-brand text-white' : 'bg-soft'}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-8 md:gap-4 md:px-16 md:py-16">
        <div className={dark ? 'opacity-75 [&_*]:!text-white' : ''}><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: crumb }]} /></div>
        <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold md:text-xs ${dark ? 'bg-sun text-black' : 'bg-brand text-white'}`}>{eyebrow}</span>
        <h1 className="max-w-[900px] text-[32px] font-bold leading-[1.06] tracking-tight md:text-[60px]">
          {title}{highlight && <><br /><span className={dark ? 'text-sun' : 'text-brand'}>{highlight}</span></>}
        </h1>
        {sub && <p className={`max-w-[640px] leading-relaxed md:text-[17px] ${dark ? 'text-white/85' : 'text-muted'}`}>{sub}</p>}
      </div>
    </section>
  );
}
