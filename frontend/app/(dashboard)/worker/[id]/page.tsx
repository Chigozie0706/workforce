"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  Check,
  MapPin,
  AlertTriangle,
  MessageCircle,
  Briefcase,
  Phone,
  Shield,
} from "lucide-react";
import { BLUE, GREEN } from "../../../../lib/data";
import { api } from "../../../../lib/api";
import { Stars, VerifiedBadge } from "../../../../components/dashboard/atoms";
import type { Worker } from "../../../../lib/types";

export default function WorkerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [w, setWorker] = useState<Worker | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    api<Worker>(`/api/workers/${params.id}`)
      .then(setWorker)
      .catch(() => setWorker(null));
  }, [params.id]);

  if (w === undefined) {
    return (
      <div className="min-h-full flex items-center justify-center py-20 text-slate-400">
        Loading…
      </div>
    );
  }

  if (!w) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center gap-3 py-20">
        <p className="text-slate-500 font-semibold">Worker not found.</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm font-bold"
          style={{ color: BLUE }}
        >
          ← Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-8">
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-100 flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center"
        >
          <ArrowLeft size={17} className="text-slate-700" />
        </button>
        <h1 className="font-extrabold text-lg text-slate-900 flex-1">
          Worker Profile
        </h1>
        <button
          onClick={() => setLiked(!liked)}
          className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center"
        >
          <Heart
            size={16}
            className={liked ? "fill-red-500 text-red-500" : "text-slate-600"}
          />
        </button>
      </div>

      <div className="relative h-56 sm:h-72 lg:h-80 bg-slate-200 overflow-hidden">
        <img src={w.coverImg} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)",
          }}
        />
        <button
          onClick={() => router.push("/dashboard")}
          className="hidden lg:flex absolute top-5 left-5 items-center gap-2 px-4 py-2 bg-white/90 rounded-xl text-sm font-bold text-slate-700 hover:bg-white transition-all shadow"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={() => setLiked(!liked)}
          className="hidden lg:flex absolute top-5 right-5 w-10 h-10 bg-white/90 rounded-xl items-center justify-center shadow"
        >
          <Heart
            size={18}
            className={liked ? "fill-red-500 text-red-500" : "text-slate-700"}
          />
        </button>

        <div className="absolute bottom-5 left-5 right-5 lg:hidden">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h1 className="text-white text-xl font-extrabold">{w.name}</h1>
                {w.verified && <VerifiedBadge size={11} />}
              </div>
              <span
                className="text-white text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {w.skill}
              </span>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl font-extrabold">{w.price}</p>
              <p className="text-white/60 text-xs">per hour</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="lg:flex lg:gap-10 mt-6">
          <div className="flex-1 min-w-0">
            <div className="hidden lg:flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={w.avatar}
                    alt={w.name}
                    className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-extrabold text-slate-900">
                        {w.name}
                      </h1>
                      {w.verified && <VerifiedBadge size={12} />}
                    </div>
                    <p className="text-slate-500">{w.skill}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Stars rating={w.rating} size={15} />
                    <span className="font-extrabold text-slate-900">
                      {w.rating}
                    </span>
                    <span className="text-slate-400">
                      ({w.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin size={14} />
                    <span>{w.distance} away · Lagos, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden -mt-6 mb-5">
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 flex justify-around">
                {[
                  { v: w.rating.toString(), l: "Rating", c: "#F59E0B" },
                  { v: w.reviews.toString(), l: "Reviews", c: BLUE },
                  { v: w.jobs.toString(), l: "Jobs", c: GREEN },
                ].map((s, i, arr) => (
                  <div key={s.l} className="flex items-center gap-4">
                    <div className="text-center">
                      <p
                        className="text-2xl font-extrabold"
                        style={{ color: s.c }}
                      >
                        {s.v}
                      </p>
                      <p className="text-xs text-slate-500 font-semibold">
                        {s.l}
                      </p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px h-10 bg-slate-100" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-1.5 text-slate-500 mb-4">
              <MapPin size={14} />
              <span className="text-sm">
                {w.distance} away · Lagos, Nigeria
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {w.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: "#EFF6FF", color: BLUE }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-6">
              <h3 className="font-extrabold text-slate-900 mb-2">About</h3>
              <p className="text-slate-500 leading-relaxed">{w.bio}</p>
            </div>

            {w.portfolio.length > 0 && (
              <div className="mb-6">
                <h3 className="font-extrabold text-slate-900 mb-3">
                  Portfolio
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {w.portfolio.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={`Work ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-slate-900">Reviews</h3>
                <div className="flex items-center gap-2">
                  <Stars rating={w.rating} size={13} />
                  <span className="font-extrabold text-slate-900">
                    {w.rating}
                  </span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {w.reviewsList.map((r, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={r.avatar}
                        alt={r.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-extrabold text-sm text-slate-900">
                            {r.author}
                          </span>
                          <span className="text-xs text-slate-400">
                            {r.date}
                          </span>
                        </div>
                        <Stars rating={r.rating} size={11} />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => router.push("/report")}
              className="flex items-center gap-2.5 py-3.5 px-5 rounded-2xl border font-bold text-sm"
              style={{
                borderColor: "#FECACA",
                background: "#FEF2F2",
                color: "#DC2626",
              }}
            >
              <AlertTriangle size={16} /> Report Job Issue
            </button>
          </div>

          <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-8 bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {w.price}
                  </span>
                  {w.verified && (
                    <span
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: "#ECFDF5", color: GREEN }}
                    >
                      <Check size={11} strokeWidth={3} /> Verified
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { v: w.rating.toString(), l: "Rating" },
                    { v: w.reviews.toString(), l: "Reviews" },
                    { v: w.jobs.toString(), l: "Jobs" },
                  ].map((s) => (
                    <div key={s.l} className="bg-slate-50 rounded-xl p-3">
                      <p className="text-lg font-extrabold text-slate-900">
                        {s.v}
                      </p>
                      <p className="text-xs text-slate-500">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <button
                  className="w-full py-4 rounded-2xl font-extrabold text-white text-base shadow-lg transition-all hover:opacity-90"
                  style={{
                    background: GREEN,
                    boxShadow: `0 6px 18px ${GREEN}45`,
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Briefcase size={18} /> Hire Now
                  </span>
                </button>
                <button
                  onClick={() => router.push(`/chats/${w.id}`)}
                  className="w-full py-4 rounded-2xl font-extrabold text-base border-2 transition-all hover:bg-blue-50"
                  style={{ borderColor: BLUE, color: BLUE }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> Send Message
                  </span>
                </button>
                <button className="w-full py-3.5 rounded-2xl font-bold text-sm border border-slate-200 text-slate-600 transition-all hover:bg-slate-50">
                  <span className="flex items-center justify-center gap-2">
                    <Phone size={16} /> Request Call
                  </span>
                </button>
              </div>

              <div className="px-6 pb-6">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                    <Shield size={13} style={{ color: BLUE }} /> Booking
                    Protection
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Your payment is held securely until the job is complete and
                    verified.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-5 py-4 flex gap-3">
          <button
            onClick={() => router.push(`/chats/${w.id}`)}
            className="flex-1 py-4 rounded-2xl border-2 font-extrabold text-sm flex items-center justify-center gap-2"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            <MessageCircle size={17} /> Message
          </button>
          <button
            className="flex-1 py-4 rounded-2xl font-extrabold text-sm text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ background: GREEN }}
          >
            <Briefcase size={17} /> Hire Now
          </button>
        </div>
      </div>
    </div>
  );
}
