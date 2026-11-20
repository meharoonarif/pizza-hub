import PageHero from '@/components/PageHero';
import FeedbackForm from '@/components/FeedbackForm';
import { SITE } from '@/lib/data';

export const metadata = { title: 'Contact', description: 'Contact Pizza Hub Lahore on WhatsApp, phone or email. Complaints and feedback welcome.' };

export default function ContactPage() {
  const tiles = [
    ['WhatsApp', SITE.whatsappDisplay, `https://wa.me/${SITE.whatsapp}`, 'bg-brand text-white'],
    ['Call us', SITE.phones[1] || SITE.phones[0], `tel:${(SITE.phones[1] || SITE.phones[0]).replace(/\s/g, '')}`, 'bg-sun text-black'],
    ['Email', SITE.email, `mailto:${SITE.email}`, 'bg-black text-white'],
    ['Visit', 'Kacha Jail Rd, Lahore', SITE.mapsUrl, 'bg-flame text-black'],
  ];
  return (
    <>
      <PageHero crumb="Contact" eyebrow="GET IN TOUCH" title="Talk to Pizza Hub" sub="Questions, complaints or catering orders: we reply on WhatsApp within minutes during opening hours." />
      <div className="mx-auto grid max-w-[1440px] gap-3 px-4 pt-8 md:grid-cols-4 md:gap-5 md:px-16 md:pt-12">
        {tiles.map(([label, value, href, cls]) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`flex items-center justify-between rounded-xl p-5 md:flex-col md:items-start md:gap-1.5 md:rounded-[16px] md:p-6 ${cls}`}>
            <span className="text-xs font-bold uppercase opacity-75">{label}</span>
            <span className="text-[15px] font-bold md:text-[17px]">{value}</span>
          </a>
        ))}
      </div>
      <FeedbackForm />
    </>
  );
}
