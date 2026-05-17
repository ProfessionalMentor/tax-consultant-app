"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContact() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1, type: "spring", bounce: 0.5 }}
      className="fixed bottom-6 right-6 z-50 hidden sm:flex flex-col gap-4"
    >
      <Link 
        href="https://wa.me/923224760050" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 transform hover:scale-110 hover:-translate-y-1 hover:rotate-6 transition-all duration-300 relative group"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute right-full mr-4 bg-[#0a0f1c]/90 text-sm font-semibold text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 whitespace-nowrap pointer-events-none drop-shadow-md">
          WhatsApp Us
        </span>
      </Link>
      
      <Link 
        href="tel:+923224760050" 
        className="w-14 h-14 bg-linear-to-r from-gold to-[#c59628] hover:from-[#e3b850] hover:to-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/20 transform hover:scale-110 hover:-translate-y-1 hover:-rotate-6 transition-all duration-300 relative group"
      >
        <Phone className="w-6 h-6 text-[#040814]" fill="currentColor" />
        <span className="absolute right-full mr-4 bg-[#0a0f1c]/90 text-sm font-semibold text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 whitespace-nowrap pointer-events-none drop-shadow-md">
          Call Now
        </span>
      </Link>
    </motion.div>
  );
}
