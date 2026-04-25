"use client";

import { useState } from 'react';
import { ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate NextAuth login redirect
    window.location.href = '/dashboard/tracker';
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-10 border border-slate-800 shadow-2xl relative z-10 animate-fade-in-up">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-800 text-gold shadow-gold/20">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-2">Chamber Identity</h1>
          <p className="text-sm text-slate-400">Secure entry to the Client Vault & Tracker.</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Registered Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@corporate.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
              />
            </div>
            <button className="w-full bg-cyan hover:bg-cyan/90 text-midnight font-bold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all flex justify-between items-center group">
              Continue to 2FA <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6 animate-fade-in-up">
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 mb-6 flex items-start gap-4">
              <KeyRound className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">Authentication Required</p>
                <p className="text-xs text-slate-400 mt-1">A 6-digit secure code has been sent to {email}.</p>
              </div>
            </div>
            
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5, 6].map((digit) => (
                <input 
                  key={digit}
                  type="text" 
                  maxLength="1"
                  className="w-12 h-14 bg-slate-950 border border-slate-800 rounded-xl text-center text-white text-xl font-bold focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
              ))}
            </div>

            <button type="submit" className="w-full bg-gold hover:bg-gold/90 text-midnight font-bold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,7,0.4)] transition-all flex justify-center items-center">
              Verify & Enter Chamber
            </button>
            
            <p className="text-center text-xs text-slate-500 mt-4 hover:text-cyan transition-colors">
              Resend 2FA Code
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
