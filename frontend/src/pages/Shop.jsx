import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  
  // Mock data - in real app, fetch from API
  const mockProducts = [
    { id: 1, name: 'Luminous Silk Foundation', price: 64.00, category: 'Makeup', image: 'https://via.placeholder.com/300?text=Foundation', isNew: true, brand: 'GlowNova' },
    { id: 2, name: 'Hydrating Night Cream', price: 45.50, category: 'Skincare', image: 'https://via.placeholder.com/300?text=Night+Cream', isNew: false, brand: 'GlowNova' },
    { id: 3, name: 'Matte Liquid Lipstick', price: 22.00, category: 'Makeup', image: 'https://via.placeholder.com/300?text=Lipstick', isNew: false, brand: 'NaturePure' },
    { id: 4, name: 'Rosewater Facial Mist', price: 18.00, category: 'Skincare', image: 'https://via.placeholder.com/300?text=Facial+Mist', isNew: true, brand: 'NaturePure' },
    { id: 5, name: 'Volcanic Ash Clay Mask', price: 34.00, category: 'Skincare', image: 'https://via.placeholder.com/300?text=Clay+Mask', isNew: false, brand: 'GlowNova' },
    { id: 6, name: 'Golden Hour Highlighter', price: 28.00, category: 'Makeup', image: 'https://via.placeholder.com/300?text=Highlighter', isNew: false, brand: 'GlowNova' },
    { id: 7, name: 'Argan Oil Hair Serum', price: 32.00, category: 'Haircare', image: 'https://via.placeholder.com/300?text=Hair+Serum', isNew: true, brand: 'SilkTouch' },
    { id: 8, name: 'Midnight Jasmine Perfume', price: 85.00, category: 'Fragrance', image: 'https://via.placeholder.com/300?text=Perfume', isNew: false, brand: 'Elegance' },
  ];

  const categories = ['All', 'Skincare', 'Makeup', 'Haircare', 'Fragrance'];
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('Featured');

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchParams(category === 'All' ? {} : { category: category.toLowerCase() });
  };

  const filteredProducts = activeCategory === 'All' 
    ? mockProducts 
    : mockProducts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">
          {activeCategory === 'All' ? 'The Collection' : activeCategory}
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Discover our range of premium cosmetics designed to enhance your natural beauty.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-gray-100">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                activeCategory.toLowerCase() === category.toLowerCase() 
                  ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' 
                  : 'bg-white border border-gray-100 text-gray-500 hover:border-rose-500 hover:text-rose-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-100 rounded-2xl px-6 py-2.5 pr-12 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer w-full"
            >
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <button className="p-2.5 bg-white border border-gray-100 rounded-2xl text-gray-500 hover:text-rose-500 hover:border-rose-500 transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-400">Try selecting a different category or clearing your filters.</p>
          <button 
            onClick={() => handleCategoryChange('All')}
            className="mt-6 text-rose-500 font-bold underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
