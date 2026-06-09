import { useCallback, useEffect, useState } from 'react';
import { HERO_BANNERS } from '../../data/clientAssets';

const AUTO_PLAY_MS = 4000;
const FADE_MS = 300;

export default function HeroBannerSlider() {
  const slides = HERO_BANNERS;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index) => {
    if (!slides.length) return;
    const next = ((index % slides.length) + slides.length) % slides.length;
    setActiveIndex(next);
  }, [slides.length]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return undefined;
    const timer = window.setInterval(goNext, AUTO_PLAY_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, isPaused, goNext]);

  if (!slides.length) return null;

  return (
    <section
      id="top"
      className="hero-banner"
      aria-roledescription="carousel"
      aria-label="Banner khuyến mãi"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
      }}
    >
      <div className="hero-banner-viewport">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={['hero-banner-slide', index === activeIndex ? 'is-active' : ''].join(' ')}
            aria-hidden={index !== activeIndex}
          >
            <picture>
              <source media="(min-width: 768px)" srcSet={slide.desktop} />
              <img
                src={slide.mobile}
                alt={slide.alt}
                className="hero-banner-img"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                draggable={false}
              />
            </picture>
          </div>
        ))}

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              className="hero-banner-nav hero-banner-nav--prev"
              aria-label="Banner trước"
              onClick={goPrev}
            >
              <span aria-hidden>‹</span>
            </button>
            <button
              type="button"
              className="hero-banner-nav hero-banner-nav--next"
              aria-label="Banner sau"
              onClick={goNext}
            >
              <span aria-hidden>›</span>
            </button>

            <div className="hero-banner-dots" role="tablist" aria-label="Chọn banner">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Banner ${index + 1}`}
                  className={['hero-banner-dot', index === activeIndex ? 'is-active' : ''].join(' ')}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
