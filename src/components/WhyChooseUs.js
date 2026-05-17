"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, Users, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WhyChooseUs() {
  const cards = [
    {
      title: "Easy Online Updates",
      description: "No need to visit government offices repeatedly. We keep you completely updated on your case or tax status directly via WhatsApp and phone.",
      icon: <MessageSquare className="w-6 h-6 text-cyan" />,
      color: "from-cyan-950/20 to-transparent border-cyan-500/10 hover:border-cyan-500/30"
    },
    {
      title: "100% Safe & Confidential",
      description: "Your personal data, CNIC copies, and FBR login credentials are kept highly secure under strict advocate-client privacy.",
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      color: "from-amber-950/20 to-transparent border-gold/10 hover:border-gold/30"
    },
    {
      title: "Direct Advocate Access",
      description: "Speak directly with Advocate Ahmad Raza and Advocate Khalil ur Rehman Butt. No middle agents, no confusion.",
      icon: <Users className="w-6 h-6 text-cyan" />,
      color: "from-cyan-950/20 to-transparent border-cyan-500/10 hover:border-cyan-500/30"
    },
    {
      title: "Transparent & Simple Pricing",
      description: "Clear and honest consultation rates. We provide simple upfront quotes with zero hidden charges or extra fees.",
      icon: <DollarSign className="w-6 h-6 text-amber-500" />,
      color: "from-amber-950/20 to-transparent border-gold/10 hover:border-gold/30"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-800 text-xs font-semibold text-cyan mb-4 shadow-lg">
            <span>Why Clients Trust Our Chamber</span>
          </div>
          <h2 className="text-3xl leading-snug font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Making Legal & Tax <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-[#e3b850] to-amber-500 background-animate">Simple For You</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4">
            We remove all complications from your legal affairs. Our focus is to deliver transparent, quick, and completely secure services.
          </p>
        </div>

        {/* Bento Grid layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {cards.map((card, index) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -6, 
                borderColor: index % 2 === 1 ? "rgba(184,144,71,0.3)" : "rgba(6,182,212,0.3)",
                boxShadow: index % 2 === 1 ? "0 25px 50px rgba(184,144,71,0.08)" : "0 25px 50px rgba(6,182,212,0.08)"
              }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              key={index}
              className={`p-8 md:p-10 rounded-3xl bg-linear-to-br ${card.color} border backdrop-blur-md transition-all duration-500 shadow-xl cursor-pointer`}
            >
              <div className="w-14 h-14 rounded-2xl bg-black border border-white/5 flex items-center justify-center mb-6 shadow-md">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick CTA banner */}
        <div className="flex justify-center">
          <Link href="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-white transition-all">
            Get Started with Us Today
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
