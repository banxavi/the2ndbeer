import { useMemo, useState } from 'react';
import { mockProducts } from '../../mockData';
import ProductGrid from '../product/ProductGrid';
import ProductQuickViewModal from '../product/ProductQuickViewModal';
import PrimaryCta from '../ui/PrimaryCta';
import FadeInSection from '../ui/FadeInSection';

export default function BestSellersSection() {
  const products = useMemo(() => (mockProducts ?? []).slice(0, 4), []);
  const [active, setActive] = useState(null);

  return (
    <FadeInSection id="products" className="pt-10 sm:pt-12">
      <div>
        <div className="text-xs font-semibold tracking-normal text-brand-amber">SẢN PHẨM NỔI BẬT</div>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Chọn lon thứ hai của bạn</h2>
        <p className="mt-2 max-w-2xl text-sm text-body-muted">
          Bia nhập khẩu chọn lọc — đủ phong cách từ lager nhẹ đến ale đậm vị.
        </p>
      </div>

      <div className="mt-6">
        <ProductGrid products={products} onQuickView={(p) => setActive(p)} />
      </div>


      <ProductQuickViewModal open={Boolean(active)} product={active} onClose={() => setActive(null)} />
    </FadeInSection>
  );
}
