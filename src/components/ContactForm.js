"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Filer / Income Tax Return',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      // 1. Save consultation to MongoDB
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          message: "Request logged via Contact Us page."
        })
      });
      
      // 2. Open WhatsApp anyway (for instant advocate attention)
      const message = `*New Consultation Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service Required:* ${formData.service}`;
      const whatsappNumber = "923224760050"; // Verified advocate mobile
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          service: 'Filer / Income Tax Return',
        });
      }
    } catch (err) {
      console.error("Database connection issue, proceeding to WhatsApp:", err);
    } finally {
      setLoading(false);
    }
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
          placeholder="+92 322 4760050" 
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
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm text-center">
          ✓ Lead successfully saved to MongoDB database! Redirecting to WhatsApp...
        </div>
      )}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(212,168,64,0.2)] text-lg font-bold text-[#040814] bg-linear-to-r from-gold to-[#c59628] hover:from-[#e3b850] hover:to-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0f1c] focus:ring-gold transition-all transform hover:-translate-y-1 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Request via WhatsApp"}
      </button>
    </form>
  );
}
