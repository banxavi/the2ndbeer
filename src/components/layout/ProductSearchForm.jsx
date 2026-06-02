import { useEffect, useRef, useState } from 'react';
import { getSearchParam, navigate, useLocation } from '../../lib/router';

export default function ProductSearchForm({ autoFocus = false, onClose }) {
  const { pathname, search } = useLocation();
  const initial = getSearchParam(search, 'q');
  const [query, setQuery] = useState(initial);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      if (pathname === '/search') navigate('/');
      onClose?.();
      return;
    }
    navigate(`/search?q=${encodeURIComponent(q)}`);
    onClose?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-row items-center gap-2">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-11 min-w-0 flex-1 rounded-md border border-white/10 bg-premium-black px-3 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-brand-amber/60"
        placeholder="Nhập tên bia, xuất xứ hoặc ABV…"
        inputMode="search"
        autoComplete="off"
        aria-label="Tìm kiếm sản phẩm"
      />

      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-brand-amber px-4 text-sm font-semibold text-premium-black shadow-lg shadow-black/30 ring-1 ring-brand-amber/30 hover:bg-[#e0ad2a]"
      >
        Tìm
      </button>

      {query.trim() ? (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            if (pathname === '/search') navigate('/');
          }}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-brand-amber/60 bg-premium-black/45 px-3 text-sm font-semibold text-brand-amber ring-1 ring-brand-amber/15 transition hover:border-brand-amber/80 hover:bg-premium-black/55 sm:px-4"
        >
          Xoá
        </button>
      ) : null}
    </form>
  );
}
