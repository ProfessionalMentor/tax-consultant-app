import { Code, Server, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: "Tech Solutions | Next.js SaaS & Cyber Law",
  description: "Cutting-edge web development and IT compliance solutions from the Digital Law Chamber.",
};

export default function ITSolutionsPage() {
  const features = [
    { title: "SaaS Development", icon: <Code className="w-8 h-8 text-cyan" />, desc: "Next.js & React scalable web portals for modern corporate infrastructures." },
    { title: "MongoDB Atlas Architectures", icon: <Server className="w-8 h-8 text-cyan" />, desc: "Secure, high-availability database designing with strict Zod validation schemas." },
    { title: "Legal Tech & Cyber Law", icon: <ShieldCheck className="w-8 h-8 text-cyan" />, desc: "Regulatory compliance for startups, software licensing, and NDA formulation." },
    { title: "System Automation", icon: <Cpu className="w-8 h-8 text-cyan" />, desc: "Vercel edge optimization, automated cron jobs, and notification engine integrations." }
  ];

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-cyan mb-4 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <span className="w-2 h-2 rounded-full bg-cyan mr-2 animate-pulse"></span>
            Tech Solutions Division
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Architecting the <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-cyan-200">Digital Age</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Beyond traditional law, our chamber is equipped to engineer your corporate future. We build high-performance web applications intertwined with strict corporate legal compliance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-linear-to-tr from-slate-900 to-midnight border border-slate-800 p-12 rounded-3xl text-center shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white mb-4">Need a Custom Web Portal?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            From architecture design in Figma to deployment on Vercel connected with MongoDB Atlas. Let&apos;s discuss your firm&apos;s digitization strategy.
          </p>
          <a href="/contact" className="inline-block px-8 py-4 bg-[#0EA5E9] hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/25 transform hover:-translate-y-1">
            Discuss Your Tech Requirements
          </a>
        </div>

      </div>
    </div>
  );
}
