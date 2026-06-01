import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products, loading } = useProducts();
  const navigate = useNavigate();

  const categories = [...new Set(products.map((p) => p.category))];
  const featured = products.filter((p) => p.rating.rate >= 4.5).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <div className="bg-dark text-white text-center py-5">
        <div className="container py-4">
          <h1 className="display-4 fw-bold font-display mb-3">
            Style for every <em className="text-warning">moment</em> in life
          </h1>
          <p className="lead text-white-50 mb-4">Curated fashion, electronics, and jewellery — all in one place.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/shop" className="btn btn-accent btn-lg">Shop now</Link>
            <Link to="/account" className="btn btn-outline-light btn-lg">View orders</Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container my-5">
        <h2 className="h4 fw-bold mb-3">Browse by category</h2>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className="btn btn-outline-secondary btn-sm rounded-pill text-capitalize"
              onClick={() => navigate(`/shop?cat=${encodeURIComponent(cat)}`)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <hr className="container" />

      {/* Featured */}
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-baseline mb-3">
          <h2 className="h4 fw-bold">Featured picks</h2>
          <Link to="/shop" className="text-accent small">View all →</Link>
        </div>
        {loading ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border spinner-border-sm me-2" />Loading products…
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
            {featured.map((p) => (
              <div className="col" key={p.id}><ProductCard product={p} /></div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}