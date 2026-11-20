import { notFound } from 'next/navigation';
import { MENU, getItem } from '@/lib/data';
import ProductDetail from './ProductDetail';

export function generateStaticParams() {
  return MENU.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }) {
  const item = getItem(params.slug);
  if (!item) return {};
  return { title: item.name, description: item.description };
}

export default function ProductPage({ params }) {
  const item = getItem(params.slug);
  if (!item) notFound();
  return <ProductDetail slug={item.slug} />;
}
