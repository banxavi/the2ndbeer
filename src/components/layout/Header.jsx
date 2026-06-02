import { useEffect, useMemo, useState } from 'react';
import { buildTelHref, buildZaloHref } from '../../lib/links';
import PrimaryCta from '../ui/PrimaryCta';
import IconButton from '../ui/IconButton';
import ProductSearchForm from './ProductSearchForm';

const HOTLINE = '0907566279';
const navItems = [
  { href: '#products', label: 'Sản phẩm' },
  { href: '#reviews', label: 'Đánh giá' },
  { href: '#story', label: 'Câu chuyện' },
  { href: '#partners', label: 'Điểm bán' },
];

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const sectionIds = useMemo(() => navItems.map((x) => x.href.replace('#', '')).filter(Boolean), []);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? 'products');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0.05, 0.1, 0.2, 0.35] },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((v) => !v);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((v) => !v);
    setMenuOpen(false);
  };

  const onNavClick = () => closePanels();

  return (
    <header className="relative sticky top-0 z-40 border-t-4 border-brand-amber border-b border-white/10 bg-premium-black/85 backdrop-blur">
      <div className="site-container flex items-center justify-between gap-3 py-3 lg:py-4">
        <a href="#top" className="flex min-w-0 flex-col" onClick={onNavClick}>
          <span className="truncate text-lg font-bold text-brand-amber">The 2nd Beer</span>
          <span className="text-xs text-body-subtle">Bia nhập khẩu cao cấp</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeId === item.href.slice(1) ? 'page' : undefined}
              className={[
                'text-sm transition-colors',
                activeId === item.href.slice(1) ? 'text-brand-amber' : 'text-body-muted hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 sm:gap-3 lg:flex">
          <a
            href={buildTelHref(HOTLINE)}
            className="inline-flex min-h-11 items-center rounded-md bg-[#9B1321] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#82101b]"
          >
            Gọi: {HOTLINE}
          </a>
          <a
            href={buildZaloHref(HOTLINE)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#007bff] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#006ae0]"
          >
            <img
              className="icon"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
              alt=""
              loading="lazy"
            />
            Zalo
          </a>
          {/* <PrimaryCta className="!px-4 !py-2 !text-sm" /> */}
        </div>

        {/* Mobile: search + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <IconButton label="Tìm kiếm sản phẩm" onClick={toggleSearch} expanded={searchOpen}>
            <SearchIcon />
          </IconButton>
          <IconButton label={menuOpen ? 'Đóng menu' : 'Mở menu'} onClick={toggleMenu} expanded={menuOpen}>
            <MenuIcon open={menuOpen} />
          </IconButton>
        </div>
      </div>

      {/* Mobile expandable search */}
      {searchOpen ? (
        <div className="site-container border-t border-white/10 pb-3 pt-3 lg:hidden">
          <ProductSearchForm autoFocus onClose={() => setSearchOpen(false)} />
        </div>
      ) : null}

      {/* Mobile menu drawer */}
      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            aria-label="Đóng menu"
            onClick={closePanels}
          />
          <nav
            className="absolute inset-x-0 top-full z-50 max-h-[min(80vh,480px)] overflow-y-auto border-b border-white/10 bg-premium-black shadow-2xl lg:hidden"
            aria-label="Menu di động"
          >
            <div className="site-container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onNavClick}
                  aria-current={activeId === item.href.slice(1) ? 'page' : undefined}
                  className={[
                    'flex min-h-11 items-center rounded-md px-4 text-base font-medium transition-colors',
                    activeId === item.href.slice(1)
                      ? 'bg-brand-amber/15 text-brand-amber'
                      : 'text-body-muted hover:bg-white/5 hover:text-white',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
                <a
                  href={buildZaloHref(HOTLINE)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onNavClick}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#007bff] px-4 text-sm font-semibold text-white"
                >
                  <img
                    className="icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                    alt=""
                    loading="lazy"
                  />
                  Zalo
                </a>
                <a
                  href={buildTelHref(HOTLINE)}
                  onClick={onNavClick}
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#9B1321] px-4 text-sm font-semibold text-white"
                >
                  Gọi ngay
                </a>
                <PrimaryCta className="w-full justify-center" onClick={onNavClick} />
              </div>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
