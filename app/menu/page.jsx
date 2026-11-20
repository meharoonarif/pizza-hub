import { Suspense } from 'react';
import MenuBrowser from './MenuBrowser';

export const metadata = { title: 'Menu', description: 'Classic pizzas, specialty pizzas and pasta. Open 2 PM – 3 AM in Lahore.' };

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <MenuBrowser />
    </Suspense>
  );
}
