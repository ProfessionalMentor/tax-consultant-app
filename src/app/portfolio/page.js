"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FileText, Landmark, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: "fbr-tax-victory",
    title: "PKR 45M FBR Tax Audit Assessment Overturned",
    type: "Tax & Corporate Compliance",
    advocate: "Ahmad Raza (Lead Counsel)",
    forums: "FBR Appellate Tribunal (ATIR), Lahore",
    desc: "Successfully represented a major industrial client against an arbitrary and aggressive income tax audit assessment. Argued against misclassified sales ledgers and unjust withholding tax claims. Secured a complete deletion of the demand.",
    icon: <Scale className="w-8 h-8 text-amber-500 animate-pulse" />,
    color: "from-slate-950 via-[#0a1128] to-slate-950 border-slate-800/60",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.08)] hover:shadow-[0_0_40px_rgba(245,158,11,0.18)]",
    linkText: "Read Tribunal Findings",
    linkHref: "#",
    metrics: ["PKR 45 Million Saved", "Complete Audit Exoneration", "100% Tax Compliant Status"]
  },
  {
    id: "high-court-civil",
    title: "Property Possession & Title Registry Dispute Cleared",
    type: "High Court Litigation",
    advocate: "Ahmad Raza & Khalil-ur-Rehman Butt",
    forums: "Lahore High Court",
    desc: "Defended an elite corporate estate in a high-stakes civil possession suit. Successfully proved the validity of the property transfer registry ('Registry') and mutation logs, nullifying a malicious third-party title challenge.",
    icon: <Landmark className="w-8 h-8 text-cyan animate-pulse" />,
    color: "from-slate-950 via-[#051622] to-slate-950 border-slate-800/60",
    glow: "shadow-[0_0_30px_rgba(6,182,212,0.08)] hover:shadow-[0_0_40px_rgba(6,182,212,0.18)]",
    linkText: "Read LHC Judgment Abstract",
    linkHref: "#",
    metrics: ["Multi-Kanal Title Cleared", "Mutation Logs Validated", "Possession Restored"]
  },
  {
    id: "secp-logistics",
    title: "SECP Group Corporate Structural Integration",
    type: "Tax & Corporate Compliance",
    advocate: "Khalil-ur-Rehman Butt (Corporate Advisor)",
    forums: "Securities & Exchange Commission of Pakistan",
    desc: "Architected a multi-company incorporation wizard and structural compliance layout for a top-tier Pakistani logistics enterprise. Processed name reservations, designed custom Articles of Association, and secured private limited status.",
    icon: <FileText className="w-8 h-8 text-cyan" />,
    color: "from-slate-950 via-[#051622] to-slate-950 border-slate-800/60",
    glow: "shadow-[0_0_30px_rgba(6,182,212,0.08)] hover:shadow-[0_0_40px_rgba(6,182,212,0.18)]",
    linkText: "View Incorporation Specs",
    linkHref: "#",
    metrics: ["SECP Reg Completed in 48h", "Articles of Association Drafted", "NTN & Sales Tax Linked"]
  },
  {
    id: "criminal-bail",
    title: "Bail Granted in Complex Financial PECA Allegations",
    type: "High Court Litigation",
    advocate: "Ahmad Raza (Defense Counsel)",
    forums: "Lahore High Court / Special Courts",
    desc: "Secured post-arrest bail and subsequent acquittal for a business partner accused of white-collar financial fraud. Demonstrated absolute lack of criminal intent and pointed out material anomalies in the prosecution's case file.",
    icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
    color: "from-slate-950 via-[#0a1128] to-slate-950 border-slate-800/60",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.08)] hover:shadow-[0_0_40px_rgba(245,158,11,0.18)]",
    linkText: "Inspect Bail Orders",
    linkHref: "#",
    metrics: ["Post-Arrest Bail Secured", "Charge Sheet Quashed", "Civil Rights Restored"]
  }
];

