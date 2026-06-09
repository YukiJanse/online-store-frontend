import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usersApi } from '../api/users'; 

export default function Navbar() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleLogout = async () => {
    try {
      await usersApi.logout();
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          Online-<span className="text-accent">store</span>
        </Link>

        <form className="d-flex flex-grow-1 mx-3" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => navigate('/shop')}
          />
        </form>

        <div className="d-flex gap-2">
          {isLoggedIn ? (
            <>
              <Link to="/account" className="btn btn-outline-secondary btn-sm">
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
              >
                Logout
              </button>
              <Link to="/cart" className="btn btn-accent btn-sm position-relative">
                Cart
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link to="/account" className="btn btn-outline-secondary btn-sm">
                Account
              </Link>
              <Link to="/cart" className="btn btn-accent btn-sm position-relative">
                Cart
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}