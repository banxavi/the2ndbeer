import { useEffect, useMemo, useState } from 'react';

export function navigate(to) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
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

