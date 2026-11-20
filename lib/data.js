// =====================================================================
//  PIZZA HUB — EDIT YOUR SHOP DETAILS, MENU AND PRICES HERE
//  Everything on the website reads from this one file.
// =====================================================================

export const SITE = {
  name: 'Pizza Hub',
  tagline: 'Fresh pizza made with premium ingredients, delivered hot across Lahore from 2 PM till 3 AM.',
  // WhatsApp numbers in international format, digits only (no +, no spaces)
  whatsapp: '923206000059',
  whatsappDisplay: '+92 320 6000059',
  phones: ['+92 320 6000059', '+92 308 4415566'],
  email: 'pizzahub@gmail.com',
  address: 'Kacha Jail Rd, near Shanghai Bridge, Amar Sidhu Chungi, Lahore 54600',
  // Exact pin of the Pizza Hub listing on Google Maps
  location: { lat: 31.4485868, lng: 74.3517076, placeId: 'ChIJ8zBdM2oHGTkRLp9myevu5gA' },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pizza+Hub+Kacha+Jail+Rd+Lahore&query_place_id=ChIJ8zBdM2oHGTkRLp9myevu5gA',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=31.4485868,74.3517076&destination_place_id=ChIJ8zBdM2oHGTkRLp9myevu5gA',
  // Opening hours (Pakistan time). Closing after midnight is supported.
  openHour: 14, // 2 PM
  closeHour: 3, // 3 AM
  hoursLabel: '2 PM – 3 AM',
  deliveryFee: 100, // TODO: set your real delivery fee (Rs.)
  etaLabel: '35–45 min',
  socials: {
    facebook: '#',
    instagram: '#',
    tiktok: '#',
  },
};

// Branches — replace the placeholder addresses / numbers with your real ones.
export const BRANCHES = [
  {
    id: 'branch-1',
    name: 'Branch 1',
    area: 'Kacha Jail Rd, Lahore',
    address: 'Kacha Jail Rd, near Shanghai Bridge, Amar Sidhu Chungi, Lahore',
    phone: '+92 320 6000059',
    whatsapp: '923206000059',
    hours: '2 PM – 3 AM',
    main: true,
  },
  {
    id: 'branch-2',
    name: 'Branch 2',
    area: 'Area name, Lahore',
    address: 'Your branch address, Lahore',
    phone: '+92 308 4415566',
    whatsapp: '923084415566',
    hours: '2 PM – 3 AM',
  },
  {
    id: 'branch-3',
    name: 'Branch 3',
    area: 'Area name, Lahore',
    address: 'Your branch address, Lahore',
    phone: '+92 320 6000059',
    whatsapp: '923206000059',
    hours: '2 PM – 3 AM',
  },
];

export const CATEGORIES = [
  { id: 'classic', name: 'Classic Pizzas' },
  { id: 'specialty', name: 'Specialty Pizzas' },
  { id: 'pasta', name: 'Pasta' },
];

// image: put the photo in /public/images/menu/ with this file name.
// Missing photos fall back to a "photo coming soon" illustration.
export const MENU = [
  { slug: 'chicken-tikka', name: 'Chicken Tikka', category: 'classic', tag: 'Bestseller', image: '/images/menu/chicken-tikka.webp',
    description: 'Smoky chicken tikka, onions, capsicum and stretchy mozzarella on our hand-stretched base.',
    sizes: [{ name: 'Small', price: 250 }, { name: 'Medium', price: 450 }, { name: 'Large', price: 699 }] },
  { slug: 'chicken-fajita', name: 'Chicken Fajita', category: 'classic', image: '/images/menu/chicken-fajita.webp',
    description: 'Fajita-spiced chicken with peppers, onions, olives and mozzarella.',
    sizes: [{ name: 'Small', price: 250 }, { name: 'Medium', price: 450 }, { name: 'Large', price: 699 }] },

  { slug: 'pizza-hub-special', name: 'Pizza Hub Special', category: 'specialty', tag: 'House favourite', image: '/images/menu/pizza-hub-special.webp',
    description: 'Our signature pizza loaded with chicken, mushrooms, olives, peppers and extra cheese.',
    sizes: [{ name: 'Medium', price: 700 }, { name: 'Large', price: 1080 }] },
  { slug: 'kebab-stuffer', name: 'Kebab Stuffer', category: 'specialty', tag: 'New', image: '/images/menu/kebab-stuffer.webp',
    description: 'Every crust stuffed with juicy seekh kebab, topped with house sauce, onions, green chillies and mozzarella.',
    sizes: [{ name: 'Medium', price: 880 }, { name: 'Large', price: 1280 }] },
  { slug: 'crown-crust', name: 'Crown Crust', category: 'specialty', image: '/images/menu/crown-crust.webp',
    description: 'A crown of cheesy bites around a loaded chicken pizza.',
    sizes: [{ name: 'Medium', price: 880 }, { name: 'Large', price: 1280 }] },
  { slug: 'mughlai', name: 'Mughlai', category: 'specialty', image: '/images/menu/mughlai.webp',
    description: 'Rich Mughlai-style chicken with onions and a creamy, spiced sauce.',
    sizes: [{ name: 'Medium', price: 650 }, { name: 'Large', price: 980 }] },
  { slug: 'bbq', name: 'BBQ', category: 'specialty', image: '/images/menu/bbq.webp',
    description: 'BBQ chicken, onions and peppers with a smoky BBQ drizzle.',
    sizes: [{ name: 'Small', price: 350 }, { name: 'Medium', price: 650 }, { name: 'Large', price: 980 }] },
  { slug: 'malai-boti', name: 'Malai Boti', category: 'specialty', image: '/images/menu/malai-boti.webp',
    description: 'Creamy malai boti chicken with onions, peppers and a white garlic swirl.',
    sizes: [{ name: 'Small', price: 350 }, { name: 'Medium', price: 650 }, { name: 'Large', price: 980 }] },
  { slug: 'behari-kebab', name: 'Behari Kebab', category: 'specialty', image: '/images/menu/behari-kebab.webp',
    description: 'Tender behari kebab, onions and green chillies with mayo garlic sauce.',
    sizes: [{ name: 'Small', price: 350 }, { name: 'Medium', price: 650 }, { name: 'Large', price: 980 }] },
  { slug: 'creamy', name: 'Creamy', category: 'specialty', image: '/images/menu/creamy.webp',
    description: 'Chicken, mushrooms and olives in a smooth, creamy white sauce.',
    sizes: [{ name: 'Small', price: 350 }, { name: 'Medium', price: 650 }, { name: 'Large', price: 980 }] },
  { slug: 'peri-peri', name: 'Peri Peri', category: 'specialty', tag: 'Spicy', image: '/images/menu/peri-peri.webp',
    description: 'Fiery peri peri chicken, jalapeños and onions with a peri peri drizzle.',
    sizes: [{ name: 'Small', price: 350 }, { name: 'Medium', price: 650 }, { name: 'Large', price: 980 }] },

  { slug: 'creamy-pasta', name: 'Creamy Pasta', category: 'pasta', image: '/images/menu/creamy-pasta.webp',
    description: 'Penne in a rich, creamy white sauce with chicken and herbs, baked with cheese.',
    sizes: [{ name: 'Regular', price: 400 }, { name: 'Large', price: 750 }] },
  { slug: 'grilled-pasta', name: 'Grilled Pasta', category: 'pasta', image: '/images/menu/grilled-pasta.webp',
    description: 'Grilled chicken pasta in a smoky red sauce, topped with melted cheese.',
    sizes: [{ name: 'Regular', price: 450 }, { name: 'Large', price: 800 }] },
];

