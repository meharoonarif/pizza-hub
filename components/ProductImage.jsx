'use client';

import { useEffect, useRef, useState } from 'react';
import { PLACEHOLDER } from '@/lib/data';

// Shows the item photo; falls back to a "photo coming soon" illustration if the file is missing.
export default function ProductImage({ item, src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  const url = failed ? PLACEHOLDER(item) : src || (item && item.image) || PLACEHOLDER(item);

  // If the image already failed before React hydrated, onError never fires — check manually.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [url]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={url} alt={alt || (item && item.name) || ''} loading="lazy" onError={() => setFailed(true)} className={className} />
  );
}
