import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/shop"       element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart"       element={<Cart />} />
          <Route path="/checkout"   element={<Checkout />} />
          <Route path="/account"    element={<Account />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register"    element={<Register />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
