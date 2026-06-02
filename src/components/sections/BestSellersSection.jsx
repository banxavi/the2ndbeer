import { useMemo, useState } from 'react';
import { mockProducts } from '../../mockData';
import ProductGrid from '../product/ProductGrid';
import ProductQuickViewModal from '../product/ProductQuickViewModal';

export default function BestSellersSection() {
  const products = useMemo(() => mockProducts ?? [], []);
  const [active, setActive] = useState(null);

  return (
    <section id="products" className="pt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-widest text-premium-gold">BEST SELLERS</div>
          <h2 className="mt-2 text-2xl font-semibold">Sản phẩm nổi bật</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Danh sách được render động từ mock data để đảm bảo tốc độ tải nhanh và không phụ thuộc backend.
          </p>
        </div>
        <a
          href="#products"
          className="hidden rounded-md border border-premium-gold/60 bg-premium-black/45 px-4 py-2 text-sm font-semibold text-premium-gold shadow-lg shadow-black/20 ring-1 ring-premium-gold/15 transition hover:-translate-y-0.5 hover:border-premium-gold/80 hover:bg-premium-black/55 hover:shadow-black/30 active:translate-y-0 sm:inline-flex"
        >
          Xem thêm
        </a>
      </div>

      <div className="mt-6">
        <ProductGrid products={products} onQuickView={(p) => setActive(p)} />
      </div>

      <ProductQuickViewModal open={Boolean(active)} product={active} onClose={() => setActive(null)} />
    </section>
  );
}

