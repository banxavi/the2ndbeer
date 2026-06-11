import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import PromotionsPage from './pages/PromotionsPage';
import KnowledgePage from './pages/KnowledgePage';
import PolicyPage from './pages/PolicyPage';
import PageLayout from './components/layout/PageLayout';
import { CATEGORY_BY_PATH } from './data/categories';
import { getProductSlugFromPath, getRedirectSlugFromLegacyPath } from './lib/products';
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

  if (pathname === '/khuyen-mai') return { type: 'promotions' };
  if (pathname === '/kien-thuc') return { type: 'knowledge' };

  const policyMatch = pathname.match(/^\/chinh-sach\/([^/]+)\/?$/);
  if (policyMatch) return { type: 'policy', policySlug: policyMatch[1] };

  const category = CATEGORY_BY_PATH[pathname];
  if (category) return { type: 'category', categoryKey: category.key };

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
  if (route.type === 'product') page = <ProductDetailPage productSlug={route.productSlug} />;
  if (route.type === 'category') page = <CategoryPage categoryKey={route.categoryKey} />;
  if (route.type === 'promotions') page = <PromotionsPage />;
  if (route.type === 'knowledge') page = <KnowledgePage />;
  if (route.type === 'policy') page = <PolicyPage policySlug={route.policySlug} />;

  return <PageLayout>{page}</PageLayout>;
}
