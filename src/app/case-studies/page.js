import { Briefcase, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Case Studies | Digital Law Chamber",
  description: "Anonymized High Court wins and corporate legal success stories.",
};

export default function CaseStudiesPage() {
  const cases = [
    { title: "Acquittal in High-Profile Cyber Crime Case", category: "Criminal Defense", time: "High Court, 2024", desc: "Successfully defended a tech executive against false FIA cybercrime allegations, resulting in complete exoneration based on digital forensic technicalities." },
    { title: "Multi-Million Rupee Corporate Tax Victory", category: "Tax Litigation", time: "FBR Appellate Tribunal, 2023", desc: "Overturned an unjust FBR audit demand of PKR 45M for a leading manufacturing firm through aggressive appellate advocacy." },
    { title: "Cross-Border SECP Merger Enforcement", category: "Corporate Law", time: "SECP, 2025", desc: "Drafted and executed a seamless tech merger between a Silicon Valley parent and a Lahori subsidiary within 30 days." }
  ];

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Landmark <span className="text-gold">Judgments</span>
          </h1>
          <p className="text-xl text-slate-400">
            Real impact measured in court victories and corporate expansions. Confidentiality maintained.
          </p>
        </div>

        <div className="space-y-12">
          {cases.map((c, idx) => (
            <div key={idx} className="group relative bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-800 hover:border-gold/30 transition-all duration-300 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-[80px] group-hover:bg-gold/10 transition-colors"></div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                <div className="md:col-span-1">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-midnight border border-slate-800 text-gold mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <p className="text-cyan font-bold text-sm tracking-wider uppercase mb-1">{c.category}</p>
                  <p className="text-slate-500 text-sm font-medium">{c.time}</p>
                </div>
                
                <div className="md:col-span-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors">{c.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg mb-6">{c.desc}</p>
                  <button className="flex items-center text-cyan font-bold hover:text-white transition-colors">
                    Read Judgment Abstract <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
