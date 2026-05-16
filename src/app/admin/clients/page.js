"use client";

import { Users, Search, Filter, Mail, Phone, MoreVertical } from 'lucide-react';

export default function AdminClientsPage() {
  const clients = [
    { id: 1, name: "Ahmed Hassan", company: "Hassan Trading Co.", email: "ahmed@example.com", phone: "+92-300-1234567", status: "Active", type: "Corporate" },
    { id: 2, name: "Zainab Ahmed", company: "TechLogix PK", email: "zainab@example.com", phone: "+92-300-7654321", status: "Active", type: "Corporate" },
    { id: 3, name: "Dr. Salman Tariq", company: "Private Clinic", email: "salman@example.com", phone: "+92-321-1122334", status: "Pending", type: "Individual" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-cyan" /> Client Directory
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Manage all individual and corporate clients, their contact information, and account status.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-cyan hover:bg-cyan/90 text-midnight font-bold rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-colors">
          + Add New Client
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search clients by name or company..." 
              className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-cyan outline-none w-full"
            />
          </div>
          <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <th className="py-4 px-6 font-medium">Client Info</th>
                <th className="py-4 px-6 font-medium">Contact</th>
                <th className="py-4 px-6 font-medium">Type</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6">
                    <p className="text-white font-bold">{client.name}</p>
                    <p className="text-xs text-slate-500">{client.company}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-slate-300 mb-1">
                      <Mail className="w-3 h-3 mr-2 text-slate-500" /> {client.email}
                    </div>
                    <div className="flex items-center text-xs text-slate-400">
                      <Phone className="w-3 h-3 mr-2 text-slate-500" /> {client.phone}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-300">{client.type}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors p-1">
                      <MoreVertical className="w-4 h-4" />
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
