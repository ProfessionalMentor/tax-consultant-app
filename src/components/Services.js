"use client";

import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "Income Tax Return",
      description: "Hassle-free Filer Registration & meticulous income tax return filings for individuals and businesses.",
      icon: "📊"
    },
    {
      title: "NTN & Sales Tax",
      description: "Quick and compliant registration for National Tax Number and Sales Tax (GST) across Pakistan.",
      icon: "🏢"
    },
    {
      title: "SECP Company Registration",
      description: "End-to-end legal support for Private Limited and Single Member Company (SMC) incorporation.",
      icon: "⚖️"
    },
    {
      title: "Legal Advisory & Drafting",
      description: "Expert drafting of contracts, partnerships, trust deeds, and representation in corporate legal matters.",
      icon: "✍️"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0a0f1c] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-cyan font-bold tracking-widest uppercase text-xs mb-3">Practice Areas</h2>
          <p className="text-3xl leading-snug font-black tracking-tight text-white sm:text-4xl md:text-5xl max-w-3xl mx-auto">
            Comprehensive <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-[#e3b850]">Legal & Tax Solutions</span>
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
              className="group relative bg-[#040814]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-gold/30 hover:bg-slate-900/80 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-gold/5"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="text-4xl mb-6 group-hover:scale-110 group-hover:-rotate-6 origin-bottom-left transition-transform duration-500 relative z-10">
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
