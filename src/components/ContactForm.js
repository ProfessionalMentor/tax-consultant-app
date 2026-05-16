"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Filer / Income Tax Return',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const message = `*New Consultation Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service Required:* ${formData.service}`;
    
    // Your WhatsApp number (with country code, no + or spaces)
    const whatsappNumber = "923000000000"; 
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10 block">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
        <input 
          type="text" 
          id="name" 
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-xl border-white/10 shadow-sm focus:border-gold focus:ring-gold bg-slate-900/50 py-3 px-4 text-white placeholder-slate-500 transition-colors" 
          placeholder="Ali Raza" 
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-300">Phone / WhatsApp</label>
        <input 
          type="tel" 
          id="phone" 
          required
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-xl border-white/10 shadow-sm focus:border-gold focus:ring-gold bg-slate-900/50 py-3 px-4 text-white placeholder-slate-500 transition-colors" 
          placeholder="+92 300 1234567" 
        />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-slate-300">Required Service</label>
        <select 
          id="service" 
          value={formData.service}
          onChange={handleChange}
          className="mt-1 block w-full rounded-xl border-white/10 shadow-sm focus:border-gold focus:ring-gold bg-slate-900/50 py-3 px-4 text-white transition-colors appearance-none"
        >
          <option className="bg-slate-900">Filer / Income Tax Return</option>
          <option className="bg-slate-900">SECP Company Registration</option>
          <option className="bg-slate-900">Sales Tax / SRB Registration</option>
          <option className="bg-slate-900">Legal Advisory & Drafting</option>
          <option className="bg-slate-900">Other</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(212,168,64,0.2)] text-lg font-bold text-[#040814] bg-linear-to-r from-gold to-[#c59628] hover:from-[#e3b850] hover:to-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0f1c] focus:ring-gold transition-all transform hover:-translate-y-1"
      >
        Request via WhatsApp
      </button>
    </form>
  );
}
