'use client';

import { usePathname } from 'next/navigation';

// Hides the footer on the checkout page so customers stay focused on placing the order.
export default function FooterGate({ children }) {
  const pathname = (usePathname() || '/').replace(/\/+$/, '') || '/';
  if (pathname === '/checkout') return null;
  return children;
}
