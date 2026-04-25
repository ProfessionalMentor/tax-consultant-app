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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#040814] pt-20">
      {/* Premium Aurora Background Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0a1128] via-[#040814] to-[#0d1f18] z-0"></div>
      
      {/* Animated Light Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-160 h-160 bg-cyan-700/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-180 h-180 bg-gold/10 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <motion.div 
          className="text-center max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-800 text-sm font-semibold text-cyan mb-8 shadow-2xl">
            <ShieldCheck className="w-4 h-4" />
            <span>Pakistan's Premier Trusted Corporate Law & Tax Experts</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mb-8"
          >
            Pioneering <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-[#e3b850] to-gold background-animate">Legal Excellence</span> <br/>
            & <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-emerald-400">Tech Innovation</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-400 md:max-w-3xl mx-auto leading-relaxed mb-10"
          >
            From High Court Litigation to cutting-edge Digital SaaS. A powerful synergy protecting your corporate rights and digitizing your future.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center mt-4 w-full"
          >
            <Link href="/contact" className="group relative px-8 py-4 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] rounded-xl font-bold text-[#040814] text-lg overflow-hidden transition-all shadow-[0_0_30px_rgba(197,150,40,0.3)] hover:shadow-[0_0_50px_rgba(197,150,40,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <span className="relative z-10 w-full flex justify-center items-center gap-2">
                Book a Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
            </Link>
            
            <Link href="/services" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl text-lg backdrop-blur-md transition-all duration-300 flex items-center justify-center group transform hover:-translate-y-1">
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
