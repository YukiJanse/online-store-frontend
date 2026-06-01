import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useNotify } from '../hooks/useNotify';
import Notify from '../components/Notify';

function Stars({ rate }) {
  const full = Math.round(rate);
  return <span className="text-warning fs-5">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>;
}

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { message, visible, notify } = useNotify();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    notify(`Added ${qty} item${qty > 1 ? 's' : ''} to cart ✓`);
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;
  if (error || !product) return <div className="container py-5"><div className="alert alert-warning">Product not found.</div></div>;

  return (
    <main className="container my-4">
      <Link to="/shop" className="text-muted small d-inline-block mb-3">← Back to shop</Link>

      <div className="row g-5">
        <div className="col-md-6">
          <div className="bg-light rounded d-flex align-items-center justify-content-center p-5" style={{ aspectRatio: '1' }}>
            <img src={product.image} alt={product.title} style={{ maxHeight: '320px', objectFit: 'contain' }} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="text-accent small text-uppercase fw-semibold mb-2">{product.category}</div>
          <h1 className="h2 fw-bold font-display mb-3">{product.title}</h1>
          <div className="h3 fw-bold mb-2">${product.price.toFixed(2)}</div>
          <div className="mb-3">
            <Stars rate={product.rating.rate} />
            <span className="text-muted ms-2 small">{product.rating.rate} · {product.rating.count} reviews</span>
          </div>
          <p className="text-muted mb-4">{product.description}</p>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="input-group" style={{ width: '130px' }}>
              <button className="btn btn-outline-secondary" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="input-group-text bg-white px-3">{qty}</span>
              <button className="btn btn-outline-secondary" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn btn-accent px-4" onClick={handleAdd}>Add to cart</button>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <span className="badge bg-secondary text-capitalize">{product.category}</span>
            <span className="badge bg-success">In stock</span>
            <span className="badge bg-info text-dark">Free returns</span>
          </div>
        </div>
      </div>

      <Notify message={message} visible={visible} />
    </main>
  );
}