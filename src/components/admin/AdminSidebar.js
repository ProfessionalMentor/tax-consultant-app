"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  CreditCard, 
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ShieldAlert,
  Landmark
} from "lucide-react";

const menuItems = [
  { name: "Command Center", href: "/admin", icon: LayoutDashboard },
  { name: "Client Directory", href: "/admin/clients", icon: Users },
  { name: "Case Management", href: "/admin/cases", icon: Briefcase },
  { name: "Tax & SECP Compliance", href: "/admin/compliance", icon: Landmark },
  { name: "Notice Center", href: "/admin/notices", icon: ShieldAlert },
  { name: "Document Vault", href: "/admin/documents", icon: FileText },
  { name: "Billing & Invoices", href: "/admin/billing", icon: CreditCard },
  { name: "Communications", href: "/admin/messages", icon: MessageSquare },
  { name: "System Alerts", href: "/admin/notifications", icon: Bell },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 h-screen sticky top-0 flex flex-col pt-6 z-50">
      {/* Brand */}
      <div className="px-6 mb-8 flex items-center">
        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(197,150,40,0.3)]">
          <ShieldAlert className="w-4 h-4 text-gold" />
        </div>
        <div>
          <h2 className="text-white font-bold tracking-tight leading-tight">Admin Portal</h2>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Firm Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                isActive
                  ? "bg-gold/10 text-gold border border-gold/20 shadow-inner"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-gold" : "text-slate-500"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-gold font-bold text-xs">
                AD
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold text-white leading-tight">Super Admin</p>
                <p className="text-[10px] text-slate-500">System Override</p>
              </div>
            </div>
            <Link href="/api/auth/signout" className="text-slate-500 hover:text-gold transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
          <button className="w-full flex items-center justify-center py-2 text-xs font-bold text-slate-400 bg-slate-950 hover:bg-slate-800 hover:text-white border border-slate-800 rounded-lg transition-colors">
            <Settings className="w-3 h-3 mr-2" /> Firm Settings
          </button>
        </div>
      </div>
    </div>
  );
}
