import { useState } from 'react';

export default function ProductImageGallery({ images, alt, styleLabel }) {
  const slides = images?.length ? images : [];
  const [index, setIndex] = useState(0);
  const safeIndex = Math.min(index, Math.max(0, slides.length - 1));

  if (!slides.length) return null;

  const go = (dir) => {
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  };

  return (
    <div className="product-gallery overflow-hidden rounded-2xl border border-white/10 bg-premium-dark">
      <div className="product-gallery-viewport relative">
        {styleLabel ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-premium-black/80 px-3 py-1 text-xs font-semibold text-brand-amber ring-1 ring-brand-amber/30">
            {styleLabel}
          </span>
        ) : null}

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="product-gallery-nav product-gallery-nav--prev"
              aria-label="Ảnh trước"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="product-gallery-nav product-gallery-nav--next"
              aria-label="Ảnh sau"
            >
              ›
            </button>
          </>
        ) : null}

        <div className="product-media-well product-detail-media product-gallery-media">
          <img
            key={slides[safeIndex]}
            src={slides[safeIndex]}
            alt={alt}
            className="product-media-well__img"
          />
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="flex justify-center gap-2 border-t border-white/[0.06] px-4 py-3">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              aria-current={i === safeIndex ? 'true' : undefined}
              className={[
                'h-14 w-14 overflow-hidden rounded-md border transition',
                i === safeIndex ? 'border-brand-amber/70 ring-1 ring-brand-amber/30' : 'border-white/15 opacity-70 hover:opacity-100',
              ].join(' ')}
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
