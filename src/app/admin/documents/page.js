"use client";

import { FileText, Search, Upload, File, Eye, Download } from 'lucide-react';

export default function AdminDocumentsPage() {
  const documents = [
    { id: 1, name: "Property_Deed_Signed.pdf", client: "Ahmed Hassan", type: "Property Deed", size: "2.4 MB", date: "Jan 12, 2026" },
    { id: 2, name: "Tax_Return_2025.pdf", client: "TechLogix PK", type: "FBR Filing", size: "1.1 MB", date: "Jan 10, 2026" },
    { id: 3, name: "Court_Injunction_Order.pdf", client: "Zainab Ahmed", type: "Court Order", size: "845 KB", date: "Dec 28, 2025" },
    { id: 4, name: "CNIC_Front_Back.jpg", client: "Dr. Salman Tariq", type: "Identity", size: "3.2 MB", date: "Dec 15, 2025" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <FileText className="w-8 h-8 mr-3 text-gold" /> Document Vault
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Securely manage, view, and upload legal drafts, registration certificates, and client-submitted files.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-gold hover:bg-gold/90 text-midnight font-bold rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-colors flex items-center">
          <Upload className="w-4 h-4 mr-2" /> Upload Document
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <div className="flex space-x-2">
            {['All Files', 'Legal Drafts', 'Client Uploads', 'Court Orders'].map(tab => (
              <button 
                key={tab}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${tab === 'All Files' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search vault..." 
              className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-gold outline-none w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-gold/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                <File className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white font-bold text-sm truncate mb-1" title={doc.name}>{doc.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{doc.client}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold">{doc.type}</span>
                <span className="text-[10px] text-slate-500">{doc.size}</span>
              </div>
              
              <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center justify-center">
                  <Eye className="w-3 h-3 mr-1" /> View
                </button>
                <button className="flex-1 py-2 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-bold rounded-lg flex items-center justify-center">
                  <Download className="w-3 h-3 mr-1" /> Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
