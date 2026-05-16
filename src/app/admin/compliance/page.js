"use client";

import { useState } from 'react';
import { Search, Filter, ShieldCheck, Landmark, CheckCircle2, XCircle, Clock, AlertTriangle, FileText } from 'lucide-react';

export default function ComplianceManagement() {
  const [activeTab, setActiveTab] = useState('ALL');

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

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <Landmark className="w-8 h-8 mr-3 text-cyan" /> Tax & SECP Compliance Hub
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Manage client NTN, STRN, ATL Status, EPADS, and PRA registration. Update compliance records and handle notices.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-cyan hover:bg-cyan/90 text-midnight font-bold rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-colors">
          + Add Compliance Record
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Active Filers</p>
          <p className="text-2xl font-black text-emerald-400">128</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Inactive / Delinquent</p>
          <p className="text-2xl font-black text-rose-500">14</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">EPADS Registered</p>
          <p className="text-2xl font-black text-cyan">45</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Unanswered Notices</p>
          <p className="text-2xl font-black text-gold">3</p>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-2">
            {['ALL', 'ACTIVE ATL', 'INACTIVE', 'EPADS/PRA'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === tab ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
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
                placeholder="Search Client or NTN..." 
                className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-cyan focus:ring-1 focus:ring-cyan outline-none w-full sm:w-64"
              />
            </div>
            <button className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <th className="py-4 px-6 font-medium">Client / Business</th>
                <th className="py-4 px-6 font-medium">NTN / STRN</th>
                <th className="py-4 px-6 font-medium">FBR (ATL)</th>
                <th className="py-4 px-6 font-medium">EPADS / PRA</th>
                <th className="py-4 px-6 font-medium">Notices</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {complianceData.map((record) => (
                <tr key={record.id} className="hover:bg-slate-800/20 transition-colors">
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
                      ? <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20"><AlertTriangle className="w-3 h-3 mr-1" /> {record.pendingNotices} Pending</span>
                      : <span className="text-slate-500 text-xs">-</span>
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
  );
}
