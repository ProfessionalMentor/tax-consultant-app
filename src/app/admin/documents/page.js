"use client";

import { useState } from 'react';
import { FileText, Search, Upload, File, Eye, Download, X, Loader2 } from 'lucide-react';

export default function AdminDocumentsPage() {
  const [activeTab, setActiveTab] = useState('All Files');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  
  // Form State
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState('Property Deed');
  
  const MOCK_DOC_IMAGE = "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop"; // Legal document placeholder
  
  const [documents, setDocuments] = useState([
    { id: 1, name: "Property_Deed_Signed.pdf", client: "Ahmed Hassan", type: "Property Deed", size: "2.4 MB", date: "Jan 12, 2026" },
    { id: 2, name: "Tax_Return_2025.pdf", client: "TechLogix PK", type: "FBR Filing", size: "1.1 MB", date: "Jan 10, 2026" },
    { id: 3, name: "Court_Injunction_Order.pdf", client: "Zainab Ahmed", type: "Court Order", size: "845 KB", date: "Dec 28, 2025" },
    { id: 4, name: "CNIC_Front_Back.jpg", client: "Dr. Salman Tariq", type: "Identity", size: "3.2 MB", date: "Dec 15, 2025" },
  ]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        name: selectedFile.name,
        client: "System Upload", // Default for testing
        type: uploadType,
        size: selectedFile.size > 1024 * 1024 
          ? (selectedFile.size / 1024 / 1024).toFixed(2) + " MB" 
          : (selectedFile.size / 1024).toFixed(0) + " KB",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        localUrl: URL.createObjectURL(selectedFile)
      };

      setDocuments([newDoc, ...documents]);
      setSubmitting(false);
      setIsModalOpen(false);
      setSelectedFile(null); // Reset
      setUploadType('Property Deed');
    }, 1500);
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === 'Legal Drafts') matchesTab = doc.type.includes('Deed');
    if (activeTab === 'Client Uploads') matchesTab = doc.type.includes('Identity') || doc.type.includes('FBR');
    if (activeTab === 'Court Orders') matchesTab = doc.type.includes('Court');

    return matchesSearch && matchesTab;
  });

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> SECURE VAULT
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              <FileText className="w-8 h-8 mr-3 text-gold" /> Document Vault
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">Securely manage legal drafts, registration certificates, and client-submitted files.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] hover:to-[#f0c560] text-[#040814] font-black rounded-xl shadow-[0_0_20px_rgba(197,150,40,0.3)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Upload className="w-5 h-5" /> Upload Document
          </button>
        </div>

        <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 bg-slate-950/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              {['All Files', 'Legal Drafts', 'Client Uploads', 'Court Orders'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-white/5 text-white border border-white/10 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vault..." 
                className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-cyan outline-none w-full" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {filteredDocs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500 text-sm font-bold">No documents found matching your search.</div>
            ) : filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-slate-950/50 border border-white/5 rounded-2xl p-5 hover:border-gold/30 transition-all group hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(184,144,71,0.06)]">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 border border-white/10">
                  <File className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-white font-bold text-sm truncate mb-1" title={doc.name}>{doc.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{doc.client}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">{doc.type}</span>
                  <span className="text-[10px] text-slate-500">{doc.size}</span>
                </div>
                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setSelectedDocument(doc)} 
                    className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg flex items-center justify-center border border-white/5"
                  >
                    <Eye className="w-3 h-3 mr-1" /> View
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        let url;
                        if (doc.localUrl) {
                          url = doc.localUrl;
                        } else {
                          const response = await fetch(MOCK_DOC_IMAGE);
                          const blob = await response.blob();
                          url = URL.createObjectURL(blob);
                        }
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = doc.name;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        if (!doc.localUrl) URL.revokeObjectURL(url);
                      } catch(e) {
                        alert("Error downloading document image.");
                      }
                    }} 
                    className="flex-1 py-2 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-bold rounded-lg flex items-center justify-center"
                  >
                    <Download className="w-3 h-3 mr-1" /> Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040814]/90 backdrop-blur-xl">
          <div className="w-full max-w-lg bg-slate-900/80 border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none"></div>

            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-950 border border-white/10 rounded-full text-slate-500 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 transition-all z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-8 flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-linear-to-br from-gold/20 to-amber-600/20 border border-gold/30 rounded-2xl flex items-center justify-center text-gold shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Upload to Vault</h3>
                <p className="text-slate-400 text-sm mt-1">Securely encrypt and store a client document.</p>
              </div>
            </div>

            <form onSubmit={handleUpload} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Document File *</label>
                <label className={`block w-full border-2 border-dashed ${selectedFile ? 'border-cyan/50 bg-cyan/5' : 'border-white/10 hover:border-gold/50 bg-slate-950/50'} rounded-2xl p-8 text-center transition-all cursor-pointer group`}>
                  <input 
                    type="file" 
                    className="hidden" 
                    required 
                    accept=".pdf,.jpg,.png,.jpeg" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  {selectedFile ? (
                    <>
                      <FileText className="w-8 h-8 text-cyan mx-auto mb-3" />
                      <p className="text-sm font-bold text-cyan mb-1">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3 group-hover:text-gold transition-colors" />
                      <p className="text-sm font-bold text-white mb-1">Click to browse or drag file here</p>
                      <p className="text-xs text-slate-500">PDF, JPG, PNG up to 50MB</p>
                    </>
                  )}
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Type *</label>
                <select 
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold/50 focus:bg-slate-900 transition-all outline-none cursor-pointer"
                >
                  <option value="Property Deed">Property Deed</option>
                  <option value="Identity">Identity Document (CNIC)</option>
                  <option value="Court Order">Court Order</option>
                  <option value="FBR Filing">Tax Filing / FBR</option>
                  <option value="Legal Draft">Other Legal Draft</option>
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-linear-to-r from-gold to-amber-600 hover:from-[#f0c560] hover:to-[#d97706] text-[#040814] font-black rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Encrypt & Upload Document</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-Page Document Viewer (Lightbox) */}
      {selectedDocument && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#040814]/95 backdrop-blur-2xl">
          <button 
            onClick={() => setSelectedDocument(null)}
            className="absolute top-6 right-6 p-3 bg-slate-900 border border-white/10 rounded-full text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col items-center animate-in zoom-in duration-300">
            <div className="w-full bg-slate-900/50 border border-white/10 p-5 rounded-t-3xl flex flex-col sm:flex-row justify-between items-center gap-4 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <File className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{selectedDocument.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">Client: {selectedDocument.client} &nbsp;•&nbsp; Size: {selectedDocument.size}</p>
                </div>
              </div>
              <button 
                onClick={async () => {
                  try {
                    let url;
                    if (selectedDocument.localUrl) {
                      url = selectedDocument.localUrl;
                    } else {
                      const response = await fetch(MOCK_DOC_IMAGE);
                      const blob = await response.blob();
                      url = URL.createObjectURL(blob);
                    }
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = selectedDocument.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    if (!selectedDocument.localUrl) URL.revokeObjectURL(url);
                  } catch(e) {}
                }}
                className="px-6 py-3 bg-gold/10 hover:bg-gold/20 text-gold text-sm font-bold rounded-xl flex items-center transition-colors border border-gold/20"
              >
                <Download className="w-4 h-4 mr-2" /> Download Image
              </button>
            </div>
            <div className="w-full bg-black/50 border border-white/10 border-t-0 rounded-b-3xl overflow-hidden flex justify-center items-center p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
              <img src={selectedDocument.localUrl || MOCK_DOC_IMAGE} alt="Document Preview" className="max-h-[65vh] w-auto object-contain rounded-xl shadow-2xl ring-1 ring-white/10" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
