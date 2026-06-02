import { useEffect, useState } from 'react';
import { getSearchParam, navigate, useLocation } from '../../lib/router';

export default function ProductSearchBar() {
  const { pathname, search } = useLocation();
  const initial = getSearchParam(search, 'q');
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      if (pathname === '/search') navigate('/');
      return;
    }
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="border-b border-white/10 bg-premium-black/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <form onSubmit={onSubmit} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
          <label className="grid gap-1">
            <span className="text-xs text-white/60">Tìm kiếm sản phẩm</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-full rounded-md border border-white/10 bg-premium-black px-3 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-premium-gold/60"
              placeholder="Nhập tên bia, xuất xứ hoặc ABV…"
              inputMode="search"
              autoComplete="off"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-md bg-premium-gold px-4 text-sm font-semibold text-premium-black shadow-lg shadow-black/30 ring-1 ring-premium-gold/30 hover:bg-yellow-600"
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
                className="inline-flex h-11 items-center justify-center rounded-md border border-premium-gold/60 bg-premium-black/45 px-4 text-sm font-semibold text-premium-gold shadow-lg shadow-black/20 ring-1 ring-premium-gold/15 transition hover:-translate-y-0.5 hover:border-premium-gold/80 hover:bg-premium-black/55 hover:shadow-black/30 active:translate-y-0"
              >
                Xoá
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

