import { useEffect, useMemo, useState } from 'react';

export function isHomePath(pathname) {
  return !pathname || pathname === '/';
}

export function navigate(to) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

/** Về trang chủ; hash dạng `#products` hoặc `products` */
export function navigateHome(hash) {
  const hashPart = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  const url = hashPart ? `/${hashPart}` : '/';
  navigate(url);
}

export function scrollToSection(sectionId) {
  const id = (sectionId ?? '').replace(/^#/, '');
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const tryScroll = (attemptsLeft) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (attemptsLeft > 0) {
      requestAnimationFrame(() => tryScroll(attemptsLeft - 1));
    }
  };

  tryScroll(40);
}

export function useLocation() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const onChange = () => setKey((x) => x + 1);
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  return useMemo(() => {
    const { pathname, search, hash } = window.location;
    return { pathname, search, hash, key };
  }, [key]);
}

export function getSearchParam(search, name) {
  try {
    const sp = new URLSearchParams(search ?? '');
    return sp.get(name) ?? '';
  } catch {
    return '';
  }
}
