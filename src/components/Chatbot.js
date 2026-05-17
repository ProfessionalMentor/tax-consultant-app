"use client";

import { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const localKnowledge = [
  {
    keywords: ['secp', 'company', 'registration', 'pvt ltd', 'pvt', 'single member', 'smc'],
    answer:
      'We offer SECP company registration services for Private Limited and Single Member Companies. You can read more under the Services section at /services/secp-company and start your registration process there.'
  },
  {
    keywords: ['fbr', 'tax return', 'income tax', 'filing', 'taxation', 'return'],
    answer:
      'For FBR income tax filing and compliance, visit the Taxation service page at /services/taxation. We guide clients through filer registration, return submission, and audit-ready documentation.'
  },
  {
    keywords: ['legal advisory', 'contract', 'drafting', 'agreement', 'advisory', 'legal advice'],
    answer:
      'Our Legal Advisory service covers contract drafting, corporate advisory, and document review. See the service page at /services/legal-advisory for full details and examples.'
  },
  {
    keywords: ['litigation', 'court', 'high court', 'bail', 'criminal', 'session court'],
    answer:
      'We support litigation and bail petitions across Lahore High Court, Session Courts, and police stations. Learn more on /services/litigation and get ready with the required documents.'
  },
  {
    keywords: ['contact', 'whatsapp', 'phone', 'call', 'book', 'consultation'],
    answer:
      'You can contact us directly via WhatsApp or phone at +92 322 4760050. The Contact page at /contact also has a quick booking form and a direct WhatsApp button.'
  },
  {
    keywords: ['about', 'team', 'advocate', 'accredited', 'accca', 'member'],
    answer:
      'Our team includes Advocate Ahmad Raza, Advocate Khalil ur Rehman Butt, and ACCA member Muhammad Sajawal Raza Butt. Visit the About page to learn more about their experience and specialties.'
  },
  {
    keywords: ['home', 'services', 'contact page', 'website', 'guide', 'site'],
    answer:
      'This website is built for legal and tax services in Pakistan. Browse Home, Services, About, and Contact for complete guidance on FBR returns, SECP registration, and litigation support.'
  }
];

const defaultResponse =
  'I am a website assistant for the Digital Law Chamber. Ask me about SECP registration, FBR/tax filing, legal advisory, litigation support, or how to contact our team.';

function generateLocalResponse(message) {
  const text = message.toLowerCase();

  for (const entry of localKnowledge) {
    if (entry.keywords.some((keyword) => text.includes(keyword))) {
      return entry.answer;
    }
  }

  return (
    defaultResponse +
    ' If you need direct help, ask about the service you want or say "Contact" to get our number and WhatsApp link.'
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-message',
      role: 'assistant',
      content:
        'Welcome to the Digital Law Chamber website. I am your local assistant. Ask me about our SECP, FBR, tax, or legal services and I will guide you to the right page.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: input.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const reply = generateLocalResponse(userMessage.content);

    setTimeout(() => {
      const botMessage = {
        id: `${Date.now()}-bot`,
        role: 'assistant',
        content: reply
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-4 right-4 z-9999 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-4 bg-slate-900 border border-slate-700/50 shadow-2xl rounded-2xl w-full max-w-xs sm:max-w-md md:max-w-lg h-[70vh] sm:h-125 flex flex-col overflow-hidden backdrop-blur-xl pointer-events-auto"
          >
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
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800 pointer-events-auto"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        m.role === 'user' ? 'bg-gold text-midnight' : 'bg-slate-800 border border-slate-700 text-cyan'
                      }`}
                    >
                      {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        m.role === 'user'
                          ? 'bg-gold text-midnight rounded-tr-sm'
                          : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-sm'
                      }`}
                    >
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

            <form onSubmit={handleSubmit} className="p-4 bg-midnight border-t border-slate-800">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about SECP, FBR, or Law..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 px-5 pr-12 text-sm text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 bg-cyan text-midnight rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-colors pointer-events-auto ${
          isOpen ? 'bg-slate-800 text-white border border-slate-700' : 'bg-cyan text-midnight border border-cyan/50'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
