import HeroSection from '../components/sections/HeroSection';
import IntroSection from '../components/sections/IntroSection';
import QuickActionsSection from '../components/sections/QuickActionsSection';
import UspSection from '../components/sections/UspSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import CollectionsSection from '../components/sections/CollectionsSection';
import PoliciesSection from '../components/sections/PoliciesSection';
import KnowledgeSection from '../components/sections/KnowledgeSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <QuickActionsSection />
      <UspSection />
      <BestSellersSection />
      <CollectionsSection />
      <PoliciesSection />
      <KnowledgeSection />
    </>
  );
}
