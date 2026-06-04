// HeroSection.jsx — full refactor

import { useEffect, useRef } from 'react';
import PrimaryCta from '../ui/PrimaryCta';
import { navigateHome } from '../../lib/router';
import HeroBeerVisual from './HeroBeerVisual';

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${52 + ((i * 11) % 18)}%`, // cluster near the bottle (right side)
  size: 2.5 + (i % 5) * 1.8,
  delay: `${(i * 0.7) % 6}s`,
  duration: `${4.8 + (i % 4) * 1.5}s`,
  opacity: 0.1 + (i % 4) * 0.07,
}));

const STATS = [
  { value: '12+', label: 'Quốc gia' },
  { value: '80+', label: 'Dòng bia' },
  { value: '4.9★', label: 'Đánh giá' },
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
      {/* === Background layers === */}
      <div
        ref={decorRef}
        className="hero-decor-layer pointer-events-none absolute inset-0"
        aria-hidden
      >
        {/* Ambient glow — right side near bottle */}
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-brand-amber/[0.07] blur-[80px]" />

        {/* Mesh / noise grain */}
        <div className="hero-beer-mesh absolute inset-0" />
        <div className="hero-grain absolute inset-0" />

        {/* Left vertical amber accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-brand-amber/60 to-transparent" />

        {/* Large watermark numeral */}
        <span
          className="hero-watermark pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[22vw] font-black leading-none sm:text-[18vw] lg:text-[14vw]"
          aria-hidden
        >
          2
        </span>

        {/* Bubbles — clustered around bottle zone */}
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

        {/* Bottom foam wave */}
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

      {/* Vignette */}
      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden />

      {/* === Main content === */}
      <div className="site-container relative flex w-full flex-1 flex-col pb-12 pt-24 sm:pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:pb-20 lg:pt-28 xl:gap-16">

        {/* Left: text */}
        <div className="z-10 flex flex-col lg:max-w-[540px] xl:max-w-[580px]">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-brand-amber" />
            <p className="hero-eyebrow text-[11px] font-medium tracking-[0.14em] uppercase">
              Bia nhập khẩu cao cấp
            </p>
          </div>

          {/* Headline — Playfair Display */}
          <h1 className="hero-title brand-logo-gradient font-serif text-[52px] font-black leading-[1.0] sm:text-[68px] md:text-[80px]">
            The<br />
            <em className="hero-title-accent not-italic">2nd</em>
            <br />
            Beer
          </h1>

          {/* Italic tagline */}
          <p className="hero-tagline mt-4 font-serif text-lg italic sm:text-xl">"One is never enough."</p>

          {/* Body */}
          <p className="hero-body mt-2 max-w-sm text-[15px] leading-relaxed">
            Lon thứ hai mới là lon đáng nhớ —<br className="hidden sm:block" />
            nơi cuộc trò chuyện thật sự bắt đầu.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryCta label="Khám phá ngay" />
            <a
              href="/#products"
              onClick={(e) => {
                e.preventDefault();
                navigateHome('#products');
              }}
              className="hero-secondary-btn inline-flex min-h-11 items-center rounded border px-5 py-3 text-sm transition-colors"
            >
              Xem bộ sưu tập
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex gap-8 border-t border-white/[0.06] pt-7">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="hero-stat-value font-serif text-2xl font-bold">{s.value}</p>
                <p className="hero-stat-label mt-0.5 text-[11px] tracking-wide uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: bottle visual */}
        <div className="relative z-10 mx-auto mt-10 flex items-center justify-center lg:mx-0 lg:mt-0 lg:flex-none">
          {/* Decorative rings behind bottle */}
          <div className="absolute w-[240px] h-[240px] rounded-full border border-brand-amber/10" />
          <div className="absolute w-[180px] h-[180px] rounded-full border border-brand-amber/[0.07]" />

          {/* Badge — top right */}
          <div className="absolute -top-2 -right-4 z-20 rounded-lg border border-brand-amber/20 bg-black/60 px-3 py-2 text-center backdrop-blur-sm">
            <span className="hero-badge-title font-serif text-xl font-black leading-none block">2nd</span>
            <span className="hero-badge-sub mt-1 block text-[10px] tracking-widest">Est. 2023</span>
          </div>

          <HeroBeerVisual
            className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] xl:max-w-[320px] 2xl:max-w-[360px] animate-float"
          />
        </div>
      </div>
    </section>
  );
}