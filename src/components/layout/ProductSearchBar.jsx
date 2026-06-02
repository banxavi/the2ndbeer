import ProductSearchForm from './ProductSearchForm';

/** Desktop-only search bar; mobile search lives in Header */
export default function ProductSearchBar() {
  return (
    <div className="hidden border-b border-white/10 bg-premium-black/70 backdrop-blur lg:block">
      <div className="site-container py-3">
        <ProductSearchForm />
      </div>
    </div>
  );
}
