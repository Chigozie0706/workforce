"use client";

import { useState } from "react";
import {
  Search, Home, MessageCircle, User, Star, MapPin, Bell,
  Camera, ArrowLeft, Wrench, Zap, Paintbrush, Droplets,
  Wind, Plus, Send, Shield, Clock, Check, Upload,
  AlertTriangle, TrendingUp, Briefcase, MoreVertical,
  Phone, Image as ImageIcon, Hammer, Settings, Filter,
  Heart, ChevronRight, Award, Sparkles, X, Menu,
  LogOut, ChevronDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "splash" | "onboarding" | "auth" | "home"
  | "search" | "worker-profile" | "worker-dashboard"
  | "upload-work" | "report" | "notifications" | "chat";

type UserRole = "customer" | "worker" | null;

interface Review {
  author: string; avatar: string; rating: number; text: string; date: string;
}
interface Worker {
  id: number; name: string; skill: string; category: string;
  rating: number; reviews: number; distance: string; price: string;
  avatar: string; coverImg: string; verified: boolean; jobs: number;
  bio: string; portfolio: string[]; reviewsList: Review[]; tags: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BLUE  = "#1558B0";
const GREEN = "#16A34A";

const WORKERS: Worker[] = [
  {
    id: 1, name: "Marcus Johnson", skill: "Master Plumber", category: "Plumbing",
    rating: 4.9, reviews: 127, distance: "0.8 km", price: "$45/hr",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 243,
    bio: "15 years of experience in residential and commercial plumbing. Specializing in leak repair, pipe installation, and full bathroom fitting.",
    portfolio: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop&auto=format",
    ],
    reviewsList: [
      { author: "Sarah M.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", rating: 5, text: "Fixed our burst pipe in under an hour. Very professional and left the area spotless.", date: "Dec 2024" },
      { author: "Tom K.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", rating: 5, text: "Solved a problem 3 other plumbers couldn't fix. Highly recommend!", date: "Nov 2024" },
      { author: "Rita O.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", rating: 4, text: "Great job overall. Slightly pricey but 100% worth the quality.", date: "Oct 2024" },
    ],
    tags: ["Leak Repair", "Pipe Install", "Bathroom Fitting"],
  },
  {
    id: 2, name: "David Osei", skill: "Electrician", category: "Electrical",
    rating: 4.8, reviews: 89, distance: "1.2 km", price: "$55/hr",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 178,
    bio: "Certified electrician with deep expertise in wiring, panel upgrades, and smart home installations. Fully licensed and insured.",
    portfolio: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558980394-dbb977039a2e?w=600&h=400&fit=crop&auto=format",
    ],
    reviewsList: [
      { author: "James P.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", rating: 5, text: "Installed our entire home automation system flawlessly.", date: "Dec 2024" },
      { author: "Angela R.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop", rating: 5, text: "David is incredibly knowledgeable and efficient.", date: "Nov 2024" },
    ],
    tags: ["Wiring", "Smart Home", "Panel Upgrade"],
  },
  {
    id: 3, name: "James Adeola", skill: "Carpenter", category: "Carpentry",
    rating: 4.7, reviews: 64, distance: "2.1 km", price: "$40/hr",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=500&fit=crop&auto=format",
    verified: false, jobs: 95,
    bio: "Custom furniture maker and general carpenter. Specializing in kitchen cabinets, fitted wardrobes, and solid wood flooring.",
    portfolio: [
      "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&auto=format",
    ],
    reviewsList: [
      { author: "Mike T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", rating: 5, text: "Built the most beautiful custom wardrobes. Great craftsmanship!", date: "Dec 2024" },
    ],
    tags: ["Cabinets", "Wardrobes", "Flooring"],
  },
  {
    id: 4, name: "Emmanuel Kalu", skill: "Painter", category: "Painting",
    rating: 4.6, reviews: 52, distance: "0.5 km", price: "$35/hr",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 112,
    bio: "Professional interior and exterior painter. Expert in decorative finishes, textured walls, and wallpaper installation.",
    portfolio: ["https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop&auto=format"],
    reviewsList: [
      { author: "Sandra B.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", rating: 5, text: "Completely transformed our living room. Very tidy and professional!", date: "Jan 2025" },
    ],
    tags: ["Interior", "Exterior", "Texture"],
  },
  {
    id: 5, name: "Grace Mensah", skill: "House Cleaner", category: "Cleaning",
    rating: 4.9, reviews: 203, distance: "0.3 km", price: "$30/hr",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 389,
    bio: "Professional deep cleaning and regular home maintenance. Eco-friendly products available on request.",
    portfolio: [],
    reviewsList: [
      { author: "Frank O.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop", rating: 5, text: "Grace is incredible. House looks brand new every visit!", date: "Jan 2025" },
    ],
    tags: ["Deep Clean", "Regular Upkeep", "Eco-friendly"],
  },
  {
    id: 6, name: "Yemi Adeyemi", skill: "AC Technician", category: "Electrical",
    rating: 4.7, reviews: 41, distance: "1.8 km", price: "$50/hr",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 67,
    bio: "Certified HVAC technician. Specializing in AC installation, servicing, gas refilling, and fault diagnostics.",
    portfolio: [],
    reviewsList: [
      { author: "Bola T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", rating: 5, text: "Fixed our AC in 45 minutes flat. Very efficient!", date: "Jan 2025" },
    ],
    tags: ["AC Install", "Servicing", "Gas Refill"],
  },
];

const CATEGORIES = [
  { name: "Plumbing",   color: "#2563EB", bg: "#EFF6FF", cat: "Plumbing" },
  { name: "Electrical", color: "#D97706", bg: "#FFFBEB", cat: "Electrical" },
  { name: "Carpentry",  color: "#7C3AED", bg: "#F5F3FF", cat: "Carpentry" },
  { name: "Painting",   color: "#DB2777", bg: "#FDF2F8", cat: "Painting" },
  { name: "Cleaning",   color: "#059669", bg: "#ECFDF5", cat: "Cleaning" },
  { name: "Tiling",     color: "#0891B2", bg: "#ECFEFF", cat: "Tiling" },
  { name: "Roofing",    color: "#DC2626", bg: "#FEF2F2", cat: "Roofing" },
  { name: "More",       color: "#6B7280", bg: "#F9FAFB", cat: "" },
];

