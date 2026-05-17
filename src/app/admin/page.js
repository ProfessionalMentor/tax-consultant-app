"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BarChart, 
  Users, 
  AlertTriangle, 
  Briefcase, 
  Eye, 
  Loader2,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: "PKR 0",
    activeCases: "0",
    clientCount: "0",
    pendingNotices: "0",
  });
  const [recentCases, setRecentCases] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentCases(data.recentCases);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statsList = [
    { title: "Total Chamber Revenue", value: stats.totalRevenue, change: "Live", icon: <BarChart className="text-gold w-6 h-6" /> },
    { title: "Active Litigations", value: stats.activeCases, change: "Current", icon: <Briefcase className="text-cyan w-6 h-6" /> },
    { title: "Enrolled CRM Clients", value: stats.clientCount, change: "Enrolled", icon: <Users className="text-emerald-500 w-6 h-6" /> },
    { title: "Tax Audits Pending", value: stats.pendingNotices, change: "Pending", icon: <AlertTriangle className="text-rose-500 w-6 h-6" /> },
  ];

  const auditLogs = [
    { user: "Advocate Ahmad Raza", action: "Prepared FBR defense response", target: "Client: Ahmed Hassan", time: "10 mins ago" },
    { user: "Chamber Admin", action: "Seeded Secure Database Clusters", target: "Atlas Server PK", time: "1 hour ago" },
    { user: "Advocate Khalil ur Rehman", action: "Drafted pre-arrest bail petition", target: "Case B-402/2026", time: "3 hours ago" },
    { user: "System Monitor", action: "Synchronized NextAuth Cookie Sessions", target: "User: client.hassan", time: "5 hours ago" },
  ];

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-300 relative overflow-hidden">
      {/* Background Glows like Home Page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> FIRM COMMAND CENTER
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Chamber Admin</h1>
            <p className="text-slate-400 mt-2">Revenue, Case Flow, and Strict Audit Logs.</p>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-750 transition-colors flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin text-gold" />}
            Refresh Dashboard
          </button>
        </div>

        {/* Analytics Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsList.map((stat, idx) => (
            <div key={idx} className="bg-[#040814]/40 p-6 rounded-2xl border border-white/5 shadow-xl group hover:border-gold/30 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(184,144,71,0.06)] hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan/10 text-cyan uppercase tracking-wider">
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.title}</p>
              <p className="text-2xl font-black text-white mt-1.5">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Triage & Audit grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active CRM Case Triage */}
          <div className="lg:col-span-2 bg-[#040814]/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-[80px]"></div>
            
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center relative z-10">
                <Briefcase className="w-5 h-5 mr-3 text-cyan" /> Urgent Case Triage
              </h2>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan" />
                </div>
              ) : recentCases.length === 0 ? (
                <p className="text-slate-500 text-sm py-8 text-center">No active litigations inside MongoDB.</p>
              ) : (
                <div className="overflow-x-auto relative z-10">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="py-4 font-bold">Client / Title</th>
                        <th className="py-4 font-bold">Assigned Advocate</th>
                        <th className="py-4 font-bold">Registration / Status</th>
                        <th className="py-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {recentCases.map((c) => (
                        <tr key={c.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4">
                            <p className="text-white font-bold max-w-xs truncate">{c.title}</p>
                            <p className="text-xs text-slate-500">Client: {c.clientName}</p>
                          </td>
                          <td className="py-4 text-sm text-cyan font-bold">{c.lawyerName}</td>
                          <td className="py-4 text-xs font-semibold">
                            <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 font-mono mr-2">{c.caseNumber}</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 font-bold uppercase">{c.status}</span>
                          </td>
                          <td className="py-4 text-right">
                            <Link href="/admin/cases" className="text-gold text-xs font-black hover:underline flex items-center justify-end gap-1">
                              Manage <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <Link href="/admin/cases" className="w-full mt-6 py-4 flex items-center justify-center text-gold font-bold hover:bg-white/5 rounded-xl transition-all border border-white/5 hover:border-white/10 group">
              View Case Catalog <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* System Audit Logs (Strict Monitoring) */}
          <div className="lg:col-span-1 bg-[#040814]/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl relative">
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
