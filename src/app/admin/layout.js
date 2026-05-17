import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Portal | Firm Management",
  description: "Secure command center for managing cases, compliance, and clients.",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0a0f1c] overflow-hidden">
      {/* Sidebar for Admin */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <main className="min-h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
