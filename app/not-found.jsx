import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-soft px-6 py-16 text-center">
      <svg width="300" height="200" viewBox="0 0 300 200" aria-hidden="true">
        <text x="40" y="150" fontWeight="700" fontSize="130" fill="#007545">4</text>
        <g transform="translate(150 100)"><circle r="56" fill="#E8A95A" /><circle r="46" fill="#FBE0A0" /><path d="M0 0 L0 -56 A56 56 0 0 1 48 -29 Z" fill="#F5F6F2" /><circle cx="-18" cy="14" r="8" fill="#C9372B" /><circle cx="16" cy="22" r="8" fill="#C9372B" /><circle cx="-24" cy="-16" r="7" fill="#C9372B" /></g>
        <text x="212" y="150" fontWeight="700" fontSize="130" fill="#007545">4</text>
      </svg>
      <h1 className="text-[28px] font-bold tracking-tight md:text-[44px]">This Slice Is Missing</h1>
      <p className="max-w-[460px] text-muted">The page you’re looking for got eaten. Let’s get you back to the good stuff.</p>
      <div className="flex flex-col gap-3 md:flex-row">
        <Link href="/" className="rounded-xl bg-brand px-7 py-4 font-bold text-white">Back to home</Link>
        <Link href="/menu" className="rounded-xl border border-line bg-white px-7 py-4 font-bold">Open the menu</Link>
      </div>
    </div>
  );
}
