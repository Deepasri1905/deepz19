import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">GlowNova</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Empowering your beauty with premium, natural cosmetics. Discover the glow that makes you unique.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-rose-500 hover:text-white transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-rose-500 hover:text-white transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-rose-500 hover:text-white transition duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Shop</h3>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-rose-500 transition duration-200">Skincare</a></li>
              <li><a href="#" className="hover:text-rose-500 transition duration-200">Makeup</a></li>
              <li><a href="#" className="hover:text-rose-500 transition duration-200">Haircare</a></li>
              <li><a href="#" className="hover:text-rose-500 transition duration-200">Fragrance</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Support</h3>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-rose-500 transition duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-rose-500 transition duration-200">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-rose-500 transition duration-200">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-rose-500 transition duration-200">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-rose-500 shrink-0 mt-1" />
                <span>123 Beauty Lane, Glow City, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-rose-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-rose-500 shrink-0" />
                <span>hello@glownova.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} GlowNova Cosmetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
