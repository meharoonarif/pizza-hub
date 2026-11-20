import { Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusBar from '@/components/StatusBar';
import CartBar from '@/components/CartBar';
import WhatsAppButton from '@/components/WhatsAppButton';
import OrderTypeModal from '@/components/OrderTypeModal';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });

export const metadata = {
  title: { default: 'Pizza Hub Lahore — Late-night pizza delivery till 3 AM', template: '%s · Pizza Hub' },
  description: 'Order hand-stretched pizzas and pasta in Lahore. Open every day 2 PM – 3 AM. Delivery and pickup, order on WhatsApp.',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/images/icon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: '/images/apple-touch-icon.png',
  },
  metadataBase: new URL('https://pizzahub.pk'),
  openGraph: { title: 'Pizza Hub Lahore', url: 'https://pizzahub.pk', siteName: 'Pizza Hub', description: 'Hot pizza, late into the night. Open 2 PM – 3 AM.', images: ['/images/logo.png'] },
};

export const viewport = { themeColor: '#007545' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <CartProvider>
          <StatusBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartBar />
          <WhatsAppButton />
          <OrderTypeModal />
        </CartProvider>
      </body>
    </html>
  );
}
