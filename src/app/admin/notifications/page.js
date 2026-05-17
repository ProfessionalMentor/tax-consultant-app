"use client";

import { Bell, Send, CheckCircle2, Clock } from 'lucide-react';

export default function AdminNotificationsPage() {
  const sentAlerts = [
    { id: 1, title: "Hearing Date Updated", client: "Ahmed Hassan", channel: "Portal & SMS", time: "2 hours ago" },
    { id: 2, title: "FBR Return Filed", client: "TechLogix PK", channel: "Portal & Email", time: "1 day ago" },
    { id: 3, title: "Overdue Invoice Alert", client: "Zain Ali", channel: "Email", time: "3 days ago" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <Bell className="w-8 h-8 mr-3 text-amber-500" /> System Alerts & Notifications
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Broadcast urgent alerts, court date updates, and tax deadline reminders to clients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Send New Alert */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Send New Alert</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Select Client</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none">
                <option>All Active Clients (Broadcast)</option>
                <option>Ahmed Hassan (CASE-2026-001)</option>
                <option>TechLogix PK (TAX-2026-002)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Alert Title</label>
              <input type="text" placeholder="e.g. Urgent: Hearing Date Changed" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Message</label>
              <textarea rows={4} placeholder="Type your notification message here..." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-500 outline-none resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-3">Delivery Channels</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="form-checkbox text-amber-500 rounded bg-slate-950 border-slate-700" />
                  <span className="text-sm text-slate-300">Client Portal</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="form-checkbox text-amber-500 rounded bg-slate-950 border-slate-700" />
                  <span className="text-sm text-slate-300">Email</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="form-checkbox text-amber-500 rounded bg-slate-950 border-slate-700" />
                  <span className="text-sm text-slate-300">SMS / WhatsApp</span>
                </label>
              </div>
            </div>

            <button type="button" className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-midnight font-bold rounded-xl transition-colors flex justify-center items-center">
              <Send className="w-5 h-5 mr-2" /> Dispatch Notification
            </button>
          </form>
        </div>

        {/* Notification History */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Recent Dispatches</h2>
          <div className="space-y-4">
            {sentAlerts.map(alert => (
              <div key={alert.id} className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white text-sm">{alert.title}</h3>
                  <span className="text-xs text-slate-500 flex items-center"><Clock className="w-3 h-3 mr-1" /> {alert.time}</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">To: {alert.client}</p>
                <div className="flex justify-between items-center border-t border-slate-800 pt-3">
                  <span className="text-[10px] text-amber-500 font-bold uppercase">{alert.channel}</span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> Delivered</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
