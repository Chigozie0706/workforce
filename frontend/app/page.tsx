import Link from "next/link";
import { Star, Shield } from "lucide-react";
import { Logo } from "../components/Logo";
import { BLUE, GREEN, CATEGORIES } from "../lib/data";
import { CatIcon } from "../components/dashboard/atoms";
import type { Worker } from "../lib/types";

async function getFeaturedWorkers(): Promise<Worker[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/workers`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    const all: Worker[] = await res.json();
    return all.slice(0, 4);
  } catch {
    return []; // backend not running yet — page still renders, just without the showcase
  }
}

export default async function SplashPage() {
  const WORKERS = await getFeaturedWorkers();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 lg:px-16 lg:py-5">
        <Logo size="sm" light />
        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="hidden sm:block text-sm font-bold text-white/80 hover:text-white transition-colors px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-bold px-4 py-2.5 rounded-xl text-white transition-all"
            style={{ background: GREEN }}
          >
            Sign up free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div
        className="flex-1 flex items-center"
        style={{
          background:
            "linear-gradient(145deg, #1B6FD4 0%, #1558B0 50%, #0C3470 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <Shield size={14} className="text-emerald-300" />
                <span className="text-white/80 text-sm font-semibold">
                  500+ verified workers · Trusted by 12k customers
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Find Trusted Skilled Workers{" "}
                <span className="text-emerald-400">Near You</span>
              </h1>
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
                Hire verified plumbers, electricians, carpenters, painters, and
                more. Quality work, guaranteed.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/onboarding"
                  className="px-7 py-4 font-extrabold text-base rounded-2xl text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: GREEN,
                    boxShadow: `0 8px 28px rgba(22,163,74,0.45)`,
                  }}
                >
                  Get Started Free →
                </Link>
                <Link
                  href="/signup"
                  className="px-7 py-4 font-bold text-base rounded-2xl text-white border-2 transition-all hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.35)" }}
                >
                  Log In
                </Link>
              </div>

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

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {WORKERS.slice(0, 4).map((w, i) => (
                  <div
                    key={w.id}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/15 transition-all hover:bg-white/15"
                    style={{
                      transform: i % 2 === 1 ? "translateY(16px)" : "none",
                    }}
                  >
                    <img
                      src={w.avatar}
                      alt={w.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-white font-bold text-sm truncate">
                        {w.name}
                      </p>
                      <p className="text-white/60 text-xs">{w.skill}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Star
                            size={11}
                            className="fill-amber-400 text-amber-400"
                          />
                          <span className="text-white text-xs font-bold">
                            {w.rating}
                          </span>
                        </div>
                        <span className="text-white text-xs font-extrabold">
                          {w.price}
                        </span>
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
          <h2 className="text-center text-2xl lg:text-3xl font-extrabold text-slate-900 mb-10">
            Browse by Category
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href="/search"
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: cat.bg, color: cat.color }}
                >
                  <CatIcon name={cat.name} />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-12 lg:py-20" style={{ background: "#F8FAFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-center text-2xl lg:text-3xl font-extrabold text-slate-900 mb-12">
            How it Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                n: "1",
                title: "Search & Browse",
                desc: "Find verified workers by category, location, or name.",
                color: BLUE,
              },
              {
                n: "2",
                title: "Review Portfolios",
                desc: "See real before-and-after photos of completed work.",
                color: "#7C3AED",
              },
              {
                n: "3",
                title: "Hire in 3 Taps",
                desc: "Message, agree on a price, and confirm the job instantly.",
                color: GREEN,
              },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div
                  className="w-14 h-14 rounded-full font-extrabold text-xl text-white flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ background: s.color }}
                >
                  {s.n}
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div className="py-16 text-center" style={{ background: BLUE }}>
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-white/70 mb-8">
          Join thousands who already trust SkillConnect.
        </p>
        <Link
          href="/signup"
          className="inline-block px-8 py-4 font-extrabold text-base rounded-2xl text-white transition-all hover:scale-105"
          style={{
            background: GREEN,
            boxShadow: `0 8px 24px rgba(22,163,74,0.5)`,
          }}
        >
          Find a Worker Now
        </Link>
      </div>
    </div>
  );
}
