import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PageLayout from './components/layout/PageLayout';
import { getProductSlugFromPath, getRedirectSlugFromLegacyPath, productPath } from './lib/products';
import { navigate, useLocation } from './lib/router';

function resolvePage(pathname) {
  if (pathname === '/search') return { type: 'search' };

  const segment = getProductSlugFromPath(pathname);
  if (segment) {
    if (/^\d+$/.test(segment)) {
      const legacySlug = getRedirectSlugFromLegacyPath(pathname);
      if (legacySlug) return { type: 'redirect', to: `/product/${legacySlug}` };
      return { type: 'home' };
    }
    return { type: 'product', productSlug: segment };
  }

  return { type: 'home' };
}

export default function App() {
  const { pathname } = useLocation();
  const route = resolvePage(pathname);

  useEffect(() => {
    if (route.type === 'redirect') navigate(route.to);
  }, [route]);

  if (route.type === 'redirect') {
    return null;
  }

  let page = <HomePage />;
  if (route.type === 'search') page = <SearchPage />;
  if (route.type === 'product') {
    page = <ProductDetailPage productSlug={route.productSlug} />;
  }

  return <PageLayout>{page}</PageLayout>;
}
