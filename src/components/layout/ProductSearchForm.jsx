import { useEffect, useRef, useState } from 'react';
import { getSearchParam, navigate, navigateHome, useLocation } from '../../lib/router';

function SearchSubmitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

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
      if (pathname === '/search') navigateHome();
      onClose?.();
      return;
    }
    navigate(`/search?q=${encodeURIComponent(q)}`);
    onClose?.();
  };

  const clearQuery = () => {
    setQuery('');
    if (pathname === '/search') navigateHome();
  };

  return (
    <form onSubmit={onSubmit} className="search-field group w-full">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-field-input"
        placeholder="Tìm tên bia, xuất xứ, ABV…"
        inputMode="search"
        autoComplete="off"
        aria-label="Tìm kiếm sản phẩm"
      />

      {query.trim() ? (
        <button
          type="button"
          onClick={clearQuery}
          className="search-field-clear"
          aria-label="Xoá từ khoá"
        >
          ×
        </button>
      ) : null}

      <button type="submit" className="search-field-submit" aria-label="Tìm kiếm">
        <SearchSubmitIcon />
      </button>
    </form>
  );
}
