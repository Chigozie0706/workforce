"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, User, Bell, LogOut } from "lucide-react";
import { Logo } from "../Logo";
import { BLUE, ALL_ROUTES } from "../../lib/data";
import { useAppRole } from "../../context/AppContext";

export function DesktopSidebar() {
  const pathname = usePathname();
  const { role } = useAppRole();
  const section = "/" + (pathname.split("/")[1] ?? "");

  const navItems = [
    { label: "Home", Icon: Home, href: "/dashboard" },
    { label: "Search", Icon: Search, href: "/search" },
    { label: "Messages", Icon: MessageCircle, href: "/chats/1" },
    {
      label: "Profile",
      Icon: User,
      href: role === "worker" ? "/worker-dashboard" : "/worker/1",
    },
    { label: "Alerts", Icon: Bell, href: "/notifications" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 border-r border-slate-100 bg-white h-screen sticky top-0 overflow-hidden">
      <div className="px-5 py-5 border-b border-slate-100">
        <Logo size="md" />
        <p className="text-xs text-slate-400 font-semibold mt-1">
          Workforce Marketplace
        </p>
      </div>

      <nav className="px-3 py-4 border-b border-slate-100">
        {navItems.map(({ label, Icon, href }) => {
          const active = section === "/" + href.split("/")[1];
          return (
            <Link
              key={label}
              href={href}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm mb-1 transition-all"
              style={
                active
                  ? { background: "#EFF6FF", color: BLUE }
                  : { color: "#64748B" }
              }
            >
              <Icon size={19} />
              {label}
              {label === "Messages" && (
                <span className="ml-auto w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        className="flex-1 overflow-y-auto px-3 py-3"
        style={{ scrollbarWidth: "none" }}
      >
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">
          Demo Screens
        </p>
        {ALL_ROUTES.map(({ label, href, emoji }) => {
          const on = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold mb-0.5 transition-all text-left"
              style={
                on ? { background: BLUE, color: "white" } : { color: "#94A3B8" }
              }
            >
              <span>{emoji}</span> {label}
            </Link>
          );
        })}
      </div>

      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
            alt="You"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">
              Sarah Mitchell
            </p>
            <p className="text-xs text-slate-400">Customer</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <LogOut size={14} className="text-slate-500" />
          </button>
        </div>
      </div>
    </aside>
  );
}
