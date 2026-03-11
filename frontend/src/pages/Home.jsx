import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';

const Home = () => {
  // Mock data for initial view
  const featuredProducts = [
    { id: 1, name: 'Luminous Silk Foundation', price: 64.00, category: 'Makeup', image: 'https://via.placeholder.com/300?text=Foundation', isNew: true },
    { id: 2, name: 'Hydrating Night Cream', price: 45.50, category: 'Skincare', image: 'https://via.placeholder.com/300?text=Night+Cream', isNew: false },
    { id: 4, name: 'Rosewater Facial Mist', price: 18.00, category: 'Skincare', image: 'https://via.placeholder.com/300?text=Facial+Mist', isNew: true },
  ];

  const categories = [
    { name: 'Skincare', image: 'https://via.placeholder.com/400x500?text=Skincare', count: '120+ Products' },
    { name: 'Makeup', image: 'https://via.placeholder.com/400x500?text=Makeup', count: '85+ Products' },
    { name: 'Haircare', image: 'https://via.placeholder.com/400x500?text=Haircare', count: '64+ Products' },
    { name: 'Fragrance', image: 'https://via.placeholder.com/400x500?text=Fragrance', count: '42+ Products' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <img 
            src="https://via.placeholder.com/1920x1080?text=Beauty+Concept" 
            alt="Hero" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-10 duration-1000">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-sm font-bold tracking-wider uppercase mb-6">
              New Collection 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tighter">
              Reveal Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Inner Radiance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Discover our curated selection of luxury cosmetics, formulated with botanical extracts to nourish and enhance your natural beauty.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/shop" className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-rose-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Shop Collection <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/shop?featured=true" className="bg-white border-2 border-gray-100 text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:border-rose-500 hover:text-rose-500 transition-all duration-300 flex items-center justify-center">
                View Best Sellers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-100">
          {[
            { icon: <ShieldCheck className="text-rose-500" />, title: '100% Organic', desc: 'Naturally Sourced' },
            { icon: <Truck className="text-rose-500" />, title: 'Free Shipping', desc: 'On orders over $50' },
            { icon: <RotateCcw className="text-rose-500" />, title: 'Easy Returns', desc: '30-day guarantee' },
            { icon: <Star className="text-rose-500" />, title: 'Premium Quality', desc: 'Expertly Crafted' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2">
              <div className="p-3 bg-rose-50 rounded-2xl mb-2">{item.icon}</div>
              <h4 className="font-bold text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Shop by Category</h2>
            <div className="h-1.5 w-20 bg-rose-500 rounded-full" />
          </div>
          <Link to="/shop" className="text-rose-500 font-bold flex items-center group">
            See All <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link key={idx} to={`/shop?category=${cat.name.toLowerCase()}`} className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <p className="text-rose-400 text-sm font-bold mb-1">{cat.count}</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Best Sellers</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Explore the cult-favorites that our community can't get enough of. Real results for real skin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Join the Glow Club</h2>
            <p className="text-gray-400 mb-10 text-lg">
              Subscribe to receive updates, access to exclusive deals, and more. Plus, get 10% off your first order!
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200"
              />
              <button 
                type="submit"
                className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-600 transition duration-300 transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
