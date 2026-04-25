"use client";

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'assistant',
        content: 'Welcome to the Digital Law Chamber. I am the AI Legal Assistant. How can I help you with FBR Returns, SECP Registration, or High Court Litigation today?'
      }
    ]
  });

  return (
    <div className="fixed bottom-6 right-6 z-9999">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-4 bg-slate-900 border border-slate-700/50 shadow-2xl rounded-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-midnight p-4 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan blur-sm opacity-50 rounded-full"></div>
                  <Bot className="w-8 h-8 text-cyan relative z-10" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Chamber AI Assistant</h3>
                  <p className="text-gold text-xs font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                      m.role === 'user' ? 'bg-gold text-midnight' : 'bg-slate-800 border border-slate-700 text-cyan'
                    }`}>
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-gold text-midnight rounded-tr-sm' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-sm'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 p-4 bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-sm w-16 shadow-sm">
                    <span className="w-2 h-2 bg-cyan rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-cyan rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-cyan rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-midnight border-t border-slate-800">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about SECP, FBR, or Law..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 px-5 pr-12 text-sm text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 bg-cyan text-midnight rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                >
                  <Send className="w-4 h-4 ml-[2px]" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-colors ${
          isOpen ? 'bg-slate-800 text-white border border-slate-700' : 'bg-cyan text-midnight border border-cyan/50'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
