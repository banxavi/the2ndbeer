import { useMemo } from 'react';
import { mockProducts } from '../mockData';
import { getSearchParam, navigateHome, useLocation } from '../lib/router';
import ProductGrid from '../components/product/ProductGrid';

export default function SearchPage() {
  const { search } = useLocation();
  const q = getSearchParam(search, 'q').trim();
  const products = useMemo(() => mockProducts ?? [], []);

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    if (!query) return [];
    return products.filter((p) => {
      const haystack = `${p.name ?? ''} ${p.origin ?? ''} ${p.abv ?? ''} ${p.style ?? ''}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [products, q]);

  return (
    <div className="site-container pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-normal text-brand-amber">TÌM KIẾM · THE 2ND BEER</div>
          <h1 className="mt-2 text-3xl font-semibold">Kết quả tìm kiếm</h1>
          <p className="mt-2 text-sm text-body-muted">
            Từ khoá: <span className="text-white/85">“{q || '—'}”</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateHome()}
          className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 bg-premium-dark px-4 text-sm font-semibold text-white/90 hover:border-brand-amber/60"
        >
          ← Về trang chủ
        </button>
      </div>

      <div className="mt-6 text-sm text-body-muted">
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
          <ProductGrid products={filtered} />
        ) : q ? (
          <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 text-sm text-body-muted">
            Không tìm thấy sản phẩm phù hợp. Hãy thử từ khoá khác.
          </div>
        ) : null}
      </div>
    </div>
  );
}
