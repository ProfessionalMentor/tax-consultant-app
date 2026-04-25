import { Scale, Shield, Award, Briefcase } from 'lucide-react';

export const metadata = {
  title: "The Chamber | Ahmad Raza & Khalil ur Rehman Butt",
  description: "History and vision of the premier Digital Law Chamber combining High Court litigation and tech solutions.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0a0f1c] min-h-screen relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Vision & History */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            The Digital <span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-[#e3b850]">Law Chamber</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Where traditional legal authority meets Silicon Valley technological innovation. We offer a unified shield for your corporate, civil, criminal, and IT developmental rights.
          </p>
        </div>

        {/* Lead Advocates Profile Bento Grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12 border-b border-white/10 pb-4 inline-block mx-auto">
            Our High Court Legal Tier
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Profile 1: Ahmad Raza */}
            <div className="bg-[#040814]/80 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(212,168,64,0.15)] hover:border-gold/30 border border-white/5 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-gold group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Scale className="w-48 h-48" />
              </div>
              <div className="relative z-10 text-white">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-gold/30 flex items-center justify-center text-3xl font-bold mb-6 text-gold shadow-lg shadow-gold/10">
                  AR
                </div>
                <h3 className="text-3xl font-extrabold mb-2">Advocate Ahmad Raza</h3>
                <p className="text-cyan font-medium tracking-wide mb-6">High Court Specialist (Civil & Tech Crimes)</p>
                <div className="space-y-4">
                  <div className="bg-[#0a0f1c]/50 p-4 rounded-xl border border-white/5">
                    <p className="text-sm text-slate-300">With decades of strategic mastery bridging the gap between high-level civil litigation and modern corporate IT compliance. Trusted for multi-million rupee dispute resolutions.</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-400">
                    <li className="flex items-center"><Award className="w-4 h-4 mr-2 text-gold" /> High Court Advocate</li>
                    <li className="flex items-center"><Briefcase className="w-4 h-4 mr-2 text-gold" /> Cyber Law Expert</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Profile 2: Khalil ur Rehman Butt */}
            <div className="bg-[#040814]/80 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-lg relative overflow-hidden group hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] hover:border-emerald-500/30 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-emerald-500 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-48 h-48" />
              </div>
              <div className="relative z-10 text-white">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-3xl font-bold mb-6 text-emerald-400 shadow-lg shadow-emerald-500/10">
                  KRB
                </div>
                <h3 className="text-3xl font-extrabold mb-2">Advocate Khalil ur Rehman Butt</h3>
                <p className="text-emerald-400 font-medium tracking-wide mb-6">High Court Specialist (Criminal Defense)</p>
                <div className="space-y-4">
                  <div className="bg-[#0a0f1c]/50 p-4 rounded-xl border border-white/5">
                    <p className="text-sm text-slate-300">A formidable force in criminal defense across the High Courts of Pakistan. Renowned for strategic acquittal victories, unyielding perseverance, and uncompromising courtroom authority.</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-3 text-sm font-bold text-slate-400">
                    <li className="flex items-center"><Award className="w-4 h-4 mr-2 text-emerald-400" /> High Court Advocate</li>
                    <li className="flex items-center"><Shield className="w-4 h-4 mr-2 text-emerald-400" /> Criminal Defense Pro</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
