"use client";

import { useState } from 'react';
import { ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid identity credentials.");
      } else {
        // Fetch session to determine role-based redirection
        const sessionRes = await fetch("/api/auth/session", { cache: "no-store" });
        const session = await sessionRes.json();
        const role = session?.user?.role;

        if (role === "ADMIN" || role === "SUPER_ADMIN") {
          router.push("/admin");
        } else if (role === "LAWYER") {
          router.push("/lawyer");
        } else {
          router.push("/client/dashboard");
        }
        router.refresh();
      }
    } catch (err) {
      setError("Chamber connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-10 border border-slate-800 shadow-2xl relative z-10">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-800 text-gold">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-2">Chamber Identity</h1>
          <p className="text-sm text-slate-400">Secure entry to the Client Vault & Tracker.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="client@corporate.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-cyan transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <input 
              name="password"
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-cyan transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-cyan hover:bg-cyan/90 text-midnight font-bold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all flex justify-center items-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>Verify & Enter Chamber <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          New to the Chamber?{" "}
          <Link href="/register" className="text-gold hover:underline font-medium">
            Register for access
          </Link>
        </p>

      </div>
    </div>
  );
}

