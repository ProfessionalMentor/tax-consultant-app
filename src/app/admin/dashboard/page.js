import { Users, FileText, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: "Admin Dashboard | Tax Consultant",
  description: "Secure Admin portal to manage clients and leads.",
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center">
              <ShieldCheck className="w-8 h-8 mr-3 text-gold" /> Admin Control Center
            </h1>
            <p className="text-slate-400 mt-1">Manage all your firm&apos;s cases, leads, and documents in one place.</p>
          </div>
          <button className="px-6 py-2 bg-linear-to-r from-gold to-[#c59628] hover:from-[#e3b850] hover:to-gold text-[#040814] font-bold rounded-lg shadow-lg transform hover:-translate-y-1 transition-all">
            + Add New Client
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
          <div className="bg-black backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/5 flex items-center group hover:border-emerald-500/30 transition-colors">
            <div className="p-4 bg-emerald-500/10 rounded-xl mr-4 group-hover:bg-emerald-500/20 transition-colors"><Users className="w-8 h-8 text-emerald-400" /></div>
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide">Total Clients</p>
              <p className="text-3xl font-bold text-white">142</p>
            </div>
          </div>
          <div className="bg-black backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/5 flex items-center group hover:border-gold/30 transition-colors">
            <div className="p-4 bg-gold/10 rounded-xl mr-4 group-hover:bg-gold/20 transition-colors"><Calendar className="w-8 h-8 text-gold" /></div>
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide">Pending Appointments</p>
              <p className="text-3xl font-bold text-white">14</p>
            </div>
          </div>
          <div className="bg-black backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/5 flex items-center group hover:border-cyan/30 transition-colors">
            <div className="p-4 bg-cyan/10 rounded-xl mr-4 group-hover:bg-cyan/20 transition-colors"><FileText className="w-8 h-8 text-cyan" /></div>
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide">New Uploads</p>
              <p className="text-3xl font-bold text-white">28</p>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
          {/* Main Table */}
          <div className="lg:col-span-2 bg-black backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Recent Leads & Appointments</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-sm uppercase tracking-wider">
                    <th className="pb-4 font-semibold">Client Name</th>
                    <th className="pb-4 font-semibold">Service Needed</th>
                    <th className="pb-4 font-semibold">Status</th>
                    <th className="pb-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {['Ahmed Khan', 'Fatima Corp', 'Zain Ali', 'Aisha Traders'].map((name, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 font-bold text-slate-300">{name}</td>
                      <td className="py-4 text-slate-400">{i % 2 === 0 ? 'Filer Registration' : 'SECP Incorporation'}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold/10 text-gold border border-gold/20">Pending Review</span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-emerald-400 font-bold text-sm hover:text-white transition-colors">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full mt-6 py-4 flex items-center justify-center text-gold font-bold hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10 group">
              View All Records <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Side Panel */}
          <div className="bg-black backdrop-blur-xl rounded-3xl p-8 text-white shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
            <h3 className="text-xl font-bold mb-6 relative z-10 text-transparent bg-clip-text bg-linear-to-r from-cyan to-emerald-400">Review Documents</h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10">Clients have recently uploaded files requiring verification before submission to FBR.</p>
            
            <ul className="space-y-4 relative z-10">
              {['Bank Statement 2024.pdf', 'CNIC_Copy.jpg', 'Utility_Bill.pdf'].map((doc, i) => (
                <li key={i} className="bg-slate-900 p-4 rounded-xl flex justify-between items-center border border-white/5 hover:border-gold/30 transition-colors">
                  <span className="text-sm font-medium truncate w-3/4 text-slate-300">{doc}</span>
                  <button className="text-emerald-400 font-bold text-xs hover:text-white transition-colors">Download</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
