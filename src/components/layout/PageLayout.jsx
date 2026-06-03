import Header from './Header';
import ProductSearchBar from './ProductSearchBar';
import Footer from './Footer';

export default function PageLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-premium-black text-white font-sans">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.32]">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2400&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-premium-black/0 via-premium-black/35 to-premium-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.18),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.14),transparent_50%)]" />
      </div>

      <div className="relative z-10 overflow-x-clip">
        <div className="site-header-sticky sticky top-0 z-40 border-b border-white/10 bg-premium-black/90 shadow-lg shadow-black/25 backdrop-blur-md">
          <Header />
          <ProductSearchBar />
        </div>
        <main className="w-full max-w-full pb-16">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
