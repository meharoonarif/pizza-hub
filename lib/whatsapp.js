import { formatPrice } from './data';

export const waLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export function buildOrderMessage({ orderId, items, unitPrice, subtotal, deliveryFee, total, form }) {
  const lines = [];
  lines.push(`🍕 *New order — Pizza Hub*`);
  lines.push(`Order: *${orderId}*`);
  lines.push('');
  items.forEach((l) => {
    const extras = l.extras && l.extras.length ? ` + ${l.extras.map((e) => e.name).join(', ')}` : '';
    lines.push(`• ${l.qty} × ${l.name} (${l.size})${extras} — ${formatPrice(unitPrice(l) * l.qty)}`);
    if (l.note) lines.push(`   Note: ${l.note}`);
  });
  lines.push('');
  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  if (form.orderType === 'delivery') lines.push(`Delivery fee: ${formatPrice(deliveryFee)}`);
  lines.push(`*Total: ${formatPrice(total)}*`);
  lines.push('');
  lines.push(`Type: ${form.orderType === 'delivery' ? 'Delivery' : 'Pickup'}`);
  lines.push(`Name: ${form.name}`);
  lines.push(`Phone: ${form.phone}`);
  if (form.orderType === 'delivery') lines.push(form.addressByCall ? 'Address: Will share over call 📞' : `Address: ${form.address}`);
  lines.push(`Payment: ${form.payment}`);
  if (form.notes) lines.push(`Notes: ${form.notes}`);
  return lines.join('\n');
}

export function buildFeedbackMessage({ topic, name, phone, orderId, rating, message }) {
  return [
    `💬 *${topic} — Pizza Hub website*`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    orderId ? `Order ID: ${orderId}` : null,
    rating ? `Rating: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}` : null,
    '',
    message,
  ].filter((x) => x !== null).join('\n');
}
