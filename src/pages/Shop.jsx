import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryPills from '../components/CategoryPills';

export default function Shop() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');

  useEffect(() => { setQuery(searchParams.get('q') || ''); }, [searchParams]);
  useEffect(() => { setActiveCategory(searchParams.get('cat') || 'all'); }, [searchParams]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return list;
  }, [products, activeCategory, query]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const params = {};
    if (cat !== 'all') params.cat = cat;
    if (query) params.q = query;
    setSearchParams(params);
  };

  return (
    <main className="container my-4">
      <h1 className="h3 fw-bold mb-1">All Products</h1>
      <p className="text-muted mb-3">{loading ? 'Loading…' : `${filtered.length} products`}</p>

      <input
        type="text"
        className="form-control mb-3"
        style={{ maxWidth: '360px' }}
        placeholder="Search products…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mb-4">
        <CategoryPills categories={categories} active={activeCategory} onChange={handleCategoryChange} />
      </div>

      {loading && <div className="text-center py-5"><div className="spinner-border" /></div>}
      {error && <div className="alert alert-danger">Failed to load products. Please try again.</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-5 text-muted">
          <h5>No products found</h5>
          <p>Try adjusting your search or filter.</p>
        </div>
      )}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {filtered.map((p) => (
            <div className="col" key={p.id}><ProductCard product={p} /></div>
          ))}
        </div>
      )}
    </main>
  );
}