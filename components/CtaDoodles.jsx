// Abstract pizza & food line doodles used as a soft background decoration.
// variant "wide": the yellow "Hungry at 2 AM?" band in the footer (black lines).
// variant "tall": the green info card in the feedback section (white lines).
const LAYOUTS = {
  wide: {
    viewBox: '0 0 1312 280',
    pizza: [1210, 300, 1],
    items: [
      ['slice', 905, 60, -18, 1.3], ['steam', 700, 70, 0, 1.1], ['mush', 560, 220, 10, 1], ['olive', 640, 150, 0, 1],
      ['leaf', 470, 60, -20, 1.1], ['moon', 800, 225, 0, 1.2], ['slice', 40, 235, 160, 1.1], ['olive', 385, 245, 0, 1],
      ['mush', 1010, 205, -12, 0.9], ['dots', 330, 30, 0, 1], ['dots', 760, 140, 90, 1], ['star', 600, 40, 0, 0.9],
      ['star', 1290, 30, 0, 0.8], ['star', 240, 260, 0, 0.7],
    ],
  },
  // Doodles stay mostly on the right and bottom so the text on the left stays clean.
  tall: {
    viewBox: '0 0 440 620',
    pizza: [430, 640, 0.75],
    items: [
      ['slice', 380, 60, 18, 1.2], ['steam', 300, 110, 0, 0.9], ['star', 410, 150, 0, 0.7], ['olive', 395, 215, 0, 1],
      ['leaf', 330, 270, -25, 1], ['mush', 405, 330, 8, 0.95], ['moon', 320, 400, 0, 1], ['dots', 400, 420, 90, 1],
      ['slice', 250, 500, 150, 1], ['star', 120, 590, 0, 0.6], ['olive', 60, 540, 0, 0.9], ['star', 250, 30, 0, 0.6],
    ],
  },
};

export default function CtaDoodles({ variant = 'wide', color = '#000', opacity = 0.13 }) {
  const L = LAYOUTS[variant];
  const p = `dd-${variant}`; // unique ids per variant
  const s = { fill: 'none', stroke: color, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const [px, py, ps] = L.pizza;
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={L.viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <g id={`${p}-slice`}><path d="M-22-18c14-9 30-9 44 0L0 30z" {...s} /><path d="M-17-10c11-6 23-6 34 0" {...s} /><circle cx="-5" cy="-1" r="3.5" fill={color} /><circle cx="6" cy="6" r="3" fill={color} /></g>
        <g id={`${p}-mush`}><path d="M-20 0a20 17 0 0 1 40 0z" {...s} /><path d="M-7 0v14a7 4 0 0 0 14 0V0" {...s} /><circle cx="-6" cy="-7" r="2.5" fill={color} /><circle cx="6" cy="-9" r="2" fill={color} /></g>
        <g id={`${p}-olive`}><ellipse rx="11" ry="9" {...s} /><ellipse rx="4" ry="3" fill={color} /></g>
        <g id={`${p}-leaf`}><path d="M-16 10C-14-8 4-16 18-12 14 4 0 14-16 10z" {...s} /><path d="M-16 10 10-8" {...s} /></g>
        <g id={`${p}-steam`}><path d="M-10 18c-8-8 8-14 0-22s8-14 0-22" {...s} /><path d="M8 18c-8-8 8-14 0-22s8-14 0-22" {...s} /></g>
        <g id={`${p}-star`}><path d="M0-12 3-3 12 0 3 3 0 12-3 3-12 0-3-3z" fill={color} /></g>
        <g id={`${p}-moon`}><path d="M8-14a15 15 0 1 0 6 24A12 12 0 1 1 8-14z" {...s} /></g>
        <g id={`${p}-dots`}><circle cx="-10" r="3" fill={color} /><circle r="3" fill={color} /><circle cx="10" r="3" fill={color} /></g>
      </defs>
      <g opacity={opacity}>
        {/* big pizza peeking in from the bottom-right */}
        <g transform={`translate(${px} ${py}) scale(${ps})`}>
          <circle r="190" {...s} strokeWidth="5" />
          <circle r="160" {...s} strokeDasharray="2 14" />
          {[0, 45, 90, 135].map((a) => <line key={a} x1="-160" x2="160" transform={`rotate(${a})`} {...s} />)}
          {[[-90, -70], [60, -110], [-40, -130], [110, -40], [-120, -20], [20, -60]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="16" {...s} />)}
        </g>
        {L.items.map(([k, x, y, r, sc], i) => (
          <use key={i} href={`#${p}-${k}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${sc})`} />
        ))}
      </g>
    </svg>
  );
}
