"use client";

import { motion } from 'framer-motion';
import { Scale, FileSpreadsheet, Building2, Coins, Briefcase, Landmark, ShieldAlert, FileSignature } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Income Tax & Filer Registration",
      description: "Become a filer and register for Income Tax easily. We help individuals and businesses file returns and save withholding taxes.",
      icon: <FileSpreadsheet className="w-8 h-8 text-amber-500" />
    },
    {
      title: "Sales Tax & GST Registration",
      description: "Register for Sales Tax and stay fully compliant. We handle monthly tax returns and linkages with FBR.",
      icon: <Coins className="w-8 h-8 text-amber-500" />
    },
    {
      title: "FBR Audits & Notices",
      description: "Received a notice from FBR? We provide professional legal representation and expert support in tax audits and appeals.",
      icon: <Landmark className="w-8 h-8 text-cyan" />
    },
    {
      title: "SECP Company Registration",
      description: "Register your company (SMC-Private Limited or Private Limited) with SECP quickly. Complete memorandum drafting and annual filings.",
      icon: <Building2 className="w-8 h-8 text-cyan" />
    },
    {
      title: "PRA Service Tax Compliance",
      description: "Punjab Revenue Authority (PRA) tax filings, invoicing, and provincial tax compliance for service-oriented businesses.",
      icon: <Briefcase className="w-8 h-8 text-cyan" />
    },
    {
      title: "e-Payments & e-PADS Services",
      description: "Easy online tax payments, e-payments, and E-PADS procurement portal registrations for government tenders.",
      icon: <Coins className="w-8 h-8 text-amber-500" />
    },
    {
      title: "Property Registry & Mutations",
      description: "Drafting of registry documents (Registryan), mutation logs (Inteqal), registrar office execution, and title clearances.",
      icon: <FileSignature className="w-8 h-8 text-amber-500" />
    },
    {
      title: "Bail & Criminal Litigation",
      description: "Get professional representation for securing pre-arrest bail, post-arrest bail, and protective bail from Lahore High Court, Session Courts, and Police Stations.",
      icon: <Scale className="w-8 h-8 text-amber-500 animate-pulse" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 18 }
    }
  };

  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-800 text-xs font-semibold text-cyan mb-4 shadow-lg">
            <span>Specialized Legal & Tax Services</span>
          </div>
          <h2 className="text-3xl leading-snug font-black tracking-tight text-white sm:text-4xl md:text-5xl max-w-3xl mx-auto">
            Our Professional <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-[#e3b850] to-amber-500 background-animate">Chamber Services</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            We handle your Income Tax, Sales Tax, FBR, SECP, PRA, e-Payments, Property Registries, and Lahore High Court / Session Court / Police Station bail litigation.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <motion.div 
              variants={itemVariants}
              key={index} 
              className="group relative bg-linear-to-br from-[#0c0f1d] via-black to-[#020408] backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(212,168,64,0.05)]"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center border border-white/5 mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300 relative z-10">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm relative z-10 group-hover:text-slate-300 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