const NOTIFICATIONS = [
  { id: 1, type: "request", title: "Job Accepted!", body: "Marcus Johnson accepted your plumbing request", time: "2m ago", read: false, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
  { id: 2, type: "message", title: "New Message", body: 'David: "I can be there by 3pm today ✓"', time: "15m ago", read: false, avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop" },
  { id: 3, type: "rating", title: "New 5-Star Review", body: "Tom K. gave you a ⭐⭐⭐⭐⭐ review!", time: "1h ago", read: true, avatarUrl: null },
  { id: 4, type: "report", title: "Report Reviewed", body: "Your complaint #402 has been resolved", time: "3h ago", read: true, avatarUrl: null },
  { id: 5, type: "payment", title: "Payment Processed", body: "$180 transferred to your wallet", time: "Yesterday", read: true, avatarUrl: null },
  { id: 6, type: "request", title: "New Job Request", body: "Sarah M. wants to hire you for pipe repair", time: "Yesterday", read: true, avatarUrl: null },
];

const CHAT_MESSAGES = [
  { id: 1, sender: "worker" as const, text: "Hello! I saw your request for plumbing repair. Ready to help!", time: "10:20 AM" },
  { id: 2, sender: "customer" as const, text: "Great! How soon can you come?", time: "10:22 AM" },
  { id: 3, sender: "worker" as const, text: "Available today at 3 PM or tomorrow from 9 AM. Which works?", time: "10:23 AM" },
  { id: 4, sender: "customer" as const, text: "Today at 3 PM is perfect! 🙌", time: "10:25 AM" },
  { id: 5, sender: "worker" as const, text: "Perfect. Bringing all tools. Estimate $120–150 depending on parts.", time: "10:26 AM" },
  { id: 6, sender: "customer" as const, text: "Sounds fair. See you at 3!", time: "10:28 AM" },
];

const ALL_SCREENS: { label: string; s: Screen; emoji: string }[] = [
  { label: "Landing Page",     s: "splash",           emoji: "🚀" },
  { label: "Onboarding",       s: "onboarding",       emoji: "📖" },
  { label: "Sign Up / Login",  s: "auth",             emoji: "🔐" },
  { label: "Customer Home",    s: "home",             emoji: "🏠" },
  { label: "Search Results",   s: "search",           emoji: "🔍" },
  { label: "Worker Profile",   s: "worker-profile",   emoji: "👷" },
  { label: "Worker Dashboard", s: "worker-dashboard", emoji: "📊" },
  { label: "Upload Work",      s: "upload-work",      emoji: "📤" },
  { label: "Job Report",       s: "report",           emoji: "⚠️" },
  { label: "Notifications",    s: "notifications",    emoji: "🔔" },
  { label: "Messages",         s: "chat",             emoji: "💬" },
];

// ─── Shared Atoms ─────────────────────────────────────────────────────────────

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
      ))}
    </span>
  );
}

function VerifiedBadge({ size = 10 }: { size?: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-blue-500"
      style={{ width: size * 2, height: size * 2 }}>
      <Check size={size} className="text-white" strokeWidth={3} />
    </span>
  );
}

function CatIcon({ name }: { name: string }) {
  const p = { size: 22 };
  switch (name) {
    case "Plumbing":   return <Droplets   {...p} />;
    case "Electrical": return <Zap        {...p} />;
    case "Carpentry":  return <Hammer     {...p} />;
    case "Painting":   return <Paintbrush {...p} />;
    case "Cleaning":   return <Wind       {...p} />;
    case "Tiling":     return <Wrench     {...p} />;
    case "Roofing":    return <Shield     {...p} />;
    default:           return <Plus       {...p} />;
  }
}

