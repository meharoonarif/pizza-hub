// Checkout field checks for Pakistan (Lahore) orders.

// Returns the phone as 03XXXXXXXXX (mobile) or 042XXXXXXXX (Lahore landline), or null if invalid.
export function normalizePhone(raw) {
  let d = String(raw || '').replace(/[^\d+]/g, '');
  if (d.startsWith('+92')) d = '0' + d.slice(3);
  else if (d.startsWith('0092')) d = '0' + d.slice(4);
  else if (d.startsWith('92') && d.length === 12) d = '0' + d.slice(2);
  else if (d.startsWith('3') && d.length === 10) d = '0' + d;
  d = d.replace(/\D/g, '');
  if (/^03[0-4]\d{8}$/.test(d)) return /^03\d(\d)\1{7}$/.test(d) ? null : d; // mobile, reject 0300 0000000-style junk
  if (/^042\d{8}$/.test(d)) return d; // Lahore landline
  return null;
}

export const formatPhone = (d) => (d.startsWith('042') ? `${d.slice(0, 3)} ${d.slice(3)}` : `${d.slice(0, 4)} ${d.slice(4)}`);

export function phoneError(raw) {
  if (!String(raw || '').trim()) return 'Please enter your phone number.';
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length < 10) return 'This number is too short. Use 11 digits, e.g. 0321 1234567.';
  if (!normalizePhone(raw)) return 'Please enter a valid Pakistani number, e.g. 0321 1234567 or +92 321 1234567.';
  return '';
}

export function nameError(raw) {
  const v = String(raw || '').trim();
  if (!v) return 'Please enter your name.';
  if (v.replace(/[^A-Za-z؀-ۿ]/g, '').length < 2) return 'Please enter a real name (letters only).';
  if (/\d/.test(v)) return 'Names can’t contain numbers.';
  return '';
}

const ADDRESS_WORDS = /\b(house|home|h\s?#|h\.?\s?no|flat|apt|apartment|plot|street|st|gali|road|rd|block|phase|sector|lane|colony|town|society|scheme|park|bazar|bazaar|chowk|mohalla|near|opposite|opp|behind|floor|building|plaza|dha|johar|model|garden|cantt|iqbal)\b/i;

export function addressError(raw) {
  const v = String(raw || '').trim();
  if (!v) return 'Please enter your delivery address.';
  const words = v.split(/\s+/).filter((w) => /[A-Za-z؀-ۿ0-9]/.test(w));
  if (v.length < 15 || words.length < 3) return 'This address looks too short. Add house no., street and area.';
  if (/(.)\1{4,}/.test(v) || !/[A-Za-z؀-ۿ]/.test(v)) return 'Please enter a real address.';
  if (!/\d/.test(v) && !ADDRESS_WORDS.test(v)) return 'Add your house/flat number or street so our rider can find you.';
  return '';
}
