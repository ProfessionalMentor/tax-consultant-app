import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

export const metadata = {
  title: "Legal & Tax Insights | Blog | Digital Law Chamber",
  description: "Latest High Court judgments, FBR SROs, and SECP regulations affecting corporate Pakistan.",
};

export default function BlogPage() {
  const posts = [
    { 
      title: "Landmark High Court Ruling on Section 111 (Unexplained Wealth)", 
      excerpt: "Advocate Ahmad Raza breaks down the recent High Court appellate judgment dismissing the Inland Revenue's unchecked taxation powers on foreign remittances.", 
      category: "Tax Litigation", date: "Oct 15, 2025", author: "Ahmad Raza" 
    },
    { 
      title: "SECP Modifies Director KYC Requirements for Tech Startups", 
      excerpt: "A deep dive into the updated SMC/Private Limited filing requirements geared toward streamlining Silicon Valley venture capital inflows.", 
      category: "Corporate Law", date: "Oct 02, 2025", author: "Legal Desk" 
    },
    { 
      title: "FIA Cybercrime Act: Defending Data Breaches in High Court", 
      excerpt: "Advocate Khalil ur Rehman Butt explains corporate liability and criminal defense mechanisms when tech firms face sudden FIA operational raids.", 
      category: "Criminal Defense", date: "Sep 28, 2025", author: "Khalil ur Rehman Butt" 
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-gold mb-6 text-gold shadow-[0_0_20px_rgba(168,85,7,0.3)]">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Chamber <span className="text-gold">Insights</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Deciphering the complexities of Pakistani Tax, Corporate structures, and Appellate judgments so you stay legally bulletproof.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-12">
            {posts.map((post, idx) => (
              <article key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-500 transition-colors group relative overflow-hidden">
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  <span className="flex items-center text-cyan"><Tag className="w-4 h-4 mr-1" /> {post.category}</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {post.date}</span>
                  <span>By {post.author}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors">{post.title}</h2>
                <p className="text-slate-400 leading-relaxed mb-6 text-lg">{post.excerpt}</p>
                
                <button className="flex items-center text-gold font-bold hover:text-white transition-colors">
                  Read Full Abstract <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Subscribe to Bulletins</h3>
              <p className="text-sm text-slate-400 mb-6">Receive emergency FBR SROs and High Court precedence alerts directly to your inbox.</p>
              <form className="space-y-4">
                <input type="email" placeholder="ceo@startup.pk" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan" />
                <button type="submit" className="w-full bg-cyan hover:bg-cyan/80 text-midnight font-bold py-3 rounded-xl transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Legal Tropes</h3>
              <ul className="space-y-3">
                {["Inland Revenue Audit (12)", "Cyber Crime Bill (8)", "Mergers & Acquisitions (5)", "Civil Appellate (14)"].map((tag, idx) => (
                  <li key={idx}>
                    <button className="text-sm font-medium text-slate-400 hover:text-gold transition-colors">
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>

      </div>
    </div>
  );
}
