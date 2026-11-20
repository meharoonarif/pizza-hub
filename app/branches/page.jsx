import PageHero from '@/components/PageHero';
import BranchesSection from '@/components/BranchesSection';
import FindUs from '@/components/FindUs';
import { SHOW_BRANCHES } from '@/lib/data';

export const metadata = { title: 'Find Us in Lahore', description: 'Find Pizza Hub in Lahore. Open every day 2 PM – 3 AM.' };

export default function BranchesPage() {
  // While SHOW_BRANCHES is false this page only shows where to find us.
  return (
    <>
      <PageHero crumb={SHOW_BRANCHES ? 'Branches' : 'Find Us'} eyebrow="LAHORE" title={SHOW_BRANCHES ? 'Our Branches' : 'Find Us'} sub="Open every day from 2 PM till 3 AM." />
      {SHOW_BRANCHES && <BranchesSection />}
      <FindUs />
    </>
  );
}
