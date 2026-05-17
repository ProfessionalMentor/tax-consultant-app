"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 18 }
    }
  };

  return (
    <section className="relative w-full h-screen max-h-[100vh] flex items-center justify-center overflow-hidden bg-black pt-20 pb-4">
      {/* Premium Aurora Background Effect */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center h-full">
        <motion.div 
          className="text-center max-w-4xl flex flex-col items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Slogan badge with tighter margins */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-800 text-xs font-semibold text-cyan mb-4 shadow-2xl">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trusted Legal Advocates & Tax Consultants</span>
          </motion.div>

          {/* Compressed heading for 1080p fit */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4"
          >
            Expert Legal Help <br/>
            & <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-[#e3b850] to-gold background-animate">Easy Tax Solutions</span>
          </motion.h1>
          
          {/* Compressed description paragraphs */}
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6"
          >
            We provide simple and professional services for Income Tax, Sales Tax, FBR, SECP, PRA, e-Payments, and Property Registry, along with expert Civil and Criminal litigation in the High Court, Session Courts, and Police Stations.
          </motion.p>

          {/* Action buttons with tighter sizing */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full"
          >
            <Link href="/contact" className="group relative px-6 py-3 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] rounded-xl font-bold text-[#040814] text-base overflow-hidden transition-all shadow-[0_0_20px_rgba(197,150,40,0.2)] hover:shadow-[0_0_30px_rgba(197,150,40,0.4)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                Book a Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
            </Link>
            
            <Link href="/services" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl text-base backdrop-blur-md transition-all duration-300 flex items-center justify-center group transform hover:-translate-y-0.5">
              Explore Services
            </Link>
          </motion.div>

          {/* Compact Modern Stats Bar */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-10 pt-8 border-t border-slate-800/80"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -4, borderColor: "rgba(184,144,71,0.3)", boxShadow: "0 15px 30px rgba(184,144,71,0.06)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center p-4 bg-[#040814]/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl transition-all duration-500 cursor-pointer"
            >
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-gold via-[#e3b850] to-gold">99.2%</span>
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Satisfied Clients</span>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -4, borderColor: "rgba(6,182,212,0.3)", boxShadow: "0 15px 30px rgba(6,182,212,0.06)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center p-4 bg-[#040814]/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl transition-all duration-500 cursor-pointer"
            >
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan to-blue-500">300+</span>
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Active Clients</span>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -4, borderColor: "rgba(184,144,71,0.3)", boxShadow: "0 15px 30px rgba(184,144,71,0.06)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center p-4 bg-[#040814]/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl transition-all duration-500 cursor-pointer"
            >
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-gold via-[#e3b850] to-gold">100+</span>
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Court Victories</span>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -4, borderColor: "rgba(6,182,212,0.3)", boxShadow: "0 15px 30px rgba(6,182,212,0.06)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center p-4 bg-[#040814]/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl transition-all duration-500 cursor-pointer"
            >
              <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan to-blue-500">20+</span>
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Years Experience</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
