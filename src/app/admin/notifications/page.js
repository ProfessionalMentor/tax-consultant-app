"use client";

import { Bell, Send, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export default function AdminNotificationsPage() {
  const sentAlerts = [
    { id: 1, title: "Hearing Date Updated", client: "Ahmed Hassan", channel: "Portal & SMS", time: "2 hours ago" },
    { id: 2, title: "FBR Return Filed", client: "TechLogix PK", channel: "Portal & Email", time: "1 day ago" },
    { id: 3, title: "Overdue Invoice Alert", client: "Zain Ali", channel: "Email", time: "3 days ago" },
  ];

  return (
    <div className="pt-8 pb-24 bg-[#040814] min-h-screen text-slate-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 pb-6 border-b border-white/10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> BROADCAST CENTER
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
            <Bell className="w-8 h-8 mr-3 text-gold" /> System Alerts & Notifications
          </h1>
          <p className="text-slate-400 mt-2">Broadcast urgent alerts, court date updates, and tax deadline reminders to clients.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send New Alert */}
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-[80px] pointer-events-none"></div>
            <h2 className="text-xl font-bold text-white mb-6 relative z-10">Compose New Alert</h2>
            <form className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Client</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none cursor-pointer">
                  <option>All Active Clients (Broadcast)</option>
                  <option>Ahmed Hassan (CASE-2026-001)</option>
                  <option>TechLogix PK (TAX-2026-002)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Alert Title</label>
                <input type="text" placeholder="e.g. Urgent: Hearing Date Changed" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                <textarea rows={4} placeholder="Type your notification message here..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Delivery Channels</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="form-checkbox text-gold rounded bg-slate-950 border-slate-700" />
                    <span className="text-sm text-slate-300">Client Portal</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="form-checkbox text-gold rounded bg-slate-950 border-slate-700" />
                    <span className="text-sm text-slate-300">Email</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-gold rounded bg-slate-950 border-slate-700" />
                    <span className="text-sm text-slate-300">SMS / WhatsApp</span>
                  </label>
                </div>
              </div>

              <button type="button" className="w-full py-4 bg-linear-to-r from-gold via-[#e3b850] to-[#c59628] text-[#040814] font-black rounded-xl transition-all flex justify-center items-center shadow-[0_0_20px_rgba(197,150,40,0.3)] hover:-translate-y-0.5">
                <Send className="w-5 h-5 mr-2" /> Dispatch Notification
              </button>
            </form>
          </div>

          {/* Notification History */}
          <div className="bg-[#040814]/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Recent Dispatches</h2>
            <div className="space-y-4">
              {sentAlerts.map(alert => (
                <div key={alert.id} className="bg-slate-950/50 border border-white/5 p-5 rounded-xl hover:border-gold/20 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-sm">{alert.title}</h3>
                    <span className="text-xs text-slate-500 flex items-center"><Clock className="w-3 h-3 mr-1" /> {alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">To: {alert.client}</p>
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-[10px] text-gold font-bold uppercase">{alert.channel}</span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> Delivered</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
