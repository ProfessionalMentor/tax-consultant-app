"use client";

import { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Loader2, 
  User, 
  Plus, 
  X, 
  Upload,
  ExternalLink
} from "lucide-react";

export default function NoticeCenterPage() {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // Form states
  const [selectedClient, setSelectedClient] = useState("");
  const [noticeType, setNoticeType] = useState("INCOME_TAX");
  const [taxYear, setTaxYear] = useState(new Date().getFullYear().toString());
  const [noticeDate, setNoticeDate] = useState(new Date().toISOString().split("T")[0]);
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeFileUrl, setNoticeFileUrl] = useState("");

  // Load notices and clients
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/notices");
      const data = await res.json();
      if (data.success) {
        setNotices(data.notices);
        setClients(data.clients);
      }
    } catch (err) {
      console.error("Error fetching notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Recording New Notice
  const handleRecordNotice = async (e) => {
    e.preventDefault();
    if (!selectedClient || !noticeContent) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedClient,
          recordType: noticeType,
          taxYear,
          noticeDate,
          noticeContent,
          noticeDocumentUrl: noticeFileUrl || "/documents/sample-notice.pdf",
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Reset form & close modal
        setSelectedClient("");
        setNoticeContent("");
        setNoticeFileUrl("");
        setIsModalOpen(false);
        // Refresh list
        fetchData();
      }
    } catch (err) {
      console.error("Error recording notice:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Filing Response (PUT)
  const handleFileResponse = async (noticeId) => {
    try {
      setActionLoading(noticeId);
      const res = await fetch("/api/admin/notices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noticeId,
          responseDocumentUrl: "/documents/response-filed.pdf",
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error("Error filing response:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter & Search
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = 
      notice.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.noticeContent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.taxYear.includes(searchQuery);

    const matchesType = typeFilter === "ALL" || notice.recordType === typeFilter;
    
    const isResponded = !!notice.responseDocumentUrl;
    const matchesStatus = 
      statusFilter === "ALL" ||
      (statusFilter === "PENDING" && !isResponded) ||
      (statusFilter === "RESPONDED" && isResponded);

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-350 relative overflow-hidden">
      {/* Aurora Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> SECURITY MONITOR
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              <ShieldAlert className="w-8 h-8 mr-3 text-gold" /> Notice Center
            </h1>
            <p className="text-slate-400 mt-2">Record, upload, and track official FBR Audit and Legal notices issued to clients.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] text-[#040814] font-black rounded-xl shadow-[0_0_20px_rgba(197,150,40,0.3)] transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 shrink-0 stroke-[3px]" /> Record Audit Notice
          </button>
        </div>

        {/* Info/Stats Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#040814]/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl flex items-center group hover:border-gold/30 transition-all">
            <div className="p-4 bg-gold/10 rounded-xl mr-4 border border-gold/20"><ShieldAlert className="w-6 h-6 text-gold" /></div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Unanswered FBR Notices</p>
              <p className="text-2xl font-black text-white mt-1">
                {notices.filter(n => !n.responseDocumentUrl).length}
              </p>
            </div>
          </div>
          <div className="bg-[#040814]/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl flex items-center group hover:border-cyan/30 transition-all">
            <div className="p-4 bg-cyan/10 rounded-xl mr-4 border border-cyan/20"><CheckCircle2 className="w-6 h-6 text-cyan" /></div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Responses Filed</p>
              <p className="text-2xl font-black text-white mt-1">
                {notices.filter(n => n.responseDocumentUrl).length}
              </p>
            </div>
          </div>
          <div className="bg-[#040814]/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl flex items-center group hover:border-emerald-500/30 transition-all">
            <div className="p-4 bg-emerald-500/10 rounded-xl mr-4 border border-emerald-500/20"><User className="w-6 h-6 text-emerald-400" /></div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Enrolled Clients</p>
              <p className="text-2xl font-black text-white mt-1">{clients.length}</p>
            </div>
          </div>
        </div>

        {/* Toolbar Filter / Search */}
        <div className="bg-[#040814]/40 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search by client or text..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-cyan outline-none w-full md:w-64"
              />
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-300 outline-none cursor-pointer focus:border-cyan"
            >
              <option value="ALL">All Types</option>
              <option value="INCOME_TAX">Income Tax</option>
              <option value="SALES_TAX">Sales Tax</option>
              <option value="SECP_FILING">SECP Filing</option>
              <option value="PRA_COMPLIANCE">PRA Notice</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-300 outline-none cursor-pointer focus:border-cyan"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Reply</option>
              <option value="RESPONDED">Responded</option>
            </select>
          </div>

          <div className="text-xs text-slate-500 font-bold">
            Showing {filteredNotices.length} of {notices.length} Notices
          </div>
        </div>

        {/* Notices Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#040814]/40 border border-white/5 rounded-3xl backdrop-blur-md">
            <Loader2 className="w-10 h-10 animate-spin text-gold mb-4" />
            <p className="text-slate-400 font-bold">Loading official records from MongoDB...</p>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-[#040814]/40 border border-white/5 rounded-3xl backdrop-blur-md text-center px-4">
            <div className="w-16 h-16 bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-center text-slate-650 mb-6">
              <ShieldAlert className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Notices Found</h3>
            <p className="text-slate-500 text-sm max-w-sm">No notices match your filters, or you haven&apos;t recorded any yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredNotices.map((notice) => {
              const isResponded = !!notice.responseDocumentUrl;
              return (
                <div 
                  key={notice.id} 
                  className="bg-[#040814]/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-all duration-300 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan/5 rounded-full blur-[60px] pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div className="space-y-4 flex-1">
                      {/* Badge / Type */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-bold text-gold uppercase tracking-wider">
                          {notice.recordType.replace("_", " ")}
                        </span>
                        <span className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-semibold text-slate-400">
                          Tax Year {notice.taxYear}
                        </span>
                        
                        {isResponded ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> RESPONDED
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <AlertTriangle className="w-3 h-3 mr-1 animate-pulse" /> PENDING REPLY
                          </span>
                        )}
                      </div>

                      {/* Client Info */}
                      <div>
                        <h3 className="text-xl font-bold text-white leading-snug group-hover:text-gold transition-colors">{notice.user?.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">NTN: {notice.user?.ntnNumber || "Not Linked"} | Business: {notice.user?.businessName || "Individual"}</p>
                      </div>

                      {/* Notice Description */}
                      <p className="text-slate-400 text-sm leading-relaxed max-w-4xl bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                        {notice.noticeContent}
                      </p>

                      {/* Date & Document links */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> 
                          Notice Date: {new Date(notice.noticeDate).toLocaleDateString("en-PK", { dateStyle: "medium" })}
                        </span>
                        
                        <a 
                          href={notice.noticeDocumentUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-cyan hover:underline hover:text-white transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" /> View Notice PDF <ExternalLink className="w-3 h-3" />
                        </a>

                        {isResponded && (
                          <a 
                            href={notice.responseDocumentUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-emerald-400 hover:underline hover:text-white transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> View Response PDF <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
                      {!isResponded && (
                        <button
                          onClick={() => handleFileResponse(notice.id)}
                          disabled={actionLoading === notice.id}
                          className="w-full md:w-44 px-4 py-3 bg-cyan hover:bg-cyan/90 text-midnight font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                        >
                          {actionLoading === notice.id ? (
                            <Loader2 className="w-4 h-5 animate-spin" />
                          ) : (
                            <>File Defense Response <Upload className="w-4 h-4" /></>
                          )}
                        </button>
                      )}
                      
                      <a 
                        href={`/admin/clients`}
                        className="w-full md:w-44 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        Contact Client <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* RECORD NOTICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-950 border border-white/5 rounded-full text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center text-gold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Record Audit Notice</h3>
                <p className="text-slate-400 text-xs">File official FBR/SECP correspondence into client profile.</p>
              </div>
            </div>

            <form onSubmit={handleRecordNotice} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Select Client</label>
                <select
                  required
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none cursor-pointer"
                >
                  <option value="" disabled>-- Select Client Profile --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.businessName || "Individual"}) - NTN: {c.ntnNumber || "N/A"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Notice Type</label>
                  <select
                    value={noticeType}
                    onChange={(e) => setNoticeType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none cursor-pointer"
                  >
                    <option value="INCOME_TAX">Income Tax Audit</option>
                    <option value="SALES_TAX">Sales Tax Audit</option>
                    <option value="SECP_FILING">SECP Defalcation</option>
                    <option value="PRA_COMPLIANCE">PRA Notice</option>
                    <option value="EPADS_STATUS">e-PADS Issue</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Tax Year</label>
                  <input 
                    type="text" 
                    required
                    value={taxYear}
                    onChange={(e) => setTaxYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Notice Date</label>
                  <input 
                    type="date" 
                    required
                    value={noticeDate}
                    onChange={(e) => setNoticeDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Notice PDF / URL (Mock)</label>
                  <input 
                    type="text" 
                    placeholder="/documents/fbr-audit-2025.pdf"
                    value={noticeFileUrl}
                    onChange={(e) => setNoticeFileUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Notice Details / Content</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Detail the contents or penal sections quoted in the notice (e.g. U/S 122(5A) of Income Tax Ordinance 2001 regarding wealth reconciliations)..."
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm focus:border-cyan outline-none resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] text-[#040814] font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Record Audit & Dispatch Alert <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
