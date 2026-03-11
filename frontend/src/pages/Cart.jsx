import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../store/cartSlice.js';

const Cart = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const shipping = totalAmount > 50 ? 0 : 10;
  const tax = totalAmount * 0.1;
  const grandTotal = totalAmount + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-50 text-rose-500 mb-8">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm mx-auto">
          Sounds like a good time to start shopping! Explore our latest collections.
        </p>
        <Link to="/shop" className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold inline-flex items-center hover:bg-rose-500 transition-all duration-300">
          Start Shopping <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-black text-gray-900 mb-12 tracking-tighter">Your Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-100 items-center">
              <div className="w-32 h-32 bg-gray-50 rounded-2xl flex-shrink-0 p-4">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-xl text-gray-900 hover:text-rose-500 transition-colors">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h3>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-gray-400 text-sm mb-4 uppercase tracking-wider font-bold">{item.category}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-gray-100 rounded-xl p-1 bg-gray-50">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-rose-500 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-rose-500 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-2xl font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-[2.5rem] p-10 sticky top-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-bold text-gray-900">
                  {shipping === 0 ? <span className="text-green-500">FREE</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Estimated Tax</span>
                <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-black text-gray-900">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="w-full bg-gray-900 text-white py-5 rounded-3xl font-bold group flex items-center justify-center hover:bg-rose-500 transition-all duration-300 shadow-xl shadow-gray-200"
            >
              Proceed to Checkout
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-6 text-center text-xs text-gray-400">
              Tax calculated at checkout. Express shipping available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
