"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ShieldCheck, Landmark, CheckCircle2, XCircle, Clock, AlertTriangle, FileText, ArrowRight, X, ChevronRight, Loader2 } from 'lucide-react';

export default function ComplianceManagement() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [clients, setClients] = useState([]);
  
  // Form State
  const [clientId, setClientId] = useState('');
  const [recordType, setRecordType] = useState('INCOME_TAX');
  const [taxYear, setTaxYear] = useState('2025');
  const [filingStatus, setFilingStatus] = useState('FILED');

  useEffect(() => {
    fetch("/api/admin/clients").then(r => r.json()).then(d => {
      if(d.success) setClients(d.clients);
    });
  }, []);

  const handleAddCompliance = async (e) => {
    e.preventDefault();
    if (!clientId || !recordType || !taxYear) return;
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/compliance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: clientId, recordType, taxYear, filingStatus })
      });
      const data = await res.json();
      if(data.success) {
        setIsModalOpen(false);
        setClientId('');
        setRecordType('INCOME_TAX');
        setTaxYear('2025');
        setFilingStatus('FILED');
        // We'll alert success since we are still using mock data for the table for now.
        alert("Compliance record successfully added to MongoDB!");
      } else {
        alert(data.error || "Failed to add record");
      }
    } catch(err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Mock data for clients' compliance status
  const complianceData = [
    { 
      id: 1, 
      clientName: "Ahmed Hassan", 
      businessName: "Hassan Trading Co.",
      ntn: "1234567-8", 
      strn: "1234567890123",
      atlStatus: "ACTIVE", 
      praStatus: "ACTIVE", 
      epadsStatus: "REGISTERED",
      lastFiling: "2025-11-30",
      pendingNotices: 0
    },
    { 
      id: 2, 
      clientName: "Zainab Ahmed", 
      businessName: "TechLogix PK",
      ntn: "9876543-2", 
      strn: "9876543210987",
      atlStatus: "INACTIVE", 
      praStatus: "PENDING", 
      epadsStatus: "UNREGISTERED",
      lastFiling: "2024-09-15",
      pendingNotices: 1
    },
    { 
      id: 3, 
      clientName: "Dr. Salman Tariq", 
      businessName: "Private Clinic",
      ntn: "4567891-3", 
      strn: "N/A",
      atlStatus: "ACTIVE", 
      praStatus: "N/A", 
      epadsStatus: "N/A",
      lastFiling: "2025-08-20",
      pendingNotices: 0
    }
  ];

  const filteredData = complianceData.filter(record => {
    // Search logic
    const matchesSearch = record.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          record.ntn.includes(searchQuery) || 
                          (record.businessName && record.businessName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Tab logic
    let matchesTab = true;
    if (activeTab === 'ACTIVE ATL') matchesTab = record.atlStatus === 'ACTIVE';
    if (activeTab === 'INACTIVE') matchesTab = record.atlStatus === 'INACTIVE';
    if (activeTab === 'EPADS/PRA') matchesTab = record.epadsStatus === 'REGISTERED' || record.praStatus === 'ACTIVE';

    // Dropdown filter logic
    let matchesDropdown = true;
    if (statusFilter === 'HAS_NOTICES') matchesDropdown = record.pendingNotices > 0;
    if (statusFilter === 'NO_NOTICES') matchesDropdown = record.pendingNotices === 0;

    return matchesSearch && matchesTab && matchesDropdown;
  });

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-300 relative overflow-hidden">
      {/* Background Aurora Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> CORPORATE HUB
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              <Landmark className="w-8 h-8 mr-3 text-cyan" /> Tax & SECP Compliance Hub
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Manage client NTN, STRN, ATL Status, EPADS, and PRA registration. Update compliance records and handle official audits.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] text-[#040814] font-black rounded-xl shadow-[0_0_20px_rgba(197,150,40,0.3)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            + Add Compliance Record
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl hover:border-gold/20 transition-all">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Active Filers</p>
            <p className="text-3xl font-black text-emerald-400">128</p>
          </div>
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl hover:border-rose-500/20 transition-all">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Inactive / Delinquent</p>
            <p className="text-3xl font-black text-rose-500">14</p>
          </div>
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl hover:border-cyan/20 transition-all">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">EPADS Registered</p>
            <p className="text-3xl font-black text-cyan">45</p>
          </div>
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl hover:border-gold/20 transition-all">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Unanswered Notices</p>
            <p className="text-3xl font-black text-gold">3</p>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {/* Table Toolbar */}
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-950/20">
            <div className="flex space-x-2">
              {['ALL', 'ACTIVE ATL', 'INACTIVE', 'EPADS/PRA'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === tab ? 'bg-white/5 text-white border border-white/10 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="flex w-full sm:w-auto gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Client or NTN..." 
                  className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-cyan outline-none w-full sm:w-64"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className={`p-2 border rounded-xl transition-colors focus:outline-none ${showFilterDropdown || statusFilter !== 'ALL' ? 'bg-cyan/10 border-cyan/30 text-cyan' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <Filter className="w-4 h-4" />
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 top-10 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                    <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">Filter Notices</div>
                    <button onClick={() => { setStatusFilter("ALL"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "ALL" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>All Records</button>
                    <button onClick={() => { setStatusFilter("HAS_NOTICES"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "HAS_NOTICES" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>Has Pending Notices</button>
                    <button onClick={() => { setStatusFilter("NO_NOTICES"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "NO_NOTICES" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>No Notices</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-950/30 text-slate-400 text-xs uppercase tracking-wider border-b border-white/10">
                  <th className="py-4 px-6 font-medium">Client / Business</th>
                  <th className="py-4 px-6 font-medium">NTN / STRN</th>
                  <th className="py-4 px-6 font-medium">FBR (ATL)</th>
                  <th className="py-4 px-6 font-medium">EPADS / PRA</th>
                  <th className="py-4 px-6 font-medium">Notices</th>
                  <th className="py-4 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">No compliance records found matching your filters.</td>
                  </tr>
                ) : filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-white font-bold">{record.clientName}</p>
                      <p className="text-xs text-slate-500">{record.businessName}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-mono text-slate-300">{record.ntn}</p>
                      <p className="text-xs font-mono text-slate-500">STRN: {record.strn}</p>
                    </td>
                    <td className="py-4 px-6">
                      {record.atlStatus === 'ACTIVE' 
                        ? <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> ACTIVE</span>
                        : <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20"><XCircle className="w-3 h-3 mr-1" /> INACTIVE</span>
                      }
                      <p className="text-[10px] text-slate-500 mt-1">Filed: {record.lastFiling}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className={`text-[10px] font-bold ${record.epadsStatus === 'REGISTERED' ? 'text-cyan' : 'text-slate-500'}`}>
                          EPADS: {record.epadsStatus}
                        </span>
                        <span className={`text-[10px] font-bold ${record.praStatus === 'ACTIVE' ? 'text-gold' : 'text-slate-500'}`}>
                          PRA: {record.praStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {record.pendingNotices > 0 
                        ? (
                          <Link href="/admin/notices" className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/25 transition-all">
                            <AlertTriangle className="w-3 h-3 mr-1 animate-pulse" /> {record.pendingNotices} Pending Notice
                          </Link>
                        )
                        : <span className="text-slate-550 text-xs font-semibold">-</span>
                      }
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-cyan text-sm font-bold hover:text-white transition-colors mr-4">Update</button>
                      <button className="text-gold text-sm font-bold hover:text-white transition-colors">Upload CPR</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Compliance Modal */}
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
              <div className="w-14 h-14 bg-linear-to-br from-cyan/20 to-emerald-600/20 border border-cyan/30 rounded-2xl flex items-center justify-center text-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Record Compliance</h3>
                <p className="text-slate-400 text-sm mt-1">Log a new FBR, SECP, or PRA filing into the system.</p>
              </div>
            </div>

            <form onSubmit={handleAddCompliance} className="space-y-6 relative z-10">
              {/* Client Search */}
              <div className="space-y-2 relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Client *</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required={!clientId}
                    placeholder="Search by client name or business..."
                    value={clientId ? clients.find(c => c.id === clientId)?.name : undefined}
                    onChange={(e) => {
                      setClientId(""); 
                    }}
                    onFocus={(e) => {
                      const wrapper = e.target.parentElement;
                      wrapper.nextElementSibling.classList.remove('hidden');
                    }}
                    onBlur={(e) => {
                      setTimeout(() => {
                        if (e.target.parentElement?.nextElementSibling) {
                          e.target.parentElement.nextElementSibling.classList.add('hidden');
                        }
                      }, 200);
                    }}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm focus:border-cyan focus:ring-1 focus:ring-cyan/50 focus:bg-slate-900 transition-all outline-none placeholder:text-slate-600"
                    id="complianceClientSearchInput"
                    onInput={(e) => {
                      const val = e.target.value.toLowerCase();
                      const items = document.querySelectorAll('.compliance-client-list-item');
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
                      className="compliance-client-list-item px-4 py-3 hover:bg-cyan/10 hover:text-cyan border-b border-white/5 cursor-pointer transition-colors text-sm text-slate-300"
                      onClick={() => {
                        setClientId(client.id);
                        document.getElementById('complianceClientSearchInput').value = client.name + (client.businessName ? ` (${client.businessName})` : '');
                      }}
                    >
                      <p className="font-bold">{client.name}</p>
                      {client.businessName && <p className="text-xs opacity-70 mt-0.5">{client.businessName}</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Record Type *</label>
                  <select
                    value={recordType}
                    onChange={(e) => setRecordType(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-cyan focus:ring-1 focus:ring-cyan/50 focus:bg-slate-900 transition-all outline-none cursor-pointer appearance-none"
                  >
                    <option value="INCOME_TAX">Income Tax Return</option>
                    <option value="SALES_TAX">Sales Tax Return</option>
                    <option value="SECP_FILING">SECP Corporate Filing</option>
                    <option value="PRA_COMPLIANCE">PRA Return</option>
                    <option value="EPADS_STATUS">EPADS Registration</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax Year *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 2025"
                    value={taxYear}
                    onChange={(e) => setTaxYear(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-cyan focus:ring-1 focus:ring-cyan/50 focus:bg-slate-900 transition-all outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Filing Status</label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-cyan focus:ring-1 focus:ring-cyan/50 focus:bg-slate-900 transition-all outline-none cursor-pointer appearance-none"
                >
                  <option value="FILED">Successfully Filed</option>
                  <option value="ACCEPTED">Accepted by Authority</option>
                  <option value="PENDING">Pending Preparation</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-linear-to-r from-cyan to-emerald-500 hover:from-[#08c5e6] hover:to-[#10b981] text-white font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 group hover:-translate-y-0.5"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Submit Compliance Record <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
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
