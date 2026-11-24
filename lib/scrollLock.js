'use client';

import { useEffect } from 'react';

// Stops the page behind a popup from scrolling (works on iPhone and Android too).
// Popups can stack (menu popup → size popup): the page unlocks when the last one closes.
let locks = 0;
let savedY = 0;

function lock() {
  if (locks++ > 0) return;
  savedY = window.scrollY;
  const b = document.body.style;
  b.position = 'fixed';
  b.top = `-${savedY}px`;
  b.left = '0';
  b.right = '0';
  b.width = '100%';
  b.overflow = 'hidden';
}

function unlock() {
  if (--locks > 0) return;
  locks = 0;
  const b = document.body.style;
  b.position = ''; b.top = ''; b.left = ''; b.right = ''; b.width = ''; b.overflow = '';
  window.scrollTo(0, savedY);
}

export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lock();
    return unlock;
  }, [active]);
}
