import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from "./pages/Cart.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

const Placeholder = ({ title }) => (
  <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 mb-6 font-medium italic">We are still putting the finishing touches on this page!</p>
      <div className="h-1 w-20 bg-rose-500 mx-auto rounded-full"></div>
    </div>
  </div>
);

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Placeholder title="My Wishlist" />} />
          <Route path="/profile" element={<Placeholder title="My Profile" />} />
          <Route path="/orders" element={<Placeholder title="My Orders" />} />
          <Route path="/admin" element={<Placeholder title="Admin Dashboard" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
