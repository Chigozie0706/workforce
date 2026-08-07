"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, X, Filter } from "lucide-react";
import { BLUE } from "../../../lib/data";
import { api } from "../../../lib/api";
import { WorkerCard } from "../../../components/dashboard/atoms";
import type { Worker } from "../../../lib/types";

export default function SearchPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [list, setList] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const filters = [
    "All",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Cleaning",
  ];

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "All") params.set("category", filter);
    if (minRating > 0) params.set("minRating", String(minRating));
    api<Worker[]>(`/api/workers?${params.toString()}`)
      .then(setList)
      .finally(() => setLoading(false));
  }, [filter, minRating]);

  return (
    <div className="min-h-full pb-8">
      {/* Sticky search bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-5 sm:px-8 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 lg:hidden"
          >
            <ArrowLeft size={17} className="text-slate-700" />
          </button>
          <div className="flex-1 bg-slate-100 rounded-xl flex items-center gap-3 px-4">
            <Search size={16} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search workers by name, skill, or area..."
              defaultValue=""
              className="flex-1 py-3 outline-none text-sm bg-transparent text-slate-900 placeholder-slate-400"
            />
            <button>
              <X size={15} className="text-slate-400" />
            </button>
          </div>
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 sm:hidden"
            style={{ background: BLUE }}
          >
            <Filter size={16} className="text-white" />
          </button>
        </div>

        {/* Mobile filter chips */}
        <div
          className="lg:hidden max-w-7xl mx-auto flex gap-2 overflow-x-auto pt-3 pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all"
              style={
                filter === f
                  ? { background: BLUE, color: "white" }
                  : { background: "#F1F5F9", color: "#64748B" }
              }
            >
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
                <p className="text-sm font-bold text-slate-700 mb-3">
                  Category
                </p>
                <div className="space-y-2">
                  {filters.map((f) => (
                    <label
                      key={f}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="cat"
                        checked={filter === f}
                        onChange={() => setFilter(f)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-bold text-slate-700 mb-3">
                  Minimum Rating
                </p>
                <div className="space-y-2">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === r}
                        onChange={() => setMinRating(r)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        {r === 0 ? "Any rating" : `${r}+ stars`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-400 mb-5">
              {loading
                ? "Loading…"
                : `${list.length} workers found ${filter !== "All" ? `in ${filter}` : "near you"} · sorted by rating`}
            </p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
              {list.map((w) => (
                <WorkerCard
                  key={w.id}
                  w={w}
                  onClick={() => router.push(`/worker/${w.id}`)}
                  horizontal
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
