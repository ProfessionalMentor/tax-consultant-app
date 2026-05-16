"use client";

import { Briefcase, Search, Filter, Calendar, Gavel, FileText, ChevronRight } from 'lucide-react';

export default function AdminCasesPage() {
  const cases = [
    {
      id: "CASE-2026-001",
      title: "Property Dispute - Karachi High Court",
      client: "Ahmed Hassan",
      type: "CIVIL",
      status: "ACTIVE",
      lawyer: "Adv. Fatima Khan",
      nextHearing: "2026-06-15",
      court: "Court Room 4-A"
    },
    {
      id: "CASE-2026-002",
      title: "Corporate Tax Fraud Defense",
      client: "TechLogix PK",
      type: "TAXATION",
      status: "HEARING",
      lawyer: "Adv. Khalil",
      nextHearing: "2026-05-20",
      court: "Tax Tribunal"
    },
    {
      id: "CASE-2026-003",
      title: "Trademark Infringement",
      client: "Style Boutique",
      type: "CORPORATE",
      status: "PENDING",
      lawyer: "Adv. Junior Ali",
      nextHearing: null,
      court: "Pending Assignment"
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <Briefcase className="w-8 h-8 mr-3 text-rose-500" /> Case Management
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Track all active litigations, assign lawyers, and manage upcoming court hearings.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-colors">
          + Open New Case
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search case ID or title..." 
                className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-rose-500 outline-none w-full"
              />
            </div>
            <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {cases.map((c) => (
              <div key={c.id} className="p-6 hover:bg-slate-800/30 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">{c.id}</span>
                    <h3 className="text-lg font-bold text-white mt-2">{c.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">Client: <span className="text-slate-300 font-medium">{c.client}</span></p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : c.status === 'HEARING' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400'}`}>
                      {c.status}
                    </span>
                    <p className="text-xs text-rose-400 font-medium mt-2">{c.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-800/50">
                  <div className="flex items-center text-sm text-slate-400">
                    <Gavel className="w-4 h-4 mr-2 text-slate-500" />
                    {c.lawyer}
                  </div>
                  <div className="flex items-center text-sm text-slate-400">
                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                    {c.nextHearing ? `Hearing: ${c.nextHearing}` : 'No date set'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl relative overflow-hidden">
             <h3 className="text-lg font-bold text-white mb-4">Upcoming Hearings</h3>
             <ul className="space-y-4 relative z-10">
               {cases.filter(c => c.nextHearing).map(c => (
                 <li key={c.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                   <p className="text-sm font-bold text-rose-400 mb-1">{c.nextHearing}</p>
                   <p className="text-sm text-white font-medium truncate">{c.title}</p>
                   <p className="text-xs text-slate-500 mt-1">{c.court}</p>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
