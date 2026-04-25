import { Building2, Calculator, HandCoins, FileSearch } from 'lucide-react';

export const metadata = {
  title: "Taxation Services | FBR & SECP | Digital Law Chamber",
  description: "Elite tax planning, SECP incorporation, and audit defense in Pakistan.",
};

export default function TaxationPage() {
  const services = [
    { title: "FBR Income Tax Filing", icon: <Calculator className="w-8 h-8 text-emerald-500" />, desc: "Wealth reconciliation and active taxpayer (ATL) status maintenance. Bulletproof filings to prevent audit triggers." },
    { title: "SECP Incorporation", icon: <Building2 className="w-8 h-8 text-emerald-500" />, desc: "Register your Private Limited (SMC or Ltd) company safely. Complete end-to-end memorandum drafting." },
    { title: "Sales Tax (PRA/SRB/FBR)", icon: <HandCoins className="w-8 h-8 text-emerald-500" />, desc: "Monthly STRN compliance, invoice tracking, and provincial authority alignment across Punjab and Sindh." },
    { title: "Audit & Tribunal Defense", icon: <FileSearch className="w-8 h-8 text-emerald-500" />, desc: "Direct representation before FBR Commissioners (Appeals) countering unjustified tax demands." }
  ];

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 border border-emerald-900 text-emerald-400 text-xs font-bold mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Financial & Corporate Compliance
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Elite <span className="text-emerald-500">Tax Auditing</span> & Strategy
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Securing massive corporate wealth and ensuring 100% Federal Board of Revenue (FBR) and SECP compliance for Silicon Valley startups expanding to Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, idx) => (
            <div key={idx} className="bg-slate-900/40 p-10 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[100px] transition-transform group-hover:scale-150"></div>
              <div className="w-16 h-16 rounded-2xl bg-midnight flex items-center justify-center mb-6 shadow-2xl border border-slate-800 group-hover:shadow-emerald-500/20 transition-shadow">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed relative z-10">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-tr from-emerald-950 to-slate-900 border border-slate-800 p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Receive a Notice from the IRS/FBR?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
            Never reply to a tax notice without legal representation. Upload your notice directly to our Encrypted Client Vault for immediate triage.
          </p>
          <a href="/dashboard/documents" className="inline-block px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-midnight font-black tracking-wide rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] transform hover:-translate-y-1 relative z-10">
            Upload Notice to Secure Vault
          </a>
        </div>

      </div>
    </div>
  );
}
