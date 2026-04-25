"use client";

import { useState } from 'react';
import { Lock, FileText, UploadCloud, FileSearch, CheckCircle2 } from 'lucide-react';

export default function DocumentVaultPage() {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const mockDocuments = [
    { name: "FBR_Income_Tax_Return_2024.pdf", size: "1.2 MB", date: "Oct 12, 2025", status: "Verified" },
    { name: "NTN_Certificate_Registration.pdf", size: "450 KB", date: "Sep 01, 2025", status: "Verified" },
    { name: "HighCourt_Civil_Plaint_Draft_v2.docx", size: "2.5 MB", date: "Pending Review", status: "Awaiting Counsel" }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsUploading(true);
      setTimeout(() => setIsUploading(false), 2000); // Mock upload delay
    }
  };

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-gold text-xs font-bold mb-4 shadow-[0_0_15px_rgba(168,85,7,0.2)]">
              <Lock className="w-3 h-3 mr-2" /> 256-bit AES Encrypted
            </div>
            <h1 className="text-3xl font-extrabold text-white">The Vault</h1>
            <p className="text-slate-500 mt-2">End-to-end secure document management protocol.</p>
          </div>
          
          <div className="mt-6 md:mt-0 text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Storage Used</p>
            <p className="text-lg font-bold text-cyan">4.2 MB <span className="text-slate-600">/ 500 MB</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Dropzone */}
          <div className="lg:col-span-1">
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden
                ${dragActive ? 'border-cyan bg-cyan/5' : 'border-slate-800 bg-slate-900 hover:border-gold/50'}`}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan rounded-full animate-spin mx-auto"></div>
                  <p className="text-cyan font-bold animate-pulse">Encrypting & Uploading...</p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center mb-6 shadow-inner text-slate-400">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Drag & Drop Documents</h3>
                  <p className="text-slate-500 text-sm px-4">Securely upload CNIC, Tax Certificates, or Legal Drafts. Only you and Lead Counsel can access.</p>
                  
                  <button className="mt-8 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors border border-slate-700">
                    Browse Files
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Document List */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-midnight">
                <h3 className="text-white font-bold flex items-center">
                  <FileSearch className="w-5 h-5 mr-3 text-cyan" /> Secure Files
                </h3>
                <div className="w-64 relative hidden sm:block">
                  <input type="text" placeholder="Search Vault..." className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-4 text-xs text-slate-300 focus:outline-none focus:border-gold" />
                </div>
              </div>

              <div className="divide-y divide-slate-800/50">
                {mockDocuments.map((doc, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-slate-800/30 transition-colors group">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mr-4 shadow-inner text-gold group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-slate-200 font-bold text-sm mb-1">{doc.name}</p>
                        <div className="flex items-center text-xs text-slate-500 space-x-4">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        doc.status === 'Verified' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' : 'bg-gold/10 text-gold border border-gold/20'
                      }`}>
                        {doc.status === 'Verified' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
