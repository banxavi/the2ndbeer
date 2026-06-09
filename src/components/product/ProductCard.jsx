import { productPath } from '../../lib/products';
import { navigate } from '../../lib/router';
import ProductPrice from './ProductPrice';

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
      <div
        className={['product-media-well product-card-media', compact ? 'product-card-media--compact' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <img src={product.image} alt={product.name} loading="lazy" className="product-media-well__img" />
        {product.style ? (
          <span className="absolute left-2 top-2 rounded-full bg-premium-black/75 px-2.5 py-1 text-[10px] font-semibold text-brand-amber ring-1 ring-brand-amber/30 sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            {product.style}
          </span>
        ) : null}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? 'p-3 sm:p-4' : 'p-5'}`}>
        <h3 className={`line-clamp-2 text-center font-semibold text-white ${compact ? 'text-sm sm:text-base' : 'text-base'}`}>
          {product.name}
        </h3>

        {product.abv ? (
          <p className={`mt-1 text-center text-body-muted ${compact ? 'text-xs' : 'text-sm'}`}>
            ABV: <span className="text-white/90">{product.abv}</span>
          </p>
        ) : null}

        {!compact ? (
          <p className="mt-3 line-clamp-2 text-center text-sm leading-relaxed text-body-muted">{product.description}</p>
        ) : null}

        <div className={`mt-auto border-t border-white/[0.06] pt-3 ${compact ? 'mt-3' : 'mt-4'}`}>
          <ProductPrice product={product} size={compact ? 'sm' : 'md'} />
        </div>
      </div>
    </a>
  );
}