function WorkerCard({ w, onClick, horizontal = false }: { w: Worker; onClick: () => void; horizontal?: boolean }) {
  if (horizontal) {
    return (
      <button onClick={onClick}
        className="w-full bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 text-left shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:scale-95">
        <div className="relative flex-shrink-0">
          <img src={w.avatar} alt={w.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover" />
          {w.verified && (
            <div className="absolute -bottom-1 -right-1 border-2 border-white rounded-full">
              <VerifiedBadge size={8} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-extrabold text-sm sm:text-base text-slate-900 truncate">{w.name}</p>
              <p className="text-xs sm:text-sm text-slate-500">{w.skill}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-extrabold" style={{ color: BLUE }}>{w.price}</p>
              <p className="text-xs text-slate-400">{w.distance}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <Stars rating={w.rating} size={12} />
            <span className="text-xs font-bold text-slate-800">{w.rating}</span>
            <span className="text-xs text-slate-400">({w.reviews}) · {w.jobs} jobs</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {w.tags.slice(0, 2).map(t => (
              <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#EFF6FF", color: BLUE }}>{t}</span>
            ))}
          </div>
        </div>
        <ChevronRight size={16} className="text-slate-300 self-center flex-shrink-0" />
      </button>
    );
  }

  return (
    <button onClick={onClick}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden text-left shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95">
      <div className="relative h-40 sm:h-48 bg-slate-100 overflow-hidden">
        <img src={w.avatar} alt={w.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 60%)" }} />
        {w.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(22,163,74,0.9)" }}>
            <Check size={9} className="text-white" strokeWidth={3} />
            <span className="text-white text-[10px] font-bold">Verified</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">{w.distance}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="font-extrabold text-slate-900 mb-0.5">{w.name}</p>
        <p className="text-sm text-slate-500 mb-2">{w.skill}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-slate-800">{w.rating}</span>
            <span className="text-xs text-slate-400">({w.reviews})</span>
          </div>
          <span className="font-extrabold text-sm" style={{ color: BLUE }}>{w.price}</span>
        </div>
      </div>
    </button>
  );
}

function NotifBadge({ type }: { type: string }) {
  switch (type) {
    case "message": return <MessageCircle size={13} className="text-blue-500" />;
    case "rating":  return <Star          size={13} className="text-amber-500" />;
    case "report":  return <AlertTriangle size={13} className="text-red-500" />;
    case "payment": return <TrendingUp    size={13} className="text-emerald-500" />;
    default:        return <Briefcase     size={13} style={{ color: BLUE }} />;
  }
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────

function DesktopSidebar({
  screen, navigate, role,
}: { screen: Screen; navigate: (s: Screen) => void; role: UserRole }) {
  const navItems = [
    { id: "home",     label: "Home",     Icon: Home,          target: "home"           as Screen },
    { id: "search",   label: "Search",   Icon: Search,        target: "search"         as Screen },
    { id: "messages", label: "Messages", Icon: MessageCircle, target: "chat"           as Screen },
    { id: "profile",  label: "Profile",  Icon: User,          target: role === "worker" ? "worker-dashboard" as Screen : "worker-profile" as Screen },
    { id: "notifs",   label: "Alerts",   Icon: Bell,          target: "notifications"  as Screen },
  ];

  const activeMap: Partial<Record<Screen, string>> = {
    home: "home", search: "search", chat: "messages",
    notifications: "notifs", "worker-profile": "profile", "worker-dashboard": "profile",
  };
  const activeId = activeMap[screen] ?? "";

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 border-r border-slate-100 bg-white h-screen sticky top-0 overflow-hidden">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: BLUE }}>
            <Wrench size={20} className="text-white" />
          </div>
          <div>
            <p className="font-extrabold text-lg text-slate-900 leading-none">SkillConnect</p>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">Workforce Marketplace</p>
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="px-3 py-4 border-b border-slate-100">
        {navItems.map(({ id, label, Icon, target }) => {
          const active = id === activeId;
          return (
            <button key={id} onClick={() => navigate(target)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm mb-1 transition-all"
              style={active
                ? { background: "#EFF6FF", color: BLUE }
                : { color: "#64748B" }}>
              <Icon size={19} />
              {label}
              {id === "messages" && (
                <span className="ml-auto w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">1</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Demo screen switcher */}
      <div className="flex-1 overflow-y-auto px-3 py-3" style={{ scrollbarWidth: "none" }}>
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">Demo Screens</p>
        {ALL_SCREENS.map(({ label, s, emoji }) => {
          const on = screen === s;
          return (
            <button key={s} onClick={() => navigate(s)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold mb-0.5 transition-all text-left"
              style={on ? { background: BLUE, color: "white" } : { color: "#94A3B8" }}>
              <span>{emoji}</span> {label}
            </button>
          );
        })}
      </div>

      {/* User profile */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
            alt="You" className="w-9 h-9 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Sarah Mitchell</p>
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

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────

function BottomNav({ screen, navigate, role }: { screen: Screen; navigate: (s: Screen) => void; role: UserRole }) {
  const items = [
    { id: "home",     label: "Home",     Icon: Home,          target: "home"           as Screen },
    { id: "search",   label: "Search",   Icon: Search,        target: "search"         as Screen },
    { id: "messages", label: "Messages", Icon: MessageCircle, target: "chat"           as Screen },
    { id: "profile",  label: "Profile",  Icon: User,          target: role === "worker" ? "worker-dashboard" as Screen : "worker-profile" as Screen },
  ];
  const activeMap: Partial<Record<Screen, string>> = {
    home: "home", search: "search", chat: "messages",
    notifications: "home", "worker-profile": "profile", "worker-dashboard": "profile",
  };
  const active = activeMap[screen] ?? "";

  return (
    <div className="bg-white border-t border-slate-100 flex safe-area-inset" style={{ paddingBottom: 16 }}>
      {items.map(({ id, label, Icon, target }) => {
        const on = id === active;
        return (
          <button key={id} onClick={() => navigate(target)}
            className="flex-1 flex flex-col items-center gap-1 pt-3 transition-all">
            <div className="relative">
              <Icon size={22} style={{ color: on ? BLUE : "#94A3B8" }} />
              {id === "messages" && (
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center">1</span>
              )}
            </div>
            <span className="text-[10px] font-bold" style={{ color: on ? BLUE : "#94A3B8" }}>{label}</span>
            {on && <div className="w-5 h-0.5 rounded-full" style={{ background: BLUE }} />}
          </button>
        );
      })}
    </div>
  );
}

// ─── Top App Bar (mobile only, for inner screens) ─────────────────────────────

function TopBar({
  title, onBack, rightEl, navigate,
}: { title?: string; onBack?: () => void; rightEl?: JSX.Element; navigate: (s: Screen) => void }) {
  return (
    <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center gap-3 px-4 py-3">
      {onBack && (
        <button onClick={onBack} className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
          <ArrowLeft size={17} className="text-slate-700" />
        </button>
      )}
      {title && <h1 className="font-extrabold text-lg text-slate-900 flex-1">{title}</h1>}
      {rightEl}
    </div>
  );
}

// ─── Splash / Landing ─────────────────────────────────────────────────────────

function SplashScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 lg:px-16 lg:py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: BLUE }}>
            <Wrench size={18} className="text-white" />
          </div>
          <span className="font-extrabold text-lg text-white">SkillConnect</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("auth")}
            className="hidden sm:block text-sm font-bold text-white/80 hover:text-white transition-colors px-4 py-2">
            Log in
          </button>
          <button onClick={() => navigate("auth")}
            className="text-sm font-bold px-4 py-2.5 rounded-xl text-white transition-all"
            style={{ background: GREEN }}>
            Sign up free
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex items-center"
        style={{ background: "linear-gradient(145deg, #1B6FD4 0%, #1558B0 50%, #0C3470 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <Shield size={14} className="text-emerald-300" />
                <span className="text-white/80 text-sm font-semibold">500+ verified workers · Trusted by 12k customers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Find Trusted Skilled Workers{" "}
                <span className="text-emerald-400">Near You</span>
              </h1>
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
                Hire verified plumbers, electricians, carpenters, painters, and more. Quality work, guaranteed.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate("onboarding")}
                  className="px-7 py-4 font-extrabold text-base rounded-2xl text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                  style={{ background: GREEN, boxShadow: `0 8px 28px rgba(22,163,74,0.45)` }}>
                  Get Started Free →
                </button>
                <button onClick={() => navigate("auth")}
                  className="px-7 py-4 font-bold text-base rounded-2xl text-white border-2 transition-all hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.35)" }}>
                  Log In
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12">
                {[
                  { v: "12k+", l: "Happy Customers" },
                  { v: "500+", l: "Verified Workers" },
                  { v: "4.9★", l: "Average Rating" },
                ].map(({ v, l }) => (
                  <div key={l}>
                    <p className="text-2xl font-extrabold text-white">{v}</p>
                    <p className="text-white/55 text-sm">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Worker showcase */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {WORKERS.slice(0, 4).map((w, i) => (
                  <div key={w.id}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/15 transition-all hover:bg-white/15"
                    style={{ transform: i % 2 === 1 ? "translateY(16px)" : "none" }}>
                    <img src={w.avatar} alt={w.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="text-white font-bold text-sm truncate">{w.name}</p>
                      <p className="text-white/60 text-xs">{w.skill}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Star size={11} className="fill-amber-400 text-amber-400" />
                          <span className="text-white text-xs font-bold">{w.rating}</span>
                        </div>
                        <span className="text-white text-xs font-extrabold">{w.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories strip */}
      <div className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-center text-2xl lg:text-3xl font-extrabold text-slate-900 mb-10">Browse by Category</h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => navigate("search")}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: cat.bg, color: cat.color }}>
                  <CatIcon name={cat.name} />
                </div>
                <span className="text-xs font-bold text-slate-700">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-12 lg:py-20" style={{ background: "#F8FAFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-center text-2xl lg:text-3xl font-extrabold text-slate-900 mb-12">How it Works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { n: "1", title: "Search & Browse", desc: "Find verified workers by category, location, or name.", color: BLUE },
              { n: "2", title: "Review Portfolios", desc: "See real before-and-after photos of completed work.", color: "#7C3AED" },
              { n: "3", title: "Hire in 3 Taps", desc: "Message, agree on a price, and confirm the job instantly.", color: GREEN },
            ].map(s => (
              <div key={s.n} className="text-center">
                <div className="w-14 h-14 rounded-full font-extrabold text-xl text-white flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ background: s.color }}>
                  {s.n}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div className="py-16 text-center" style={{ background: BLUE }}>
        <h2 className="text-3xl font-extrabold text-white mb-4">Ready to get started?</h2>
        <p className="text-white/70 mb-8">Join thousands who already trust SkillConnect.</p>
        <button onClick={() => navigate("auth")}
          className="px-8 py-4 font-extrabold text-base rounded-2xl text-white transition-all hover:scale-105"
          style={{ background: GREEN, boxShadow: `0 8px 24px rgba(22,163,74,0.5)` }}>
          Find a Worker Now
        </button>
      </div>
    </div>
  );
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

const SLIDES = [
  { title: "Find skilled workers near you instantly", subtitle: "Browse hundreds of verified artisans in your area. Just one tap away.", Icon: MapPin, color: "#2563EB", bg: "#EFF6FF", accent: "#DBEAFE" },
  { title: "See real portfolio work before hiring", subtitle: "Browse before-and-after photos from completed jobs. No surprises.", Icon: ImageIcon, color: "#7C3AED", bg: "#F5F3FF", accent: "#EDE9FE" },
  { title: "Rate and report for full accountability", subtitle: "Your reviews build trust and keep quality high for everyone.", Icon: Shield, color: GREEN, bg: "#ECFDF5", accent: "#D1FAE5" },
];

function OnboardingScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [slide, setSlide] = useState(0);
  const cur = SLIDES[slide];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: cur.bg, transition: "background 0.4s" }}>
      <div className="w-full max-w-lg">
        <div className="flex justify-end mb-8">
          <button onClick={() => navigate("auth")}
            className="text-sm font-bold px-4 py-2 rounded-full bg-white/80 shadow-sm text-slate-500">
            Skip
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex justify-center mb-8">
            <div className="w-44 h-44 rounded-full flex items-center justify-center" style={{ background: cur.accent }}>
              <div className="w-32 h-32 rounded-full flex items-center justify-center bg-white shadow-lg">
                <cur.Icon size={56} strokeWidth={1.4} style={{ color: cur.color }} />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">{cur.title}</h2>
            <p className="text-slate-500 leading-relaxed">{cur.subtitle}</p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === slide ? 32 : 8, height: 8, background: i === slide ? cur.color : "#CBD5E1" }} />
            ))}
          </div>

          <div className="flex gap-3">
            {slide > 0 && (
              <button onClick={() => setSlide(slide - 1)}
                className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 transition-all"
                style={{ borderColor: cur.color }}>
                <ArrowLeft size={20} style={{ color: cur.color }} />
              </button>
            )}
            <button
              onClick={() => { if (slide < SLIDES.length - 1) setSlide(slide + 1); else navigate("auth"); }}
              className="flex-1 h-14 font-extrabold text-base rounded-2xl text-white transition-all hover:opacity-90 active:scale-95 shadow-lg"
              style={{ background: cur.color }}>
              {slide === SLIDES.length - 1 ? "Get Started →" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

function AuthScreen({ navigate, setRole }: { navigate: (s: Screen) => void; setRole: (r: UserRole) => void }) {
  const [tab, setTab] = useState<"login" | "signup">("signup");
  const [role, setLocalRole] = useState<UserRole>("customer");

  const go = () => { setRole(role); navigate(role === "worker" ? "worker-dashboard" : "home"); };

  return (
    <div className="min-h-screen flex"
      style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFF 60%, #F0FDF4 100%)" }}>
      {/* Left panel (desktop) */}
      <div className="hidden lg:flex flex-col justify-center px-16 py-12 w-5/12"
        style={{ background: "linear-gradient(145deg, #1B6FD4, #1558B0)" }}>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Wrench size={22} className="text-white" />
          </div>
          <span className="font-extrabold text-2xl text-white">SkillConnect</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
          Connect with trusted skilled workers
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-10">
          500+ verified artisans available in your area. Hire plumbers, electricians, carpenters, and more.
        </p>
        <div className="space-y-4">
          {["✅  Verified & background-checked workers", "📸  Real portfolio photos before you hire", "⭐  Transparent ratings and reviews", "💬  Direct messaging & instant booking"].map(f => (
            <p key={f} className="text-white/80 font-semibold">{f}</p>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: BLUE }}>
              <Wrench size={18} className="text-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-900">SkillConnect</span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Welcome!</h1>
          <p className="text-slate-500 mb-7">Join thousands of satisfied customers and workers</p>

          {/* Tab */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-6">
            {(["signup", "login"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: tab === t ? BLUE : "transparent", color: tab === t ? "white" : "#94A3B8" }}>
                {t === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Role */}
          <p className="text-sm font-extrabold text-slate-800 mb-3">I am a...</p>
          <div className="flex gap-3 mb-6">
            {(["customer", "worker"] as const).map(r => (
              <button key={r} onClick={() => setLocalRole(r)}
                className="flex-1 py-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all"
                style={{ borderColor: role === r ? BLUE : "#E2E8F0", background: role === r ? "#EFF6FF" : "white" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: role === r ? "#DBEAFE" : "#F1F5F9" }}>
                  {r === "customer" ? <User size={24} style={{ color: role === r ? BLUE : "#94A3B8" }} /> : <Hammer size={24} style={{ color: role === r ? BLUE : "#94A3B8" }} />}
                </div>
                <span className="text-sm font-extrabold" style={{ color: role === r ? BLUE : "#94A3B8" }}>
                  {r === "customer" ? "Customer" : "Worker"}
                </span>
                {role === r && <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: BLUE }}><Check size={11} className="text-white" strokeWidth={3} /></div>}
              </button>
            ))}
          </div>

          <div className="space-y-3 mb-5">
            {tab === "signup" && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 px-4">
                <User size={16} className="text-slate-400" />
                <input type="text" placeholder="Full Name" className="flex-1 py-4 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
              </div>
            )}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 px-4">
              <Phone size={16} className="text-slate-400" />
              <input type="email" placeholder="Email or phone number" className="flex-1 py-4 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 px-4">
              <Shield size={16} className="text-slate-400" />
              <input type="password" placeholder="Password" className="flex-1 py-4 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
            </div>
          </div>

          <button onClick={go}
            className="w-full py-4 text-white font-extrabold text-base rounded-2xl mb-4 shadow-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: BLUE, boxShadow: `0 8px 24px ${BLUE}40` }}>
            {tab === "login" ? "Log In" : "Create Account"}
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs font-semibold">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="flex gap-3">
            {["🌐  Google", "🍎  Apple"].map(p => (
              <button key={p} className="flex-1 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 shadow-sm hover:shadow-md transition-all">{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Home Dashboard ───────────────────────────────────────────────────────────

function HomeScreen({ navigate, setSel }: { navigate: (s: Screen) => void; setSel: (w: Worker) => void }) {
  return (
    <div className="min-h-full">
      {/* Blue hero header */}
      <div className="px-5 sm:px-8 lg:px-10 pt-5 sm:pt-8 pb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(140deg, #1B72D8 0%, #1558B0 55%, #0E4190 100%)" }}>
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "white", transform: "translate(25%,-35%)", filter: "blur(40px)" }} />

        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/65 text-sm lg:text-base">Good morning, 👋</p>
              <h1 className="text-white text-2xl lg:text-4xl font-extrabold">Sarah Mitchell</h1>
            </div>
            <button onClick={() => navigate("notifications")}
              className="relative w-11 h-11 rounded-full flex items-center justify-center lg:hidden"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <Bell size={21} className="text-white" />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full text-white font-extrabold flex items-center justify-center"
                style={{ width: 18, height: 18, fontSize: 9 }}>2</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="bg-white rounded-2xl flex items-center gap-3 px-4 py-4 shadow-lg cursor-text max-w-2xl"
            onClick={() => navigate("search")}>
            <Search size={18} className="text-slate-400 flex-shrink-0" />
            <span className="text-slate-400 text-sm flex-1">Search plumbers, carpenters, electricians...</span>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: BLUE }}>
              <Filter size={14} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 space-y-10">

        {/* Categories */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-extrabold text-slate-900 text-lg lg:text-xl">Categories</h2>
            <button className="text-sm font-bold" style={{ color: BLUE }}>See all →</button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => navigate("search")}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{ background: cat.bg, color: cat.color }}>
                  <CatIcon name={cat.name} />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Workers grid */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-extrabold text-slate-900 text-lg lg:text-xl">Nearby Workers</h2>
            <button onClick={() => navigate("search")} className="text-sm font-bold" style={{ color: BLUE }}>See all →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {WORKERS.map(w => (
              <WorkerCard key={w.id} w={w} onClick={() => { setSel(w); navigate("worker-profile"); }} />
            ))}
          </div>
        </section>

        {/* Top rated */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-extrabold text-slate-900 text-lg lg:text-xl">⭐ Top Rated</h2>
            <button onClick={() => navigate("search")} className="text-sm font-bold" style={{ color: BLUE }}>See all →</button>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...WORKERS].sort((a, b) => b.rating - a.rating).slice(0, 3).map(w => (
              <WorkerCard key={w.id} w={w} onClick={() => { setSel(w); navigate("worker-profile"); }} horizontal />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Worker Profile ───────────────────────────────────────────────────────────

function WorkerProfileScreen({ worker: w, navigate }: { worker: Worker; navigate: (s: Screen) => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-full pb-8">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate("home")} className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
          <ArrowLeft size={17} className="text-slate-700" />
        </button>
        <h1 className="font-extrabold text-lg text-slate-900 flex-1">Worker Profile</h1>
        <button onClick={() => setLiked(!liked)} className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
          <Heart size={16} className={liked ? "fill-red-500 text-red-500" : "text-slate-600"} />
        </button>
      </div>

      {/* Cover image */}
      <div className="relative h-56 sm:h-72 lg:h-80 bg-slate-200 overflow-hidden">
        <img src={w.coverImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)" }} />
        {/* Desktop back */}
        <button onClick={() => navigate("home")}
          className="hidden lg:flex absolute top-5 left-5 items-center gap-2 px-4 py-2 bg-white/90 rounded-xl text-sm font-bold text-slate-700 hover:bg-white transition-all shadow">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={() => setLiked(!liked)}
          className="hidden lg:flex absolute top-5 right-5 w-10 h-10 bg-white/90 rounded-xl items-center justify-center shadow">
          <Heart size={18} className={liked ? "fill-red-500 text-red-500" : "text-slate-700"} />
        </button>

        <div className="absolute bottom-5 left-5 right-5 lg:hidden">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h1 className="text-white text-xl font-extrabold">{w.name}</h1>
                {w.verified && <VerifiedBadge size={11} />}
              </div>
              <span className="text-white text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>{w.skill}</span>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl font-extrabold">{w.price}</p>
              <p className="text-white/60 text-xs">per hour</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Desktop two-col layout */}
        <div className="lg:flex lg:gap-10 mt-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Desktop header */}
            <div className="hidden lg:flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src={w.avatar} alt={w.name} className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-extrabold text-slate-900">{w.name}</h1>
                      {w.verified && <VerifiedBadge size={12} />}
                    </div>
                    <p className="text-slate-500">{w.skill}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Stars rating={w.rating} size={15} />
                    <span className="font-extrabold text-slate-900">{w.rating}</span>
                    <span className="text-slate-400">({w.reviews} reviews)</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin size={14} /><span>{w.distance} away · Lagos, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile stats bar */}
            <div className="lg:hidden -mt-6 mb-5">
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 flex justify-around">
                {[{ v: w.rating.toString(), l: "Rating", c: "#F59E0B" }, { v: w.reviews.toString(), l: "Reviews", c: BLUE }, { v: w.jobs.toString(), l: "Jobs", c: GREEN }].map((s, i, arr) => (
                  <div key={s.l} className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-extrabold" style={{ color: s.c }}>{s.v}</p>
                      <p className="text-xs text-slate-500 font-semibold">{s.l}</p>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-10 bg-slate-100" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile location + tags */}
            <div className="lg:hidden flex items-center gap-1.5 text-slate-500 mb-4">
              <MapPin size={14} /><span className="text-sm">{w.distance} away · Lagos, Nigeria</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {w.tags.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#EFF6FF", color: BLUE }}>{t}</span>
              ))}
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-6">
              <h3 className="font-extrabold text-slate-900 mb-2">About</h3>
              <p className="text-slate-500 leading-relaxed">{w.bio}</p>
            </div>

            {/* Portfolio */}
            {w.portfolio.length > 0 && (
              <div className="mb-6">
                <h3 className="font-extrabold text-slate-900 mb-3">Portfolio</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {w.portfolio.map((img, i) => (
                    <div key={i} className="aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-slate-100">
                      <img src={img} alt={`Work ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-slate-900">Reviews</h3>
                <div className="flex items-center gap-2">
                  <Stars rating={w.rating} size={13} />
                  <span className="font-extrabold text-slate-900">{w.rating}</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {w.reviewsList.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-extrabold text-sm text-slate-900">{r.author}</span>
                          <span className="text-xs text-slate-400">{r.date}</span>
                        </div>
                        <Stars rating={r.rating} size={11} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Report */}
            <button onClick={() => navigate("report")}
              className="flex items-center gap-2.5 py-3.5 px-5 rounded-2xl border font-bold text-sm"
              style={{ borderColor: "#FECACA", background: "#FEF2F2", color: "#DC2626" }}>
              <AlertTriangle size={16} /> Report Job Issue
            </button>
          </div>

          {/* Desktop booking sidebar */}
          <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-8 bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-extrabold text-slate-900">{w.price}</span>
                  {w.verified && (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#ECFDF5", color: GREEN }}>
                      <Check size={11} strokeWidth={3} /> Verified
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[{ v: w.rating.toString(), l: "Rating" }, { v: w.reviews.toString(), l: "Reviews" }, { v: w.jobs.toString(), l: "Jobs" }].map(s => (
                    <div key={s.l} className="bg-slate-50 rounded-xl p-3">
                      <p className="text-lg font-extrabold text-slate-900">{s.v}</p>
                      <p className="text-xs text-slate-500">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <button className="w-full py-4 rounded-2xl font-extrabold text-white text-base shadow-lg transition-all hover:opacity-90"
                  style={{ background: GREEN, boxShadow: `0 6px 18px ${GREEN}45` }}>
                  <span className="flex items-center justify-center gap-2"><Briefcase size={18} /> Hire Now</span>
                </button>
                <button onClick={() => navigate("chat")}
                  className="w-full py-4 rounded-2xl font-extrabold text-base border-2 transition-all hover:bg-blue-50"
                  style={{ borderColor: BLUE, color: BLUE }}>
                  <span className="flex items-center justify-center gap-2"><MessageCircle size={18} /> Send Message</span>
                </button>
                <button className="w-full py-3.5 rounded-2xl font-bold text-sm border border-slate-200 text-slate-600 transition-all hover:bg-slate-50">
                  <span className="flex items-center justify-center gap-2"><Phone size={16} /> Request Call</span>
                </button>
              </div>

              <div className="px-6 pb-6">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Shield size={13} style={{ color: BLUE }} /> Booking Protection
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Your payment is held securely until the job is complete and verified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTAs */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-5 py-4 flex gap-3">
          <button onClick={() => navigate("chat")}
            className="flex-1 py-4 rounded-2xl border-2 font-extrabold text-sm flex items-center justify-center gap-2"
            style={{ borderColor: BLUE, color: BLUE }}>
            <MessageCircle size={17} /> Message
          </button>
          <button className="flex-1 py-4 rounded-2xl font-extrabold text-sm text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ background: GREEN }}>
            <Briefcase size={17} /> Hire Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Worker Dashboard ─────────────────────────────────────────────────────────

function WorkerDashboardScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const jobs = [
    { customer: "Sarah M.", service: "Pipe repair", time: "Today, 3:00 PM", status: "pending" },
    { customer: "Tom K.", service: "Bathroom fitting", time: "Tomorrow, 10:00 AM", status: "confirmed" },
    { customer: "Rita O.", service: "Leak fix", time: "Dec 20, 2:00 PM", status: "pending" },
    { customer: "John B.", service: "Water heater", time: "Dec 22, 9:00 AM", status: "confirmed" },
  ];

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <div className="px-5 sm:px-8 lg:px-10 pt-5 sm:pt-8 pb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(140deg, #1B72D8, #1558B0, #0E4190)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Worker Dashboard</p>
              <h1 className="text-white text-2xl lg:text-3xl font-extrabold">Marcus Johnson</h1>
            </div>
            <button onClick={() => navigate("notifications")}
              className="relative w-11 h-11 rounded-full flex items-center justify-center lg:hidden"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <Bell size={20} className="text-white" />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full text-white font-extrabold flex items-center justify-center"
                style={{ width: 18, height: 18, fontSize: 9 }}>3</span>
            </button>
          </div>

          {/* Profile card */}
          <div className="flex items-center gap-4 rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.16)" }}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop"
                alt="Me" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl object-cover" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                <Check size={9} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-white font-bold">Master Plumber</span>
                <Award size={15} className="text-amber-300" />
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-white/50" />
                <span className="text-white/50 text-xs">Lagos, Nigeria</span>
                <span className="text-white/30 mx-1">·</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span className="text-emerald-300 text-xs font-bold">Available</span>
              </div>
            </div>
            <button className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}>
              <Settings size={15} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 -mt-5 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Jobs Done", value: "243", color: BLUE, bg: "#EFF6FF", Icon: Briefcase },
            { label: "Avg Rating", value: "4.9★", color: "#D97706", bg: "#FFFBEB", Icon: Star },
            { label: "Total Earned", value: "$4.2k", color: GREEN, bg: "#ECFDF5", Icon: TrendingUp },
            { label: "This Month", value: "$890", color: "#7C3AED", bg: "#F5F3FF", Icon: Award },
          ].map(({ label, value, color, bg, Icon: Ic }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: bg, color }}>
                <Ic size={19} />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Actions row */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate("upload-work")}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-white font-extrabold shadow-lg transition-all hover:opacity-90"
            style={{ background: GREEN }}>
            <Upload size={19} /> Upload New Work
          </button>
          <button className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold border-2 transition-all"
            style={{ borderColor: BLUE, color: BLUE }}>
            <Settings size={17} /> Edit Profile
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Job requests */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">Job Requests</h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#EFF6FF", color: BLUE }}>4 active</span>
            </div>
            <div className="space-y-3">
              {jobs.map((job, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#EFF6FF" }}>
                    <Droplets size={19} className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-sm text-slate-900">{job.customer}</p>
                    <p className="text-xs text-slate-500">{job.service}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={10} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{job.time}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1.5 rounded-full flex-shrink-0"
                    style={job.status === "confirmed" ? { background: "#ECFDF5", color: GREEN } : { background: "#FFFBEB", color: "#D97706" }}>
                    {job.status === "confirmed" ? "✓ Confirmed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">My Portfolio</h3>
              <button className="text-sm font-bold" style={{ color: BLUE }}>Manage all</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=300&fit=crop",
              ].map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 relative group">
                  <img src={img} alt={`Work ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {i === 2 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                      <span className="text-white font-extrabold text-lg">+8</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => navigate("upload-work")}
              className="mt-3 w-full py-3 rounded-2xl border-2 border-dashed font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-slate-50"
              style={{ borderColor: "#CBD5E1", color: "#94A3B8" }}>
              <Plus size={16} /> Add new work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Upload Work ──────────────────────────────────────────────────────────────

function UploadWorkScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [cat, setCat] = useState("");

  return (
    <div className="min-h-full pb-8">
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate("worker-dashboard")} className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
          <ArrowLeft size={17} className="text-slate-700" />
        </button>
        <h1 className="font-extrabold text-lg text-slate-900">Upload Work</h1>
        <div className="ml-auto flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "#EFF6FF", color: BLUE }}>
          <Sparkles size={12} /> New Post
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <div className="hidden lg:flex items-center gap-3 mb-8">
          <button onClick={() => navigate("worker-dashboard")} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Dashboard
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-extrabold text-slate-900">Upload Work</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            {/* Drop zone */}
            <div className="border-2 border-dashed rounded-3xl p-10 flex flex-col items-center gap-3 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              style={{ borderColor: "#CBD5E1" }}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "#EFF6FF" }}>
                <Camera size={34} style={{ color: BLUE }} />
              </div>
              <div className="text-center">
                <p className="font-extrabold text-slate-900 text-base">Upload Photos or Videos</p>
                <p className="text-sm text-slate-400 mt-1">Show before &amp; after for maximum impact</p>
              </div>
              <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: BLUE }}>Choose Files</button>
            </div>

            {/* Preview */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-slate-200 animate-pulse" />
              ))}
              <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-pointer transition-colors">
                <Plus size={20} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">Title of Work</label>
              <input type="text" placeholder="e.g. Kitchen pipe repair, Surulere"
                className="w-full px-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none text-sm focus:border-blue-400 transition-colors" />
            </div>
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">Description</label>
              <textarea rows={5} placeholder="Describe the work done, materials used, and the outcome..."
                className="w-full px-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none text-sm resize-none focus:border-blue-400 transition-colors" />
            </div>
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.slice(0, 6).map(c => (
                  <button key={c.name} onClick={() => setCat(c.name)}
                    className="py-3 rounded-xl text-xs font-extrabold border-2 transition-all"
                    style={{
                      borderColor: cat === c.name ? c.color : "#E2E8F0",
                      background: cat === c.name ? c.bg : "white",
                      color: cat === c.name ? c.color : "#94A3B8",
                    }}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full py-4 rounded-2xl text-white font-extrabold text-base shadow-lg hover:opacity-90 transition-all"
              style={{ background: GREEN }}>
              Publish Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Search ───────────────────────────────────────────────────────────────────

function SearchScreen({ navigate, setSel }: { navigate: (s: Screen) => void; setSel: (w: Worker) => void }) {
  const [filter, setFilter] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const filters = ["All", "Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning"];
  const list = WORKERS.filter(w => (filter === "All" || w.category === filter) && w.rating >= minRating);

  return (
    <div className="min-h-full pb-8">
      {/* Sticky search bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-5 sm:px-8 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex gap-3">
          <button onClick={() => navigate("home")} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 lg:hidden">
            <ArrowLeft size={17} className="text-slate-700" />
          </button>
          <div className="flex-1 bg-slate-100 rounded-xl flex items-center gap-3 px-4">
            <Search size={16} className="text-slate-400 flex-shrink-0" />
            <input type="text" placeholder="Search workers by name, skill, or area..." defaultValue=""
              className="flex-1 py-3 outline-none text-sm bg-transparent text-slate-900 placeholder-slate-400" />
            <button><X size={15} className="text-slate-400" /></button>
          </div>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 sm:hidden" style={{ background: BLUE }}>
            <Filter size={16} className="text-white" />
          </button>
        </div>

        {/* Mobile filter chips */}
        <div className="lg:hidden max-w-7xl mx-auto flex gap-2 overflow-x-auto pt-3 pb-1" style={{ scrollbarWidth: "none" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all"
              style={filter === f ? { background: BLUE, color: "white" } : { background: "#F1F5F9", color: "#64748B" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6">
        <div className="flex gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm sticky top-24">
              <h3 className="font-extrabold text-slate-900 mb-4">Filters</h3>

              <div className="mb-5">
                <p className="text-sm font-bold text-slate-700 mb-3">Category</p>
                <div className="space-y-2">
                  {filters.map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="cat" checked={filter === f} onChange={() => setFilter(f)}
                        className="w-4 h-4 accent-blue-600" />
                      <span className="text-sm font-semibold text-slate-700">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-bold text-slate-700 mb-3">Minimum Rating</p>
                <div className="space-y-2">
                  {[0, 4, 4.5, 4.8].map(r => (
                    <label key={r} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)}
                        className="w-4 h-4 accent-blue-600" />
                      <span className="text-sm font-semibold text-slate-700">{r === 0 ? "Any rating" : `${r}+ stars`}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-bold text-slate-700 mb-3">Price Range</p>
                <div className="flex items-center gap-3">
                  <input type="number" placeholder="Min" className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none text-slate-900" />
                  <span className="text-slate-400">–</span>
                  <input type="number" placeholder="Max" className="flex-1 px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none text-slate-900" />
                </div>
              </div>

              <button className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: BLUE }}>
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-400 mb-5">
              {list.length} workers found {filter !== "All" ? `in ${filter}` : "near you"} · sorted by rating
            </p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
              {list.map(w => (
                <WorkerCard key={w.id} w={w} onClick={() => { setSel(w); navigate("worker-profile"); }} horizontal />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Report ───────────────────────────────────────────────────────────────────

function ReportScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [selId, setSelId] = useState<number | null>(null);

  return (
    <div className="min-h-full pb-8">
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center gap-3 px-4 py-3">
        <button onClick={() => navigate("home")} className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
          <ArrowLeft size={17} />
        </button>
        <h1 className="font-extrabold text-lg text-slate-900">Report Job Issue</h1>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <div className="hidden lg:block mb-8">
          <button onClick={() => navigate("home")} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Report Job Issue</h1>
          <p className="text-slate-500">Help us maintain quality standards by reporting genuine issues.</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 mb-6">
          <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-extrabold text-amber-800">False Reports Warning</p>
            <p className="text-sm text-amber-700 mt-0.5">False reports may result in account suspension. Only report genuine job issues.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">Upload Evidence Photos</label>
              <div className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 bg-white hover:bg-slate-50 transition-colors cursor-pointer" style={{ borderColor: "#CBD5E1" }}>
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Camera size={26} className="text-red-400" />
                </div>
                <p className="text-sm font-bold text-slate-800">Upload Photos of the Issue</p>
                <p className="text-xs text-slate-400">Clear photos help resolve disputes faster</p>
                <button className="px-5 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-700">Choose Photos</button>
              </div>
            </div>

            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">Select Worker</label>
              <div className="space-y-2">
                {WORKERS.slice(0, 4).map(w => (
                  <button key={w.id} onClick={() => setSelId(w.id)}
                    className="w-full flex items-center gap-3 rounded-2xl p-3 border-2 text-left transition-all"
                    style={{ borderColor: selId === w.id ? BLUE : "#E2E8F0", background: selId === w.id ? "#EFF6FF" : "white" }}>
                    <img src={w.avatar} alt={w.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-sm text-slate-900">{w.name}</p>
                      <p className="text-xs text-slate-400">{w.skill}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: selId === w.id ? BLUE : "#CBD5E1" }}>
                      {selId === w.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: BLUE }} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">Job Date</label>
              <input type="date" defaultValue="2025-01-10"
                className="w-full px-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 outline-none text-sm focus:border-blue-400 transition-colors" />
            </div>
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">Describe the Issue</label>
              <textarea rows={8} placeholder="Describe what went wrong. Be specific — e.g. 'The pipe started leaking again 2 days after the fix.'"
                className="w-full px-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none text-sm resize-none focus:border-blue-400 transition-colors" />
            </div>
            <button className="w-full py-4 rounded-2xl text-white font-extrabold text-base shadow-lg hover:opacity-90 transition-all"
              style={{ background: "#DC2626" }}>
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

function NotificationsScreen() {
  return (
    <div className="min-h-full pb-8">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">Notifications</h1>
            <p className="text-sm text-slate-400 font-semibold mt-1">2 unread messages</p>
          </div>
          <button className="text-sm font-extrabold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors" style={{ color: BLUE }}>Mark all read</button>
        </div>

        <div className="space-y-2">
          {NOTIFICATIONS.map(n => (
            <div key={n.id}
              className="flex gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm"
              style={{ background: !n.read ? "#F0F7FF" : "white", borderColor: !n.read ? "#DBEAFE" : "#F1F5F9" }}>
              <div className="relative flex-shrink-0">
                {n.avatarUrl
                  ? <img src={n.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover" />
                  : <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"><Bell size={19} className="text-slate-400" /></div>}
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                  <NotifBadge type={n.type} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-sm text-slate-900">{n.title}</p>
                    <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{n.body}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold whitespace-nowrap flex-shrink-0">{n.time}</span>
                </div>
              </div>
              {!n.read && <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: BLUE }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

function ChatScreen({ worker: w, navigate }: { worker: Worker; navigate: (s: Screen) => void }) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(CHAT_MESSAGES);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(p => [...p, { id: Date.now(), sender: "customer" as const, text: input.trim(), time: "Now" }]);
    setInput("");
  };

  const contacts = WORKERS.slice(0, 4);

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden" style={{ height: "calc(100vh - 0px)" }}>
      {/* Desktop: contacts list */}
      <aside className="hidden lg:flex flex-col w-80 xl:w-96 border-r border-slate-100 bg-white flex-shrink-0">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-extrabold text-lg text-slate-900 mb-3">Messages</h2>
          <div className="bg-slate-100 rounded-xl flex items-center gap-2 px-4 py-2.5">
            <Search size={15} className="text-slate-400" />
            <input type="text" placeholder="Search conversations..." className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {contacts.map((c, i) => (
            <div key={c.id}
              className="flex items-center gap-3 px-5 py-4 border-b border-slate-50 cursor-pointer transition-all"
              style={{ background: i === 0 ? "#F0F7FF" : "white" }}>
              <div className="relative">
                <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-extrabold text-sm text-slate-900 truncate">{c.name}</p>
                  <span className="text-xs text-slate-400 flex-shrink-0 ml-2">10:28</span>
                </div>
                <p className="text-xs text-slate-400 truncate">{i === 0 ? "See you at 3!" : "Thanks for the great work!"}</p>
              </div>
              {i === 0 && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: BLUE }} />}
            </div>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 bg-white border-b border-slate-100 shadow-sm flex-shrink-0">
          <button onClick={() => navigate("home")}
            className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center lg:hidden">
            <ArrowLeft size={17} className="text-slate-700" />
          </button>
          <img src={w.avatar} alt={w.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-sm text-slate-900">{w.name}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <p className="text-xs text-emerald-600 font-bold">Online now</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Phone size={15} className="text-slate-700" />
            </button>
            <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
              <MoreVertical size={15} className="text-slate-700" />
            </button>
          </div>
        </div>

        {/* Job banner */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-slate-100 flex items-center gap-2 bg-blue-50">
          <Briefcase size={13} style={{ color: BLUE }} className="flex-shrink-0" />
          <p className="text-xs font-extrabold" style={{ color: "#1E40AF" }}>
            Discussing: Pipe repair job · Est. $120–150
          </p>
          <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#DBEAFE", color: BLUE }}>Active</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 bg-slate-50" style={{ scrollbarWidth: "none" }}>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-semibold">Today</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {msgs.map(msg => {
            const isCust = msg.sender === "customer";
            return (
              <div key={msg.id} className={`flex items-end gap-3 ${isCust ? "justify-end" : "justify-start"}`}>
                {!isCust && (
                  <img src={w.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm" />
                )}
                <div className="max-w-[70%] sm:max-w-[60%] px-4 py-3 text-sm leading-relaxed"
                  style={isCust
                    ? { background: BLUE, color: "white", borderRadius: "18px 18px 4px 18px", boxShadow: `0 4px 12px ${BLUE}35` }
                    : { background: "white", color: "#111827", borderRadius: "18px 18px 18px 4px", border: "1px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  {msg.text}
                  <p className="text-[10px] mt-1 font-semibold"
                    style={{ color: isCust ? "rgba(255,255,255,0.5)" : "#94A3B8", textAlign: isCust ? "right" : "left" }}>
                    {msg.time} {isCust && "✓✓"}
                  </p>
                </div>
                {isCust && (
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop"
                    alt="Me" className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm" />
                )}
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-4 sm:px-6 py-4 bg-white border-t border-slate-100 flex gap-3 items-center">
          <button className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-slate-200 transition-colors">
            <ImageIcon size={17} className="text-slate-500" />
          </button>
          <div className="flex-1 bg-slate-100 rounded-2xl px-4 py-3 flex items-center gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400" />
          </div>
          <button onClick={send}
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-md transition-all hover:opacity-90 active:scale-90"
            style={{ background: input.trim() ? BLUE : "#CBD5E1" }}>
            <Send size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const PRE_AUTH: Screen[] = ["splash", "onboarding", "auth"];
const NO_BOTTOM_NAV: Screen[] = [...PRE_AUTH, "upload-work", "report", "chat", "worker-profile"];
const CHAT_SCREEN: Screen[] = ["chat"];

export default function WorkforceMarketplaceApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole]     = useState<UserRole>(null);
  const [sel, setSel]       = useState<Worker>(WORKERS[0]);

  const nav = (s: Screen) => setScreen(s);

  const isPreAuth  = PRE_AUTH.includes(screen);
  const showBottom = !NO_BOTTOM_NAV.includes(screen);
  const isChat     = CHAT_SCREEN.includes(screen);

  if (isPreAuth) {
    return (
      <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif" }}>
        {screen === "splash"     && <SplashScreen     navigate={nav} />}
        {screen === "onboarding" && <OnboardingScreen navigate={nav} />}
        {screen === "auth"       && <AuthScreen       navigate={nav} setRole={setRole} />}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50"
      style={{ fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif" }}>

      {/* Desktop sidebar */}
      <DesktopSidebar screen={screen} navigate={nav} role={role} />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <p className="font-extrabold text-slate-900 text-lg">
              {ALL_SCREENS.find(s => s.s === screen)?.label ?? "SkillConnect"}
            </p>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => nav("notifications")} className="relative w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Bell size={18} className="text-slate-700" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
            </button>
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
              alt="Me" className="w-9 h-9 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all" />
          </div>
        </div>

        {/* Scrollable content */}
        <main
          className="flex-1 overflow-auto"
          style={{
            paddingBottom: showBottom ? 72 : 0,
            scrollbarWidth: "none",
            ...(isChat ? { overflow: "hidden" } : {}),
          }}>
          {screen === "home"             && <HomeScreen            navigate={nav} setSel={setSel} />}
          {screen === "search"           && <SearchScreen          navigate={nav} setSel={setSel} />}
          {screen === "worker-profile"   && <WorkerProfileScreen   worker={sel}  navigate={nav} />}
          {screen === "worker-dashboard" && <WorkerDashboardScreen navigate={nav} />}
          {screen === "upload-work"      && <UploadWorkScreen      navigate={nav} />}
          {screen === "report"           && <ReportScreen          navigate={nav} />}
          {screen === "notifications"    && <NotificationsScreen />}
          {screen === "chat"             && <ChatScreen            worker={sel}  navigate={nav} />}
        </main>

        {/* Mobile bottom nav */}
        {showBottom && (
          <div className="lg:hidden flex-shrink-0 border-t border-slate-100">
            <BottomNav screen={screen} navigate={nav} role={role} />
          </div>
        )}
      </div>
    </div>
  );
}
