import { CheckCircle2, Circle, Scale, AlertCircle } from 'lucide-react';

export const metadata = {
  title: "Case Tracker | Digital Law Chamber",
  description: "Live tracking of High Court and Corporate proceedings.",
};

export default function TrackerPage() {
  const steps = [
    { title: 'Case Filed / Petition Drafted', date: 'Oct 01, 2025', status: 'completed' },
    { title: 'Initial Court Hearing', date: 'Oct 15, 2025', status: 'completed' },
    { title: 'Notice to Opposite Party', date: 'Nov 02, 2025', status: 'active' },
    { title: 'Evidence & Argument Stage', date: 'Pending', status: 'upcoming' },
    { title: 'Final Judgment', date: 'Pending', status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1c] pt-32 pb-12 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="bg-midnight rounded-3xl p-8 mb-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-cyan mb-4">
                CASE NO: HC-2025/4491
              </div>
              <h1 className="text-3xl font-bold mb-2">Smith vs. Imperial Tech Corp</h1>
              <p className="text-slate-400">High Court - Civil Litigation Division</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400 uppercase tracking-wide font-bold mb-1">Next Hearing</p>
              <p className="text-2xl font-black text-gold">Nov 18, 2025</p>
            </div>
          </div>
          <Scale className="absolute right-0 bottom-0 w-64 h-64 text-gold opacity-10 -mr-16 -mb-16" />
        </div>

        {/* Stepper Component */}
        <div className="bg-[#040814]/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/5">
          <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4 mb-8 flex items-center">
            <AlertCircle className="w-5 h-5 mr-3 text-gold" /> Live Case Diary
          </h2>

          <div className="relative border-l-4 border-white/10 ml-4 space-y-12 pb-4">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-8">
                {/* Step Connector Icon */}
                <div className="absolute -left-[14px] top-1 bg-[#040814]">
                  {step.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/20" />}
                  {step.status === 'active' && <div className="w-6 h-6 rounded-full bg-cyan border-4 border-[#040814] animate-pulse"></div>}
                  {step.status === 'upcoming' && <Circle className="w-6 h-6 text-slate-600" />}
                </div>

                {/* Content */}
                <div>
                  <h3 className={`text-lg font-bold ${step.status === 'upcoming' ? 'text-slate-500' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className={`mt-1 font-medium ${step.status === 'upcoming' ? 'text-slate-600' : 'text-gold'}`}>
                    {step.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
