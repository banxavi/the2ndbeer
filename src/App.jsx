import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PageLayout from './components/layout/PageLayout';
import { useLocation } from './lib/router';

export default function App() {
  const { pathname } = useLocation();
  const page = pathname === '/search' ? <SearchPage /> : <HomePage />;

  return (
    <PageLayout>
      {page}
    </PageLayout>
  );
}