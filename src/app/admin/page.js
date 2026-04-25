"use client";

import { BarChart, Users, FileText, AlertTriangle, Briefcase, Eye } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Monthly Revenue", value: "PKR 2,450,000", change: "+14%", icon: <BarChart className="text-gold w-6 h-6" /> },
    { title: "Active Litigations", value: "42", change: "+3", icon: <Briefcase className="text-cyan w-6 h-6" /> },
    { title: "New CRM Leads", value: "18", change: "+12%", icon: <Users className="text-emerald-500 w-6 h-6" /> },
    { title: "Tax Audits Pending", value: "7", change: "-2", icon: <AlertTriangle className="text-rose-500 w-6 h-6" /> },
  ];

  const auditLogs = [
    { user: "Adv. Junior Ali", action: "Viewed Encrypted Document", target: "Smith_Affidavit.pdf", time: "10 mins ago" },
    { user: "Accountant Faisal", action: "Modified Billing Status", target: "Invoice #4021 - FBR Filing", time: "1 hour ago" },
    { user: "Adv. Khalil ur Rehman", action: "Updated Next Hearing Date", target: "Case HC-2025/4491", time: "2 hours ago" },
    { user: "System Automator", action: "Sent WhatsApp Reminder", target: "Client: Zaheer Ahmed", time: "1 day ago" },
  ];

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-rose-500 text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span> SUPER ADMIN OVERRIDE
            </div>
            <h1 className="text-3xl font-extrabold text-white">Chamber Command Center</h1>
            <p className="text-slate-500 mt-2">Revenue, Case Flow, and Strict Audit Logs.</p>
          </div>
          <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 transition-colors">
            Generate Tax Report
          </button>
        </div>

        {/* Analytics Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl group hover:border-gold/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-950 rounded-xl shadow-inner border border-slate-800 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active CRM Case Triage */}
          <div className="lg:col-span-2 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-[80px]"></div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center relative z-10">
              <Briefcase className="w-5 h-5 mr-3 text-cyan" /> Urgent Case Triage
            </h2>
            
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="py-4 font-bold">Client / Title</th>
                    <th className="py-4 font-bold">Assigned To</th>
                    <th className="py-4 font-bold">Deadline</th>
                    <th className="py-4 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4">
                      <p className="text-white font-bold">Zainab Manufacturing Ltd.</p>
                      <p className="text-xs text-slate-500">Corporate Tax Audit Appeal</p>
                    </td>
                    <td className="py-4 text-sm text-cyan font-medium">Accountant Faisal</td>
                    <td className="py-4 text-sm text-rose-400 font-bold">In 2 Days</td>
                    <td className="py-4"><button className="text-gold text-xs font-bold hover:underline">Manage</button></td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4">
                      <p className="text-white font-bold">State vs. XYZ Corporation</p>
                      <p className="text-xs text-slate-500">Criminal Liability Defense</p>
                    </td>
                    <td className="py-4 text-sm text-cyan font-medium">Adv. Khalil ur Rehman</td>
                    <td className="py-4 text-sm text-emerald-400 font-bold">Oct 28, 2025</td>
                    <td className="py-4"><button className="text-gold text-xs font-bold hover:underline">Manage</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* System Audit Logs (Strict Monitoring) */}
          <div className="lg:col-span-1 bg-midnight p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Eye className="w-5 h-5 mr-3 text-gold" /> System Audit Logs
            </h2>
            <div className="space-y-6">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-slate-700 before:rounded-full before:hover:bg-gold before:transition-colors">
                  <p className="text-sm text-white font-medium">{log.action}</p>
                  <p className="text-xs text-cyan mt-1 font-mono">{log.target}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                    <span className="font-bold">{log.user}</span>
                    <span>{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
