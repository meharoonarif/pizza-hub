'use client';

// Confetti along the bottom of the green "Order Ready to Send!" banner.
// Pieces burst up from the bottom edge once, then settle softly in the lower ~20% of the banner.
const COLORS = ['#FFCC00', '#FFFFFF', '#FF8D28', '#FFCC00', '#FFFFFF'];

// Fixed pseudo-random values so the server and browser render the same confetti.
const rand = (i, n) => {
  const x = Math.sin(i * 9301 + n * 49297) * 233280;
  return x - Math.floor(x);
};

const PIECES = Array.from({ length: 30 }, (_, i) => ({
  left: rand(i, 1) * 100, // %
  rise: 3 + rand(i, 2) * 15, // settles 3–18% up from the bottom (stays in the lower ~20%)
  size: 4 + rand(i, 3) * 4,
  shape: ['rect', 'rect', 'circle', 'strip'][Math.floor(rand(i, 4) * 4)],
  color: COLORS[i % COLORS.length],
  rot: Math.round(rand(i, 5) * 360),
  delay: (rand(i, 6) * 0.5).toFixed(2),
  drift: Math.round((rand(i, 7) - 0.5) * 40),
}));

export default function OrderSentDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes ph-confetti {
          0%   { transform: translate(0, 120%) rotate(0deg); opacity: 0; }
          15%  { opacity: 1; }
          60%  { transform: translate(calc(var(--drift) * 1px), calc(var(--rise) * -1.25%)) rotate(calc(var(--rot) * 1deg)); }
          100% { transform: translate(calc(var(--drift) * 1.4px), calc(var(--rise) * -1%)) rotate(calc(var(--rot) * 1.3deg)); opacity: 1; }
        }
        .ph-confetti { animation: ph-confetti 1.8s cubic-bezier(.2,.7,.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .ph-confetti { animation: none; transform: translate(0, calc(var(--rise) * -1%)) rotate(calc(var(--rot) * 1deg)); }
        }
      `}</style>
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="ph-confetti absolute bottom-0 block h-full"
          style={{ left: `${p.left}%`, width: p.shape === 'strip' ? p.size * 0.45 : p.size, '--rise': p.rise, '--rot': p.rot, '--drift': p.drift, animationDelay: `${p.delay}s` }}
        >
          <span
            className="absolute bottom-0 left-0 block"
            style={{
              width: p.shape === 'strip' ? p.size * 0.45 : p.size,
              height: p.shape === 'strip' ? p.size * 2.2 : p.size * (p.shape === 'rect' ? 0.6 : 1),
              background: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : 1.5,
              opacity: 0.35,
            }}
          />
        </span>
      ))}
    </div>
  );
}
