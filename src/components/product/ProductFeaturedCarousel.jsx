import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ProductCard from './ProductCard';

const DESKTOP_PER_PAGE = 10;
const TABLET_PER_PAGE = 6;
const MOBILE_PER_PAGE = 4;
const AUTO_PLAY_MS = 10_000;

const gridClass =
  'grid grid-cols-2 grid-rows-2 gap-3 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 lg:grid-cols-5 lg:grid-rows-2 lg:gap-5';

function chunk(array, size) {
  const pages = [];
  for (let i = 0; i < array.length; i += size) {
    pages.push(array.slice(i, i + size));
  }
  return pages.length ? pages : [[]];
}

function usePerPage() {
  const [perPage, setPerPage] = useState(DESKTOP_PER_PAGE);

  useEffect(() => {
    const mqLg = window.matchMedia('(min-width: 1024px)');
    const mqSm = window.matchMedia('(min-width: 640px)');

    const update = () => {
      if (mqLg.matches) setPerPage(DESKTOP_PER_PAGE);
      else if (mqSm.matches) setPerPage(TABLET_PER_PAGE);
      else setPerPage(MOBILE_PER_PAGE);
    };

    update();
    mqLg.addEventListener('change', update);
    mqSm.addEventListener('change', update);
    return () => {
      mqLg.removeEventListener('change', update);
      mqSm.removeEventListener('change', update);
    };
  }, []);

  return perPage;
}

function NavButton({ direction, onClick, disabled, className = '' }) {
  const isPrev = direction === 'prev';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? 'Trang sản phẩm trước' : 'Trang sản phẩm sau'}
      className={[
        'absolute top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-premium-black/90 text-white shadow-xl shadow-black/50 backdrop-blur-sm transition',
        'hover:border-brand-amber/70 hover:bg-premium-dark hover:text-brand-amber',
        'disabled:pointer-events-none disabled:opacity-30',
        'sm:h-12 sm:w-12',
        className,
      ].join(' ')}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={isPrev ? 'M15 6L9 12L15 18' : 'M9 6L15 12L9 18'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function ProductFeaturedCarousel({ products }) {
  const perPage = usePerPage();
  const pages = useMemo(() => chunk(products, perPage), [products, perPage]);
  const [pageIndex, setPageIndex] = useState(0);
  const [slideInstant, setSlideInstant] = useState(false);

  const pagesLengthRef = useRef(pages.length);
  const intervalRef = useRef(null);

  const safeIndex = Math.min(pageIndex, Math.max(0, pages.length - 1));

  pagesLengthRef.current = pages.length;

  const clearAutoplay = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (pagesLengthRef.current <= 1) return;

    intervalRef.current = window.setInterval(() => {
      if (document.hidden) return;
      setPageIndex((i) => (i + 1) % pagesLengthRef.current);
    }, AUTO_PLAY_MS);
  }, [clearAutoplay]);

  useEffect(() => {
    setSlideInstant(true);
    setPageIndex(0);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSlideInstant(false));
    });
    return () => cancelAnimationFrame(id);
  }, [perPage, products.length]);

  useEffect(() => {
    if (pageIndex > pages.length - 1) {
      setPageIndex(Math.max(0, pages.length - 1));
    }
  }, [pageIndex, pages.length]);

  useEffect(() => {
    startAutoplay();

    const onVisibility = () => {
      if (document.hidden) clearAutoplay();
      else startAutoplay();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      clearAutoplay();
    };
  }, [pages.length, perPage, startAutoplay, clearAutoplay]);

  const restartAutoplay = useCallback(() => {
    startAutoplay();
  }, [startAutoplay]);

  const goPrev = useCallback(() => {
    setPageIndex((i) => (i <= 0 ? pages.length - 1 : i - 1));
    restartAutoplay();
  }, [pages.length, restartAutoplay]);

  const goNext = useCallback(() => {
    setPageIndex((i) => (i + 1) % pages.length);
    restartAutoplay();
  }, [pages.length, restartAutoplay]);

  const goToPage = useCallback(
    (index) => {
      if (index === safeIndex) return;
      setPageIndex(index);
      restartAutoplay();
    },
    [restartAutoplay, safeIndex],
  );

  const canPrev = pages.length > 1;
  const canNext = pages.length > 1;

  return (
    <div className="relative">
      <p className="mb-4 text-center text-sm text-body-muted sm:text-left">
        Trang {safeIndex + 1}/{pages.length}
        <span className="hidden sm:inline"> · {products.length} sản phẩm</span>
      </p>

      <div className="relative px-11 sm:px-14 lg:px-16">
        <NavButton direction="prev" onClick={goPrev} disabled={!canPrev} className="left-0 sm:left-1" />
        <NavButton direction="next" onClick={goNext} disabled={!canNext} className="right-0 sm:right-1" />

        <div
          className="carousel-viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label={`Sản phẩm nổi bật, trang ${safeIndex + 1}`}
          aria-live="polite"
        >
          <div
            className={['carousel-track', slideInstant ? 'carousel-track--instant' : ''].filter(Boolean).join(' ')}
            style={{ transform: `translate3d(-${safeIndex * 100}%, 0, 0)` }}
          >
            {pages.map((pageProducts, pageIdx) => (
              <div key={`${perPage}-page-${pageIdx}`} className="carousel-slide" aria-hidden={pageIdx !== safeIndex}>
                <div className={gridClass}>
                  {pageProducts.map((p) => (
                    <ProductCard key={p.id} product={p} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {pages.length > 1 ? (
        <div className="mt-5 flex justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToPage(i)}
              aria-label={`Đến trang ${i + 1}`}
              aria-current={i === safeIndex ? 'true' : undefined}
              className={[
                'h-2 rounded-full transition-all duration-500',
                i === safeIndex ? 'w-6 bg-brand-amber' : 'w-2 bg-white/25 hover:bg-white/40',
              ].join(' ')}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
