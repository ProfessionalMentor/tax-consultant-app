export const metadata = {
  title: "Lawyer Command Center | Firm Management",
  description: "Secure, high-performance portal for assigned legal practitioners.",
};

export default function LawyerLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#02050e] text-slate-100 overflow-hidden font-sans antialiased">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <main className="min-h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
