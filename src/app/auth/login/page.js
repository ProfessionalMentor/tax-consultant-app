export const metadata = {
  title: "Tax & Legal Dashboard Login",
  description: "Secure login for clients to access their documents and view appointment details.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Client Portal Login
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Or{' '}
          <a href="/auth/register" className="font-medium text-gold hover:text-[#e3b850] transition-colors">
            create a new corporate profile
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#040814]/80 backdrop-blur-xl py-8 px-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] sm:rounded-3xl sm:px-10 border border-white/10 relative">
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
          
          <form className="space-y-6 relative z-10">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-300">
                Email / NTN Number
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm text-white placeholder-slate-500 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-slate-900/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm text-white placeholder-slate-500 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm bg-slate-900/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gold focus:ring-gold border-white/20 rounded bg-slate-900/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300 font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-gold hover:text-[#e3b850]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(212,168,64,0.2)] text-lg font-bold text-[#040814] bg-linear-to-r from-gold to-[#c59628] hover:from-[#e3b850] hover:to-gold focus:outline-none transition-all transform hover:-translate-y-1"
              >
                Sign In
              </button>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Powered by NextAuth.js</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
