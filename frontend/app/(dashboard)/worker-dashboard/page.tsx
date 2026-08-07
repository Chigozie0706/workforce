"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  Award,
  MapPin,
  Settings,
  Briefcase,
  Star,
  TrendingUp,
  Upload,
  Droplets,
  Clock,
  Plus,
} from "lucide-react";
import { BLUE, GREEN } from "../../../lib/data";

export default function WorkerDashboardPage() {
  const router = useRouter();

  const jobs = [
    {
      customer: "Sarah M.",
      service: "Pipe repair",
      time: "Today, 3:00 PM",
      status: "pending",
    },
    {
      customer: "Tom K.",
      service: "Bathroom fitting",
      time: "Tomorrow, 10:00 AM",
      status: "confirmed",
    },
    {
      customer: "Rita O.",
      service: "Leak fix",
      time: "Dec 20, 2:00 PM",
      status: "pending",
    },
    {
      customer: "John B.",
      service: "Water heater",
      time: "Dec 22, 9:00 AM",
      status: "confirmed",
    },
  ];

  return (
    <div className="min-h-full pb-8">
      <div
        className="px-5 sm:px-8 lg:px-10 pt-5 sm:pt-8 pb-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(140deg, #1B72D8, #1558B0, #0E4190)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider">
                Worker Dashboard
              </p>
              <h1 className="text-white text-2xl lg:text-3xl font-extrabold">
                Marcus Johnson
              </h1>
            </div>
            <button
              onClick={() => router.push("/notifications")}
              className="relative w-11 h-11 rounded-full flex items-center justify-center lg:hidden"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Bell size={20} className="text-white" />
              <span
                className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full text-white font-extrabold flex items-center justify-center"
                style={{ width: 18, height: 18, fontSize: 9 }}
              >
                3
              </span>
            </button>
          </div>

          <div
            className="flex items-center gap-4 rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop"
                alt="Me"
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl object-cover"
              />
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
                <span className="text-emerald-300 text-xs font-bold">
                  Available
                </span>
              </div>
            </div>
            <button
              className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <Settings size={15} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 -mt-5 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Jobs Done",
              value: "243",
              color: BLUE,
              bg: "#EFF6FF",
              Icon: Briefcase,
            },
            {
              label: "Avg Rating",
              value: "4.9★",
              color: "#D97706",
              bg: "#FFFBEB",
              Icon: Star,
            },
            {
              label: "Total Earned",
              value: "$4.2k",
              color: GREEN,
              bg: "#ECFDF5",
              Icon: TrendingUp,
            },
            {
              label: "This Month",
              value: "$890",
              color: "#7C3AED",
              bg: "#F5F3FF",
              Icon: Award,
            },
          ].map(({ label, value, color, bg, Icon: Ic }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: bg, color }}
              >
                <Ic size={19} />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {value}
              </p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => router.push("/upload-work")}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-white font-extrabold shadow-lg transition-all hover:opacity-90"
            style={{ background: GREEN }}
          >
            <Upload size={19} /> Upload New Work
          </button>
          <button
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold border-2 transition-all"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            <Settings size={17} /> Edit Profile
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">
                Job Requests
              </h3>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "#EFF6FF", color: BLUE }}
              >
                4 active
              </span>
            </div>
            <div className="space-y-3">
              {jobs.map((job, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "#EFF6FF" }}
                  >
                    <Droplets size={19} className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-sm text-slate-900">
                      {job.customer}
                    </p>
                    <p className="text-xs text-slate-500">{job.service}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={10} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{job.time}</span>
                    </div>
                  </div>
                  <span
                    className="text-xs font-extrabold px-2.5 py-1.5 rounded-full flex-shrink-0"
                    style={
                      job.status === "confirmed"
                        ? { background: "#ECFDF5", color: GREEN }
                        : { background: "#FFFBEB", color: "#D97706" }
                    }
                  >
                    {job.status === "confirmed" ? "✓ Confirmed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">
                My Portfolio
              </h3>
              <button className="text-sm font-bold" style={{ color: BLUE }}>
                Manage all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop",
                "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=300&fit=crop",
              ].map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl overflow-hidden bg-slate-100 relative group"
                >
                  <img
                    src={img}
                    alt={`Work ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {i === 2 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                      <span className="text-white font-extrabold text-lg">
                        +8
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push("/upload-work")}
              className="mt-3 w-full py-3 rounded-2xl border-2 border-dashed font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-slate-50"
              style={{ borderColor: "#CBD5E1", color: "#94A3B8" }}
            >
              <Plus size={16} /> Add new work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
