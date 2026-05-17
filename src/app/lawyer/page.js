"use client";

import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Scale, Briefcase, Calendar, ShieldCheck, Mail, FileText, 
  MessageSquare, User, LogOut, CheckCircle, Clock, AlertCircle, 
  Plus, Search, ArrowRight, Eye, RefreshCw, Paperclip, Send, 
  Globe, Phone, Gavel, UserCheck, Menu, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LawyerDashboard() {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("loading");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for data
  const [cases, setCases] = useState([]);
  const [hearings, setHearings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [caseSearch, setCaseSearch] = useState("");
  const [caseFilter, setCaseFilter] = useState("ALL");
  const [selectedCase, setSelectedCase] = useState(null);

  // Modal States
  const [isHearingModalOpen, setIsHearingModalOpen] = useState(false);
  const [hearingForm, setHearingForm] = useState({
    caseId: "",
    hearingDate: "",
    courtRoom: "",
    judgeAssigned: "",
    agenda: "",
    notes: ""
  });

  // Messenger States
  const [selectedClient, setSelectedClient] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // FBR / SECP / Vault Compliance States
  const [taxRecords, setTaxRecords] = useState([]);
  const [loadingTaxRecords, setLoadingTaxRecords] = useState(false);
  const [activeVaultSubTab, setActiveVaultSubTab] = useState("pleadings"); // pleadings | fbr | secp
  
  const [documentForm, setDocumentForm] = useState({
    documentName: "",
    documentType: "OTHER",
    description: "",
    isConfidential: true,
  });
  const [uploadingDoc, setUploadingDoc] = useState(false);
  
  const [taxForm, setTaxForm] = useState({
    recordType: "INCOME_TAX",
    taxYear: "2026",
    filingPeriod: "FY 2026",
    filingStatus: "PENDING",
    ntnNumber: "",
    strn: "",
    companyRegistration: "",
    incorporationNo: "",
    annualFormType: "FORM_A",
    acknowledgementNo: "",
    praStatus: "ACTIVE",
    epadsStatus: "REGISTERED",
    noticeReceived: false,
    noticeContent: "",
  });
  const [savingTax, setSavingTax] = useState(false);

  // Fetch all initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch cases
      const casesRes = await fetch("/api/cases");
      const casesData = await casesRes.json();
      setCases(Array.isArray(casesData) ? casesData : []);

      // Fetch hearings
      const hearingsRes = await fetch("/api/hearings");
      const hearingsData = await hearingsRes.json();
      setHearings(Array.isArray(hearingsData) ? hearingsData : []);

      // Fetch messages
      const messagesRes = await fetch("/api/messages");
      const messagesData = await messagesRes.json();
      setMessages(Array.isArray(messagesData) ? messagesData : []);

      // Fetch appointments
      const appointmentsRes = await fetch("/api/appointments");
      const appointmentsData = await appointmentsRes.json();
      setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data && data.user) {
          setSession(data);
          setStatus("authenticated");
          // Trigger data load
          await fetchData();
        } else {
          setStatus("unauthenticated");
          router.push("/login");
        }
      } catch (err) {
        console.error("Session verification failed:", err);
        setStatus("unauthenticated");
        router.push("/login");
      }
    };
    checkSession();
  }, []);

  // Fetch FBR and SECP tax records for the selected case client
  useEffect(() => {
    if (selectedCase && selectedCase.client) {
      const fetchTaxRecords = async () => {
        try {
          setLoadingTaxRecords(true);
          const res = await fetch(`/api/tax-records?clientId=${selectedCase.client.id}`);
          if (res.ok) {
            const data = await res.json();
            setTaxRecords(Array.isArray(data) ? data : []);
          }
        } catch (err) {
          console.error("Error fetching client tax records:", err);
        } finally {
          setLoadingTaxRecords(false);
        }
      };
      fetchTaxRecords();
    } else {
      setTaxRecords([]);
    }
  }, [selectedCase]);

  // Handle Securing/Uploading a document in Vault
  const handleUploadDocument = async (e) => {
    e.preventDefault();
    if (!selectedCase) return;

    try {
      setUploadingDoc(true);
      
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentName: documentForm.documentName,
          documentType: documentForm.documentType,
          description: documentForm.description,
          isConfidential: documentForm.isConfidential,
          fileUrl: `/uploads/${documentForm.documentName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.pdf`,
          fileType: "application/pdf",
          fileSize: 1024 * 1024 * 1.5, // 1.5MB
          caseId: selectedCase.id,
        }),
      });

      if (res.ok) {
        const newDoc = await res.json();
        const updatedDocRelation = { id: Date.now().toString(), caseId: selectedCase.id, documentId: newDoc.id, document: newDoc };
        
        const updatedCases = cases.map(c => {
          if (c.id === selectedCase.id) {
            const currentDocs = c.documents || [];
            return { ...c, documents: [...currentDocs, updatedDocRelation] };
          }
          return c;
        });
        
        setCases(updatedCases);
        setSelectedCase(updatedCases.find(c => c.id === selectedCase.id));
        
        setDocumentForm({
          documentName: "",
          documentType: "OTHER",
          description: "",
          isConfidential: true,
        });
        alert("Document successfully secured in Chamber Vault & linked to client case!");
      }
    } catch (err) {
      console.error("Error securing document:", err);
    } finally {
      setUploadingDoc(false);
    }
  };

  // Handle creating FBR / SECP tax record
  const handleCreateTaxRecord = async (e) => {
    e.preventDefault();
    if (!selectedCase || !selectedCase.client) return;

    try {
      setSavingTax(true);
      const res = await fetch("/api/tax-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...taxForm,
          userId: selectedCase.client.id,
          ntnNumber: taxForm.ntnNumber || selectedCase.client.ntnNumber,
          strn: taxForm.strn || selectedCase.client.strn,
        }),
      });

      if (res.ok) {
        const newRecord = await res.json();
        setTaxRecords([newRecord, ...taxRecords]);
        
        setTaxForm({
          recordType: "INCOME_TAX",
          taxYear: "2026",
          filingPeriod: "FY 2026",
          filingStatus: "PENDING",
          ntnNumber: "",
          strn: "",
          companyRegistration: "",
          incorporationNo: "",
          annualFormType: "FORM_A",
          acknowledgementNo: "",
          praStatus: "ACTIVE",
          epadsStatus: "REGISTERED",
          noticeReceived: false,
          noticeContent: "",
        });
        alert("FBR/SECP Compliance record successfully logged for client!");
      }
    } catch (err) {
      console.error("Error creating tax record:", err);
    } finally {
      setSavingTax(false);
    }
  };

  // Handle updating FBR / SECP filing status (e.g. marking pending return as filed)
  const handleUpdateTaxRecordStatus = async (recordId, updatedFields) => {
    try {
      const res = await fetch(`/api/tax-records/${recordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        const updated = await res.json();
        setTaxRecords(taxRecords.map(r => r.id === recordId ? updated : r));
        alert("FBR/SECP compliance status updated successfully!");
      }
    } catch (err) {
      console.error("Error updating tax record status:", err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#02050e] flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          <Scale className="absolute text-gold w-6 h-6 animate-pulse" />
        </div>
        <p className="text-slate-400 mt-6 text-sm font-semibold tracking-widest uppercase">Connecting to Law Chamber Vault...</p>
      </div>
    );
  }

  // Handle Case Status Update
  const updateCaseStatus = async (caseId, newStatus) => {
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setCases(cases.map(c => c.id === caseId ? { ...c, status: newStatus } : c));
        if (selectedCase && selectedCase.id === caseId) {
          setSelectedCase({ ...selectedCase, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Error updating case status:", err);
    }
  };

  // Handle Schedule Hearing
  const handleScheduleHearing = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/hearings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hearingForm)
      });
      if (res.ok) {
        const newHearing = await res.json();
        // Insert case context into new hearing for instant display
        const matchingCase = cases.find(c => c.id === hearingForm.caseId);
        newHearing.case = matchingCase;
        
        setHearings([...hearings, newHearing].sort((a, b) => new Date(a.hearingDate) - new Date(b.hearingDate)));
        
        // Update case's next hearing date in UI
        setCases(cases.map(c => c.id === hearingForm.caseId ? { ...c, nextHearingDate: new Date(hearingForm.hearingDate) } : c));
        
        // Reset and close
        setHearingForm({
          caseId: "",
          hearingDate: "",
          courtRoom: "",
          judgeAssigned: "",
          agenda: "",
          notes: ""
        });
        setIsHearingModalOpen(false);
      }
    } catch (err) {
      console.error("Error scheduling hearing:", err);
    }
  };

  // Handle Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedClient) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: selectedClient.id,
          content: newMessage,
          messageType: "LEGAL_MATTER",
          subject: "Direct response from assigned counsel"
        })
      });
      if (res.ok) {
        const sentMsg = await res.json();
        setMessages([sentMsg, ...messages]);
        setNewMessage("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Derived variables
  const activeCasesCount = cases.filter(c => c.status === "ACTIVE" || c.status === "HEARING").length;
  const pendingHearingsCount = hearings.filter(h => new Date(h.hearingDate) >= new Date()).length;
  const totalClients = Array.from(new Set(cases.map(c => c.client?.id))).map(id => {
    return cases.find(c => c.client?.id === id)?.client;
  }).filter(Boolean);

  // Group messages by client conversations
  const conversations = totalClients.map(client => {
    const clientMessages = messages.filter(m => m.senderId === client.id || m.recipientId === client.id);
    const lastMessage = clientMessages[0]; // Ordered by desc
    return {
      client,
      lastMessage,
      unreadCount: clientMessages.filter(m => m.recipientId === session?.user?.id && !m.isRead).length
    };
  }).sort((a, b) => {
    const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : 0;
    const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : 0;
    return dateB - dateA;
  });

  const activeChatHistory = selectedClient 
    ? [...messages.filter(m => m.senderId === selectedClient.id || m.recipientId === selectedClient.id)].reverse()
    : [];

  return (
    <div className="flex h-screen bg-[#02050e] overflow-hidden relative">
      
      {/* Backdrop overlay for mobile screen drawer */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-all duration-300"
        />
      )}

      {/* ===================== SIDEBAR ===================== */}
      <aside className={`fixed inset-y-0 left-0 w-80 bg-slate-950/95 backdrop-blur-3xl border-r border-slate-900 flex flex-col justify-between shrink-0 z-40 transform transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0 shadow-[5px_0_30px_rgba(0,0,0,0.8)]" : "-translate-x-full lg:translate-x-0"
      }`}>
        
        {/* Glow Element */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gold/5 rounded-full blur-[60px] pointer-events-none"></div>

        <div>
          {/* Logo & Brand Header */}
          <div className="p-8 border-b border-slate-900/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black border border-gold/40 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/10 animate-pulse"></div>
                <Scale className="text-gold w-6 h-6 relative z-10" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block leading-none">Command</span>
                <span className="text-[10px] font-bold text-cyan uppercase tracking-widest block mt-1.5">Advocate Portal</span>
              </div>
            </div>
            {/* Sidebar drawer close button on mobile */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-500 hover:text-white rounded-xl hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 space-y-2">
            {[
              { id: "overview", name: "Overview Desk", icon: <Globe className="w-4 h-4" /> },
              { id: "cases", name: "Active Litigations", icon: <Briefcase className="w-4 h-4" />, count: cases.length },
              { id: "hearings", name: "Court Hearings Diary", icon: <Calendar className="w-4 h-4" />, count: pendingHearingsCount },
              { id: "vault", name: "Encrypted Vault", icon: <FileText className="w-4 h-4" /> },
              { id: "messenger", name: "Secure Messenger", icon: <MessageSquare className="w-4 h-4" />, count: messages.filter(m => m.recipientId === session?.user?.id && !m.isRead).length },
              { id: "consultations", name: "Consultations", icon: <UserCheck className="w-4 h-4" />, count: appointments.length }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all relative ${
                  activeTab === item.id 
                    ? "text-[#02050e] bg-linear-to-r from-gold to-[#c59628] shadow-[0_0_20px_rgba(197,150,40,0.25)] font-black" 
                    : "text-slate-400 hover:bg-slate-900/40 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.count > 0 && activeTab !== item.id && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-cyan border border-slate-800">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Identity Info / Logout */}
        <div className="p-6 border-t border-slate-900/60 bg-slate-950/40 backdrop-blur-md">
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-gold font-black shadow-inner">
              {session?.user?.name ? session.user.name[0] : "L"}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-extrabold text-white truncate leading-none">{session?.user?.name || "Practitioner"}</h4>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-1.5">Senior Counsel</span>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-rose-500/10 to-rose-600/10 hover:from-rose-500/20 hover:to-rose-600/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" /> Exit Command Center
          </button>
        </div>
      </aside>

      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* Glow Element */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

        {/* Header bar */}
        <header className="h-20 bg-slate-950/20 backdrop-blur-md border-b border-slate-900 flex justify-between items-center px-6 md:px-10 relative z-20 shrink-0">
          <div className="flex items-center gap-3">
            {/* Sidebar toggle button for mobile */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg md:text-2xl font-black text-white tracking-tight uppercase leading-none">Chamber Command Center</h1>
              <p className="text-[9px] md:text-xs text-slate-500 font-bold mt-1.5">Live Firm Supervision & Secure File Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchData}
              className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl hover:bg-slate-900 hover:border-slate-700 transition-colors text-slate-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/40 rounded-xl border border-slate-850 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Vault Active</span>
            </div>
          </div>
        </header>

        {/* Tab view slot */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              
              {/* ===================== TAB: OVERVIEW ===================== */}
              {activeTab === "overview" && (
                <div className="space-y-10">
                  {/* Summary row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: "Total Assigned Cases", value: cases.length, desc: "Active & pending matters", color: "from-gold to-[#c59628]", icon: <Briefcase className="w-6 h-6 text-gold" /> },
                      { title: "Active In Court", value: activeCasesCount, desc: "Hearings currently pending", color: "from-cyan to-blue-500", icon: <Gavel className="w-6 h-6 text-cyan" /> },
                      { title: "Upcoming Diary Hearings", value: pendingHearingsCount, desc: "Court schedule count", color: "from-emerald-500 to-teal-600", icon: <Calendar className="w-6 h-6 text-emerald-400" /> },
                      { title: "Unread Messages", value: messages.filter(m => m.recipientId === session?.user?.id && !m.isRead).length, desc: "Awaiting legal reply", color: "from-purple-500 to-indigo-600", icon: <MessageSquare className="w-6 h-6 text-purple-400" /> }
                    ].map((card, idx) => (
                      <div key={idx} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-900 flex justify-between items-start shadow-xl relative overflow-hidden group hover:border-slate-800 transition-colors">
                        <div className="space-y-4">
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{card.title}</p>
                          <h3 className="text-3xl font-black text-white">{card.value}</h3>
                          <p className="text-slate-400 text-xs font-medium">{card.desc}</p>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 group-hover:scale-110 transition-transform">
                          {card.icon}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Splits */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Next Hearings */}
                    <div className="lg:col-span-2 bg-slate-900/40 p-8 rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center"><Calendar className="w-5 h-5 mr-3 text-cyan" /> Scheduled Hearings (FBR & High Court)</h2>
                        <button 
                          onClick={() => {
                            if (cases.length === 0) {
                              alert("Please add a case first before scheduling a hearing.");
                              return;
                            }
                            setIsHearingModalOpen(true);
                          }}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
                        >
                          <Plus className="w-3.5 h-3.5 text-gold" /> Schedule Diary Entry
                        </button>
                      </div>

                      {hearings.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-sm">
                          <Clock className="w-12 h-12 text-slate-700 mb-4" /> No upcoming court hearings listed in the diary.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                                <th className="pb-4">Case Details</th>
                                <th className="pb-4">Date & Time</th>
                                <th className="pb-4">Courtroom</th>
                                <th className="pb-4">Judge</th>
                                <th className="pb-4">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                              {hearings.slice(0, 5).map((hearing, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                                  <td className="py-4">
                                    <p className="text-white font-bold text-sm">{hearing.case?.title}</p>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{hearing.case?.caseNumber}</span>
                                  </td>
                                  <td className="py-4 text-sm font-semibold text-gold">
                                    {new Date(hearing.hearingDate).toLocaleString()}
                                  </td>
                                  <td className="py-4 text-sm text-slate-300 font-medium">
                                    {hearing.courtRoom || "Not assigned"}
                                  </td>
                                  <td className="py-4 text-sm text-slate-400">
                                    {hearing.judgeAssigned || "Not assigned"}
                                  </td>
                                  <td className="py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                                      hearing.hearingStatus === "SCHEDULED" ? "bg-cyan/10 text-cyan border border-cyan/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    }`}>
                                      {hearing.hearingStatus}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Active Consultations */}
                    <div className="lg:col-span-1 bg-slate-900/40 p-8 rounded-3xl border border-slate-900 shadow-2xl">
                      <h2 className="text-lg font-bold text-white mb-6 flex items-center"><Clock className="w-5 h-5 mr-3 text-gold" /> Active Bookings</h2>
                      {appointments.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-sm">
                          <UserCheck className="w-12 h-12 text-slate-700 mb-4" /> No upcoming client consultations booked.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {appointments.slice(0, 4).map((apt, idx) => (
                            <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 flex justify-between items-center">
                              <div>
                                <p className="text-white font-bold text-sm">{apt.user?.name || "Client Booking"}</p>
                                <span className="text-[10px] text-slate-500 font-semibold">{apt.appointmentType}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-bold text-gold block">{apt.scheduledFor ? new Date(apt.scheduledFor).toLocaleDateString() : "Pending"}</span>
                                <span className="text-[10px] text-slate-400 block">{apt.duration} mins</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== TAB: CASES & CLIENTS ===================== */}
              {activeTab === "cases" && (
                <div className="space-y-8">
                  {/* Filtering / Search */}
                  <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-900/30 p-4 rounded-2xl border border-slate-900">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Search assigned cases by case number, title, or client..."
                        value={caseSearch}
                        onChange={(e) => setCaseSearch(e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="flex gap-2">
                      {["ALL", "ACTIVE", "HEARING", "WON", "CLOSED"].map(filter => (
                        <button
                          key={filter}
                          onClick={() => setCaseFilter(filter)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                            caseFilter === filter 
                              ? "bg-gold text-[#02050e] border-gold font-black" 
                              : "bg-slate-950/40 text-slate-400 border-slate-800 hover:text-white"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid layout with table + details panel */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    
                    {/* Cases List */}
                    <div className={`${selectedCase ? "xl:col-span-2" : "xl:col-span-3"} bg-slate-900/40 p-8 rounded-3xl border border-slate-900 shadow-2xl`}>
                      <h2 className="text-lg font-bold text-white mb-6">Assigned Case Flow</h2>
                      
                      {cases.length === 0 ? (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-500">
                          No cases assigned to your advocacy license.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                                <th className="pb-4">Case Title</th>
                                <th className="pb-4">Client</th>
                                <th className="pb-4">Court Location</th>
                                <th className="pb-4">Next Hearing</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                              {cases
                                .filter(c => {
                                  const searchMatch = c.title.toLowerCase().includes(caseSearch.toLowerCase()) ||
                                                      c.caseNumber.toLowerCase().includes(caseSearch.toLowerCase()) ||
                                                      c.client?.name.toLowerCase().includes(caseSearch.toLowerCase());
                                  const filterMatch = caseFilter === "ALL" || c.status === caseFilter;
                                  return searchMatch && filterMatch;
                                })
                                .map((c, idx) => (
                                  <tr key={idx} className="hover:bg-slate-850/20 transition-colors">
                                    <td className="py-4">
                                      <p className="text-white font-bold text-sm leading-tight">{c.title}</p>
                                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.caseNumber}</span>
                                    </td>
                                    <td className="py-4 text-sm font-semibold text-slate-300">
                                      {c.client?.name}
                                    </td>
                                    <td className="py-4 text-xs font-semibold text-slate-400">
                                      {c.courtName || "N/A"}
                                    </td>
                                    <td className="py-4 text-xs font-bold text-gold">
                                      {c.nextHearingDate ? new Date(c.nextHearingDate).toLocaleDateString() : "Pending"}
                                    </td>
                                    <td className="py-4">
                                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black ${
                                        c.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                        c.status === "HEARING" ? "bg-cyan/10 text-cyan border border-cyan/20" :
                                        c.status === "WON" ? "bg-gold/10 text-gold border border-gold/20" :
                                        "bg-slate-800 text-slate-400 border border-slate-700"
                                      }`}>
                                        {c.status}
                                      </span>
                                    </td>
                                    <td className="py-4">
                                      <button 
                                        onClick={() => setSelectedCase(c)}
                                        className="text-gold hover:underline text-xs font-bold flex items-center gap-1"
                                      >
                                        <Eye className="w-3.5 h-3.5" /> Inspect
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Sliding/Opening Case Detail Panel */}
                    {selectedCase && (
                      <div className="xl:col-span-1 bg-slate-950 p-8 rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        
                        {/* Closing Button */}
                        <button 
                          onClick={() => setSelectedCase(null)}
                          className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold text-lg p-2"
                        >
                          &times;
                        </button>

                        <div>
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-gold text-xs font-bold mb-6 mt-2">
                            {selectedCase.caseNumber}
                          </div>
                          
                          <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">{selectedCase.title}</h3>
                          <p className="text-slate-400 text-xs leading-relaxed mb-6 border-b border-slate-900 pb-4">{selectedCase.description || "No description provided."}</p>

                          {/* Client Information */}
                          <div className="space-y-4 mb-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Secure Client Details</h4>
                            <div className="flex items-center gap-3">
                              <User className="w-4 h-4 text-cyan shrink-0" />
                              <div>
                                <p className="text-xs text-slate-400">Name</p>
                                <p className="text-sm font-bold text-white leading-tight">{selectedCase.client?.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-cyan shrink-0" />
                              <div>
                                <p className="text-xs text-slate-400">Email</p>
                                <p className="text-sm font-bold text-slate-350 leading-tight">{selectedCase.client?.email}</p>
                              </div>
                            </div>
                            {selectedCase.client?.phoneNumber && (
                              <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-cyan shrink-0" />
                                <div>
                                  <p className="text-xs text-slate-400">Phone</p>
                                  <p className="text-sm font-bold text-slate-350 leading-tight">{selectedCase.client.phoneNumber}</p>
                                </div>
                              </div>
                            )}
                            {selectedCase.client?.ntnNumber && (
                              <div className="flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4 text-cyan shrink-0" />
                                <div>
                                  <p className="text-xs text-slate-400">FBR NTN Number</p>
                                  <p className="text-sm font-bold text-gold leading-tight">{selectedCase.client.ntnNumber}</p>
                                </div>
                              </div>
                            )}
                            {selectedCase.client?.strn && (
                              <div className="flex items-center gap-3">
                                <ShieldCheck className="w-4 h-4 text-cyan shrink-0" />
                                <div>
                                  <p className="text-xs text-slate-400">Sales Tax STRN</p>
                                  <p className="text-sm font-bold text-gold leading-tight">{selectedCase.client.strn}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Litigations Control Panel */}
                        <div className="border-t border-slate-900 pt-6 mt-6">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Litigation Control</h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs text-slate-500 mb-2">Change Litigation Status</p>
                              <div className="grid grid-cols-2 gap-2">
                                {["ACTIVE", "HEARING", "WON", "CLOSED"].map(st => (
                                  <button
                                    key={st}
                                    onClick={() => updateCaseStatus(selectedCase.id, st)}
                                    className={`px-3 py-2 rounded-xl text-[10px] font-black tracking-widest border transition-all ${
                                      selectedCase.status === st
                                        ? "bg-gold text-slate-950 border-gold font-bold"
                                        : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                                    }`}
                                  >
                                    {st}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button 
                              onClick={() => {
                                setHearingForm({
                                  ...hearingForm,
                                  caseId: selectedCase.id
                                });
                                setIsHearingModalOpen(true);
                              }}
                              className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl border border-slate-800 transition-colors flex justify-center items-center gap-2"
                            >
                              <Plus className="w-3.5 h-3.5 text-gold" /> Schedule Next Hearing
                            </button>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* ===================== TAB: HEARINGS DIARY ===================== */}
              {activeTab === "hearings" && (
                <div className="max-w-4xl mx-auto space-y-10">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-6">
                    <div>
                      <h2 className="text-2xl font-black text-white">Chamber Litigation Diary</h2>
                      <p className="text-xs text-slate-500 font-bold mt-1.5">Scheduled Court appearances, FBR reviews & notices</p>
                    </div>
                    <button 
                      onClick={() => setIsHearingModalOpen(true)}
                      className="px-6 py-3 bg-linear-to-r from-gold to-[#c59628] hover:shadow-[0_0_20px_rgba(197,150,40,0.3)] text-[#02050e] font-black text-sm rounded-xl transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Schedule New Hearing
                    </button>
                  </div>

                  {hearings.length === 0 ? (
                    <div className="h-96 flex flex-col items-center justify-center text-slate-500 bg-slate-900/20 rounded-3xl border border-slate-900">
                      <Calendar className="w-16 h-16 text-slate-800 mb-4" />
                      <p className="font-bold">No hearings schedule in your diary.</p>
                      <p className="text-xs text-slate-600 mt-2">Use the button above to schedule one.</p>
                    </div>
                  ) : (
                    <div className="relative border-l-4 border-slate-900 ml-4 pl-8 space-y-10">
                      {hearings.map((hearing, idx) => {
                        const isUpcoming = new Date(hearing.hearingDate) >= new Date();
                        return (
                          <div key={idx} className="relative group">
                            
                            {/* Marker Icon */}
                            <div className={`absolute -left-[45px] top-1.5 w-6 h-6 rounded-full border-4 border-[#02050e] flex items-center justify-center ${
                              isUpcoming ? "bg-cyan shadow-[0_0_10px_rgba(6,182,212,0.3)]" : "bg-slate-700"
                            }`}></div>

                            {/* Container Card */}
                            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-900 hover:border-slate-800 transition-colors shadow-lg">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                <div>
                                  <h4 className="text-white font-extrabold text-base leading-tight">{hearing.case?.title}</h4>
                                  <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block mt-1">{hearing.case?.caseNumber}</span>
                                </div>
                                <div className="text-left md:text-right shrink-0">
                                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Hearing Schedule</p>
                                  <p className="text-base font-black text-gold">{new Date(hearing.hearingDate).toLocaleString()}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-950 pt-4 text-xs text-slate-400">
                                <div>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Courtroom & Bench</p>
                                  <p className="font-semibold text-slate-200">{hearing.courtRoom || "Not assigned"}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Honorable Judge</p>
                                  <p className="font-semibold text-slate-200">{hearing.judgeAssigned || "Not assigned"}</p>
                                </div>
                              </div>

                              {hearing.agenda && (
                                <div className="mt-4 bg-[#02050e]/50 p-3.5 rounded-xl border border-slate-950 text-xs">
                                  <p className="text-[10px] text-gold font-bold uppercase tracking-wider mb-1">Hearing Agenda / Cause of Action</p>
                                  <p className="text-slate-300 leading-relaxed">{hearing.agenda}</p>
                                </div>
                              )}
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ===================== TAB: VAULT DOCUMENTS ===================== */}
              {activeTab === "vault" && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-6">
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight uppercase">Chamber Compliance & Vault</h2>
                      <p className="text-xs text-slate-500 font-bold mt-1">FBR Income Tax, Sales Tax, SECP Corporate Forms & Certified High Court Records</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Left Panel: Client Case folders */}
                    <div className="lg:col-span-1 bg-slate-950/60 p-6 rounded-3xl border border-slate-900 h-fit space-y-4">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Select Client Folder</h3>
                      <div className="space-y-2">
                        {cases.map((c, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedCase(c)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col ${
                              selectedCase?.id === c.id 
                                ? "bg-slate-900 border-gold/50 shadow-[0_0_15px_rgba(197,150,40,0.15)]" 
                                : "bg-slate-950/40 border-slate-900 hover:bg-slate-900/40 hover:text-white"
                            }`}
                          >
                            <span className="text-[10px] font-black text-cyan uppercase tracking-wider mb-1.5">{c.caseNumber}</span>
                            <span className="font-extrabold text-white text-sm truncate leading-tight">{c.title}</span>
                            <span className="text-[10px] text-slate-500 font-bold mt-2 truncate">Client: {c.client?.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel: Interactive compliance and vault area */}
                    <div className="lg:col-span-3">
                      {!selectedCase ? (
                        <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-16 text-center text-slate-500 flex flex-col items-center justify-center min-h-[400px]">
                          <Briefcase className="w-16 h-16 text-slate-800 mb-6 animate-bounce" />
                          <h4 className="text-white font-extrabold text-lg mb-2">No Active Client Folder Selected</h4>
                          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">Please select a case folder from the left pane to access high-security FBR compliance files, SECP registry details, and document pleadings.</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          
                          {/* Folder Overview Info */}
                          <div className="bg-slate-950/40 p-6 rounded-3xl border border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <span className="px-3 py-1 bg-slate-900 text-gold text-[10px] font-black uppercase tracking-wider rounded-full border border-slate-850">
                                Folder: {selectedCase.caseNumber}
                              </span>
                              <h3 className="text-xl font-black text-white mt-3 leading-snug">{selectedCase.title}</h3>
                              <p className="text-xs text-slate-500 font-bold mt-1">Client NTN: <span className="text-gold">{selectedCase.client?.ntnNumber || "Not Assigned"}</span> | CNIC: <span className="text-slate-355">{selectedCase.client?.cnic || "Not Assigned"}</span></p>
                            </div>
                            
                            {/* Vault Subtabs */}
                            <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-850 shrink-0 gap-1.5">
                              {[
                                { id: "pleadings", name: "Court Pleadings", icon: <Scale className="w-3.5 h-3.5" /> },
                                { id: "fbr", name: "FBR Tax Vault", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                                { id: "secp", name: "SECP Corporate", icon: <Briefcase className="w-3.5 h-3.5" /> }
                              ].map(sub => (
                                <button
                                  key={sub.id}
                                  onClick={() => setActiveVaultSubTab(sub.id)}
                                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                                    activeVaultSubTab === sub.id
                                      ? "bg-gold text-[#02050e] font-black shadow-lg"
                                      : "text-slate-400 hover:text-white"
                                  }`}
                                >
                                  {sub.icon}
                                  <span>{sub.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* SUBTAB: COURT PLEADINGS */}
                          {activeVaultSubTab === "pleadings" && (
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                              
                              {/* File List */}
                              <div className="xl:col-span-2 bg-slate-900/40 p-8 rounded-3xl border border-slate-900 shadow-xl space-y-6">
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-cyan" /> Secure Pleading Files & Power of Attorney
                                </h3>

                                {(!selectedCase.documents || selectedCase.documents.length === 0) ? (
                                  <div className="h-64 border border-dashed border-slate-850 rounded-2xl flex flex-col items-center justify-center text-slate-500 text-xs">
                                    <FileText className="w-10 h-10 text-slate-850 mb-3" />
                                    No pleadings or certified documents secured in this case vault yet.
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    {selectedCase.documents.map((rel, idx) => (
                                      <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex justify-between items-center hover:border-slate-800 transition-colors">
                                        <div className="flex items-center gap-3">
                                          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850 text-gold">
                                            <FileText className="w-5 h-5" />
                                          </div>
                                          <div>
                                            <p className="text-white font-extrabold text-sm">{rel.document?.documentName}</p>
                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
                                              {rel.document?.documentType} • {(rel.document?.fileSize / 1024 / 1024).toFixed(2)} MB • {new Date(rel.document?.uploadedAt).toLocaleDateString()}
                                            </span>
                                          </div>
                                        </div>
                                        <a href={rel.document?.fileUrl || "#"} download target="_blank" rel="noreferrer" className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-gold hover:text-gold/90 font-bold text-[10px] uppercase tracking-wider transition-colors">
                                          Download
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Form Add Document */}
                              <div className="xl:col-span-1 bg-slate-950 p-6 rounded-3xl border border-slate-900 shadow-xl h-fit">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Secure Pleading in Chamber Vault</h4>
                                
                                <form onSubmit={handleUploadDocument} className="space-y-4">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Document Name</label>
                                    <input 
                                      required
                                      type="text" 
                                      placeholder="e.g. Wakalatnama Power of Attorney"
                                      value={documentForm.documentName}
                                      onChange={(e) => setDocumentForm({ ...documentForm, documentName: e.target.value })}
                                      className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Document Type</label>
                                    <select
                                      value={documentForm.documentType}
                                      onChange={(e) => setDocumentForm({ ...documentForm, documentType: e.target.value })}
                                      className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                    >
                                      <option value="WAKALATNAMA">Wakalatnama / Power of Attorney</option>
                                      <option value="CNIC_COPY">CNIC Scanned Copy</option>
                                      <option value="PROPERTY_DEED">Registered Property Deed</option>
                                      <option value="COURT_ORDER">Court Order Sheet</option>
                                      <option value="SECP_CERTIFICATE">SECP Incorporation Certificate</option>
                                      <option value="FBR_NOTICE">FBR Audit Notice Sheet</option>
                                      <option value="TAX_RETURN">FBR Audited Tax Return File</option>
                                      <option value="OTHER">Other certified Record</option>
                                    </select>
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Brief Description</label>
                                    <textarea 
                                      placeholder="Provide audit reference or litigation context..."
                                      value={documentForm.description}
                                      onChange={(e) => setDocumentForm({ ...documentForm, description: e.target.value })}
                                      className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors h-20 resize-none"
                                    />
                                  </div>

                                  <button 
                                    type="submit"
                                    disabled={uploadingDoc}
                                    className="w-full py-3 bg-gold hover:bg-gold/90 disabled:bg-gold/40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-4"
                                  >
                                    {uploadingDoc ? (
                                      <>Saving to Vault...</>
                                    ) : (
                                      <>Secure Document <ArrowRight className="w-3.5 h-3.5" /></>
                                    )}
                                  </button>
                                </form>
                              </div>

                            </div>
                          )}

                          {/* SUBTAB: FBR TAX COMPLIANCE */}
                          {activeVaultSubTab === "fbr" && (
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                              
                              {/* Tax History and Records */}
                              <div className="xl:col-span-2 space-y-6">
                                
                                {/* FBR Live Status Board */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/40 p-5 rounded-3xl border border-slate-900">
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">FBR NTN Status</span>
                                    <span className="text-sm font-extrabold text-gold block mt-1">{selectedCase.client?.ntnNumber || "1234567-8"}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Sales Tax STRN</span>
                                    <span className="text-sm font-extrabold text-white block mt-1">{selectedCase.client?.strn || "STRN Active"}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">PRA Active Status</span>
                                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 inline-block mt-1">ACTIVE</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">E-PADS Status</span>
                                    <span className="text-xs font-black text-cyan bg-cyan/10 px-2 py-0.5 rounded-md border border-cyan/20 inline-block mt-1">REGISTERED</span>
                                  </div>
                                </div>

                                {/* Audits Notices Monitor */}
                                {taxRecords.some(r => r.noticeReceived) && (
                                  <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-3xl flex justify-between items-start gap-4">
                                    <div className="space-y-2">
                                      <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-400 text-[9px] font-black uppercase tracking-wider rounded-md border border-rose-500/30 inline-block">FBR Audit Notice Raised</span>
                                      <h4 className="text-white font-extrabold text-sm">FBR Audit Wealth Statement notice detected</h4>
                                      <p className="text-xs text-slate-400 leading-relaxed">{taxRecords.find(r => r.noticeReceived)?.noticeContent || "The client has received an audit reconciliation notice. Please review statement responses immediately."}</p>
                                    </div>
                                    <button 
                                      onClick={() => {
                                        const noticeRecord = taxRecords.find(r => r.noticeReceived);
                                        const responseUrl = prompt("Enter Response document URL or certified statement link:", "/documents/audit-defense-response.pdf");
                                        if (responseUrl) {
                                          handleUpdateTaxRecordStatus(noticeRecord.id, { responseDocumentUrl: responseUrl });
                                        }
                                      }}
                                      className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0 transition-colors"
                                    >
                                      Submit Response
                                    </button>
                                  </div>
                                )}

                                {/* Tax Filing List */}
                                <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-900 shadow-xl space-y-6">
                                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-cyan" /> Historical Income Tax & Sales Tax filings
                                  </h3>

                                  {loadingTaxRecords ? (
                                    <div className="py-8 text-center text-slate-500 text-xs">Querying Federal Board Database...</div>
                                  ) : taxRecords.length === 0 ? (
                                    <div className="py-8 text-center text-slate-500 text-xs">No FBR Tax filing history found for this client.</div>
                                  ) : (
                                    <div className="space-y-4">
                                      {taxRecords.filter(r => r.recordType === "INCOME_TAX" || r.recordType === "SALES_TAX").map((record, idx) => (
                                        <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                          <div>
                                            <div className="flex items-center gap-3">
                                              <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-cyan text-[10px] font-bold uppercase rounded-md">
                                                {record.recordType.replace("_", " ")}
                                              </span>
                                              <span className="text-sm font-extrabold text-white">Year: {record.taxYear}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2">Filing Period: {record.filingPeriod} | NTN: {record.ntnNumber || "N/A"}</p>
                                            {record.acknowledgementNo && (
                                              <p className="text-[10px] text-gold font-bold uppercase mt-1">Ack No: {record.acknowledgementNo}</p>
                                            )}
                                          </div>

                                          <div className="flex items-center gap-3 shrink-0">
                                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black ${
                                              record.filingStatus === "FILED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-gold/10 text-gold border border-gold/20 animate-pulse"
                                            }`}>
                                              {record.filingStatus}
                                            </span>

                                            {record.filingStatus === "PENDING" && (
                                              <button 
                                                onClick={() => {
                                                  const ack = prompt("Enter FBR Return Acknowledgement number:", "ACK-" + Date.now().toString().slice(-6));
                                                  if (ack) {
                                                    handleUpdateTaxRecordStatus(record.id, { filingStatus: "FILED", acknowledgementNo: ack, filedDate: new Date() });
                                                  }
                                                }}
                                                className="px-3.5 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
                                              >
                                                Mark Filed
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                              </div>

                              {/* Form Create Tax Filing */}
                              <div className="xl:col-span-1 bg-slate-950 p-6 rounded-3xl border border-slate-900 shadow-xl h-fit">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Log FBR Filing / notice</h4>
                                
                                <form onSubmit={handleCreateTaxRecord} className="space-y-4">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Record Category</label>
                                    <select
                                      value={taxForm.recordType}
                                      onChange={(e) => setTaxForm({ ...taxForm, recordType: e.target.value })}
                                      className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                    >
                                      <option value="INCOME_TAX">FBR Income Tax Filing</option>
                                      <option value="SALES_TAX">FBR Sales Tax Return</option>
                                    </select>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Tax Year</label>
                                      <input 
                                        required
                                        type="text" 
                                        placeholder="2026"
                                        value={taxForm.taxYear}
                                        onChange={(e) => setTaxForm({ ...taxForm, taxYear: e.target.value })}
                                        className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Filing Period</label>
                                      <input 
                                        required
                                        type="text" 
                                        placeholder="FY 2026"
                                        value={taxForm.filingPeriod}
                                        onChange={(e) => setTaxForm({ ...taxForm, filingPeriod: e.target.value })}
                                        className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Filing Initial Status</label>
                                    <select
                                      value={taxForm.filingStatus}
                                      onChange={(e) => setTaxForm({ ...taxForm, filingStatus: e.target.value })}
                                      className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                    >
                                      <option value="PENDING">Pending client details</option>
                                      <option value="FILED">Fully Filed Return</option>
                                    </select>
                                  </div>

                                  <div className="space-y-3 pt-3 border-t border-slate-900">
                                    <div className="flex items-center gap-2">
                                      <input 
                                        type="checkbox"
                                        id="noticeReceivedCheckbox"
                                        checked={taxForm.noticeReceived}
                                        onChange={(e) => setTaxForm({ ...taxForm, noticeReceived: e.target.checked })}
                                        className="w-4 h-4 rounded bg-[#02050e] border border-slate-805 text-gold focus:ring-0"
                                      />
                                      <label htmlFor="noticeReceivedCheckbox" className="text-[10px] font-bold text-rose-400 uppercase tracking-wider cursor-pointer">Register FBR Audit Notice</label>
                                    </div>

                                    {taxForm.noticeReceived && (
                                      <textarea 
                                        required
                                        placeholder="Enter details of FBR notice (e.g. audit under section 177 or wealth statement mismatch)..."
                                        value={taxForm.noticeContent}
                                        onChange={(e) => setTaxForm({ ...taxForm, noticeContent: e.target.value })}
                                        className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors h-24 resize-none"
                                      />
                                    )}
                                  </div>

                                  <button 
                                    type="submit"
                                    disabled={savingTax}
                                    className="w-full py-3 bg-linear-to-r from-gold to-[#c59628] disabled:from-gold/40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-4"
                                  >
                                    {savingTax ? <>Logging...</> : <>Log Compliance Entry <ArrowRight className="w-3.5 h-3.5" /></>}
                                  </button>
                                </form>
                              </div>

                            </div>
                          )}

                          {/* SUBTAB: SECP CORPORATE COMPLIANCE */}
                          {activeVaultSubTab === "secp" && (
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                              
                              {/* SECP Registry details */}
                              <div className="xl:col-span-2 space-y-6">
                                
                                {/* SECP status summary card */}
                                <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-900 flex justify-between items-center shadow-lg">
                                  <div>
                                    <h4 className="text-white font-extrabold text-base">Securities & Exchange Commission Registry</h4>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">Assisting client Hassan Trading Co. in corporate filings compliance.</p>
                                  </div>
                                  <span className="px-3 py-1 bg-cyan/10 border border-cyan/20 text-cyan text-xs font-black uppercase rounded-full">
                                    SECP Filer
                                  </span>
                                </div>

                                {/* Form List */}
                                <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-900 shadow-xl space-y-6">
                                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-cyan" /> Corporate Annual filings (Form A, Form 29, Incorporation)
                                  </h3>

                                  {loadingTaxRecords ? (
                                    <div className="py-8 text-center text-slate-500 text-xs">Querying SECP Database...</div>
                                  ) : taxRecords.filter(r => r.recordType === "SECP_FILING").length === 0 ? (
                                    <div className="py-8 text-center text-slate-500 text-xs">No SECP corporate registry records logged.</div>
                                  ) : (
                                    <div className="space-y-4">
                                      {taxRecords.filter(r => r.recordType === "SECP_FILING").map((record, idx) => (
                                        <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                          <div>
                                            <div className="flex items-center gap-3">
                                              <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-gold text-[10px] font-bold uppercase rounded-md">
                                                {record.annualFormType}
                                              </span>
                                              <span className="text-sm font-extrabold text-white">Year: {record.taxYear}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2">Inc. Number: <span className="text-gold font-bold">{record.incorporationNo || "Inc-352"}</span></p>
                                            {record.companyRegistration && (
                                              <p className="text-[10px] text-slate-500 mt-1">Company: {record.companyRegistration}</p>
                                            )}
                                          </div>

                                          <div className="flex items-center gap-3 shrink-0">
                                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black ${
                                              record.filingStatus === "FILED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-gold/10 text-gold border border-gold/20"
                                            }`}>
                                              {record.filingStatus}
                                            </span>

                                            {record.filingStatus === "PENDING" && (
                                              <button 
                                                onClick={() => {
                                                  handleUpdateTaxRecordStatus(record.id, { filingStatus: "FILED", filedDate: new Date() });
                                                }}
                                                className="px-3.5 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
                                              >
                                                Mark Filed
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                              </div>

                              {/* Form Log SECP Corporate Record */}
                              <div className="xl:col-span-1 bg-slate-950 p-6 rounded-3xl border border-slate-900 shadow-xl h-fit">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Log SECP Corporate Form</h4>
                                
                                <form onSubmit={(e) => {
                                  e.preventDefault();
                                  handleCreateTaxRecord(e);
                                }} className="space-y-4">
                                  
                                  {/* Secretly set recordType to SECP_FILING for this form */}
                                  <input type="hidden" ref={() => { taxForm.recordType = "SECP_FILING"; }} />

                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Corporate Form Type</label>
                                    <select
                                      value={taxForm.annualFormType}
                                      onChange={(e) => setTaxForm({ ...taxForm, annualFormType: e.target.value, recordType: "SECP_FILING" })}
                                      className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                    >
                                      <option value="FORM_A">Form A (Annual Return of Company)</option>
                                      <option value="FORM_29">Form 29 (Director Particulars change)</option>
                                      <option value="FORM_21">Form 21 (Registered Office change)</option>
                                      <option value="INCORPORATION">Incorporation & Articles Registry</option>
                                    </select>
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Company Registration Name</label>
                                    <input 
                                      required
                                      type="text" 
                                      placeholder="e.g. Hassan Trading Co. (Pvt) Ltd"
                                      value={taxForm.companyRegistration}
                                      onChange={(e) => setTaxForm({ ...taxForm, companyRegistration: e.target.value, recordType: "SECP_FILING" })}
                                      className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Incorporation Certificate No</label>
                                    <input 
                                      required
                                      type="text" 
                                      placeholder="e.g. SECP-PVT-10294"
                                      value={taxForm.incorporationNo}
                                      onChange={(e) => setTaxForm({ ...taxForm, incorporationNo: e.target.value, recordType: "SECP_FILING" })}
                                      className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Filing Year</label>
                                      <input 
                                        required
                                        type="text" 
                                        placeholder="2026"
                                        value={taxForm.taxYear}
                                        onChange={(e) => setTaxForm({ ...taxForm, taxYear: e.target.value, recordType: "SECP_FILING" })}
                                        className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Status</label>
                                      <select
                                        value={taxForm.filingStatus}
                                        onChange={(e) => setTaxForm({ ...taxForm, filingStatus: e.target.value, recordType: "SECP_FILING" })}
                                        className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                                      >
                                        <option value="PENDING">Draft pending sign</option>
                                        <option value="FILED">Fully Filed SECP</option>
                                      </select>
                                    </div>
                                  </div>

                                  <button 
                                    type="submit"
                                    disabled={savingTax}
                                    className="w-full py-3 bg-gold hover:bg-gold/90 disabled:bg-gold/40 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-4"
                                  >
                                    {savingTax ? <>Log SECP...</> : <>Log SECP Record <ArrowRight className="w-3.5 h-3.5" /></>}
                                  </button>
                                </form>
                              </div>

                            </div>
                          )}

                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* ===================== TAB: MESSENGER ===================== */}
              {activeTab === "messenger" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)] overflow-hidden">
                  
                  {/* Conversations Sidebar */}
                  <div className={`lg:col-span-1 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 overflow-y-auto space-y-4 ${
                    selectedClient ? "hidden lg:block" : "block"
                  }`}>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Active Clients</h3>
                    <div className="space-y-2">
                      {conversations.length === 0 ? (
                        <div className="text-center text-slate-500 text-sm mt-8">No client threads found.</div>
                      ) : (
                        conversations.map(conv => (
                          <button
                            key={conv.client.id}
                            onClick={() => setSelectedClient(conv.client)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${
                              selectedClient?.id === conv.client.id 
                                ? "bg-slate-950 border-gold/40 shadow-lg" 
                                : "bg-slate-900/40 border-slate-850 hover:bg-slate-800/20"
                            }`}
                          >
                            <div className="overflow-hidden mr-2">
                              <h4 className="font-bold text-white text-sm truncate leading-tight">{conv.client.name}</h4>
                              <p className="text-xs text-slate-400 truncate mt-1">{conv.lastMessage?.content || "No messages yet"}</p>
                            </div>
                            {conv.unreadCount > 0 && (
                              <span className="bg-cyan text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)] shrink-0">
                                {conv.unreadCount}
                              </span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className={`lg:col-span-2 bg-slate-900/40 border border-slate-900 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden ${
                    selectedClient ? "flex" : "hidden lg:flex"
                  }`}>
                    {!selectedClient ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                        <MessageSquare className="w-12 h-12 text-slate-800 mb-4 animate-pulse" />
                        Select a client thread from the list to start messaging.
                      </div>
                    ) : (
                      <>
                        {/* Chat Header */}
                        <div className="px-6 md:px-8 py-5 border-b border-slate-950 bg-slate-950/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => setSelectedClient(null)}
                              className="lg:hidden p-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 rounded-xl text-slate-400 hover:text-white"
                            >
                              <ArrowRight className="w-4 h-4 rotate-180" />
                            </button>
                            <div>
                              <h4 className="font-bold text-white text-base leading-none">{selectedClient.name}</h4>
                              <span className="text-[10px] font-bold text-cyan uppercase tracking-widest mt-2 block">Direct Counsel Link</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-3 py-1 bg-slate-950 border border-slate-850 text-gold rounded-full uppercase tracking-wider shrink-0">
                            SECURE CHANNEL
                          </span>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                          {activeChatHistory.length === 0 ? (
                            <div className="text-center text-slate-500 text-xs">No messages recorded in this secure channel.</div>
                          ) : (
                            activeChatHistory.map((msg, idx) => {
                              const isMe = msg.senderId === session?.user?.id;
                              return (
                                <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                  <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm border ${
                                    isMe 
                                      ? "bg-slate-950 text-slate-200 border-slate-800 rounded-tr-none" 
                                      : "bg-slate-900/80 text-slate-200 border-slate-850 rounded-tl-none"
                                  }`}>
                                    <p className="leading-relaxed wrap-break-word">{msg.content}</p>
                                    <span className="text-[9px] text-slate-500 font-semibold block text-right mt-2 uppercase tracking-widest">
                                      {new Date(msg.createdAt).toLocaleTimeString()}
                                    </span>
                                  </div>
                                </div>
                              );
                            })
                          )}
                          <div ref={chatEndRef}></div>
                        </div>

                        {/* Chat input */}
                        <form onSubmit={handleSendMessage} className="p-4 md:p-6 border-t border-slate-950 bg-slate-950/20 flex gap-3 shrink-0">
                          <input 
                            type="text" 
                            placeholder="Type secure legal advisory message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white text-xs md:text-sm focus:outline-none focus:border-gold transition-colors"
                          />
                          <button 
                            type="submit"
                            className="px-4 md:px-6 bg-gold hover:bg-gold/90 text-slate-950 rounded-xl font-bold flex items-center justify-center transition-colors shadow-lg"
                          >
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </form>
                      </>
                    )}
                  </div>

                </div>
              )}

              {/* ===================== TAB: CONSULTATIONS ===================== */}
              {activeTab === "consultations" && (
                <div className="space-y-8">
                  <div className="border-b border-slate-900 pb-6">
                    <h2 className="text-2xl font-black text-white">Prospective Consultations</h2>
                    <p className="text-xs text-slate-500 font-bold mt-1.5">Manage booked consultation slots, client concerns, and meeting schedules</p>
                  </div>

                  {appointments.length === 0 ? (
                    <div className="h-96 flex flex-col items-center justify-center text-slate-500 bg-slate-900/20 rounded-3xl border border-slate-900">
                      <UserCheck className="w-16 h-16 text-slate-800 mb-4" />
                      <p className="font-bold">No consultation slots booked.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {appointments.map((apt, idx) => (
                        <div key={idx} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-900 shadow-xl flex flex-col justify-between group hover:border-slate-800 transition-colors">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-[10px] font-black px-2.5 py-1 bg-slate-950 rounded-full border border-slate-850 text-cyan uppercase tracking-widest">
                                {apt.appointmentType}
                              </span>
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{apt.duration} MINS</span>
                            </div>
                            <h4 className="text-white font-extrabold text-base mb-2 leading-none">{apt.user?.name || "Client Booking"}</h4>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">{apt.description || "Consultation regarding legal/tax status."}</p>
                            
                            {apt.user?.phoneNumber && (
                              <p className="text-xs text-slate-400 mb-1 flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-gold shrink-0" /> {apt.user.phoneNumber}
                              </p>
                            )}
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-gold shrink-0" /> {apt.user?.email}
                            </p>
                          </div>

                          <div className="border-t border-slate-950 pt-4 mt-6 flex justify-between items-center text-xs">
                            <div>
                              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Date & Time</p>
                              <p className="font-bold text-gold">{apt.scheduledFor ? new Date(apt.scheduledFor).toLocaleString() : "Pending"}</p>
                            </div>
                            {apt.meetingLink ? (
                              <a 
                                href={apt.meetingLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all"
                              >
                                Join Meet
                              </a>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">In-Person</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ===================== SCHEDULE HEARING MODAL ===================== */}
      {isHearingModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#02050e]/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-slate-950 border border-slate-900 rounded-3xl p-8 shadow-2xl relative"
          >
            <button 
              onClick={() => setIsHearingModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white font-bold text-lg p-2"
            >
              &times;
            </button>

            <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gold" /> Schedule Diary Entry
            </h3>

            <form onSubmit={handleScheduleHearing} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Select Client Case</label>
                <select
                  required
                  value={hearingForm.caseId}
                  onChange={(e) => setHearingForm({ ...hearingForm, caseId: e.target.value })}
                  className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="" disabled>Choose assigned litigation...</option>
                  {cases.map((c, idx) => (
                    <option key={idx} value={c.id}>{c.caseNumber} - {c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</label>
                  <input
                    required
                    type="datetime-local"
                    value={hearingForm.hearingDate}
                    onChange={(e) => setHearingForm({ ...hearingForm, hearingDate: e.target.value })}
                    className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Courtroom / Bench</label>
                  <input
                    type="text"
                    placeholder="e.g. Courtroom 4-A"
                    value={hearingForm.courtRoom}
                    onChange={(e) => setHearingForm({ ...hearingForm, courtRoom: e.target.value })}
                    className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Judge Assigned</label>
                <input
                  type="text"
                  placeholder="e.g. Justice Muhammad Amin"
                  value={hearingForm.judgeAssigned}
                  onChange={(e) => setHearingForm({ ...hearingForm, judgeAssigned: e.target.value })}
                  className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Hearing Agenda / Cause of Action</label>
                <textarea
                  placeholder="Describe the main cause, evidence due, or agenda..."
                  value={hearingForm.agenda}
                  onChange={(e) => setHearingForm({ ...hearingForm, agenda: e.target.value })}
                  className="w-full bg-[#02050e] border border-slate-850 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold transition-colors h-24"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold hover:bg-gold/90 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg mt-4 flex items-center justify-center gap-2"
              >
                Schedule & Record <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
