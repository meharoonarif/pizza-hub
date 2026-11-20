'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SITE } from './data';

const CartContext = createContext(null);
const CART_KEY = 'pizzahub_cart_v1';
const ORDERS_KEY = 'pizzahub_orders_v1';
const PREFS_KEY = 'pizzahub_prefs_v1';

const read = (key, fallback) => {
  try {
    const v = window.localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [prefs, setPrefs] = useState({ orderType: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(read(CART_KEY, []));
    setOrders(read(ORDERS_KEY, []));
    setPrefs(read(PREFS_KEY, { orderType: null }));
    setReady(true);
  }, []);

  useEffect(() => { if (ready) write(CART_KEY, items); }, [items, ready]);
  useEffect(() => { if (ready) write(ORDERS_KEY, orders); }, [orders, ready]);
  useEffect(() => { if (ready) write(PREFS_KEY, prefs); }, [prefs, ready]);

  // A line is identified by item + size + extras + note
  const lineKey = (l) => [l.slug, l.size, (l.extras || []).map((e) => e.id).sort().join('+'), l.note || ''].join('|');

  const addItem = (line) => {
    setItems((prev) => {
      const key = lineKey(line);
      const found = prev.find((p) => lineKey(p) === key);
      if (found) return prev.map((p) => (lineKey(p) === key ? { ...p, qty: p.qty + line.qty } : p));
      return [...prev, { ...line, id: key + '|' + Date.now() }];
    });
  };
  const setLineExtras = (id, extras) => setItems((prev) => {
    const line = prev.find((p) => p.id === id);
    if (!line) return prev;
    const updated = { ...line, extras };
    const key = lineKey(updated);
    const twin = prev.find((p) => p.id !== id && lineKey(p) === key);
    if (twin) return prev.filter((p) => p.id !== id).map((p) => (p.id === twin.id ? { ...p, qty: p.qty + line.qty } : p));
    return prev.map((p) => (p.id === id ? updated : p));
  });
  const setQty = (id, qty) => setItems((prev) => (qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => (p.id === id ? { ...p, qty } : p))));
  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const unitPrice = (l) => l.price + (l.extras || []).reduce((s, e) => s + e.price, 0);
  const count = items.reduce((s, l) => s + l.qty, 0);
  const subtotal = items.reduce((s, l) => s + unitPrice(l) * l.qty, 0);
  const deliveryFee = prefs.orderType === 'pickup' || count === 0 ? 0 : SITE.deliveryFee;
  const total = subtotal + deliveryFee;

  const saveOrder = (order) => setOrders((prev) => [order, ...prev].slice(0, 20));
  const setOrderType = (orderType) => setPrefs((p) => ({ ...p, orderType }));

  const value = useMemo(
    () => ({ ready, items, orders, prefs, count, subtotal, deliveryFee, total, unitPrice, addItem, setQty, setLineExtras, removeItem, clear, saveOrder, setOrderType }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ready, items, orders, prefs, count, subtotal, deliveryFee, total]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
