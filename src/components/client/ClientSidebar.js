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
    <aside className="w-72 min-h-screen bg-white border-r p-5">
      <h2 className="text-2xl font-bold mb-8">
        Client Portal
      </h2>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}