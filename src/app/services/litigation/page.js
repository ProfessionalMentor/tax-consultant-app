import { Scale, ShieldAlert, Gavel, FileCheck } from 'lucide-react';

export const metadata = {
  title: "High Court Litigation | Digital Law Chamber",
  description: "Specialized defense and appellate advocacy in Civil and Criminal Law.",
};

export default function LitigationPage() {
  const practices = [
    { title: "LHC & Session Court Bail", icon: <Scale className="w-8 h-8 text-gold" />, desc: "Complete assistance for securing pre-arrest bail, post-arrest bail, and protective bail from Lahore High Court, Session Courts, and Police Stations." },
    { title: "High Court Civil Litigation", icon: <Scale className="w-8 h-8 text-gold" />, desc: "Representation in property ownership title disputes, stay orders, landlord-tenant disputes, and mutations (Inteqal) issues." },
    { title: "Criminal Defense & FIA", icon: <ShieldAlert className="w-8 h-8 text-gold" />, desc: "Strong legal defense in financial crimes, white-collar cases, fraud allegations, and FIA cybercrime proceedings by Adv. Khalil ur Rehman Butt." },
    { title: "Stay Orders & Disputes", icon: <Gavel className="w-8 h-8 text-gold" />, desc: "Securing stay orders, lease enforcement, contract breaches, and commercial recovery suits across high court and lower court forums." }
  ];

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 border border-gold/30 text-gold text-xs font-bold mb-6 shadow-[0_0_20px_rgba(168,85,7,0.3)]">
            Bail & High Court Litigation Desks
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Expert <span className="text-gold">Court Representation</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Our powerhouse team provides strong legal support in Lahore High Court, Session Courts, and Police Stations, specializing in civil disputes, criminal defense, and bail petitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {practices.map((practice, idx) => (
            <div key={idx} className="bg-slate-900/40 p-10 rounded-3xl border border-slate-800 hover:border-gold/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                {practice.icon}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-midnight flex items-center justify-center mb-6 shadow-2xl border border-slate-800 group-hover:-translate-y-2 transition-transform">
                {practice.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{practice.title}</h3>
              <p className="text-slate-400 leading-relaxed">{practice.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 border border-slate-800 p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gold/5 blur-[100px]"></div>
          <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Need Urgent Bail or Legal Defense?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">
            Secure an immediate confidential consultation with Advocate Ahmad Raza or Advocate Khalil ur Rehman Butt to protect your rights.
          </p>
          <a href="/contact" className="inline-block px-10 py-5 bg-gold hover:bg-yellow-600 text-midnight font-black tracking-wide rounded-xl transition-all shadow-lg shadow-gold/20 transform hover:-translate-y-1 relative z-10">
            Contact Our Advocates Now
          </a>
        </div>

      </div>
    </div>
  );
}
