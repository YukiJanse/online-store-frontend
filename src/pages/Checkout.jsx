import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersApi } from '../api/orders';
import { useUsers } from '../hooks/useUsers'; 

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.99;

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { userInfo, userLoading, userLoadingError } = useUsers();
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', postal: '', country: 'Sweden',
    cardNumber: '', expiry: '', cvv: '',
  });

  useEffect(() => {
  if (!userInfo) return;

  setForm((prev) => ({
    ...prev,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    address: userInfo.address.street,
    city: userInfo.address.city,
    postal: userInfo.address.postalCode,
    country: userInfo.address.country,
  }));
}, [userInfo]);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      await ordersApi.create({
        items: cart.map((i) => ({ productId: i.id, title: i.title, price: i.price, image: i.image, quantity: i.qty })),
        shippingInfo: {
          firstName: form.firstName,
          lastName: form.lastName,
          address: {
            street: form.address,
            city: form.city,
            postalCode: form.postal,
            country: form.country,
          }
        },
        status: "PENDING",
      });
    } catch {}
    const id = '#ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    clearCart();
    setOrderId(id);
    setPlacing(false);
  };

  if (orderId) return (
    <main className="container text-center py-5">
      <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
        style={{ width: 72, height: 72, fontSize: '2rem' }}>✓</div>
      <h1 className="h2 fw-bold mb-2">Order placed!</h1>
      <p className="text-muted mb-4">Your order has been confirmed.</p>
      <div className="d-flex gap-3 justify-content-center">
        <Link to="/account" className="btn btn-accent">View orders</Link>
        <Link to="/shop" className="btn btn-outline-secondary">Continue shopping</Link>
      </div>
    </main>
  );

  if (cart.length === 0) return (
    <main className="container text-center py-5">
      <h3>Your cart is empty</h3>
      <Link to="/shop" className="btn btn-accent mt-3">Browse products</Link>
    </main>
  );

  return (
    <main className="container my-4">
      <h1 className="h3 fw-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="row g-4 align-items-start">
          <div className="col-lg-7">
            <div className="card border mb-3">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Shipping details</h5>
                <div className="row g-2 mb-2">
                  <div className="col"><label className="form-label small">First name</label><input className="form-control" value={form.firstName} onChange={set('firstName')} placeholder="Jane" required /></div>
                  <div className="col"><label className="form-label small">Last name</label><input className="form-control" value={form.lastName} onChange={set('lastName')} placeholder="Doe" required /></div>
                </div>
                <div className="mb-2"><label className="form-label small">Email</label><input type="email" className="form-control" value={form.email} onChange={set('email')} placeholder="jane@email.com" required /></div>
                <div className="mb-2"><label className="form-label small">Address</label><input className="form-control" value={form.address} onChange={set('address')} placeholder="123 Main Street" required /></div>
                <div className="row g-2">
                  <div className="col"><label className="form-label small">City</label><input className="form-control" value={form.city} onChange={set('city')} placeholder="Stockholm" required /></div>
                  <div className="col"><label className="form-label small">Postal code</label><input className="form-control" value={form.postal} onChange={set('postal')} placeholder="10001" required /></div>
                </div>
              </div>
            </div>
            <div className="card border">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Payment</h5>
                <div className="mb-2"><label className="form-label small">Card number</label><input className="form-control" value={form.cardNumber} onChange={set('cardNumber')} placeholder="4242 4242 4242 4242" required /></div>
                <div className="row g-2">
                  <div className="col"><label className="form-label small">Expiry</label><input className="form-control" value={form.expiry} onChange={set('expiry')} placeholder="MM/YY" required /></div>
                  <div className="col"><label className="form-label small">CVV</label><input className="form-control" value={form.cvv} onChange={set('cvv')} placeholder="123" required /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Order summary</h5>
                {cart.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between small mb-2">
                    <span className="text-muted text-truncate me-2">{item.title} ×{item.qty}</span>
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between small mb-1"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="d-flex justify-content-between small mb-2">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-success' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold mb-3"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <button type="submit" className="btn btn-accent w-100" disabled={placing}>
                  {placing ? 'Placing order…' : 'Place order →'}
                </button>
                <p className="text-muted text-center small mt-2">🔒 Secure checkout · 30-day returns</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}