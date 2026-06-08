import { useEffect, useRef } from 'react';
import { BRAND } from '../../data/brand';
import { navigateHome } from '../../lib/router';
import PrimaryCta from '../ui/PrimaryCta';
import HeroBeerVisual from './HeroBeerVisual';

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${52 + ((i * 11) % 18)}%`,
  size: 2.5 + (i % 5) * 1.8,
  delay: `${(i * 0.7) % 6}s`,
  duration: `${4.8 + (i % 4) * 1.5}s`,
  opacity: 0.1 + (i % 4) * 0.07,
}));

const STATS = [
  { value: '18+', label: 'Quốc gia' },
  { value: '120+', label: 'Nhãn hiệu' },
  { value: 'CO/CQ', label: 'Chính hãng' },
];

export default function HeroSection() {
  const decorRef = useRef(null);

  useEffect(() => {
    const layer = decorRef.current;
    if (!layer) return;
    const onScroll = () => {
      layer.style.transform = `translate3d(0, ${window.scrollY * 0.15}px, 0)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="top"
      className="hero-section relative flex w-full min-h-[90vh] overflow-hidden border-b border-white/[0.06]"
    >
      <div ref={decorRef} className="hero-decor-layer pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-brand-amber/[0.07] blur-[80px]" />
        <div className="hero-beer-mesh absolute inset-0" />
        <div className="hero-grain absolute inset-0" />
        <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-transparent via-brand-amber/60 to-transparent" />

        <span
          className="hero-watermark pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[22vw] font-black leading-none sm:text-[18vw] lg:text-[14vw]"
          aria-hidden
        >
          L
        </span>

        <div className="hero-bubbles absolute inset-0 overflow-hidden">
          {BUBBLES.map((b) => (
            <span
              key={b.id}
              className="hero-bubble absolute bottom-0 rounded-full bg-brand-amber"
              style={{
                left: b.left,
                width: b.size,
                height: b.size,
                opacity: b.opacity,
                animationDelay: b.delay,
                animationDuration: b.duration,
              }}
            />
          ))}
        </div>

        <svg
          className="hero-foam-wave absolute bottom-0 left-0 w-full text-brand-amber/[0.06]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden
        >
          <path d="M0,50 C200,100 400,0 600,40 C800,80 1000,10 1200,45 C1350,70 1420,30 1440,44 L1440,100 L0,100 Z" />
          <path d="M0,70 C300,30 600,90 900,60 C1100,40 1300,75 1440,65 L1440,100 L0,100 Z" opacity="0.5" />
        </svg>
      </div>

      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden />

      <div className="site-container relative flex w-full flex-1 flex-col pb-12 pt-24 sm:pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:pb-20 lg:pt-28 xl:gap-16">
        <div className="z-10 flex flex-col lg:max-w-[540px] xl:max-w-[580px]">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-brand-amber" />
            <p className="hero-eyebrow text-[11px] font-medium uppercase tracking-[0.14em]">{BRAND.subtitle}</p>
          </div>

          <h1 className="hero-title brand-wordmark brand-logo-gradient text-[2.5rem] font-semibold leading-[0.95] tracking-[0.05em] sm:text-[3.25rem] md:text-[3.75rem]">
            LUVINI
            <br />
            &amp; CO.
          </h1>

          <p className="hero-tagline mt-4 font-serif text-lg italic sm:text-xl">&ldquo;{BRAND.tagline}&rdquo;</p>

          <p className="hero-body mt-2 max-w-md text-[15px] leading-relaxed">{BRAND.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryCta label="Khám phá bộ sưu tập" />
            <a
              href="/#products"
              onClick={(e) => {
                e.preventDefault();
                navigateHome('#products');
              }}
              className="hero-secondary-btn inline-flex min-h-11 items-center rounded border px-5 py-3 text-sm transition-colors"
            >
              Rượu vang &amp; bia
            </a>
          </div>

          <div className="mt-10 flex gap-8 border-t border-white/[0.06] pt-7">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="hero-stat-value font-serif text-2xl font-bold">{s.value}</p>
                <p className="hero-stat-label mt-0.5 text-[11px] uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 flex items-center justify-center lg:mx-0 lg:mt-0 lg:flex-none">
          <div className="absolute h-[240px] w-[240px] rounded-full border border-brand-amber/10" />
          <div className="absolute h-[180px] w-[180px] rounded-full border border-brand-amber/[0.07]" />

          <div className="absolute -top-2 -right-4 z-20 rounded-lg border border-brand-amber/20 bg-black/60 px-3 py-2 text-center backdrop-blur-sm">
            <span className="hero-badge-title brand-wordmark text-xl font-semibold leading-none block tracking-wide">
              {BRAND.shortName}
            </span>
            <span className="hero-badge-sub mt-1 block text-[10px] tracking-widest">Est. {BRAND.est}</span>
          </div>

          <HeroBeerVisual className="relative z-10 w-full max-w-[200px] animate-float sm:max-w-[240px] lg:max-w-[280px] xl:max-w-[320px] 2xl:max-w-[360px]" />
        </div>
      </div>
    </section>
  );
}
