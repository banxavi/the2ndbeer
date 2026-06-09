import { resolveProductPrice } from '../../lib/pricing';

export default function ProductPrice({ product, size = 'md', className = '' }) {
  const resolved = resolveProductPrice(product);

  const mainClass =
    size === 'lg'
      ? 'text-2xl font-bold sm:text-3xl'
      : size === 'sm'
        ? 'text-sm font-bold sm:text-base'
        : 'text-lg font-bold';

  if (resolved.mode === 'contact') {
    return (
      <div className={`text-center ${className}`.trim()}>
        <span className={`${mainClass} tracking-wide text-brand-amber`}>{resolved.label}</span>
      </div>
    );
  }

  if (resolved.mode === 'sale') {
    return (
      <div className={`relative flex min-h-[2.5rem] items-center justify-center ${className}`.trim()}>
        <span className="absolute left-0 text-sm text-body-muted line-through sm:text-base">{resolved.original}</span>
        <span className={`${mainClass} text-brand-amber`}>{resolved.sale}</span>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`.trim()}>
      <span className={`${mainClass} text-brand-amber`}>{resolved.price}</span>
    </div>
  );
}
