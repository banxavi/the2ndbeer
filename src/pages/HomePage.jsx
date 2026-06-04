import { useEffect } from 'react';
import HeroSection from '../components/sections/HeroSection';
import BrandStorySection from '../components/sections/BrandStorySection';
import UspSection from '../components/sections/UspSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import ValueDealsSection from '../components/sections/ValueDealsSection';
import ReviewsSection from '../components/sections/ReviewsSection';
import AvailableAtSection from '../components/sections/AvailableAtSection';
import { isHomePath, scrollToSection, useLocation } from '../lib/router';

export default function HomePage() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!isHomePath(pathname)) return;
    const id = (hash ?? '').replace(/^#/, '');
    if (id) scrollToSection(id);
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, key]);

  return (
    <>
      <HeroSection />
      <div className="site-container">
        <BestSellersSection />
        <ValueDealsSection />
        <ReviewsSection />
        <BrandStorySection />
        <UspSection />
        <AvailableAtSection />
      </div>
    </>
  );
}
