import { formatPrice } from '../../lib/formatters';

export default function ProductCard({ product, onQuickView }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-premium-dark">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-black/70 via-premium-black/0 to-premium-black/0" />
        {product.style ? (
          <span className="absolute left-3 top-3 rounded-full bg-premium-black/70 px-3 py-1 text-xs font-semibold text-brand-amber ring-1 ring-brand-amber/30">
            {product.style}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-white">{product.name}</h3>
        <p className="mt-1 text-sm text-body-muted">
          Xuất xứ: <span className="text-white/90">{product.origin}</span>
          {product.abv ? (
            <>
              {' '}
              · ABV: <span className="text-white/90">{product.abv}</span>
            </>
          ) : null}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-body-muted">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-lg font-bold text-brand-amber">{formatPrice(product.price)}</div>
          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-brand-amber/50 bg-premium-black/50 px-4 text-sm font-semibold text-brand-amber transition hover:border-brand-amber hover:bg-premium-black"
          >
            Xem nhanh
          </button>
        </div>
      </div>
    </article>
  );
}
