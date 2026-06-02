import HeroSection from '../components/sections/HeroSection';
import BrandStorySection from '../components/sections/BrandStorySection';
import QuickActionsSection from '../components/sections/QuickActionsSection';
import UspSection from '../components/sections/UspSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import ReviewsSection from '../components/sections/ReviewsSection';
import AvailableAtSection from '../components/sections/AvailableAtSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="site-container">
        <BestSellersSection />
        <QuickActionsSection />
        <ReviewsSection />
        <BrandStorySection />
        <UspSection />
        <AvailableAtSection />
      </div>
    </>
  );
}
