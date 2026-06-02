import { useMemo, useState } from 'react';
import { mockProducts } from '../mockData';
import { getSearchParam, navigate, useLocation } from '../lib/router';
import ProductGrid from '../components/product/ProductGrid';
import ProductQuickViewModal from '../components/product/ProductQuickViewModal';

export default function SearchPage() {
  const { search } = useLocation();
  const q = getSearchParam(search, 'q').trim();
  const products = useMemo(() => mockProducts ?? [], []);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    if (!query) return [];
    return products.filter((p) => {
      const haystack = `${p.name ?? ''} ${p.origin ?? ''} ${p.abv ?? ''}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [products, q]);

  return (
    <section className="pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-normal text-premium-gold">TÌM KIẾM</div>
          <h1 className="mt-2 text-3xl font-semibold">Kết quả tìm kiếm</h1>
          <p className="mt-2 text-sm text-white/70">
            Từ khoá: <span className="text-white/85">“{q || '—'}”</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 bg-premium-dark px-4 text-sm font-semibold text-white/90 hover:border-premium-gold/60"
        >
          ← Về trang chủ
        </button>
      </div>

      <div className="mt-6 text-sm text-white/60">
        {q ? (
          <>
            {filtered.length}/{products.length} sản phẩm
          </>
        ) : (
          'Nhập từ khoá ở thanh tìm kiếm để bắt đầu.'
        )}
      </div>

      <div className="mt-6">
        {q && filtered.length > 0 ? (
          <ProductGrid products={filtered} onQuickView={(p) => setActive(p)} />
        ) : q ? (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-white/70">
            Không tìm thấy sản phẩm phù hợp. Hãy thử từ khoá khác.
          </div>
        ) : null}
      </div>

      <ProductQuickViewModal open={Boolean(active)} product={active} onClose={() => setActive(null)} />
    </section>
  );
}

