import { ChevronRight, Award } from 'lucide-react';

export const metadata = {
  title: "Careers | Join the Digital Law Chamber",
  description: "Opportunities for Junior Lawyers and Tech Interns.",
};

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Shape the Future of <span className="text-gold">Law & Tech</span>
          </h1>
          <p className="text-xl text-slate-400">
            We are always scouting for brilliant High Court interns, tax consultants, and Next.js developers aiming to redefine corporate compliance in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="bg-slate-950 p-10 rounded-3xl border border-slate-800 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-gold" /> Available Mentorships
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700 hover:border-gold/50 transition-colors group">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">Junior Legal Associate</h3>
                    <p className="text-sm text-slate-500 mt-1">High Court Drafting & Research</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-gold" />
                </div>
              </div>
              
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700 hover:border-cyan/50 transition-colors group">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan transition-colors">Next.js SaaS Intern</h3>
                    <p className="text-sm text-slate-500 mt-1">Frontend Development (React)</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl"></div>
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Submit Your Profile</h2>
            <form className="space-y-4 relative z-10">
              <input type="text" placeholder="Full Name" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-gold transition-colors" />
              <input type="email" placeholder="Email Address" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-gold transition-colors" />
              <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-slate-400 focus:outline-none focus:border-gold transition-colors">
                <option>Select Role: Junior Legal Associate</option>
                <option>Select Role: Next.js SaaS Intern</option>
                <option>Select Role: FBR Audit Specialist</option>
              </select>
              <textarea placeholder="Cover Letter Snippet" rows="3" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:outline-none focus:border-gold transition-colors"></textarea>
              <button type="submit" className="w-full bg-linear-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-gold text-midnight font-bold p-4 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,7,0.4)]">
                Submit Application
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
