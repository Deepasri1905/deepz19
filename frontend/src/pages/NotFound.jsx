import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-lg w-full">
        <div className="relative inline-block mb-8">
          <Ghost size={120} className="text-rose-100 animate-bounce duration-[2000ms]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-6xl font-black text-gray-900 tracking-tighter">404</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Oops! Beauty sleep in progress...</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          The page you are looking for has vanished into thin air. It might have been moved, deleted, or never existed in this dimension.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="flex items-center justify-center px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-rose-500 transition-all duration-300 w-full sm:w-auto group"
          >
            <Home size={18} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-8 py-3 border-2 border-gray-100 text-gray-600 rounded-full font-bold hover:border-gray-900 hover:text-gray-900 transition-all duration-300 w-full sm:w-auto group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-50">
          <p className="text-sm text-gray-400 italic">
            "Beauty is in the eye of the beholder, but this page is nowhere to be seen."
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
