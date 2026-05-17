"use client";

import { useState, useEffect } from "react";
import { CreditCard, Search, Download, CheckCircle2, Clock, AlertTriangle, Loader2, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminBillingPage() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/admin/billing").then(r => r.json()).then(data => {
      if (data.success) setInvoices(data.invoices);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const totalBilled = invoices.reduce((s, i) => s + i.amountBilled, 0);
  const totalPaid = invoices.reduce((s, i) => s + i.amountPaid, 0);
  const totalDue = invoices.reduce((s, i) => s + i.balanceDue, 0);
  const filtered = invoices.filter(inv => inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || inv.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 pb-6 border-b border-white/10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> FINANCIAL LEDGER
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
            <CreditCard className="w-8 h-8 mr-3 text-emerald-400" /> Billing & Payments
          </h1>
          <p className="text-slate-400 mt-2">Track retainer fees and monitor pending payments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl flex items-center">
            <div className="p-4 bg-emerald-500/10 rounded-xl mr-4 border border-emerald-500/20"><TrendingUp className="w-6 h-6 text-emerald-400" /></div>
            <div><p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Billed</p><p className="text-2xl font-black text-white mt-1">PKR {totalBilled.toLocaleString()}</p></div>
          </div>
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl flex items-center">
            <div className="p-4 bg-cyan/10 rounded-xl mr-4 border border-cyan/20"><DollarSign className="w-6 h-6 text-cyan" /></div>
            <div><p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Received</p><p className="text-2xl font-black text-white mt-1">PKR {totalPaid.toLocaleString()}</p></div>
          </div>
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl flex items-center">
            <div className="p-4 bg-rose-500/10 rounded-xl mr-4 border border-rose-500/20"><AlertTriangle className="w-6 h-6 text-rose-400" /></div>
            <div><p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Outstanding</p><p className="text-2xl font-black text-white mt-1">PKR {totalDue.toLocaleString()}</p></div>
          </div>
        </div>

        <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 bg-slate-950/20 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Invoice Ledger</h3>
            <div className="relative w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search invoices..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-cyan outline-none w-full" />
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-gold mb-4" /><p className="text-slate-400 font-bold">Loading billing records...</p></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center"><CreditCard className="w-12 h-12 text-slate-600 mb-4" /><h3 className="text-lg font-bold text-white mb-1">No Invoices</h3></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead><tr className="bg-slate-950/30 text-slate-400 text-xs uppercase tracking-wider border-b border-white/10">
                  <th className="py-4 px-6 font-medium">Invoice</th><th className="py-4 px-6 font-medium">Client</th><th className="py-4 px-6 font-medium">Billed</th><th className="py-4 px-6 font-medium">Paid</th><th className="py-4 px-6 font-medium">Due</th><th className="py-4 px-6 font-medium">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map(inv => (
                    <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-mono text-sm text-slate-300">{inv.invoiceNumber}</td>
                      <td className="py-4 px-6 font-bold text-white">{inv.user?.name || "N/A"}</td>
                      <td className="py-4 px-6 text-white font-bold">{inv.amountBilled.toLocaleString()}</td>
                      <td className="py-4 px-6 text-emerald-400 font-bold">{inv.amountPaid.toLocaleString()}</td>
                      <td className="py-4 px-6 text-rose-400 font-bold">{inv.balanceDue.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${inv.invoiceStatus === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : inv.invoiceStatus === 'PARTIALLY_PAID' ? 'bg-cyan/10 text-cyan' : 'bg-amber-500/10 text-amber-400'}`}>{inv.invoiceStatus}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
