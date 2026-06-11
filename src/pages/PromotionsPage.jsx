import { useEffect, useMemo } from 'react';
import { BRAND } from '../data/brand';
import { mockValueProducts } from '../mockData';
import CatalogPageHeader from '../components/layout/CatalogPageHeader';
import ProductFeaturedCarousel from '../components/product/ProductFeaturedCarousel';

export default function PromotionsPage() {
  const products = useMemo(() => mockValueProducts ?? [], []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="site-container pt-10 pb-4">
      <CatalogPageHeader
        eyebrow="ƯU ĐÃI"
        title="Chương trình ưu đãi"
        description={`Khuyến mãi và gợi ý giá tốt từ ${BRAND.name} — cập nhật theo từng đợt.`}
      />

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-white sm:text-xl">Vang ngon giá tốt</h2>
        <p className="mt-2 text-sm text-body-muted">Sản phẩm đang giảm giá hoặc ưu đãi (mock).</p>
        <div className="mt-6">
          <ProductFeaturedCarousel products={products} variant="row" />
        </div>
      </div>
    </div>
  );
}
