const base = (size) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true });

export const SearchIcon = ({ size = 20, className = '' }) => (
  <svg {...base(size)} className={className}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" /><path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
);
export const CartIcon = ({ size = 20, className = '' }) => (
  <svg {...base(size)} className={className}><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="20.5" r="1.4" fill="currentColor" /><circle cx="17" cy="20.5" r="1.4" fill="currentColor" /></svg>
);
export const MenuIcon = ({ size = 24 }) => (
  <svg {...base(size)}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
);
export const CloseIcon = ({ size = 22 }) => (
  <svg {...base(size)}><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
);
export const ArrowRight = ({ size = 18, className = '' }) => (
  <svg {...base(size)} className={className}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const ArrowUpRight = ({ size = 18 }) => (
  <svg {...base(size)}><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const PinIcon = ({ size = 20, className = '' }) => (
  <svg {...base(size)} className={className}><path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" fill="currentColor" /><circle cx="12" cy="9.5" r="2.6" fill="#fff" /></svg>
);
export const ClockIcon = ({ size = 20, className = '' }) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
export const PhoneIcon = ({ size = 18, className = '' }) => (
  <svg {...base(size)} className={className}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="currentColor" /></svg>
);
export const MailIcon = ({ size = 18 }) => (
  <svg {...base(size)}><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
);
export const MoonIcon = ({ size = 20, className = '' }) => (
  <svg {...base(size)} className={className}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" fill="currentColor" /></svg>
);
export const CheckIcon = ({ size = 18, className = '' }) => (
  <svg {...base(size)} className={className}><path d="m5 12 5 5 9-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const StarIcon = ({ size = 28, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill={filled ? '#FFCC00' : '#E2E4DE'} /></svg>
);
export const BikeIcon = ({ size = 28 }) => (
  <svg {...base(size)}><circle cx="5.5" cy="17" r="3" stroke="currentColor" strokeWidth="2" /><circle cx="18.5" cy="17" r="3" stroke="currentColor" strokeWidth="2" /><circle cx="15" cy="5" r="1.6" fill="currentColor" /><path d="M5.5 17 9 11h5l3 6M9 11l3-3.5 3 2.5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const BagIcon = ({ size = 28 }) => (
  <svg {...base(size)}><path d="M5 8h14l-1 12H6L5 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M9 8V7a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="2" /></svg>
);
export const WhatsAppIcon = ({ size = 20, color = '#25D366', inner = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" fill={color} /><path d="M8.6 7.3c.2-.4.5-.4.7-.4h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.4.7 1 1.4 1.6 1.9.7.6 1.3.8 1.6.9.2.1.4 0 .5-.1l.8-.9c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .4-.1 1.2-.7 1.6-.5.4-1.4.6-2.2.4a10 10 0 0 1-5.6-4.6c-.6-1-.9-1.8-.9-2.5 0-.9.5-1.5.9-1.8z" fill={inner} /></svg>
);
export const FacebookIcon = ({ size = 18 }) => (<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" /></svg>);
export const InstagramIcon = ({ size = 18 }) => (<svg {...base(size)}><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" /></svg>);
export const TikTokIcon = ({ size = 18 }) => (<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1.2V15a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 14 15z" fill="currentColor" /></svg>);
// Pizza slice, used for the "Menu" button in the header
export const PizzaMenuIcon = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M3.5 6.5C9 2.8 15 2.8 20.5 6.5L12 21z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M5.6 9.9c4.2-2.6 8.6-2.6 12.8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="12.6" r="1.3" fill="currentColor" />
    <circle cx="14" cy="13.4" r="1.1" fill="currentColor" />
    <circle cx="12" cy="16.6" r="1.1" fill="currentColor" />
  </svg>
);

// ---- Line icon family (same stroke, caps and joins) used in the footer ----
const line = (size, className = '') => ({ ...base(size), className, stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' });
export const LinePhone = ({ size = 22, className = '' }) => (<svg {...line(size, className)}><path d="M6 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 6.4 6.4l1.3-2 4.2 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.7a2 2 0 0 1 2-2.2z" /></svg>);
export const LineWhatsApp = ({ size = 22, className = '' }) => (<svg {...line(size, className)}><path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1z" /><path d="M9 8.6c0 3.4 3 6.4 6.4 6.4l.9-1.6-2-1-.9.9a4.5 4.5 0 0 1-2.7-2.7l.9-.9-1-2z" /></svg>);
export const LineMail = ({ size = 22, className = '' }) => (<svg {...line(size, className)}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7.5 8 5.5 8-5.5" /></svg>);
export const LinePin = ({ size = 22, className = '' }) => (<svg {...line(size, className)}><path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const LineClock = ({ size = 22, className = '' }) => (<svg {...line(size, className)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const LineFacebook = ({ size = 20, className = '' }) => (<svg {...line(size, className)}><path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a1 1 0 0 1 .5-1z" /></svg>);
export const LineInstagram = ({ size = 20, className = '' }) => (<svg {...line(size, className)}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></svg>);
export const LineTikTok = ({ size = 20, className = '' }) => (<svg {...line(size, className)}><path d="M13.5 3.5h3a4.5 4.5 0 0 0 4 4v3a7.5 7.5 0 0 1-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5v3.2a2.3 2.3 0 1 0 2.5 2.3z" /></svg>);
export const LineDirections = ({ size = 20, className = '' }) => (<svg {...line(size, className)}><path d="M20.5 3.5 3.5 10.5l7 2.9 2.9 7z" /></svg>);
export const ChevronDown = ({ size = 16, className = '' }) => (<svg {...line(size, className)}><path d="m6 9 6 6 6-6" /></svg>);
export const ChevronRight = ({ size = 18, className = '' }) => (<svg {...line(size, className)}><path d="m9 6 6 6-6 6" /></svg>);
