import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, User, Search, Menu, X, LogOut, Heart } from 'lucide-react';
import { logout } from '../store/authSlice.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-rose-500 bg-clip-text text-transparent tracking-tighter">
              GlowNova
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors">Shop All</Link>
            <Link to="/shop?category=skincare" className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors">Skincare</Link>
            <Link to="/shop?category=makeup" className="text-sm font-medium text-gray-600 hover:text-rose-500 transition-colors">Makeup</Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="text-gray-600 hover:text-rose-500 transition-colors focus:outline-none">
              <Search size={22} />
            </button>
            <Link to="/wishlist" className="text-gray-600 hover:text-rose-500 transition-colors focus:outline-none">
              <Heart size={22} />
            </Link>
            
            <div className="relative group">
              <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-rose-500 transition-colors focus:outline-none">
                <User size={22} />
              </Link>
              {isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400 capitalize">Welcome back,</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors">Orders</Link>
                  {user?.is_admin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-rose-500 font-semibold hover:bg-rose-50 transition-colors">Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center">
                    <LogOut size={16} className="mr-2" /> Sign Out
                  </button>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative group p-2 bg-gray-50 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300">
              <ShoppingBag size={22} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white group-hover:bg-gray-900 transition-colors">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-600">
              <ShoppingBag size={24} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-rose-500 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-white border-b border-gray-100 shadow-xl py-6 px-4 space-y-4 animate-in slide-in-from-top-5 duration-300">
          <Link to="/shop" className="block text-lg font-semibold text-gray-800 hover:text-rose-500" onClick={() => setIsOpen(false)}>Shop All</Link>
          <Link to="/shop?category=skincare" className="block text-lg font-semibold text-gray-800 hover:text-rose-500" onClick={() => setIsOpen(false)}>Skincare</Link>
          <Link to="/shop?category=makeup" className="block text-lg font-semibold text-gray-800 hover:text-rose-500" onClick={() => setIsOpen(false)}>Makeup</Link>
          <hr className="border-gray-50" />
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-3 py-2">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 text-sm font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
              <Link to="/profile" className="block text-gray-600" onClick={() => setIsOpen(false)}>My Profile</Link>
              <Link to="/orders" className="block text-gray-600" onClick={() => setIsOpen(false)}>Orders</Link>
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left text-rose-500 font-semibold"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="block text-lg font-bold text-rose-500" onClick={() => setIsOpen(false)}>Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
