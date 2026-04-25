export const metadata = {
  title: "Create Corporate Profile | Tax Consultant",
  description: "Register a secure client account to track your tax records and company filings.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Open a Client Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <a href="/auth/login" className="font-bold text-gold hover:text-[#e3b850] transition-colors">
            Sign in here
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#040814]/80 backdrop-blur-xl py-8 px-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] sm:rounded-3xl sm:px-10 border border-white/10 relative">
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
          
          <form className="space-y-6 relative z-10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
              <input id="name" type="text" required className="mt-1 block w-full px-4 py-3 border border-white/10 rounded-xl bg-slate-900/50 text-white placeholder-slate-500 focus:ring-gold focus:border-gold transition-colors" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address (Primary Contact)</label>
              <input id="email" type="email" required className="mt-1 block w-full px-4 py-3 border border-white/10 rounded-xl bg-slate-900/50 text-white placeholder-slate-500 focus:ring-gold focus:border-gold transition-colors" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <input id="password" type="password" required className="mt-1 block w-full px-4 py-3 border border-white/10 rounded-xl bg-slate-900/50 text-white placeholder-slate-500 focus:ring-gold focus:border-gold transition-colors" />
            </div>

            <div>
              <button
                type="button"
                className="w-full justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(212,168,64,0.2)] text-lg font-bold text-[#040814] bg-linear-to-r from-gold to-[#c59628] hover:from-[#e3b850] hover:to-gold focus:outline-none transition-all transform hover:-translate-y-1"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
