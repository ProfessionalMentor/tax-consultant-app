"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Zainab Ahmed",
    company: "TechLogix PK",
    text: "Advocate Ahmad Raza completely transformed our corporate IT compliance. Their ability to bridge the gap between SECP regulations and modern tech is unmatched in Lahore.",
    rating: 5
  },
  {
    name: "Faisal Qureshi",
    company: "Qureshi Traders",
    text: "I was stuck with an FBR tax audit for months. Digital Law Chamber stepped in, handled all the litigation, and got the audit cleared in weeks. Highly recommended!",
    rating: 5
  },
  {
    name: "Dr. Salman Tariq",
    company: "Private Clinic Owner",
    text: "The smoothest Filer registration process ever. I just sent them my documents on WhatsApp, and they handled everything. True professionals.",
    rating: 5
  }
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-cyan font-bold tracking-widest uppercase text-xs mb-3">Client Success</h2>
          <p className="text-3xl leading-snug font-black tracking-tight text-white sm:text-4xl max-w-2xl mx-auto">
            Trusted by Leaders Across <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-[#e3b850]">Pakistan</span>
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              variants={itemVariants}
              key={index} 
              className="bg-black p-8 rounded-3xl border border-white/10 hover:border-gold/30 transition-colors shadow-xl relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <p className="text-white font-bold">{testimonial.name}</p>
                <p className="text-cyan text-sm font-medium">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
