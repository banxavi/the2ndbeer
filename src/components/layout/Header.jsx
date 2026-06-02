import { useEffect, useMemo, useState } from 'react';
import { formatPhoneDisplay } from '../../lib/formatters';
import { buildTelHref, buildZaloHref } from '../../lib/links';

const HOTLINE = '0931833666';
const navItems = [
  { href: '#products', label: 'Sản phẩm' },
  { href: '#policies', label: 'Chính sách' },
  { href: '#knowledge', label: 'Kiến thức' },
];

export default function Header() {
  const sectionIds = useMemo(() => navItems.map((x) => x.href.replace('#', '')).filter(Boolean), []);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? 'products');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        // trigger a bit earlier so nav feels responsive
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0.05, 0.1, 0.2, 0.35],
      },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-premium-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-widest text-premium-gold">BEER</span>
          <span className="text-sm text-white/80">Premium</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeId === item.href.slice(1) ? 'page' : undefined}
              className={[
                'text-sm transition-colors',
                activeId === item.href.slice(1) ? 'text-premium-gold' : 'text-white/70 hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={buildTelHref(HOTLINE)}
            className="hidden rounded-md border border-premium-gold/60 bg-premium-black/45 px-3 py-2 text-sm font-semibold text-premium-gold shadow-lg shadow-black/20 ring-1 ring-premium-gold/15 transition hover:-translate-y-0.5 hover:border-premium-gold/80 hover:bg-premium-black/55 hover:shadow-black/30 active:translate-y-0 sm:inline-flex"
          >
            Hotline: {formatPhoneDisplay(HOTLINE)}
          </a>

          <a
            href={buildZaloHref(HOTLINE)}
            target="_blank"
            rel="noreferrer"
            className="hidden inline-flex items-center justify-center gap-2 rounded-md bg-[#007bff] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#006ae0] hover:shadow-black/40 active:translate-y-0 sm:inline-flex"
          >
            <img
              className="icon"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
              alt="Zalo"
              loading="lazy"
            />
            Zalo
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeId === item.href.slice(1) ? 'page' : undefined}
              className={[
                'whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors',
                activeId === item.href.slice(1)
                  ? 'border-premium-gold/70 bg-premium-black text-premium-gold'
                  : 'border-white/10 bg-premium-dark text-white/85 hover:border-premium-gold/60',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
