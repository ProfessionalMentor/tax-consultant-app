"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Scale, User, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Chamber', href: '/about' },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Litigation & Disputes', href: '/services/litigation' },
      { name: 'Taxation & FBR', href: '/services/taxation' },
      { name: 'SECP & Corporate', href: '/services/secp-company' },
      { name: 'Legal Advisory', href: '/services/legal-advisory' },
      { name: 'NTN & Sales Tax', href: '/services/ntn-sales-tax' },
      { name: 'Filer Registration', href: '/services/filer-registration' },
      { name: 'IT Solutions', href: '/services/it-solutions' }
    ]
  },
  { 
    name: 'Resources', 
    href: '#',
    dropdown: [
      { name: 'Legal Insights', href: '/blog' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Client Tools', href: '/tools' },
      { name: 'Careers', href: '/careers' },
      { name: 'All Resources', href: '/resources' }
    ]
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 rounded-b-2xl md:rounded-b-3xl ${
          isScrolled 
            ? 'bg-[#040814]/85 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)] py-3 lg:py-4' 
            : 'bg-transparent py-5 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo area */}
            <Link href="/" className="flex items-center gap-3 lg:gap-4 group z-50">
              <div className="relative flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-linear-to-br from-slate-800 to-slate-950 border border-slate-700/50 shadow-inner overflow-hidden group-hover:border-gold/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <Scale className="text-gold w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-lg lg:text-2xl tracking-tighter text-white leading-none">
                  Digital Law
                </span>
                <span className="text-[9px] lg:text-[10px] font-bold text-cyan mt-1 uppercase tracking-[0.2em] lg:tracking-[0.3em] leading-none">
                  Chamber
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, i) => (
                <div 
                  key={i}
                  className="relative group px-3 py-2"
                  onMouseEnter={() => setActiveDropdown(i)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-1.5 text-[15px] font-bold transition-colors duration-300 ${
                      pathname === item.href || (item.href !== '#' && pathname.startsWith(`${item.href}/`)) 
                        ? 'text-gold' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === i ? 'rotate-180 text-gold' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#0a0f1c]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                        >
                          <div className="flex flex-col gap-1">
                            {item.dropdown.map((dropItem, j) => (
                              <Link 
                                key={j}
                                href={dropItem.href}
                                className="group/item flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                              >
                                <span className="text-[14px] font-semibold text-slate-300 group-hover/item:text-white transition-colors">
                                  {dropItem.name}
                                </span>
                                <ArrowRight className="w-4 h-4 text-gold opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              
              <div className="pl-6 ml-4 border-l border-white/10 hidden xl:flex items-center gap-5">
                <Link 
                  href="/login" 
                  className="flex items-center gap-2.5 text-[15px] font-bold text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 border border-slate-700 bg-slate-800/50 rounded-full group-hover:bg-slate-700 group-hover:border-cyan/50 transition-all shadow-inner relative overflow-hidden">
                    <User className="w-4 h-4 text-cyan relative z-10" />
                  </div>
                  Client Portal
                </Link>

                <Link 
                  href="/contact" 
                  className="relative overflow-hidden flex items-center justify-center gap-2 text-[15px] font-black text-[#040814] bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] background-animate hover:to-[#f0c560] px-7 py-3 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(197,150,40,0.3)] hover:shadow-[0_0_30px_rgba(197,150,40,0.5)] transform hover:-translate-y-0.5"
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <Link href="/contact" className="text-xs font-bold bg-gold/10 text-gold hover:bg-gold/20 hover:text-white transition-all border border-gold/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(197,150,40,0.15)]">
                Consult
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-50 text-white focus:outline-none p-2.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#040814]/95 pt-28 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 h-full max-w-sm mx-auto">
              <div className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1) }}
                    key={i} 
                    className="flex flex-col border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                  <Link 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-black text-white py-2 tracking-tight"
                  >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="flex flex-col gap-3 mt-3 pl-4 border-l-2 border-white/5">
                        {item.dropdown.map((dropItem, j) => (
                          <Link 
                            key={j}
                            href={dropItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[17px] font-semibold text-slate-400 hover:text-gold transition-colors block"
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4"
              >
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:border-cyan/50 text-white font-bold transition-all shadow-lg"
                >
                  <User className="w-5 h-5 text-cyan" /> 
                  Secure Client Portal
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-[#040814] font-black bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] p-4 rounded-2xl text-[17px] shadow-[0_0_25px_rgba(197,150,40,0.3)] transition-all"
                >
                  Book Priority Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
