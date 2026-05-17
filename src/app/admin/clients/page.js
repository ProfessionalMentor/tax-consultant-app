"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MoreVertical,
  Plus,
  Loader2,
  X,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

export default function AdminClientsPage() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Form states for new client
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ntn, setNtn] = useState("");
  const [strn, setStrn] = useState("");
  const [cnic, setCnic] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (err) {
      console.error("Failed to fetch clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phoneNumber: phone,
          ntnNumber: ntn,
          strn,
          cnic,
          businessName,
          businessType
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setNtn("");
        setStrn("");
        setCnic("");
        setBusinessName("");
        setBusinessType("");
        setIsModalOpen(false);
        // Refresh list
        fetchClients();
      } else {
        alert(data.error || "Failed to add client");
      }
    } catch (err) {
      console.error("Error adding client:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client.businessName && client.businessName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client.ntnNumber && client.ntnNumber.includes(searchQuery));
    
    const matchesStatus = statusFilter === "ALL" || client.taxFilingStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-300 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> CRM Vault
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              <Users className="w-8 h-8 mr-3 text-cyan" /> Client Directory
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Manage all individual and corporate clients, their contact information, compliance status, and security details.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] text-[#040814] font-black rounded-xl shadow-[0_0_20px_rgba(197,150,40,0.3)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Plus className="w-5 h-5 shrink-0 stroke-[3px]" /> Add New Client
          </button>
        </div>

        {/* Clients Table Box */}
        <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {/* Table Toolbar */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950/20 gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search by name, business, NTN..." 
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
                  <button onClick={() => { setStatusFilter("ALL"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "ALL" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>All Clients</button>
                  <button onClick={() => { setStatusFilter("ACTIVE"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "ACTIVE" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>Active Filers</button>
                  <button onClick={() => { setStatusFilter("INACTIVE"); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${statusFilter === "INACTIVE" ? "bg-cyan/10 text-cyan" : "text-slate-300 hover:bg-slate-800"}`}>Inactive Filers</button>
                </div>
              )}
            </div>
          </div>

          {/* Table Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-gold mb-4" />
              <p className="text-slate-400 font-bold">Querying live client directory...</p>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Users className="w-12 h-12 text-slate-650 mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">No Clients Found</h3>
              <p className="text-slate-500 text-sm">Create a new client to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-950/30 text-slate-400 text-xs uppercase tracking-wider border-b border-white/10">
                    <th className="py-4 px-6 font-medium">Client Info</th>
                    <th className="py-4 px-6 font-medium">Contact Details</th>
                    <th className="py-4 px-6 font-medium">NTN / STRN</th>
                    <th className="py-4 px-6 font-medium">CNIC</th>
                    <th className="py-4 px-6 font-medium">Filing Status</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <p className="text-white font-bold">{client.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-gold/60" /> 
                          {client.businessName || "Individual"} ({client.businessType || "N/A"})
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-sm text-slate-300 mb-1">
                          <Mail className="w-3.5 h-3.5 mr-2 text-slate-500" /> {client.email}
                        </div>
                        {client.phoneNumber && (
                          <div className="flex items-center text-xs text-slate-400">
                            <Phone className="w-3.5 h-3.5 mr-2 text-slate-500" /> {client.phoneNumber}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-mono text-slate-300">{client.ntnNumber || "N/A"}</p>
                        {client.strn && (
                          <p className="text-[10px] font-mono text-slate-500 mt-0.5">STRN: {client.strn}</p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-mono text-slate-350">{client.cnic || "N/A"}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${client.taxFilingStatus === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                          {client.taxFilingStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right relative">
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === client.id ? null : client.id)}
                          className="text-slate-400 hover:text-white transition-colors p-1 focus:outline-none"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {activeDropdown === client.id && (
                          <div className="absolute right-10 top-8 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden text-left">
                            <a href={`/admin/clients/${client.id}`} className="block w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">View Full Profile</a>
                            <button className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors" onClick={() => { setActiveDropdown(null); alert('Edit feature coming soon'); }}>Edit Details</button>
                            <button className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:bg-slate-800 hover:text-rose-300 transition-colors" onClick={() => { setActiveDropdown(null); alert('Delete feature coming soon'); }}>Delete Client</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ADD NEW CLIENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-950 border border-white/5 rounded-full text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan/10 border border-cyan/20 rounded-xl flex items-center justify-center text-cyan">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Enroll New Client Profile</h3>
                <p className="text-slate-400 text-xs">Create custom login credentials and tax info inside MongoDB.</p>
              </div>
            </div>

            <form onSubmit={handleAddClient} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="client.name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+92-300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">CNIC Number</label>
                  <input 
                    type="text" 
                    placeholder="35202-1234567-9"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">NTN Number</label>
                  <input 
                    type="text" 
                    placeholder="1234567-8"
                    value={ntn}
                    onChange={(e) => setNtn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">STRN Number</label>
                  <input 
                    type="text" 
                    placeholder="1234567890123"
                    value={strn}
                    onChange={(e) => setStrn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Business Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Hassan Trading Co."
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Business Type</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Import/Export, Retail"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] text-[#040814] font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Register Client & Generate Credentials <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
                <p className="text-slate-500 text-[10px] text-center mt-3 font-semibold">
                  Default login password will be set equal to their email username (first part before @).
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
