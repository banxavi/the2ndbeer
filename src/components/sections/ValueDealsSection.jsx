import { useMemo } from 'react';
import { mockValueProducts } from '../../mockData';
import ProductFeaturedCarousel from '../product/ProductFeaturedCarousel';
import FadeInSection from '../ui/FadeInSection';

export default function ValueDealsSection() {
  const products = useMemo(() => mockValueProducts ?? [], []);

  return (
    <FadeInSection className="pt-10 sm:pt-12">
      <div>
        <div className="brand-logo-gradient text-xs font-semibold tracking-normal">VANG NGON GIÁ TỐT</div>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Chọn chai hợp ví tiền</h2>
        <p className="mt-2 max-w-2xl text-sm text-body-muted">
          Rượu vang và bia giá tốt — một hàng, dễ so sánh, đổi trang bằng nút hai bên.
        </p>
      </div>

      <div className="mt-6">
        <ProductFeaturedCarousel products={products} variant="row" />
      </div>
    </FadeInSection>
  );
}
