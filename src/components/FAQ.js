"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Filer banne ke kya faide hain?",
    answer: "Active Taxpayer (Filer) banne se aapko property, gariyan kharidte waqt, aur bank transactions par tax half (adha) dena parta hai. Iske ilawa, aap international travel aur bidding main bhi faida utha sakte hain."
  },
  {
    question: "Tax return file na karne ki kya penalty hai?",
    answer: "FBR rules ke mutabiq, return file na karne par aapka naam Active Taxpayers List (ATL) se nikal diya jata hai. Iske ilawa bhaari jurmana (penalty) aur accounts freeze hone ka bhi khatra hota hai."
  },
  {
    question: "SECP Company Registration main kitna waqt lagta hai?",
    answer: "Agar tamam documents mukammal hon, toh SECP main company register hone main aam taur par 3 se 5 working days lagte hain."
  },
  {
    question: "Kya main apne business tax issues consult kar sakta hoon?",
    answer: "Ji bilkul! Hum FBR Audit, appeal drafting, aur legal tax planning ke tamam corporate issues handle karte hain. Aap consultation book kar sakte hain."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-xs text-gold font-bold tracking-widest uppercase mb-3">Common Questions</h2>
          <p className="leading-tight font-black tracking-tight text-white text-3xl sm:text-4xl md:text-5xl">
            Frequently Asked <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-emerald-400">Questions</span>
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={index} 
              className={`border rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-slate-900/80 border-cyan/40 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                  : 'bg-[#0a0f1c]/50 border-white/5 hover:border-white/10 hover:bg-slate-900/50'
              }`}
            >
              <button
                className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-bold text-white text-lg">{faq.question}</span>
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex shrink-0 items-center justify-center w-8 h-8 rounded-full ${openIndex === index ? 'bg-cyan-900/30 text-cyan' : 'bg-white/5 text-slate-400'}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
