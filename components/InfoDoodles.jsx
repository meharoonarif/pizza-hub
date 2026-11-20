// Scattered line icons behind the green info card in the feedback section.
// Small, spread out and very faint. Each group sits near the block it relates to:
// Address (map, pin) → Contact (phone, chat, mail) → Open Time (clock, moon, stars) → Stay Connected (heart, share, @).
const s = { fill: 'none', stroke: '#fff', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };

const ICONS = {
  pin: <><path d="M0 14S12 3 12-6a12 12 0 1 0-24 0C-12 3 0 14 0 14z" {...s} /><circle cy="-6" r="4" {...s} /></>,
  map: <><path d="M-24-12-8-18 8-12l16-6v30L8 18-8 12-24 18z" {...s} /><path d="M-8-18v30M8-12v30" {...s} /></>,
  phone: <path d="M-12-16h8l3 9-4 3a22 22 0 0 0 10 10l3-4 9 3v8a3 3 0 0 1-3 3C-2 16-16 2-16-13a3 3 0 0 1 4-3z" {...s} />,
  chat: <><path d="M-16-12h32a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H0l-8 7v-7h-8a4 4 0 0 1-4-4V-8a4 4 0 0 1 4-4z" {...s} /><path d="M-8-1h1m7 0h1m7 0h1" {...s} strokeWidth="3.5" /></>,
  mail: <><rect x="-18" y="-12" width="36" height="24" rx="4" {...s} /><path d="m-16-9 16 11 16-11" {...s} /></>,
  clock: <><circle r="18" {...s} /><path d="M0-10V0l7 5" {...s} /></>,
  moon: <path d="M4-12a13 13 0 1 0 8 22 10 10 0 1 1-8-22z" {...s} />,
  star: <path d="m0-8 2 6 6 2-6 2-2 6-2-6-6-2 6-2z" {...s} strokeWidth="1.8" />,
  heart: <path d="M0 15S-18 4-18-6a9 9 0 0 1 18-3 9 9 0 0 1 18 3C18 4 0 15 0 15z" {...s} />,
  share: <><circle cx="-10" r="4.5" {...s} /><circle cx="10" cy="-11" r="4.5" {...s} /><circle cx="10" cy="11" r="4.5" {...s} /><path d="m-6-2 12-7M-6 2l12 7" {...s} /></>,
  at: <><circle r="5" {...s} /><path d="M5 0v2a4 4 0 0 0 8 0V0A13 13 0 1 0 8 10" {...s} /></>,
  dots: <><circle cx="-8" r="1.8" fill="#fff" /><circle r="1.8" fill="#fff" /><circle cx="8" r="1.8" fill="#fff" /></>,
};

// [icon, x, y, rotate, scale] in a 440 × 620 box
const LAYOUT = [
  ['map', 380, 46, -8, 0.9], ['pin', 300, 110, 10, 0.75], ['dots', 410, 120, 0, 1],
  ['phone', 395, 200, -12, 0.85], ['chat', 300, 250, 6, 0.7], ['mail', 405, 300, 8, 0.75], ['star', 250, 190, 0, 0.8],
  ['clock', 330, 375, 0, 0.9], ['moon', 415, 410, -10, 0.8], ['star', 270, 430, 0, 0.7], ['star', 400, 355, 0, 0.55],
  ['heart', 405, 505, -10, 0.85], ['share', 315, 560, 0, 0.8], ['at', 410, 590, 0, 0.7], ['dots', 240, 600, 0, 1],
];

export default function InfoDoodles({ opacity = 0.1 }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 440 620" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      <g opacity={opacity}>
        {LAYOUT.map(([k, x, y, r, sc], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${sc})`}>{ICONS[k]}</g>)}
      </g>
    </svg>
  );
}
