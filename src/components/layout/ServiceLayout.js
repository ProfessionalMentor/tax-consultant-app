import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ServiceLayout({ title, subtitle, features, content, ctaText }) {
  return (
    <div className="pt-32 pb-24 bg-[#0a0f1c] min-h-screen relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/services" className="inline-flex items-center text-cyan hover:text-cyan-400 font-bold mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to All Services
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
            
            <div className="prose prose-lg prose-invert prose-emerald text-slate-300 mt-12">
              {content}
            </div>
            
            <div className="bg-[#040814]/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 mt-12 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Key Benefits & Offerings</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-3 shrink-0" />
                    <span className="text-slate-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-slate-900/80 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl border border-white/5">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-gold to-[#e3b850]">Ready to Secure Your Future?</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Schedule a consultation today and let our expert legal team handle the complexities for you. 100% Guaranteed Compliance.
              </p>
              <Link
                href="/auth/register"
                className="block w-full text-center py-4 bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] transform hover:-translate-y-1 text-lg"
              >
                {ctaText || "Book Consultation Now"}
              </Link>
              
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">Or speak directly to our experts:</p>
                <a href="tel:+923224760050" className="mt-2 text-xl font-bold text-gold block hover:text-white transition-colors">
                  +92 322 4760050
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
