"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";
import { DesktopSidebar } from "../../components/dashboard/DesktopSidebar";
import { BottomNav } from "../../components/dashboard/BottomNav";
import { ALL_ROUTES } from "../../lib/data";
import { useAppRole } from "../../context/AppContext";

const NO_BOTTOM_NAV_PREFIXES = [
  "/upload-work",
  "/report",
  "/chats",
  "/worker/",
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAppRole();

  useEffect(() => {
    if (!loading && !user) router.replace("/signup");
  }, [loading, user, router]);

  const showBottom = !NO_BOTTOM_NAV_PREFIXES.some((p) =>
    pathname.startsWith(p),
  );
  const isChat = pathname.startsWith("/chats");
  const title =
    ALL_ROUTES.find((r) => r.href === pathname)?.label ?? "SkillConnect";

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading…
      </div>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden bg-slate-50"
      style={{ fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif" }}
    >
      <DesktopSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <p className="font-extrabold text-slate-900 text-lg">{title}</p>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Bell size={18} className="text-slate-700" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
              alt="Me"
              className="w-9 h-9 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            />
          </div>
        </div>
        <main
          className="flex-1 overflow-auto"
          style={{
            paddingBottom: showBottom ? 72 : 0,
            scrollbarWidth: "none",
            ...(isChat ? { overflow: "hidden" } : {}),
          }}
        >
          {children}
        </main>
        {showBottom && (
          <div className="lg:hidden flex-shrink-0 border-t border-slate-100">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
}
