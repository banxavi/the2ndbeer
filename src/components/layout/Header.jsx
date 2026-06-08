import { useEffect, useMemo, useState } from 'react';
import { BRAND } from '../../data/brand';
import { buildTelHref, buildZaloHref } from '../../lib/links';
import { isHomePath, navigateHome, useLocation } from '../../lib/router';
import IconButton from '../ui/IconButton';
import BrandMark from './BrandMark';
import ProductSearchForm from './ProductSearchForm';

const HOTLINE = BRAND.hotline;
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

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 3.2c.4-.9 1.5-1.3 2.4-.9l2.1 1c.8.4 1.2 1.4.9 2.3l-.7 2.1c-.2.7 0 1.4.5 1.9l2.5 2.5c.5.5 1.2.7 1.9.5l2.1-.7c.9-.3 1.9.1 2.3.9l1 2.1c.4.9 0 2-.9 2.4l-2 .8c-1.2.5-2.5.3-3.6-.4-3.2-2.1-5.8-4.7-7.9-7.9-.7-1.1-.9-2.4-.4-3.6l.8-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
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
  const { pathname } = useLocation();
  const onHome = isHomePath(pathname);
  const sectionIds = useMemo(() => navItems.map((x) => x.href.replace('#', '')).filter(Boolean), []);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? 'products');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const goHomeSection = (e, hash) => {
    e.preventDefault();
    closePanels();
    navigateHome(hash);
  };

  useEffect(() => {
    if (!onHome) return;
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
  }, [sectionIds, onHome]);

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
      if (e.key === 'Escape') closePanels();
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

  return (
    <header className="relative border-b border-white/10">
      <div className="site-container flex items-center justify-between gap-3 py-3 lg:py-4">
        <a
          href="/"
          className="min-w-0 max-w-[min(100%,17.5rem)] shrink sm:max-w-xs lg:max-w-sm"
          onClick={(e) => goHomeSection(e, '#top')}
          aria-label="LUVINI & CO. — về trang chủ"
        >
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`/${item.href}`}
              onClick={(e) => goHomeSection(e, item.href)}
              aria-current={onHome && activeId === item.href.slice(1) ? 'page' : undefined}
              className={[
                'text-sm transition-colors',
                onHome && activeId === item.href.slice(1) ? 'text-brand-amber' : 'text-body-muted hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={buildTelHref(HOTLINE)}
            aria-label={`Gọi ${HOTLINE}`}
            className="header-contact-btn header-contact-btn--call"
          >
            <PhoneIcon />
          </a>
          <a
            href={buildZaloHref(HOTLINE)}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat Zalo"
            className="header-contact-btn header-contact-btn--zalo"
          >
            <img
              className="icon"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
              alt=""
              loading="lazy"
            />
          </a>

          <div className="flex items-center gap-2 lg:hidden">
            <IconButton label="Tìm kiếm sản phẩm" onClick={toggleSearch} expanded={searchOpen}>
              <SearchIcon />
            </IconButton>
            <IconButton label={menuOpen ? 'Đóng menu' : 'Mở menu'} onClick={toggleMenu} expanded={menuOpen}>
              <MenuIcon open={menuOpen} />
            </IconButton>
          </div>
        </div>
      </div>

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
                  href={`/${item.href}`}
                  onClick={(e) => goHomeSection(e, item.href)}
                  aria-current={onHome && activeId === item.href.slice(1) ? 'page' : undefined}
                  className={[
                    'flex min-h-11 items-center rounded-md px-4 text-base font-medium transition-colors',
                    onHome && activeId === item.href.slice(1)
                      ? 'bg-brand-amber/15 text-brand-amber'
                      : 'text-body-muted hover:bg-white/5 hover:text-white',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
