"use client";

import {
  Star,
  Check,
  Droplets,
  Zap,
  Hammer,
  Paintbrush,
  Wind,
  Wrench,
  Shield,
  Plus,
  ChevronRight,
  MessageCircle,
  AlertTriangle,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { BLUE } from "../../lib/data";
import type { Worker } from "../../lib/types";

export function Stars({
  rating,
  size = 13,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </span>
  );
}

export function VerifiedBadge({ size = 10 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-blue-500"
      style={{ width: size * 2, height: size * 2 }}
    >
      <Check size={size} className="text-white" strokeWidth={3} />
    </span>
  );
}

export function CatIcon({ name }: { name: string }) {
  const p = { size: 22 };
  switch (name) {
    case "Plumbing":
      return <Droplets {...p} />;
    case "Electrical":
      return <Zap {...p} />;
    case "Carpentry":
      return <Hammer {...p} />;
    case "Painting":
      return <Paintbrush {...p} />;
    case "Cleaning":
      return <Wind {...p} />;
    case "Tiling":
      return <Wrench {...p} />;
    case "Roofing":
      return <Shield {...p} />;
    default:
      return <Plus {...p} />;
  }
}

export function WorkerCard({
  w,
  onClick,
  horizontal = false,
}: {
  w: Worker;
  onClick: () => void;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <button
        onClick={onClick}
        className="w-full bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 text-left shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:scale-95"
      >
        <div className="relative flex-shrink-0">
          <img
            src={w.avatar}
            alt={w.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover"
          />
          {w.verified && (
            <div className="absolute -bottom-1 -right-1 border-2 border-white rounded-full">
              <VerifiedBadge size={8} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                {w.name}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">{w.skill}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-extrabold" style={{ color: BLUE }}>
                {w.price}
              </p>
              <p className="text-xs text-slate-400">{w.distance}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <Stars rating={w.rating} size={12} />
            <span className="text-xs font-bold text-slate-800">{w.rating}</span>
            <span className="text-xs text-slate-400">
              ({w.reviews}) · {w.jobs} jobs
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {w.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "#EFF6FF", color: BLUE }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <ChevronRight
          size={16}
          className="text-slate-300 self-center flex-shrink-0"
        />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden text-left shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 active:scale-95"
    >
      <div className="relative h-40 sm:h-48 bg-slate-100 overflow-hidden">
        <img
          src={w.avatar}
          alt={w.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 60%)",
          }}
        />
        {w.verified && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ background: "rgba(22,163,74,0.9)" }}
          >
            <Check size={9} className="text-white" strokeWidth={3} />
            <span className="text-white text-[10px] font-bold">Verified</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {w.distance}
          </span>
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
          <span className="font-extrabold text-sm" style={{ color: BLUE }}>
            {w.price}
          </span>
        </div>
      </div>
    </button>
  );
}

export function NotifBadge({ type }: { type: string }) {
  switch (type) {
    case "message":
      return <MessageCircle size={13} className="text-blue-500" />;
    case "rating":
      return <Star size={13} className="text-amber-500" />;
    case "report":
      return <AlertTriangle size={13} className="text-red-500" />;
    case "payment":
      return <TrendingUp size={13} className="text-emerald-500" />;
    default:
      return <Briefcase size={13} style={{ color: BLUE }} />;
  }
}
