"use client";

import { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, Calendar, Wallet, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// FBR Tax Slabs for Tax Year 2024-25 (Salaried Individuals)
const FILER_SLABS = [
  { min: 0, max: 600000, rate: 0, fixed: 0 },
  { min: 600001, max: 1200000, rate: 0.05, fixed: 0 },
  { min: 1200001, max: 2200000, rate: 0.15, fixed: 30000 },
  { min: 2200001, max: 3200000, rate: 0.25, fixed: 180000 },
  { min: 3200001, max: 4100000, rate: 0.30, fixed: 430000 },
  { min: 4100001, max: Infinity, rate: 0.35, fixed: 700000 },
];

const NON_FILER_SLABS = [
  { min: 0, max: 600000, rate: 0, fixed: 0 },
  { min: 600001, max: 1200000, rate: 0.10, fixed: 0 },
  { min: 1200001, max: 2200000, rate: 0.20, fixed: 60000 },
  { min: 2200001, max: 3200000, rate: 0.30, fixed: 260000 },
  { min: 3200001, max: 4100000, rate: 0.40, fixed: 560000 },
  { min: 4100001, max: Infinity, rate: 0.45, fixed: 920000 },
];

function calculateTaxFromSlabs(income, slabs) {
  if (income <= 0) return { tax: 0, slab: null, effectiveRate: 0 };

  for (const slab of slabs) {
    if (income >= slab.min && income <= slab.max) {
      const excessAmount = income - (slab.min - 1);
      const tax = slab.fixed + (excessAmount * slab.rate);
      const effectiveRate = income > 0 ? (tax / income) * 100 : 0;
      return { tax: Math.round(tax), slab, effectiveRate: effectiveRate.toFixed(1) };
    }
  }
  return { tax: 0, slab: null, effectiveRate: 0 };
}

export default function ToolsPage() {
  const [income, setIncome] = useState('');
  const [isFiler, setIsFiler] = useState(true);
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const val = parseFloat(income.replace(/,/g, ''));
    if (isNaN(val) || val < 0) return;

    const filerResult = calculateTaxFromSlabs(val, FILER_SLABS);
    const nonFilerResult = calculateTaxFromSlabs(val, NON_FILER_SLABS);
    const activeResult = isFiler ? filerResult : nonFilerResult;

    setResult({
      annualIncome: val,
      annualTax: activeResult.tax,
      monthlyIncome: Math.round(val / 12),
      monthlyTax: Math.round(activeResult.tax / 12),
      takeHomeAnnual: val - activeResult.tax,
      takeHomeMonthly: Math.round((val - activeResult.tax) / 12),
      effectiveRate: activeResult.effectiveRate,
      filerTax: filerResult.tax,
      nonFilerTax: nonFilerResult.tax,
      savings: nonFilerResult.tax - filerResult.tax,
    });
  };

  const formatPKR = (num) => {
    return new Intl.NumberFormat('en-PK').format(num);
  };

  // Recalculate when toggle changes (if result exists)
  const handleToggle = (filer) => {
    setIsFiler(filer);
    if (result) {
      const val = result.annualIncome;
      const filerResult = calculateTaxFromSlabs(val, FILER_SLABS);
      const nonFilerResult = calculateTaxFromSlabs(val, NON_FILER_SLABS);
      const activeResult = filer ? filerResult : nonFilerResult;

      setResult({
        annualIncome: val,
        annualTax: activeResult.tax,
        monthlyIncome: Math.round(val / 12),
        monthlyTax: Math.round(activeResult.tax / 12),
        takeHomeAnnual: val - activeResult.tax,
        takeHomeMonthly: Math.round((val - activeResult.tax) / 12),
        effectiveRate: activeResult.effectiveRate,
        filerTax: filerResult.tax,
        nonFilerTax: nonFilerResult.tax,
        savings: nonFilerResult.tax - filerResult.tax,
      });
    }
  };

  return (
    <div className="pt-32 pb-24 bg-midnight min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 flex justify-center items-center">
            <Calculator className="mr-4 w-12 h-12 text-cyan" /> Interactive <span className="text-cyan ml-4">Tools</span>
          </h1>
          <p className="text-xl text-slate-400">
            Dynamically calculate your FBR liabilities before booking a consultation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan/10 rounded-full blur-[60px]"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full blur-[50px]"></div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">
              Income Tax Calculator <span className="text-cyan">(2024-25)</span>
            </h2>
            <p className="text-slate-400 mb-8 border-b border-slate-800 pb-6 relative z-10">
              FBR salaried individual tax slabs. Compare Filer vs Non-Filer rates instantly.
            </p>

            {/* Filer / Non-Filer Toggle */}
            <div className="relative z-10 mb-8">
              <label className="block text-sm font-bold text-gold uppercase tracking-wider mb-3">Taxpayer Status</label>
              <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-700 w-fit">
                <button
                  type="button"
                  onClick={() => handleToggle(true)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                    isFiler
                      ? 'bg-cyan text-midnight shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ✅ Active Filer
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(false)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                    !isFiler
                      ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ❌ Non-Filer
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleCalculate} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-bold text-gold uppercase tracking-wider mb-2">Annual Salary (PKR)</label>
                <input 
                  type="text" 
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="e.g. 2,400,000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
                />
              </div>

              <button type="submit" className="w-full bg-cyan hover:bg-cyan/90 text-midnight font-bold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all flex justify-center items-center hover:-translate-y-0.5">
                Calculate Projected Tax <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </form>

            {/* Results Section */}
            <AnimatePresence>
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="mt-10 space-y-6 relative z-10"
                >
                  {/* Main Tax Result */}
                  <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-center">
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">
                      Estimated Annual Tax ({isFiler ? 'Filer' : 'Non-Filer'})
                    </p>
                    <p className="text-4xl md:text-5xl font-black text-white">
                      PKR {formatPKR(result.annualTax)}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      Effective Tax Rate: <span className={`font-bold ${isFiler ? 'text-cyan' : 'text-red-400'}`}>{result.effectiveRate}%</span>
                    </p>
                  </div>

                  {/* Breakdown Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-cyan" />
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Monthly Tax</p>
                      </div>
                      <p className="text-2xl font-black text-white">PKR {formatPKR(result.monthlyTax)}</p>
                      <p className="text-xs text-slate-500 mt-1">per month deduction</p>
                    </div>

                    <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800">
                      <div className="flex items-center gap-2 mb-3">
                        <Wallet className="w-5 h-5 text-emerald-400" />
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Monthly Take-Home</p>
                      </div>
                      <p className="text-2xl font-black text-emerald-400">PKR {formatPKR(result.takeHomeMonthly)}</p>
                      <p className="text-xs text-slate-500 mt-1">after tax salary</p>
                    </div>

                    <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-gold" />
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Annual Take-Home</p>
                      </div>
                      <p className="text-2xl font-black text-gold">PKR {formatPKR(result.takeHomeAnnual)}</p>
                      <p className="text-xs text-slate-500 mt-1">total after tax</p>
                    </div>
                  </div>

                  {/* Filer vs Non-Filer Comparison */}
                  <div className="bg-gradient-to-r from-cyan/5 to-gold/5 rounded-2xl p-6 border border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-gold" />
                      <p className="text-sm text-white font-bold uppercase tracking-wider">Filer vs Non-Filer Comparison</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Filer Tax</p>
                        <p className="text-xl font-bold text-cyan">PKR {formatPKR(result.filerTax)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Non-Filer Tax</p>
                        <p className="text-xl font-bold text-red-400">PKR {formatPKR(result.nonFilerTax)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">You Save as Filer</p>
                        <p className="text-xl font-bold text-emerald-400">PKR {formatPKR(result.savings)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gold mt-4 border-t border-slate-800 pt-3">
                      💡 Becoming an Active Taxpayer (Filer) saves you <span className="font-bold">PKR {formatPKR(result.savings)}</span> annually. Contact us to get registered today!
                    </p>
                  </div>

                  {/* Tax Slabs Reference Table */}
                  <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800">
                    <p className="text-sm text-white font-bold uppercase tracking-wider mb-4">
                      FBR Tax Slabs — {isFiler ? 'Active Filer' : 'Non-Filer'} (2024-25)
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="text-left py-2 text-slate-400 font-medium">Income Range (PKR)</th>
                            <th className="text-left py-2 text-slate-400 font-medium">Rate</th>
                            <th className="text-left py-2 text-slate-400 font-medium">Fixed Tax</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(isFiler ? FILER_SLABS : NON_FILER_SLABS).map((slab, i) => {
                            const isActive = result.annualIncome >= slab.min && result.annualIncome <= slab.max;
                            return (
                              <tr key={i} className={`border-b border-slate-800 ${isActive ? 'bg-cyan/10' : ''}`}>
                                <td className={`py-3 ${isActive ? 'text-cyan font-bold' : 'text-slate-300'}`}>
                                  {formatPKR(slab.min)} — {slab.max === Infinity ? 'Above' : formatPKR(slab.max)}
                                  {isActive && <span className="ml-2 text-xs">← Your slab</span>}
                                </td>
                                <td className={`py-3 ${isActive ? 'text-cyan font-bold' : 'text-slate-300'}`}>
                                  {(slab.rate * 100)}%
                                </td>
                                <td className={`py-3 ${isActive ? 'text-cyan font-bold' : 'text-slate-300'}`}>
                                  {slab.fixed > 0 ? `PKR ${formatPKR(slab.fixed)}` : '—'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <p className="text-xs text-gold">
                      📋 This is an estimate based on standard FBR slabs. Actual tax may differ based on deductions, allowances, and wealth statements. Book a consultation for precise filing.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
