"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, Search, Filter, Calendar, Gavel, ChevronRight, Loader2, AlertTriangle, X } from 'lucide-react';

export default function AdminCasesPage() {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [clients, setClients] = useState([]);

  // Form states
  const [title, setTitle] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [type, setType] = useState("CIVIL");
  const [clientId, setClientId] = useState("");

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setCases(data.recentCases || []);
      }
    } catch (err) {
      console.error("Error fetching cases:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCase = async (e) => {
    e.preventDefault();
    if (!title || !caseNumber || !clientId) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, caseNumber, type, clientId }),
      });

      const data = await res.json();
      if (data.success) {
        setTitle("");
        setCaseNumber("");
        setType("CIVIL");
        setClientId("");
        setIsModalOpen(false);
        fetchCases();
      } else {
        alert(data.error || "Failed to add case");
      }
    } catch (err) {
      console.error("Error adding case:", err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { 
    fetchCases(); 
    fetch("/api/admin/clients").then(res => res.json()).then(data => {
      if(data.success) setClients(data.clients);
    });
  }, []);

  const filtered = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> LITIGATION TRACKER
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              <Briefcase className="w-8 h-8 mr-3 text-cyan" /> Case Management
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Track all active litigations, assign lawyers, and manage upcoming court hearings from the database.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] text-[#040814] font-black rounded-xl shadow-[0_0_20px_rgba(197,150,40,0.3)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            + Open New Case
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Case List */}
          <div className="lg:col-span-2 bg-[#040814]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 bg-slate-950/20 flex justify-between items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search case ID or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-cyan outline-none w-full"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className={`p-2.5 border rounded-xl transition-colors focus:outline-none ${showFilterDropdown || statusFilter !== 'ALL' ? 'bg-cyan/10 border-cyan/30 text-cyan' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <Filter className="w-4 h-4" />
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 top-12 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                    <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">Filter by Status</div>
                    <button onClick={() => { setStatusFilter("ALL"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "ALL" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>All Cases</button>
                    <button onClick={() => { setStatusFilter("ACTIVE"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "ACTIVE" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>Active</button>
                    <button onClick={() => { setStatusFilter("HEARING"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "HEARING" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>Hearing</button>
                    <button onClick={() => { setStatusFilter("CLOSED"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "CLOSED" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>Closed</button>
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-gold mb-4" />
                <p className="text-slate-400 font-bold">Loading litigation records...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Briefcase className="w-12 h-12 text-slate-600 mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">No Cases Found</h3>
                <p className="text-slate-500 text-sm">No litigation records match your search.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filtered.map((c) => (
                  <div key={c.id} className="p-6 hover:bg-white/5 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded-lg border border-white/5">{c.caseNumber}</span>
                        <h3 className="text-lg font-bold text-white mt-2 group-hover:text-gold transition-colors">{c.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">Client: <span className="text-slate-300 font-medium">{c.clientName}</span></p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${c.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : c.status === 'HEARING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
                          {c.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center text-sm text-slate-400">
                        <Gavel className="w-4 h-4 mr-2 text-cyan" />
                        {c.lawyerName}
                      </div>
                      <div className="flex items-center text-sm text-slate-400">
                        <Calendar className="w-4 h-4 mr-2 text-gold" />
                        Filed: {c.filingDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Side Panel: Upcoming Hearings */}
          <div className="space-y-6">
            <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[60px] pointer-events-none"></div>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center relative z-10">
                <Calendar className="w-5 h-5 mr-2 text-gold" /> Upcoming Hearings
              </h3>
              {cases.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-6">No hearings scheduled.</p>
              ) : (
                <ul className="space-y-4 relative z-10">
                  {cases.map(c => (
                    <li key={c.id} className="bg-slate-950/50 p-4 rounded-xl border border-white/5 hover:border-gold/20 transition-all">
                      <p className="text-sm font-bold text-gold mb-1">{c.filingDate}</p>
                      <p className="text-sm text-white font-medium truncate">{c.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{c.lawyerName}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040814]/90 backdrop-blur-xl">
          <div className="w-full max-w-2xl bg-slate-900/80 border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in duration-300 overflow-hidden">
            {/* Modal Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none"></div>

            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-950 border border-white/10 rounded-full text-slate-500 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 transition-all z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-8 flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-linear-to-br from-cyan/20 to-blue-600/20 border border-cyan/30 rounded-2xl flex items-center justify-center text-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Briefcase className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Register New Case</h3>
                <p className="text-slate-400 text-sm mt-1">Initialize a new litigation or legal advisory matter.</p>
              </div>
            </div>

            <form onSubmit={handleAddCase} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Case Title / Description *</label>
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. State vs. ABC Corporation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-cyan focus:ring-1 focus:ring-cyan/50 focus:bg-slate-900 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Case ID / Number *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. CIV-2026-001"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-cyan focus:ring-1 focus:ring-cyan/50 focus:bg-slate-900 transition-all outline-none font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Legal Category *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-cyan focus:ring-1 focus:ring-cyan/50 focus:bg-slate-900 transition-all outline-none cursor-pointer appearance-none"
                  >
                    <option value="CIVIL">Civil Litigation</option>
                    <option value="CRIMINAL">Criminal Defense</option>
                    <option value="TAXATION">Taxation & FBR</option>
                    <option value="CORPORATE">Corporate SECP</option>
                    <option value="IT_DISPUTE">IT & Cyber Dispute</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Assign Client *</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required={!clientId}
                    placeholder="Search by client name or business..."
                    value={clientId ? clients.find(c => c.id === clientId)?.name : undefined}
                    onChange={(e) => {
                      setClientId(""); // Clear selected if they start typing
                      // Optional: handle typing to show dropdown, but Next.js standard search works well
                    }}
                    onFocus={(e) => {
                      // Turn into search mode
                      const wrapper = e.target.parentElement;
                      wrapper.nextElementSibling.classList.remove('hidden');
                    }}
                    onBlur={(e) => {
                      // Delay hiding so clicks register
                      setTimeout(() => {
                        if (e.target.parentElement?.nextElementSibling) {
                          e.target.parentElement.nextElementSibling.classList.add('hidden');
                        }
                      }, 200);
                    }}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:border-cyan focus:ring-1 focus:ring-cyan/50 focus:bg-slate-900 transition-all outline-none placeholder:text-slate-600"
                    id="clientSearchInput"
                    onInput={(e) => {
                      const val = e.target.value.toLowerCase();
                      const items = document.querySelectorAll('.client-list-item');
                      items.forEach(item => {
                        if (item.textContent.toLowerCase().includes(val)) item.style.display = 'block';
                        else item.style.display = 'none';
                      });
                    }}
                  />
                </div>
                {/* Custom Searchable Dropdown */}
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl max-h-48 overflow-y-auto hidden z-50">
                  {clients.length === 0 ? (
                     <div className="p-4 text-slate-400 text-sm text-center">No clients available</div>
                  ) : clients.map(client => (
                    <div 
                      key={client.id}
                      className="client-list-item px-4 py-3 hover:bg-cyan/10 hover:text-cyan border-b border-white/5 cursor-pointer transition-colors text-sm text-slate-300"
                      onClick={() => {
                        setClientId(client.id);
                        document.getElementById('clientSearchInput').value = client.name + (client.businessName ? ` (${client.businessName})` : '');
                      }}
                    >
                      <p className="font-bold">{client.name}</p>
                      {client.businessName && <p className="text-xs opacity-70 mt-0.5">{client.businessName}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-linear-to-r from-cyan to-blue-600 hover:from-[#08c5e6] hover:to-[#3b82f6] text-white font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 group hover:-translate-y-0.5"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Initialize Case Record <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
