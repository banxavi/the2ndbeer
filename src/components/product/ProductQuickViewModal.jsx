import { useEffect } from 'react';
import { formatPrice } from '../../lib/formatters';
import { buildTelHref, buildZaloHref } from '../../lib/links';

const HOTLINE = '0907566279';

export default function ProductQuickViewModal({ open, product, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-premium-black shadow-2xl"
        >
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-premium-black/55 via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-premium-gold">SẢN PHẨM</div>
                  <h3 className="mt-2 text-xl font-semibold leading-snug">{product.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 w-11 rounded-md border border-white/10 bg-premium-dark text-lg hover:border-premium-gold/60"
                >
                  ×
                </button>
              </div>

              <div className="mt-3 text-sm text-white/70">
                Xuất xứ: <span className="text-white/85">{product.origin}</span> · ABV:{' '}
                <span className="text-white/85">{product.abv}</span>
              </div>

              <div className="mt-4 text-2xl font-bold text-premium-gold">{formatPrice(product.price)}</div>

              <p className="mt-4 text-sm leading-relaxed text-white/70">{product.description}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={buildZaloHref(HOTLINE)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#007bff] font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#006ae0] hover:shadow-black/40 active:translate-y-0"
                >
                  <img
                    className="icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                    alt="Zalo"
                    loading="lazy"
                  />
                  Zalo tư vấn
                </a>
                <a
                  href={buildTelHref(HOTLINE)}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-[#9B1321] font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-[#82101b] hover:shadow-black/40 active:translate-y-0"
                >
                  Gọi ngay
                </a>
              </div>

              <div className="mt-4 text-xs text-white/50">
                Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

