import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.99;

export default function Cart() {
  const { cart, removeFromCart, setQty, subtotal } = useCart();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (cart.length === 0) return (
    <main className="container text-center py-5">
      <h3 className="fw-bold mb-2">Your cart is empty</h3>
      <p className="text-muted mb-4">Head to the shop and find something you love</p>
      <Link to="/shop" className="btn btn-accent">Browse products</Link>
    </main>
  );

  return (
    <main className="container my-4">
      <h1 className="h3 fw-bold mb-4">Your cart</h1>
      <div className="row g-4 align-items-start">

        <div className="col-lg-8">
          {cart.map((item) => (
            <div key={item.id} className="d-flex gap-3 align-items-center py-3 border-bottom">
              <div className="bg-light rounded d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: 80, height: 80, padding: '0.5rem' }}>
                <img src={item.image} alt={item.title} style={{ maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div className="flex-grow-1 min-w-0">
                <div className="fw-medium small text-truncate">{item.title}</div>
                <div className="text-muted small text-capitalize">{item.category}</div>
              </div>
              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                <div className="input-group input-group-sm" style={{ width: '110px' }}>
                  <button className="btn btn-outline-secondary" onClick={() => setQty(item.id, item.qty - 1)}>−</button>
                  <span className="input-group-text bg-white">{item.qty}</span>
                  <button className="btn btn-outline-secondary" onClick={() => setQty(item.id, item.qty + 1)}>+</button>
                </div>
                <span className="fw-bold small">${(item.price * item.qty).toFixed(2)}</span>
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card border">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">Order summary</h5>
              <div className="d-flex justify-content-between mb-2 small">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 small">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-success' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-muted small">Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping</p>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn btn-accent w-100">Proceed to checkout →</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}