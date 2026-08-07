"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Camera, Plus } from "lucide-react";
import { BLUE, GREEN, CATEGORIES } from "../../../lib/data";

export default function UploadWorkPage() {
  const router = useRouter();
  const [cat, setCat] = useState("");

  return (
    <div className="min-h-full pb-8">
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.push("/worker-dashboard")}
          className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center"
        >
          <ArrowLeft size={17} className="text-slate-700" />
        </button>
        <h1 className="font-extrabold text-lg text-slate-900">Upload Work</h1>
        <div
          className="ml-auto flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: "#EFF6FF", color: BLUE }}
        >
          <Sparkles size={12} /> New Post
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <div className="hidden lg:flex items-center gap-3 mb-8">
          <button
            onClick={() => router.push("/worker-dashboard")}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-extrabold text-slate-900">
            Upload Work
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div
              className="border-2 border-dashed rounded-3xl p-10 flex flex-col items-center gap-3 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              style={{ borderColor: "#CBD5E1" }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: "#EFF6FF" }}
              >
                <Camera size={34} style={{ color: BLUE }} />
              </div>
              <div className="text-center">
                <p className="font-extrabold text-slate-900 text-base">
                  Upload Photos or Videos
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Show before &amp; after for maximum impact
                </p>
              </div>
              <button
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-white"
                style={{ background: BLUE }}
              >
                Choose Files
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-slate-200 animate-pulse"
                />
              ))}
              <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center hover:bg-slate-50 cursor-pointer transition-colors">
                <Plus size={20} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">
                Title of Work
              </label>
              <input
                type="text"
                placeholder="e.g. Kitchen pipe repair, Surulere"
                className="w-full px-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none text-sm focus:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">
                Description
              </label>
              <textarea
                rows={5}
                placeholder="Describe the work done, materials used, and the outcome..."
                className="w-full px-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 placeholder-slate-400 outline-none text-sm resize-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-extrabold text-slate-900 mb-2 block">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.slice(0, 6).map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setCat(c.name)}
                    className="py-3 rounded-xl text-xs font-extrabold border-2 transition-all"
                    style={{
                      borderColor: cat === c.name ? c.color : "#E2E8F0",
                      background: cat === c.name ? c.bg : "white",
                      color: cat === c.name ? c.color : "#94A3B8",
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="w-full py-4 rounded-2xl text-white font-extrabold text-base shadow-lg hover:opacity-90 transition-all"
              style={{ background: GREEN }}
            >
              Publish Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
