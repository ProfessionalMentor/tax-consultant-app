"use client";

import Link from 'next/link';
import { Scale, MapPin, Mail, Phone, Calculator, Gavel, Building2, FileSpreadsheet, ShieldCheck, ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/lawyer') || pathname.startsWith('/client') || pathname.startsWith('/dashboard');
  if (isDashboard) return null;

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black border border-gold/40 flex items-center justify-center shadow-lg">
                <Scale className="text-gold w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight block leading-tight">Digital Law</span>
                <span className="text-xs font-bold text-cyan uppercase tracking-widest block">Chamber</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Premier legal advisory and corporate tax house. Spearheaded by Advocate Ahmad Raza and Advocate Khalil ur Rehman Butt, Lahore High Court.
            </p>
            {/* Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-gold/20 text-xs font-bold text-gold">
              <ShieldCheck className="w-4 h-4 text-gold animate-pulse" />
              <span>FBR & SECP Authorized</span>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6 pb-2 border-b border-white/5 inline-block">
              Chamber Desks
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="hover:text-gold transition-colors flex items-center gap-2 text-xs md:text-sm">
                  <Gavel className="w-4 h-4 text-gold/80" /> High Court Litigation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors flex items-center gap-2 text-xs md:text-sm">
                  <Calculator className="w-4 h-4 text-cyan/80" /> FBR Taxation & ATL
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors flex items-center gap-2 text-xs md:text-sm">
                  <Building2 className="w-4 h-4 text-gold/80" /> SECP company setups
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors flex items-center gap-2 text-xs md:text-sm">
                  <FileSpreadsheet className="w-4 h-4 text-cyan/80" /> Registry & Mutation
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Hub Links */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6 pb-2 border-b border-white/5 inline-block">
              Quick Hub
            </h4>
            <ul className="space-y-3 text-xs md:text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">The Lead Advocates</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Case Portfolio</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">FBR & SECP Vault</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Book Consultations</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-6 pb-2 border-b border-white/5 inline-block">
              Headquarters
            </h4>
            <ul className="space-y-4 text-xs md:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold w-4 h-4 mt-0.5 shrink-0" />
                <span>Lahore High Court Bar Association, Lower Mall, Lahore</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold w-4 h-4 shrink-0" />
                <a href="tel:+923004882260" className="font-mono hover:text-white transition-colors">+92 300 4882260</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold w-4 h-4 shrink-0" />
                <a href="mailto:legal@digitallawchamber.pk" className="font-mono hover:text-white transition-colors">legal@digitallawchamber.pk</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Subline */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
          <p>&copy; {currentYear} Digital Law Chamber (Adv. Ahmad Raza & Khalil ur Rehman Butt). All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="https://iris.fbr.gov.pk" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-1">
              FBR Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
