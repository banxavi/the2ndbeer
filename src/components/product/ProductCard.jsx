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
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-white/95">{product.name}</h3>
        <p className="mt-1 text-xs text-white/60">
          Xuất xứ: <span className="text-white/75">{product.origin}</span> · ABV:{' '}
          <span className="text-white/75">{product.abv}</span>
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/70">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-lg font-bold text-premium-gold">{formatPrice(product.price)}</div>
          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className="inline-flex h-11 items-center justify-center rounded-md bg-premium-gold px-4 text-sm font-semibold text-premium-black shadow-lg shadow-black/30 ring-1 ring-premium-gold/30 hover:bg-yellow-600"
          >
            Xem nhanh
          </button>
        </div>
      </div>
    </article>
  );
}

