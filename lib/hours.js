import { SITE } from './data';

// Current time in Pakistan (Asia/Karachi), independent of the visitor's timezone.
export function pakistanNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', weekday: 'long', hour12: false,
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return { h: Number(get('hour')) % 24, m: Number(get('minute')), s: Number(get('second')), weekday: get('weekday') };
}

export function isOpen(now = pakistanNow()) {
  const { openHour, closeHour } = SITE;
  if (openHour < closeHour) return now.h >= openHour && now.h < closeHour;
  return now.h >= openHour || now.h < closeHour; // closes after midnight
}

// Seconds until the shop opens again (0 if open).
export function secondsUntilOpen(now = pakistanNow()) {
  if (isOpen(now)) return 0;
  const cur = now.h * 3600 + now.m * 60 + now.s;
  let target = SITE.openHour * 3600;
  if (target <= cur) target += 24 * 3600;
  return target - cur;
}

export function formatCountdown(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}
