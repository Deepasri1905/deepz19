import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, Truck, ShieldCheck, rotateCcw as RotateCcw, Plus, Minus, Heart, ChevronLeft } from 'lucide-react';
import { addToCart } from '../store/cartSlice.js';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Mock data - in real app, fetch by ID
  const product = {
    id: parseInt(id),
    name: 'Luminous Silk Foundation',
    price: 64.00,
    category: 'Makeup',
    description: 'A lightweight, liquid foundation that provides a luminous finish. Formulated with Micro-fil™ technology, this foundation stays in place all day and provides buildable coverage for a natural, healthy-looking glow.',
    image: 'https://via.placeholder.com/600?text=Foundation+XL',
    isNew: true,
    brand: 'GlowNova',
    stock_quantity: 45,
    reviews: [
      { id: 1, user: 'Sarah M.', rating: 5, comment: 'Best foundation I have ever used! So natural and glows.' },
      { id: 2, user: 'Emma L.', rating: 4, comment: 'Lovely texture, but I wish it had more shades.' },
    ]
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-rose-500 transition-colors mb-12 font-bold group">
        <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-square rounded-[3rem] bg-gray-50 flex items-center justify-center p-12 lg:p-20 overflow-hidden relative group">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition duration-700" />
            
            {product.isNew && (
              <span className="absolute top-10 left-10 bg-rose-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl shadow-rose-200">
                New Arrival
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="aspect-square rounded-2xl bg-gray-50 border-2 border-transparent hover:border-rose-500 cursor-pointer p-2 transition-all">
                <img src={product.image} className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-rose-500 font-black uppercase tracking-[0.2em] text-xs mb-4 block">{product.category} — {product.brand}</span>
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < 4 ? 'fill-current' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-gray-400 font-bold text-sm">({product.reviews.length} Customer Reviews)</span>
              <span className="h-4 w-[1px] bg-gray-200" />
              <span className="text-green-500 font-bold text-sm">In Stock</span>
            </div>

            <div className="text-4xl font-black text-gray-900 mb-8 tracking-tighter">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <p className="text-gray-500 text-lg leading-relaxed mb-10 pb-10 border-b border-gray-100">
            {product.description}
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border-2 border-gray-100 rounded-2xl p-2 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors">
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-black text-gray-900 text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-gray-900 text-white py-4 px-8 rounded-2xl font-bold flex items-center justify-center hover:bg-rose-500 transition-all duration-300 transform active:scale-95 shadow-xl shadow-gray-200"
              >
                Add to Cart <Plus size={20} className="ml-2" />
              </button>
              
              <button className="w-14 h-14 border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:border-rose-500 hover:text-rose-500 transition-all">
                <Heart size={24} />
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <Truck size={20} className="text-rose-500" />
              <span className="text-sm font-bold text-gray-700">Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <ShieldCheck size={20} className="text-rose-500" />
              <span className="text-sm font-bold text-gray-700">2 Year Quality Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Detailed Info */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center space-x-12 border-b border-gray-100 mb-12">
          {['description', 'ingredients', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-colors relative ${
                activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 inset-x-0 h-1 bg-rose-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[300px] animate-in fade-in duration-500">
          {activeTab === 'description' && (
            <div className="prose prose-rose max-w-none text-gray-500 leading-loose">
              <p>Experience the ultimate in beauty with our state-of-the-art foundation. Designed to mimic the natural texture and radiance of healthy skin, our formula provides weightless coverage that feels like you're wearing nothing at all.</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Long-lasting 24-hour wear</li>
                <li>Sweat and humidity resistant</li>
                <li>Non-comedogenic (won't clog pores)</li>
                <li>SPF 15 protection against UV rays</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {product.reviews.map(review => (
                <div key={review.id} className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-black text-gray-900 mb-1">{review.user}</p>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? 'fill-current' : 'text-gray-200'} />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-bold">2 months ago</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 font-bold hover:border-rose-500 hover:text-rose-500 transition-colors">
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
