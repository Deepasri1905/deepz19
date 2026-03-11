import React from 'react';
import { ShoppingCart, Heart, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice.js';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-8 group-hover:bg-rose-50/30 transition-colors duration-500">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain w-full h-full group-hover:scale-110 transition duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-rose-200">
              New
            </span>
          )}
          {product.stock_quantity < 10 && product.stock_quantity > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-amber-200">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white text-gray-400 flex items-center justify-center hover:bg-rose-500 hover:text-white transition duration-300 shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
          <Heart size={20} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-rose-600 transition-colors shadow-xl"
          >
            <Plus size={18} /> Add to Cart
          </button>
        </div>
      </div>
      </Link>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center text-amber-500 text-xs font-bold">
            <Star size={12} className="fill-current mr-0.5" /> 4.9
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 text-xl mb-4 line-clamp-2 leading-tight group-hover:text-rose-600 transition-colors">
          {product.name}
        </h3>
        </Link>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
            {product.discountPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">${product.discountPrice.toFixed(2)}</span>
            )}
          </div>
          
          <div className="text-xs font-medium text-gray-400 italic">
            {product.brand || 'GlowNova'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for star
const Star = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default ProductCard;
