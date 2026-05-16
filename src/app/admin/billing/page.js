"use client";

import { CreditCard, Search, Download, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function AdminBillingPage() {
  const invoices = [
    { id: "INV-2026-001", client: "Ahmed Hassan", amount: "125,000", date: "Jan 10, 2026", status: "PAID", type: "Retainer Fee" },
    { id: "INV-2026-002", client: "TechLogix PK", amount: "45,000", date: "Jan 15, 2026", status: "PENDING", type: "Per-Hearing Fee" },
    { id: "INV-2026-003", client: "Zain Ali", amount: "15,000", date: "Dec 01, 2025", status: "OVERDUE", type: "SECP Filing" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <CreditCard className="w-8 h-8 mr-3 text-emerald-400" /> Billing & Payments
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Generate invoices, track retainer fees, and monitor pending payments from clients.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors">
          + Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Revenue (Month)</p>
          <p className="text-3xl font-black text-white">Rs. 450,000</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Pending Dues</p>
          <p className="text-3xl font-black text-amber-400">Rs. 185,000</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Overdue Invoices</p>
          <p className="text-3xl font-black text-rose-500">4</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Recent Invoices</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-emerald-500 outline-none w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <th className="py-4 px-6 font-medium">Invoice ID</th>
                <th className="py-4 px-6 font-medium">Client</th>
                <th className="py-4 px-6 font-medium">Amount (Rs)</th>
                <th className="py-4 px-6 font-medium">Type</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-slate-300">{inv.id}</td>
                  <td className="py-4 px-6 font-bold text-white">{inv.client}</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">{inv.amount}</td>
                  <td className="py-4 px-6 text-sm text-slate-400">{inv.type}</td>
                  <td className="py-4 px-6">
                    {inv.status === 'PAID' && <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400"><CheckCircle2 className="w-3 h-3 mr-1" /> PAID</span>}
                    {inv.status === 'PENDING' && <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-amber-500/10 text-amber-400"><Clock className="w-3 h-3 mr-1" /> PENDING</span>}
                    {inv.status === 'OVERDUE' && <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-rose-500/10 text-rose-400"><AlertTriangle className="w-3 h-3 mr-1" /> OVERDUE</span>}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
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
