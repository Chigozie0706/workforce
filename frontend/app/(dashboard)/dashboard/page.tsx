"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, Filter } from "lucide-react";
import { BLUE, CATEGORIES } from "../../../lib/data";
import { api } from "../../../lib/api";
import { CatIcon, WorkerCard } from "../../../components/dashboard/atoms";
import type { Worker } from "../../../lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Worker[]>("/api/workers")
      .then(setWorkers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-full">
      {/* Blue hero header */}
      <div
        className="px-5 sm:px-8 lg:px-10 pt-5 sm:pt-8 pb-10 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(140deg, #1B72D8 0%, #1558B0 55%, #0E4190 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "white",
            transform: "translate(25%,-35%)",
            filter: "blur(40px)",
          }}
        />

        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/65 text-sm lg:text-base">
                Good morning, 👋
              </p>
              <h1 className="text-white text-2xl lg:text-4xl font-extrabold">
                Welcome back
              </h1>
            </div>
            <button
              onClick={() => router.push("/notifications")}
              className="relative w-11 h-11 rounded-full flex items-center justify-center lg:hidden"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Bell size={21} className="text-white" />
              <span
                className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full text-white font-extrabold flex items-center justify-center"
                style={{ width: 18, height: 18, fontSize: 9 }}
              >
                2
              </span>
            </button>
          </div>

          {/* Search bar */}
          <div
            className="bg-white rounded-2xl flex items-center gap-3 px-4 py-4 shadow-lg cursor-text max-w-2xl"
            onClick={() => router.push("/search")}
          >
            <Search size={18} className="text-slate-400 flex-shrink-0" />
            <span className="text-slate-400 text-sm flex-1">
              Search plumbers, carpenters, electricians...
            </span>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: BLUE }}
            >
              <Filter size={14} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 space-y-10">
        {/* Categories */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-extrabold text-slate-900 text-lg lg:text-xl">
              Categories
            </h2>
            <button className="text-sm font-bold" style={{ color: BLUE }}>
              See all →
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => router.push("/search")}
                className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                  style={{ background: cat.bg, color: cat.color }}
                >
                  <CatIcon name={cat.name} />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Workers grid */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-extrabold text-slate-900 text-lg lg:text-xl">
              Nearby Workers
            </h2>
            <button
              onClick={() => router.push("/search")}
              className="text-sm font-bold"
              style={{ color: BLUE }}
            >
              See all →
            </button>
          </div>
          {loading ? (
            <p className="text-sm text-slate-400">Loading workers…</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {workers.map((w) => (
                <WorkerCard
                  key={w.id}
                  w={w}
                  onClick={() => router.push(`/worker/${w.id}`)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Top rated */}
        {!loading && (
          <section>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-extrabold text-slate-900 text-lg lg:text-xl">
                ⭐ Top Rated
              </h2>
              <button
                onClick={() => router.push("/search")}
                className="text-sm font-bold"
                style={{ color: BLUE }}
              >
                See all →
              </button>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...workers]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map((w) => (
                  <WorkerCard
                    key={w.id}
                    w={w}
                    onClick={() => router.push(`/worker/${w.id}`)}
                    horizontal
                  />
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
