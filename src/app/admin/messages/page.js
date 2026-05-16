"use client";

import { MessageSquare, Search, Send, User, Paperclip } from 'lucide-react';
import { useState } from 'react';

export default function AdminMessagesPage() {
  const [activeChat, setActiveChat] = useState(1);

  const clients = [
    { id: 1, name: "Ahmed Hassan", case: "Property Dispute", time: "10:45 AM", unread: 2 },
    { id: 2, name: "TechLogix PK", case: "Tax Audit", time: "Yesterday", unread: 0 },
    { id: 3, name: "Zainab Ahmed", case: "Trademark Info", time: "Mon", unread: 0 },
  ];

  const chatHistory = [
    { sender: "client", text: "Salam, any update on the next hearing date?", time: "10:30 AM" },
    { sender: "client", text: "I have uploaded the new property deeds to the vault.", time: "10:45 AM" }
  ];

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-indigo-400" /> Secure Communications
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Directly message clients, legal teams, and assigned accountants.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex min-h-[600px]">
        {/* Chat List (Sidebar) */}
        <div className="w-1/3 border-r border-slate-800 bg-slate-950/50 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-indigo-400 outline-none w-full"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {clients.map(client => (
              <div 
                key={client.id}
                onClick={() => setActiveChat(client.id)}
                className={`p-4 border-b border-slate-800/50 cursor-pointer transition-colors ${activeChat === client.id ? 'bg-indigo-500/10 border-l-4 border-l-indigo-500' : 'hover:bg-slate-800/30'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-white text-sm">{client.name}</h3>
                  <span className="text-xs text-slate-500">{client.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-400">{client.case}</p>
                  {client.unread > 0 && (
                    <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{client.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat Area */}
        <div className="w-2/3 flex flex-col bg-slate-900">
          <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-white font-bold">Ahmed Hassan</h2>
                <p className="text-xs text-slate-400">Client - CASE-2026-001</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="text-center text-xs text-slate-500 mb-6">Today</div>
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'admin' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-[10px] opacity-60 mt-1 text-right">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2">
              <button className="p-3 text-slate-400 hover:text-white transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                placeholder="Type your reply here..." 
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-400"
              />
              <button className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors shadow-lg">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
