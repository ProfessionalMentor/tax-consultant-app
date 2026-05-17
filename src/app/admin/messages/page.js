"use client";

import { MessageSquare, Search, Send, User, Paperclip } from 'lucide-react';
import { useState } from 'react';

export default function AdminMessagesPage() {
  const [activeChat, setActiveChat] = useState(1);

  const clients = [
    { 
      id: 1, name: "Ahmed Hassan", case: "Property Dispute", time: "10:45 AM", unread: 2,
      history: [
        { sender: "client", text: "Salam, any update on the next hearing date?", time: "10:30 AM" },
        { sender: "client", text: "I have uploaded the new property deeds to the vault.", time: "10:45 AM" }
      ]
    },
    { 
      id: 2, name: "TechLogix PK", case: "Tax Audit", time: "Yesterday", unread: 0,
      history: [
        { sender: "admin", text: "Please ensure your SECP annual return is filed by the 30th.", time: "Mon 2:00 PM" },
        { sender: "client", text: "Understood. The accountant is preparing the drafts now.", time: "Yesterday 9:15 AM" }
      ]
    },
    { 
      id: 3, name: "Zainab Ahmed", case: "Trademark Info", time: "Mon", unread: 0,
      history: [
        { sender: "client", text: "Thank you for the detailed consultation.", time: "Mon 11:00 AM" },
        { sender: "admin", text: "You're very welcome. We will send the final PDF soon.", time: "Mon 11:15 AM" }
      ]
    },
  ];

  const selectedClient = clients.find(c => c.id === activeChat) || clients[0];

  return (
    <div className="pt-8 pb-8 px-8 h-full flex flex-col bg-[#040814] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col flex-1">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-gold text-xs font-bold mb-4 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse shadow-[0_0_10px_#b89047]"></span> ENCRYPTED CHANNEL
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-cyan" /> Secure Communications
          </h1>
          <p className="text-slate-400 mt-2">Directly message clients, legal teams, and assigned accountants.</p>
        </div>

        <div className="flex-1 bg-[#040814]/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex min-h-[500px]">
          {/* Chat List */}
          <div className="w-1/3 border-r border-white/10 bg-slate-950/20 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search clients..." className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-cyan outline-none w-full" />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {clients.map(client => (
                <div
                  key={client.id}
                  onClick={() => setActiveChat(client.id)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${activeChat === client.id ? 'bg-gold/10 border-l-4 border-l-gold' : 'hover:bg-white/5'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-white text-sm">{client.name}</h3>
                    <span className="text-xs text-slate-500">{client.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-400">{client.case}</p>
                    {client.unread > 0 && (
                      <span className="bg-gold text-[#040814] text-[10px] font-black px-2 py-0.5 rounded-full">{client.unread}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            <div className="p-4 border-b border-white/10 bg-slate-950/30 flex items-center">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mr-3 border border-white/10">
                <User className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h2 className="text-white font-bold">{selectedClient.name}</h2>
                <p className="text-xs text-slate-400">Client - {selectedClient.case}</p>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="text-center text-xs text-slate-500 mb-6">Chat History</div>
              {selectedClient.history.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-3.5 rounded-2xl ${msg.sender === 'admin' ? 'bg-gold/20 text-white rounded-tr-none border border-gold/20' : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-[10px] opacity-60 mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-slate-950/30">
              <div className="flex items-center gap-2">
                <button className="p-3 text-slate-400 hover:text-white transition-colors"><Paperclip className="w-5 h-5" /></button>
                <input type="text" placeholder="Type your reply here..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan" />
                <button className="p-3 bg-linear-to-r from-gold to-[#c59628] text-[#040814] rounded-xl transition-colors shadow-lg"><Send className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
