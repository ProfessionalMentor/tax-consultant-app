"use client";

import Link from 'next/link';
import { Scale, MapPin, Mail, Phone, Calculator, Gavel } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight border-t border-slate-800 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Scale className="text-gold w-8 h-8" />
              <div>
                <span className="font-extrabold text-xl text-white block">Digital Law</span>
                <span className="text-xs font-medium text-cyan uppercase tracking-widest block">Chamber</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6">
              A premier legal tech firm directed by Advocate Ahmad Raza and Advocate Khalil ur Rehman Butt, pioneering High Court advocacy and SECP incorporation in Pakistan.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Chamber Desks</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="/services/litigation" className="hover:text-gold transition-colors flex items-center gap-2"><Gavel className="w-4 h-4" /> Bail & High Court Litigation</Link></li>
              <li><Link href="/services/taxation" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><Calculator className="w-4 h-4" /> FBR Tax Compliance</Link></li>
              <li><Link href="/services/registry" className="hover:text-cyan transition-colors">Registry & Mutations</Link></li>
              <li><Link href="/services/e-payments" className="hover:text-amber-400 transition-colors">e-Payments & e-PADS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Quick Hub</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">The Lead Advocates</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Tech & Law Portfolio</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Tax Calculators</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Compliance Guides</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Join the Chamber</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Headquarters</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start">
                <MapPin className="text-gold w-5 h-5 mr-3 shrink-0" />
                <span>Lahore High Court Bar Association, Lower Mall, Lahore</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-gold w-5 h-5 mr-3 shrink-0" />
                <span className="font-mono">+92 300 1234567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-gold w-5 h-5 mr-3 shrink-0" />
                <span className="font-mono">legal@digitallawchamber.pk</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>&copy; {currentYear} Digital Law Chamber (Adv. Ahmad Raza & Khalil ur Rehman Butt). All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/pwa-install" className="hover:text-cyan transition-colors">Install App</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
