"use client";

import { motion } from 'framer-motion';
import { Award, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
  const razoPoints = [
    "Advocate High Court - 15+ Years Exp",
    "FBR Wealth Statement & Audit Expert",
    "SECP Company Registration Specialist",
    "Registry (Deed) & Mutation (Inteqal)"
  ];

  const buttPoints = [
    "High Court Advocate - 5+ Years Exp",
    "LHC & Session Court Criminal Defense",
    "Pre-Arrest, Post-Arrest & Police Station Bail",
    "PRA, Sales Tax & e-Payments Compliance"
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-800 text-xs font-semibold text-cyan mb-4 shadow-lg">
            <span>High Court Advocates & Corporate Advisors</span>
          </div>
          <h2 className="text-3xl leading-snug font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Meet the <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-[#e3b850] to-amber-500 background-animate">Lead Advocates</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4">
            Our experienced legal force is ready to help you with expert court representation and professional tax management.
          </p>
        </div>
 
        {/* Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Ahmad Raza Profile */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col bg-black border border-white/5 hover:border-gold/30 rounded-3xl p-8 md:p-12 relative overflow-hidden group transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(212,168,64,0.05)]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-gold group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
              <Award className="w-56 h-56" />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-black border border-gold/30 flex items-center justify-center text-xl font-bold text-gold shadow-lg shadow-gold/10">
                  AR
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-white mb-1 group-hover:text-gold transition-colors duration-300">Advocate Ahmad Raza</h3>
                  <p className="text-cyan font-bold tracking-wide text-sm">Senior Counsel (Civil Litigation & FBR/SECP Tax)</p>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Trusted High Court Advocate with over 15 years of experience. Expert in FBR tax audits, SECP company registration, property registry (Registryan), and land mutations (Inteqal).
                </p>
              </div>
 
              {/* Bullet Points */}
              <ul className="space-y-2 pt-2">
                {razoPoints.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 font-semibold text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
 
              <div className="pt-6">
                <Link href="/about" className="group/link inline-flex items-center gap-2 font-black text-xs uppercase tracking-wider text-gold hover:text-white transition-colors">
                  View Full Credentials <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
 
          {/* Khalil ur Rehman Butt Profile */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col bg-black border border-white/5 hover:border-gold/30 rounded-3xl p-8 md:p-12 relative overflow-hidden group transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(212,168,64,0.05)]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-gold group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
              <ShieldAlert className="w-56 h-56" />
            </div>
 
            <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-black border border-emerald-500/30 flex items-center justify-center text-xl font-bold text-emerald-400 shadow-lg shadow-emerald-500/10">
                  KRB
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-white mb-1 group-hover:text-gold transition-colors duration-300">Advocate Khalil ur Rehman Butt</h3>
                  <p className="text-emerald-400 font-bold tracking-wide text-sm">Partner Advocate (Criminal Defense & Corporate Compliance)</p>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  High Court Advocate with over 5 years of active experience. Specializes in criminal cases, securing pre-arrest/post-arrest bail, police station representation, and provincial PRA / sales tax filings.
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 pt-2">
                {buttPoints.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 font-semibold text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Link href="/about" className="group/link inline-flex items-center gap-2 font-black text-xs uppercase tracking-wider text-emerald-400 hover:text-white transition-colors">
                  View Full Credentials <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
