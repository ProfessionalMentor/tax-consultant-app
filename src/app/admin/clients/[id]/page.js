"use client";

import { useState, useEffect, use } from "react";
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Briefcase, 
  FileText, 
  CreditCard,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function ClientProfilePage({ params }) {
  // Unwrap params using React.use() for Next.js 15+
  const resolvedParams = use(params);
  const clientId = resolvedParams.id;

  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/clients/${clientId}`);
        const data = await res.json();
        if (data.success) {
          setClient(data.client);
        }
      } catch (err) {
        console.error("Failed to fetch client details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [clientId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040814] flex flex-col items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 animate-spin text-gold mb-4" />
        <p className="text-slate-400 font-bold">Decrypting client vault...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-[#040814] flex flex-col items-center justify-center pt-20 text-center">
        <User className="w-16 h-16 text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Client Not Found</h2>
        <p className="text-slate-400 mb-6">The requested client profile does not exist or was deleted.</p>
        <Link href="/admin/clients" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-300 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Link href="/admin/clients" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Client Directory
        </Link>

        {/* Profile Header */}
        <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-2xl mb-8 flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="w-24 h-24 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
            <User className="w-12 h-12 text-cyan" />
          </div>

          <div className="flex-1 relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-white">{client.name}</h1>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${client.taxFilingStatus === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                {client.taxFilingStatus}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-slate-400 mt-4">
              <span className="flex items-center"><Building className="w-4 h-4 mr-2 text-slate-500" /> {client.businessName || "Individual"}</span>
              <span className="flex items-center"><Mail className="w-4 h-4 mr-2 text-slate-500" /> {client.email}</span>
              {client.phoneNumber && <span className="flex items-center"><Phone className="w-4 h-4 mr-2 text-slate-500" /> {client.phoneNumber}</span>}
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto relative z-10">
            <button className="flex-1 md:flex-none px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all">
              Edit Details
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] text-[#040814] font-black rounded-xl shadow-[0_0_20px_rgba(197,150,40,0.3)] transition-all">
              New Case
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Identity & Tax Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-gold" /> Identity & Registration
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">CNIC Number</p>
                  <p className="text-white font-mono text-sm bg-slate-950 p-2.5 rounded-lg border border-slate-800">{client.cnic || "Not Provided"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">NTN Number</p>
                  <p className="text-white font-mono text-sm bg-slate-950 p-2.5 rounded-lg border border-slate-800">{client.ntnNumber || "Not Provided"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">STRN</p>
                  <p className="text-white font-mono text-sm bg-slate-950 p-2.5 rounded-lg border border-slate-800">{client.strn || "Not Provided"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Business Type</p>
                  <p className="text-white font-medium text-sm bg-slate-950 p-2.5 rounded-lg border border-slate-800">{client.businessType || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cases & Records */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Cases */}
            <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-cyan" /> Legal Cases
              </h3>
              {client.cases?.length === 0 ? (
                <p className="text-slate-500 text-sm py-4">No active or past cases linked.</p>
              ) : (
                <div className="space-y-3">
                  {client.cases?.map(c => (
                    <div key={c.id} className="bg-slate-950/50 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan/30 transition-all">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-slate-500">{c.caseNumber}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>{c.status}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm">{c.title}</h4>
                      </div>
                      <Link href="/admin/cases" className="text-cyan text-xs font-bold hover:underline">View Case &rarr;</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tax Records & Notices */}
            <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-rose-400" /> Compliance & Notices
              </h3>
              {client.taxRecords?.length === 0 ? (
                <p className="text-slate-500 text-sm py-4">No tax records or notices filed.</p>
              ) : (
                <div className="space-y-3">
                  {client.taxRecords?.map(record => (
                    <div key={record.id} className="bg-slate-950/50 p-4 rounded-xl border border-white/5 hover:border-rose-500/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                          {record.recordType.replace("_", " ")}
                        </span>
                        <span className="text-xs font-bold text-slate-400">Year: {record.taxYear}</span>
                      </div>
                      {record.noticeReceived && (
                        <div className="mt-3 p-3 bg-rose-500/5 border border-rose-500/10 rounded-lg">
                          <p className="text-rose-400 text-xs font-bold flex items-center mb-1">
                            <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Notice Received
                          </p>
                          <p className="text-slate-400 text-xs truncate">{record.noticeContent}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Financial Ledger */}
            <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-emerald-400" /> Invoices
              </h3>
              {client.invoices?.length === 0 ? (
                <p className="text-slate-500 text-sm py-4">No invoices generated for this client.</p>
              ) : (
                <div className="space-y-3">
                  {client.invoices?.map(inv => (
                    <div key={inv.id} className="bg-slate-950/50 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono text-slate-500 block mb-1">{inv.invoiceNumber}</span>
                        <p className="text-white font-bold text-sm">PKR {inv.amountBilled.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold ${inv.invoiceStatus === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : inv.invoiceStatus === 'PENDING' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>
                          {inv.invoiceStatus === 'PAID' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {inv.invoiceStatus === 'PENDING' && <Clock className="w-3 h-3 mr-1" />}
                          {inv.invoiceStatus === 'OVERDUE' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {inv.invoiceStatus}
                        </span>
                        {inv.balanceDue > 0 && <p className="text-rose-400 text-xs font-bold mt-1">Due: PKR {inv.balanceDue.toLocaleString()}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
