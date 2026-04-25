"use client";

import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function ToolsPage() {
  const [income, setIncome] = useState('');
  const [tax, setTax] = useState(null);

  // Simplified demo tax calculation logic (Current Year Slabs)
  const calculateTax = (e) => {
    e.preventDefault();
    const val = parseFloat(income.replace(/,/g, ''));
    if (isNaN(val)) return setTax(0);

    let estimatedTax = 0;
    if (val > 600000 && val <= 1200000) {
      estimatedTax = (val - 600000) * 0.05;
    } else if (val > 1200000 && val <= 2400000) {
      estimatedTax = 30000 + ((val - 1200000) * 0.15);
    } else if (val > 2400000) {
      estimatedTax = 180000 + ((val - 2400000) * 0.25);
    }
    
    setTax(estimatedTax);
  };

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 flex justify-center items-center">
            <Calculator className="mr-4 w-12 h-12 text-cyan" /> Interactive <span className="text-cyan ml-4">Tools</span>
          </h1>
          <p className="text-xl text-slate-400">
            Dynamically calculate your FBR liabilities before booking a consultation.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 rounded-full blur-[50px]"></div>

            <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Income Tax Salary Calculator (2024-25)</h2>
            <p className="text-slate-400 mb-8 border-b border-slate-800 pb-6 relative z-10">
              Enter your annual gross salary to estimate your standard non-filer base tax liability. (Actual filings allow deductions).
            </p>

            <form onSubmit={calculateTax} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-bold text-gold uppercase tracking-wider mb-2">Annual Salary (PKR)</label>
                <input 
                  type="text" 
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="e.g. 1500000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                />
              </div>

              <button type="submit" className="w-full bg-cyan hover:bg-cyan/90 text-midnight font-bold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all flex justify-center items-center">
                Calculate Projected Tax <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </form>

            {tax !== null && (
              <div className="mt-8 bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center animate-fade-in-up">
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">Estimated Annual Tax</p>
                <p className="text-4xl font-black text-white">PKR {tax.toLocaleString()}</p>
                <p className="text-xs text-gold mt-4">For Active Taxpayers (Filers), this amount can be significantly reduced through precise wealth mapping.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
