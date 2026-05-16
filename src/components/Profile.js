"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Profile() {
  const bulletPoints = [
    "Advocate High Court & Legal Advisor",
    "Expert in FBR Tax Audits & Legal Drafting",
    "SECP Corporate Consultant",
    "Verified Success Record with Corporate Clients"
  ];

  return (
    <section className="py-24 bg-[#0a0f1c] relative overflow-hidden border-t border-white/5">
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 lg:mb-0 relative"
          >
            <div className="aspect-w-3 aspect-h-4 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
              <div className="absolute inset-0 bg-transparent group-hover:bg-cyan-900/10 transition-colors z-10" />
              {/* Fallback space for an image since we don't have an asset yet */}
              <div className="w-full h-96 lg:h-128 bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center text-center p-6">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-gold/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(212,168,64,0.2)]">
                  <span className="text-4xl">👨‍⚖️</span>
                </div>
                <span className="text-slate-400 font-medium text-lg">Professional Portrait Area</span>
                <span className="text-sm text-slate-500 mt-2">Upload asset later</span>
              </div>
            </div>
            
            {/* Experience Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 lg:-right-12 bg-linear-to-br from-emerald-600 to-cyan-700 rounded-2xl p-6 shadow-2xl shadow-emerald-900/50 border border-emerald-400/20 text-white z-20 backdrop-blur-md"
            >
              <p className="text-4xl lg:text-5xl font-black drop-shadow-md">20+</p>
              <p className="font-bold text-emerald-100 drop-shadow-sm uppercase tracking-wider text-sm mt-2">Years of<br/>Excellence</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-sm font-bold text-cyan tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-cyan"></span> Meet the Expert
            </h2>
            <p className="text-3xl leading-snug font-black tracking-tight text-white md:text-5xl mb-6">
              Trusted by Hundreds of Businesses across <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-[#e3b850]">Pakistan</span>
            </p>
            <div className="text-slate-400 leading-relaxed text-lg space-y-6">
              <p>
                Our lead consultant brings over two decades of practical experience navigating the complexities of Pakistan's legal, taxation, and corporate landscape. We provide authoritative advice to secure your business assets, ensure absolute compliance, and defend your rights.
              </p>
              
              <ul className="space-y-4 pt-2">
                {bulletPoints.map((item, index) => (
                  <motion.li 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    key={index} 
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                  >
                    <div className="shrink-0 rounded-full bg-cyan-900/30 p-1">
                      <CheckCircle2 className="h-5 w-5 text-cyan" />
                    </div>
                    <span className="text-slate-300 font-semibold">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="mt-10"
            >
              <a href="#contact" className="group inline-flex items-center gap-3 text-gold font-bold text-lg hover:text-[#e3b850] transition-colors border-b-2 border-gold/30 hover:border-gold pb-1 px-1">
                Read Full Biography
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
