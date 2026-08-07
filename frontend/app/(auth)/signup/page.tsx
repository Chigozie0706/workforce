"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Hammer, Check, Phone, Shield } from "lucide-react";
import { Logo } from "../../../components/Logo";
import { BLUE } from "../../../lib/data";
import { api } from "../../../lib/api";
import { useAppRole } from "../../../context/AppContext";
import type { UserRole } from "../../../lib/types";

export default function SignupPage() {
  const router = useRouter();
  const { refresh } = useAppRole();
  const [tab, setTab] = useState<"login" | "signup">("signup");
  const [role, setLocalRole] = useState<UserRole>("customer");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const go = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const data = await api<{ role: UserRole }>(
        tab === "signup" ? "/api/auth/signup" : "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify(
            tab === "signup"
              ? { name, email, password, role }
              : { email, password },
          ),
        },
      );
      await refresh();
      router.push(data.role === "worker" ? "/worker-dashboard" : "/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        background:
          "linear-gradient(135deg, #EFF6FF 0%, #F8FAFF 60%, #F0FDF4 100%)",
      }}
    >
      <div
        className="hidden lg:flex flex-col justify-center px-16 py-12 w-5/12"
        style={{ background: "linear-gradient(145deg, #1B6FD4, #1558B0)" }}
      >
        <div className="mb-10">
          <Logo size="lg" light />
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
          Connect with trusted skilled workers
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-10">
          500+ verified artisans available in your area. Hire plumbers,
          electricians, carpenters, and more.
        </p>
        <div className="space-y-4">
          {[
            "✅  Verified & background-checked workers",
            "📸  Real portfolio photos before you hire",
            "⭐  Transparent ratings and reviews",
            "💬  Direct messaging & instant booking",
          ].map((f) => (
            <p key={f} className="text-white/80 font-semibold">
              {f}
            </p>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo size="sm" />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
            Welcome!
          </h1>
          <p className="text-slate-500 mb-7">
            Join thousands of satisfied customers and workers
          </p>

          <div className="flex bg-slate-100 rounded-2xl p-1 mb-6">
            {(["signup", "login"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setError(null);
                }}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: tab === t ? BLUE : "transparent",
                  color: tab === t ? "white" : "#94A3B8",
                }}
              >
                {t === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>

          {tab === "signup" && (
            <>
              <p className="text-sm font-extrabold text-slate-800 mb-3">
                I am a...
              </p>
              <div className="flex gap-3 mb-6">
                {(["customer", "worker"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setLocalRole(r)}
                    className="flex-1 py-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all"
                    style={{
                      borderColor: role === r ? BLUE : "#E2E8F0",
                      background: role === r ? "#EFF6FF" : "white",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: role === r ? "#DBEAFE" : "#F1F5F9" }}
                    >
                      {r === "customer" ? (
                        <User
                          size={24}
                          style={{ color: role === r ? BLUE : "#94A3B8" }}
                        />
                      ) : (
                        <Hammer
                          size={24}
                          style={{ color: role === r ? BLUE : "#94A3B8" }}
                        />
                      )}
                    </div>
                    <span
                      className="text-sm font-extrabold"
                      style={{ color: role === r ? BLUE : "#94A3B8" }}
                    >
                      {r === "customer" ? "Customer" : "Worker"}
                    </span>
                    {role === r && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: BLUE }}
                      >
                        <Check
                          size={11}
                          className="text-white"
                          strokeWidth={3}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-4">
              <p className="text-sm font-semibold text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-3 mb-5">
            {tab === "signup" && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 px-4">
                <User size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 py-4 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
                />
              </div>
            )}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 px-4">
              <Phone size={16} className="text-slate-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 py-4 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
              />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 px-4">
              <Shield size={16} className="text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 py-4 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>

          <button
            onClick={go}
            disabled={submitting}
            className="w-full py-4 text-white font-extrabold text-base rounded-2xl mb-4 shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
            style={{ background: BLUE, boxShadow: `0 8px 24px ${BLUE}40` }}
          >
            {submitting
              ? "Please wait…"
              : tab === "login"
                ? "Log In"
                : "Create Account"}
          </button>

          <p className="text-center text-xs text-slate-400">
            Demo accounts: sarah@example.com / password123 (customer) ·
            marcus@example.com / password123 (worker)
          </p>
        </div>
      </div>
    </div>
  );
}
