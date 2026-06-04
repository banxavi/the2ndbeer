import { useEffect } from 'react';
import { formatPrice } from '../lib/formatters';
import { buildTelHref, buildZaloHref } from '../lib/links';
import { getProductBySlug, getRelatedProducts } from '../lib/products';
import { navigateHome } from '../lib/router';
import ProductCard from '../components/product/ProductCard';

const HOTLINE = '0907566279';

export default function ProductDetailPage({ productSlug }) {
  const product = getProductBySlug(productSlug);
  const related = product ? getRelatedProducts(product.id) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productSlug]);

  if (!product) {
    return (
      <div className="site-container py-16 text-center">
        <h1 className="text-2xl font-semibold text-white">Không tìm thấy sản phẩm</h1>
        <p className="mt-3 text-body-muted">Sản phẩm có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.</p>
        <button
          type="button"
          onClick={() => navigateHome()}
          className="mt-6 inline-flex min-h-11 items-center rounded-md border border-brand-amber/50 px-5 text-sm font-semibold text-brand-amber hover:border-brand-amber"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  const specs = [
    { label: 'Xuất xứ', value: product.origin },
    { label: 'Phong cách', value: product.style },
    { label: 'ABV', value: product.abv },
    { label: 'IBU', value: product.ibu ?? '—' },
    { label: 'Dung tích', value: product.volume ?? '—' },
    { label: 'Nhiệt độ uống', value: product.serveTemp ?? '—' },
    { label: 'Nhà máy', value: product.brewery ?? '—' },
  ];

  return (
    <article className="pb-16">
      <div className="site-container">
        <button
          type="button"
          onClick={() => navigateHome('#products')}
          className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-body-muted transition hover:text-brand-amber"
        >
          <span aria-hidden>←</span> Quay lại sản phẩm
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-premium-dark">
            <div className="product-media-well product-detail-media">
              <img src={product.image} alt={product.name} className="product-media-well__img" />
              {product.style ? (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-premium-black/80 px-3 py-1 text-xs font-semibold text-brand-amber ring-1 ring-brand-amber/30">
                  {product.style}
                </span>
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-normal text-brand-amber">CHI TIẾT SẢN PHẨM</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{product.name}</h1>
            {product.brewery ? (
              <p className="mt-2 text-sm text-body-muted">{product.brewery}</p>
            ) : null}

            <p className="mt-4 text-3xl font-bold text-brand-amber">{formatPrice(product.price)}</p>
            <p className="mt-4 text-base leading-relaxed text-body-muted">
              {product.longDescription ?? product.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-premium-dark/80 px-3 py-3"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-amber/80">
                    {s.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-white">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={buildZaloHref(HOTLINE)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#007bff] px-4 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-[#006ae0]"
              >
                <img
                  className="icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                  alt=""
                  loading="lazy"
                />
                Zalo tư vấn
              </a>
              <a
                href={buildTelHref(HOTLINE)}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#9B1321] px-4 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-[#82101b]"
              >
                Gọi {HOTLINE}
              </a>
            </div>

            <p className="mt-4 text-xs text-body-subtle">
              Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai.
            </p>
          </div>
        </div>

        {product.tastingNotes?.length ? (
          <section className="mt-12">
            <h2 className="text-lg font-semibold text-white">Hương vị đặc trưng</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.tastingNotes.map((note) => (
                <li
                  key={note}
                  className="rounded-full border border-brand-amber/25 bg-brand-amber/10 px-4 py-2 text-sm text-brand-amber"
                >
                  {note}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {product.foodPairing?.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-white">Gợi ý kết hợp món ăn</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {product.foodPairing.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/10 bg-premium-dark px-4 py-3 text-sm text-body-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {product.highlights?.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-white">Điểm nổi bật</h2>
            <ul className="mt-4 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-body-muted">
                  <span className="text-brand-amber" aria-hidden>
                    ✓
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-14 border-t border-white/10 pt-12">
            <h2 className="text-xl font-semibold text-white">Có thể bạn cũng thích</h2>
            <p className="mt-2 text-sm text-body-muted">Gợi ý thêm cho lon thứ hai của bạn.</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
