"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Advocate-Client Privilege",
      description: "Under the legal privilege rules of Pakistan, any information, CNIC copy, property registry document, or case brief you share with our advocates is strictly confidential and protected from disclosure.",
      icon: <ShieldCheck className="w-5 h-5 text-gold" />
    },
    {
      title: "2. FBR & SECP Credential Security",
      description: "Your FBR Iris passcodes, SECP credentials, and e-Payments logins are never stored in plain text or shared. They are strictly used by our verified consultants to file your requested forms and returns.",
      icon: <Lock className="w-5 h-5 text-cyan" />
    },
    {
      title: "3. No Third-Party Data Sharing",
      description: "We do not sell, trade, or share your contact numbers, business data, or financial logs with any third-party marketing companies. All consultations remain entirely private.",
      icon: <EyeOff className="w-5 h-5 text-gold" />
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#02050e] min-h-screen text-slate-300 relative overflow-hidden">
      {/* Decorative Glowing Elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-900/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Privacy Policy & <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-[#e3b850] to-gold">Client Privilege</span>
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Effective Date: May 17, 2026. We are committed to protecting your personal, corporate, and legal consultation data under strict ethical guidelines.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={index}
              className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md shadow-xl hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-white/5">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Block */}
        <div className="p-8 rounded-3xl bg-linear-to-br from-[#0d1f18]/30 via-slate-900/40 to-slate-900/40 border border-gold/10 backdrop-blur-md text-center max-w-2xl mx-auto shadow-2xl">
          <Mail className="w-8 h-8 text-gold mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Have questions about your data security?</h3>
          <p className="text-sm text-slate-400 mb-6">
            Get in touch directly with our corporate compliance desk at our law chamber.
          </p>
          <a href="mailto:legal@digitallawchamber.pk" className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-sm transition-all">
            legal@digitallawchamber.pk
          </a>
        </div>

      </div>
    </div>
  );
}