// Optional add-ons, chosen on the cart page for each pizza.
// TODO: these prices are PLACEHOLDERS — set your real prices, or delete any line you don't offer.
export const EXTRAS = [
  { id: 'cheese', name: 'Extra Cheese', price: 100 },
  { id: 'chicken', name: 'Extra Chicken', price: 150 },
  { id: 'jalapeno', name: 'Jalapeños', price: 50 },
  { id: 'olives', name: 'Olives', price: 50 },
];

// Branches section. Set to true to show the Branches section again (home page, footer link, Branches page).
export const SHOW_BRANCHES = false;

// Deals. SAMPLE prices — replace with your real deals, or set SHOW_DEALS = false.
export const SHOW_DEALS = false; // no deals for now
export const DEALS = [
  { id: 'midnight-duo', name: 'Midnight Duo', includes: '2 Medium Classic pizzas', price: 850, oldPrice: 900, when: 'After 12 AM',
    images: ['/images/menu/chicken-tikka.webp', '/images/menu/chicken-fajita.webp'], tone: 'sun' },
  { id: 'kebab-lovers', name: 'Kebab Lovers', includes: 'Medium Kebab Stuffer + Medium Behari Kebab', price: 1450, oldPrice: 1530, when: 'All day',
    images: ['/images/menu/kebab-stuffer.webp', '/images/menu/behari-kebab.webp'], tone: 'brand' },
  { id: 'pizza-pasta', name: 'Pizza & Pasta', includes: 'Medium Specialty pizza + Creamy Pasta', price: 1000, oldPrice: 1050, when: 'All day',
    images: ['/images/menu/peri-peri.webp', '/images/menu/creamy-pasta.webp'], tone: 'black' },
  { id: 'family-feast', name: 'Family Feast', includes: '2 Large Specialty pizzas + Grilled Pasta', price: 2350, oldPrice: 2410, when: 'Weekends',
    images: ['/images/menu/crown-crust.webp', '/images/menu/mughlai.webp', '/images/menu/grilled-pasta.webp'], tone: 'flame' },
];

export const FAQ = [
  ['What are your opening hours?', 'We’re open every day, Monday to Sunday, from 2:00 PM to 3:00 AM.'],
  ['Do you deliver across Lahore?', 'Yes, we deliver across Lahore from our shop near Shanghai Bridge. Add your address at checkout and we’ll confirm on WhatsApp.'],
  ['How long does delivery take?', 'Usually 35–45 minutes, depending on distance and the late-night rush.'],
  ['Which payment methods do you accept?', 'Cash on delivery, JazzCash and EasyPaisa. Choose one at checkout and we’ll confirm on WhatsApp.'],
  ['How do I order?', 'Add items to your cart and tap “Place order”. WhatsApp opens with your full order ready to send to the branch.'],
  ['How do I make a complaint?', 'Use the feedback form on our Contact page. It opens WhatsApp for the branch you choose.'],
  ['Can I schedule an order for later?', 'Yes, choose “Schedule for later” at checkout and pick any time before 3 AM.'],
];

export const formatPrice = (n) => 'Rs. ' + Number(n).toLocaleString('en-PK');
export const fromPrice = (item) => Math.min(...item.sizes.map((s) => s.price));
export const getItem = (slug) => MENU.find((m) => m.slug === slug);
export const PLACEHOLDER = (item) => (item && item.category === 'pasta' ? '/images/menu/placeholder-pasta.svg' : '/images/menu/placeholder-pizza.svg');
