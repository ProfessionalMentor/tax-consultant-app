import { FileText, UploadCloud, Clock, CheckCircle, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: "Client Dashboard",
  description: "Secure client portal for uploading and tracking legal documents.",
};

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-[#040814]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 text-white shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Client</h1>
            <p className="text-emerald-100">Your Filer Status: <span className="font-bold text-white bg-emerald-600 px-3 py-1 rounded-full text-sm ml-2">Active Taxpayer</span></p>
          </div>
          <ShieldAlert className="absolute right-0 top-0 w-64 h-64 text-emerald-700 opacity-20 -mr-12 -mt-12" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Action Area */}
          <div className="md:col-span-2 space-y-8 relative z-10">
            <div className="bg-[#040814]/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <UploadCloud className="mr-3 text-emerald-500" /> Upload Documents Securely
              </h2>
              <div className="border border-dashed border-white/20 rounded-2xl p-12 text-center hover:bg-slate-900/50 hover:border-gold/30 transition-colors cursor-pointer group">
                <div className="mx-auto flex justify-center text-slate-500 group-hover:text-gold mb-4 transition-colors">
                  <UploadCloud className="h-12 w-12" />
                </div>
                <p className="text-slate-600 font-medium">Click to upload or drag & drop</p>
                <p className="text-sm text-slate-400 mt-2">CNIC, Invoices, Bank Statements (PDF, JPG up to 10MB)</p>
              </div>
            </div>

            <div className="bg-[#040814]/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Clock className="mr-3 text-emerald-500" /> Recent Activity
              </h2>
              <ul className="space-y-4">
                {[
                  { title: 'Tax Return 2025 Filed', date: 'Oct 15, 2025', status: 'Completed' },
                  { title: 'CNIC Uploaded', date: 'Oct 10, 2025', status: 'Completed' },
                  { title: 'SECP Annual Return', date: 'Pending Client Signature', status: 'Pending' }
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center p-4 rounded-xl border border-white/5 hover:bg-slate-900/50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-300">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-gold/20 text-gold border border-gold/20'}`}>
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8 relative z-10">
            <div className="bg-[#040814]/80 backdrop-blur-xl rounded-3xl p-8 text-white shadow-lg border border-white/5">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <FileText className="mr-3 text-emerald-400" /> My Documents
              </h3>
              <ul className="space-y-4">
                <li><a href="#" className="flex items-center text-slate-300 hover:text-white transition-colors"><CheckCircle className="w-4 h-4 mr-2 text-emerald-400"/> NTN Certificate.pdf</a></li>
                <li><a href="#" className="flex items-center text-slate-300 hover:text-white transition-colors"><CheckCircle className="w-4 h-4 mr-2 text-emerald-400"/> FBR ATL Proof.pdf</a></li>
                <li><a href="#" className="flex items-center text-slate-300 hover:text-white transition-colors"><CheckCircle className="w-4 h-4 mr-2 text-emerald-400"/> SECP Form 29.pdf</a></li>
              </ul>
              <button className="w-full mt-8 py-3 bg-linear-to-r from-gold to-[#c59628] hover:from-[#e3b850] hover:to-gold text-[#040814] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(212,168,64,0.2)] transform hover:-translate-y-1">
                Request Missing Docs
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
