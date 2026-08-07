"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, Camera } from "lucide-react";
import { BLUE } from "../../../lib/data";
import { api } from "../../../lib/api";
import type { Worker } from "../../../lib/types";

export default function ReportPage() {
  const router = useRouter();
  const [selId, setSelId] = useState<number | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    api<Worker[]>("/api/workers").then((list) => setWorkers(list.slice(0, 4)));
  }, []);

  return (
    <div className="min-h-full pb-8">
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center"
        >
          <ArrowLeft size={17} />
        </button>
        <h1 className="font-extrabold text-lg text-slate-900">
          Report Job Issue
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <div className="hidden lg:block mb-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
            Report Job Issue
          </h1>
          <p className="text-slate-500">
            Help us maintain quality standards by reporting genuine issues.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 mb-6">
          <AlertTriangle
            size={18}
            className="text-amber-500 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm font-extrabold text-amber-800">
              False Reports Warning
            </p>
            <p className="text-sm text-amber-700 mt-0.5">
              False reports may result in account suspension. Only report
              genuine job issues.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">
                Upload Evidence Photos
              </label>
              <div
                className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                style={{ borderColor: "#CBD5E1" }}
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Camera size={26} className="text-red-400" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Upload Photos of the Issue
                </p>
                <p className="text-xs text-slate-400">
                  Clear photos help resolve disputes faster
                </p>
                <button className="px-5 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-700">
                  Choose Photos
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">
                Select Worker
              </label>
              <div className="space-y-2">
                {workers.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelId(w.id)}
                    className="w-full flex items-center gap-3 rounded-2xl p-3 border-2 text-left transition-all"
                    style={{
                      borderColor: selId === w.id ? BLUE : "#E2E8F0",
                      background: selId === w.id ? "#EFF6FF" : "white",
                    }}
                  >
                    <img
                      src={w.avatar}
                      alt={w.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-sm text-slate-900">
                        {w.name}
                      </p>
                      <p className="text-xs text-slate-400">{w.skill}</p>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: selId === w.id ? BLUE : "#CBD5E1" }}
                    >
                      {selId === w.id && (
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: BLUE }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">
                Job Date
              </label>
              <input
                type="date"
                defaultValue="2025-01-10"
                className="w-full px-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 outline-none text-sm focus:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">
                Describe the Issue
              </label>
              <textarea
                rows={8}
                placeholder="Describe what went wrong. Be specific — e.g. 'The pipe started leaking again 2 days after the fix.'"
                className="w-full px-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none text-sm resize-none focus:border-blue-400 transition-colors"
              />
            </div>
            <button
              className="w-full py-4 rounded-2xl text-white font-extrabold text-base shadow-lg hover:opacity-90 transition-all"
              style={{ background: "#DC2626" }}
            >
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
