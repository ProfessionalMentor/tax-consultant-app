import { Download, FileText, FileSearch, HelpCircle } from 'lucide-react';

export const metadata = {
  title: "Tax & Legal Resources | Digital Law Chamber",
  description: "Downloadable PDF checklists and legal guides.",
};

export default function ResourcesPage() {
  const categories = [
    { title: "Tax Return Checklists", icon: <FileText className="w-6 h-6 text-gold" />, items: ["Individual Salary Filer Checklist", "Corporate Filer Checklist (AOP/Pvt Ltd)", "Wealth Proxy Mapping Form"] },
    { title: "SECP Incorporation", icon: <FileSearch className="w-6 h-6 text-cyan" />, items: ["Memorandum of Association Template", "Articles of Association Guide", "Directors' KYC Requirements"] },
    { title: "Legal Drafting", icon: <HelpCircle className="w-6 h-6 text-emerald-400" />, items: ["Standard Non-Disclosure Agreement (NDA)", "Employment Contract Template", "Rent Agreement Abstract"] },
  ];

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Legal & Tax <span className="text-cyan">Resource Vault</span>
          </h1>
          <p className="text-lg text-slate-400">
            Access our free repository of compliance checklists, legal templates, and FBR regulatory guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-500 transition-colors shadow-2xl">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-slate-800">
                {cat.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-6">{cat.title}</h2>
              <ul className="space-y-4">
                {cat.items.map((item, id) => (
                  <li key={id}>
                    <button className="w-full flex justify-between items-center text-left text-slate-400 hover:text-white transition-colors group">
                      <span className="text-sm font-medium">{item}</span>
                      <Download className="w-4 h-4 text-slate-600 group-hover:text-cyan transition-colors" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
