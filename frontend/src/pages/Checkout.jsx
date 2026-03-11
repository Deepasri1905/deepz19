import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, ChevronLeft, MapPin, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '',
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  });

  const totals = {
    subtotal: totalAmount,
    shipping: totalAmount > 50 ? 0 : 10,
    tax: totalAmount * 0.1,
    get total() { return this.subtotal + this.shipping + this.tax; }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  if (items.length === 0 && step !== 3) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter">Checkout</h1>
          <div className="flex items-center justify-center space-x-4">
            {[
              { id: 1, label: 'Shipping' },
              { id: 2, label: 'Payment' },
              { id: 3, label: 'Confirmation' }
            ].map(s => (
              <React.Fragment key={s.id}>
                <div className="flex items-center space-x-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                    step >= s.id ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-gray-200 text-gray-400'
                  }`}>
                    {step > s.id ? <CheckCircle2 size={24} /> : s.id}
                  </div>
                  <span className={`text-sm font-bold ${step >= s.id ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
                </div>
                {s.id < 3 && <div className={`h-1 w-12 rounded-full ${step > s.id ? 'bg-rose-500' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {step === 3 ? (
          /* Confirmation State */
          <div className="max-w-xl mx-auto bg-white rounded-[3rem] p-12 text-center shadow-xl shadow-gray-200 border border-gray-100 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
              <CheckCircle2 size={60} />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Order Confirmed!</h2>
            <p className="text-gray-500 mb-10 text-lg leading-relaxed">
              Thank you for your purchase. We've sent a confirmation email to <strong>{formData.email}</strong>.
            </p>
            <div className="bg-gray-50 rounded-3xl p-6 mb-10 border border-gray-100">
              <p className="text-gray-400 text-sm font-bold uppercase mb-2">Order Number</p>
              <p className="text-2xl font-black text-gray-900">#GN-67249-X</p>
            </div>
            <Link to="/shop" className="bg-gray-900 text-white px-10 py-5 rounded-full font-bold inline-block hover:bg-rose-500 transition-colors shadow-lg shadow-gray-200">
              Back to Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            {/* Form Section */}
            <div className="lg:col-span-7 space-y-8">
              <form onSubmit={handleNextSubmit} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                {step === 1 ? (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                      <MapPin className="mr-3 text-rose-500" /> Shipping Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">First Name</label>
                        <input type="text" name="firstName" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Last Name</label>
                        <input type="text" name="lastName" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                        <input type="email" name="email" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Shipping Address</label>
                        <input type="text" name="address" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">City</label>
                        <input type="text" name="city" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">ZIP Code</label>
                        <input type="text" name="zip" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                      <CreditCard className="mr-3 text-rose-500" /> Secure Payment
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Cardholder Name</label>
                        <input type="text" name="cardName" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Card Number</label>
                        <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Expiry Date</label>
                          <input type="text" name="expiry" placeholder="MM / YY" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">CVV</label>
                          <input type="text" name="cvv" placeholder="***" required onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <button type="button" onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')} className="font-bold text-gray-400 hover:text-rose-500 transition-colors flex items-center">
                    <ChevronLeft size={20} className="mr-1" /> {step === 1 ? 'Return to Cart' : 'Previous Step'}
                  </button>
                  <button type="submit" className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-rose-500 transition-all shadow-lg active:scale-95">
                    {step === 1 ? 'Continue to Payment' : 'Complete Purchase'}
                  </button>
                </div>
              </form>
              
              <div className="flex items-center justify-center space-x-8 py-4 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
                <ShieldCheck size={24} /> <CreditCard size={24} /> <Truck size={24} />
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 sticky top-32">
                <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Order Summary</h3>
                <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl flex-shrink-0 p-2 border border-gray-50">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-gray-800 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 font-bold tracking-wider uppercase">{item.category} × {item.quantity}</p>
                      </div>
                      <span className="font-black text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pt-6 border-t border-gray-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold">Subtotal</span>
                    <span className="font-black text-gray-900">${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold">Shipping</span>
                    <span className="font-black text-gray-900">
                      {totals.shipping === 0 ? <span className="text-green-500 uppercase">Free</span> : `$${totals.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold">Tax</span>
                    <span className="font-black text-gray-900">${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-50">
                    <span className="text-lg font-black text-gray-900">Total</span>
                    <span className="text-3xl font-black text-rose-500 tracking-tighter">${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
