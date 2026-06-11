import { useEffect, useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import { getProductsByCategory } from '../lib/catalog';
import CatalogPageHeader from '../components/layout/CatalogPageHeader';
import ProductGrid from '../components/product/ProductGrid';

export default function CategoryPage({ categoryKey }) {
  const meta = CATEGORIES[categoryKey];
  const products = useMemo(() => getProductsByCategory(categoryKey), [categoryKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [categoryKey]);

  if (!meta) {
    return (
      <div className="site-container py-16 text-center">
        <h1 className="text-2xl font-semibold text-white">Danh mục không tồn tại</h1>
      </div>
    );
  }

  return (
    <div className="site-container pt-10 pb-4">
      <CatalogPageHeader eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />

      <div className="mt-6 text-sm text-body-muted">
        {products.length > 0 ? `${products.length} sản phẩm` : 'Chưa có sản phẩm trong danh mục này.'}
      </div>

      <div className="mt-6">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-8 text-center">
            <p className="text-sm text-body-muted sm:text-base">
              Danh mục đang được chuẩn bị. Vui lòng liên hệ hotline để được tư vấn trực tiếp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
