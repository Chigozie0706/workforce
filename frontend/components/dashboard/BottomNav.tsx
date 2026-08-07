"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, User } from "lucide-react";
import { BLUE } from "../../lib/data";
import { useAppRole } from "../../context/AppContext";

export function BottomNav() {
  const pathname = usePathname();
  const { role } = useAppRole();
  const section = "/" + (pathname.split("/")[1] ?? "");

  const items = [
    { label: "Home", Icon: Home, href: "/dashboard" },
    { label: "Search", Icon: Search, href: "/search" },
    { label: "Messages", Icon: MessageCircle, href: "/chats/1" },
    {
      label: "Profile",
      Icon: User,
      href: role === "worker" ? "/worker-dashboard" : "/worker/1",
    },
  ];

  return (
    <div
      className="bg-white border-t border-slate-100 flex"
      style={{ paddingBottom: 16 }}
    >
      {items.map(({ label, Icon, href }) => {
        const on = section === "/" + href.split("/")[1];
        return (
          <Link
            key={label}
            href={href}
            className="flex-1 flex flex-col items-center gap-1 pt-3 transition-all"
          >
            <div className="relative">
              <Icon size={22} style={{ color: on ? BLUE : "#94A3B8" }} />
              {label === "Messages" && (
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center">
                  1
                </span>
              )}
            </div>
            <span
              className="text-[10px] font-bold"
              style={{ color: on ? BLUE : "#94A3B8" }}
            >
              {label}
            </span>
            {on && (
              <div
                className="w-5 h-0.5 rounded-full"
                style={{ background: BLUE }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