const filters = ["All", "High Court Litigation", "Tax & Corporate Compliance"];

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProjects = selectedFilter === "All"
    ? projects
    : projects.filter(p => p.type === selectedFilter);

  return (
    <div className="pt-32 pb-24 bg-[#02050e] min-h-screen text-slate-300 relative overflow-hidden">
      
      {/* Aurora Visual Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-700/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-700/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-sm font-semibold text-cyan mb-6 shadow-2xl">
            <Sparkles className="w-4 h-4 text-cyan animate-pulse" />
            <span>Chamber Case & Compliance Successes</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Our Case <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-[#e3b850] to-amber-500 background-animate">Portfolio</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            See some of our successful results in securing bail, winning FBR tax appeals, registering SECP companies, and mutations of property registries.
          </p>
        </div>

        {/* Filter Tab Buttons */}
        <div className="flex justify-center gap-3 mb-16">
          {filters.map((f, i) => (
            <button
              key={i}
              onClick={() => setSelectedFilter(f)}
              className={`px-6 py-3 rounded-full text-[15px] font-bold transition-all duration-300 border ${
                selectedFilter === f
                  ? 'bg-linear-to-r from-amber-500 to-amber-600 text-slate-950 border-transparent shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-105'
                  : 'bg-slate-900/60 backdrop-blur-md text-slate-300 hover:text-white border-white/5 hover:border-white/10 hover:bg-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects and Victories Grid */}
        <div className="space-y-12 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                key={project.id}
                className={`group relative rounded-3xl p-8 md:p-12 bg-linear-to-br ${project.color} border backdrop-blur-md transition-all duration-500 shadow-2xl hover:border-white/10 ${project.glow}`}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-white/10 transition-colors"></div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                  
                  {/* Left Column: Tech Stack & Specs */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#02050e] flex items-center justify-center border border-white/5 shadow-lg">
                      {project.icon}
                    </div>
                    <div>
                      <span className={`text-xs font-black tracking-widest uppercase ${project.type === 'High Court Litigation' ? 'text-cyan' : 'text-amber-500'}`}>
                        {project.type}
                      </span>
                      <h4 className="text-white font-extrabold text-2xl mt-1 leading-tight group-hover:text-amber-500 transition-colors duration-300">
                        {project.title}
                      </h4>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Advocate-In-Charge</p>
                      <p className="text-slate-200 font-bold text-sm">{project.advocate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Judicial/Regulatory Forum</p>
                      <p className="text-slate-400 font-semibold text-xs leading-relaxed font-mono">{project.forums}</p>
                    </div>
                  </div>

                  {/* Middle Column: Description & Metrics */}
                  <div className="lg:col-span-2 space-y-8 lg:pl-6 lg:border-l lg:border-white/5">
                    <div>
                      <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                        {project.desc}
                      </p>
                    </div>

                    {/* Quick Metric Badges */}
                    <div className="space-y-4">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Key Legal Outcomes</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#02050e]/80 border border-white/5 hover:bg-slate-900/60 transition-colors">
                            <CheckCircle2 className={`w-5 h-5 shrink-0 ${project.type === 'High Court Litigation' ? 'text-cyan' : 'text-amber-500'}`} />
                            <span className="text-slate-200 font-semibold text-xs md:text-sm">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outbound Link */}
                    <div className="pt-2">
                      <a
                        href={project.linkHref}
                        className={`group/link inline-flex items-center gap-2 font-black text-sm uppercase tracking-wider ${
                          project.type === 'High Court Litigation' ? 'text-cyan hover:text-white' : 'text-amber-500 hover:text-white'
                        } transition-colors`}
                      >
                        {project.linkText} 
                        <ExternalLink size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Project Lead Capture Section (CTA) */}
        <div className="relative rounded-3xl bg-linear-to-tr from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 md:p-14 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-700/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Facing FBR Audits, SECP Registration, or Need Urgent Bail?
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Consult with senior advocates with years of High Court, Session Court, and tax consultant experience. We handle FBR, SECP, PRA, e-Payments, and Property Registries.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 hover:scale-102 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] text-slate-950 font-black rounded-xl text-base transition-all flex items-center justify-center gap-2 animate-bounce"
              >
                Schedule Legal Consultation <ArrowRight size={18} />
              </a>
              <a 
                href="/services" 
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl text-base transition-all flex items-center justify-center"
              >
                Explore Chambers & Services
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
