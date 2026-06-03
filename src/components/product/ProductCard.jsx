import { formatPrice } from '../../lib/formatters';
import { productPath } from '../../lib/products';
import { navigate } from '../../lib/router';

export default function ProductCard({ product, compact = false }) {
  const href = productPath(product);

  const openDetail = (e) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <a
      href={href}
      onClick={openDetail}
      aria-label={`Xem chi tiết ${product.name}`}
      className={[
        'group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-premium-dark text-left transition',
        'hover:border-brand-amber/45 hover:shadow-lg hover:shadow-black/40',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber',
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-black/80 via-premium-black/10 to-transparent" />
        {product.style ? (
          <span className="absolute left-2 top-2 rounded-full bg-premium-black/75 px-2.5 py-1 text-[10px] font-semibold text-brand-amber ring-1 ring-brand-amber/30 sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            {product.style}
          </span>
        ) : null}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? 'p-3 sm:p-4' : 'p-5'}`}>
        <h3 className={`line-clamp-2 font-semibold text-white ${compact ? 'text-sm sm:text-base' : 'text-base'}`}>
          {product.name}
        </h3>
        <p className={`mt-1 text-body-muted ${compact ? 'text-xs sm:text-sm' : 'text-sm'}`}>
          Xuất xứ: <span className="text-white/90">{product.origin}</span>
          {product.abv ? (
            <>
              {' '}
              · ABV: <span className="text-white/90">{product.abv}</span>
            </>
          ) : null}
        </p>

        {!compact ? (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-body-muted">{product.description}</p>
        ) : null}

        <div className={`mt-auto flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3 ${compact ? 'mt-3' : 'mt-4'}`}>
          <div className={`font-bold text-brand-amber ${compact ? 'text-sm sm:text-base' : 'text-lg'}`}>
            {formatPrice(product.price)}
          </div>
          <span
            className={`shrink-0 font-medium text-brand-amber/70 transition group-hover:text-brand-amber ${compact ? 'text-xs' : 'text-sm'}`}
            aria-hidden
          >
            Chi tiết →
          </span>
        </div>
      </div>
    </a>
  );
}
