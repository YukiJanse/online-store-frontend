import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Stars({ rate }) {
  const full = Math.round(rate);
  return <span className="text-warning">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>;
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card h-100 border">
      <Link to={`/product/${product.id}`}>
        <div className="d-flex align-items-center justify-content-center p-3 bg-light" style={{ height: '200px' }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            loading="lazy"
          />
        </div>
      </Link>
      <div className="card-body d-flex flex-column">
        <div className="text-accent small text-uppercase fw-semibold mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
          <p className="card-title small fw-medium" style={{
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
            {product.title}
          </p>
        </Link>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-bold">${product.price.toFixed(2)}</div>
            <div className="small text-muted"><Stars rate={product.rating.rate} /> {product.rating.rate}</div>
          </div>
          <button
            className="btn btn-accent btn-sm"
            onClick={() => addToCart(product)}
          >+</button>
        </div>
      </div>
    </div>
  );
}