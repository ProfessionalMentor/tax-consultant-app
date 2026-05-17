import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  CalendarDays,
  FileText,
  Wallet,
  MessageSquare,
  Bell,
  Building2,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/client/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Cases",
    href: "/client/cases",
    icon: Briefcase,
  },
  {
    name: "Hearings",
    href: "/client/hearings",
    icon: CalendarDays,
  },
  {
    name: "Tax & Compliance",
    href: "/client/tax-compliance",
    icon: Building2,
  },
  {
    name: "Documents",
    href: "/client/documents",
    icon: FileText,
  },
  {
    name: "Billing",
    href: "/client/billing",
    icon: Wallet,
  },
  {
    name: "Messages",
    href: "/client/messages",
    icon: MessageSquare,
  },
  {
    name: "Notifications",
    href: "/client/notifications",
    icon: Bell,
  },
];

export default function ClientSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-black border-r border-white/10 p-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 rounded-xl bg-black border border-gold/40 flex items-center justify-center shadow-md">
          <Building2 className="text-gold w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="font-black text-sm text-white tracking-wide block leading-none">Client Hub</span>
          <span className="text-[9px] font-bold text-cyan uppercase tracking-widest block mt-1">Digital Chamber</span>
        </div>
      </div>

      <nav className="space-y-1.5">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900/60 hover:text-gold border border-transparent hover:border-gold/20 transition-all text-xs md:text-sm font-semibold"
            >
              <Icon size={18} className="shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}